'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'

/**
 * AuthProvider mounts once in the admin layout and listens to
 * Supabase's onAuthStateChange in real-time. It updates the Zustand
 * store on every SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, and
 * USER_UPDATED event — keeping auth state truly real-time.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession, setProfile, setHydrated, logout } = useAdminAuthStore()
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Bootstrap: get current session immediately
    const bootstrap = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setSession(session)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (profile) setProfile(profile)
      }
      setHydrated(true)
    }

    bootstrap()

    // Real-time auth listener — fires on every auth event
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth]', event, session?.user?.email)

        if (event === 'SIGNED_OUT' || !session) {
          logout()
          return
        }

        if (
          event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED' ||
          event === 'INITIAL_SESSION'
        ) {
          setSession(session)

          // Fetch profile on any sign-in related event
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
            if (profile) setProfile(profile)
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setSession, setProfile, setHydrated, logout])

  return <>{children}</>
}
