<!-- view-meta: created=2026-08-02; updated=2026-08-26 -->
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
      </section>

      <!-- ── Recently added ────────────────────────── -->
      <section v-if="recent.length" class="recent" aria-labelledby="recent-title">
        <div class="recent-head">
          <h2 id="recent-title" class="grid-title">Récemment ajouté</h2>
          <RouterLink class="recent-more" to="/nouveautes">
            Voir tout <span aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <ul class="recent-list">
          <li v-for="item in recent" :key="item.path">
            <RouterLink class="recent-row" :to="item.path">
              <span class="recent-icon" aria-hidden="true">
                <ChapterIcon :name="item.icon" size="1rem" />
              </span>

              <span class="recent-body">
                <span class="recent-chapter">{{ item.chapter }}</span>
                <span class="recent-name">{{ item.title }}</span>
              </span>

              <time class="recent-date" :datetime="item.created">{{ formatDate(item.created) }}</time>
            </RouterLink>
          </li>
        </ul>
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
            <span class="card-name">{{ chapter.title }}</span>
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
import { recentViews } from '@/utils/viewMeta'

/* Chapters come from the manifest. A chapter whose lessons are all still
   announced-but-unwritten stays listed, marked "Bientôt", so the plan for the
   book is visible rather than silently hidden. */
const cards = chapters
  .filter(chapter => chapter.lessons.length > 0)
  .map(chapter => ({ ...chapter, ...chapterCount(chapter) }))

/* Flattened in manifest order, so same-day ties in "Récemment ajouté" fall in
   the book's own order rather than alphabetically. */
const allLessons = chapters.flatMap(chapter =>
  publishedLessons(chapter).map(lesson => ({
    path: lesson.path,
    title: lesson.title,
    chapter: chapter.shortTitle ?? chapter.title,
    icon: chapter.icon,
  }))
)

const recent = ref([])

/* Dates are stored as plain ISO days. Parsing them as UTC and formatting in UTC
   keeps « 2026-08-26 » from rendering as the 25th for anyone west of Greenwich. */
const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
})

function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return dateFormat.format(new Date(Date.UTC(year, month - 1, day)))
}

onMounted(async () => {
  const byPath = new Map(allLessons.map(lesson => [lesson.path, lesson]))
  const rows = await recentViews(allLessons.map(lesson => lesson.path), 6)
  recent.value = rows.map(row => ({ ...byPath.get(row.path), ...row }))
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
  margin-top: 0.9rem;
  border-radius: var(--radius-pill);
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--border-soft);
}

.band { flex: 1; }
.band-blue  { background: var(--blue-700); }
.band-white { background: var(--white); box-shadow: inset 0 0 0 1px var(--border-soft); }
.band-red   { background: var(--red-500); }

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

/* ── Recently added ─────────────────────────────── */
/* Le titre garde sa place ; le lien va au bout de la même ligne. La section
   affiche les six dernières quoi qu'il arrive, « Voir tout » ouvre la semaine
   entière — deux découpes différentes de la même liste, pas deux listes. */
.recent-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.recent-more {
  flex-shrink: 0;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--accent);
  white-space: nowrap;
}

.recent-more:hover { color: var(--accent-hover); text-decoration: underline; }

.recent {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.recent-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.recent-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  height: 100%;
  padding: 0.6rem 0.8rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-1);
  transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.recent-row:hover {
  border-color: var(--accent-line);
  background: var(--accent-subtle);
  color: var(--text-1);
}

.recent-icon {
  display: flex;
  flex-shrink: 0;
  color: var(--accent);
}

.recent-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.recent-chapter {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
}

.recent-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-family: var(--font-serif);
  font-size: 0.92rem;
  line-height: 1.3;
  color: var(--text-heading);
}

.recent-date {
  flex-shrink: 0;
  font-size: 0.7rem;
  color: var(--text-3);
  white-space: nowrap;
}

@media (max-width: 560px) {
  .recent-list { grid-template-columns: 1fr; }
  .recent-date { display: none; }
}

@media (max-width: 52rem) {
  .hero { padding: 1.75rem 1.25rem 1.5rem; }
  .hero-title { font-size: 1.9rem; }
  .chapter-grid { grid-template-columns: 1fr; }
}
</style>
