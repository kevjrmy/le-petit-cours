-- Progress and settings.
--
-- Scope, from docs/decisions.md #8: this database holds accounts and progress and
-- nothing else. It has no knowledge of the book — no lessons table, no foreign key
-- to one, no titles. `path` is an opaque string owned by src/data/navigation.ts,
-- which is the single source of truth for what a lesson is (AGENTS.md §6).
--
-- Authorization is row-level security, not application code (docs/decisions.md #19).

-- ---------------------------------------------------------------------------
-- progress: one row per lesson a learner has marked done.
--
-- The row IS the tick. There is no `done` column: marking writes a row,
-- unmarking deletes it. Nothing else is stored — no scores, no attempt history,
-- no last-visited. An account holds an email, progress and settings, and
-- nothing else (docs/scope.md), and this is the progress half.
--
-- Note what is NOT here: the level. Progress is keyed by path alone, so a
-- learner who moves from A2 down to A1 and back finds every tick where they
-- left it. Putting the level in the key — or on the row — would fragment
-- progress per level, which is the exact failure this design exists to avoid.
-- ---------------------------------------------------------------------------
create table public.progress (
  user_id   uuid        not null references auth.users (id) on delete cascade,
  path      text        not null,

  -- When the learner ticked it. Client-supplied, deliberately: this is an
  -- offline PWA, so the moment that matters is when they ticked it, not when
  -- the row reached the server. A client can only ever lie about its own rows.
  marked_at timestamptz not null default now(),

  primary key (user_id, path),

  -- Loose on the slug — a strict pattern would reject a future path and fail
  -- inside a background sync where nobody sees it — but strict on the trailing
  -- slash, because '/x' and '/x/' would otherwise be two ticks for one lesson.
  constraint progress_path_shape check (path ~ '^/[^[:space:]]{1,199}$' and path !~ '/$')
);

comment on table public.progress is
  'One row per lesson a learner has marked done. The row is the tick; unmarking deletes it.';
comment on column public.progress.path is
  'Route path from src/data/navigation.ts. Renaming one orphans its rows - see AGENTS.md §6 pathAliases.';

-- ---------------------------------------------------------------------------
-- settings: one row per learner.
--
-- `level` decides which content the book shows. It is a filter over lessons
-- that all continue to exist, never a fork in the content, and switching it
-- touches no progress row.
--
-- Only the levels that have content are accepted. B1-C2 are declared in the
-- manifest and render as *bientôt* (AGENTS.md §6); accepting one here would
-- let a learner select an empty book. Adding B1 is then a one-line migration,
-- which is the right amount of friction.
--
-- `level` is nullable and has no default: unchosen is a real state, and the app
-- asks on first sign-in rather than guessing A1. A missing row and a row with a
-- null level are the same state — do not make code distinguish them. A learner
-- who already picked a level while signed out has answered the question, and
-- the app should adopt that choice rather than ask again.
-- ---------------------------------------------------------------------------
create table public.settings (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  level      text,
  updated_at timestamptz not null default now(),

  constraint settings_level_known check (level is null or level in ('A1', 'A2'))
);

comment on table public.settings is
  'One row per learner. Currently the chosen CEFR level; the local copy stays the read path.';
comment on column public.settings.level is
  'Null means not chosen yet - the app asks on first sign-in. Same state as no row at all.';

-- ---------------------------------------------------------------------------
-- Row-level security. Redundant while the automatic-RLS event trigger is on,
-- and kept anyway: this file should be correct replayed into a project without
-- it. Four policies per table rather than one FOR ALL, so that a later change
-- to one verb cannot silently widen the others. `(select auth.uid())` rather
-- than a bare call: the planner hoists it to an initPlan and evaluates it once
-- per statement instead of once per row.
-- ---------------------------------------------------------------------------
alter table public.progress enable row level security;
alter table public.settings enable row level security;

revoke all on public.progress from anon;
revoke all on public.settings from anon;
grant select, insert, update, delete on public.progress to authenticated;
grant select, insert, update, delete on public.settings to authenticated;

create policy "progress_select_own" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "progress_insert_own" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "progress_update_own" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id)
                              with check ((select auth.uid()) = user_id);
create policy "progress_delete_own" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "settings_select_own" on public.settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "settings_insert_own" on public.settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "settings_update_own" on public.settings
  for update to authenticated using ((select auth.uid()) = user_id)
                              with check ((select auth.uid()) = user_id);
create policy "settings_delete_own" on public.settings
  for delete to authenticated using ((select auth.uid()) = user_id);
