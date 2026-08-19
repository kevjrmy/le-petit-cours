<template>
  <Transition name="scrim">
    <div
      v-if="drawerOpen"
      class="app-scrim"
      @click="closeDrawer"
      aria-hidden="true"
    ></div>
  </Transition>

  <aside
    id="app-sidebar"
    class="app-sidebar"
    :class="{ rail: isRail, open: drawerOpen }"
    aria-label="Navigation du cours"
  >
    <!-- ── Brand row ─────────────────────────────── -->
    <div class="side-head">
      <RouterLink to="/" class="brand" @click="closeDrawer">
        <img src="/logo.svg" alt="" class="brand-mark" aria-hidden="true" />
        <span v-if="!isRail" class="brand-lines">
          <span class="brand-text">Le Petit Cours</span>
          <span class="brand-by">par Kevin Jeremy</span>
        </span>
      </RouterLink>

      <button
        v-if="!isRail"
        class="icon-btn head-toggle"
        type="button"
        @click="toggle"
        :aria-label="drawerOpen ? 'Fermer le menu' : 'Réduire le menu'"
      >
        <IconCollapse class="glyph" />
      </button>
    </div>

    <!-- ── Filter ────────────────────────────────── -->
    <div v-if="!isRail" class="side-search">
      <IconSearch class="search-glyph" aria-hidden="true" />
      <input
        v-model="query"
        type="search"
        class="search-input"
        placeholder="Rechercher une leçon…"
        aria-label="Rechercher une leçon"
      />
    </div>

    <button
      v-else
      class="icon-btn rail-expand"
      type="button"
      @click="toggle"
      aria-label="Déplier le menu"
      title="Déplier le menu"
    >
      <IconExpand class="glyph" />
    </button>

    <!-- ── Nav tree ──────────────────────────────── -->
    <nav class="side-nav">
      <RouterLink
        to="/"
        class="nav-item"
        :class="{ active: route.path === '/' }"
        :title="isRail ? 'Accueil' : null"
        @click="closeDrawer"
      >
        <ChapterIcon name="home" class="nav-glyph" />
        <span v-if="!isRail" class="nav-label">Accueil</span>
      </RouterLink>

      <p v-if="!isRail" class="nav-section">Le livre</p>

      <div
        v-for="chapter in visibleChapters"
        :key="chapter.slug"
        class="nav-group"
      >
        <div class="nav-row" :class="{ current: chapter.slug === activeSlug }">
          <RouterLink
            :to="chapter.path"
            class="nav-item"
            :title="isRail ? chapter.title : null"
            @click="closeDrawer"
          >
            <ChapterIcon :name="chapter.icon" class="nav-glyph" />
            <span v-if="!isRail" class="nav-label">
              {{ chapter.shortTitle ?? chapter.title }}
            </span>
            <span
              v-if="isRail && freshChapters.has(chapter.slug)"
              class="rail-dot"
              aria-hidden="true"
            ></span>
            <span v-if="!isRail && chapter.published.length" class="nav-count">
              {{ chapter.published.length }}
            </span>
          </RouterLink>

          <button
            v-if="!isRail"
            class="nav-chevron"
            type="button"
            :aria-expanded="isExpanded(chapter.slug)"
            :aria-label="`${isExpanded(chapter.slug) ? 'Replier' : 'Déplier'} ${chapter.title}`"
            @click="toggleChapter(chapter.slug)"
          >
            <IconChevron class="glyph" :class="{ turned: isExpanded(chapter.slug) }" />
          </button>
        </div>

        <ul
          v-if="!isRail && isExpanded(chapter.slug)"
          class="nav-children"
          role="list"
        >
          <li v-for="lesson in chapter.published" :key="lesson.path">
            <RouterLink
              :to="lesson.path"
              class="nav-child"
              :class="{ active: route.path === lesson.path }"
              @click="closeDrawer"
            >
              <span class="child-label">{{ lesson.title }}</span>
              <span v-if="freshLessons.has(lesson.path)" class="child-dot" aria-hidden="true"></span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <p v-if="!isRail && !visibleChapters.length" class="nav-empty">
        Aucune leçon ne correspond à « {{ query }} ».
      </p>
    </nav>

    <!-- ── Footer ────────────────────────────────── -->
    <div class="side-foot">
      <RouterLink
        v-for="link in annexes"
        :key="link.path"
        :to="link.path"
        class="nav-item"
        :title="isRail ? link.title : null"
        @click="closeDrawer"
      >
        <ChapterIcon :name="link.icon" class="nav-glyph" />
        <span v-if="!isRail" class="nav-label">{{ link.title }}</span>
      </RouterLink>

      <ThemeToggle :compact="isRail" />
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChapterIcon from '@/components/ChapterIcon.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useSidebar } from '@/composables/useSidebar'
import { annexes, chapters, publishedLessons } from '@/data/navigation'
import { isNewView } from '@/utils/viewMeta'
import IconChevron from '~icons/mdi/chevron-right'
import IconCollapse from '~icons/mdi/dock-left'
import IconExpand from '~icons/mdi/dock-right'
import IconSearch from '~icons/mdi/magnify'

const route = useRoute()
const {
  drawerOpen, isRail, toggle, closeDrawer,
  isExpanded, toggleChapter, expandChapter,
} = useSidebar()

const query = ref('')

/* Lessons updated today, so the sidebar can mark them with a red dot. */
const freshLessons = ref(new Set())
const freshChapters = computed(() => {
  const slugs = new Set()
  for (const chapter of chapters) {
    if (chapter.lessons.some(lesson => freshLessons.value.has(lesson.path))) {
      slugs.add(chapter.slug)
    }
  }
  return slugs
})

/* Chapter owning the current route — used for highlighting and auto-expand. */
const activeSlug = computed(() => route.path.split('/').filter(Boolean)[0] ?? null)

function matches(text, needle) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .includes(needle)
}

/**
 * The filter keeps a chapter when its own title matches (all lessons shown) or
 * when some lesson matches (only those lessons shown).
 */
const visibleChapters = computed(() => {
  const needle = query.value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

  return chapters
    .map(chapter => {
      const published = publishedLessons(chapter)
      if (!needle) return { ...chapter, published }

      if (matches(chapter.title, needle)) return { ...chapter, published }

      const hits = published.filter(lesson => matches(lesson.title, needle))
      return hits.length ? { ...chapter, published: hits } : null
    })
    .filter(Boolean)
})

/* Typing in the filter opens every match; clearing it restores manual state. */
watch(query, value => {
  if (!value.trim()) return
  visibleChapters.value.forEach(chapter => expandChapter(chapter.slug))
})

/* Always reveal the chapter you are currently reading. */
watch(activeSlug, slug => expandChapter(slug), { immediate: true })

onMounted(async () => {
  const all = chapters.flatMap(publishedLessons)
  const entries = await Promise.all(
    all.map(async lesson => [lesson.path, await isNewView(lesson.path)])
  )
  freshLessons.value = new Set(entries.filter(([, fresh]) => fresh).map(([path]) => path))
})
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  inset-block: 0;
  left: 0;
  z-index: var(--z-drawer);
  width: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0.6rem 0.6rem;
  background: var(--surface-sidebar);
  border-right: 1px solid var(--border-soft);
  transition: width var(--dur) var(--ease), transform var(--dur) var(--ease);
}

.app-sidebar.rail {
  width: var(--sidebar-w-collapsed);
  padding-inline: 0.4rem;
  align-items: center;
}

/* ── Brand ──────────────────────────────────────── */
.side-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.15rem 0.25rem 0.5rem;
}

.rail .side-head {
  padding: 0.15rem 0 0.4rem;
  justify-content: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
  flex: 1;
  border-radius: var(--radius-sm);
  color: var(--text-1);
}

/* `flex: 0` would give the brand a 0 basis and squash the logo. */
.rail .brand { flex: 0 0 auto; }

.brand-mark {
  width: 1.9rem;
  height: 1.9rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--white);
  padding: 2px;
  box-shadow: var(--shadow-sm);
}

.brand-lines {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.2;
}

.brand-text {
  font-family: var(--font-serif);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Byline — who writes the book. Hidden with the rest of the brand text in
   rail mode, where only the logo remains. */
.brand-by {
  font-family: var(--font-sans);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.head-toggle { width: 2rem; height: 2rem; }

.rail-expand {
  width: 2.25rem;
  height: 2.25rem;
  margin-bottom: 0.25rem;
}

.glyph { width: 1.05rem; height: 1.05rem; }

/* ── Search ─────────────────────────────────────── */
.side-search {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.35rem;
}

.search-glyph {
  position: absolute;
  left: 0.6rem;
  width: 0.95rem;
  height: 0.95rem;
  color: var(--text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.45rem 0.6rem 0.45rem 2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-1);
  color: var(--text-1);
  font-size: 0.84rem;
}

.search-input::placeholder { color: var(--text-3); }

.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.search-input::-webkit-search-cancel-button { cursor: pointer; }

/* ── Nav ────────────────────────────────────────── */
.side-nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border-strong) transparent;
}

.rail .side-nav { align-items: center; width: 100%; }

.nav-section {
  margin: 0.85rem 0 0.3rem;
  padding-inline: 0.65rem;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--text-3);
}

.nav-group { display: contents; }

.nav-row {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  border-radius: var(--radius-sm);
}

.nav-item {
  /* `.side-nav` is a column flex box, so a growing item would stretch
     vertically. Only inside `.nav-row` (a row) should it fill the width. */
  flex: 0 0 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius-sm);
  color: var(--text-2);
  font-size: 0.87rem;
  font-weight: 500;
  transition: background var(--dur-fast) ease, color var(--dur-fast) ease;
}

.nav-row > .nav-item { flex: 1 1 auto; }

.rail .nav-item {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  justify-content: center;
  margin-bottom: 0.1rem;
}

.nav-item:hover {
  background: var(--surface-3);
  color: var(--text-1);
}

/* Active chapter / page — blue tint + flag-blue rail on the left. */
.nav-item.router-link-exact-active,
.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent-text);
  font-weight: 600;
}

.nav-row.current > .nav-item:not(.router-link-exact-active) {
  color: var(--text-1);
}

.nav-glyph { flex-shrink: 0; }

.nav-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-count {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-3);
}

.rail-dot {
  position: absolute;
  top: 0.35rem;
  right: 0.35rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red-500);
}

.nav-chevron {
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  color: var(--text-3);
}

.nav-chevron:hover { background: var(--surface-3); color: var(--text-1); }

.nav-chevron .glyph {
  width: 0.9rem;
  height: 0.9rem;
  transition: transform var(--dur-fast) var(--ease);
}

.nav-chevron .glyph.turned { transform: rotate(90deg); }

/* ── Lesson list ────────────────────────────────── */
.nav-children {
  margin: 0.1rem 0 0.35rem 1.35rem;
  padding-left: 0.5rem;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.nav-child {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.34rem 0.55rem;
  border-radius: var(--radius-sm);
  color: var(--text-3);
  font-size: 0.82rem;
  line-height: 1.4;
}

.nav-child:hover { background: var(--surface-3); color: var(--text-1); }

.nav-child.router-link-exact-active,
.nav-child.active {
  background: var(--accent-soft);
  color: var(--accent-text);
  font-weight: 600;
}

.child-label {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.child-dot {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--red-500);
}

.nav-empty {
  padding: 0.75rem 0.65rem;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-3);
}

/* ── Footer ─────────────────────────────────────── */
.side-foot {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

.rail .side-foot { align-items: center; width: 100%; }

/* ── Mobile drawer ──────────────────────────────── */
.app-scrim {
  position: fixed;
  inset: 0;
  z-index: var(--z-scrim);
  background: var(--surface-overlay);
  backdrop-filter: blur(2px);
}

.scrim-enter-active,
.scrim-leave-active { transition: opacity var(--dur) ease; }
.scrim-enter-from,
.scrim-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .app-sidebar {
    width: min(300px, 86vw);
    transform: translateX(-100%);
    box-shadow: var(--shadow-lg);
  }

  .app-sidebar.open { transform: translateX(0); }
}
</style>
