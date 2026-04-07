'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Eye, Trash2, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import type { Lead } from '@/types/admin'

import AdvancedDateFilter, { DateFilterRange } from '@/components/admin/AdvancedDateFilter'

const STATUS_TABS = ['All', 'New', 'Contacted', 'Converted'] as const

export default function LeadsPage() {
  const qc = useQueryClient()
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [dateFilter, setDateFilter] = useState<DateFilterRange>('all')
  const [search, setSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const [viewLead, setViewLead] = useState<Lead | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [editStatus, setEditStatus] = useState<Lead['status']>('New')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ['leads-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('leads-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        qc.invalidateQueries({ queryKey: ['leads-all'] })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [qc])

  const filtered = useMemo(() => {
    let list = leads

    // Status Filter
    if (statusFilter !== 'All') list = list.filter((l) => l.status === statusFilter)

    // Date Filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const startOfYesterday = new Date(startOfToday)
      startOfYesterday.setDate(startOfYesterday.getDate() - 1)

      list = list.filter((l) => {
        const d = new Date(l.created_at)
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

    // Search Filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.service?.toLowerCase().includes(q)
      )
    }

    // Per-column Filters
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (!value) return
      const q = value.toLowerCase()
      list = list.filter(item => {
        const fieldVal = String((item as any)[key] || '').toLowerCase()
        return fieldVal.includes(q)
      })
    })

    return list
  }, [leads, statusFilter, dateFilter, search, columnFilters])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Lead['status'] }) => {
      const { error } = await supabase.from('leads').update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads-all'] })
      toast.success('Inquiry status synchronized.')
      setViewOpen(false)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leads').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads-all'] })
      toast.success('Lead records purged.')
      setConfirmOpen(false)
      setDeleteId(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const openView = (lead: Lead) => {
    setViewLead(lead)
    setEditStatus(lead.status)
    setViewOpen(true)
  }

  const columns = [
    {
      key: 'name',
      header: 'Designation',
      filterable: true,
      render: (row: Lead) => (
        <div className="flex flex-col gap-1">
          <span className="font-black text-slate-900 tracking-tight">{row.name}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">UID: {row.id.slice(0, 8)}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Communications', filterable: true },
    { key: 'service', header: 'Intel Domain', filterable: true },
    {
      key: 'status',
      header: 'Logic State',
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'New', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Converted', value: 'Converted' },
      ],
      render: (row: Lead) => {
        const configs: Record<string, { bg: string, text: string, shadow: string }> = {
          New: { bg: 'bg-blue-50', text: 'text-blue-600', shadow: 'shadow-blue-500/5' },
          Contacted: { bg: 'bg-amber-50', text: 'text-amber-600', shadow: 'shadow-amber-500/5' },
          Converted: { bg: 'bg-emerald-50', text: 'text-emerald-600', shadow: 'shadow-emerald-500/5' },
        }
        const cfg = configs[row.status] || configs.New
        return (
          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-current opacity-80 ${cfg.bg} ${cfg.text} ${cfg.shadow}`}>
            {row.status}
          </span>
        )
      },
    },
    {
      key: 'created_at',
      header: 'Temporal Sync',
      filterable: true,
      render: (row: Lead) => (
        <div className="flex flex-col gap-1">
          <span className="font-black text-slate-700 tracking-tight uppercase text-[10px]">{new Date(row.created_at).toLocaleDateString()}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
            {new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Operations',
      width: '120px',
      render: (row: Lead) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openView(row)}
            className="p-2.5 rounded-xl transition-all bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 active:scale-95"
            title="Inspect Intelligence"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => { setDeleteId(row.id); setConfirmOpen(true) }}
            className="p-2.5 rounded-xl transition-all bg-slate-50 text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-95"
            title="Purge Intelligence"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Premium Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none uppercase">
                Intelligence Stream
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
               Lead Management • Market Inquiries • Conversion Analytics
            </p>
          </div>
          
          <div className="elevated-card bg-white px-8 py-4 border border-slate-200 flex items-center gap-6 divide-x divide-slate-100">
             <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Total Intelligence</span>
                <span className="text-2xl font-black text-indigo-600 leading-none tracking-tighter">{leads.length}</span>
             </div>
             <div className="pl-6 flex items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                   <Users size={24} />
                </div>
             </div>
          </div>
        </header>

        {/* Tactical Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
             <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/50 border border-slate-200 rounded-2xl">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setStatusFilter(tab); setPage(1) }}
                    className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    style={{
                      background: statusFilter === tab ? 'white' : 'transparent',
                      color: statusFilter === tab ? 'var(--primary)' : 'var(--text-dim)',
                      boxShadow: statusFilter === tab ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                      border: statusFilter === tab ? '1px solid rgba(79,70,229,0.1)' : '1px solid transparent'
                    }}
                  >
                    {tab}
                  </button>
                ))}
             </div>
             <div className="h-10 w-px bg-slate-200 hidden lg:block" />
             <div className="elevated-card bg-white/80 p-1 border border-slate-200 rounded-2xl shadow-sm">
                <AdvancedDateFilter onFilterChange={(r) => { setDateFilter(r); setPage(1) }} />
             </div>
          </div>

          <div className="relative group min-w-[320px]">
             <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
             <input
              type="text"
              placeholder="Query Intelligence Network..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full bg-white border border-slate-200 rounded-[1.5rem] pl-12 pr-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm placeholder:text-slate-300"
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
          emptyMessage="No matching intelligence detected in the current viewport."
        />

        {/* Inspection Modal */}
        <AdminModal
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          title="Intelligence Briefing"
          size="md"
        >
          {viewLead && (
            <div className="space-y-10 pt-4">
              <div className="grid grid-cols-2 gap-10">
                {[
                  { label: 'Intelligence Designation', value: viewLead.name },
                  { label: 'Transmission Channel', value: viewLead.email || 'N/A' },
                  { label: 'Direct Node', value: viewLead.phone || 'N/A' },
                  { label: 'Strategic Interest', value: viewLead.service || 'General' },
                  { label: 'Capture Timestamp', value: new Date(viewLead.created_at).toLocaleString() },
                  { label: 'Unique Identifier', value: viewLead.id.toUpperCase() },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-2">{label}</span>
                    <span className="text-sm font-black text-slate-900 tracking-tight">{value}</span>
                  </div>
                ))}
              </div>
              
              {viewLead.message && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">Intelligence Message</span>
                  <p className="text-sm font-medium leading-relaxed bg-slate-50 border border-slate-100 p-8 rounded-[2rem] text-slate-600 italic">
                    "{viewLead.message}"
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-10">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3">Logic Override (Status)</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-900 outline-none appearance-none cursor-pointer focus:border-indigo-400"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as Lead['status'])}
                  >
                    <option value="New">New Intelligence</option>
                    <option value="Contacted">Active Protocol</option>
                    <option value="Converted">Operational Conversion</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-7">
                  <button
                    onClick={() => setViewOpen(false)}
                    className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => updateStatusMutation.mutate({ id: viewLead.id, status: editStatus })}
                    disabled={updateStatusMutation.isPending}
                    className="px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    {updateStatusMutation.isPending ? 'Syncing...' : 'Synchronize'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </AdminModal>

        {/* Purge Confirmation */}
        <AdminModal
          open={confirmOpen}
          onClose={() => { setConfirmOpen(false); setDeleteId(null) }}
          title="Security Override Required"
          size="sm"
        >
          <div className="py-6 text-center space-y-8">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-500 border border-red-100 shadow-sm animate-pulse">
              <Trash2 size={32} />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Initialize Purge?</h3>
              <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                Permanent deletion of intelligence unit logs. This action is irreversible.
              </p>
            </div>
            <div className="flex gap-4 px-2">
              <button
                onClick={() => { setConfirmOpen(false); setDeleteId(null) }}
                className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
              >
                Abort
              </button>
              <button
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
                className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-100 hover:bg-red-700 transition-all active:scale-95"
              >
                {deleteMutation.isPending ? 'Purging...' : 'Confirm Purge'}
              </button>
            </div>
          </div>
        </AdminModal>

      </div>
    </div>
  )
}
