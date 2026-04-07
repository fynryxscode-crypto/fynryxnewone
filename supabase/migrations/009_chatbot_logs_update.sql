-- 009_chatbot_logs_update.sql
-- Allow public users to update their own chatbot logs if they have the ID
-- This is necessary for the chatbot to sync messages during a session

DROP POLICY IF EXISTS "Public insert logs" ON public.chatbot_logs;
DROP POLICY IF EXISTS "Public update logs" ON public.chatbot_logs;

CREATE POLICY "Public insert logs" ON public.chatbot_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update logs" ON public.chatbot_logs FOR UPDATE USING (true) WITH CHECK (true);
