'use client'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import { useThemeStore } from '@/stores/themeStore'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminNavbar from '@/components/admin/AdminNavbar'
import QueryProvider from '@/components/admin/QueryProvider'
import AuthProvider from '@/components/admin/AuthProvider'

function AdminGuard() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, profile, isHydrated, setSession, setProfile } = useAdminAuthStore()
  // Force Light Mode for Admin Panel
  const mode = 'light'
  const [checking, setChecking] = useState(true)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setSession(session)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (profile) setProfile(profile)
      } else if (!isLoginPage) {
        navigate('/admin/login', { replace: true })
      }
      setChecking(false)
    }

    // Wait for store hydration before checking
    if (isHydrated) {
      if (!user && !isLoginPage) {
        init()
      } else if (user && profile) {
        // RPAC: Role-Based Access Control
        const adminOnlyRoutes = ['/admin/employees', '/admin/reports', '/admin/tasks/manage', '/admin/leads']
        const isEmployee = profile.role === 'employee'
        
        if (isEmployee && adminOnlyRoutes.some(route => pathname.startsWith(route))) {
          toast.error('Unauthorized Access Restricted')
          navigate('/admin/dashboard', { replace: true })
        }
        setChecking(false)
      } else {
        setChecking(false)
      }
    }
  }, [isHydrated, user, profile, isLoginPage, pathname, navigate, setSession, setProfile])

  // Redirect already-authed users away from login page
  useEffect(() => {
    if (isHydrated && user && isLoginPage) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isHydrated, user, isLoginPage, navigate])

  if (isLoginPage) {
    return <div className={mode}><Outlet /></div>
  }

  if (!isHydrated || checking) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${mode}`}
        style={{ background: 'var(--background)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
          />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Verifying session...
          </p>
        </div>
      </div>
    )
  }

  if (!user) return null // redirect is in-flight

  return (
    <div className={`flex min-h-screen ${mode} bg-slate-50/50`}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminNavbar />
        {/* Main Content Area with optimized scroll and viewport behavior */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  return (
    <QueryProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1526',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      {/* AuthProvider sets up the real-time Supabase auth listener */}
      <AuthProvider>
        <AdminGuard />
      </AuthProvider>
    </QueryProvider>
  )
}
