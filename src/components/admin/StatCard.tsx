'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: number; positive: boolean }
  color: 'blue' | 'cyan' | 'green' | 'yellow' | 'red'
  loading?: boolean
}

export default function StatCard({ title, value, icon, trend, color, loading }: StatCardProps) {
  const colorRgbMap = {
    blue: '59, 130, 246',
    cyan: '34, 211, 238',
    green: '52, 211, 153',
    yellow: '251, 191, 36',
    red: '239, 68, 68',
  }

  const rgb = colorRgbMap[color]

  if (loading) {
    return (
      <div
        className="rounded-3xl p-6 border shadow-sm animate-pulse"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--card-border)',
        }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <div className="h-4 w-24 rounded-lg" style={{ background: 'var(--border-subtle)' }} />
            <div className="h-10 w-36 rounded-xl" style={{ background: 'var(--border-subtle)' }} />
            <div className="h-3 w-20 rounded-lg" style={{ background: 'var(--border-subtle)', opacity: 0.5 }} />
          </div>
          <div className="w-14 h-14 rounded-2xl" style={{ background: 'var(--border-subtle)' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="elevated-card p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 mb-1">
            {title}
          </p>
          <p className="text-2xl font-semibold text-slate-900 mb-4">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  trend.positive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {trend.positive ? (
                  <TrendingUp size={14} className="opacity-80" />
                ) : (
                  <TrendingDown size={14} className="opacity-80" />
                )}
                {Math.abs(trend.value)}%
              </div>
              <span className="text-xs text-slate-400">
                from last month
              </span>
            </div>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ml-4 transition-colors duration-200"
          style={{
            background: `rgba(${rgb}, 0.1)`,
            color: `rgb(${rgb})`,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
