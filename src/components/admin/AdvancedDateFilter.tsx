'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronDown, X } from 'lucide-react'

export type DateFilterRange = 'all' | 'today' | 'yesterday' | 'last7' | 'last30' | 'custom'

interface AdvancedDateFilterProps {
  onFilterChange: (range: DateFilterRange, customRange?: { start: Date; end: Date }) => void
}

export default function AdvancedDateFilter({ onFilterChange }: AdvancedDateFilterProps) {
  const [range, setRange] = useState<DateFilterRange>('all')
  const [isOpen, setIsOpen] = useState(false)

  const options: { label: string; value: DateFilterRange }[] = [
    { label: 'All Time', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7' },
    { label: 'Last 30 Days', value: 'last30' },
    // Custom range can be added later with a proper date picker library if needed
  ]

  const handleSelect = (val: DateFilterRange) => {
    setRange(val)
    setIsOpen(false)
    onFilterChange(val)
  }

  const activeLabel = options.find((o) => o.value === range)?.label || 'All Time'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all"
        style={{
          background: 'var(--input-bg)',
          border: '1px solid var(--border-bold)',
          color: 'var(--text-main)',
        }}
      >
        <CalendarIcon size={16} style={{ color: 'var(--text-dim)' }} />
        <span>{activeLabel}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className="absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl z-50 overflow-hidden"
            style={{
              background: 'var(--card)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-sm transition-all text-left"
                style={{
                  color: range === opt.value ? 'var(--primary)' : 'var(--text-muted)',
                  background: range === opt.value ? 'var(--card-hover)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (range !== opt.value) {
                    ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--card-hover)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-main)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (range !== opt.value) {
                    ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
                  }
                }}
              >
                {opt.label}
                {range === opt.value && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
