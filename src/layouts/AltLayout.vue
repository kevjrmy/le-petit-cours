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
 * Lesson pages. Identical to `DefaultLayout` since the shell moved to
 * `App.vue` — both are kept so the ~70 existing views compile untouched.
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

watchEffect(() => setPageTitle(props.title))
</script>
