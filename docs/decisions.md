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
| 21 | 2026-09-05 | No key that bypasses RLS lives in the deployment environment | Binding |
| 22 | 2026-09-05 | An account stores the tick and the chosen level — no scores; level never keys progress | Binding |
| 23 | 2026-09-05 | A lesson carries a set of levels; the learner's level is required and filters the book | Binding |
| 24 | 2026-09-05 | IndexedDB is the local store; `localStorage` keeps only the theme | Binding |
| 25 | 2026-09-05 | A1 first, written from scratch, sized to the DELF A1 syllabus | Binding |
| 26 | 2026-09-05 | Sign-in lives at `/compte`, with a route handler at `/auth/callback` | Binding |
| 27 | 2026-09-05 | The palette anchors on the wordmark blue; serif carries the French, sans the instruction | Binding |
| 28 | 2026-09-05 | The app icon is one letter of the wordmark, generated from it, never hand-drawn | Binding |
| 29 | 2026-09-05 | The shell derives from the manifest: one generated chapter route, no icon field | Binding |
| 30 | 2026-09-05 | The shell follows the claude.ai pattern: account at the foot of the sidebar, theme three-way | Binding |
| 31 | 2026-09-05 | An account may hold an optional display name — the one thing added to #22 | Binding |
| 32 | 2026-09-05 | The session is read once, by a provider inside the shell; the name is updated, never upserted | Binding |
| 33 | 2026-09-05 | Sign-in is a magic link through `/auth/callback`; no session-refresh proxy is needed | Binding |
| 34 | 2026-09-05 | Choosing a level is what creates the settings row; everything else about a learner hangs off it | Binding |
| 35 | 2026-09-05 | Every listing obeys the level; the unfiltered book is what ships and hydration narrows it | Binding |

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
record the score of their last run; finishing one never ticks it. *(The score half was dropped by
#22 before any of it was built: a drill shows its score and stores nothing. The manual tick, which
is what this entry is actually about, stands.)*

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

**Still open:** the palette and typography themselves (`AGENTS.md` §12). *(Closed by #27.)*

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

Every lesson carries a CEFR level tag. *(Made a set by #23: a lesson may be tagged with several
levels.)* A **parcours** is an ordered path through lessons that
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
learning path: the « J'ai terminé » tick, exercise scores, position in a parcours. *(Scores were
dropped by #22; the level chosen took their place.)*

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

**Amended the same day:** the project was then linked to Vercel from the Supabase dashboard, which
does inject a set of env vars — so the sentence above is half wrong and worth keeping visible,
because the half that survives is the one that matters. It is not a Marketplace resource
(`vercel integration list` finds none) and billing stays with Supabase. And **it injects into
Production only**: preview deployments and `vercel env pull` see nothing from it. The two
`NEXT_PUBLIC_*` vars added by hand are the ones set across all three environments, so they remain
the names application code reads. The injected `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` carry
identical values and are incidental; the legacy `*_ANON_KEY` pair is a second name for the same
public credential, and code reads neither.

**Amended again, same day: the connection was deleted.** It re-pushed its whole bundle — the
database password among it — on every change made at the Supabase end, three times in half an
hour, and it was injecting nothing the project needed. Removing it cleaned up its own variables
and left the two hand-set ones untouched. So the wiring is manual, by choice, and the original
paragraph above is once again the accurate one.

**The database password is not one of them.** It never reaches Vercel and no application code
reads it; it exists for `psql`, `supabase link` and migrations — which also require SSL, enforced
on the project since 2026-09-05. The app is unaffected (it reaches PostgREST and Auth over HTTPS
either way), but a direct connection needs `sslmode=require`, or the CA certificate from the
Database settings page for `verify-full`. A refused `psql` is this setting, not a bad password. The publishable key is public by
design — RLS is what protects a learner's rows (#19), which is the whole reason the automatic-RLS
trigger is worth having on.

## 21 · No key that bypasses RLS lives in the deployment environment
**2026-09-05 · Binding**

Linking Supabase to Vercel (#20) injected `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`,
`SUPABASE_JWT_SECRET` and seven `POSTGRES_*` variables into the project. All ten were deleted.

**Why, when an unused variable is usually harmless:** the service role and secret keys bypass
row-level security completely, and RLS *is* the authorization model (#19). #19 chose Supabase Auth
over Clerk specifically to avoid "abandoning RLS and routing every write through server code
holding the service key" — leaving that key in the environment leaves exactly that shortcut lying
around, one `process.env` away, in a codebase whose entire server-side job is saving a tick. The
`POSTGRES_*` set has the same shape of problem and no use: nothing here opens a direct Postgres
connection, because the client talks to PostgREST under the learner's own JWT.

**The rule, not just the cleanup:** if a feature ever genuinely needs to bypass a policy, that is a
decision to take here first — superseding this entry — and not something to acquire by accident.

**Closed at the source.** Deleting them from Vercel was not enough: every subsequent change in the
Supabase dashboard re-pushed the bundle, so the same variables were deleted three times. The fix
was to disable the legacy `anon` / `service_role` keys in Supabase — nothing here uses them, the
publishable key is unaffected and magic-link auth was verified working afterwards — and then to
delete the Vercel connection entirely. A `SUPABASE_*` or `POSTGRES_*` variable appearing in the
project env from now on means someone reconnected an integration, and is a signal, not noise.

**What remains** is the project URL and the publishable key, in both their prefixed and unprefixed
spellings. Both are public by design and safe in a client bundle.

**And nothing secret remains locally either.** The database password was rotated and then dropped
from `.env` rather than re-pasted: no application code reads it, and the tools that do need it
(`psql`, `supabase link`, migrations) prompt. So the project currently holds no credential whose
leak would matter — which is worth stating because it is a property to keep, not a coincidence. A
future feature that needs a real secret should add it deliberately, to `.env` and nowhere else.

## 22 · What an account stores: the tick, and the level
**2026-09-05 · Binding** *(one column added by #31)*

`supabase/migrations/20260905154500_progress.sql`. Two tables, and the second one is the reason the
first is shaped the way it is.

**`progress` — the row is the tick.** `(user_id, path)` and a `marked_at`, nothing else. Marking a
lesson inserts a row; unmarking deletes it. There is no `done` column because a row's existence
already says it, and no score column because nothing is stored about a drill run at all.

**`settings` — one row per learner, holding the chosen level.** The level is required, so the column
is `not null` and "not chosen yet" is simply the absence of the row — one representation of that
state rather than two. The check constraint accepts only levels that have content, so nobody can
select an empty book; adding B1 is then a one-line migration, which is the right amount of friction.

**The level is a setting, never part of a progress key.** This is the whole design. A learner must be
able to drop from A2 to A1 and climb back without losing anything, so progress is keyed by path
alone and knows nothing about the level in force when it was ticked. Putting the level in the key,
or even on the row, would fragment one learner's history into per-level piles — the exact failure
this shape exists to prevent.

**Scores are not stored, anywhere.** A drill still grades itself and still shows a score screen; the
number simply never leaves the session. `docs/scope.md` limits an account to an email, progress and
settings, and a per-run score is a record of how a learner performed rather than what they have
decided is done — closer to the behavioural tracking that document rules out than to progress. This
supersedes the score half of #2 and of #18.

**The database knows nothing about the book.** No lessons table, no foreign key to one, no titles —
`path` is opaque and `src/data/navigation.ts` stays the single source of truth (#8, AGENTS.md §6).
A renamed path orphans its rows, which is what the `pathAliases` discipline already exists for;
mirroring the manifest into Postgres would buy referential integrity for content already checked at
build time, and create a second place for the book to disagree with itself.

**`marked_at` is client-supplied and has no trigger forcing `now()`.** In an offline PWA the moment
that matters is when the learner ticked the lesson, not when the row reached the server. A client can
only lie about its own rows.

**Policies are per verb, `authenticated` only.** Four narrow policies per table rather than one
`for all`, so widening one verb later cannot silently widen the rest; `anon` is revoked outright,
which is the line between "all content is public" (#18) and "progress needs an account".

**What this replaced:** a first draft, written the same day and never applied, carrying a `done`
boolean and a `score` / `score_total` / `scored_at` triple. It was cut in review — the tick is the
whole of what a learner asked to keep.

## 23 · Levels are a set on the lesson, and a required choice for the learner
**2026-09-05 · Binding**

Two halves of one mechanism.

**On the content side, a lesson carries a set of levels, not one.** A page on *les articles* can be
tagged `['A1', 'A2']` and appear for both; a page on the *passé composé* might be `['A2']` alone.
This supersedes the singular tag of #14, whose reasoning is otherwise untouched — the point of that
entry was that a level does not *own* a lesson, and a set is that idea taken to its conclusion. The
alternative, duplicating a page so each level can have its own copy, is the same failure #14
already rejects for parcours: two copies drift, and the learner meets whichever one is stale.

**On the learner side, the level is required before the book renders.** The flow is: sign in, choose
a level, then see the content tagged with it. `settings.level` is `not null`, so an account either
has a chosen level or has no settings row at all — and the app treats the second as "ask".

**Filtering is `learner level ∈ lesson levels`**, evaluated against `src/data/navigation.ts` at
render time. The database holds no opinion about which content belongs to which level: content
lives in the repo (#8), so a retagging is a diff, not a data migration.

**And the level filters the view, never the progress.** Ticks are keyed by path alone (#22), so
moving between levels changes what is on screen and nothing else. A lesson tagged for both levels
keeps one tick, not one per level — which is the reason a set beats duplication rather than merely
being tidier.

**An empty set means always visible**, and `levels` is required on every manifest entry so that `[]`
is a statement rather than an oversight. `culture` and `musique` are the cases that prompted it:
they are not A1 or A2 material and belong to whoever wants to read them. Making the field optional
would make "forgot to tag it" and "decided it needs no tag" identical in a diff, and only one of
those is a bug.

**The filter applies to the sommaire, not to access.** Signed in, the sommaire lists a lesson when
its levels are empty or contain the learner's level; signed out, it lists everything. A lesson
reached directly always renders — gating it would mean reading the session above a lesson, which #8
and AGENTS.md §8 forbid because it would make every page dynamic and break offline. This is the
same principle as #18 one layer down: the level shapes what is offered, never what is permitted.

## 24 · IndexedDB is the local store
**2026-09-05 · Binding**

Progress ticks and the chosen level are cached in **IndexedDB**. `localStorage` keeps exactly one
job: the theme.

**Chosen over `localStorage` on durability.** Both are local, both are per-device, and
`localStorage` is far pleasanter to write against — synchronous, four methods, no schema. But it is
also the first storage a browser clears under pressure, it is blocked outright in some privacy
modes, and its 5 MB ceiling is shared with everything else on the origin. Progress a learner has
accumulated over months is exactly the thing that must not evaporate because a phone was low on
space, and IndexedDB can additionally be marked persistent.

**The cost is that the adapter is async**, which is what the `load()` / `save(state)` seam (#8,
AGENTS.md §8) was already for — no component learns about this. A synchronous local read was never
part of the contract.

**The theme is the one exception, and it is not negotiable.** It must be applied by an inline script
before first paint or a dark-mode learner gets a white flash on every cold load (AGENTS.md §4), and
IndexedDB is async, so it cannot be read there at all. One key in `localStorage`, deliberately, is
not the beginning of a habit.

## 25 · A1 first, written from scratch
**2026-09-05 · Binding**

The rewrite starts with **A1 only**. A2 follows once A1 covers the DELF A1 syllabus (#15).

**Chosen over reaching parity with the 119 Vue lessons.** Parity is a number, not a syllabus, and
the old book grew by accretion rather than to a spec. Sizing A1 to DELF gives a definition of done
that is checkable from outside the project, and it makes the first release small enough to actually
finish — which matters more than breadth for a book nobody has read yet.

**It does not narrow the audience.** The heritage speaker is not a level (#13), and the orthography
and conjugation pages she needs are tagged for whatever levels they serve, or for none (#23). "A1
first" is a statement about the learner track's syllabus coverage, not a decision to postpone her.

## 26 · Sign-in lives at `/compte`
**2026-09-05 · Binding**

A route, not a dialog. `/compte` is where a learner signs in, sees they are signed in, chooses their
level (#23) and signs out.

**Chosen over a modal from the topbar** because it is linkable, it is a page the magic link can
return to, and it keeps auth UI out of the shell that every lesson renders inside. The topbar gets a
link, not a form.

**It needs a companion route handler at `/auth/callback`.** `@supabase/ssr` uses the PKCE flow: the
emailed link goes to Supabase, which redirects back with a `?code=`, and that code must be exchanged
for a session server-side before anything is signed in. The Supabase redirect allowlist therefore
covers `http://localhost:3000/**`, `https://lepetitcours.vercel.app/**` and the preview wildcard
`https://lepetitcours-*-kevjrmy-projects.vercel.app/**` — without the third, a magic link opened
from a preview deploy bounces to production.

**There is no custom domain**, and that is deliberate for this scope: a domain would mean setting
those URLs twice.

## 27 · The palette anchors on the wordmark blue; the serif carries the French
**2026-09-05 · Binding · closes the palette-and-typography item in `AGENTS.md` §12**

The design system's palette and typography, left open by #5.

**The blue is `#0044AA`** — the colour `public/logo.svg` is already drawn in — and the scale is
built around it, so `--accent` and the brand are the same colour by construction. It clears 8.7:1
on white, which is AAA for body text.

**Chosen over keeping the old `#12539F`.** Both are defensible blues; what is not defensible is
having both, which is what shipping the old primary next to the existing wordmark would have meant.
A topbar showing two blues a shade apart looks like a mistake, because it is one.

**The tricolore is not the palette, and never really was.** The old system described itself as
tricolore, but its semantic layer had `--accent` blue, `--danger` red, `--warn` amber and
`--success` green — the conventional four-role scheme with a French blue on top. Red was confined
to *wrong answer* throughout. That confinement is now a rule rather than an accident: **in a book of
graded drills, red means you got it wrong, so red is never decoration.** A red used ornamentally
teaches the learner to distrust the one signal that has to be trusted.

**Typography: Spectral for the French being taught, Inter for the instruction around it.**

The pairing is semantic, not decorative. Every page in this book mixes the language being taught
with the language explaining it — French examples inside Spanish prose on the learner track,
French examples inside French prose on the heritage track — and that distinction had no visual
carrier at all. Colour cannot be it: the state colours are spoken for, and §5 forbids colour as the
sole carrier anyway. So the serif marks the French and the sans marks the instruction, keyed on
*example vs. explanation* rather than on which language the page is written in, which is what makes
it work for both tracks at once (#13, #16).

**Chosen over Georgia headings on Inter body**, the old pairing, where the serif was heading
decoration and carried no meaning. Georgia is also wrong for the job the serif now has: its figures
are oldstyle and hang below the baseline, which reads as a typo in a conjugation table's person
column. Spectral has lining figures, was drawn by Production Type in Paris for screen reading, and
draws `œ`, `ç` and the `é`/`è`/`ê` trio as first-class glyphs rather than composites — which matters
because the serif's main job is French orthography at table sizes, not display.

**Consequence for `next/font`:** `subsets: ['latin']` is enough for both languages. The subset
covers `U+0000-00FF` and `U+0152-0153`, so every accented character, `ç`, `ñ`, `¿`, `¡` and the `œ`
ligature are in it. Pulling `latin-ext` would ship glyphs no lesson can contain. Real italics are
loaded for the serif, because a synthesised italic slants French accents wrongly.

**One thing this decision does not settle** *(settled by #28 the same day)*. The app icons are
still the wordmark, which is the wrong format for an icon rather than a flaw in the wordmark: hairline cursive is a smudge at 192 px
and a smear at 48 px, the maskable's safe-zone padding shrinks the type to nothing to survive
Android's circle, and `pwa-192x192.png` is transparent so it disappears into a dark home screen.
They need a mark that reads at 48 px inside a circle, and that is artwork, not a token. And the wordmark itself is painted
as a CSS mask rather than served as an `<img>`, so it takes `currentColor` and follows the theme —
an `<img>` would stay `#0044AA` and go muddy on the dark surface.

## 28 · The app icon is one letter of the wordmark
**2026-09-05 · Binding**

The icon is the cursive **P** from the "Petit" of `public/logo.svg` — subpaths 3 and 4 of the
outlined wordmark, extracted to `public/logo-mark.svg` — set in white on an opaque `#0044AA` ground.

**The wordmark stays exactly as it is.** Nothing was wrong with it; a wordmark is simply the wrong
*format* for an icon, and the fix is a crop, not a redraw. It keeps every job where its width is
available: the topbar, the sommaire, the larger favicon sizes.

**Why one letter.** Three separate failures, all of them about size rather than drawing. Hairline
script is a smudge at 192 px and a smear at 48 px. `maskable-icon-512x512.png` carried enough
safe-zone padding to survive Android's circle, but that padding is exactly what shrank the type to
nothing, so it landed as a white disc. And `pwa-192x192.png` was **transparent**, so the blue
wordmark floated unbacked and disappeared into a dark home screen.

**Generated, never hand-drawn.** `scripts/make-icons.mjs` renders every size from the one SVG, so
the set cannot drift and a change to the mark is one command rather than seven exports. It writes
`public/pwa-{64,192,512}.png`, `public/maskable-icon-512x512.png`, and the three `src/app/` file
conventions — `favicon.ico` (16 + 32 + 48), `icon.svg` and `apple-icon.png`. Chrome is used purely
as a rasteriser over the DevTools Protocol; there are no dependencies.

**The details that are load-bearing**, because each one was a bug first:

- **Every icon is opaque.** Transparency is what killed the old set on a dark home screen.
- **Only the maskable pays for the safe zone** (glyph at 60% of the height, versus 68% elsewhere).
  A glyph shrunk to survive Android's circle is a glyph too small everywhere else.
- **The favicon tiles are optically sized** — 78% at 16 and 32 px, 68% at 48. A browser tab has no
  mask to respect, and 16 px of hairline script needs the extra width to read at all.
- **`favicon.ico` must embed RGBA PNGs.** Next's ICO decoder rejects RGB outright
  ("The PNG is not in RGBA format!"), and Chrome drops the alpha channel when a capture is fully
  opaque. The script decodes and re-encodes the three tiles rather than fudging the artwork
  translucent to keep the channel.
- **`metadata.icons` in `layout.tsx` replaces the `src/app/` file conventions** rather than adding
  to them. Declaring the Apple icon there silently removed `icon.svg` from the head; the Apple icon
  became `src/app/apple-icon.png` instead, and `metadata.icons` is now unused on purpose.

## 29 · The shell derives from the manifest
**2026-09-05 · Binding**

The sidebar, the sommaire and every chapter landing page read `src/data/navigation.ts` and hold no
list of their own. Three choices inside that are worth recording, because each replaces something
the Vue app did differently.

**Chapter landing pages are one route, not fourteen.** `app/[chapitre]/page.tsx` renders them all
through `generateStaticParams`, with `dynamicParams = false` so an unknown slug 404s instead of
being rendered on demand — which is also what keeps the dynamic segment from swallowing every
unmatched top-level path. Adding a chapter to the manifest gives it a landing page with nothing
written.

**Chosen over fourteen near-identical files**, which is what "never hand-write a chapter page"
really costs when the router makes you create the folder anyway. It does mean the nav audit has to
resolve the dynamic segment from the manifest rather than from the filesystem; that is one line in
the audit against fourteen files that could each drift.

**Chapters carry no icon.** The mark on a sommaire card is the chapter's initial set in Spectral.
The identity of this project is lettering (#28), so a letter is on-brand rather than a substitute
for artwork — and it cannot fall out of step with the manifest. The Vue app's `icon` field was a
mapping you could forget with **nothing failing**: the chapter rendered a fallback glyph and looked
like a design choice rather than a bug. Removing the field removes the bug class.

**The sidebar's badge counts rows, not published lessons.** It says how many entries the chapter
opens to, each of which labels itself « Bientôt » if unwritten. A published tally would render a
column of zeroes today and read as broken. This is not the progress denominator, which stays
published-only (`AGENTS.md` §8) so an announced-but-unwritten lesson never makes a finished chapter
look unfinished.

**The shell is one client boundary, in the root layout.** `AppShell` takes `children` from the
server layout, so every page underneath stays a Server Component and keeps prerendering — verified
in `next build`, where all seventeen routes are still static. It also gives the sidebar its scroll
position and expanded chapters across navigation for free, which is the Next equivalent of the old
"the shell lives in `App.vue`" rule.

**The theme toggle holds no React state.** `data-theme` on the root element is already the single
source of truth: the inline script sets it before first paint and the icon is chosen from it in
CSS. Mirroring it into state would mean either a lazy initialiser reading `localStorage` during
render — which the server cannot do, so the first client render disagrees and hydration fails — or
a `setState` in an effect, which is a cascading render the React Compiler's lint rejects outright.
Reading the DOM at click time has neither problem. **Do not add state to it.**

## 30 · The account lives at the foot of the sidebar, behind a popover
**2026-09-05 · Binding**

The shell takes its general shape from **claude.ai**: a persistent left rail holding the whole
navigable tree, a near-empty top bar, and the account as a control pinned to the bottom of the rail
that opens a menu.

**What moved.** « Compte » and the theme control were in the top bar. They are now in a popover
opened from the account control at the foot of the sidebar, alongside « Ma progression », « À
propos » and a link to the source. The top bar keeps only the breadcrumb and, below the shell
breakpoint, the drawer button.

**A popover, not a modal.** The content is a short list of links; a modal would block the page to
show it, and on a phone the sidebar is *already* a drawer, so a modal inside it is two layers of
focus trap for one menu. It light-dismisses on Escape, on a pointer outside it, and on navigation.

**Which annexes go where is a property of the page**, not a list hand-copied into two components:
`annexes` in the manifest carries `where: "tree" | "menu"`. `Nouveautés` is about the book and stays
in the tree; the rest are about the reader and belong to the menu.

**The theme is a submenu of that popover**, not a control sitting open in it: a row reading
« Thème › » with the current choice beside it, which swaps the panel for the three options and a way
back. It **replaces the panel rather than flying out to the side** — the panel is as wide as the
sidebar and anchored to its bottom corner, so a flyout would need collision handling at the viewport
edge and would have some 166px to live in inside the mobile drawer. Swapping contents behaves
identically at both breakpoints, which is worth more here than the animation. Putting the current
value on the row is the small win: the theme is legible without opening anything.

**The theme control became three-way, and that is the part that fixes a bug.** The theme has three
states — light, dark, and "système", which is the *absence* of `data-theme` so that
`color-scheme: light dark` can resolve against the OS. The old top-bar toggle exposed two. Once a
learner clicked it they had written an explicit choice and there was no way back to following their
system: a one-way door with nothing in the interface to show it. « Système » now removes the
attribute and the stored key rather than writing a third value into them — storing `"system"` would
pin the page to whichever theme happened to be current when it was written.

**What the control says, in each state.** Signed in: the part of the email before the `@` as the
primary line, the full address beneath, and that initial in the serif as the avatar — the same
lettering the sommaire's chapter cards use. **There is no name to show**: an account holds an email,
progress rows and settings and nothing else (#22), and magic-link sign-in collects only an address.
Adding a display name would be a migration and a change to #22, not a UI tweak.

Signed out it reads « Compte » over « **Se connecter** », and deliberately **not** « Non connecté ».
Naming the absence frames the default state as a fault, when reading this site without an account is
the normal and intended way to use it — everything is public (#18) and `docs/scope.md` rules out
guilt mechanics. An offer belongs there, not a status report. (claude.ai puts a name and plan in
this slot because it has no signed-out state at all; the pattern transfers, that particular label
does not.)

**The session is read by a client hook, never by the layout.** `useAccount` is a client leaf inside
the root layout, so it can know who is signed in while the layout — and therefore every lesson
under it — stays statically prerendered (`AGENTS.md` §8). It returns `null` until Supabase Auth
exists; when it lands, that hook is the only file that changes.

**Superseded here:** #26's "the topbar gets a link, not a form". The *route* half of #26 stands
unchanged — sign-in is `/compte`, a linkable page a magic link can return to — and so does "never a
form in the chrome". Only the location of the link changed.

## 31 · An account may hold a display name
**2026-09-05 · Binding · extends #22**

`settings.display_name`, nullable, added by `supabase/migrations/20260905190000_display_name.sql`.
Before this, the only identity an account carried was its email, so the interface called a learner
by the part of it before the `@`.

**Chosen over leaving it at the email**, which worked and cost nothing. The argument for adding it
is small but real: `prenom.nom1987@…` is not what anyone wants to be called, and the fallback shows
it in the sidebar on every page. The argument against is the one that matters more — **every column
on an account is a promise to keep it, secure it and delete it**, and #22's "and nothing else" is
load-bearing rather than decorative. This is the one column that clears that bar; the next proposal
should be held to the same one. "It might be useful later" is not a reason.

**A second migration, not an edit to the first.** `20260905154500_progress.sql` has not been applied
anywhere yet, so editing it would also have worked — but only *if* that is really true, and a second
file is correct either way. Never edit a migration that might have run somewhere.

**On `settings`, not a `profiles` table of its own.** `settings` is already one row per learner, and
one nullable column does not earn four more RLS policies. The consequence to know: `level` is
`not null`, so a settings row cannot exist before a level is chosen, and therefore **a name cannot
be stored before a level either**. That fits the current flow — the level is asked once, right after
the first sign-in (#23), and the name is set later from `/compte`. If a name ever needs to be asked
first, it is that constraint that moves, not the column.

**NULL is the only way to say "unset."** The check constraint forbids the empty string, so there is
no second representation of the same state — the same discipline as #22's "no row means no level".
It also requires the value to be stored trimmed, caps it at 40 *characters* so accented names fit,
and rejects control characters, which nothing legitimate needs and which break the layout the name
is rendered into.

**No uniqueness constraint, deliberately.** The name is never an identifier and is **shown to nobody
but its owner**: there are no profiles, no authorship lines and no social surface anywhere in the
product, and `docs/scope.md` lists all three as non-goals. Requiring it to be unique would create a
namespace to squat and a moderation surface to staff, in exchange for nothing.

**RLS needed no change.** Policies are per table, not per column, and the four on `settings` already
scope every verb to `auth.uid() = user_id`. Recorded because "nothing to do" and "forgotten" look
identical in a diff.

**The field is on `/compte`, and its rules are `src/lib/account.ts`.** `checkDisplayName` mirrors the
check constraint deliberately: the client may be *stricter* than the database but never looser, or a
save fails in Postgres with an error nobody can act on. Two details that would be wrong if copied
carelessly — it counts **code points**, because `length()` in Postgres counts characters while
`"🙂".length` is 2 in JavaScript, so counting the JavaScript way would let a name through here and
have the database reject it; and an empty field stores `null` rather than `''`, so the single
representation of "unset" survives the round trip.

## 32 · One session for the shell, and an update rather than an upsert
**2026-09-05 · Binding**

`useAccount` reads a real Supabase session now: `AccountProvider` subscribes to
`onAuthStateChange` inside `AppShell`, and `src/lib/supabase/client.ts` memoises the browser client.

**One provider, not one hook per consumer.** The obvious version — every component calling
`useAccount` and holding its own state — was wrong for a reason that only shows up after the write
path exists: the sidebar and `/compte` would each keep a copy, and saving a name would update one of
them. The sidebar would keep showing the old name until a full reload. One subscription, one answer,
and a `reload()` the settings form calls after a successful save.

It lives **inside `AppShell`**, which is already the single client boundary, so the root layout and
every page under it stay Server Components. Every route is still static in `next build`, which is
the check that matters (`AGENTS.md` §8).

**The email and the name are set separately, in that order.** The email is in the session; the name
is a row in `settings` and arrives a round trip later. A learner is signed in the moment the session
says so — a `settings` table that is unreachable must cost them their name, not their session.
Today that path is not hypothetical: the migrations are unapplied, the table genuinely 404s, and the
interface correctly falls back to the local part of the email.

**Saving is an `update`, never an `upsert`.** An upsert would have to supply a `level` to satisfy the
not-null constraint, and there is no level this code could supply that would not be a guess made on
the learner's behalf (#22, #23). So a save into a missing row fails with `no-settings-row`, and the
interface says « Choisissez d'abord votre niveau » rather than apologising — it is a step that has
not happened yet, not an error. This is the coupling #31 predicted, now visible in the UI.

**The client returns `null` when the environment variables are absent**, rather than throwing.
Someone who clones the repo without an `.env` still gets the whole book: it is public and static,
and only the account chrome degrades. `useAccount` reads that as signed out, which is true.

## 33 · Sign-in, and the proxy this app does not need
**2026-09-05 · Binding**

The magic-link form on `/compte`, `/auth/callback` to exchange the code, sign-out, and the request
client in `src/lib/supabase/server.ts`. This closes the flow #26 described.

**The callback exists because the code is single-use and must be exchanged server-side.** That is
the only reason the link does not point straight at `/compte`. Every outcome from it ends back at
`/compte` — signed in, or with `?erreur=` and a sentence saying what happened. A dead end on an
error page is the worst place to leave someone who has just clicked a link in their email.

**The redirect target is built from `x-forwarded-host`, not from the request origin.** On Vercel the
origin is internal; the forwarded host is the domain the learner actually clicked through to,
preview deploys included. Redirecting to the origin would send them somewhere they hold no session
for, and the cookie was just written for the forwarded host. Verified by hand: with a forwarded host
header the callback redirects to that host, without one it redirects to the origin.

**This app needs no session-refresh proxy**, and that falls out of §8 rather than being a shortcut.
A Supabase + Next app normally carries a `proxy.ts` (`middleware.ts` before Next 16) whose whole job
is refreshing the auth token so *server renders* see a fresh session. No server render here reads a
session — that is forbidden precisely because it would make lessons dynamic — so there is nothing to
keep fresh. The browser client refreshes its own token. **If a proxy ever appears in this repo for
auth reasons, something has started reading the session on the server.**

**`/compte` stays static**, which is the part worth checking rather than assuming. Reading `?erreur=`
with `useSearchParams` inside a `<Suspense>` boundary keeps the route prerendered; reading it from
the page's `searchParams` would have forced the whole route dynamic. `next build` shows `/auth/callback`
as the only dynamic route in the app.

**An interface message is not a lesson callout.** The first version of the expired-link notice used
`.exception`, which injects « Sauf — » — a label about French grammar — in front of an
authentication error. `.message` and its variants exist for the interface and inject nothing. The
lesson callouts are content, and their labels are part of the content.

## 34 · Choosing a level is what creates the settings row
**2026-09-05 · Binding · implements #23**

The chooser on `/compte`. Three things about it are decisions rather than implementation.

**`saveLevel` is an upsert where `saveDisplayName` is an update**, and the asymmetry is the whole
shape of this table. The level call supplies the `level` the not-null constraint wants, so it can
create the row; the name call cannot, because there is no level it could invent that would not be a
guess made on the learner's behalf (#31, #32). **Choosing a level is therefore the act that brings a
settings row into existence**, and every other setting hangs off it. Only the columns in the payload
are written, so re-choosing a level leaves a display name alone.

**The name field is not offered until a level exists.** It would offer a save that cannot succeed.
The error message for that case still exists — a row can go missing between reads — but the ordinary
path never reaches it.

**`settingsRead` exists because `level: null` is ambiguous.** "Has not chosen" and "we have not
looked yet" are the same value, and without the flag the interface asks a question the learner
already answered, for as long as a round trip takes. A pause is better than a question you have to
re-answer.

**`CHOOSABLE_LEVELS` mirrors `settings_level_known`**, the same discipline as `checkDisplayName`
mirroring `settings_display_name_shape` (#31). Offering a level the constraint rejects would fail
the save with an error nobody can act on, and offering an empty level would hand someone an empty
book. Opening B1 is a one-line migration and one line in `navigation.ts`, in the same commit.

**What this does not do yet:** the sommaire ignores the chosen level. `visibleLessons` and
`useAccount().level` both exist; nothing calls them together. Until that is wired the level is a
stored preference with no visible effect beyond unblocking the name.

## 35 · Every listing obeys the level, and the unfiltered book is what ships
**2026-09-05 · Binding · completes #23**

The chosen level now filters the sommaire's counts, the chapter pages and the sidebar.

**All three, not just the sommaire.** §6 said "the sommaire" because it was written before the
sidebar existed. A sidebar saying seven lessons beside a card saying one does not read as a filter,
it reads as a bug — and the sidebar is the book's table of contents, so it is the listing a learner
actually navigates by.

**The unfiltered book is what ships; hydration narrows it.** The listings are Client Components
inside Server Component pages, so React server-renders them into the static HTML with everything
visible, and the filter applies once `useAccount` resolves. That ordering is not a compromise, it is
the correct default twice over: it is what a signed-out visitor should see (#23), and it is what a
cold page from the service worker should contain. A page that rendered empty until JavaScript
decided otherwise would break the offline story that public, static lessons exist to protect.

**Hiding is never gating.** Every path still resolves, and a lesson at another level opens normally
from a cross-link, a bookmark or a search result. Nothing reads the session to decide whether a page
renders — that is what would drag lessons out of prerendering (§8).

**A filter has to be visible or it is indistinguishable from an unwritten book.** The sommaire says
which programme it is showing and offers a way to change it. A chapter with nothing at the learner's
level still appears and says so, rather than vanishing: a missing chapter raises a question the
interface cannot answer.

**What this exposes about the current manifest:** at A1 the filter hides nothing, because every
placeholder lesson is tagged A1 or carries no level at all. It only bites at A2. That is a property
of content written before the DELF gap analysis, not of the filter.
