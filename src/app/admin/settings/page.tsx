'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, Lock, Eye, EyeOff, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import type { Profile } from '@/types/admin'

export default function SettingsPage() {
  const qc = useQueryClient()
  const { user, setProfile } = useAdminAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    company: '',
    address: '',
  })

  // Security form
  const [securityForm, setSecurityForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ['profile-settings', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user')
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (error) throw error
      return data
    },
    enabled: !!user?.id,
  })

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || '',
        phone: profile.phone || '',
        company: profile.company || '',
        address: profile.address || '',
      })
    }
  }, [profile])

  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof profileForm) => {
      if (!user?.id) throw new Error('No user')
      const { error } = await supabase.from('profiles').update(data).eq('id', user.id)
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['profile-settings'] })
      if (profile) {
        setProfile({ ...profile, ...data })
      }
      toast.success('Identity synchronization successful.')
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updatePasswordMutation = useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('Security protocols updated: Password reset successful.')
      setSecurityForm({ newPassword: '', confirmPassword: '' })
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfileMutation.mutate(profileForm)
  }

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error('Cryptographic mismatch: Passwords do not align.')
      return
    }
    if (securityForm.newPassword.length < 8) {
      toast.error('Security violation: Password must be 8+ characters.')
      return
    }
    updatePasswordMutation.mutate({ password: securityForm.newPassword })
  }

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 outline-none transition-all focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 placeholder:text-slate-300"

  const tabs = [
    { key: 'profile' as const, label: 'Identity', icon: User },
    { key: 'security' as const, label: 'Protocols', icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10">
      <div className="max-w-[800px] mx-auto space-y-10">
        
        {/* Modern Header */}
        <header>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
            <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none uppercase">
              Core Configuration
            </h1>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
             Profile Management • Security Layer • Administrative Sync
          </p>
        </header>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/50 border border-slate-200 rounded-2xl w-fit">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-3 px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              style={{
                background: activeTab === key ? 'white' : 'transparent',
                color: activeTab === key ? 'var(--primary)' : 'var(--text-dim)',
                boxShadow: activeTab === key ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                border: activeTab === key ? '1px solid rgba(79,70,229,0.1)' : '1px solid transparent'
              }}
            >
              <Icon size={14} className={activeTab === key ? 'text-indigo-600' : 'text-slate-400'} />
              {label}
            </button>
          ))}
        </div>

        {/* Main Interface */}
        <div className="elevated-card bg-white p-10 border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-blue-500" />
           
           {activeTab === 'profile' ? (
             <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                   <div className="w-20 h-20 rounded-4xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-black shadow-sm">
                      {profileForm.name?.slice(0,1) || profile?.email?.slice(0,1) || 'U'}
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{profileForm.name || 'Anonymous Administrative Unit'}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mt-1">{profile?.role || 'Operational Personnel'}</p>
                   </div>
                </div>

                {isLoading ? (
                  <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-14 rounded-2xl bg-slate-50 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Full Designation</label>
                       <input
                        className={inputClass}
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Units Name"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Synchronization Channel (Email)</label>
                       <input
                        type="email"
                        readOnly
                        className={`${inputClass} opacity-50 cursor-not-allowed bg-slate-100`}
                        value={profile?.email || user?.email || ''}
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Communication Node (Phone)</label>
                       <input
                        className={inputClass}
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+0 000 000 0000"
                       />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Organization Context</label>
                       <input
                        className={inputClass}
                        value={profileForm.company}
                        onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                        placeholder="Designation Entity"
                       />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Geospatial Routing (Address)</label>
                       <textarea
                        className={`${inputClass} h-24 pt-4 resize-none`}
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Logical Location"
                       />
                    </div>
                    
                    <div className="md:col-span-2 pt-6 flex justify-end">
                      <button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                      >
                        <Save size={14} />
                        {updateProfileMutation.isPending ? 'Syncing...' : 'Archive Configuration'}
                      </button>
                    </div>
                  </form>
                )}
             </section>
           ) : (
             <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-10">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">Security Protocols</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Initialize cryptographic reset for access credentials.</p>
                </div>

                <form onSubmit={handleSecuritySubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">New Access Key</label>
                      <div className="relative">
                        <input
                          type={showNew ? 'text' : 'password'}
                          required
                          minLength={8}
                          className={`${inputClass} pr-14`}
                          value={securityForm.newPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                          placeholder="8+ Binary Characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Initialize Confirmation</label>
                      <div className="relative">
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          required
                          minLength={8}
                          className={`${inputClass} pr-14`}
                          value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                          placeholder="Verify Cryptographic Key"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {securityForm.newPassword && securityForm.confirmPassword && securityForm.newPassword !== securityForm.confirmPassword && (
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse">Sync Failure: Keys do not align</p>
                    )}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={
                        updatePasswordMutation.isPending ||
                        securityForm.newPassword !== securityForm.confirmPassword ||
                        securityForm.newPassword.length < 8
                      }
                      className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-100 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Lock size={14} />
                      {updatePasswordMutation.isPending ? 'Encrypting...' : 'Override Key'}
                    </button>
                  </div>
                </form>
             </section>
           )}
        </div>
      </div>
    </div>
  )
}
