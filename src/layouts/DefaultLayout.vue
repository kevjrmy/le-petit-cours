<template>
    <HeaderBar />
    <h1 v-if="title">{{ title }}</h1>
    <slot />
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>