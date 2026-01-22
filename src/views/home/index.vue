<template>
  <HeaderBar />

  <main id="home">
    <h2>Sommaire</h2>

    <ul class="toc">
      <li v-for="route in categories" :key="route.name">
        <RouterLink :to="route.path" class="title">
          {{ route.meta.title }}
        </RouterLink>
        <span class="dots"></span>
        <span class="page">{{ route.meta.page }}</span>
      </li>
    </ul>

  </main>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = router
  .getRoutes()
  .filter(r => r.meta?.page)
  .sort((a, b) => a.meta.page - b.meta.page)
</script>

<style scoped>
#home {
  padding: 1.5rem;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
}

/* Table of contents */
.toc {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.title {
  white-space: nowrap;
}

.dots {
  flex: 1;
  border-bottom: 1px dotted var(--clr-darkgrey);
  margin: 0 0.5rem;
  height: 0.6em;
}

.page {
  white-space: nowrap;
}
</style>
