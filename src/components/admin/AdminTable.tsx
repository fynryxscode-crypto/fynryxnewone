'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search, Filter as FilterIcon, X } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AdminColumn {
  key: string
  header: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: any) => React.ReactNode
  width?: string
  filterable?: boolean
  filterType?: 'text' | 'select'
  filterOptions?: { label: string; value: string }[]
}

interface AdminTableProps {
  columns: AdminColumn[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  keyField: string
  loading?: boolean
  page?: number
  pageSize?: number
  totalCount?: number
  onPageChange?: (page: number) => void
  onFilterChange?: (filters: Record<string, string>) => void
  emptyMessage?: string
}

export default function AdminTable({
  columns,
  data,
  keyField,
  loading,
  page = 1,
  pageSize = 10,
  totalCount,
  onPageChange,
  onFilterChange,
  emptyMessage = 'No records found',
}: AdminTableProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [showFilterInputs, setShowFilterInputs] = useState<Record<string, boolean>>({})

  const total = totalCount ?? data.length
  const totalPages = Math.ceil(total / pageSize)

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value }
    if (!value) delete newFilters[key]
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const toggleFilterInput = (key: string) => {
    setShowFilterInputs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const skeletonRows = Array.from({ length: 5 })

  return (
    <div className="elevated-card overflow-hidden flex flex-col border border-slate-200 shadow-sm bg-white">
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-bottom border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] group relative transition-colors bg-slate-50/80"
                  style={{ color: 'var(--text-muted)', width: col.width }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{col.header}</span>
                    {col.filterable && (
                      <button 
                        onClick={() => toggleFilterInput(col.key)}
                        className={`p-1.5 rounded-lg transition-all ${activeFilters[col.key] ? 'text-indigo-600 bg-indigo-50 border border-indigo-100' : 'text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-200/50'}`}
                        title="Filter Column"
                      >
                        {activeFilters[col.key] ? <FilterIcon size={12} /> : <Search size={12} />}
                      </button>
                    )}
                  </div>

                  {/* Filter Popover */}
                  {col.filterable && showFilterInputs[col.key] && (
                    <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] p-3 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                       <div className="relative">
                        {col.filterType === 'select' ? (
                          <select 
                            value={activeFilters[col.key] || ''}
                            onChange={(e) => handleFilterChange(col.key, e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-700 outline-none focus:border-indigo-400 transition-all appearance-none uppercase tracking-widest"
                          >
                            <option value="">Status: All</option>
                            {col.filterOptions?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input 
                              autoFocus
                              placeholder={`Query ${col.header}...`}
                              value={activeFilters[col.key] || ''}
                              onChange={(e) => handleFilterChange(col.key, e.target.value)}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-400 transition-all"
                            />
                            {activeFilters[col.key] && (
                              <button onClick={() => handleFilterChange(col.key, '')} className="text-slate-400 hover:text-indigo-600 p-1">
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading
              ? skeletonRows.map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-5">
                        <div className="h-4 rounded-lg bg-slate-50 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.length === 0
              ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-20 text-center"
                  >
                    <div className="flex flex-col items-center gap-4 text-slate-300">
                      <Search size={40} className="opacity-20" />
                      <p className="text-[10px] uppercase font-black tracking-[0.3em]">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )
              : data.map((row, i) => (
                  <tr
                    key={String(row[keyField])}
                    className="transition-all group hover:bg-indigo-50/30"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-5 text-sm font-medium text-slate-600 transition-colors group-hover:text-slate-900 leading-none">
                        {col.render ? col.render(row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Viewport Control */}
      {onPageChange && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50 gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Displaying <span className="text-indigo-600">{Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)}</span> of <span className="text-indigo-600">{total}</span> Units
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-sm transition-all disabled:opacity-30 disabled:scale-95 hover:border-indigo-200 hover:shadow-indigo-500/5 text-slate-500 hover:text-indigo-600"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5 mx-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pg = i + 1
                if (totalPages > 5) {
                  if (page <= 3) pg = i + 1
                  else if (page >= totalPages - 2) pg = totalPages - 4 + i
                  else pg = page - 2 + i
                }
                return (
                  <button
                    key={pg}
                    onClick={() => onPageChange(pg)}
                    className="w-10 h-10 rounded-xl text-xs font-black transition-all border"
                    style={{
                      background: pg === page ? 'var(--primary)' : 'white',
                      borderColor: pg === page ? 'transparent' : 'var(--border-bold)',
                      color: pg === page ? '#fff' : 'var(--text-dim)',
                      boxShadow: pg === page ? '0 8px 15px rgba(79,70,229,0.25)' : 'none',
                    }}
                  >
                    {pg}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-sm transition-all disabled:opacity-30 disabled:scale-95 hover:border-indigo-200 hover:shadow-indigo-500/5 text-slate-500 hover:text-indigo-600"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
