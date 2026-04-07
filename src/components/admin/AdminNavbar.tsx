'use client'

import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Settings, LogOut, ChevronDown, Sun, Moon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import { useThemeStore } from '@/stores/themeStore'

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/leads': 'Leads',
  '/admin/notifications': 'Notifications',
  '/admin/services': 'Services',
  '/admin/chatbot': 'ChatBot History',
  '/admin/payments': 'Payments',
  '/admin/settings': 'Settings',
  '/admin/blog': 'Blog Management',
}

export default function AdminNavbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { profile, logout } = useAdminAuthStore()
  const { mode, toggleTheme } = useThemeStore()
  const [unreadCount, setUnreadCount] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const title = pageTitles[pathname] || 'Admin Panel'

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'A'

  useEffect(() => {
    const fetchUnread = async () => {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)
      setUnreadCount(count || 0)
    }
    fetchUnread()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    navigate('/admin/login')
  }

  return (
    <header
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors"
      style={{
        background: 'var(--navbar)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-bold)',
      }}
    >
      <h1 className="text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <div className="h-6 w-px" style={{ background: 'var(--border-bold)' }} />

        {/* Notification bell */}
        <button
          onClick={() => navigate('/admin/notifications')}
          className="relative p-2 rounded-xl transition-all"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--card-hover)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-main)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
          }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              className="absolute top-1 right-1 min-w-[16px] h-4 flex items-center justify-center text-[10px] font-bold rounded-full px-1"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px" style={{ background: 'var(--border-bold)' }} />

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--card-hover)'
            }}
            onMouseLeave={(e) => {
              if (!dropdownOpen) {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff' }}
            >
              {initials}
            </div>
            <span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--text-main)' }}>
              {profile?.name?.split(' ')[0] || 'Admin'}
            </span>
            <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-2xl z-50 overflow-hidden"
              style={{
                background: 'var(--card)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                  {profile?.name || 'Admin'}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                  {profile?.email || ''}
                </p>
              </div>
              <button
                onClick={() => {
                  setDropdownOpen(false)
                  navigate('/admin/settings')
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors text-left"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--card-hover)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-main)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
                }}
              >
                <Settings size={15} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors text-left"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#f87171'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
