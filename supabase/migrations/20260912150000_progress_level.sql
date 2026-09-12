-- A tick can name the variant of the lesson it was made against.
--
-- docs/decisions.md #22 says the level never keys progress, and the reason it
-- gives still stands: "a learner must be able to drop a level and climb back
-- without losing anything". What that rejects is recording the learner's
-- *ambient setting* on every row — tick an A2 page while set to B1 and the row
-- says B1, drop back to A2 and the tick disappears.
--
-- This column is not that. It holds which variant of a multi-variant page was
-- finished, chosen from the lesson's own `levels` in src/data/navigation.ts —
-- a property of the work, like `lesson_id` itself, never of the learner. A page
-- serving one level, or serving none, still writes '' here and keeps exactly
-- one tick, so dropping a level still loses nothing.
--
-- Only pages that carry several levels' worth of work need it: a `lecture` text
-- with a question set per level, an `exercices` drill with an item bank per
-- level. The rule is `levels.length > 1` and it lives in progressKey() in
-- src/lib/progress/store.ts, in one place, so no call site decides it.
--
-- Additive on purpose. Every existing row takes the default, nothing is
-- backfilled, and the client's key for a single-level lesson is still the bare
-- lesson id — so the IndexedDB cache and any queued offline operation written
-- before this migration stay valid.

alter table public.progress add column level text not null default '';

-- '' is "this lesson has one body of work", not "unknown". A nullable column
-- could not carry it: NULLs are distinct in Postgres, so (u, 'ex-x', null)
-- would insert twice and the table would hold two ticks for one lesson.
alter table public.progress drop constraint progress_pkey;
alter table public.progress add primary key (user_id, lesson_id, level);

-- A shape, not a vocabulary. The table still knows nothing about this course
-- (see the init migration's header): it does not hold the list of levels the
-- manifest offers, only what a CEFR rung looks like, exactly as
-- progress_lesson_id_shape holds what an id looks like without holding any.
alter table public.progress add constraint progress_level_shape
  check (level = '' or level ~ '^[ABC][12]$');

comment on column public.progress.level is
  'Which variant of the lesson was finished, when it has more than one. Empty string when it has one.';
