'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, CheckCircle, Home } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAdminAuthStore } from '@/stores/adminAuthStore'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { setSession, setProfile, user, isHydrated } = useAdminAuthStore()

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Redirect already-authenticated users immediately
  useEffect(() => {
    if (isHydrated && user) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isHydrated, user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (isLogin) {
      // ── LOGIN ──────────────────────────────────────────────────
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (data.session) {
        setSession(data.session)

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        if (profile) setProfile(profile)

        toast.success('Welcome back! 👋')
        navigate('/admin/dashboard', { replace: true })
      }
    } else {
      // ── REGISTRATION ───────────────────────────────────────────
      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        setLoading(false)
        return
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        // Upsert profile — safe even if trigger already ran
        await supabase.from('profiles').upsert(
          {
            id: data.user.id,
            name,
            email,
            role: 'admin', // Default initial user as admin
            created_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )

        if (data.session) {
          setSession(data.session)
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()
          if (profile) setProfile(profile)

          toast.success('Account created! Welcome. 🚀')
          navigate('/admin/dashboard', { replace: true })
        } else {
          setSuccess('Account created! Please check your email to confirm your address.')
          setIsLogin(true)
        }
      }
    }

    setLoading(false)
  }

  if (isHydrated && user) return null

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Home Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group"
      >
        <Home size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-wider">Back to site</span>
      </Link>

      <div className="relative w-full max-w-md px-4">
        <div className="bg-white rounded-[2.5rem] p-10 w-full shadow-2xl shadow-blue-500/5 border border-slate-100">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 mb-4">
               <img src="/logo.png" alt="Fynryx" width={100} height={28} className="h-7 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin & Team Portal</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Access your workspace and manage tasks</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8 gap-1">
            {['Sign In', 'Join'].map((label, i) => {
              const active = (i === 0) === isLogin
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => { setIsLogin(i === 0); setError(''); setSuccess('') }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-1.5 ml-1 tracking-widest">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase font-black text-slate-400 mb-1.5 ml-1 tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@fynryx.com"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-black text-slate-400 mb-1.5 ml-1 tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="px-4 py-3 rounded-2xl bg-green-50 border border-green-100 text-green-600 text-xs font-bold animate-bounce-subtle">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-white text-sm transition-all flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>{isLogin ? 'Enter Workspace' : 'Create My Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
               Powered by Fynryx IT Solutions
             </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in-down 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
