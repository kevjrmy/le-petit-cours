import { getSupabaseClient } from "@/lib/supabase/client";
import { difference, joinKey, splitKey, type Progress, type ProgressStore } from "./store";

/**
 * The Supabase half: `public.progress`, one row per ticked lesson.
 *
 * The row is keyed by `lesson_id` — the manifest's permanent name for the page,
 * not its URL — so a lesson that is renamed or moved keeps every tick on it
 * (`docs/decisions.md` #50) — and by `level`, which names *which variant* of a
 * multi-level page was finished and is `''` for the pages that have one. Both
 * columns are opaque to the database: it holds no lessons table and no foreign
 * key to one. `splitKey`/`joinKey` are the only translation between them and
 * the single string the rest of the app uses as a map key.
 *
 * Authorization is row-level security, not code here — `auth.uid() = user_id`
 * on all four verbs (`docs/decisions.md` #21). `user_id` is still written on
 * insert because the column has no default; the policy is what makes writing
 * someone else's id impossible rather than merely impolite.
 *
 * `save` writes the **difference**, which is why the interface hands it the
 * previous state: a full rewrite would mean deleting rows the learner still has
 * and putting them back, and a sync interrupted mid-way would lose them.
 *
 * Throwing is the contract. The caller catches it, keeps the tick locally and
 * queues the operation — an offline PWA cannot treat a failed request as a
 * failed tick (`AGENTS.md` §8).
 */
export function remoteStore(userId: string): ProgressStore {
  function client() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("supabase unavailable");
    return supabase;
  }

  return {
    async load() {
      const { data, error } = await client()
        .from("progress")
        .select("lesson_id, level, marked_at");
      if (error) throw error;

      const state: Progress = {};
      for (const row of data ?? [])
        state[joinKey(row.lesson_id as string, (row.level as string) ?? "")] =
          row.marked_at as string;
      return state;
    },

    async save(next, previous) {
      const { added, removed } = difference(next, previous);

      if (added.length > 0) {
        /* upsert rather than insert: replaying a queued tick the server already
           accepted must not fail on the primary key. */
        const { error } = await client()
          .from("progress")
          .upsert(
            added.map((key) => {
              const { lessonId, level } = splitKey(key);
              return {
                user_id: userId,
                lesson_id: lessonId,
                level,
                marked_at: next[key],
              };
            }),
            { onConflict: "user_id,lesson_id,level" },
          );
        if (error) throw error;
      }

      /* **Grouped by level, and never by `lesson_id` alone.** One statement
         filtering only on the id would delete every variant of that lesson: an
         unticked B1 reading would take the A2 tick with it, in a background
         sync, with no error anywhere. The groups are at most one per level, so
         this is a handful of statements in the worst case. */
      if (removed.length > 0) {
        const byLevel = new Map<string, string[]>();
        for (const key of removed) {
          const { lessonId, level } = splitKey(key);
          const ids = byLevel.get(level);
          if (ids) ids.push(lessonId);
          else byLevel.set(level, [lessonId]);
        }

        for (const [level, ids] of byLevel) {
          const { error } = await client()
            .from("progress")
            .delete()
            .eq("user_id", userId)
            .eq("level", level)
            .in("lesson_id", ids);
          if (error) throw error;
        }
      }
    },
  };
}
