'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { User, Mail, Shield, UserPlus, Trash2, Edit2, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Profile, Task } from '@/types/admin'
import AdminTable from '@/components/admin/AdminTable'
import { useState } from 'react'
import AdminModal from '@/components/admin/AdminModal'

export default function EmployeesPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [isInviting, setIsInviting] = useState(false)
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)

  // Fetch Profiles with their tasks
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees-full'],
    queryFn: async () => {
      const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (pError) throw pError

      const { data: tasks, error: tError } = await supabase
        .from('tasks')
        .select('id, status, assigned_to')
      if (tError) throw tError

      // Aggregate task counts
      return profiles.map(p => {
        const userTasks = tasks.filter(t => t.assigned_to === p.id)
        return {
          ...p,
          taskCount: userTasks.length,
          completedCount: userTasks.filter(t => t.status === 'Completed').length,
          inProgressCount: userTasks.filter(t => t.status === 'In Progress').length,
        }
      })
    },
  })

  const updateRole = useMutation({
    mutationFn: async ({ id, role }: { id: string, role: string }) => {
      const { error } = await supabase.from('profiles').update({ role }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees-full'] })
      toast.success('Permission protocols synchronized.')
    },
  })

  const sendInvitation = async () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      toast.error('Invalid email protocol detected.')
      return
    }

    setIsInviting(true)
    const t = toast.loading('Synchronizing identity stack...')
    
    try {
      const { error: pError } = await supabase.from('profiles').upsert([{
        email: inviteEmail,
        name: inviteEmail.split('@')[0],
        role: 'employee',
      }], { onConflict: 'email' })

      if (pError) throw pError
      
      toast.success(`Identity archived: ${inviteEmail}`, { id: t })
      setInviteEmail('')
      setIsModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['employees-full'] })
    } catch (e: any) {
      toast.error(`Fault detected: ${e.message}`, { id: t })
    } finally {
      setIsInviting(false)
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Intelligence Profile',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-sm shadow-sm transition-transform hover:scale-110">
            {row.name?.slice(0,1) || 'U'}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-black text-slate-900 tracking-tight">{row.name}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Strategic Authorization',
      render: (row: any) => (
        <div className="relative group">
          <select 
            defaultValue={row.role}
            onChange={(e) => updateRole.mutate({ id: row.id, role: e.target.value })}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all pr-8"
          >
            <option value="admin">Admin Level</option>
            <option value="manager">Lead Strategic</option>
            <option value="employee">Execution Unit</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
             <Shield size={10} />
          </div>
        </div>
      )
    },
    {
      key: 'tasks',
      header: 'Active Operations',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{row.taskCount} Units</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-1 rounded-full bg-emerald-500 shadow-sm" title="Completed" />
              <div className="w-2.5 h-1 rounded-full bg-indigo-500 shadow-sm" title="In Progress" />
              <div className="w-2.5 h-1 rounded-full bg-slate-200 shadow-sm" title="To Do" />
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'productivity',
      header: 'Performance Rating',
      render: (row: any) => {
        const pct = row.taskCount > 0 ? Math.round((row.completedCount / row.taskCount) * 100) : 0
        return (
          <div className="w-40 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-900">{pct}% Efficiency</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{row.completedCount}/{row.taskCount}</span>
            </div>
            <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden p-[2px]">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out border shadow-sm ${
                    pct >= 80 ? 'bg-indigo-600 border-indigo-400' : 
                    pct >= 50 ? 'bg-indigo-400 border-indigo-300' : 
                    'bg-slate-400 border-slate-300'
                }`}
                style={{ width: `${pct}%` }} 
              />
            </div>
          </div>
        )
      }
    },
    {
      key: 'actions',
      header: '',
      width: '80px',
      render: (row: any) => (
        <div className="flex justify-end pr-2">
          <button className="p-2.5 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all active:scale-90">
            <Edit2 size={16} />
          </button>
        </div>
      )
    }
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
                Workforce Intelligence
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
               Lead Strategic Personnel • Resource Management • Performance Matrix
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <UserPlus size={18} />
            Onboard Asset
          </button>
        </div>

        {/* Tactical Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
          {[
            { label: 'Total Personnel', value: employees.length, icon: User, color: 'indigo' },
            { label: 'Collective Efficiency', value: Math.round(employees.reduce((acc, e) => acc + (e.taskCount > 0 ? (e.completedCount/e.taskCount)*100 : 0), 0) / (employees.length || 1)) + '%', icon: CheckCircle2, color: 'emerald' },
            { label: 'Active Operations', value: employees.reduce((acc, e) => acc + e.inProgressCount, 0), icon: Clock, color: 'indigo' },
            { label: 'Blocked Modules', value: '0', icon: AlertCircle, color: 'slate' },
          ].map((stat, i) => (
            <div key={i} className="group elevated-card p-6 border border-slate-100 flex flex-col gap-4">
              <div className={`p-3 w-fit rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100' :
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100' :
                'bg-slate-50 text-slate-400 border-slate-200 shadow-slate-100'
              } shadow-lg`}>
                <stat.icon size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight transition-transform group-hover:translate-x-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Global Registry */}
        <div className="elevated-card overflow-hidden border border-slate-100 p-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Shield size={14} className="text-indigo-600" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Personnel Registry Stack</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Active Node</span>
              </div>
           </div>
           <AdminTable 
            columns={columns} 
            data={employees} 
            keyField="id" 
            loading={isLoading} 
            emptyMessage="No personnel records detected in the current sector."
          />
        </div>

        {/* Onboarding Modal */}
        <AdminModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Personnel Onboarding Protocol"
        >
          <div className="p-6 space-y-8">
            <div className="text-center space-y-2">
               <p className="text-slate-400 text-[11px] font-medium leading-relaxed max-w-[280px] mx-auto">
                 Initialize new asset profile. Credentials will be synchronized across all tactical modules.
               </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Designation Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alexander Pierce"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Network Email Address</label>
                <input 
                  type="email" 
                  placeholder="alexander@fynryx.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5 ml-1 tracking-widest">Initial Access Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
                />
              </div>
              <div className="pt-4 flex flex-col gap-4">
                 <button 
                  onClick={sendInvitation}
                  disabled={isInviting || !inviteEmail}
                  className="w-full py-4 rounded-2xl bg-indigo-600 font-black text-white uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                >
                  {isInviting ? 'Synchronizing Stack...' : 'Initialize Onboarding'}
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-4 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"
                >
                  Abort Protocol
                </button>
              </div>
            </div>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}
