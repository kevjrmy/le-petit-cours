/**
 * What progress is, and the one interface both stores implement.
 *
 * **The entry is the tick.** A path present means the learner marked that
 * lesson done; absent means they did not. There is no `done: false`, exactly as
 * there is no `done` column in the migration — unmarking removes the entry.
 *
 * Keyed by route path, which the manifest guarantees unique (`AGENTS.md` §8).
 * Renaming a lesson therefore orphans its ticks, which is what `pathAliases`
 * and `canonicalPath` are for.
 */
export type Progress = Record<string, string>;

/**
 * Ticks made while the server was unreachable, waiting to be replayed.
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
  for (const [path, at] of Object.entries(pending)) {
    if (at === null) delete merged[path];
    else merged[path] = at;
  }
  return merged;
}

/** The paths in `next` that were not in `previous`, and vice versa. */
export function difference(next: Progress, previous: Progress) {
  return {
    added: Object.keys(next).filter((path) => !(path in previous)),
    removed: Object.keys(previous).filter((path) => !(path in next)),
  };
}
