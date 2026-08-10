<!-- view-meta: created=2026-08-02; updated=2026-08-10 -->
<template>
  <DefaultLayout title="Contact">
    <main class="static-page">
      <section>
        <h2>Une question, une suggestion&nbsp;?</h2>
        <p>
          <strong>Le Petit Cours</strong> est écrit à la main, leçon après leçon.
          Si vous repérez une faute, si une explication n'est pas claire ou si vous
          voulez proposer un thème, écrivez-moi&nbsp;: ça m'aide beaucoup.
        </p>

        <a class="btn-cta contact-link" href="mailto:kevin.jgnetworks@gmail.com">
          Écrire un message
        </a>
      </section>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.static-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

h2 {
  color: var(--text-heading);
  margin-bottom: 0.75rem;
}

.contact-link {
  margin-top: 1.25rem;
  text-decoration: none;
}
</style>
