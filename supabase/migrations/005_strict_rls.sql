-- 005_strict_rls.sql
-- Hardening Supabase Security with Strict Row-Level Security (RLS)

-- 0. Helper Function: is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (is_admin());
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. PROJECTS
DROP POLICY IF EXISTS "Authenticated can manage projects" ON public.projects;

CREATE POLICY "Admins manage projects" ON public.projects FOR ALL USING (is_admin());
CREATE POLICY "Employees can view projects" ON public.projects FOR SELECT USING (auth.role() = 'authenticated');

-- 3. LEADS
DROP POLICY IF EXISTS "Authenticated can manage leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Admins manage leads" ON public.leads FOR ALL USING (is_admin());
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- 4. PAYMENTS
DROP POLICY IF EXISTS "Authenticated can manage payments" ON public.payments;

CREATE POLICY "Admins manage payments" ON public.payments FOR ALL USING (is_admin());

-- 5. TASKS
DROP POLICY IF EXISTS "Authenticated can manage tasks" ON public.tasks;

CREATE POLICY "Admins manage tasks" ON public.tasks FOR ALL USING (is_admin());
CREATE POLICY "Employees view all tasks" ON public.tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Employees update assigned tasks" ON public.tasks FOR UPDATE USING (auth.uid() = assigned_to);

-- 6. DAILY UPDATES
DROP POLICY IF EXISTS "Authenticated can manage daily updates" ON public.daily_updates;

CREATE POLICY "Admins manage daily updates" ON public.daily_updates FOR ALL USING (is_admin());
CREATE POLICY "Users manage own updates" ON public.daily_updates FOR ALL USING (auth.uid() = user_id);

-- 7. NOTIFICATIONS
DROP POLICY IF EXISTS "Authenticated can manage notifications" ON public.notifications;
DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;

CREATE POLICY "Admins manage notifications" ON public.notifications FOR ALL USING (is_admin());
CREATE POLICY "Authenticated view shared notifications" ON public.notifications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public can insert alerts" ON public.notifications FOR INSERT WITH CHECK (true);

-- 8. SERVICE & LOGS
DROP POLICY IF EXISTS "Authenticated can manage services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (is_admin());
CREATE POLICY "Public view services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated can manage chatbot logs" ON public.chatbot_logs;
DROP POLICY IF EXISTS "Anyone can insert chatbot logs" ON public.chatbot_logs;
CREATE POLICY "Admins manage chatbot logs" ON public.chatbot_logs FOR ALL USING (is_admin());
CREATE POLICY "Public insert logs" ON public.chatbot_logs FOR INSERT WITH CHECK (true);
