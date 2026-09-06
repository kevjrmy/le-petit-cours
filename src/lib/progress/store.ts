/**
 * What progress is, and the one interface both stores implement.
 *
 * **The entry is the tick.** An id present means the learner marked that lesson
 * done; absent means they did not. There is no `done: false`, exactly as there
 * is no `done` column in the migration — unmarking removes the entry.
 *
 * **Keyed by `Lesson.id`, not by route path** (`AGENTS.md` §8). The id is the
 * lesson's permanent name, so renaming a page, moving it to another chapter or
 * changing its URL leaves every tick exactly where it was. The value is the ISO
 * date it was ticked.
 */
export type Progress = Record<string, string>;

/**
 * Ticks made while the server was unreachable, waiting to be replayed.
 * Keyed by lesson id, like `Progress` itself.
 *
 * An ISO date is a mark, `null` an unmark — the same two operations the table
 * supports. It has to be *operations* rather than a snapshot: an offline unmark
 * held as a snapshot is indistinguishable from a device that simply never saw
 * that tick, and replaying it would resurrect what the learner removed.
 */
export type Pending = Record<string, string | null>;

/**
 * The seam. The local cache and the Supabase sync are two implementations of
 * it, and nothing above knows which one it is holding (`AGENTS.md` §8).
 *
 * `save` takes what the store last held as well as the new state, so an
 * implementation that talks to a database can write the difference — two
 * statements instead of a full rewrite — without keeping a copy of its own that
 * could fall out of step with the caller's.
 */
export interface ProgressStore {
  load(): Promise<Progress>;
  save(next: Progress, previous: Progress): Promise<void>;
}

/** Replay pending operations onto what the server returned. */
export function applyPending(server: Progress, pending: Pending): Progress {
  const merged = { ...server };
  for (const [id, at] of Object.entries(pending)) {
    if (at === null) delete merged[id];
    else merged[id] = at;
  }
  return merged;
}

/** The lesson ids in `next` that were not in `previous`, and vice versa. */
export function difference(next: Progress, previous: Progress) {
  return {
    added: Object.keys(next).filter((id) => !(id in previous)),
    removed: Object.keys(previous).filter((id) => !(id in next)),
  };
}
