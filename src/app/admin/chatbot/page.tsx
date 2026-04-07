'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, Trash2, MessageSquare, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import type { ChatbotLog, ChatMessage } from '@/types/admin'

export default function ChatbotPage() {
  const qc = useQueryClient()
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const [viewLog, setViewLog] = useState<ChatbotLog | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { data: logs = [], isLoading } = useQuery<ChatbotLog[]>({
    queryKey: ['chatbot-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_logs')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data || []).map((row) => ({
        ...row,
        messages: Array.isArray(row.messages) ? row.messages : [],
      }))
    },
  })

  const paginated = logs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('chatbot_logs').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chatbot-logs'] })
      toast.success('Conversation deleted.')
      setConfirmOpen(false)
      setDeleteId(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const columns = [
    {
      key: 'user_name',
      header: 'User Name',
      render: (row: ChatbotLog) => (
        <span className="font-medium" style={{ color: '#f1f5f9' }}>{row.user_name || 'Anonymous'}</span>
      ),
    },
    { key: 'email', header: 'Email', render: (row: ChatbotLog) => row.email || '—' },
    {
      key: 'messages',
      header: 'Messages',
      render: (row: ChatbotLog) => (
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}
        >
          {Array.isArray(row.messages) ? row.messages.length : 0}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (row: ChatbotLog) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: ChatbotLog) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setViewLog(row); setViewOpen(true) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)' }}
          >
            <Eye size={13} /> View
          </button>
          <button
            onClick={() => { setDeleteId(row.id); setConfirmOpen(true) }}
            className="p-1.5 rounded-lg"
            style={{ color: '#f87171', background: 'rgba(239,68,68,0.1)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold" style={{ color: '#f1f5f9' }}>ChatBot History</h2>
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}
        >
          {logs.length} sessions
        </span>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={paginated}
        keyField="id"
        loading={isLoading}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={logs.length}
        onPageChange={setPage}
        emptyMessage="No chat sessions recorded"
      />

      {/* View Conversation Modal */}
      <AdminModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Conversation"
        size="lg"
      >
        {viewLog && (
          <div>
            {/* User info header */}
            <div
              className="flex items-center justify-between p-3 rounded-xl mb-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>
                  {viewLog.user_name || 'Anonymous'}
                </p>
                <p className="text-xs" style={{ color: '#64748b' }}>
                  {viewLog.email || 'No email provided'}
                </p>
              </div>
              {viewLog.email && (
                <a
                  href={`mailto:${viewLog.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.1)' }}
                >
                  <Mail size={13} /> Contact User
                </a>
              )}
            </div>

            {/* Chat bubbles */}
            <div
              className="space-y-3 overflow-y-auto pr-1"
              style={{ maxHeight: '60vh' }}
            >
              {viewLog.messages && viewLog.messages.length > 0 ? (
                viewLog.messages.map((msg: ChatMessage, i: number) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center mr-2 shrink-0 mt-1"
                        style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}
                      >
                        <MessageSquare size={14} />
                      </div>
                    )}
                    <div
                      className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm"
                      style={{
                        background:
                          msg.role === 'user'
                            ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                            : 'rgba(255,255,255,0.07)',
                        color: '#f1f5f9',
                        borderBottomRightRadius: msg.role === 'user' ? 4 : undefined,
                        borderBottomLeftRadius: msg.role === 'assistant' ? 4 : undefined,
                      }}
                    >
                      <p className="leading-relaxed">{msg.content}</p>
                      {msg.timestamp && (
                        <p className="text-[10px] mt-1 opacity-60">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm py-8" style={{ color: '#475569' }}>
                  No messages in this conversation
                </p>
              )}
            </div>
          </div>
        )}
      </AdminModal>

      {/* Confirm Delete */}
      <AdminModal
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setDeleteId(null) }}
        title="Delete Conversation"
        size="sm"
      >
        <p className="text-sm mb-5" style={{ color: '#94a3b8' }}>
          Are you sure you want to delete this conversation? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { setConfirmOpen(false); setDeleteId(null) }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
          >
            Cancel
          </button>
          <button
            onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            disabled={deleteMutation.isPending}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#ef4444' }}
          >
            Delete
          </button>
        </div>
      </AdminModal>
    </div>
  )
}
