<template>
  <DefaultLayout title="Dictée">
    <main class="placeholder">
      <div class="coming-soon">
        <span class="icon">⏳</span>
        <h2>Prochainement</h2>
        <p>Cette dictée est en cours de préparation pour votre apprentissage.</p>
        <RouterLink to="/dictees" class="back-link">← Retour aux dictées</RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}
.icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
.back-link { margin-top: 2rem; display: inline-block; color: #007bff; text-decoration: none; }
</style>