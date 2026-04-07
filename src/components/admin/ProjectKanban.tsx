'use client'

import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Edit2, Trash2, Calendar, DollarSign, User, MoreVertical } from 'lucide-react'
import type { Project } from '@/types/admin'
import { motion } from 'framer-motion'

interface ProjectKanbanProps {
  projects: Project[]
  onUpdateStatus: (id: string, status: Project['status']) => void
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

const COLUMNS: { id: Project['status']; label: string; color: string }[] = [
  { id: 'Pending', label: 'Pending', color: 'yellow' },
  { id: 'Ongoing', label: 'Ongoing', color: 'blue' },
  { id: 'Completed', label: 'Completed', color: 'green' },
]

export default function ProjectKanban({ projects, onUpdateStatus, onEdit, onDelete }: ProjectKanbanProps) {
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    onUpdateStatus(draggableId, destination.droppableId as Project['status'])
  }

  const getProjectsByStatus = (status: Project['status']) => {
    return projects.filter((p) => p.status === status)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-6">
        {COLUMNS.map((column) => (
          <div key={column.id} className="flex flex-col min-w-[320px] max-w-[400px]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ background: `rgb(var(--${column.color}-rgb, 59, 130, 246))` }} 
                />
                <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: 'var(--text-main)' }}>
                  {column.label}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
                  {getProjectsByStatus(column.id).length}
                </span>
              </div>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 min-h-[500px] rounded-3xl p-3 transition-colors duration-300 border-2 border-dashed ${
                    snapshot.isDraggingOver 
                      ? 'bg-blue-500/5 border-blue-500/20' 
                      : 'bg-transparent border-transparent'
                  }`}
                >
                  <div className="space-y-4">
                    {getProjectsByStatus(column.id).map((project, index) => (
                      <Draggable key={project.id} draggableId={project.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className={`group relative bg-[#0f172a] border border-white/5 rounded-3xl p-5 shadow-xl transition-all hover:border-blue-500/30 ${
                              snapshot.isDragging ? 'shadow-2xl ring-2 ring-blue-500/50 rotate-2' : ''
                            }`}
                          >
                            {/* Card Content */}
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-[15px] leading-tight flex-1 pr-4" style={{ color: 'var(--text-main)' }}>
                                  {project.title}
                                </h4>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); onEdit(project) }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(project.id) }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                {project.description || 'No description provided.'}
                              </p>

                              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                                  <User size={12} className="text-blue-500/60" />
                                  <span className="truncate">{project.client_name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-200">
                                  <DollarSign size={12} className="text-emerald-500/80" />
                                  <span>{Number(project.budget || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 col-span-2">
                                  <Calendar size={12} className="text-indigo-500/60" />
                                  <span>
                                    {project.start_date 
                                      ? new Date(project.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) 
                                      : 'No start date'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Status Accent Glow */}
                            <div className={`absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-[2px] blur-sm opacity-50 group-hover:opacity-100 transition-opacity bg-linear-to-r from-transparent via-${column.color}-500 to-transparent`} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
