'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/types/admin'

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  isHydrated: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  setHydrated: (val: boolean) => void
  logout: () => void
}

export const useAdminAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      profile: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session, user: session?.user ?? null }),
      setProfile: (profile) => set({ profile }),
      setHydrated: (val) => set({ isHydrated: val }),
      logout: () => set({ user: null, session: null, profile: null }),
    }),
    {
      name: 'fynryx-admin-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist non-sensitive fields
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)
