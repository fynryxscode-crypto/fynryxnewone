-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  role text default 'admin',
  phone text,
  company text,
  address text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (new.id, new.raw_user_meta_data->>'name', new.email, 'admin');
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- projects
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  client_name text not null,
  status text default 'Pending' check (status in ('Pending','Ongoing','Completed')),
  start_date date,
  end_date date,
  budget numeric(12,2) default 0,
  created_at timestamptz default now()
);
alter table public.projects enable row level security;
create policy "Authenticated can manage projects" on public.projects for all using (auth.role() = 'authenticated');

-- leads
create table if not exists public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  service text,
  message text,
  status text default 'New' check (status in ('New','Contacted','Converted')),
  created_at timestamptz default now()
);
alter table public.leads enable row level security;
create policy "Authenticated can manage leads" on public.leads for all using (auth.role() = 'authenticated');
create policy "Anyone can insert leads" on public.leads for insert with check (true);

-- services
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  icon text default '💡',
  price numeric(10,2),
  created_at timestamptz default now()
);
alter table public.services enable row level security;
create policy "Authenticated can manage services" on public.services for all using (auth.role() = 'authenticated');
create policy "Anyone can view services" on public.services for select using (true);

-- chatbot_logs
create table if not exists public.chatbot_logs (
  id uuid default uuid_generate_v4() primary key,
  user_name text,
  email text,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);
alter table public.chatbot_logs enable row level security;
create policy "Authenticated can manage chatbot logs" on public.chatbot_logs for all using (auth.role() = 'authenticated');
create policy "Anyone can insert chatbot logs" on public.chatbot_logs for insert with check (true);

-- payments
create table if not exists public.payments (
  id uuid default uuid_generate_v4() primary key,
  client_name text not null,
  amount numeric(12,2) not null default 0,
  status text default 'Pending' check (status in ('Paid','Pending','Overdue')),
  method text default 'Bank Transfer',
  payment_date date default current_date,
  created_at timestamptz default now()
);
alter table public.payments enable row level security;
create policy "Authenticated can manage payments" on public.payments for all using (auth.role() = 'authenticated');

-- notifications
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text,
  type text default 'info',
  is_read boolean default false,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;
create policy "Authenticated can manage notifications" on public.notifications for all using (auth.role() = 'authenticated');
create policy "Anyone can insert notifications" on public.notifications for insert with check (true);

-- Indexes for performance
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_payments_status on public.payments(status);
create index if not exists idx_notifications_is_read on public.notifications(is_read);
create index if not exists idx_notifications_created_at on public.notifications(created_at desc);
