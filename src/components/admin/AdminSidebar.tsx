'use client'

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Bell,
  Briefcase,
  MessageSquare,
  MessagesSquare,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
  GraduationCap,
  Layout,
  ClipboardList,
  UserRound,
  FileChartLine,
  CheckSquare
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: MessageSquare, label: 'Leads', href: '/admin/leads' },
  { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
  { icon: CheckSquare, label: 'Tasks', href: '/admin/tasks' },
  { icon: Users, label: 'Employees', href: '/admin/employees' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: Briefcase, label: 'Services', href: '/admin/services' },
  { icon: Layout, label: 'Blogs', href: '/admin/blogs' },
  { icon: GraduationCap, label: 'Training leads', href: '/admin/training-leads' },
  { icon: MessageSquare, label: 'Chatbot', href: '/admin/chatbot' },
  { icon: MessagesSquare, label: 'Team chat', href: '/admin/chat' },
  { icon: FileChartLine, label: 'Reports', href: '/admin/reports' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications', badge: true },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

const employeeNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: CheckSquare, label: 'My tasks', href: '/admin/tasks' },
  { icon: ClipboardList, label: 'Daily updates', href: '/admin/daily-updates' },
  { icon: MessagesSquare, label: 'Team chat', href: '/admin/chat' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications', badge: true },
  { icon: UserRound, label: 'Profile', href: '/admin/settings' },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { profile, logout } = useAdminAuthStore()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    navigate('/admin/login')
  }

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'A'

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 shrink-0 z-50 border-r"
      style={{
        width: collapsed ? '80px' : '280px',
        backgroundColor: 'var(--sidebar)',
        borderRight: '1px solid var(--sidebar-border)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-8"
      >
        {!collapsed && (
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-1 transition-transform hover:scale-105 active:scale-95">
            <img 
              src="/logo.png" 
              alt="Fynryx" 
              width={120} 
              height={36} 
              className="h-8 w-auto object-contain brightness-0 invert" 
            />
          </Link>
        )}
        {collapsed && (
          <Link to="/admin/dashboard" className="mx-auto transition-transform hover:scale-110 active:scale-90">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
               <span className="text-lg font-black text-white">F</span>
            </div>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
        {(profile?.role === 'admin' ? adminNavItems : employeeNavItems).map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className="flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative group"
              style={{
                background: active ? 'rgba(79, 70, 229, 0.15)' : 'transparent',
                color: active ? '#ffffff' : '#94a3b8',
                boxShadow: active ? 'inset 0 0 0 1px rgba(99, 102, 241, 0.2)' : 'none',
              }}
            >
               {active && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
              )}

              <div className={`relative shrink-0 transition-transform duration-200`}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                {item.badge && (
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-slate-900 bg-indigo-500"
                  />
                )}
              </div>
              {!collapsed && (
                <span className={`text-sm font-medium transition-all ${active ? 'opacity-100' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {item.label}
                </span>
              )}
              {collapsed && (
                <span className="absolute left-[calc(100%+0.5rem)] px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800 text-white opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-all border border-slate-700 shadow-lg whitespace-nowrap translate-x-2 group-hover:translate-x-0">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: User Card */}
      <div className="p-4" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        {!collapsed && (
          <div className="flex items-center gap-3.5 px-4 py-4 mb-4 rounded-3xl bg-slate-800/40 border border-slate-700/50 group/user cursor-pointer overflow-hidden transition-all hover:bg-slate-800/60">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black transition-transform group-hover/user:scale-110"
                   style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff' }}>
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {profile?.name || 'Admin'}
              </p>
              <p className="text-xs text-slate-400 leading-none mt-1">
                {profile?.role === 'admin' ? 'Administrator' : 'Employee'}
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center mb-6">
            <div className="relative group/user cursor-pointer">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black"
                   style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff' }}>
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 w-full px-4 py-3 rounded-2xl transition-all duration-300 text-slate-400 group relative overflow-hidden"
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.1)'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#ef4444'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'
          }}
        >
          <LogOut size={18} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </aside>
  )
}
