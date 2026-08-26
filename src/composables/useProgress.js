import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { chapters, pathAliases, publishedLessons } from '@/data/navigation'

/**
 * Progress tracker — which lessons the learner has ticked as done.
 *
 * Marking is **always manual**: a lesson or a drill only counts as finished
 * when the learner presses « J'ai terminé ». Exercises additionally record the
 * score of their last run (see `recordScore`), but finishing a drill never
 * ticks it — that stays the learner's call.
 *
 * Module-level state: every component that calls `useProgress()` shares it,
 * the same pattern as `useTheme` and `useSidebar`.
 *
 * ── Storage ────────────────────────────────────────────────────────────────
 * Nothing here talks to `localStorage` directly. Every read and write goes
 * through the `adapter` below, so adding real accounts later means writing a
 * second adapter (load/save against a server) and calling
 * `setProgressAdapter()` once at boot — no view changes, no shape changes.
 * The local copy stays the source of truth either way: the app is an offline
 * PWA, so a server can only ever be a sync target, never the read path.
 *
 * Stored shape — keyed by route path, which `navigation.js` guarantees unique:
 *
 *   { v: 1, items: { '/grammaire/les-articles': {
 *       done: true,
 *       at:   '2026-08-26T18:04:11.000Z',    // when it was ticked
 *       score: { correct: 8, total: 10, at: '…' },   // exercises only
 *   } } }
 *
 * `at` costs nothing today and is exactly what last-write-wins sync needs.
 */

const STORAGE_KEY = 'lpc:progress'
const SCHEMA_VERSION = 1

/* ── Storage adapter ─────────────────────────────────────────────────────── */

const localStorageAdapter = {
  load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    } catch {
      /* private browsing, or a corrupted value — start clean rather than throw */
      return null
    }
  },
  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* private browsing — progress simply won't survive the session */
    }
  },
}

let adapter = localStorageAdapter

/* ── State ───────────────────────────────────────────────────────────────── */

/**
 * Renaming a lesson path would otherwise orphan every tick on it, silently.
 * `pathAliases` in navigation.js maps old path → new path; entries are folded
 * in on read, so a rename costs one line there instead of a learner's history.
 */
function resolvePath(path) {
  return pathAliases[path] ?? path
}

function normalise(raw) {
  if (!raw || typeof raw !== 'object' || !raw.items) return {}

  const items = {}
  for (const [path, entry] of Object.entries(raw.items)) {
    if (!entry || typeof entry !== 'object') continue
    const key = resolvePath(path)
    /* A rename can collide an alias with a real entry — keep the newer tick. */
    const existing = items[key]
    if (existing && (existing.at ?? '') >= (entry.at ?? '')) continue
    items[key] = entry
  }
  return items
}

const items = ref(normalise(adapter.load()))

function persist() {
  adapter.save({ v: SCHEMA_VERSION, items: items.value })
}

/* Two tabs open on the same course should not disagree about what's done. */
if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) items.value = normalise(adapter.load())
  })
}

/**
 * Swap the persistence backend — the one seam accounts will need.
 * Call once at boot, before the first view mounts.
 */
export function setProgressAdapter(next) {
  adapter = next
  items.value = normalise(adapter.load())
}

/* ── Derived counts ──────────────────────────────────────────────────────── */

const doneCount = computed(
  () => Object.values(items.value).filter(entry => entry.done).length
)

/**
 * A chapter's tally. The denominator is `publishedLessons`, so the `soon`
 * placeholders never make a finished chapter look unfinished.
 */
function chapterProgress(chapter) {
  const lessons = publishedLessons(chapter)
  const done = lessons.filter(lesson => items.value[lesson.path]?.done).length
  return {
    done,
    total: lessons.length,
    pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
  }
}

const overall = computed(() => {
  let done = 0
  let total = 0
  for (const chapter of chapters) {
    const tally = chapterProgress(chapter)
    done += tally.done
    total += tally.total
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
})

/* ── API ─────────────────────────────────────────────────────────────────── */

export function useProgress() {
  function entryFor(path) {
    return items.value[resolvePath(path)] ?? null
  }

  function isDone(path) {
    return Boolean(entryFor(path)?.done)
  }

  function setDone(path, done) {
    const key = resolvePath(path)
    const entry = { ...items.value[key], done }

    if (done) {
      entry.at = new Date().toISOString()
    } else {
      delete entry.at
    }

    /* Un-ticking drops the row unless a score is worth keeping. */
    if (!done && !entry.score) {
      const { [key]: _removed, ...rest } = items.value
      items.value = rest
    } else {
      items.value = { ...items.value, [key]: entry }
    }
    persist()
  }

  function toggle(path) {
    setDone(path, !isDone(path))
  }

  /**
   * Record an exercise run. Deliberately does **not** tick the drill as done —
   * marking stays manual everywhere. This only keeps the last result so
   * « Ma progression » can show "8 / 10" next to the exercise.
   */
  function recordScore(path, correct, total) {
    if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0) return

    const key = resolvePath(path)
    items.value = {
      ...items.value,
      [key]: {
        ...items.value[key],
        score: { correct, total, at: new Date().toISOString() },
      },
    }
    persist()
  }

  function scoreFor(path) {
    return entryFor(path)?.score ?? null
  }

  function doneAt(path) {
    return entryFor(path)?.at ?? null
  }

  /** Wipes everything — the caller is responsible for confirming first. */
  function reset() {
    items.value = {}
    persist()
  }

  return {
    items,
    doneCount,
    overall,
    isDone,
    doneAt,
    setDone,
    toggle,
    recordScore,
    scoreFor,
    chapterProgress,
    reset,
  }
}

/**
 * Score capture for a drill in `views/exercices/`.
 *
 * Call it once at the end of an exercise's `<script setup>`:
 *
 *   useExerciseScore(finished, () => ({ correct: score.value, total: deck.value.length }))
 *
 * When `finished` flips true it stores the run, so « Ma progression » can show
 * "8 / 10" beside the drill. It deliberately does **not** tick the drill as
 * done — marking is manual on every page type, this one included. Restarting
 * overwrites the stored run with the newer one, which is the honest reading of
 * "dernier essai".
 */
export function useExerciseScore(finished, result) {
  const route = useRoute()
  const { recordScore } = useProgress()

  watch(finished, done => {
    if (!done) return
    const { correct, total } = result()
    recordScore(route.path, correct, total)
  })
}
