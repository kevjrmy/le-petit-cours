<template>
  <Back :title="title" />
  <slot />
  <Footer />
  <BookNavigator />
</template>

<script setup>
import Back from '@/components/Back.vue'
import Footer from '@/components/Footer.vue'
import BookNavigator from '@/components/BookNavigator.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>