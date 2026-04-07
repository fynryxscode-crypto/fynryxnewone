-- 008_mentions_support.sql
ALTER TABLE public.task_comments ADD COLUMN IF NOT EXISTS mentions JSONB DEFAULT '[]';
ALTER TABLE public.team_messages ADD COLUMN IF NOT EXISTS mentions JSONB DEFAULT '[]';
