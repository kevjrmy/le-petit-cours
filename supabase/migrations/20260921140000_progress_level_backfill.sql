-- The ticks stranded when eleven lessons grew a second level.
--
-- 20260912150000_progress_level.sql added the column and backfilled nothing,
-- reasoning that "the client's key for a single-level lesson is still the bare
-- lesson id". That was true of every lesson that stayed single-level — and the
-- same change retagged eleven of them from `A2` to `["A2", "B1"]`, which is
-- exactly the case the reasoning did not cover.
--
-- progressKey() in src/lib/progress/store.ts returns the bare id below two
-- levels and `id@LEVEL` at or above it, so those eleven lessons' keys moved
-- from `lect-romeo-juliette` to `lect-romeo-juliette@A2` while their rows kept
-- the column default. The rows were never deleted and nothing ever failed;
-- they simply stopped being read, and the circle went empty.
--
-- 'A2' is the right variant to write, not a guess. A row reaching this
-- migration with level = '' was written while the page served A2 alone, so A2
-- is the body of work that was actually finished — which is what
-- docs/decisions.md #68 says the column holds: a property of the work, never
-- of the learner.
--
-- Idempotent, and safe to run twice: the guard skips any row whose learner has
-- since re-ticked the page at A2, because (user_id, lesson_id, level) is the
-- primary key and a blind update would collide with that newer tick.

update public.progress as p
   set level = 'A2'
 where p.level = ''
   and p.lesson_id in (
     'ex-etre-ou-avoir', 'ex-trouve-la-faute', 'lect-entretien-embauche',
     'lect-lion-et-rat', 'lect-invitation-voyage', 'lect-phileas-fogg',
     'lect-cosette-bois', 'lect-cyrano', 'lect-swann',
     'lect-romeo-juliette', 'lect-monte-cristo')
   and not exists (
     select 1 from public.progress as q
      where q.user_id = p.user_id
        and q.lesson_id = p.lesson_id
        and q.level = 'A2');

-- What survives the update is a stranded row whose learner already holds a
-- newer A2 tick on the same lesson. It is redundant, not a second tick, and
-- leaving it would show up the next time this set is counted.
delete from public.progress as p
 where p.level = ''
   and p.lesson_id in (
     'ex-etre-ou-avoir', 'ex-trouve-la-faute', 'lect-entretien-embauche',
     'lect-lion-et-rat', 'lect-invitation-voyage', 'lect-phileas-fogg',
     'lect-cosette-bois', 'lect-cyrano', 'lect-swann',
     'lect-romeo-juliette', 'lect-monte-cristo');
