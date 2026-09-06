import { getSupabaseClient } from "@/lib/supabase/client";
import { difference, type Progress, type ProgressStore } from "./store";

/**
 * The Supabase half: `public.progress`, one row per ticked lesson.
 *
 * The row is keyed by `lesson_id` — the manifest's permanent name for the page,
 * not its URL — so a lesson that is renamed or moved keeps every tick on it
 * (`docs/decisions.md` #50). The column is opaque to the database: it holds no
 * lessons table and no foreign key to one.
 *
 * Authorization is row-level security, not code here — `auth.uid() = user_id`
 * on all four verbs (`docs/decisions.md` #19). `user_id` is still written on
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
        .select("lesson_id, marked_at");
      if (error) throw error;

      const state: Progress = {};
      for (const row of data ?? [])
        state[row.lesson_id as string] = row.marked_at as string;
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
            added.map((id) => ({ user_id: userId, lesson_id: id, marked_at: next[id] })),
            { onConflict: "user_id,lesson_id" },
          );
        if (error) throw error;
      }

      if (removed.length > 0) {
        const { error } = await client()
          .from("progress")
          .delete()
          .eq("user_id", userId)
          .in("lesson_id", removed);
        if (error) throw error;
      }
    },
  };
}
