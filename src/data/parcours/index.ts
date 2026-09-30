import {
  findLessonById,
  isTracked,
  type Chapter,
  type Lesson,
  type LessonId,
  type Level,
} from "@/data/navigation";
import { A1 } from "./a1";
import { A2 } from "./a2";
import { B1 } from "./b1";
import { ECRIRE } from "./ecrire";

/**
 * An ordered path through lessons that live in their chapters (#14, #88).
 *
 * **It orders lessons and owns none.** A lesson named in two parcours is one
 * page with one tick, done in both. Lessons are named **by id**, never by path:
 * a path is renamed (#50), an id never is, so a rename costs a parcours
 * nothing.
 *
 * **Chosen in `/compte`, one at a time or none**, and stored as its `id` in the
 * account's metadata beside the view. The id is permanent for the same reason
 * a lesson's is: removing or renaming one makes everyone on it read back as
 * having chosen none, silently.
 */
export interface Parcours {
  /** Permanent. Lower case, digits and hyphens. */
  id: string;
  title: string;
  /** One sentence in the chooser: who the path is for. */
  blurb: string;
  /**
   * The rung the path teaches, or `null` for a path that answers to none —
   * « Écrire le français », the heritage speaker's door (#13, #88). It picks
   * the set a page holding several opens on (#87).
   */
  level: Level | null;
  etapes: Etape[];
  /**
   * The épreuves the path ends on (#89): pages of `delf` at the path's level.
   * **Offered, never counted** — no tick (#82), out of the tally, never
   * « La suite » while an étape is unfinished.
   */
  exam?: LessonId[];
}

export interface Etape {
  title: string;
  lessons: LessonId[];
}

/** Every parcours, in the order the chooser offers them. */
export const PARCOURS: Parcours[] = [A1, A2, B1, ECRIRE];

export function findParcours(id: string | null): Parcours | null {
  return PARCOURS.find((parcours) => parcours.id === id) ?? null;
}

export interface Step {
  chapter: Chapter;
  lesson: Lesson;
}

/** An étape with its lessons resolved against the manifest. */
export interface ResolvedEtape {
  title: string;
  steps: Step[];
}

function resolve(id: LessonId): Step {
  /* `assertParcours` below has already proved every id resolves. */
  return findLessonById(id)!;
}

export function etapesOf(parcours: Parcours): ResolvedEtape[] {
  return parcours.etapes.map((etape) => ({
    title: etape.title,
    steps: etape.lessons.map(resolve),
  }));
}

export function examOf(parcours: Parcours): Step[] {
  return (parcours.exam ?? []).map(resolve);
}

export type IsDone = (lesson: Lesson, level: Level | null) => boolean;

/** Lessons ticked and lessons named, over the étapes only — never the exam. */
export function tallyOf(parcours: Parcours, isDone: IsDone): { done: number; total: number } {
  const steps = etapesOf(parcours).flatMap((etape) => etape.steps);
  return {
    done: steps.filter((step) => isDone(step.lesson, parcours.level)).length,
    total: steps.length,
  };
}

export type NextStep =
  /** The first unticked lesson, and whether anything before it is ticked. */
  | { kind: "lesson"; step: Step; etape: string; started: boolean }
  /** Every étape ticked, and épreuves to sit (#89). */
  | { kind: "exam"; steps: Step[] }
  /** Every étape ticked, and nothing after. */
  | { kind: "done" };

/**
 * « La suite »: the first lesson of the parcours that is not ticked (#88).
 *
 * **Both surfaces that offer a next step read it from here** — the home page
 * and the head of `/ma-progression` — because two definitions of "next" would
 * eventually disagree in front of the same learner.
 *
 * It is *the first hole in the path*, not the furthest point reached:
 * predictable, needs nothing stored, and honest about what an account holds — a
 * true "where you left off" would mean recording the last page visited, which
 * is behavioural tracking (#31, #70). A page holding sets is asked at the
 * parcours's level (#87).
 *
 * `isDone` is passed in rather than imported: the tick lives behind a hook, and
 * the data is not allowed to know about storage.
 */
export function nextUp(parcours: Parcours, isDone: IsDone): NextStep {
  let started = false;
  let first: { step: Step; etape: string } | null = null;

  /* The whole path, not an early return: a learner who ticked lesson five and
     skipped lesson one is still a learner who has started. */
  for (const etape of etapesOf(parcours)) {
    for (const step of etape.steps) {
      if (isDone(step.lesson, parcours.level)) started = true;
      else if (!first) first = { step, etape: etape.title };
    }
  }

  if (first) return { kind: "lesson", ...first, started };
  const exam = examOf(parcours);
  return exam.length > 0 ? { kind: "exam", steps: exam } : { kind: "done" };
}

const PARCOURS_ID_SHAPE = /^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$/;

/**
 * Every parcours is well-formed, at import — so a slip fails `next build`.
 *
 * Ids unique and well-shaped; every lesson id resolves, sits in a tracked
 * chapter (a scratch page or an épreuve could never be ticked, and would be a
 * permanent first hole in « La suite », #80, #82) and appears once in the
 * path; every `exam` entry is an untracked épreuve at the path's level.
 */
function assertParcours(): void {
  const ids = new Set<string>();
  for (const parcours of PARCOURS) {
    const where = `parcours « ${parcours.id} »`;
    if (!PARCOURS_ID_SHAPE.test(parcours.id)) throw new Error(`${where}: malformed id.`);
    if (ids.has(parcours.id)) throw new Error(`${where}: id used twice.`);
    ids.add(parcours.id);

    const seen = new Set<LessonId>();
    for (const etape of parcours.etapes) {
      if (etape.lessons.length === 0) throw new Error(`${where}: étape « ${etape.title} » is empty.`);
      for (const id of etape.lessons) {
        const found = findLessonById(id);
        if (!found) throw new Error(`${where}: no lesson has the id « ${id} ».`);
        if (!isTracked(found.chapter)) {
          throw new Error(`${where}: « ${id} » cannot be ticked, so it cannot be an étape.`);
        }
        if (seen.has(id)) throw new Error(`${where}: « ${id} » is named twice.`);
        seen.add(id);
      }
    }

    for (const id of parcours.exam ?? []) {
      const found = findLessonById(id);
      if (!found) throw new Error(`${where}: no épreuve has the id « ${id} ».`);
      if (!found.chapter.untracked || found.lesson.level !== parcours.level) {
        throw new Error(`${where}: « ${id} » is not an épreuve at ${parcours.level}.`);
      }
    }
  }
}

assertParcours();
