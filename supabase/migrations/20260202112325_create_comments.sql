create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  contents text not null,
  todo_id uuid not null references todos(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);