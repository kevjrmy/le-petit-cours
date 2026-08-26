---
name: design-system
description: Use when changing anything visual in le-petit-cours — colors, spacing, typography, the app shell, the sidebar, dark mode, or a component's look. Also use to audit views for raw colors or tokens that break in dark mode. Do NOT use for writing lesson content.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Design system guardian

You own `src/style.css` and the look of every component in `le-petit-cours`.
Read `AGENTS.md` §3 first if it is not already in context.

## The one rule everything else follows

**A raw color value in a component is a bug.** `#4CAF50`, `white`, `rgba(0,0,0,.5)` — all
of them freeze the component in light mode. Every color comes from a token.

Before you finish any task, run:

```bash
grep -rn "#[0-9a-fA-F]\{3,8\}\b\|: *white\b\|: *black\b" src/views src/components src/layouts
```

It must return nothing. If a shade you need genuinely does not exist, add it to the
palette **and** the semantic layer in `src/style.css` — both themes — then use the
semantic name.

## Token layers (defined in `src/style.css`)

1. **Palette** — `--blue-700`, `--red-500`, `--grey-200`… raw scales. Never referenced
   from a component. The only exceptions are the literal flag bands in `PageHeader.vue`
   and the sommaire hero, which must stay the same color in both themes.
2. **Semantic** — what you actually use:
   - surfaces: `--surface-app` (page bg), `--surface-1` (cards), `--surface-2` (inset,
     zebra rows), `--surface-3` (hover fills), `--surface-sidebar`, `--surface-bar`
   - text: `--text-1` (body), `--text-2` (secondary), `--text-3` (metadata),
     `--text-heading`, `--text-on-accent` (text sitting on a filled accent)
   - lines: `--border`, `--border-soft`, `--border-strong`
   - roles: `--accent` / `-hover` / `-soft` / `-subtle` / `-line` / `-text`, and the same
     shape for `--danger`, `--warn`, `--success`
   - elevation: `--shadow-sm`, `--shadow`, `--shadow-lg`
   - layout: `--max-width`, `--sidebar-w`, `--topbar-h`, `--radius*`, `--dur*`, `--ease`
3. **Aliases** — the legacy `--clr-*` names. They map onto layer 2 so the older views
   inherit dark mode. Do not introduce new ones; migrate opportunistically when you are
   already editing a view.

### Adding a semantic token

Add it in **all three** places or dark mode silently breaks:
`:root` (light), `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])`,
and `:root[data-theme="dark"]`. The last two are duplicated on purpose — the media query
handles "système", the attribute handles an explicit choice, and neither can cover both.

## Page-type shells live in `style.css`, not in views

Each kind of page has its furniture defined once, globally, and views declare a class and
write no `<style>` block:

| Class | Pages | Owns |
|---|---|---|
| `.lesson` | grammaire, orthographe, astuces, vocabulaire, theme, prononciation, musique | tables, `.hl-*`, `.note`, `.method`, `.download-btn` |
| `.exo` | exercices | instructions, progress meter, card, feedback, score screen |
| `.gapfill` | conversation | word bank, chips, chat bubbles, slots |
| `.dictee` | dictees | prep card, audio buttons, textarea, correction, score screen |

Content patterns usable inside any of them: `.rule`, `.example`, `.attention`,
`.exception`, `.astuce` (+ `.astuce-hook`), `.lesson-link`.

**A component that owns a whole page type keeps its CSS scoped instead** — there is nothing
to duplicate and nothing to promote. That is correct for `ConjugationSheet.vue`,
`PronunciationSheet.vue` and `RelatedLinks.vue`. The test is whether a second file would
ever need the same rules.

`RelatedLinks.vue` renders at the foot of every lesson page, so treat it as page furniture:
it must work in both themes and collapse to one column under 560px.

When a third page of a type grows its own copy of the same scoped CSS, that is the signal
to promote it here — that is exactly how `.dictee` came to exist, replacing ~1,100 lines of
triplicated scoped styles. Pages written before a shell existed keep identical scoped
copies; scoped selectors win on specificity, so they are unaffected. Don't strip them
except when already editing the file.

## Non-negotiable constraints

- `--max-width: 52rem` is the reading column, sized for reading on screen. It was pinned to
  794px (A4 at 96 dpi) until PDF export was removed on 2026-08-26. The shell is full-width;
  the reading column is not.
- Two breakpoints only: **52rem** (content, must move with `--max-width`) and **900px**
  (shell: sidebar → drawer). The 900px value is duplicated in
  `src/composables/useSidebar.js` — change both together.
- **There is no print stylesheet.** Every `@media print` block was removed with the PDF
  feature; don't add chrome that assumes one, and don't reintroduce `.no-print`.
- Pure CSS. No Tailwind, no utility classes, no inline styles doing design work.
- **Bare `article` and `section` are cards** (`padding: 1.5rem 1.75rem`, plus
  `section + section { margin-top: 1rem }`). That makes them expensive: a page rendering
  each of its sections as its own `<article>` pays ~4 rem of chrome per section, which is
  what made the pronunciation sheet five screens deep. Use one card with internal dividers when
  sections belong together — and remember a `<section>` used as a layout box inherits the
  padding too, so reset it or use a `<div>`.

## Traps already hit in this codebase

- `.side-nav` is a **column** flex container. `flex: 1` on a child makes it grow
  *vertically*, not fill the row. Use `flex: 0 0 auto` and scope `flex: 1 1 auto` to
  children of the row-direction `.nav-row`.
- `flex: 0` means `flex: 0 1 0%` — a zero basis. It collapses images. Write `flex: 0 0 auto`.
- `color: var(--clr-page)` used to mean "white text on blue". It is a **surface** token
  and inverts in dark mode. Use `--text-on-accent`.
- Scoped styles cannot reach a sibling rendered by the layout (e.g. `PageHeader`).

## Verifying

`npm run build` must pass, then check **both themes** at **both breakpoints**:

```bash
npm run dev
# light
google-chrome --headless --disable-gpu --no-sandbox --window-size=1280,1000 \
  --virtual-time-budget=5000 --screenshot=light.png http://localhost:5173/<route>
# dark
google-chrome --headless --disable-gpu --no-sandbox --window-size=1280,1000 \
  --blink-settings=preferredColorScheme=0 --virtual-time-budget=5000 \
  --screenshot=dark.png http://localhost:5173/<route>
# mobile drawer
google-chrome --headless --disable-gpu --no-sandbox --window-size=430,900 \
  --virtual-time-budget=5000 --screenshot=mobile.png http://localhost:5173/<route>
```

Read the PNGs back and actually look at them. `--force-dark-mode` does **not** emulate
`prefers-color-scheme`; `--blink-settings=preferredColorScheme=0` does.

Always pass **`--force-prefers-reduced-motion`**. The route transition
(`.route-enter-active`, a 0.18s opacity+translate fade) does not reliably finish under
`--virtual-time-budget`, so screenshots come out half-faded and colours cannot be judged.
`style.css` already honours the media query, which collapses the fade to nothing.
