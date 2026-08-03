<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <DefaultLayout title="Sommaire">
    <main id="home">
      <RouterLink
        v-for="ch in chapters"
        :key="ch.folder"
        :to="ch.path"
        class="chapter-row"
      >
        <span class="chapter-name">
          {{ ch.title }}
          <span v-if="newChapterFolders.has(ch.folder)" class="new-badge">Nouveau</span>
        </span>
        <span class="chapter-count">{{ ch.count }}&thinsp;{{ ch.countLabel }}</span>
        <span class="arrow" aria-hidden="true">→</span>
      </RouterLink>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { hasNewChildView } from '@/utils/viewMeta'

// Discover all view files at build time — no hardcoding needed.
// Keys are relative to this file (src/views/sommaire/index.vue),
// so `../` resolves to src/views/.
const allViews = import.meta.glob('../**/*.vue')

const SKIP = new Set(['sommaire', 'annexe'])
const newChapterFolders = ref(new Set())

const chapterConfig = {
  grammaire:     { title: 'Grammaire',      label: 'leçon',    labelPlural: 'leçons'    },
  orthographe:   { title: 'Orthographe',   label: 'leçon',    labelPlural: 'leçons'    },
  dictees:       { title: 'Dictées',        label: 'dictée',   labelPlural: 'dictées'   },
  exercices:     { title: 'Exercices',      label: 'exercice', labelPlural: 'exercices' },
  lecture:       { title: 'Lecture',        label: 'texte',    labelPlural: 'textes'    },
  prononciation: { title: 'Prononciation',  label: 'leçon',    labelPlural: 'leçons'    },
  musique:       { title: 'Musique',        label: 'chanson',  labelPlural: 'chansons'  },
  vocabulaire:   { title: 'Vocabulaire',    label: 'activité', labelPlural: 'activités' },
  conversation:  { title: 'Conversation',   label: 'dialogue', labelPlural: 'dialogues' },
  litterature:   { title: 'Littérature',    label: 'page',     labelPlural: 'pages'     },
  theme:         { title: 'Thèmes de conversation', label: 'thème', labelPlural: 'thèmes' },
}

const ORDER = ['grammaire', 'orthographe', 'dictees', 'exercices', 'lecture', 'litterature', 'prononciation', 'musique', 'vocabulaire', 'conversation', 'theme']

// Group files by folder
const folderMap = {}
for (const path of Object.keys(allViews)) {
  const m = path.match(/^\.\.\/([^/]+)\/([^/]+)\.vue$/)
  if (!m) continue
  const [, folder, file] = m
  if (SKIP.has(folder)) continue
  ;(folderMap[folder] ??= []).push(file)
}

// Keep only folders with at least one non-index file
const chapters = Object.entries(folderMap)
  .filter(([, files]) => files.some(f => f !== 'index'))
  .map(([folder, files]) => {
    const cfg = chapterConfig[folder] ?? { title: folder, label: 'page', labelPlural: 'pages' }
    const count = files.filter(f => f !== 'index').length
    return {
      folder,
      path: `/${folder}`,
      title: cfg.title,
      count,
      countLabel: count === 1 ? cfg.label : cfg.labelPlural,
    }
  })
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.folder)
    const ib = ORDER.indexOf(b.folder)
    if (ia === -1 && ib === -1) return 0
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })

onMounted(async () => {
  const entries = await Promise.all(
    chapters.map(async chapter => [chapter.folder, await hasNewChildView(chapter.folder)])
  )
  newChapterFolders.value = new Set(entries.filter(([, hasNew]) => hasNew).map(([folder]) => folder))
})
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.chapter-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  background: var(--clr-page);
  color: var(--clr-ink);
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.chapter-row:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.chapter-name {
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.45rem;
  font-family: var(--font-serif);
  font-size: 1rem;
}

.new-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border-radius: 99px;
  background: var(--clr-red);
  color: var(--clr-page);
  font-family: var(--font-sans);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.chapter-count {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  color: var(--clr-ink-soft);
  background: var(--clr-blue-light);
  border-radius: 99px;
  padding: 0.15rem 0.55rem;
  white-space: nowrap;
  transition: color 0.15s;
}

.chapter-row:hover .chapter-count {
  color: var(--clr-blue);
}

.arrow {
  color: var(--clr-ink-soft);
  font-size: 0.85rem;
  transition: transform 0.15s, color 0.15s;
}

.chapter-row:hover .arrow {
  transform: translateX(3px);
  color: var(--clr-blue);
}
</style>
