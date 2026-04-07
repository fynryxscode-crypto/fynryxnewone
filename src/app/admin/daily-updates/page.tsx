'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Plus, Search, Calendar, User, AlertCircle, Clock, CheckCircle, ArrowRight, Zap, ClipboardList } from 'lucide-react'
import toast from 'react-hot-toast'
import type { DailyUpdate, Task, Profile } from '@/types/admin'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import AdminModal from '@/components/admin/AdminModal'

export default function DailyUpdatesPage() {
  const queryClient = useQueryClient()
  const { profile } = useAdminAuthStore()
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    setMounted(true)
    setDateFilter(new Date().toISOString().split('T')[0])
  }, [])
  const [employeeFilter, setEmployeeFilter] = useState('All')

  const isAdmin = profile?.role === 'admin'

  // Fetch Updates
  const { data: updates = [], isLoading } = useQuery({
    queryKey: ['daily-updates', dateFilter, employeeFilter],
    queryFn: async () => {
      let query = supabase
        .from('daily_updates')
        .select(`
          *,
          profiles:user_id(id, name, email),
          tasks:task_id(id, title)
        `)
        .order('created_at', { ascending: false })
      
      if (dateFilter) query = query.eq('date', dateFilter)
      if (employeeFilter !== 'All') query = query.eq('user_id', employeeFilter)
      else if (!isAdmin) query = query.eq('user_id', profile?.id)

      const { data, error } = await query
      if (error) throw error
      return data as DailyUpdate[]
    },
  })

  // Fetch Today's Tasks for the User
  const { data: myTasks = [] } = useQuery({
    queryKey: ['my-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title')
        .eq('assigned_to', profile?.id)
        .neq('status', 'Completed')
      if (error) throw error
      return data as Task[]
    },
    enabled: !!profile?.id
  })

  // Fetch Employees for filter
  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('id, name')
      if (error) throw error
      return data as Profile[]
    },
    enabled: isAdmin
  })

  const createUpdate = useMutation({
    mutationFn: async (newUpdate: Partial<DailyUpdate>) => {
      const { data, error } = await supabase.from('daily_updates').insert([{
        ...newUpdate,
        user_id: profile?.id,
        date: new Date().toISOString().split('T')[0]
      }]).select()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-updates'] })
      queryClient.invalidateQueries({ queryKey: ['task-activities-recent'] })
      toast.success('Operational synchronization successful: Log archived.')
      setIsModalOpen(false)
    },
  })

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Premium Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none uppercase">
                Execution Intel
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
              Operational Continuity • Precision Logging • Daily Synthesis
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {!isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <Plus size={18} />
                Initialize Entry
              </button>
            )}
          </div>
        </header>

        {/* Tactical Filters */}
        <div className="elevated-card p-4 bg-white/80 backdrop-blur-md border border-slate-200 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 transition-colors focus-within:border-indigo-200">
            <Calendar size={14} className="text-indigo-500" />
            <input 
              type="date" 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-xs font-black text-slate-700 focus:outline-none uppercase tracking-widest"
            />
          </div>
          {isAdmin && (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 transition-colors focus-within:border-indigo-200">
              <User size={14} className="text-indigo-500" />
              <select 
                value={employeeFilter} 
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="bg-transparent text-xs font-black text-slate-700 focus:outline-none min-w-[200px] appearance-none uppercase tracking-widest"
              >
                <option value="All">All Operations Force</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Activity Intelligence List */}
        <div className="space-y-8">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-slate-200 shadow-sm gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Intelligence...</p>
            </div>
          ) : updates.length === 0 ? (
            <div className="elevated-card py-32 bg-white text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 text-slate-200">
                <ClipboardList size={32} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Void Detected</h3>
              <p className="text-sm font-medium text-slate-400 mt-2">No operational data recorded for this viewport.</p>
            </div>
          ) : (
            updates.map((update) => (
              <div key={update.id} className="elevated-card bg-white p-10 hover:shadow-2xl transition-all group relative overflow-hidden">
                {!isAdmin && (
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="text-[10px] font-black uppercase tracking-widest text-indigo-200">ID: {update.id.slice(0,8)}</div>
                  </div>
                )}
                
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10 pb-10 border-b border-slate-100">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-black text-xl shadow-sm group-hover:rotate-6 transition-transform">
                      {update.profiles?.name?.slice(0,1) || 'U'}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{update.profiles?.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          <Clock size={12} className="text-indigo-400" />
                          Timestamp: {mounted ? new Date(update.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '...'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100">
                    <Zap size={16} fill="white" />
                    <span className="text-xs font-black uppercase tracking-widest">{update.time_spent} Units Expended</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-4">
                    <h5 className="text-[10px] uppercase tracking-widest font-black text-slate-400 flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-500" /> Completed Objectives
                    </h5>
                    <div className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50/50 p-8 rounded-4xl border border-slate-100 min-h-[160px] group-hover:bg-white transition-colors group-hover:border-indigo-100">
                      {update.work_description}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] uppercase tracking-widest font-black text-slate-400 flex items-center gap-2">
                      <ArrowRight size={14} className="text-indigo-500" /> Strategic Continuum
                    </h5>
                    <div className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50/50 p-8 rounded-4xl border border-slate-100 min-h-[160px] group-hover:bg-white transition-colors group-hover:border-indigo-100">
                      {update.next_day_plan || 'Planned trajectory maintained.'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] uppercase tracking-widest font-black text-slate-400 flex items-center gap-2">
                      <AlertCircle size={14} className="text-red-500" /> Threat Assessment
                    </h5>
                    <div className={`text-sm font-medium leading-relaxed p-8 rounded-4xl border min-h-[160px] transition-all ${update.blockers ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50/50 border-slate-100 text-slate-300 group-hover:bg-white'}`}>
                      {update.blockers || 'Clear operational velocity.'}
                    </div>
                  </div>
                </div>

                {update.tasks && (
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mission Context:</span>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50/50 px-4 py-2 rounded-2xl border border-indigo-100 uppercase tracking-widest">
                        {update.tasks.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Entry Initialization Modal */}
      <AdminModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Operational Log Capture"
        size="lg"
      >
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const payload = {
              task_id: formData.get('task_id') as string || null,
              work_description: formData.get('work_description') as string,
              next_day_plan: formData.get('next_day_plan') as string,
              blockers: formData.get('blockers') as string,
              time_spent: parseFloat(formData.get('time_spent') as string || '0'),
            }
            createUpdate.mutate(payload)
          }}
          className="space-y-8 p-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Objective Outcomes</label>
              <textarea 
                name="work_description" 
                required 
                rows={4} 
                className="w-full bg-slate-50 border border-slate-200 rounded-4xl px-6 py-5 text-sm font-medium text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300" 
                placeholder="Log critical outcomes and precision work..." 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Future Trajectory</label>
              <textarea 
                name="next_day_plan" 
                rows={3} 
                className="w-full bg-slate-50 border border-slate-200 rounded-4xl px-6 py-5 text-sm font-medium text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Blocker Identification</label>
              <textarea 
                name="blockers" 
                rows={3} 
                className="w-full bg-slate-50 border border-slate-200 rounded-4xl px-6 py-5 text-sm font-medium text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all" 
                placeholder="List factors impeding velocity..."
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Task Synchronization</label>
              <select name="task_id" className="w-full bg-slate-50 border border-slate-200 rounded-4xl px-6 py-4 text-xs font-black text-slate-900 outline-none appearance-none uppercase tracking-widest">
                <option value="">General Systems</option>
                {myTasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Units Expended (Hours)</label>
              <input 
                type="number" 
                step="0.5" 
                name="time_spent" 
                defaultValue="0" 
                className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 text-sm font-black text-slate-900 outline-none" 
              />
            </div>
          </div>
          <div className="pt-8 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
            >
              Discard
            </button>
            <button 
              type="submit" 
              disabled={createUpdate.isPending}
              className="px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {createUpdate.isPending ? 'Synchronizing...' : 'Archive Entry'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}
