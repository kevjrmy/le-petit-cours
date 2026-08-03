<template>
  <header class="back-header">
    <button @click="goBack" class="back-btn" aria-label="Retour">
      <IconBack height="1.8rem" width="1.8rem" />
    </button>

    <h1 v-if="title" class="page-title">{{ title }}</h1>

    <RouterLink to="/" class="home-btn" aria-label="Accueil">
      <IconHome height="1.5rem" width="1.5rem" />
    </RouterLink>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IconBack from '~icons/mdi/keyboard-backspace'
import IconHome from '~icons/mdi/home'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.back-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  border-bottom: 3px solid var(--clr-blue);
}

.back-btn,
.home-btn {
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1.5px solid var(--clr-border);
  color: var(--clr-blue);
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.back-btn:hover {
  background: var(--clr-blue-light);
  border-color: var(--clr-blue);
  transform: translateX(-2px);
}

.home-btn:hover {
  background: var(--clr-blue-light);
  border-color: var(--clr-blue);
  transform: scale(1.05);
}

.back-btn:focus-visible,
.home-btn:focus-visible {
  outline: 2px solid var(--clr-blue);
  outline-offset: 3px;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--clr-blue-dark);
  margin: 0;
  text-align: center;
  flex: 1;
}
</style>