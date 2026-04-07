-- 007_activity_log_ext.sql
ALTER TABLE public.task_activity_log 
ADD COLUMN IF NOT EXISTS old_value TEXT,
ADD COLUMN IF NOT EXISTS new_value TEXT;
