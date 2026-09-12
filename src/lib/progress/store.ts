import type { Lesson, Level } from "@/data/navigation";

/**
 * What progress is, and the one interface both stores implement.
 *
 * **The entry is the tick.** An id present means the learner marked that lesson
 * done; absent means they did not. There is no `done: false`, exactly as there
 * is no `done` column in the migration — unmarking removes the entry.
 *
 * **Keyed by `progressKey()`, never by a route path** (`AGENTS.md` §8) and never
 * by a bare id typed at the call site. For almost every lesson the key *is*
 * `Lesson.id` — the permanent name, so renaming a page, moving it to another
 * chapter or changing its URL leaves every tick exactly where it was. The value
 * is the ISO date it was ticked.
 */
export type Progress = Record<string, string>;

/**
 * The key one tick is stored under, and the only place the rule lives.
 *
 * **A tick carries a level exactly when the lesson serves more than one.** One
 * level, or none, and the level is already carried by the page: storing it
 * would write a constant, and for a page tagged `[]` — a verb sheet, a culture
 * page — it would invent a distinction the content does not have. Two or more
 * and the page holds two or more bodies of work, which is the only case a
 * single tick cannot report: a learner who read a text at A2 and later moves to
 * B1 must not find the B1 questions already ticked.
 *
 * **What is stored is the lesson's variant, never the learner's setting.** That
 * is what keeps `docs/decisions.md` #22 true — dropping a level and climbing
 * back still loses nothing, because no row ever named the level in force when
 * it was written.
 *
 * **A single-level lesson's key is the bare id, byte for byte what it was
 * before the level existed.** Every row already in Postgres, every record in
 * the IndexedDB cache and every queued offline operation stays valid, which is
 * the whole reason this is a function and not a new field on every caller.
 *
 * Callers pass the level they are looking at and never see this branch. A level
 * the lesson does not offer falls to its first, deterministically, rather than
 * collapsing onto the global key and silently reading another variant's tick.
 */
export function progressKey(lesson: Lesson, level: Level | null): string {
  if (lesson.levels.length < 2) return lesson.id;
  const variant = level && lesson.levels.includes(level) ? level : lesson.levels[0];
  return joinKey(lesson.id, variant);
}

/**
 * The two halves of a key, as the `progress` table stores them: `lesson_id` and
 * `level`, with `''` for a lesson that has one body of work.
 *
 * The `@` never reaches the database — it is a separator for a JavaScript map
 * key, and `progress_lesson_id_shape` would reject it. Keeping the level in its
 * own column is what lets that constraint stand and what keeps the table as
 * ignorant of the course as `docs/decisions.md` #22 wants it.
 */
export function joinKey(lessonId: string, level: string): string {
  return level ? `${lessonId}@${level}` : lessonId;
}

export function splitKey(key: string): { lessonId: string; level: string } {
  const at = key.indexOf("@");
  return at === -1
    ? { lessonId: key, level: "" }
    : { lessonId: key.slice(0, at), level: key.slice(at + 1) };
}

/**
 * Ticks made while the server was unreachable, waiting to be replayed.
 * Keyed by `progressKey()`, like `Progress` itself.
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
  for (const [key, at] of Object.entries(pending)) {
    if (at === null) delete merged[key];
    else merged[key] = at;
  }
  return merged;
}

/** The keys in `next` that were not in `previous`, and vice versa. */
export function difference(next: Progress, previous: Progress) {
  return {
    added: Object.keys(next).filter((key) => !(key in previous)),
    removed: Object.keys(previous).filter((key) => !(key in next)),
  };
}
