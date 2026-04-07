-- 004_seed_data.sql
-- Initial seed data for Fynryx IT Solutions Admin Panel

-- 1. Seed Services
INSERT INTO public.services (title, description, icon, price) VALUES
('Web Development', 'Custom high-performance web applications using Next.js and React.', '🌐', 1500.00),
('Mobile App Development', 'Native and Cross-platform mobile experiences for iOS and Android.', '📱', 2500.00),
('AI & ML Solutions', 'Intelligence-driven automation and predictive analytics.', '🤖', 5000.00),
('UI/UX Design', 'Modern, user-centric design with premium aesthetics.', '🎨', 1000.00);

-- 2. Seed Projects
INSERT INTO public.projects (title, description, client_name, status, start_date, budget) VALUES
('E-Commerce Platform', 'A full-scale online retail solution for a global fashion brand.', 'Vogue Trends Ltd', 'Ongoing', '2026-03-01', 12500.00),
('Healthcare Dashboard', 'Analytics portal for monitoring patient health metrics.', 'Aman Hospital', 'Pending', '2026-05-15', 8000.00),
('Corporate Site Redesign', 'Modernizing the digital presence of a logistics company.', 'Swift Logistics', 'Completed', '2026-01-10', 4500.00);

-- 3. Seed Leads
INSERT INTO public.leads (name, email, phone, service, message, status, type, budget) VALUES
('John Doe', 'john@example.com', '9876543210', 'Web Development', 'Looking to build a professional portfolio site.', 'New', 'general', '₹50,000'),
('Alice Smith', 'alice@techu.edu', '9123456789', 'Enrollment: UI/UX Masterclass', 'I want to enroll in the upcoming batch.', 'New', 'training', NULL),
('Robert Brown', 'robert@corp.com', '9988776655', 'AL & ML Solutions', 'Need an AI chatbot for our customer support.', 'Contacted', 'general', '₹5L - ₹10L');

-- 4. Seed Blogs
INSERT INTO public.blogs (title, content, author, category, status, published_at) VALUES
('The Future of Generative AI', 'Full article content about the impact of LLMs on software development...', 'Vivek Sharma', 'Artificial Intelligence', 'Published', now()),
('Mastering Next.js 15', 'Deep dive into the new features of Next.js 15 and React 19...', 'Admin', 'Technology', 'Published', now()),
('Modern UI Design Trends', 'Exploring glassmorphism, bento layouts, and micro-interactions...', 'Sarah Jenkins', 'Design', 'Draft', NULL);

-- 5. Seed Tasks
DO $$ 
DECLARE 
    proj_id uuid;
    prof_id uuid;
BEGIN
    SELECT id INTO proj_id FROM public.projects LIMIT 1;
    SELECT id INTO prof_id FROM public.profiles LIMIT 1;

    INSERT INTO public.tasks (title, description, priority, status, assigned_to, project_id, due_date) VALUES
    ('Frontend Setup', 'Initialize Next.js project with Tailwind and Framer Motion.', 'High', 'In Progress', prof_id, proj_id, '2026-04-10'),
    ('API Integration', 'Connect Supabase Auth and Database to the frontend.', 'Medium', 'To Do', NULL, proj_id, '2026-04-20'),
    ('UI Design Review', 'Review the Figma mocks with the client.', 'Low', 'Completed', prof_id, proj_id, '2026-03-25');
END $$;

-- 6. Seed Payments
INSERT INTO public.payments (client_name, amount, status, method, payment_date) VALUES
('Vogue Trends Ltd', 2500.00, 'Paid', 'Bank Transfer', '2026-03-05'),
('Swift Logistics', 4500.00, 'Paid', 'Stripe', '2026-02-15'),
('Aman Hospital', 1200.00, 'Pending', 'Bank Transfer', '2026-04-01');

-- 7. Seed Notifications
INSERT INTO public.notifications (title, message, type, is_read) VALUES
('Server Alert', 'Production server experienced a minor spike in latency.', 'warning', false),
('New Payment Received', 'Vogue Trends Ltd paid the milestone 1 invoice.', 'success', true),
('Lead Assigned', 'New training lead has been assigned to you.', 'info', false);
