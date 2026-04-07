'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts'
import { FileDown, Calendar, Filter, TrendingUp, BarChart3, PieChart as PieIcon, Activity, Shield } from 'lucide-react'
import type { Task, DailyUpdate, Project } from '@/types/admin'

import { useAdminAuthStore } from '@/stores/adminAuthStore'

export default function ReportsPage() {
  const { profile } = useAdminAuthStore()
  const isAdmin = profile?.role === 'admin'

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks-report'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*')
      if (error) throw error
      return data as Task[]
    }
  })

  const { data: projects = [] } = useQuery({
    queryKey: ['projects-report'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*')
      if (error) throw error
      return data as Project[]
    }
  })

  if (!isAdmin) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-12 bg-white rounded-4xl border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-500">
         <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 text-slate-200 border border-slate-100 shadow-inner">
            <Shield size={40} strokeWidth={1.5} />
         </div>
         <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Strategic Authorization Required</h2>
         <p className="text-slate-400 text-sm font-medium max-w-sm mt-4 leading-relaxed tracking-tight">
            Only administrators can access analytical reports and team performance data. Please contact System Ops for clearance.
         </p>
         <button 
           onClick={() => window.history.back()}
           className="mt-10 px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-slate-800 transition-all active:scale-95"
         >
           Abort Session
         </button>
      </div>
    )
  }

  // Task Status Distribution
  const taskStatusData = [
    { name: 'Awaiting Initiation', value: tasks.filter(t => t.status === 'To Do').length, color: '#94a3b8' },
    { name: 'Active Execution', value: tasks.filter(t => t.status === 'In Progress').length, color: '#6366f1' },
    { name: 'Operational Closure', value: tasks.filter(t => t.status === 'Completed').length, color: '#10b981' },
    { name: 'Protocol Conflict', value: tasks.filter(t => t.status === 'Blocked').length, color: '#f43f5e' },
  ]

  // Mock Activity Timeline
  const activityData = [
    { date: 'Mon', completed: 4, ongoing: 12 },
    { date: 'Tue', completed: 7, ongoing: 10 },
    { date: 'Wed', completed: 5, ongoing: 11 },
    { date: 'Thu', completed: 8, ongoing: 9 },
    { date: 'Fri', completed: 12, ongoing: 6 },
    { date: 'Sat', completed: 3, ongoing: 4 },
    { date: 'Sun', completed: 2, ongoing: 3 },
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
                Performance Analytics
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
               Strategic Data Harvesting • Real-time Efficiency Matrix • Tactical Insights
            </p>
          </div>
          <button 
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-slate-100 hover:bg-slate-50 hover:shadow-xl transition-all active:scale-95"
          >
            <FileDown size={16} className="text-indigo-600" />
            Export Intelligence PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
          {[
            { label: 'Strategic Units', value: tasks.length, icon: BarChart3, color: 'indigo' },
            { label: 'Active Pipelines', value: projects.length, icon: TrendingUp, color: 'emerald' },
            { label: 'Operational Closure', value: tasks.filter(t => t.status === 'Completed').length, icon: Activity, color: 'indigo' },
            { label: 'Conflict Threshold', value: tasks.filter(t => t.status === 'Blocked').length, icon: Shield, color: 'rose' },
          ].map((stat, i) => (
            <div key={i} className="group elevated-card p-6 border border-slate-100 flex flex-col gap-4">
              <div className={`p-3 w-fit rounded-4xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100' :
                stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100' :
                'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100'
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Distribution */}
          <div className="lg:col-span-1 elevated-card p-8 border border-slate-100 animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                   <PieIcon size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Execution States</h3>
              </div>
            </div>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#fff', 
                      border: '1px solid #f1f5f9', 
                      borderRadius: '16px', 
                      fontSize: '11px', 
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: '#0f172a',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-8">
              {taskStatusData.map(item => (
                <div key={item.name} className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:scale-[1.02] cursor-default group">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm group-hover:scale-125 transition-transform" style={{ background: item.color }} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                  <span className="ml-auto text-xs font-black text-slate-900 leading-none">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Timeline */}
          <div className="lg:col-span-2 elevated-card p-8 border border-slate-100 animate-in fade-in duration-900">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                   <Activity size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Tactical Velocity</h3>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                 <button className="px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 text-indigo-600 shadow-sm">7D Overview</button>
                 <button className="px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">30D Analysis</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="6 6" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} dy={15} />
                  <YAxis stroke="#94a3b8" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip 
                     cursor={{ fill: '#f8fafc' }}
                     contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #f1f5f9', 
                        borderRadius: '16px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                        fontSize: '11px',
                        fontWeight: '800'
                     }}
                  />
                  <Bar dataKey="completed" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="ongoing" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-8 mt-6">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Closure Pulse</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Execution Flow</span>
               </div>
            </div>
          </div>

          {/* Project Velocity Matrix */}
          <div className="lg:col-span-3 elevated-card p-8 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 shadow-sm">
                     <TrendingUp size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Mission Pipeline Velocity</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                   Live Stream Data
                </div>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(p => {
                const projectTasks = tasks.filter(t => t.project_id === p.id)
                const completed = projectTasks.filter(t => t.status === 'Completed').length
                const pct = projectTasks.length > 0 ? Math.round((completed / projectTasks.length) * 100) : 0
                return (
                  <div key={p.id} className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/20 transition-all duration-300 group cursor-default">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-black text-slate-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors uppercase leading-tight">{p.title}</h4>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Project Protocol {p.id.slice(0, 4)}</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-[11px] font-black text-indigo-600 leading-none mb-1">{pct}%</span>
                         <span className="text-[7px] font-black uppercase tracking-widest text-indigo-300 leading-none">Sync</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200/50 rounded-full overflow-hidden mb-6 p-px">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 p-px border border-white/20 ${
                          pct >= 80 ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.3)]' : 
                          pct >= 40 ? 'bg-indigo-400' : 'bg-slate-400'
                        }`} 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2.5 rounded-2xl border border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-900 leading-none mb-1">{completed}</span>
                        <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 leading-none">Archived</span>
                      </div>
                      <div className="h-6 w-px bg-slate-100" />
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-900 leading-none mb-1">{projectTasks.length}</span>
                        <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 leading-none">Unit Cap</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
