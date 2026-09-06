-- Progress is keyed by the lesson's id, not by its URL.
--
-- docs/decisions.md #50. The path was never the lesson — it carries the title,
-- the chapter and whatever spelling looked right the day the page was written,
-- and a course revises all three. Every rename therefore destroyed learner data
-- unless somebody remembered to add a `pathAliases` entry in the same commit,
-- and nothing failed when they did not. `Lesson.id` in src/data/navigation.ts is
-- chosen once and frozen, so the rename problem no longer exists to be managed.
--
-- The database still knows nothing about the course: `lesson_id` is an opaque
-- string owned by the manifest, exactly as `path` was. No lessons table, no
-- foreign key, no titles (see the init migration's header).

-- The old shape check first: it insists on a leading slash, which is precisely
-- what the ids about to be written do not have.
alter table public.progress drop constraint progress_path_shape;

alter table public.progress rename column path to lesson_id;

-- Backfill. Three lessons have ever been published, so a tick can only name one
-- of these three paths — the control is only drawn where the manifest resolves
-- the current path to a lesson.
update public.progress set lesson_id = case lesson_id
  when '/grammaire/les-articles'        then 'gram-articles'
  when '/orthographe/le-pluriel-des-noms' then 'orth-pluriel-des-noms'
  when '/vocabulaire/les-nombres'       then 'voc-nombres'
  else lesson_id
end
where lesson_id like '/%';

-- Anything still path-shaped names a page that was never published and so was
-- never tickable. It is junk rather than progress; the alternative is keeping a
-- row no interface can ever show and no constraint can describe.
delete from public.progress where lesson_id like '/%';

-- Must agree with LESSON_ID_SHAPE in src/data/navigation.ts, which throws at
-- import time — so a bad id fails `next build` long before it reaches here.
-- This is the second line, for a row written by something that is not this app.
alter table public.progress add constraint progress_lesson_id_shape
  check (lesson_id ~ '^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$');

comment on table public.progress is
  'One row per lesson a learner has marked done. The row is the tick; unmarking deletes it.';
comment on column public.progress.lesson_id is
  'Lesson.id from src/data/navigation.ts. Permanent: renaming or moving a lesson never changes it.';
