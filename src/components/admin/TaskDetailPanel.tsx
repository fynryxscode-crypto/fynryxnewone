'use client'

import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import {
  X, MessageSquare, Paperclip, Send, Download,
  FileText, Image as ImageIcon, Trash2, Calendar, User, Flag,
  Clock, CheckCircle2, Ban, AlertCircle, ExternalLink
} from 'lucide-react'
import type { Task, TaskComment, TaskPriority, TaskStatus } from '@/types/admin'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

interface TaskDetailPanelProps {
  task: Task
  onClose: () => void
  isAdmin?: boolean
}

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  High: 'text-red-400 bg-red-400/10 border-red-400/20',
}

const STATUS_ICONS: Record<TaskStatus, React.ElementType> = {
  'To Do': Clock,
  'In Progress': AlertCircle,
  'Completed': CheckCircle2,
  'Blocked': Ban,
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  'To Do': 'text-slate-400 bg-slate-400/10',
  'In Progress': 'text-blue-400 bg-blue-400/10',
  'Completed': 'text-emerald-400 bg-emerald-400/10',
  'Blocked': 'text-red-400 bg-red-400/10',
}

export default function TaskDetailPanel({ task, onClose, isAdmin = false }: TaskDetailPanelProps) {
  const { profile } = useAdminAuthStore()
  const qc = useQueryClient()
  const [commentText, setCommentText] = useState('')
  const [activeTab, setActiveTab] = useState<'comments' | 'attachments' | 'activity'>('comments')
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const commentsEndRef = useRef<HTMLDivElement>(null)

  // Fetch comments
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['task-comments', task.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('task_comments')
        .select('*, profiles:user_id(id, name, email)')
        .eq('task_id', task.id)
        .order('created_at', { ascending: true })
      if (error) throw error
      return data as TaskComment[]
    },
  })

  // Fetch attachments
  const { data: attachments = [] } = useQuery({
    queryKey: ['task-attachments', task.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('task_attachments')
        .select('*, profiles:user_id(id, name)')
        .eq('task_id', task.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as any[]
    },
  })

  // Fetch activity log
  const { data: activities = [] } = useQuery({
    queryKey: ['task-log', task.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('task_activity_log')
        .select('*, profiles:user_id(id, name)')
        .eq('task_id', task.id)
        .order('created_at', { ascending: false })
        .limit(20)
      if (error) throw error
      return data as any[]
    },
  })

  // Post comment
  const postComment = useMutation({
    mutationFn: async (comment: string) => {
      const { error } = await supabase.from('task_comments').insert({
        task_id: task.id,
        user_id: profile?.id,
        comment,
      })
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['task-comments', task.id] })
      setCommentText('')
      setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  // Delete comment
  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase.from('task_comments').delete().eq('id', commentId)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['task-comments', task.id] }),
  })

  // Upload file
  const uploadFile = async (file: File) => {
    if (!profile?.id) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `task-attachments/${task.id}/${Date.now()}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('attachments').upload(path, file)
      if (uploadErr) throw uploadErr
      const { data: { publicUrl } } = supabase.storage.from('attachments').getPublicUrl(path)
      const { error: dbErr } = await supabase.from('task_attachments').insert({
        task_id: task.id,
        user_id: profile.id,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
      })
      if (dbErr) throw dbErr
      qc.invalidateQueries({ queryKey: ['task-attachments', task.id] })
      toast.success(`${file.name} uploaded`)
    } catch (e: any) {
      toast.error(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) Array.from(files).forEach(uploadFile)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    Array.from(e.dataTransfer.files).forEach(uploadFile)
  }

  const StatusIcon = STATUS_ICONS[task.status]

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#0f172a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/[0.08] shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${PRIORITY_COLORS[task.priority]}`}>
                <Flag size={9} className="inline mr-1" />{task.priority}
              </span>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 ${STATUS_COLORS[task.status]}`}>
                <StatusIcon size={10} />{task.status}
              </span>
              {task.projects?.title && (
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-lg truncate max-w-[150px]">
                  {task.projects.title}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white leading-snug">{task.title}</h2>
            {task.description && (
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{task.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-6 px-6 py-3 border-b border-white/[0.06] shrink-0 text-xs text-slate-400 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-slate-500" />
            <span>{task.profiles?.name || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-slate-500" />
            <span>{task.due_date ? new Date(task.due_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No due date'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare size={12} className="text-slate-500" />
            <span>{comments.length} comments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Paperclip size={12} className="text-slate-500" />
            <span>{attachments.length} files</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] shrink-0 px-6">
          {(['comments', 'attachments', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-3 mr-6 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* COMMENTS TAB */}
          {activeTab === 'comments' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {commentsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-6 h-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-12 text-slate-600">
                    <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No comments yet. Start the conversation.</p>
                  </div>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex gap-3 group">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-black text-indigo-400 shrink-0">
                        {(c.profiles?.name || 'U').slice(0, 1).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{c.profiles?.name || 'User'}</span>
                          <span className="text-[10px] text-slate-600">
                            {new Date(c.created_at).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed">
                          {c.comment}
                        </div>
                      </div>
                      {(isAdmin || c.user_id === profile?.id) && (
                        <button
                          onClick={() => deleteComment.mutate(c.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 self-start mt-5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))
                )}
                <div ref={commentsEndRef} />
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-black text-indigo-400 shrink-0">
                    {(profile?.name || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && commentText.trim()) {
                          e.preventDefault()
                          postComment.mutate(commentText.trim())
                        }
                      }}
                      placeholder="Add a comment… (Enter to send, Shift+Enter for new line)"
                      rows={2}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 resize-none transition-all"
                    />
                  </div>
                  <button
                    onClick={() => commentText.trim() && postComment.mutate(commentText.trim())}
                    disabled={!commentText.trim() || postComment.isPending}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all active:scale-95 shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ATTACHMENTS TAB */}
          {activeTab === 'attachments' && (
            <div className="p-6 space-y-4">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-white/[0.1] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                    <p className="text-sm text-indigo-400">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <Paperclip size={24} className="mx-auto mb-3 text-slate-500" />
                    <p className="text-sm text-slate-400 font-medium">Drop files here or click to upload</p>
                    <p className="text-xs text-slate-600 mt-1">Any file type supported</p>
                  </>
                )}
              </div>

              {/* File List */}
              {attachments.length === 0 ? (
                <div className="text-center py-6 text-slate-600 text-sm">No attachments yet</div>
              ) : (
                <div className="space-y-2">
                  {attachments.map((att) => {
                    const isImage = att.file_type?.startsWith('image/')
                    return (
                      <div key={att.id} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:bg-white/[0.05] transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                          {isImage ? <ImageIcon size={18} className="text-blue-400" /> : <FileText size={18} className="text-slate-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">{att.file_name}</p>
                          <p className="text-xs text-slate-600">
                            {att.profiles?.name} • {new Date(att.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <a
                          href={att.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <a
                          href={att.file_url}
                          download={att.file_name}
                          className="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Download size={14} />
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="p-6 space-y-3">
              {activities.length === 0 ? (
                <div className="text-center py-12 text-slate-600 text-sm">No activity recorded yet</div>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500/60 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-white">{act.profiles?.name || 'User'}</span>
                        {' '}{act.action}
                        {act.old_value && act.new_value && (
                          <span className="text-slate-500"> from <span className="text-amber-400">{act.old_value}</span> to <span className="text-emerald-400">{act.new_value}</span></span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        {new Date(act.created_at).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
