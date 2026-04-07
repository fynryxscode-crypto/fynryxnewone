-- 003_content_and_leads.sql
-- Add missing tables and update existing ones for the admin panel

-- 1. Update Leads Table to include 'type' and 'source'
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'general';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';

-- 2. Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Technology',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_image TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Subscribers Table (For Newsletter)
CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'Subscribed' CHECK (status IN ('Subscribed', 'Unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
CREATE POLICY "Authenticated can manage blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING (status = 'Published');

CREATE POLICY "Authenticated can manage testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (status = 'Active');

CREATE POLICY "Authenticated can view subscribers" ON public.subscribers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can insert subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);

-- 7. Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON public.blogs
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- 8. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_leads_type ON public.leads(type);
