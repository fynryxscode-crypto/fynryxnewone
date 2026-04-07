'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, Clock, AlertCircle, Search, CreditCard, Banknote } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import type { Payment } from '@/types/admin'
import AdvancedDateFilter, { DateFilterRange } from '@/components/admin/AdvancedDateFilter'

import { useAdminAuthStore } from '@/stores/adminAuthStore'

const RevenueLine = lazy(() => import('recharts').then((mod) => {
  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = mod
  return {
    default: function RevenueLineChart({ data }: { data: { month: string; revenue: number }[] }) {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="6 6" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }} axisLine={false} tickLine={false} dy={15} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} dx={-10} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} dot={{ fill: '#6366f1', strokeWidth: 3, stroke: '#fff', r: 6 }} activeDot={{ r: 9, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      )
    }
  }
}))

const emptyForm: {
  client_name: string;
  amount: number;
  status: Payment['status'];
  method: string;
  payment_date: string;
} = {
  client_name: '',
  amount: 0,
  status: 'Pending',
  method: 'Bank Transfer',
  payment_date: new Date().toISOString().split('T')[0],
}

function buildMonthlyRevenue(items: Payment[]) {
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    return {
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      year: d.getFullYear(),
      monthNum: d.getMonth(),
    }
  })

  return months.map(({ month, year, monthNum }) => {
    const revenue = items
      .filter((p) => {
        const d = new Date(p.created_at)
        return p.status === 'Paid' && d.getFullYear() === year && d.getMonth() === monthNum
      })
      .reduce((sum, p) => sum + p.amount, 0)
    return { month, revenue }
  })
}

export default function PaymentsPage() {
  const qc = useQueryClient()
  const { profile } = useAdminAuthStore()
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [dateFilter, setDateFilter] = useState<DateFilterRange>('all')
  const [search, setSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})

  const [modalOpen, setModalOpen] = useState(false)
  const [editPayment, setEditPayment] = useState<Payment | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: payments = [], isLoading } = useQuery<Payment[]>({
    queryKey: ['payments-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('payments-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, () => {
        qc.invalidateQueries({ queryKey: ['payments-all'] })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [qc])

  const filtered = useMemo(() => {
    let list = payments
    if (statusFilter !== 'All') list = list.filter((p) => p.status === statusFilter)
    
    if (dateFilter !== 'all') {
      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const startOfYesterday = new Date(startOfToday)
      startOfYesterday.setDate(startOfYesterday.getDate() - 1)

      list = list.filter((p) => {
        const d = new Date(p.created_at)
        if (dateFilter === 'today') return d >= startOfToday
        if (dateFilter === 'yesterday') return d >= startOfYesterday && d < startOfToday
        if (dateFilter === 'last7') {
          const sevenDaysAgo = new Date(startOfToday)
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          return d >= sevenDaysAgo
        }
        if (dateFilter === 'last30') {
          const thirtyDaysAgo = new Date(startOfToday)
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return d >= thirtyDaysAgo
        }
        return true
      })
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.client_name.toLowerCase().includes(q))
    }

    Object.entries(columnFilters).forEach(([key, value]) => {
      if (!value) return
      const q = value.toLowerCase()
      list = list.filter(item => {
        const fieldVal = String((item as any)[key] || '').toLowerCase()
        return fieldVal.includes(q)
      })
    })

    return list
  }, [payments, statusFilter, dateFilter, search, columnFilters])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Summary stats
  const now = new Date()
  const totalRevenue = useMemo(() => payments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0), [payments])
  const thisMonth = useMemo(() => payments.filter((p) => {
    if (p.status !== 'Paid') return false
    const d = new Date(p.created_at)
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  }).reduce((s, p) => s + p.amount, 0), [payments, now])
  const pendingAmount = useMemo(() => payments.filter((p) => p.status === 'Pending').reduce((s, p) => s + p.amount, 0), [payments])
  const overdueAmount = useMemo(() => payments.filter((p) => p.status === 'Overdue').reduce((s, p) => s + p.amount, 0), [payments])

  const revenueData = useMemo(() => buildMonthlyRevenue(payments), [payments])

  const createMutation = useMutation({
    mutationFn: async (data: typeof emptyForm) => {
      const { error } = await supabase.from('payments').insert([data])
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments-all'] })
      toast.success('Fiscal record archived.')
      setModalOpen(false)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof emptyForm }) => {
      const { error } = await supabase.from('payments').update(data).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments-all'] })
      toast.success('Ledger synchronized.')
      setModalOpen(false)
      setEditPayment(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('payments').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments-all'] })
      toast.success('Financial node purged.')
      setConfirmOpen(false)
      setDeleteId(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const openCreate = () => {
    setEditPayment(null)
    setForm({ ...emptyForm })
    setModalOpen(true)
  }

  const openEdit = (p: Payment) => {
    setEditPayment(p)
    setForm({
      client_name: p.client_name,
      amount: p.amount,
      status: p.status,
      method: p.method || 'Bank Transfer',
      payment_date: p.payment_date || new Date().toISOString().split('T')[0],
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editPayment) {
      updateMutation.mutate({ id: editPayment.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const summaryCards = [
    { label: 'Total Capital', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'emerald' },
    { label: 'Tactical Yield', value: `$${thisMonth.toLocaleString()}`, icon: TrendingUp, color: 'indigo' },
    { label: 'Awaiting Settlement', value: `$${pendingAmount.toLocaleString()}`, icon: Clock, color: 'amber' },
    { label: 'Conflict Threshold', value: `$${overdueAmount.toLocaleString()}`, icon: AlertCircle, color: 'rose' },
  ]

  const columns = [
    {
      key: 'client_name',
      header: 'Intelligence Node (Client)',
      render: (row: Payment) => (
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-xs shadow-sm">
              {row.client_name?.slice(0,1) || 'C'}
           </div>
           <div className="flex flex-col gap-0.5">
             <span className="font-black text-slate-900 tracking-tight">{row.client_name}</span>
             <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">{row.method || 'Transfer'} protocol</span>
           </div>
        </div>
      )
    },
    {
      key: 'amount',
      header: 'Fiscal Value',
      render: (row: Payment) => (
        <div className="flex flex-col">
           <span className={`font-black text-sm tracking-tight ${row.status === 'Paid' ? 'text-emerald-600' : 'text-slate-900'}`}>
             ${Number(row.amount).toLocaleString()}
           </span>
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Currency</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Settlement State',
      render: (row: Payment) => {
        const variants: Record<string, string> = {
          Paid: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100',
          Pending: 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100',
          Overdue: 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100',
        }
        const style = variants[row.status] || 'bg-slate-50 text-slate-600 border-slate-100 shadow-slate-100'
        return (
          <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm w-fit ${style}`}>
            {row.status}
          </div>
        )
      },
    },
    {
      key: 'payment_date',
      header: 'Sync Chronology',
      render: (row: Payment) => (
        <div className="flex items-center gap-2">
           <Clock size={12} className="text-slate-300" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
             {row.payment_date ? new Date(row.payment_date).toLocaleDateString() : 'Pending Sync'}
           </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '100px',
      render: (row: Payment) => (
        <div className="flex items-center justify-end gap-2 pr-2">
          <button onClick={() => openEdit(row)} className="p-2.5 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all active:scale-90">
            <Edit2 size={16} />
          </button>
          <button onClick={() => { setDeleteId(row.id); setConfirmOpen(true) }} className="p-2.5 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all active:scale-90">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10 space-y-12">
       <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Tactical Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none uppercase">
                Revenue Stream
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
               Fiscal Trajectory • Transactional Integrity • Capital Management
            </p>
          </div>
          <button 
            onClick={openCreate}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Plus size={18} />
            Initialize Transaction
          </button>
        </div>

        {/* Global Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
          {summaryCards.map(({ label, value, icon: Icon, color }) => (
             <div key={label} className="group elevated-card p-6 border border-slate-100 flex flex-col gap-4">
                <div className={`p-3 w-fit rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100' :
                  color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100' :
                  color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100' :
                  'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100'
                } shadow-lg`}>
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight transition-transform group-hover:translate-x-1">{isLoading ? '...' : value}</h3>
                </div>
             </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2 elevated-card p-8 border border-slate-100 animate-in fade-in duration-900">
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 border border-slate-100 shadow-sm">
                     <TrendingUp size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Capital Trajectory Flow</h3>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Realtime Yield Sync
               </div>
             </div>
             <Suspense fallback={<div className="h-[280px] w-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Initializing Data Stream...</div>}>
               <RevenueLine data={revenueData} />
             </Suspense>
          </div>

          {/* Quick Stats / Activity */}
          <div className="elevated-card p-8 border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-1000">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-8 border-b border-slate-50 pb-4">Transactional Matrix</h3>
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-slate-50/50 border border-slate-100 flex items-center gap-5 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:scale-[1.02] cursor-default border-dashed">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                    <Banknote size={24} />
                 </div>
                 <div className="flex-1">
                    <p className="text-[11px] font-black text-slate-900 uppercase">Settlement Protocols</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Transfers</p>
                 </div>
              </div>
              <div className="p-5 rounded-3xl bg-slate-50/50 border border-slate-100 flex items-center gap-5 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:scale-[1.02] cursor-default border-dashed">
                 <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                    <CreditCard size={24} />
                 </div>
                 <div className="flex-1">
                    <p className="text-[11px] font-black text-slate-900 uppercase">Strategic Gateway</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instant Clearing</p>
                 </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50">
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 text-center leading-relaxed">
                  Fiscal transparency protocols active • Automated clearing system online
               </p>
            </div>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="elevated-card overflow-hidden border border-slate-100 p-0 animate-in fade-in slide-in-from-bottom-4 duration-1200">
           <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4">
                 <div className="flex gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                   {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setStatusFilter(tab); setPage(1) }}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        statusFilter === tab 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <AdvancedDateFilter onFilterChange={(r) => { setDateFilter(r); setPage(1) }} />
              </div>

              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="SEARCH FOR INTELLIGENCE NODES..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  className="w-full pl-11 pr-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest placeholder:text-slate-300 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm"
                />
              </div>
           </div>

           <AdminTable
             columns={columns}
             data={paginated}
             keyField="id"
             loading={isLoading}
             page={page}
             pageSize={PAGE_SIZE}
             totalCount={filtered.length}
             onPageChange={setPage}
             onFilterChange={setColumnFilters}
             emptyMessage="No fiscal records detected in the filtered sector."
           />
        </div>
      </div>

      {/* Initialize Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditPayment(null) }}
        title={editPayment ? 'Ledger Synchronization' : 'Initialize Financial Protocol'}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
           <div className="text-center space-y-2">
               <p className="text-slate-400 text-[11px] font-medium leading-relaxed max-w-[280px] mx-auto">
                 {editPayment ? 'Adjust existing fiscal parameters. All changes will be archived in the system log.' : 'Initialize new revenue node. Ensure all values are verified before synchronization.'}
               </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Intelligence Node (Client)</label>
                <input 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  placeholder="Designation Name" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Fiscal Value ($)</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Settlement State</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all appearance-none"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Payment['status'] })}
                  >
                    <option value="Paid">OperationalClosure</option>
                    <option value="Pending">ActiveSettlement</option>
                    <option value="Overdue">ProtocolConflict</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Transfer Protocol</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all appearance-none"
                    value={form.method}
                    onChange={(e) => setForm({ ...form, method: e.target.value })}
                  >
                    <option value="Cash">PhysicalCapital</option>
                    <option value="Card">StripeGateway</option>
                    <option value="Bank Transfer">WireProtocol</option>
                    <option value="UPI">InstantDirect</option>
                    <option value="Other">ExternalNode</option>
                  </select>
                </div>
                <div>
                   <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Sync Chronology</label>
                   <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                    value={form.payment_date}
                    onChange={(e) => setForm({ ...form, payment_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                 <button 
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="w-full py-4 rounded-2xl bg-indigo-600 font-black text-white uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                >
                  {editPayment ? 'Synchronize Ledger' : 'Confirm Transaction'}
                </button>
                <button 
                  type="button"
                  onClick={() => { setModalOpen(false); setEditPayment(null) }}
                  className="w-full py-4 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"
                >
                  Abort Operation
                </button>
              </div>
            </div>
        </form>
      </AdminModal>

      {/* Confirm Purge */}
      <AdminModal 
        open={confirmOpen} 
        onClose={() => { setConfirmOpen(false); setDeleteId(null) }} 
        title="Protocol Termination"
      >
        <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto text-rose-500 border border-rose-100 shadow-lg shadow-rose-50">
              <Trash2 size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Purge Financial Node?</h4>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                This action will permanently terminate the transaction record. This is irreversible.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => deleteId && deleteMutation.mutate(deleteId)} 
                disabled={deleteMutation.isPending} 
                className="w-full py-4 rounded-2xl bg-rose-600 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all active:scale-95"
              >
                {deleteMutation.isPending ? 'Purging Node...' : 'Confirm Termination'}
              </button>
              <button 
                onClick={() => { setConfirmOpen(false); setDeleteId(null) }} 
                className="w-full py-4 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"
              >
                Cancel Protocol
              </button>
            </div>
        </div>
      </AdminModal>
    </div>
  )
}
