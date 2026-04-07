'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Plus, Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Task, TaskStatus, Project, Profile } from '@/types/admin'
import AdminModal from '@/components/admin/AdminModal'
import TaskKanban from '@/components/admin/TaskKanban'
import { useAdminAuthStore } from '@/stores/adminAuthStore'

export default function TasksPage() {
  const queryClient = useQueryClient()
  const { profile } = useAdminAuthStore()
  const isAdmin = profile?.role === 'admin'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All')

  // Fetch Tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', profile?.id, isAdmin],
    queryFn: async () => {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          profiles:assigned_to(id, name, email),
          projects:project_id(id, title)
        `)
      
      if (!isAdmin && profile?.id) {
        query = query.eq('assigned_to', profile.id)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      if (error) throw error
      return data as Task[]
    },
  })

  // Fetch Projects (for the form)
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('id, title')
      if (error) throw error
      return data as Project[]
    },
  })

  // Fetch Employees (for assignment)
  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('id, name, role')
      if (error) throw error
      return data as Profile[]
    },
  })

  // Mutations
  const createTask = useMutation({
    mutationFn: async (newTask: Partial<Task>) => {
      const { data, error } = await supabase.from('tasks').insert([newTask]).select()
      if (error) throw error
      return data
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task-activities-recent'] })
      
      // Log task creation
      if (data?.[0]?.id) {
        supabase.from('task_activity_log').insert([{
          task_id: data[0].id,
          user_id: profile?.id,
          action: 'created mission directive',
          new_value: data[0].title
        }]).then(() => queryClient.invalidateQueries({ queryKey: ['task-activities-recent'] }))
      }
      
      toast.success('Task created successfully')
      setIsModalOpen(false)
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  })

  const updateTask = useMutation({
    mutationFn: async (vars: { id: string; updates: Partial<Task>, oldTask?: Task }) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(vars.updates)
        .eq('id', vars.id)
        .select()
        .single()
      if (error) throw error

      // Log Activity if status changed
      if (vars.updates.status && vars.oldTask && vars.oldTask.status !== vars.updates.status) {
        await supabase.from('task_activity_log').insert([{
          task_id: vars.id,
          user_id: profile?.id,
          action: 'updated status of',
          old_value: vars.oldTask.status,
          new_value: vars.updates.status
        }])
      } else if (vars.updates.assigned_to && vars.oldTask && vars.oldTask.assigned_to !== vars.updates.assigned_to) {
        await supabase.from('task_activity_log').insert([{
          task_id: vars.id,
          user_id: profile?.id,
          action: 'reassigned',
          old_value: 'Previous user',
          new_value: 'New user'
        }])
      }
      
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task-activities-recent'] })
      toast.success('Task updated')
      setEditingTask(null)
      setIsModalOpen(false)
    },
  })

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('tasks').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted')
    },
  })

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    const oldTask = tasks.find(t => t.id === id)
    updateTask.mutate({ id, updates: { status }, oldTask })
  }

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                         t.description?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none">
                {isAdmin ? 'Task Orchestration' : 'Mission Directives'}
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] ml-4.5">
              {isAdmin ? 'Strategic assignment and operational oversight' : 'Focus on active execution and status updates'}
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => { setEditingTask(null); setIsModalOpen(true) }}
              className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <Plus size={16} strokeWidth={3} />
              Provision Task
            </button>
          )}
        </header>

        {/* Filters */}
        <div className="elevated-card p-6 bg-white flex flex-wrap items-center gap-6">
          <div className="flex-1 relative min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Filter tasks by title or metadata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 focus:outline-hidden focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort by:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3.5 text-[11px] font-black uppercase tracking-widest text-slate-600 focus:outline-hidden focus:ring-4 focus:ring-indigo-500/5 transition-all cursor-pointer hover:bg-slate-100"
            >
              <option value="All">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="elevated-card p-10 bg-white min-h-[600px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-cyan-400 opacity-20" />
          
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-2xl border-4 border-indigo-600/10 border-t-indigo-600 animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Syncing Directives</p>
            </div>
          ) : (
            <TaskKanban 
              tasks={filteredTasks} 
              onUpdateStatus={handleUpdateStatus} 
              onEdit={(t) => { if(isAdmin) { setEditingTask(t); setIsModalOpen(true) } }}
              onDelete={(id) => { if(isAdmin && confirm('Delete this task?')) deleteTask.mutate(id) }}
            />
          )}
        </div>

        {/* Task Modal - The modal already uses AdminModal which we'll keep for now */}
        <AdminModal
          open={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingTask(null) }}
          title={editingTask ? 'Edit Task Specification' : 'Operational Provisioning'}
          size="lg"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const payload = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                priority: formData.get('priority') as any,
                status: formData.get('status') as any,
                assigned_to: formData.get('assigned_to') as string || null,
                project_id: formData.get('project_id') as string,
                due_date: formData.get('due_date') as string || null,
              }
              if (editingTask) updateTask.mutate({ id: editingTask.id, updates: payload, oldTask: editingTask })
              else createTask.mutate(payload)
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Directive Title</label>
                <input name="title" defaultValue={editingTask?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 outline-hidden transition-all font-bold" placeholder="High-level summary of action required" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Technical Description</label>
                <textarea name="description" defaultValue={editingTask?.description} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 outline-hidden transition-all" placeholder="Strategic details, goals, and constraints..." />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Parent Project</label>
                <select name="project_id" defaultValue={editingTask?.project_id} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 outline-hidden focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 font-bold transition-all">
                  <option value="">Select Domain</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Personnel Assignment</label>
                <select name="assigned_to" defaultValue={editingTask?.assigned_to || ''} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 outline-hidden focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 font-bold transition-all">
                  <option value="">Unassigned (Open Pool)</option>
                  {employees.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Criticality Level</label>
                <select name="priority" defaultValue={editingTask?.priority || 'Medium'} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 outline-hidden focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 font-bold transition-all">
                  <option value="Low">Low - Baseline</option>
                  <option value="Medium">Medium - Strategic</option>
                  <option value="High">High - Critical Priority</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Execution Deadline</label>
                <input type="date" name="due_date" defaultValue={editingTask?.due_date || ''} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 outline-hidden focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 font-bold transition-all" />
              </div>
            </div>
            <div className="pt-6 flex justify-end gap-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Abort</button>
              <button type="submit" className="px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95">
                {editingTask ? 'Commit Changes' : 'Initialize Directive'}
              </button>
            </div>
          </form>
        </AdminModal>
      </div>
    </div>
  )
}

