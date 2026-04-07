'use client'

import TeamChat from '@/components/admin/TeamChat'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import { MessagesSquare } from 'lucide-react'

export default function TeamChatPage() {
  const { profile } = useAdminAuthStore()

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-transparent">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06] shrink-0 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
          <MessagesSquare size={16} className="text-indigo-400" />
        </div>
        <div>
          <h1 className="text-base font-black text-white uppercase tracking-widest">Team Chat</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            Real-time collaboration • {profile?.name}
          </p>
        </div>
      </div>

      {/* Chat UI fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <TeamChat />
      </div>
    </div>
  )
}
