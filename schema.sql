-- TEACH YOU database schema (additive only)
-- This script creates ty_* tables and does not modify your existing tables.

create table if not exists public.ty_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text default '',
  avatar_url text,
  role text not null default 'student' check (role in ('student','owner')),
  created_at timestamptz default now()
);

create table if not exists public.ty_courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  level text default 'beginner',
  language text default 'ar',
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.ty_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.ty_courses(id) on delete cascade,
  title text not null,
  content text default '',
  position integer default 0,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.ty_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.ty_lessons(id) on delete cascade,
  completed boolean default false,
  progress integer default 0 check (progress between 0 and 100),
  updated_at timestamptz default now(),
  unique(user_id, lesson_id)
);

create table if not exists public.ty_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid references public.ty_lessons(id) on delete set null,
  score numeric default 0,
  total numeric default 0,
  answers jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create or replace function public.ty_handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.ty_profiles (id,email,full_name)
  values (new.id,new.email,coalesce(new.raw_user_meta_data ->> 'full_name',''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists ty_on_auth_user_created on auth.users;
create trigger ty_on_auth_user_created after insert on auth.users
for each row execute function public.ty_handle_new_user();

create or replace function public.ty_is_owner()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists(select 1 from public.ty_profiles where id = auth.uid() and role = 'owner');
$$;

alter table public.ty_profiles enable row level security;
alter table public.ty_courses enable row level security;
alter table public.ty_lessons enable row level security;
alter table public.ty_lesson_progress enable row level security;
alter table public.ty_quiz_attempts enable row level security;

drop policy if exists "ty_profile_read" on public.ty_profiles;
create policy "ty_profile_read" on public.ty_profiles for select to authenticated
using (id = auth.uid() or public.ty_is_owner());

drop policy if exists "ty_profile_update" on public.ty_profiles;
create policy "ty_profile_update" on public.ty_profiles for update to authenticated
using (id = auth.uid() or public.ty_is_owner())
with check (public.ty_is_owner() or (id = auth.uid() and role = 'student'));

drop policy if exists "ty_courses_read" on public.ty_courses;
create policy "ty_courses_read" on public.ty_courses for select to authenticated
using (is_published = true or public.ty_is_owner());

drop policy if exists "ty_courses_owner" on public.ty_courses;
create policy "ty_courses_owner" on public.ty_courses for all to authenticated
using (public.ty_is_owner()) with check (public.ty_is_owner());

drop policy if exists "ty_lessons_read" on public.ty_lessons;
create policy "ty_lessons_read" on public.ty_lessons for select to authenticated
using (
  (is_published = true and exists(select 1 from public.ty_courses c where c.id=course_id and c.is_published=true))
  or public.ty_is_owner()
);

drop policy if exists "ty_lessons_owner" on public.ty_lessons;
create policy "ty_lessons_owner" on public.ty_lessons for all to authenticated
using (public.ty_is_owner()) with check (public.ty_is_owner());

drop policy if exists "ty_progress_read" on public.ty_lesson_progress;
create policy "ty_progress_read" on public.ty_lesson_progress for select to authenticated
using (user_id=auth.uid() or public.ty_is_owner());

drop policy if exists "ty_progress_insert" on public.ty_lesson_progress;
create policy "ty_progress_insert" on public.ty_lesson_progress for insert to authenticated
with check (user_id=auth.uid());

drop policy if exists "ty_progress_update" on public.ty_lesson_progress;
create policy "ty_progress_update" on public.ty_lesson_progress for update to authenticated
using (user_id=auth.uid() or public.ty_is_owner())
with check (user_id=auth.uid() or public.ty_is_owner());

drop policy if exists "ty_quiz_read" on public.ty_quiz_attempts;
create policy "ty_quiz_read" on public.ty_quiz_attempts for select to authenticated
using (user_id=auth.uid() or public.ty_is_owner());

drop policy if exists "ty_quiz_insert" on public.ty_quiz_attempts;
create policy "ty_quiz_insert" on public.ty_quiz_attempts for insert to authenticated
with check (user_id=auth.uid());

grant usage on schema public to authenticated;
grant select, insert, update on public.ty_profiles to authenticated;
grant select, insert, update, delete on public.ty_courses to authenticated;
grant select, insert, update, delete on public.ty_lessons to authenticated;
grant select, insert, update on public.ty_lesson_progress to authenticated;
grant select, insert on public.ty_quiz_attempts to authenticated;

-- After creating your own account, assign owner role using your email:
-- update public.ty_profiles set role='owner' where email='YOUR_EMAIL';
