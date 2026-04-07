'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, ExternalLink, Calendar, User, Tag } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import type { Blog } from '@/types/admin'
import AdvancedDateFilter, { DateFilterRange } from '@/components/admin/AdvancedDateFilter'

const STATUS_TABS = ['All', 'Draft', 'Published', 'Archived'] as const

const emptyForm = {
  title: '',
  content: '',
  author: '',
  category: 'Technology',
  image_url: '',
  status: 'Draft' as Blog['status'],
}

export default function BlogsPage() {
  const qc = useQueryClient()
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [dateFilter, setDateFilter] = useState<DateFilterRange>('all')
  const [search, setSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const [modalOpen, setModalOpen] = useState(false)
  const [editBlog, setEditBlog] = useState<Blog | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: ['blogs-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('blogs-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, () => {
        qc.invalidateQueries({ queryKey: ['blogs-all'] })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [qc])

  const filtered = useMemo(() => {
    let list = blogs

    if (statusFilter !== 'All') list = list.filter((b) => b.status === statusFilter)

    if (dateFilter !== 'all') {
      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const startOfYesterday = new Date(startOfToday)
      startOfYesterday.setDate(startOfYesterday.getDate() - 1)

      list = list.filter((b) => {
        const d = new Date(b.created_at)
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
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
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
  }, [blogs, statusFilter, dateFilter, search, columnFilters])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const createMutation = useMutation({
    mutationFn: async (data: typeof emptyForm) => {
      const { error } = await supabase.from('blogs').insert([data])
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs-all'] })
      toast.success('Blog post created!')
      setModalOpen(false)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof emptyForm }) => {
      const { error } = await supabase.from('blogs').update(data).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs-all'] })
      toast.success('Blog updated successfully!')
      setModalOpen(false)
      setEditBlog(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blogs').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs-all'] })
      toast.success('Blog deleted.')
      setConfirmOpen(false)
      setDeleteId(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const openCreate = () => {
    setEditBlog(null)
    setForm({ ...emptyForm })
    setModalOpen(true)
  }

  const openEdit = (b: Blog) => {
    setEditBlog(b)
    setForm({
      title: b.title,
      content: b.content,
      author: b.author,
      category: b.category,
      image_url: b.image_url || '',
      status: b.status,
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editBlog) {
      updateMutation.mutate({ id: editBlog.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const columns = [
    {
      key: 'title',
      header: 'Article Title',
      filterable: true,
      render: (row: Blog) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border-2" style={{ borderColor: 'var(--border-subtle)' }}>
            {row.image_url ? (
              <img src={row.image_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">IMG</div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>{row.title}</span>
            <span className="text-[10px] font-medium" style={{ color: 'var(--text-dim)' }}>{row.category}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      filterable: true,
      render: (row: Blog) => (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
             <User size={12} className="text-blue-500" />
          </div>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>{row.author}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'Technology', value: 'Technology' },
        { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
        { label: 'IT Solutions', value: 'IT Solutions' },
        { label: 'Security', value: 'Security' },
        { label: 'Cloud Computing', value: 'Cloud Computing' },
      ],
    },
    {
      key: 'status',
      header: 'Status',
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Published', value: 'Published' },
        { label: 'Archived', value: 'Archived' },
      ],
      render: (row: Blog) => {
        const colors: Record<string, string> = {
          Draft: 'yellow',
          Published: 'green',
          Archived: 'slate',
        }
        const color = colors[row.status] || 'blue'
        return (
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
            style={{
              background: `rgba(var(--${color}-rgb, 148, 163, 184), 0.1)`,
              color: `rgb(var(--${color}-rgb, 148, 163, 184))`,
              borderColor: `rgba(var(--${color}-rgb, 148, 163, 184), 0.2)`,
            }}
          >
            {row.status}
          </span>
        )
      },
    },
    {
      key: 'created_at',
      header: 'Date Created',
      filterable: true,
      render: (row: Blog) => (
        <div className="flex items-center gap-2">
           <Calendar size={12} style={{ color: 'var(--text-dim)' }} />
           <span className="text-xs font-medium" style={{ color: 'var(--text-dim)' }}>{new Date(row.created_at).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (row: Blog) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openEdit(row)}
            className="p-2 rounded-lg transition-all"
            style={{ color: 'var(--primary)', background: 'rgba(59,130,246,0.1)' }}
            title="Edit Post"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => { setDeleteId(row.id); setConfirmOpen(true) }}
            className="p-2 rounded-lg transition-all"
            style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}
            title="Delete Post"
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
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>Blog Management</h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Create, edit, and publish engaging content for your audience</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}
        >
          <Plus size={18} />
          New Article
        </button>
      </header>

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 p-1 rounded-xl shadow-inner border" style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setStatusFilter(tab); setPage(1) }}
                className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
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
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search blogs by title or author..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all shadow-sm"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-bold)',
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
        emptyMessage="No blog articles found"
      />

      {/* Create/Edit Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditBlog(null) }}
        title={editBlog ? 'Edit Blog Article' : 'Compose New Article'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5 pt-2 max-h-[70vh] overflow-y-auto px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Article Title *</label>
              <input
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter article title"
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Author Name *</label>
              <input
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Name of the writer"
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Category</label>
              <select
                className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none border transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Technology">Technology</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="IT Solutions">IT Solutions</option>
                <option value="Security">Security</option>
                <option value="Cloud Computing">Cloud Computing</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Feature Image URL</label>
              <input
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Content (Markdown Supported) *</label>
              <textarea
                required
                rows={8}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all resize-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your article content here..."
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Publishing Status</label>
              <select
                className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none border transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-bold)', color: 'var(--text-main)' }}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Blog['status'] })}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 p-1 pt-2">
            <button
              type="button"
              onClick={() => { setModalOpen(false); setEditBlog(null) }}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all border"
              style={{ background: 'transparent', borderColor: 'var(--border-bold)', color: 'var(--text-muted)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))' }}
            >
              {createMutation.isPending || updateMutation.isPending ? 'Processing...' : editBlog ? 'Update Article' : 'Save & Publish'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Confirm Delete */}
      <AdminModal
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setDeleteId(null) }}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="py-2 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-500">
            <Trash2 size={28} />
          </div>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-main)' }}>Delete Post Permanently?</p>
          <p className="text-xs font-medium leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            This cannot be undone. All content in this article will be lost.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setConfirmOpen(false); setDeleteId(null) }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border"
              style={{ background: 'transparent', borderColor: 'var(--border-bold)', color: 'var(--text-muted)' }}
            >
              Cancel
            </button>
            <button
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-md"
              style={{ background: '#ef4444' }}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      </AdminModal>

      <style jsx global>{`
        :root {
          --yellow-rgb: 245, 158, 11;
          --green-rgb: 34, 197, 94;
          --slate-rgb: 148, 163, 184;
        }
      `}</style>
    </div>
  )
}
