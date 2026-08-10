<!-- view-meta: created=2026-08-02; updated=2026-08-10 -->
<template>
  <DefaultLayout>
    <main id="home">
      <!-- ── Hero ──────────────────────────────────── -->
      <section class="hero">
        <p class="hero-eyebrow">Français · Niveau A2</p>
        <h1 class="hero-title">Le Petit Cours</h1>
        <p class="hero-tagline">
          Un cours de français pensé pour les hispanophones : grammaire, orthographe,
          lecture et conversation, une page à la fois.
        </p>
        <div class="tricolore" aria-hidden="true">
          <span class="band band-blue"></span>
          <span class="band band-white"></span>
          <span class="band band-red"></span>
        </div>

        <dl class="hero-stats">
          <div class="stat">
            <dt>Chapitres</dt>
            <dd>{{ cards.length }}</dd>
          </div>
          <div class="stat">
            <dt>Leçons</dt>
            <dd>{{ totalLessons }}</dd>
          </div>
          <div class="stat">
            <dt>Nouveautés</dt>
            <dd>{{ newChapterFolders.size }}</dd>
          </div>
        </dl>
      </section>

      <!-- ── Chapter grid ──────────────────────────── -->
      <h2 class="grid-title">Sommaire</h2>

      <nav class="chapter-grid" aria-label="Chapitres du cours">
        <RouterLink
          v-for="chapter in cards"
          :key="chapter.slug"
          :to="chapter.path"
          class="chapter-card"
        >
          <span class="card-icon" aria-hidden="true">
            <ChapterIcon :name="chapter.icon" size="1.35rem" />
          </span>

          <span class="card-body">
            <span class="card-head">
              <span class="card-name">{{ chapter.title }}</span>
              <span v-if="newChapterFolders.has(chapter.slug)" class="new-badge">Nouveau</span>
            </span>
            <span class="card-blurb">{{ chapter.blurb }}</span>
          </span>

          <span v-if="chapter.count" class="card-count">
            {{ chapter.count }}&thinsp;{{ chapter.label }}
          </span>
          <span v-else class="card-count soon">Bientôt</span>
        </RouterLink>
      </nav>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ChapterIcon from '@/components/ChapterIcon.vue'
import { chapterCount, chapters, publishedLessons } from '@/data/navigation'
import { hasNewChildView } from '@/utils/viewMeta'

/* Chapters come from the manifest. A chapter whose lessons are all still
   announced-but-unwritten stays listed, marked "Bientôt", so the plan for the
   book is visible rather than silently hidden. */
const cards = chapters
  .filter(chapter => chapter.lessons.length > 0)
  .map(chapter => ({ ...chapter, ...chapterCount(chapter) }))

const totalLessons = chapters.reduce(
  (sum, chapter) => sum + publishedLessons(chapter).length,
  0
)

const newChapterFolders = ref(new Set())

onMounted(async () => {
  const entries = await Promise.all(
    cards.map(async chapter => [chapter.slug, await hasNewChildView(chapter.slug)])
  )
  newChapterFolders.value = new Set(
    entries.filter(([, hasNew]) => hasNew).map(([slug]) => slug)
  )
})
</script>

<style scoped>
#home {
  gap: 2rem;
}

/* ── Hero ───────────────────────────────────────── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  text-align: center;
  padding: 2.25rem 1.75rem 1.75rem;
  background:
    radial-gradient(120% 100% at 50% 0%, var(--accent-subtle) 0%, transparent 70%),
    var(--surface-1);
}

.hero-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  line-height: 1.1;
  color: var(--text-heading);
}

.hero-tagline {
  max-width: 46ch;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-2);
}

.tricolore {
  display: flex;
  width: 120px;
  height: 3px;
  margin-top: 0.6rem;
  border-radius: var(--radius-pill);
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--border-soft);
}

.band { flex: 1; }
.band-blue  { background: var(--blue-700); }
.band-white { background: var(--white); box-shadow: inset 0 0 0 1px var(--border-soft); }
.band-red   { background: var(--red-500); }

.hero-stats {
  display: flex;
  gap: 2.25rem;
  margin-top: 1.35rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-soft);
}

.stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.1rem;
}

.stat dt {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
}

.stat dd {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-text);
  line-height: 1.1;
}

/* ── Grid ───────────────────────────────────────── */
.grid-title {
  margin: 0;
  font-size: 0.72rem;
  font-family: var(--font-sans);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-3);
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.7rem;
}

.chapter-card {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 1rem 1.05rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-1);
  transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease,
              transform var(--dur-fast) var(--ease);
}

.chapter-card:hover {
  border-color: var(--accent-line);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
  color: var(--text-1);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.3rem;
  height: 2.3rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--accent-soft);
  color: var(--accent);
}

.card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.card-name {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-heading);
}

.card-blurb {
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-count {
  flex-shrink: 0;
  align-self: center;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  border: 1px solid var(--border-soft);
  font-size: 0.7rem;
  color: var(--text-3);
  white-space: nowrap;
}

.card-count.soon {
  background: transparent;
  border-style: dashed;
  font-style: italic;
}

@media (max-width: 794px) {
  .hero { padding: 1.75rem 1.25rem 1.5rem; }
  .hero-title { font-size: 1.9rem; }
  .hero-stats { gap: 1.5rem; }
  .chapter-grid { grid-template-columns: 1fr; }
}
</style>
