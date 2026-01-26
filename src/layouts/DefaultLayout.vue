<template>
  <HeaderBar />
  <slot />
  <Footer />
  <BookNavigator />
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import Footer from '@/components/Footer.vue'
import BookNavigator from '@/components/BookNavigator.vue'

defineProps({
  title: String // Optionnel si tu l'utilises dans le HeaderBar
})
</script>

<style scoped>
:deep(main) {
  flex: 1;
  width: 100%;
}
</style>