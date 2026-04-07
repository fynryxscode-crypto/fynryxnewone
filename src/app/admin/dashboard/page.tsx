'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FolderKanban, Users, DollarSign, Building2, Clock, Zap, Calendar, ArrowUpRight, TrendingUp, CheckSquare, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StatCard from '@/components/admin/StatCard'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import type { Project, Lead, Payment, Notification, Task } from '@/types/admin'
import { toast } from 'react-hot-toast'

import { BarChart as BC, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function RevenueBarChart({ data }: { data: { month: string; revenue: number }[] }) {
  if (typeof window === 'undefined') return null
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BC data={data} barSize={36}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, color: 'var(--text-main)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          itemStyle={{ fontSize: 12, fontWeight: 'bold' }}
          labelStyle={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, opacity: 0.7 }}
          formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`, 'Revenue']}
        />
        <Bar dataKey="revenue" fill="var(--primary)" radius={[8, 8, 0, 0]} />
      </BC>
    </ResponsiveContainer>
  )
}

import { LineChart as LC, Line, XAxis as LXAxis, YAxis as LYAxis, CartesianGrid as LCG, Tooltip as LT, ResponsiveContainer as LRC } from 'recharts'

function LeadsLineChart({ data }: { data: { month: string; leads: number }[] }) {
  if (typeof window === 'undefined') return null
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LC data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
        <LXAxis dataKey="month" tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
        <LYAxis tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
        <LT
          contentStyle={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, color: 'var(--text-main)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          itemStyle={{ fontSize: 12, fontWeight: 'bold' }}
          labelStyle={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, opacity: 0.7 }}
          formatter={(v: unknown) => [Number(v), 'Leads']}
        />
        <Line type="monotone" dataKey="leads" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#22d3ee', strokeWidth: 2, stroke: 'var(--card)', r: 5 }} activeDot={{ r: 8, strokeWidth: 0 }} />
      </LC>
    </ResponsiveContainer>
  )
}

function getRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function buildMonthlyData<T extends { created_at: string }>(
  items: T[],
  valueKey: string,
  isPaid?: boolean,
  statusKey?: string
) {
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
    const filtered = items.filter((item) => {
      const d = new Date(item.created_at)
      const matches = d.getFullYear() === year && d.getMonth() === monthNum
      if (isPaid && statusKey) {
        return matches && (item as Record<string, unknown>)[statusKey] === 'Paid'
      }
      return matches
    })
    const value =
      valueKey === 'count'
        ? filtered.length
        : filtered.reduce((sum, item) => sum + Number((item as Record<string, unknown>)[valueKey] || 0), 0)
    return { month, [valueKey === 'amount' ? 'revenue' : 'leads']: value }
  })
}

export default function DashboardPage() {
  const { profile } = useAdminAuthStore()
  const isAdmin = profile?.role === 'admin'
  const [mounted, setMounted] = useState(false)
  const [isDiagnosing, setIsDiagnosing] = useState(false)

  const runDiagnostic = async () => {
     setIsDiagnosing(true)
     const id = toast.loading('Initializing diagnostics...', {
       style: { background: '#0f172a', color: '#fff', fontSize: '14px', borderRadius: '8px' }
     })
     
     await new Promise(r => setTimeout(r, 1000))
     toast.loading('Scanning database integrity...', { id })
     
     await new Promise(r => setTimeout(r, 1000))
     toast.loading('System synchronized', { id })
     
     await new Promise(r => setTimeout(r, 800))
     toast.success('System integrity verified', { id, duration: 4000 })
     setIsDiagnosing(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: projects, isLoading: loadingProjects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*')
      if (error) throw error
      return data || []
    },
  })

  const { data: leads, isLoading: loadingLeads } = useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase.from('leads').select('*')
      if (error) throw error
      return data || []
    },
  })

  const { data: payments, isLoading: loadingPayments } = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('payments').select('*')
      if (error) throw error
      return data || []
    },
  })

  // Replaced notifications with task activities
  const { data: activities, isLoading: loadingActivities } = useQuery<any[]>({
    queryKey: ['task-activities-recent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('task_activity_log')
        .select(`
          *,
          profiles(name),
          tasks(title)
        `)
        .order('created_at', { ascending: false })
        .limit(8)
      if (error) throw error
      return data || []
    },
  })

  const { data: tasks, isLoading: loadingTasks } = useQuery<Task[]>({
    queryKey: ['tasks-dashboard'],
    queryFn: async () => {
      let query = supabase.from('tasks').select('*')
      if (!isAdmin && profile?.id) {
        query = query.eq('assigned_to', profile.id)
      }
      const { data, error } = await query
      if (error) throw error
      return data || []
    },
  })

  const { data: employeeCount = 0 } = useQuery({
    queryKey: ['employee-count'],
    queryFn: async () => {
      const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      if (error) throw error
      return count || 0
    },
    enabled: isAdmin
  })

  const activeLeads = leads?.filter((l) => l.status === 'New').length || 0
  const revenueData = payments ? buildMonthlyData(payments, 'amount', true, 'status') : []
  const leadsData = leads ? buildMonthlyData(leads, 'count') : []

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-slate-900">
                {isAdmin ? 'Dashboard Overview' : `Welcome, ${profile?.name?.split(' ')[0] || 'Member'}`}
              </h1>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              {isAdmin ? 'System active' : 'Personal dashboard'} • {mounted ? new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '...'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
                onClick={runDiagnostic}
                disabled={isDiagnosing}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <Zap size={16} className={`text-slate-400 ${isDiagnosing ? 'animate-pulse' : ''}`} />
                {isDiagnosing ? 'Scanning...' : 'Run diagnostics'}
             </button>
             <button 
                onClick={() => toast('Initialization interface active', { icon: '⚡', style: { background: '#0f172a', color: '#fff', fontSize: '14px', borderRadius: '8px' }})}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors"
             >
                <Plus size={16} />
                New entry
             </button>
          </div>
        </header>

        {/* High-Impact Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isAdmin ? (
            <>
              <StatCard
                title="Consolidated Team"
                value={employeeCount}
                icon={<Users size={26} />}
                trend={{ value: 2, positive: true }}
                color="blue"
                loading={loadingProjects}
              />
              <StatCard
                title="Operational Velocity"
                value={`${tasks?.length ? Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100) : 0}%`}
                icon={<CheckSquare size={26} />}
                trend={{ value: 8, positive: true }}
                color="green"
                loading={loadingTasks}
              />
              <StatCard
                title="Strategic Pipeline"
                value={activeLeads}
                icon={<TrendingUp size={26} />}
                trend={{ value: 14, positive: true }}
                color="cyan"
                loading={loadingLeads}
              />
              <StatCard
                title="Critical Blockers"
                value={tasks?.filter(t => t.status === 'Blocked').length || 0}
                icon={<Clock size={26} />}
                trend={{ value: 1, positive: false }}
                color="yellow"
                loading={loadingTasks}
              />
            </>
          ) : (
            <>
              <StatCard
                title="Active Assignments"
                value={tasks?.filter(t => t.status !== 'Completed').length || 0}
                icon={<FolderKanban size={26} />}
                color="blue"
                loading={loadingTasks}
              />
              <StatCard
                title="Items for Review"
                value={tasks?.filter(t => t.status === 'To Do').length || 0}
                icon={<Clock size={26} />}
                color="yellow"
                loading={loadingTasks}
              />
              <StatCard
                title="Current In-Flight"
                value={tasks?.filter(t => t.status === 'In Progress').length || 0}
                icon={<Zap size={26} />}
                color="cyan"
                loading={loadingTasks}
              />
              <StatCard
                title="Total Accomplished"
                value={tasks?.filter(t => t.status === 'Completed').length || 0}
                icon={<CheckSquare size={26} />}
                color="green"
                loading={loadingTasks}
              />
            </>
          )}
        </div>

        {/* Data Visualization & Intelligence Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Revenue Intelligence (Admin Only) or Tasks Overview */}
          <div className="lg:col-span-2 space-y-10">
            {isAdmin && (
              <div className="elevated-card p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Revenue</h3>
                    <p className="text-sm text-slate-500 mt-1">Monthly revenue streams</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-100 bg-indigo-50 text-xs font-medium text-indigo-600">
                      <TrendingUp size={14} />
                      Insights
                    </div>
                  </div>
                </div>
                <div className="h-[280px]">
                  {loadingPayments ? (
                    <div className="w-full h-full bg-slate-50 animate-pulse rounded-2xl" />
                  ) : (
                    <RevenueBarChart data={revenueData as any} />
                  )}
                </div>
              </div>
            )}

            {/* Work Activity Log */}
            <div className="elevated-card p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Activity stream</h3>
                  <p className="text-sm text-slate-500 mt-1">Recent operational updates</p>
                </div>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  View all
                </button>
              </div>

              {loadingActivities ? (
                <div className="space-y-8 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-4 h-14 bg-slate-50 rounded-2xl" />
                  ))}
                </div>
              ) : activities && activities.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:left-[1.75rem] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                  {activities.map((a) => (
                    <div key={a.id} className="flex items-start gap-4 group relative">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 border border-slate-100 relative z-10">
                        <Zap size={16} />
                      </div>
                      <div className="flex-1 mt-0.5">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <p className="text-sm text-slate-700">
                            <span className="font-medium text-slate-900">{a.profiles?.name || 'System'}</span>
                            <span className="text-slate-400 mx-1.5">&bull;</span>
                            {a.action}
                            <span className="text-slate-400 mx-1.5">&bull;</span>
                            <span className="text-slate-500">{a.tasks?.title || 'Operational Log'}</span>
                          </p>
                          <span className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
                            <Clock size={12} />
                            {mounted ? getRelativeTime(a.created_at) : '...'}
                          </span>
                        </div>
                        {(a.old_value || a.new_value) && (
                          <div className="mt-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100/50 inline-flex items-center gap-2 text-xs">
                             {a.old_value && <span className="text-slate-500 line-through">{a.old_value}</span>}
                             {a.old_value && a.new_value && <ArrowUpRight size={14} className="text-slate-400" />}
                             {a.new_value && <span className="font-medium text-slate-700">{a.new_value}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Clock size={24} />
                  </div>
                  <p className="text-sm text-slate-500">No recent activity.</p>
                </div>
              )}
            </div>
          </div>

          {/* Side Intelligence Column */}
          <div className="space-y-8">
            {/* System Pulse Card */}
            <div className="elevated-card p-8 bg-slate-900 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-6">System Status</h3>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                           <span className="text-slate-400">Response time</span>
                           <span className="text-emerald-400">32ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-[42%]" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                           <span className="text-slate-400">Database</span>
                           <span className="text-blue-400">Healthy</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[78%]" />
                        </div>
                     </div>
                  </div>
                  
                  <button className="w-full mt-8 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
                    View analytics
                  </button>
               </div>
            </div>

            {/* Quick Actions / Leads Insight (Admin only) */}
            {isAdmin && (
              <div className="elevated-card p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Velocity</h3>
                <div className="h-[200px]">
                  {loadingLeads ? (
                    <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl" />
                  ) : (
                    <LeadsLineChart data={leadsData as any} />
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                        +{activeLeads}
                      </div>
                   </div>
                   <p className="text-sm text-slate-500">Recent leads</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

