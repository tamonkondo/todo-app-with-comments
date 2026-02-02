create type todos_status as enum ('TODO','PROGRESS','COMPLETE');
create table if not exists public.todos (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 contents text null,
 status todos_status default 'TODO',
 schedule date not null default current_date,
 createdAt date not null default current_date,
 updatedAt date not null default current_date
);