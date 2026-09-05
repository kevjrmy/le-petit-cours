-- Progress: one row per learner per lesson.
--
-- Scope, from docs/decisions.md #8: this database holds accounts and progress and
-- nothing else. It has no knowledge of the book — no lessons table, no foreign key
-- to one, no titles. `path` is an opaque string owned by src/data/navigation.ts,
-- which is the single source of truth for what a lesson is (AGENTS.md §6).
--
-- Authorization is row-level security, not application code (docs/decisions.md #19).

create table if not exists public.progress (
  user_id     uuid        not null references auth.users (id) on delete cascade,
  path        text        not null,

  -- Ticked by the learner, never by the app. Finishing a drill does not set this;
  -- a half-remembered pass at 50 % is not a finished lesson (AGENTS.md §8).
  done        boolean     not null default false,

  -- The last run of a graded exercise. Null on prose lessons and on games, which
  -- record nothing by design. Only the last run is kept — no attempt history.
  score       smallint,
  score_total smallint,
  scored_at   timestamptz,

  created_at  timestamptz not null default now(),

  -- Deliberately has no trigger forcing now(). This is an offline PWA: a learner
  -- ticking a lesson underground writes locally and syncs on reconnect, so the
  -- moment that matters is when they ticked it, not when the row reached the
  -- server. The client sends it; last write per row wins. A client can only ever
  -- lie about its own rows.
  updated_at  timestamptz not null default now(),

  primary key (user_id, path),

  -- Loose on purpose. A strict slug pattern would reject a future path and fail
  -- inside a background sync, where nobody sees it.
  constraint progress_path_shape check (path ~ '^/[^[:space:]]{1,199}$'),

  constraint progress_score_complete check (
    (score is null and score_total is null and scored_at is null) or
    (score is not null and score_total is not null and scored_at is not null)
  ),
  constraint progress_score_range check (
    score is null or (score >= 0 and score_total > 0 and score <= score_total)
  )
);

comment on table public.progress is
  'One row per learner per lesson path. Ticked manually; scores are last-run only.';
comment on column public.progress.path is
  'Route path from src/data/navigation.ts. Renaming one orphans its rows - see AGENTS.md §6 pathAliases.';
comment on column public.progress.updated_at is
  'Client-supplied. Last write per row wins; see the migration for why there is no trigger.';

-- Redundant while the automatic-RLS event trigger is on, and kept anyway: this
-- file should be correct if replayed into a project without it.
alter table public.progress enable row level security;

revoke all on public.progress from anon;
grant select, insert, update, delete on public.progress to authenticated;

-- Four policies rather than one FOR ALL, so that a later change to one verb does
-- not silently widen the others. `(select auth.uid())` rather than a bare call:
-- the planner hoists it to an initPlan and evaluates it once per statement
-- instead of once per row.
drop policy if exists "progress_select_own" on public.progress;
drop policy if exists "progress_insert_own" on public.progress;
drop policy if exists "progress_update_own" on public.progress;
drop policy if exists "progress_delete_own" on public.progress;

create policy "progress_select_own" on public.progress
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "progress_insert_own" on public.progress
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "progress_update_own" on public.progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "progress_delete_own" on public.progress
  for delete to authenticated
  using ((select auth.uid()) = user_id);
