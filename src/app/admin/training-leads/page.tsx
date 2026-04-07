'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Eye, Trash2, GraduationCap, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import type { Lead } from '@/types/admin'
import AdvancedDateFilter, { DateFilterRange } from '@/components/admin/AdvancedDateFilter'

const STATUS_TABS = ['All', 'New', 'Contacted', 'Converted'] as const

export default function TrainingLeadsPage() {
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
    queryKey: ['training-leads-all'],
    queryFn: async () => {
      // Filter for training leads specifically
      // We check both the 'type' column (if it exists) and the 'service' prefix as a fallback
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .or('type.eq.training,service.ilike.Enrollment:%') 
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('training-leads-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        qc.invalidateQueries({ queryKey: ['training-leads-all'] })
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
      qc.invalidateQueries({ queryKey: ['training-leads-all'] })
      toast.success('Status updated!')
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
      qc.invalidateQueries({ queryKey: ['training-leads-all'] })
      toast.success('Lead deleted.')
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
      header: 'Student Name',
      filterable: true,
      render: (row: Lead) => (
        <div className="flex flex-col">
          <span className="font-bold" style={{ color: 'var(--text-main)' }}>{row.name}</span>
          <span className="text-[11px] font-medium" style={{ color: 'var(--text-dim)' }}>ID: {row.id.slice(0, 8)}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Email', filterable: true },
    { key: 'phone', header: 'Contact', filterable: true, render: (row: Lead) => row.phone || <span style={{ color: 'var(--text-dim)' }}>—</span> },
    { 
      key: 'service', 
      header: 'Course / Program',
      filterable: true,
      render: (row: Lead) => (
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
           <span className="font-medium text-xs">{row.service.replace('Enrollment: ', '')}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'New', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Converted', value: 'Converted' },
      ],
      render: (row: Lead) => {
        const colors: Record<string, string> = {
          New: 'cyan',
          Contacted: 'yellow',
          Converted: 'green',
        }
        const color = colors[row.status] || 'blue'
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border`}
            style={{
              background: `rgba(var(--${color}-rgb, 34, 211, 238), 0.1)`,
              color: `rgb(var(--${color}-rgb, 34, 211, 238))`,
              borderColor: `rgba(var(--${color}-rgb, 34, 211, 238), 0.2)`,
            }}
          >
            {row.status}
          </span>
        )
      },
    },
    {
      key: 'created_at',
      header: 'Enrolled On',
      filterable: true,
      render: (row: Lead) => (
        <div className="flex flex-col">
          <span className="font-medium">{new Date(row.created_at).toLocaleDateString()}</span>
          <span className="text-[10px] font-medium" style={{ color: 'var(--text-dim)' }}>
            {new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '100px',
      render: (row: Lead) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openView(row)}
            className="p-2 rounded-lg transition-all"
            style={{ color: 'var(--primary)', background: 'rgba(59,130,246,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.1)')}
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => { setDeleteId(row.id); setConfirmOpen(true) }}
            className="p-2 rounded-lg transition-all"
            style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-main)' }}>Training Leads</h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Manage student enrollments and academy applications</p>
        </div>
        <div
          className="px-6 py-4 rounded-3xl flex items-center gap-4 shadow-xl border"
          style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest font-black" style={{ color: 'var(--text-dim)' }}>Active Applications</span>
            <span className="text-2xl font-black leading-none" style={{ color: 'var(--primary)' }}>{leads.length}</span>
          </div>
          <div className="h-10 w-px" style={{ background: 'var(--border-bold)' }} />
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--primary)' }}>
            <GraduationCap size={24} />
          </div>
        </div>
      </header>

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 p-1 rounded-xl shadow-inner border" style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setStatusFilter(tab); setPage(1) }}
                className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                style={{
                  background: statusFilter === tab ? 'var(--primary)' : 'transparent',
                  color: statusFilter === tab ? '#fff' : 'var(--text-muted)',
                  boxShadow: statusFilter === tab ? '0 2px 8px rgba(59,130,246,0.3)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="h-8 w-px hidden sm:block" style={{ background: 'var(--border-bold)' }} />
          <AdvancedDateFilter onFilterChange={(r) => { setDateFilter(r); setPage(1) }} />
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search students or courses..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm font-bold outline-none transition-all shadow-sm border"
            style={{
              background: 'var(--input-bg)',
              borderColor: 'var(--border-bold)',
              color: 'var(--text-main)',
            }}
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
        emptyMessage="No training leads currently available."
      />

      {/* View/Edit Modal */}
      <AdminModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Application Details"
        size="md"
      >
        {viewLead && (
          <div className="space-y-8 pt-2">
            <div className="grid grid-cols-2 gap-6 bg-white/2 p-6 rounded-4xl border border-white/5">
              {[
                { label: 'Student Name', value: viewLead.name },
                { label: 'Email Address', value: viewLead.email || '—' },
                { label: 'Phone Number', value: viewLead.phone || '—' },
                { label: 'Enrolled Course', value: viewLead.service.replace('Enrollment: ', '') || '—' },
                { label: 'Applied At', value: new Date(viewLead.created_at).toLocaleString() },
                { label: 'Source', value: 'Academy Portal' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black mb-1.5" style={{ color: 'var(--text-dim)' }}>{label}</span>
                  <span className="text-sm font-black truncate" style={{ color: 'var(--text-main)' }}>{value}</span>
                </div>
              ))}
            </div>
            {viewLead.message && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20" style={{ color: 'var(--text-dim)' }}>
                    Student Inquiry
                  </span>
                </div>
                <p className="text-sm p-6 rounded-4xl font-bold leading-relaxed border italic shadow-inner" style={{ color: 'var(--text-main)', background: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
                  "{viewLead.message}"
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black mb-2" style={{ color: 'var(--text-dim)' }}>Enrollment Status</label>
              <div className="relative group">
                <select
                  className="w-full px-5 py-4 rounded-2xl text-sm font-black outline-none border transition-all appearance-none cursor-pointer"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Lead['status'])}
                >
                  <option value="New">Pending Review</option>
                  <option value="Contacted">Contact Initiated</option>
                  <option value="Converted">Enrollment Finalized</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                   <GraduationCap size={16} />
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-1 pt-4">
              <button
                onClick={() => setViewOpen(false)}
                className="flex-1 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all border"
                style={{ background: 'transparent', borderColor: 'var(--border-bold)', color: 'var(--text-muted)' }}
              >
                Close
              </button>
              <button
                onClick={() => updateStatusMutation.mutate({ id: viewLead.id, status: editStatus })}
                disabled={updateStatusMutation.isPending}
                className="flex-1 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-500/20"
                style={{ background: 'linear-gradient(135deg, #2f55ff, #3b82f6)' }}
              >
                {updateStatusMutation.isPending ? 'Updating...' : 'Update Record'}
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Confirm Delete */}
      <AdminModal
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setDeleteId(null) }}
        title="Remove Application"
        size="sm"
      >
        <div className="py-4 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 text-red-500 border border-red-500/20">
            <Trash2 size={32} />
          </div>
          <h4 className="text-lg font-black mb-2" style={{ color: 'var(--text-main)' }}>Delete Record Permanently?</h4>
          <p className="text-xs font-bold leading-relaxed mb-8 px-4" style={{ color: 'var(--text-muted)' }}>
            This will permanently remove the student application from your database. This action is irreversible.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { setConfirmOpen(false); setDeleteId(null) }}
              className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border"
              style={{ background: 'transparent', borderColor: 'var(--border-bold)', color: 'var(--text-muted)' }}
            >
              Cancel
            </button>
            <button
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-red-500/20"
              style={{ background: '#ef4444' }}
            >
              {deleteMutation.isPending ? 'Removing...' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      </AdminModal>

      <style jsx global>{`
        :root {
          --cyan-rgb: 34, 211, 238;
          --yellow-rgb: 245, 158, 11;
          --green-rgb: 34, 197, 94;
          --blue-rgb: 59, 130, 246;
        }
      `}</style>
    </div>
  )
}
