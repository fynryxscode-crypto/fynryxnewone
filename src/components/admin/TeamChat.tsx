'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import { Send, Hash, Users, Smile, AtSign } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const CHANNELS = ['general', 'development', 'design', 'announcements']

interface TeamMessage {
  id: string
  user_id: string
  channel: string
  message: string
  created_at: string
  profiles?: { id: string; name: string; email: string }
}

export default function TeamChat() {
  const { profile } = useAdminAuthStore()
  const qc = useQueryClient()
  const [channel, setChannel] = useState('general')
  const [message, setMessage] = useState('')
  const [prevMessageCount, setPrevMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Fetch messages for current channel
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['team-messages', channel],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_messages')
        .select('*, profiles:user_id(id, name, email)')
        .eq('channel', channel)
        .order('created_at', { ascending: true })
        .limit(100)
      if (error) throw error
      return data as TeamMessage[]
    },
    refetchInterval: 5000, // Poll every 5 seconds
  })

  // Real-time subscription
  useEffect(() => {
    const subscription = supabase
      .channel(`team-messages-${channel}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'team_messages', filter: `channel=eq.${channel}` },
        () => { qc.invalidateQueries({ queryKey: ['team-messages', channel] }) }
      )
      .subscribe()

    return () => { supabase.removeChannel(subscription) }
  }, [channel, qc])

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > prevMessageCount) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      setPrevMessageCount(messages.length)
    }
  }, [messages.length, prevMessageCount])

  // Initial scroll to bottom
  useEffect(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'instant' }), 200)
  }, [channel])

  const sendMessage = useMutation({
    mutationFn: async (msg: string) => {
      const { error } = await supabase.from('team_messages').insert({
        user_id: profile?.id,
        channel,
        message: msg,
      })
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['team-messages', channel] })
      setMessage('')
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const handleSend = () => {
    const trimmed = message.trim()
    if (!trimmed) return
    sendMessage.mutate(trimmed)
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups: Record<string, TeamMessage[]>, msg) => {
    const date = new Date(msg.created_at).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    if (!groups[date]) groups[date] = []
    groups[date].push(msg)
    return groups
  }, {})

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const AVATAR_COLORS = ['from-indigo-500 to-purple-500', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500', 'from-rose-500 to-pink-500']
  const getAvatarColor = (userId: string) => AVATAR_COLORS[userId.charCodeAt(0) % AVATAR_COLORS.length]

  return (
    <div className="flex h-full min-h-[calc(100vh-200px)]">
      {/* Channel Sidebar */}
      <div className="w-56 bg-black/20 border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-white/[0.06]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Channels</p>
        </div>
        <div className="flex-1 py-2 space-y-0.5 px-2">
          {CHANNELS.map((ch) => (
            <button
              key={ch}
              onClick={() => setChannel(ch)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                channel === ch
                  ? 'bg-indigo-500/15 text-white border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Hash size={14} className={channel === ch ? 'text-indigo-400' : 'text-slate-600'} />
              <span className="font-medium capitalize">{ch}</span>
            </button>
          ))}
        </div>

        {/* Online Members Count */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users size={12} />
            <span>Team active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-auto" />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
          <Hash size={16} className="text-indigo-400" />
          <h3 className="font-bold text-white capitalize">{channel}</h3>
          <span className="text-xs text-slate-500 ml-auto">{messages.length} messages</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-6 h-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <Hash size={24} className="text-indigo-400" />
              </div>
              <p className="text-slate-400 font-semibold">No messages in #{channel} yet</p>
              <p className="text-slate-600 text-sm mt-1">Be the first to say something!</p>
            </div>
          ) : (
            Object.entries(groupedMessages).map(([date, dayMessages]) => (
              <div key={date}>
                {/* Date Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">{date}</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {/* Messages for this date */}
                <div className="space-y-1">
                  {dayMessages.map((msg, idx) => {
                    const prevMsg = idx > 0 ? dayMessages[idx - 1] : null
                    const isContinuation = prevMsg && prevMsg.user_id === msg.user_id &&
                      new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime() < 3 * 60 * 1000
                    const isOwn = msg.user_id === profile?.id

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`group flex items-end gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                      >
                        {/* Avatar */}
                        {!isContinuation || isOwn ? (
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${getAvatarColor(msg.user_id)} flex items-center justify-center text-[10px] font-black text-white shrink-0 ${isContinuation && !isOwn ? 'invisible' : ''}`}>
                            {getInitials(msg.profiles?.name || 'U')}
                          </div>
                        ) : <div className="w-8 shrink-0" />}

                        <div className={`flex flex-col gap-1 max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                          {!isContinuation && (
                            <div className={`flex items-baseline gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
                              <span className="text-xs font-bold text-white">{isOwn ? 'You' : (msg.profiles?.name || 'User')}</span>
                              <span className="text-[10px] text-slate-600">
                                {new Date(msg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          )}
                          <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-full break-words ${
                            isOwn
                              ? 'bg-indigo-600 text-white rounded-br-md'
                              : 'bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-bl-md'
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 shrink-0">
          <div className="flex items-end gap-3 bg-white/[0.05] border border-white/[0.1] rounded-2xl px-4 py-3 focus-within:border-indigo-500/40 transition-all">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={`Message #${channel}…`}
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none max-h-32"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim() || sendMessage.isPending}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all active:scale-95 shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-700 mt-2">Enter to send • Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
