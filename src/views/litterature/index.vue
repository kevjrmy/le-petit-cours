<template>
  <AltLayout title="Littérature">
    <main>
      <p class="intro">
        Découvrez les grands classiques de la littérature française :
        romans, théâtre, poésie et essais à lire au moins une fois.
      </p>

      <nav class="lesson-nav" aria-label="Pages disponibles">
        <RouterLink to="/litterature/introduction" class="lesson-row">
          <span class="lesson-title">📚 Introduction — 25 classiques</span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
</script>

<style scoped>
.intro {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  font-size: 1rem;
  line-height: 1.75;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

.lesson-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.lesson-row:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue-dark);
  background: var(--clr-blue-light);
}

.lesson-title {
  font-family: var(--font-serif);
  font-size: 0.97rem;
}

.arrow {
  color: var(--clr-ink-soft);
  font-size: 0.9rem;
  transition: transform 0.15s, color 0.15s;
}

.lesson-row:hover .arrow {
  transform: translateX(3px);
  color: var(--clr-blue);
}
</style>
