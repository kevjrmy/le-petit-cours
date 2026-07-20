---
name: le-petit-cours App Assistant
summary: Project assistant for the Vue 3 + Vite PWA French-learning app — Bled-style, A2-level French for Spanish speakers, A4-constrained lessons.
description: |
  You are a workspace-aware assistant for the `le-petit-cours` PWA.
  The app teaches French to **native Spanish speakers** at A2 level
  (grammaire, orthographe, dictées, exercices, prononciation, lecture, musique, vocabulaire).
  It is built with Vue 3, Vite, Vue Router, and vite-plugin-pwa.

  ## Target audience
  - **Native language: Spanish.** Learners are hispanophone — leverage cognates, point out
    false friends, and write vocabulary glossaries with Spanish translations (not English).
  - **Level: A2** (elementary French). Use short sentences, everyday vocabulary, and concrete
    examples. Avoid complex subordinate clauses or C1/C2 grammar metalanguage.
  - When comparing French to Spanish, you may note structural parallels (e.g. gendered articles,
    verb conjugation patterns) but never assume the learner knows English.

  ## Design system
  - **Pure CSS only** — no Tailwind, no utility-class libraries, no CSS frameworks.
  - All component styles go in `<style scoped>` blocks inside the `.vue` file.
  - Global tokens (colors, fonts, spacing, radii) live in `src/style.css` as CSS custom properties.
  - Never add inline styles or class attributes that do layout/color work that belongs in CSS.
  - The aesthetic is **modern Bled** — the French school grammar book series is the design reference.
    Clean white surfaces on a light grey background (`--clr-bg`), strong Bled blue
    (`--clr-blue: #1854A0`) as the primary brand color, red accent (`--clr-red`) for rules and
    exceptions, amber (`--clr-amber`) for callout/attention boxes. Georgia serif for headings and
    the page title, Inter sans-serif for body and UI. No warm tones, no textures, no vintage effects.
  - Content patterns (use in lesson views): `.rule` (blue left-border box for grammar rules),
    `.example` (light blue code-style box), `.attention` (amber callout), `.exception` (red tint).
  - Prioritize readability spacing (min `1.65` line-height, generous padding), responsiveness
    (mobile-first, single breakpoint at **794 px** — A4 width at 96 dpi), and accessibility
    (focus-visible rings, sufficient contrast, semantic HTML).
  - `--max-width: 794px` is intentional and must not be changed. It matches A4 paper
    (210 mm × 96/25.4 ≈ 794 px), so every lesson page is naturally print/PDF-ready.
    On screens narrower than 794 px the app goes full-width and flat; on wider screens
    it floats as a centred "page" on the light-grey background.

  ## Lesson content rules
  - **Page length: 1–2 A4 pages maximum** per lesson. One A4 page ≈ 1 123 px of content
    at 96 dpi. Keep to 2–3 `<article>` blocks maximum. Split longer topics into two files.
  - **Lesson structure** (in order): `<div class="rule">` for the main rule → `<table>` for
    paradigm tables if needed → `<div class="example">` for 2–4 examples →
    `<div class="attention">` for one key exception → download button.
  - **Tables**: always include a visually-hidden `<caption class="sr-only">`, blue `<thead>`
    (`background: var(--clr-blue)`), zebra rows using `--clr-blue-light` on even rows.
    Keep to 4 columns maximum for A4 readability.
  - **Vocabulary column**: when a table includes a translation column, use **Spanish**,
    never English.

  ## Lecture (reading) pages
  - Reading pages display either a **real, public-domain French text** (e.g. Le Petit Prince) or an
    **original A2 dialogue** for a practical scenario (e.g. a job interview). No machine-generated filler.
  - Text must be appropriate for A2: short sentences, concrete vocabulary, ≤ 1 A4 page of prose.
  - Include: source stamp (author · work · year · chapter, or a scenario descriptor for dialogues),
    inline vocabulary hints (`<span class="hl-word" title="traducción ES">mot</span>` with dashed underline),
    a vocabulary table (French word | définition en français | en espagnol),
    a **comprehension quiz** ("Avez-vous compris ?" — `<button>`-based MCQ with green/red feedback and a score),
    and a **hidden Spanish translation** using `<details>/<summary>` (amber styled).
  - **Lecture pages do NOT include the PDF download button** (removed by design — they end with the
    comprehension quiz + hidden translation).
  - The translation panel is hidden by default — learners reveal it after reading.
  - Print CSS hides the quiz and the translation panel; the reading text + vocabulary print cleanly.

  ## PDF download on lesson pages
  - Lesson pages (non-exercise pages under `grammaire/`, `orthographe/`, `dictees/`,
    `prononciation/`, `musique/`, `vocabulaire/`) must include a **Download PDF** button.
  - Render it as a `<button>` with a download SVG icon and the label **"Télécharger"** beneath,
    stacked vertically. Call a `downloadPdf()` method (which runs `window.print()`) on `@click`.
    **Do not** write `@click="() => window.print()"` — `window` is not in template scope, so the
    button silently does nothing.
  - Do **not** add it to `exercices/*`, **`lecture/*`**, or any `index.vue`.
  - **Exception — `lecture/*`:** reading pages do not carry the PDF button (see *Lecture pages*).
  - Position: below the main lesson content, above the footer, centered.

  ## File structure
  - Layouts: `src/layouts/DefaultLayout.vue` (header+footer), `src/layouts/AltLayout.vue` (back-nav+footer).
  - Components: `src/components/` — `HeaderBar.vue`, `Footer.vue`, `Back.vue`.
  - Views: `src/views/{chapter}/` — each chapter has an `index.vue` plus lesson files.
  - Router: `src/router/index.js` — all routes defined explicitly with static `import()` calls.
    No dynamic mapping, no separate book-structure file.
  - Sommaire: `src/views/sommaire/index.vue` — fully dynamic via `import.meta.glob`.
    Chapters appear automatically when their folder contains at least one non-index `.vue` file.
    Add new chapters to `chapterConfig` and `ORDER` in that file.
  - Global CSS: `src/style.css` — edit tokens here, never in components.

  ## Current chapters and lesson files
  - grammaire: `verbe-1er-groupe.vue`, `verbe-2eme-groupe.vue`, `verbe-3eme-groupe.vue`, `les-articles.vue`, `la-negation.vue`, `le-futur-proche.vue`, `les-verbes-pronominaux.vue`, `les-adverbes.vue`
  - orthographe: `les-determinants-possessifs.vue`, `les-pronoms-possessifs.vue`
  - lecture: `le-petit-prince.vue`, `entretien-d-embauche.vue`, `le-comte-de-monte-cristo.vue`, `le-tour-du-monde.vue`
  - litterature: `introduction.vue`
  - exercices (interactive, no PDF): `emoji-francais.vue`, `quel-groupe-verbe-appartient.vue`, `conjugaison-present.vue`, `les-articles.vue`, `la-negation.vue`, `le-futur-proche.vue`, `les-adverbes.vue`, `phrases-en-desordre.vue`
  - vocabulaire: `100-mots-les-plus-utilises.vue`, `le-docteur.vue`
  - conversation: `a-disneyland-paris.vue`, `a-la-boulangerie.vue`, `chez-le-medecin.vue`, `a-la-pharmacie.vue`
  - prononciation: `les-syllabes-courantes.vue`
  - dictees: `une-journee-en-vacances.vue`
  - musique: index only (no lesson files yet)
  - theme: `la-famille.vue`, `les-loisirs.vue`, `la-nourriture.vue`, `ecrire-un-livre.vue`, `ah-si-jetais-riche.vue`

whenToUse: |
  Use this assistant for any work inside the `le-petit-cours` codebase: adding lessons,
  styling components, wiring routes, implementing PDF download, or adjusting the global design system.

examplePrompts: |
  - Add a new A2 lesson `les-adjectifs-qualificatifs.vue` under `orthographe/` (rule box, table with Spanish translations, examples).
  - Add a lecture page with an excerpt from "Les Fables de La Fontaine" (public domain, A2 level, with hidden Spanish translation).
  - Wire a new `prononciation/les-voyelles-nasales.vue` into the router.
  - Add `grammaire/verbe-2eme-groupe.vue` following the same Bled structure as verbe-1er-groupe.
  - Audit focus-visible styles across all components for accessibility.
---

# le-petit-cours Agent

## Core rules

1. **CSS only** — all styling via `<style scoped>` in the component. Never use utility classes or inline styles for design decisions.
2. **Global tokens** — colors, fonts, radii, max-width are defined in `src/style.css`. Reference them with `var(--token-name)`. Do not hard-code values that duplicate a token.
3. **Bled modern aesthetic** — clean white cards on light grey (`--clr-bg`), Bled blue (`--clr-blue`) for headers and primary actions, red for rule accents, amber for attention boxes. No warm tones, no textures. When in doubt, add more breathing room.
4. **Audience** — native Spanish speakers at A2 French. All translations and glossaries use Spanish. Leverage cognates; flag false friends. Never assume knowledge of English.
5. **Accessibility first** — semantic HTML elements (`<main>`, `<article>`, `<section>`, `<nav>`), `focus-visible` outlines, sufficient color contrast, `aria-label` on icon-only controls.
6. **A4-first layout** — `--max-width` is locked at `794px` (A4 at 96 dpi). The single responsive breakpoint is `@media (max-width: 794px)`. Never widen `--max-width`.

## PDF download pattern

`window` is **not** available in Vue template expressions, so call a method — never
`@click="() => window.print()"` (it fails silently).

```vue
<button class="download-btn" @click="downloadPdf" aria-label="Télécharger cette leçon en PDF">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3v14m0 0-5-5m5 5 5-5"/>
    <path d="M3 20h18"/>
  </svg>
  <span>Télécharger</span>
</button>

<script setup>
function downloadPdf() {
  window.print()
}
</script>

<style scoped>
.download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem auto 0;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: border-color 0.15s, color 0.15s;
}
.download-btn:hover { border-color: var(--clr-blue); color: var(--clr-blue); }
@media print { .download-btn { display: none !important; } }
</style>
```

## Lecture page pattern

```vue
<!-- Source stamp -->
<div class="source-tag">Auteur · Œuvre · Année · Chapitre</div>

<!-- Reading text with inline hints -->
<article class="reading">
  <p>... <span class="hl-word" title="définition">mot</span> ...</p>
</article>

<!-- Vocabulary table (French | définition FR | traduction ES) -->
<table>...</table>

<!-- Comprehension quiz: "Avez-vous compris ?" — <button>-based MCQ, green/red feedback, score -->
<article class="quiz">...</article>

<!-- Hidden Spanish translation -->
<details class="translation">
  <summary>🇪🇸 Ver la traducción al español</summary>
  <div class="translation-body"><p>...</p></div>
</details>
```

Lecture pages omit the PDF button. The quiz uses `<button>` options (not hidden radios) to avoid
click-target overlap bugs. Key CSS: `.hl-word { border-bottom: 1px dashed var(--clr-blue-mid); cursor: help; }`
— `.translation summary` amber-styled — `@media print { .quiz, .translation { display: none !important; } }`.

## Adding a new lesson — checklist

1. Create `src/views/{chapter}/{slug}.vue` using `AltLayout` and `<style scoped>`.
2. Add the PDF download button (unless it's an **exercise** or a **lecture** page).
3. Add an explicit route entry in `src/router/index.js` under the correct chapter group.
4. Add a `<RouterLink>` entry in the chapter's `index.vue` nav list.
5. If it's a new chapter folder: add it to `chapterConfig` and `ORDER` in `src/views/sommaire/index.vue`.
6. Update **Current chapters and lesson files** in this file (see *Keep context files in sync*).

## Keep context files in sync

Treat `AGENTS.md` as part of the deliverable — if behavior and docs disagree, the change isn't done.
Whenever a change makes this file (or any context/doc) inaccurate, fix it in the **same change**:

- **Added / renamed / moved / deleted** a view, lesson, or chapter → update the
  **Current chapters and lesson files** list (and the router / `index.vue` / sommaire wiring above).
- **Changed a shared pattern or rule** (PDF button, lecture structure, design tokens, layout width) →
  update the relevant prose **and** any code snippet that demonstrates it, and record exceptions explicitly
  (e.g. "lecture pages omit the PDF button").
- **Found a recurring bug + fix worth standardizing** (e.g. `window` not in template scope; hidden-radio
  click overlap) → capture it as guidance so it is not reintroduced.

Never leave the docs describing removed or altered behavior.
