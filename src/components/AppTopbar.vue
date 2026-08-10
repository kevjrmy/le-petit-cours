<template>
  <header class="app-topbar">
    <button
      class="icon-btn bar-toggle"
      type="button"
      @click="toggle"
      aria-controls="app-sidebar"
      :aria-expanded="isMobile ? drawerOpen : !isRail"
      aria-label="Afficher ou masquer le menu"
    >
      <IconMenu class="glyph" />
    </button>

    <button
      v-if="canGoBack"
      class="icon-btn bar-back"
      type="button"
      @click="goBack"
      aria-label="Retour"
    >
      <IconBack class="glyph" />
    </button>

    <nav class="crumbs" aria-label="Fil d'Ariane">
      <RouterLink to="/" class="crumb crumb-home">Sommaire</RouterLink>
      <template v-for="crumb in crumbs" :key="crumb.to">
        <span class="crumb-sep" aria-hidden="true">/</span>
        <RouterLink
          :to="crumb.to"
          class="crumb"
          :aria-current="crumb.to === route.path ? 'page' : undefined"
        >{{ crumb.label }}</RouterLink>
      </template>
    </nav>

    <div class="bar-actions">
      <ThemeToggle compact />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useSidebar } from '@/composables/useSidebar'
import { usePageTitle } from '@/composables/usePageTitle'
import IconMenu from '~icons/mdi/menu'
import IconBack from '~icons/mdi/arrow-left'

const route = useRoute()
const router = useRouter()
const { toggle, isRail, isMobile, drawerOpen } = useSidebar()
const { crumbs } = usePageTitle()

const canGoBack = computed(() => route.path !== '/')

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<style scoped>
.app-topbar {
  position: sticky;
  top: 0;
  z-index: var(--z-bar);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: var(--topbar-h);
  padding: 0 0.75rem;
  background: var(--surface-bar);
  backdrop-filter: blur(12px) saturate(160%);
  border-bottom: 1px solid var(--border-soft);
}

.glyph { width: 1.15rem; height: 1.15rem; }

.bar-back { margin-right: 0.25rem; }

/* ── Breadcrumb ─────────────────────────────────── */
.crumbs {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.85rem;
}

.crumb {
  color: var(--text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: var(--radius-sm);
}

.crumb:hover { color: var(--accent); }

.crumb[aria-current="page"] {
  color: var(--text-1);
  font-weight: 600;
  flex-shrink: 1;
}

.crumb-sep {
  color: var(--border-strong);
  flex-shrink: 0;
}

/* The sidebar already carries the theme control; the topbar only needs it
   while the sidebar is off-canvas. */
.bar-actions {
  display: none;
  align-items: center;
  gap: 0.15rem;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .bar-actions { display: flex; }
}

@media (max-width: 640px) {
  /* Only the current page survives on a phone — the trail wraps otherwise. */
  .crumb-home,
  .crumbs .crumb-sep:first-of-type { display: none; }
  .crumbs .crumb-sep { display: none; }
  .crumbs .crumb:not([aria-current="page"]) { display: none; }
}
</style>
