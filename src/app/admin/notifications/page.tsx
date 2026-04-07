'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Users, CreditCard, Info, AlertTriangle, Bell, Check, Trash2, CheckCheck, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import type { Notification } from '@/types/admin'

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

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  lead: { icon: Users, color: '#22d3ee', bg: 'rgba(34,211,238,0.15)' },
  payment: { icon: CreditCard, color: '#34d399', bg: 'rgba(16,185,129,0.15)' },
  info: { icon: Info, color: '#60a5fa', bg: 'rgba(59,130,246,0.15)' },
  warning: { icon: AlertTriangle, color: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
}

const FILTER_TABS = ['All', 'Unread', 'Read'] as const

export default function NotificationsPage() {
  const qc = useQueryClient()
  const [filter, setFilter] = useState<string>('All')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ['notifications-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    },
  })

  // Realtime
  useEffect(() => {
    const channel = supabase
      .channel('notifications-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => {
        qc.invalidateQueries({ queryKey: ['notifications-all'] })
        qc.invalidateQueries({ queryKey: ['notifications-recent'] })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [qc])

  const filtered = useMemo(() => {
    if (filter === 'Unread') return notifications.filter((n) => !n.is_read)
    if (filter === 'Read') return notifications.filter((n) => n.is_read)
    return notifications
  }, [notifications, filter])

  const unreadCount = notifications.filter((n) => !n.is_read).length

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications-all'] })
      qc.invalidateQueries({ queryKey: ['notifications-recent'] })
    },
  })

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications-all'] })
      qc.invalidateQueries({ queryKey: ['notifications-recent'] })
      toast.success('System synchronization: All alerts marked as read.')
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notifications').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications-all'] })
      qc.invalidateQueries({ queryKey: ['notifications-recent'] })
      toast.success('Alert purged from logs.')
    },
    onError: (e: Error) => toast.error(e.message),
  })

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10">
      <div className="max-w-[1000px] mx-auto space-y-10">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
              <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none">
                System Alerts
              </h1>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              Communications Hub • {unreadCount} Priority Notifications
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             {unreadCount > 0 && (
               <button 
                onClick={() => markAllReadMutation.mutate()}
                disabled={markAllReadMutation.isPending}
                className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black uppercase tracking-widest text-[10px] shadow-sm hover:shadow-md hover:border-indigo-200 transition-all active:scale-95 group"
               >
                  <CheckCheck size={14} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                  Mark All Clear
               </button>
             )}
          </div>
        </header>

        {/* Filter Selection */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/50 border border-slate-200 rounded-2xl w-fit">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              style={{
                background: filter === tab ? 'white' : 'transparent',
                color: filter === tab ? 'var(--primary)' : 'var(--text-dim)',
                boxShadow: filter === tab ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                border: filter === tab ? '1px solid rgba(79,70,229,0.1)' : '1px solid transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity Stream */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="elevated-card p-6 bg-white flex items-center gap-6 animate-pulse">
                <div className="w-14 h-14 rounded-2xl bg-slate-50" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/3 bg-slate-50 rounded-lg" />
                  <div className="h-3 w-1/2 bg-slate-50/50 rounded-lg" />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="elevated-card py-24 bg-white text-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                <Bell size={40} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Atmosphere is Clear</h3>
              <p className="text-sm font-medium text-slate-400 mt-2">Check back later for system synchronization.</p>
            </div>
          ) : (
            filtered.map((n) => {
              const tc = typeConfig[n.type] || typeConfig.info
              const TypeIcon = tc.icon
              return (
                <div
                  key={n.id}
                  className={`elevated-card p-6 transition-all group flex items-start gap-6 relative overflow-hidden ${!n.is_read ? 'bg-white border-indigo-100 border-[1.5px]' : 'bg-white/80 opacity-80'}`}
                  style={{
                    boxShadow: !n.is_read ? '0 10px 40px rgba(79,70,229,0.08)' : 'var(--shadow-main)'
                  }}
                  onClick={() => {
                    if (!n.is_read) markReadMutation.mutate(n.id)
                  }}
                >
                  {!n.is_read && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-600" />
                  )}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 transition-transform group-hover:scale-105"
                    style={{ background: tc.bg, color: tc.color }}
                  >
                    <TypeIcon size={22} fill="currentColor" fillOpacity={0.1} />
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className={`text-sm font-black tracking-tight leading-none ${!n.is_read ? 'text-slate-900' : 'text-slate-500'}`}>
                          {n.title}
                        </h4>
                        <p className="text-[10px] font-bold text-indigo-600/60 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                           System Origin • {n.type}
                        </p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 shrink-0">
                        <Clock size={10} />
                        {mounted ? getRelativeTime(n.created_at) : '...'}
                      </span>
                    </div>
                    {n.message && (
                      <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-3xl">
                        {n.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    {!n.is_read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markReadMutation.mutate(n.id) }}
                        className="p-3 rounded-xl transition-all bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 active:scale-95"
                        title="Mark as Processed"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(n.id) }}
                      className="p-3 rounded-xl transition-all bg-slate-50 text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-95"
                      title="Purge Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
