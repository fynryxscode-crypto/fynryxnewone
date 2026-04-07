'use client'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import { supabase } from '@/lib/supabase'

/**
 * useAuthGuard — use in any protected page/layout.
 * Redirects to /admin/login if user is not authenticated
 * after the store has been hydrated from localStorage.
 */
export function useAuthGuard() {
  const navigate = useNavigate()
  const { user, isHydrated } = useAdminAuthStore()

  useEffect(() => {
    if (!isHydrated) return // wait for localStorage rehydration
    if (!user) {
      // Double-check with Supabase (covers tab-refresh edge cases)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          navigate('/admin/login', { replace: true })
        }
      })
    }
  }, [user, isHydrated, navigate])

  return { user, isHydrated }
}

/**
 * useRedirectIfAuthed — use on login page to redirect away
 * if the user is already signed in.
 */
export function useRedirectIfAuthed(redirectTo = '/admin/dashboard') {
  const navigate = useNavigate()
  const { user, isHydrated } = useAdminAuthStore()

  useEffect(() => {
    if (!isHydrated) return
    if (user) {
      navigate(redirectTo, { replace: true })
    }
  }, [user, isHydrated, navigate, redirectTo])

  return { isHydrated }
}
