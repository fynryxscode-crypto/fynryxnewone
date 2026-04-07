'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import ProjectKanban from '@/components/admin/ProjectKanban'
import type { Project } from '@/types/admin'
import AdvancedDateFilter, { DateFilterRange } from '@/components/admin/AdvancedDateFilter'
import { LayoutGrid, Table } from 'lucide-react'

const STATUS_TABS = ['All', 'Pending', 'Ongoing', 'Completed'] as const

const emptyForm = {
  title: '',
  description: '',
  client_name: '',
  status: 'Pending' as Project['status'],
  start_date: '',
  end_date: '',
  budget: 0,
}

export default function ProjectsPage() {
  const qc = useQueryClient()
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [dateFilter, setDateFilter] = useState<DateFilterRange>('all')
  const [search, setSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban')
  const [modalOpen, setModalOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('projects-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        qc.invalidateQueries({ queryKey: ['projects-all'] })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [qc])

  const filtered = useMemo(() => {
    let list = projects

    // Status Filter
    if (statusFilter !== 'All') list = list.filter((p) => p.status === statusFilter)

    // Date Filter
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

    // Search Filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client_name.toLowerCase().includes(q)
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
  }, [projects, statusFilter, dateFilter, search, columnFilters])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Project['status'] }) => {
      const { error } = await supabase.from('projects').update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-all'] })
      toast.success('Project state synchronized.')
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const createMutation = useMutation({
    mutationFn: async (data: typeof emptyForm) => {
      const payload = {
        title: data.title,
        description: data.description || null,
        client_name: data.client_name,
        status: data.status,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        budget: Number(data.budget || 0),
      }
      const { error } = await supabase.from('projects').insert([payload])
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-all'] })
      toast.success('Entity initialization successful: Project archived.')
      setModalOpen(false)
      setForm({ ...emptyForm })
    },
    onError: (e: Error) => {
      console.error('Project creation failed:', e)
      toast.error(e.message || 'Entity creation mismatch.')
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof emptyForm }) => {
      const payload = {
        title: data.title,
        description: data.description || null,
        client_name: data.client_name,
        status: data.status,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        budget: Number(data.budget || 0),
      }
      const { error } = await supabase.from('projects').update(payload).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-all'] })
      toast.success('Operational configuration updated.')
      setModalOpen(false)
      setEditProject(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-all'] })
      toast.success('Strategic resource purged.')
      setConfirmOpen(false)
      setDeleteId(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const openCreate = () => {
    setEditProject(null)
    setForm({ ...emptyForm })
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditProject(p)
    setForm({
      title: p.title,
      description: p.description || '',
      client_name: p.client_name,
      status: p.status,
      start_date: p.start_date || '',
      end_date: p.end_date || '',
      budget: p.budget || 0,
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editProject) {
      updateMutation.mutate({ id: editProject.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const columns = [
    {
      key: 'title',
      header: 'Strategic Designation',
      filterable: true,
      render: (row: Project) => (
        <div className="flex flex-col gap-1">
          <span className="font-black text-slate-900 tracking-tight">{row.title}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID: {row.id.slice(0, 8)}</span>
        </div>
      ),
    },
    { key: 'client_name', header: 'Entity Client', filterable: true },
    {
      key: 'status',
      header: 'Execution State',
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Ongoing', value: 'Ongoing' },
        { label: 'Completed', value: 'Completed' },
      ],
      render: (row: Project) => {
        const configs: Record<string, { bg: string, text: string }> = {
          Pending: { bg: 'bg-amber-50', text: 'text-amber-600' },
          Ongoing: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
          Completed: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
        }
        const cfg = configs[row.status] || configs.Pending
        return (
          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-current opacity-80 ${cfg.bg} ${cfg.text}`}>
            {row.status}
          </span>
        )
      },
    },
    {
      key: 'budget',
      header: 'Resource Allocation',
      filterable: true,
      render: (row: Project) => (
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-slate-400">$</span>
           <span className="font-black text-slate-900 tracking-tight">{Number(row.budget || 0).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'start_date',
      header: 'Temporal Start',
      filterable: true,
      render: (row: Project) => (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
           {row.start_date ? new Date(row.start_date).toLocaleDateString() : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Operations',
      width: '120px',
      render: (row: Project) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openEdit(row)}
            className="p-2.5 rounded-xl transition-all bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 active:scale-95"
            title="Inspect & Modify"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => { setDeleteId(row.id); setConfirmOpen(true) }}
            className="p-2.5 rounded-xl transition-all bg-slate-50 text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-95"
            title="Decommission Project"
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
                Execution Pipeline
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
               Mission Critical Ventures • Resource Orchestration • Dynamic Lifecycle
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Plus size={18} />
            Initialize Mission
          </button>
        </header>

        {/* Tactical View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
             <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/50 border border-slate-200 rounded-2xl">
                <button
                  onClick={() => setViewMode('kanban')}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{
                    background: viewMode === 'kanban' ? 'white' : 'transparent',
                    color: viewMode === 'kanban' ? 'var(--primary)' : 'var(--text-dim)',
                    boxShadow: viewMode === 'kanban' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                    border: viewMode === 'kanban' ? '1px solid rgba(79,70,229,0.1)' : '1px solid transparent'
                  }}
                >
                  <LayoutGrid size={14} className={viewMode === 'kanban' ? 'text-indigo-600' : 'text-slate-400'} />
                  Kanban
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{
                    background: viewMode === 'table' ? 'white' : 'transparent',
                    color: viewMode === 'table' ? 'var(--primary)' : 'var(--text-dim)',
                    boxShadow: viewMode === 'table' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                    border: viewMode === 'table' ? '1px solid rgba(79,70,229,0.1)' : '1px solid transparent'
                  }}
                >
                  <Table size={14} className={viewMode === 'table' ? 'text-indigo-600' : 'text-slate-400'} />
                  Registry
                </button>
             </div>
             
             <div className="h-10 w-px bg-slate-200 hidden lg:block" />
             
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
          </div>

          <div className="relative group min-w-[320px]">
             <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
             <input
              type="text"
              placeholder="Query Mission Protocols..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full bg-white border border-slate-200 rounded-3xl pl-12 pr-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm placeholder:text-slate-300"
             />
          </div>
        </div>

        {viewMode === 'kanban' ? (
          <div className="animate-in fade-in duration-500">
            <ProjectKanban 
              projects={filtered}
              onUpdateStatus={(id, status) => updateStatusMutation.mutate({ id, status })}
              onEdit={openEdit}
              onDelete={(id) => { setDeleteId(id); setConfirmOpen(true) }}
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
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
              emptyMessage="No strategic ventures detected in the current viewport."
            />
          </div>
        )}

        {/* Configuration Modal */}
        <AdminModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditProject(null) }}
          title={editProject ? 'Mission Briefing Update' : 'Initialize New Mission'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-8 pt-4 p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Mission Title *</label>
                <input
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Designation of Strategy"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Strategic Overview</label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detail the operational scope..."
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Entity Client *</label>
                <input
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900"
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  placeholder="Primary Stakeholder"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Execution State</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Project['status'] })}
                >
                  <option value="Pending">Pending Initiation</option>
                  <option value="Ongoing">Active Execution</option>
                  <option value="Completed">Operational Closure</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Temporal Initialization</label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Target Completion</label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2.5">Resource Allocation ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => { setModalOpen(false); setEditProject(null) }}
                className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
              >
                Abort
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                {createMutation.isPending || updateMutation.isPending ? 'Synchronizing...' : editProject ? 'Update Mission' : 'Deploy Mission'}
              </button>
            </div>
          </form>
        </AdminModal>

        {/* Decommission Confirmation */}
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
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Initialize Decommission?</h3>
              <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                Permanent purging of project logs and resource links. This action is irreversible.
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
