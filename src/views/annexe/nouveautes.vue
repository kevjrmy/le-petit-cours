<!-- view-meta: created=2026-08-31; updated=2026-08-31 -->
<template>
  <DefaultLayout
    title="Nouveautés"
    subtitle="Tout ce qui est arrivé dans le livre cette semaine."
  >
    <main class="nouveautes">

      <p class="window">
        Les pages ajoutées depuis le <strong>{{ formatDate(cutoff) }}</strong>.
        Une page quitte cette liste toute seule au bout de {{ FRESH_DAYS }} jours&nbsp;:
        il n'y a rien à cocher ni à ranger.
      </p>

      <!-- Trois états, pas deux : pendant le chargement la liste est vide sans
           que la semaine le soit, et une branche v-else afficherait « 0 page
           ajoutée » le temps que les fichiers soient lus. On n'affiche donc
           rien tant qu'on ne sait pas. -->
      <p v-if="loading" class="count" aria-live="polite">Chargement…</p>

      <!-- ── Une semaine sans nouveauté est une réponse ── -->
      <p v-else-if="!groups.length" class="empty">
        Rien de neuf cette semaine. Les six dernières pages ajoutées, elles, restent
        sur <RouterLink class="lesson-link" to="/">la page d'accueil</RouterLink>.
      </p>

      <template v-else>
        <p class="count">
          <strong>{{ total }}</strong> page{{ total === 1 ? '' : 's' }}
          ajoutée{{ total === 1 ? '' : 's' }}
        </p>

        <section v-for="group in groups" :key="group.created" class="day">
          <h2 class="day-title">
            <time :datetime="group.created">{{ formatDate(group.created) }}</time>
            <span class="day-count">{{ group.rows.length }}</span>
          </h2>

          <ul class="rows">
            <li v-for="row in group.rows" :key="row.path">
              <RouterLink class="row" :to="row.path">
                <span class="row-icon" aria-hidden="true">
                  <ChapterIcon :name="row.icon" size="1rem" />
                </span>
                <span class="row-body">
                  <span class="row-chapter">{{ row.chapter }}</span>
                  <span class="row-name">{{ row.title }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>
        </section>
      </template>

    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ChapterIcon from '@/components/ChapterIcon.vue'
import { chapters, publishedLessons } from '@/data/navigation'
import { viewsSince, FRESH_DAYS } from '@/utils/viewMeta'

/* Aplati dans l'ordre du manifeste, comme le sommaire : deux pages arrivées le
   même jour se lisent alors dans l'ordre du livre et non par ordre alphabétique. */
const allLessons = chapters.flatMap(chapter =>
  publishedLessons(chapter).map(lesson => ({
    path: lesson.path,
    title: lesson.title,
    chapter: chapter.shortTitle ?? chapter.title,
    icon: chapter.icon,
  })),
)

const rows    = ref([])
const loading = ref(true)

/* Regroupé par jour, l'ordre venant de `viewsSince` : les entrées sont déjà
   triées, donc parcourir en séquence suffit et le tri n'est pas refait ici —
   c'est ce qui garantit que cette page et le sommaire s'accordent. */
const groups = computed(() => {
  const out = []
  for (const row of rows.value) {
    const last = out[out.length - 1]
    if (last && last.created === row.created) last.rows.push(row)
    else out.push({ created: row.created, rows: [row] })
  }
  return out
})

const total = computed(() => rows.value.length)

/* La date affichée est calculée comme la coupure de `viewsSince` : si l'une
   change, l'autre suit, et la phrase en haut de page ne peut pas mentir. */
const cutoff = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() - FRESH_DAYS)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
})

/* Les dates sont des jours ISO nus. Les lire ET les formater en UTC évite que
   « 2026-08-26 » s'affiche le 25 pour un lecteur à l'ouest de Greenwich. */
const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
})

function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return dateFormat.format(new Date(Date.UTC(year, month - 1, day)))
}

onMounted(async () => {
  const byPath = new Map(allLessons.map(lesson => [lesson.path, lesson]))
  const found = await viewsSince(allLessons.map(lesson => lesson.path))
  rows.value = found.map(row => ({ ...byPath.get(row.path), ...row }))
  loading.value = false
})
</script>

<style scoped>
.nouveautes {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.window,
.empty {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text-2);
}

.empty {
  padding: 1.5rem;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  text-align: center;
}

.count {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--text-3);
}

.count strong { color: var(--accent); font-size: 1rem; }

/* ── Un jour ──────────────────────────────────── */
.day {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  margin-top: 0;
  border: none;
  background: none;
}

.day-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
}

.day-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.3rem;
  height: 1.3rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  background: var(--accent-subtle);
  color: var(--accent-text);
  font-size: 0.68rem;
  letter-spacing: 0;
}

.rows {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.row {
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

.row:hover {
  border-color: var(--accent-line);
  background: var(--accent-subtle);
  color: var(--text-1);
}

.row-icon { display: flex; flex-shrink: 0; color: var(--accent); }

.row-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.row-chapter {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
}

.row-name {
  font-family: var(--font-serif);
  font-size: 0.92rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

@media (max-width: 40rem) {
  .rows { grid-template-columns: 1fr; }
}
</style>
