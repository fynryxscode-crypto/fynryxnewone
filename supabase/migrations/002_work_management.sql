-- 002_work_management.sql
-- Work Management System (JIRA-like) Tables

-- 1. Tasks Table
CREATE TYPE task_priority AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE task_status AS ENUM ('To Do', 'In Progress', 'Completed', 'Blocked');

CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority task_priority DEFAULT 'Medium',
  status task_status DEFAULT 'To Do',
  assigned_to uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  due_date DATE,
  labels TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Daily Updates Table
CREATE TABLE IF NOT EXISTS public.daily_updates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  work_description TEXT NOT NULL,
  next_day_plan TEXT,
  blockers TEXT,
  time_spent numeric(5,2) DEFAULT 0, -- in hours
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Comments Table
CREATE TABLE IF NOT EXISTS public.task_comments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Activity Log Table
CREATE TABLE IF NOT EXISTS public.task_activity_log (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_activity_log ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated can manage tasks" ON public.tasks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage daily updates" ON public.daily_updates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage comments" ON public.task_comments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage activity log" ON public.task_activity_log FOR ALL USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_daily_updates_user_id ON public.daily_updates(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_updates_date ON public.daily_updates(date);
CREATE INDEX IF NOT EXISTS idx_task_comments_task_id ON public.task_comments(task_id);
CREATE INDEX IF NOT EXISTS idx_task_activity_log_task_id ON public.task_activity_log(task_id);

-- Update Roles check constraint on Profiles (if needed)
-- Currently role is just text. Let's make it consistent.
-- Note: 'admin' already used in migration 001. We'll add 'employee' and 'manager' via app logic.
