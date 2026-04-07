-- 006_team_and_task_ext.sql (idempotent version)

-- team_messages table
CREATE TABLE IF NOT EXISTS public.team_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  channel TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.team_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can access team messages" ON public.team_messages;
CREATE POLICY "Authenticated users can access team messages" ON public.team_messages FOR ALL USING (auth.role() = 'authenticated');

-- task_attachments table
CREATE TABLE IF NOT EXISTS public.task_attachments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.task_attachments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can access task attachments" ON public.task_attachments;
CREATE POLICY "Authenticated users can access task attachments" ON public.task_attachments FOR ALL USING (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS idx_task_attachments_task_id ON public.task_attachments(task_id);
