export interface Profile {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  company?: string
  address?: string
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  client_name: string
  status: 'Pending' | 'Ongoing' | 'Completed'
  start_date: string
  end_date: string
  budget: number
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'New' | 'Contacted' | 'Converted'
  created_at: string
  type: string
  budget?: string
  source?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  price: number | null
  created_at: string
}

export interface ChatbotLog {
  id: string
  user_name: string
  email: string
  messages: ChatMessage[]
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface Payment {
  id: string
  client_name: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
  method: string
  payment_date: string
  created_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
}

export interface Blog {
  id: string
  title: string
  content: string
  author: string
  image_url: string | null
  category: string
  tags: string[]
  status: 'Draft' | 'Published' | 'Archived'
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_role?: string
  client_company?: string
  client_image?: string
  content: string
  rating: number
  is_featured: boolean
  status: 'Active' | 'Inactive'
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  status: 'Subscribed' | 'Unsubscribed'
  created_at: string
}

export type TaskPriority = 'Low' | 'Medium' | 'High'
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed' | 'Blocked'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  assigned_to: string | null
  project_id: string
  due_date: string | null
  labels: string[]
  created_at: string
  updated_at: string
  profiles?: Profile
  projects?: Project
}

export interface DailyUpdate {
  id: string
  user_id: string
  task_id: string | null
  work_description: string
  next_day_plan: string
  blockers: string
  time_spent: number
  date: string
  created_at: string
  profiles?: Profile
  tasks?: Task
}

export interface TaskComment {
  id: string
  task_id: string
  user_id: string
  comment: string
  created_at: string
  profiles?: Profile
}

export interface TaskActivity {
  id: string
  task_id: string
  user_id: string
  action: string
  created_at: string
  profiles?: Profile
}
