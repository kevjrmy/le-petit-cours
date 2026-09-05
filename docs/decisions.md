# Decisions

Why the project is the way it is. `AGENTS.md` says what the rules **are**; this file says when
they were chosen, what was chosen against, and what would have to change for the choice to be
revisited.

Add an entry when a decision is made, not when it is implemented. Never delete one — supersede it
with a later entry and mark the old one **Superseded by #N**, because the value here is the
record, and a decision reversed without a reason tends to get reversed back.

| # | Date | Decision | Status |
|---|---|---|---|
| 1 | 2026-08-26 | No PDF export, no print stylesheet | Binding |
| 2 | 2026-08-26 | Progress is ticked manually, never automatically | Binding |
| 3 | 2026-09-05 | Rebuild on Next.js 16 instead of continuing the Vue app | Binding |
| 4 | 2026-09-05 | Lessons rewritten from scratch; `.vue/` kept as a reference shelf | Binding |
| 5 | 2026-09-05 | Fresh design system — `style.css` is not ported, tokens included | Binding |
| 6 | 2026-09-05 | Plain CSS (global tokens + CSS Modules), not Tailwind | Inferred |
| 7 | 2026-09-05 | Vercel hosting, still an offline PWA — not a static export | Binding |
| 8 | 2026-09-05 | Supabase, scoped to accounts and progress sync only | Binding |
| 9 | 2026-09-05 | One repo, Vue history preserved; `.vue/` committed without its lesson images | Binding |
| 10 | 2026-09-05 | The lesson authoring format is deferred until the primitives exist | **Open** |
| 11 | 2026-09-05 | Open source: MIT for the code, CC BY-SA 4.0 for the content, contributions welcome | Binding |
| 12 | 2026-09-05 | Scope: A1→C2 the ambition, A1+A2 the current scope; B1–C2 shown as *bientôt* | Binding |
| 13 | 2026-09-05 | Two learner profiles — the learner and the heritage speaker | Binding |
| 14 | 2026-09-05 | Levels are lesson tags; parcours order lessons without owning them | Binding |
| 15 | 2026-09-05 | A level is complete when it covers the DELF syllabus for that level | Binding |
| 16 | 2026-09-05 | Instruction in Spanish for the learner track, French for the heritage track | Binding |
| 17 | 2026-09-05 | Collaboration means curated teachers contributing content — later, and not student management | Directional |
| 18 | 2026-09-05 | All content is public; an account is required to track progress | Binding |
| 19 | 2026-09-05 | Supabase Auth, email magic link — not Clerk | Binding |
| 20 | 2026-09-05 | Supabase provisioned directly, not through the Vercel Marketplace integration | Binding |

---

## 1 · No PDF export, no print stylesheet
**2026-08-26 · Binding**

Every lesson used to print to A4, which pinned the reading column to 794 px (A4 at 96 dpi) and
required `@media print` blocks, `.no-print` / `.print-only` flags and separate dictée answer
sheets throughout. The feature was removed and the reading column became a measure in `rem`.

**Why it still binds:** the constraint shaped a lot of the old CSS, so the temptation to
"restore" a print view recurs. It would bring back a whole parallel stylesheet to maintain for a
feature nobody used.

## 2 · Progress is ticked manually, never automatically
**2026-08-26 · Binding**

A lesson or a drill counts as done only when the learner presses « J'ai terminé ». Exercises
record the score of their last run; finishing one never ticks it.

**Why:** a half-remembered pass at 50 % is not a finished lesson, and the learner is the only one
who knows the difference. Auto-completion would make the progress page a record of pages visited,
which is worth nothing to them.

## 3 · Rebuild on Next.js 16 instead of continuing the Vue app
**2026-09-05 · Binding**

The Vue 3 + Vite app reached 119 lessons across 14 chapters and was working. It was restarted on
Next.js 16 (App Router, React 19, TypeScript) rather than extended.

**What it buys:** lessons prerender as Server Components and ship no JavaScript; the hand-written
route table disappears into the filesystem; a server exists for accounts without standing up a
separate backend.

**What it costs:** a server/client boundary the SPA never had, and with it a class of bug the Vue
app could not produce — hydration mismatches, the theme flash, `localStorage` read during render.
`AGENTS.md` §4 exists because of this trade.

## 4 · Lessons rewritten from scratch; `.vue/` kept as a reference shelf
**2026-09-05 · Binding**

The 119 Vue lessons are not being ported. `.vue/` is committed to be read — for chapter ordering,
wording, exercise mechanics — and never translated file-for-file.

**Why:** a mechanically ported page inherits the old page's compromises and gains none of the new
system's advantages. The content was written under a print budget, against a stylesheet that no
longer exists, in a component model that inverted.

**Revisit when:** the rewrite has clearly outgrown it — see #4's open sibling in `AGENTS.md` §12
on whether `.vue/` is eventually deleted.

## 5 · Fresh design system
**2026-09-05 · Binding**

`.vue/src/style.css` — 2034 lines, three token layers, tricolore palette — is not ported. Not the
components, and deliberately not the tokens either.

**Why the tokens too:** the third layer existed only as `--clr-*` aliases kept alive for pages
written before the tokens did, and it was its own bug class (`--clr-page` read like a text colour
and was a surface token, so everything using it inverted in dark mode). Carrying the tokens over
would carry the compatibility layer's shape with them.

**What is kept:** the discipline, not the values — two layers, no raw colours in components, every
token defined in all three theme blocks, colour never the only carrier.

**Still open:** the palette and typography themselves (`AGENTS.md` §12).

## 6 · Plain CSS, not Tailwind
**2026-09-05 · Inferred, not explicitly confirmed**

Design tokens and shared content patterns in one `globals.css` imported once in the root layout;
component styles in co-located CSS Modules.

**Standing:** this follows from #5 as it was framed ("start the CSS over from nothing") and from
the Vue app's "pure CSS, no utility libraries" rule, but it was never chosen against Tailwind
explicitly — Tailwind was offered as a separate option and not taken. Treat it as the
working assumption, not as settled. If Tailwind is wanted, that is a decision to take explicitly
and record here as #N superseding this one, not to drift into one utility class at a time.

## 7 · Vercel hosting, still an offline PWA
**2026-09-05 · Binding**

Deployed on Vercel as a normal Next.js app — not `output: 'export'` — while keeping the service
worker, the precached lessons and installability. The project is `kevjrmy-projects/lepetitcours`,
building from `main`, live at <https://lepetitcours.vercel.app>. The Netlify site that served the
Vue app was deleted the same day; nothing in the tree refers to it.

**Why not a static export:** #8 needs a server for auth and sync. A static export would have been
closer to the old deployment and is the thing to fall back to if the server side is ever dropped.

**Consequence:** `vite-plugin-pwa` has no Next equivalent. Serwist supplies the service worker.
Not installed yet.

## 8 · Supabase, for accounts and progress sync only
**2026-09-05 · Binding**

Provisioned through the Vercel Marketplace (`vercel integration add supabase`), which injects the
env vars into the linked project and bills through Vercel. **The provisioning mechanism is revised
by #20** — the project was created in the Supabase dashboard instead. The scope below is unaffected
and stands.

**Chosen over Firebase** because it is a native Marketplace integration where Firebase is manual
key wiring and separate billing, because progress is row-shaped data keyed by route path rather
than documents, and because Supabase Auth drops into the adapter seam the Vue app already had.

**Scope is the important half.** Lesson content stays in the repo — in git, in diffs, reviewable,
precacheable. The database holds accounts and progress and nothing else. The local copy stays the
source of truth: this is an offline app, so a server can only ever be a sync target, never the
read path.

~~**Not provisioned as of 2026-09-05.**~~ Provisioned later the same day — see #20.

## 9 · One repo, history preserved, `.vue/` without its images
**2026-09-05 · Binding · commit `6723b81`**

The Vue app's `.git` was copied to the project root and its nested copy deleted, so the rewrite
continues on the same `main` with the Vue files recorded as moves into `.vue/`.

The lesson images — region photographs and dictée scans, 8.7 MB — were left out of HEAD. They are
on disk and recoverable from `00c44c1` if a rewritten lesson claims one. The brand assets (logo,
favicons, PWA icons) stayed in `public/`, where the new app wants them.

## 10 · The lesson authoring format is deferred
**2026-09-05 · OPEN**

Whether lessons are MDX files, typed content blocks, or hand-written TSX is **not decided**. The
interim is hand-written TSX against the lesson primitives.

**Why deferred rather than chosen:** all three are defensible on paper and the choice depends on
what the primitives turn out to look like, which nobody knows yet. Choosing early would mean
building a content pipeline around guessed requirements.

**How it gets closed:** build the shell and the lesson components, hand-write two or three real
lessons, and decide with the evidence. Whoever writes those lessons should note what fought them.

**Do not** set up an MDX pipeline or a block schema on your own initiative before then.

## 11 · Open source: MIT for the code, CC BY-SA 4.0 for the content
**2026-09-05 · Binding**

The repository had been public since the Vue era with **no licence at all**, which meant default
copyright: readable, but nobody could legally fork, reuse or contribute. That is now fixed, and
the project is explicitly an open source one.

**Two licences, because the two halves want different things.** Software licences do nothing
sensible to French prose and vocabulary tables; Creative Commons licences do nothing sensible to
TypeScript. So: MIT for `src/`, configuration and tooling; CC BY-SA 4.0 for the lessons,
exercises, vocabulary and translations.

**Why share-alike on the content.** The `culture` photographs come from Commons under CC BY and
CC BY-SA, and adaptations of CC BY-SA material must stay share-alike regardless — so share-alike
is the compatible choice rather than an extra restriction. It also means a derivative course
built on these lessons stays open, which is the point of writing them.

**Why MIT rather than copyleft on the code.** The shell, the drills and the design system are not
the valuable part; the course is. Permissive code lowers the bar for someone building a similar
course for a different language pair, which is a good outcome.

**The carve-out is load-bearing.** Teaching a language means quoting it, so the repository
contains material the project does not own: song excerpts still in copyright, literary text whose
public domain status is jurisdictional, and photographs under their own individual licences.
`LICENSE-CONTENT` says so explicitly, `AGENTS.md` §9b says what may be quoted and how, and
`CONTRIBUTING.md` tells contributors they must have the right to what they submit. **A blanket
licence over material the project cannot license would be worse than no licence at all** — it
would be a false grant that reusers rely on.

**Contributions are wanted**, with corrections to the French and the Spanish named as the most
valuable kind: this is teaching material, so an error in it teaches the error. Hence
`CONTRIBUTING.md`, a code of conduct, and issue templates that ask a corrector how certain they
are.

**Not done here:** the code of conduct points reports at GitHub rather than at an email address,
deliberately — publishing a personal address is the maintainer's call to make, not a default to
adopt.

## 12 · A1→C2 as the ambition, A1+A2 as the scope
**2026-09-05 · Binding**

The goal is to take Spanish speakers from A1 to C2. The *current scope* is A1 and A2. B1 through
C2 are declared and empty, shown as *bientôt*.

**Why the limit is written down:** an unbounded A1→C2 project never finishes A1. Naming the
boundary is what makes "not yet" an answer instead of a slow drift into thin coverage at six
levels. B1 opens when A1 and A2 are complete by the measure in #15 — not when a B1 topic seems
interesting.

## 13 · Two learner profiles, not one
**2026-09-05 · Binding**

The app serves **the learner** (native Spanish speaker acquiring French from zero) and **the
heritage speaker** (French family, raised in Spain, fluent at home, never schooled in French).
Both are real people currently testing the app; more profiles are expected.

**Why it is a decision and not an observation:** the two need opposite things. The learner lacks
the language; the heritage speaker has the language and lacks literacy — spelling, accord,
homophones, the written form of what she already says correctly. A heritage speaker can be orally
C1 and written A2 at once, so **she cannot be represented as a level**, and any design that
reduces the audience to a CEFR badge will mis-serve her.

**What it does not mean:** two apps, or two content libraries. The Vue app was already half-built
for the second profile — its "Bled content patterns" come from a textbook for native French
schoolchildren. One pool of lessons, different orderings.

## 14 · Levels are tags; parcours order lessons without owning them
**2026-09-05 · Binding**

Every lesson carries a CEFR level tag. A **parcours** is an ordered path through lessons that
already exist — `Parcours A1`, `Parcours A2`, and a heritage parcours through the orthography and
conjugation pages.

**Chosen over making level the top navigation axis**, which would duplicate chapters across six
levels and leave the heritage speaker nowhere to stand. **Chosen over two separate front doors**
(learner / heritage), which is the most honest to the two pedagogies but doubles the product
surface before there is evidence it is needed — kept as an open question rather than rejected.

**The load-bearing half is "without owning them".** A lesson belongs to its chapter and is
referenced by however many parcours want it, including none. Copying a lesson so two paths can
each have one is the failure this prevents, and it is how a content library becomes two content
libraries that drift.

Greying out B1–C2 is then a filter over tags, reusing the `soon` mechanism — not a separate code
path.

## 15 · DELF as the definition of done
**2026-09-05 · Binding**

A level is complete when it covers the published DELF syllabus for that level.

**Why an external anchor:** it makes coverage checkable, exposes gaps rather than hiding them,
gives learners a target they could actually sit, and gives future contributing teachers a shared
reference to argue from instead of taste. "It feels thorough" is not a definition, and with six
levels ahead it is the kind of vagueness that compounds.

The 119 Vue lessons are an inventory to map against, not evidence of coverage.

**Not a decision to certify anyone.** DELF is the yardstick; the app does not examine.

## 16 · Spanish for the learner track, French for the heritage track
**2026-09-05 · Binding**

Explanations are in Spanish for the learner and in French for the heritage speaker, who already
speaks French — routing an explanation of French spelling through Spanish is a detour for her, and
the Bled itself teaches in French for that reason.

**English is never used, for either profile.** That part is not new and does not bend.

**The unresolved half:** pages both profiles read — orthography, conjugation — cannot be
Spanish-first and French-first at once. Working resolution in `docs/scope.md`: each lesson
declares its metalanguage, and a topic that genuinely needs both becomes two lessons, but only
once a real page demonstrates it. Recorded as open in `AGENTS.md` §12. **Do not build a
translation layer to solve it in advance.**

## 17 · Collaboration means curated content contribution, later
**2026-09-05 · Directional**

"Collaborative" means a curated group of recognised teachers able to suggest and contribute
content. It does **not** mean student management: no classes, no assignments, no grade books, no
teacher dashboards over learner progress.

**Current state: a single contributor.** This is out of scope for now and shapes nothing that is
being built, with two exceptions worth holding onto:

- It is a second argument for content-as-data (#10) — a teacher who is not a developer can fill in
  a structured file and cannot write TSX.
- It leaves #8 unchanged. Supabase stays accounts and progress sync; no schema work is owed to
  this.

**When the time comes, question the premise first.** GitHub is already a curated contribution
system — invited reviewers, restricted merge rights, review on every change. An in-app authoring
flow is only worth building for teachers who will not touch git, and that is a question to answer
with real teachers rather than in advance.

**Consequence for minors:** with no teacher seeing a learner's data, an account is a private sync
target and the question of child accounts can wait. Revisit before accounts ship, not before.

## 18 · Content is public; an account is required to track progress
**2026-09-05 · Binding**

Every lesson, drill and game is readable and playable with **no account** — no auth wall, no
sign-up interstitial, nothing gated behind an email address. What requires an account is keeping a
learning path: the « J'ai terminé » tick, exercise scores, position in a parcours.

**Chosen over anonymous local progress that an account later claims.** That alternative is
friendlier — ticking would work on first visit and sign-up would adopt the existing state — but it
means two storage paths, a claim-on-signup migration to get right, and a class of bug where
someone's progress silently belongs to nobody. One path, one owner.

**The architectural consequence is the important part.** Because content is public, lessons stay
**statically prerendered** and precacheable, which is what makes the offline PWA work at all. That
only holds if the session is never read where it would make a lesson dynamic — see #19 and
`AGENTS.md` §8.

**Offline is not sacrificed.** A signed-in learner ticking a lesson on the métro writes locally and
syncs on reconnect; the local copy stays the read path. What an anonymous visitor loses offline is
the tick, not the lesson.

**Minimal data by design:** an account holds an email, progress rows and settings. No analytics on
learners, no behavioural tracking. That follows from the no-engagement-mechanics principle in
`docs/scope.md` and keeps the breach surface near zero.

## 19 · Supabase Auth with email magic link, not Clerk
**2026-09-05 · Binding**

Authentication is Supabase Auth, signed in by **email magic link**.

**Clerk was the obvious candidate and was rejected on integration cost, not on quality.** It is a
native Vercel Marketplace integration with a drop-in `<SignIn />`, and it is genuinely the fastest
route to a working sign-in *screen*. But progress rows live in Supabase Postgres (#8), and with
Supabase Auth a row is tied to its owner by `auth.uid()` in a row-level-security policy — the
database enforces that a learner sees only their own ticks, with no glue code. Putting Clerk in
front of that means bridging Clerk's identity into Postgres, either by minting a JWT Supabase will
verify or by abandoning RLS and routing every write through server code holding the service key.
That is real plumbing for an app whose entire server-side surface is "save a tick", plus a second
dashboard, a second free tier and a second thing that can break.

Clerk is faster to first screen. Supabase Auth is faster to working feature.

**Magic link over password or OAuth:** no password to invent, forget, reset or be responsible for
storing; native in Supabase; and it suits a family audience on a shared device. Google/Apple sign-in
can be added later if real friction appears — nothing here forecloses it.

**RLS is the authorization model.** `auth.uid() = user_id` on the progress table, and no
application-level permission checks scattered through components. If a future feature needs a
different rule, it goes in the policy.

**Operational note to verify before relying on it:** Supabase's free tier pauses inactive projects
after a period of inactivity and needs a manual restore. For an app with two students that is a
real papercut — check the current policy, and expect to need either a keepalive or the cheapest
paid tier.

## 20 · Supabase provisioned directly, not through the Vercel Marketplace
**2026-09-05 · Binding**

The Supabase project (`ephdtigxjccfauzgexpd`, EU) was created in the Supabase dashboard, not with
`vercel integration add supabase` as #8 anticipated. Automatic RLS was enabled at creation: an
event trigger turns row-level security on for every new table in `public`, which makes the
authorization model of #19 the default rather than something to remember.

**What this costs, relative to the Marketplace route:** nothing injects the env vars, and billing
is with Supabase directly rather than through Vercel. So the keys are wired by hand and that
wiring is now a thing that can rot — `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` live in a gitignored `.env` for local work and were pushed
to production, preview and development with `vercel env add`. Adding an environment or rotating a
key means doing both places.

**The database password is not one of them.** It never reaches Vercel and no application code
reads it; it exists for `psql`, `supabase link` and migrations. The publishable key is public by
design — RLS is what protects a learner's rows (#19), which is the whole reason the automatic-RLS
trigger is worth having on.
