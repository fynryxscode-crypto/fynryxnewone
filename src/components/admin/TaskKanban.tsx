'use client'

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Ban,
  MessageSquare,
  Paperclip,
  ChevronRight,
} from 'lucide-react'
import type { Task, TaskStatus, TaskPriority } from '@/types/admin'
import { motion, AnimatePresence } from 'framer-motion'
import TaskDetailPanel from './TaskDetailPanel'
import { useAdminAuthStore } from '@/stores/adminAuthStore'

interface TaskKanbanProps {
  tasks: Task[]
  onUpdateStatus: (id: string, status: TaskStatus) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const STATUS_COLUMNS: { id: TaskStatus; label: string; color: string; icon: React.ElementType; accent: string }[] = [
  { id: 'To Do', label: 'To Do', color: 'slate', icon: Clock, accent: 'border-t-slate-500/40' },
  { id: 'In Progress', label: 'In Progress', color: 'blue', icon: AlertCircle, accent: 'border-t-blue-500/40' },
  { id: 'Completed', label: 'Completed', color: 'green', icon: CheckCircle2, accent: 'border-t-emerald-500/40' },
  { id: 'Blocked', label: 'Blocked', color: 'red', icon: Ban, accent: 'border-t-red-500/40' },
]

const ICON_COLOR: Record<string, string> = {
  blue: 'text-blue-400',
  green: 'text-emerald-400',
  red: 'text-red-400',
  slate: 'text-slate-400',
}

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  High: 'text-red-400 bg-red-400/10 border-red-400/20',
}

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
]

export default function TaskKanban({ tasks, onUpdateStatus, onEdit, onDelete }: TaskKanbanProps) {
  const { profile } = useAdminAuthStore()
  const isAdmin = profile?.role === 'admin'
  const [detailTask, setDetailTask] = useState<Task | null>(null)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    onUpdateStatus(draggableId, destination.droppableId as TaskStatus)
  }

  const getTasksByStatus = (status: TaskStatus) => tasks.filter((t) => t.status === status)

  const getAvatarColor = (userId: string) => AVATAR_COLORS[(userId?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length]

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 overflow-x-auto pb-4 h-[calc(100vh-300px)] min-h-[500px]">
          {STATUS_COLUMNS.map((column) => {
            const colTasks = getTasksByStatus(column.id)
            return (
              <div
                key={column.id}
                className={`flex flex-col min-w-[300px] w-72 bg-white/[0.03] rounded-2xl border border-t-2 border-white/[0.07] overflow-hidden ${column.accent}`}
              >
                {/* Column Header */}
                <div className="p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <column.icon size={15} className={ICON_COLOR[column.color]} />
                    <h3 className="font-bold text-xs uppercase tracking-widest text-slate-200">
                      {column.label}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 p-3 space-y-2.5 overflow-y-auto custom-scrollbar transition-colors duration-200 ${
                        snapshot.isDraggingOver ? 'bg-white/[0.04]' : ''
                      }`}
                    >
                      {colTasks.length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-white/[0.06] rounded-xl text-slate-700 text-xs text-center">
                          Drop tasks here
                        </div>
                      )}

                      {colTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`group relative bg-[#111827] border border-white/[0.09] rounded-xl p-4 hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging
                                  ? 'rotate-1 scale-105 shadow-2xl shadow-black/50 border-indigo-500/50 z-50'
                                  : 'hover:shadow-lg hover:shadow-black/30'
                              }`}
                            >
                              <motion.div layout className="space-y-3">
                                {/* Priority + Project badge row */}
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${PRIORITY_STYLES[task.priority]}`}>
                                    {task.priority}
                                  </span>
                                  {task.projects?.title && (
                                    <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 truncate max-w-[110px]">
                                      {task.projects.title}
                                    </span>
                                  )}
                                </div>

                                {/* Title */}
                                <h4 className="text-[13px] font-semibold text-slate-100 leading-snug line-clamp-2">
                                  {task.title}
                                </h4>

                                {/* Meta row */}
                                <div className="flex items-center justify-between pt-1">
                                  <div className="flex items-center gap-3">
                                    {task.due_date && (
                                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                        <Calendar size={10} />
                                        <span>{new Date(task.due_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                                      </div>
                                    )}
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setDetailTask(task) }}
                                      className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-indigo-400 transition-colors"
                                    >
                                      <MessageSquare size={10} />
                                      <span>Detail</span>
                                    </button>
                                  </div>

                                  {/* Assignee */}
                                  <div
                                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAvatarColor(task.assigned_to || '')} flex items-center justify-center text-[9px] font-black text-white`}
                                    title={task.profiles?.name || 'Unassigned'}
                                  >
                                    {task.profiles?.name ? task.profiles.name.slice(0, 1).toUpperCase() : <User size={10} />}
                                  </div>
                                </div>

                                {/* Action buttons (hover) */}
                                {isAdmin && (
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-1 border-t border-white/[0.05]">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); onEdit(task) }}
                                      className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.08] text-[10px] transition-all"
                                    >
                                      <Edit2 size={11} /> Edit
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setDetailTask(task) }}
                                      className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-400/[0.08] text-[10px] transition-all"
                                    >
                                      <ChevronRight size={11} /> View
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
                                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/[0.08] transition-all"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  </div>
                                )}
                                {!isAdmin && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setDetailTask(task) }}
                                    className="w-full flex items-center justify-center gap-1 p-1.5 rounded-lg text-slate-600 hover:text-indigo-400 hover:bg-indigo-400/[0.06] text-[10px] transition-all opacity-0 group-hover:opacity-100 border-t border-white/[0.05] pt-2 mt-1"
                                  >
                                    <ChevronRight size={11} /> View Details
                                  </button>
                                )}
                              </motion.div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>

      {/* Task Detail Side Panel */}
      <AnimatePresence>
        {detailTask && (
          <TaskDetailPanel
            task={detailTask}
            onClose={() => setDetailTask(null)}
            isAdmin={isAdmin}
          />
        )}
      </AnimatePresence>
    </>
  )
}
