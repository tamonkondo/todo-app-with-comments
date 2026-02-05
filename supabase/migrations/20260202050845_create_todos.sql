create type todos_status as enum ('TODO','PROGRESS','COMPLETE');
create table if not exists public.todos (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 contents text null,
 status todos_status not null default 'TODO',
 due_date date not null default current_date,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
