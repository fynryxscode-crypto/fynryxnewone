'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, Search, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminModal from '@/components/admin/AdminModal'
import type { Service } from '@/types/admin'

const emptyForm = {
  title: '',
  description: '',
  icon: '💡',
  price: '' as string | number,
}

export default function ServicesPage() {
  const qc = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [editService, setEditService] = useState<Service | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['services-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  const filtered = services.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description?.toLowerCase().includes(search.toLowerCase())
  )

  const createMutation = useMutation({
    mutationFn: async (data: typeof emptyForm) => {
      const payload = {
        title: data.title,
        description: data.description,
        icon: data.icon,
        price: data.price !== '' ? Number(data.price) : null,
      }
      const { error } = await supabase.from('services').insert([payload])
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services-all'] })
      toast.success('Service created successfully!')
      setModalOpen(false)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof emptyForm }) => {
      const payload = {
        title: data.title,
        description: data.description,
        icon: data.icon,
        price: data.price !== '' ? Number(data.price) : null,
      }
      const { error } = await supabase.from('services').update(payload).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services-all'] })
      toast.success('Service updated!')
      setModalOpen(false)
      setEditService(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services-all'] })
      toast.success('Service deleted.')
      setConfirmOpen(false)
      setDeleteId(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const openCreate = () => {
    setEditService(null)
    setForm({ ...emptyForm })
    setModalOpen(true)
  }

  const openEdit = (s: Service) => {
    setEditService(s)
    setForm({
      title: s.title,
      description: s.description || '',
      icon: s.icon || '💡',
      price: s.price !== null && s.price !== undefined ? s.price : '',
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editService) {
      updateMutation.mutate({ id: editService.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>Services Management</h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Configure the IT solutions and packages you offer</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}
        >
          <Plus size={18} />
          Add New Service
        </button>
      </header>

      {/* Search Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all shadow-sm border"
            style={{
              background: 'var(--input-bg)',
              borderColor: 'var(--card-border)',
              color: 'var(--text-main)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--card-border)')}
          />
        </div>
        <div
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold"
          style={{ background: 'rgba(59,130,246,0.05)', color: 'var(--primary)', borderColor: 'rgba(59,130,246,0.1)' }}
        >
          <Zap size={14} />
          <span>{services.length} ACTIVE SERVICES</span>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 animate-pulse border"
              style={{ background: 'var(--card)', borderColor: 'var(--card-border)', minHeight: 220 }}
            >
              <div className="w-14 h-14 rounded-2xl mb-5" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-5 w-40 rounded mb-3" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-3 w-full rounded mb-1.5" style={{ background: 'var(--border-subtle)', opacity: 0.5 }} />
              <div className="h-3 w-2/3 rounded" style={{ background: 'var(--border-subtle)', opacity: 0.5 }} />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-24 rounded-3xl border border-dashed"
          style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(59,130,246,0.05)' }}>
            <Zap size={32} className="text-blue-500/50" />
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-main)' }}>No Services Found</h3>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {search ? 'Try adjusting your search keywords' : 'Click "Add New Service" to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl p-6 flex flex-col transition-all group border shadow-sm hover:shadow-xl hover:-translate-y-1"
              style={{
                background: 'var(--card)',
                borderColor: 'var(--card-border)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform group-hover:scale-110"
                style={{ background: 'var(--input-bg)' }}
              >
                {service.icon || '💡'}
              </div>
              <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-blue-500" style={{ color: 'var(--text-main)' }}>
                {service.title}
              </h3>
              <p
                className="text-sm font-medium flex-1 leading-relaxed mb-4"
                style={{
                  color: 'var(--text-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                {service.price !== null && service.price !== undefined && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-dim)' }}>Pricing From</span>
                    <span className="text-base font-bold text-green-500">
                      ${Number(service.price).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-2 rounded-xl transition-all"
                    style={{ color: 'var(--primary)', background: 'rgba(59,130,246,0.08)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
                    title="Edit Service"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => { setDeleteId(service.id); setConfirmOpen(true) }}
                    className="p-2 rounded-xl transition-all"
                    style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    title="Delete Service"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditService(null) }}
        title={editService ? 'Modify Service' : 'Add New Service'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Service Name *</label>
            <input
              required
              className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all"
              style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Custom Web Development"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Service Description *</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all resize-none"
              style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Provide a comprehensive description of what this service entails..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Icon / Emoji</label>
              <input
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="💡"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--text-dim)' }}>Starting Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none border transition-all"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Leave blank if variable"
              />
            </div>
          </div>
          <div className="flex gap-4 p-1 pt-2">
            <button
              type="button"
              onClick={() => { setModalOpen(false); setEditService(null) }}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all border"
              style={{ background: 'transparent', borderColor: 'var(--border-bold)', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--card-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}
            >
              {createMutation.isPending || updateMutation.isPending ? 'Processing...' : editService ? 'Save Changes' : 'Create Service'}
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
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-main)' }}>Delete Service permanently?</p>
          <p className="text-xs font-medium leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            This will remove the service from your offerings. Any associated client links may be affected.
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
    </div>
  )
}
