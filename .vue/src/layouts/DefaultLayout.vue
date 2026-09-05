<template>
  <div class="page-sheet">
    <PageHeader v-if="title" :title="title" :subtitle="subtitle" />
    <slot />
    <LessonProgressToggle />
    <Footer />
  </div>
</template>

<script setup>
/**
 * Chapter-index and landing pages.
 *
 * Since the shell (sidebar + topbar + breadcrumb) moved to `App.vue`, this
 * layout only owns the reading sheet. It is kept as a distinct component
 * from `AltLayout` for backwards compatibility — the two now render the same
 * thing, and either is fine for new views.
 */
import { watchEffect } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import LessonProgressToggle from '@/components/LessonProgressToggle.vue'
import { setPageTitle } from '@/composables/usePageTitle'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})

/* Fallback for routes not yet listed in src/data/navigation.js. */
watchEffect(() => setPageTitle(props.title))
</script>
