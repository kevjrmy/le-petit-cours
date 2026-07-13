<template>
  <AltLayout title="La nourriture et les repas">
    <main class="lesson">

      <!-- Contexte -->
      <article>
        <div class="rule">
          La <strong class="hl-blue">nourriture</strong> est un sujet universel et très apprécié en France. Les Français aiment parler de ce qu'ils mangent, des recettes et des repas en famille. Ce thème est idéal pour une conversation naturelle et conviviale.
        </div>
      </article>

      <!-- Vocabulaire essentiel -->
      <article>
        <h2>Vocabulaire essentiel</h2>
        <p class="method">Les mots clés pour parler de la nourriture et des repas.</p>

        <table>
          <caption class="sr-only">Vocabulaire sur la nourriture et les repas</caption>
          <thead>
            <tr>
              <th>Mot (FR)</th>
              <th>Definición en francés</th>
              <th>Traducción (ES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="vocab">un repas</td>
              <td>ce qu'on mange à une heure fixe (matin, midi, soir)</td>
              <td class="transl">una comida</td>
            </tr>
            <tr>
              <td class="vocab">le petit-déjeuner</td>
              <td>le repas du matin</td>
              <td class="transl">el desayuno</td>
            </tr>
            <tr>
              <td class="vocab">le déjeuner</td>
              <td>le repas du midi</td>
              <td class="transl">el almuerzo</td>
            </tr>
            <tr>
              <td class="vocab">le diner</td>
              <td>le repas du soir</td>
              <td class="transl">la cena</td>
            </tr>
            <tr>
              <td class="vocab">une recette</td>
              <td>la liste des ingrédients et les étapes pour préparer un plat</td>
              <td class="transl">una receta</td>
            </tr>
            <tr>
              <td class="vocab">cuisiner</td>
              <td>préparer les repas</td>
              <td class="transl">cocinar</td>
            </tr>
            <tr>
              <td class="vocab">avoir faim / soif</td>
              <td>ressentir le besoin de manger / de boire</td>
              <td class="transl">tener hambre / sed</td>
            </tr>
            <tr>
              <td class="vocab">savoureux / délicieux</td>
              <td>qui a très bon goût</td>
              <td class="transl">sabroso / delicioso</td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- Questions pour la conversation -->
      <article>
        <h2>Questions pour lancer la conversation</h2>
        <p class="method">
          Lisez chaque question à voix haute. Donnez votre vraie réponse en une ou deux phrases.
        </p>

        <ol class="question-list">
          <li class="question-item">
            Quel est votre plat préféré ? Vous pouvez le préparer vous-même ?
            <span class="hint">(¿Cuál es su plato favorito? ¿Lo puede preparar usted mismo?)</span>
          </li>
          <li class="question-item">
            Est-ce que vous aimez cuisiner ? Quel plat vous préparez souvent à la maison ?
            <span class="hint">(¿Le gusta cocinar? ¿Qué plato prepara seguido en casa?)</span>
          </li>
          <li class="question-item">
            Est-ce qu'il y a un aliment que vous n'aimez pas du tout ? Lequel ?
            <span class="hint">(¿Hay algún alimento que no le guste para nada? ¿Cuál?)</span>
          </li>
          <li class="question-item">
            En France, le repas du midi est souvent long. Comment est le déjeuner dans votre pays ?
            <span class="hint">(En Francia, el almuerzo suele ser largo. ¿Cómo es el almuerzo en su país?)</span>
          </li>
          <li class="question-item">
            Vous connaissez un plat français typique ? Est-ce que vous l'avez goûté ?
            <span class="hint">(¿Conoce algún plato francés típico? ¿Lo ha probado?)</span>
          </li>
        </ol>
      </article>

      <!-- Expressions utiles -->
      <article>
        <h2>Expressions utiles</h2>
        <p class="method">Utilisez ces expressions pour structurer vos réponses.</p>

        <div class="expr-list">
          <div class="example">
            <strong class="hl-blue">Mon plat préféré, c'est... parce que c'est très savoureux.</strong>
            <span class="note">(Mi plato favorito es... porque es muy sabroso.)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">J'adore cuisiner, surtout les plats de ma région.</strong>
            <span class="note">(Me encanta cocinar, especialmente los platos de mi región.)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">Je n'aime pas du tout... c'est trop... (sucré / salé / fort).</strong>
            <span class="note">(No me gusta para nada... es demasiado... (dulce / salado / picante).)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">En général, je mange... le matin / le midi / le soir.</strong>
            <span class="note">(Generalmente, como... por la mañana / al mediodía / por la noche.)</span>
          </div>
          <div class="example">
            <strong class="hl-blue">J'ai déjà goûté... et j'ai trouvé ca très bon / pas mal / trop fort.</strong>
            <span class="note">(Ya probé... y lo encontré muy bueno / no está mal / demasiado fuerte.)</span>
          </div>
        </div>
      </article>

      <button class="download-btn" @click="downloadPdf" aria-label="Télécharger cette fiche en PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v14m0 0-5-5m5 5 5-5"/>
          <path d="M3 20h18"/>
        </svg>
        <span>Télécharger</span>
      </button>

    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'

function downloadPdf() {
  window.print()
}
</script>

<style scoped>
.lesson { gap: 1rem; }

.hl-blue { color: var(--clr-blue); font-weight: 700; }

.note {
  color: var(--clr-ink-soft);
  font-size: 0.82em;
  font-style: italic;
  display: block;
  margin-top: 0.15rem;
}

.method {
  color: var(--clr-ink-mid);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.92rem;
}

caption.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

th {
  background: var(--clr-blue);
  color: var(--clr-page);
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid var(--clr-border-soft);
  color: var(--clr-ink);
  font-size: 0.9rem;
}

td.vocab {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--clr-blue);
  white-space: nowrap;
}

td.transl {
  color: var(--clr-ink-soft);
  font-style: italic;
}

tr:last-child td { border-bottom: none; }
tr:nth-child(even) td { background: var(--clr-blue-light); }

.question-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 1.25rem;
  margin: 0;
}

.question-item {
  font-family: var(--font-serif);
  font-size: 0.97rem;
  line-height: 1.65;
  color: var(--clr-ink);
}

.hint {
  display: block;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--clr-ink-soft);
  margin-top: 0.1rem;
}

.expr-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.download-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem auto 0;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: border-color 0.15s, color 0.15s;
}

.download-btn:hover { border-color: var(--clr-blue); color: var(--clr-blue); }

@media print { .download-btn { display: none !important; } }
</style>
