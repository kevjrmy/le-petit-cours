<!-- view-meta: created=2026-08-02; updated=2026-08-02 -->
<template>
  <AltLayout title="Littérature — 25 classiques">
    <main class="lesson">

      <!-- ── Intro ─────────────────────────────────── -->
      <article>
        <p class="intro">
          Voici <strong class="hl-blue">25 œuvres incontournables</strong> de la
          littérature française, du XVI<sup>e</sup> au XX<sup>e</sup> siècle :
          romans, théâtre, poésie et essais. De courts résumés
          <strong class="hl-red">sans spoiler</strong> pour vous donner envie de lire.
        </p>
        <p class="intro-hint">
          <em>(25 obras imprescindibles de la literatura francesa, con breves resúmenes sin spoilers.)</em>
        </p>
      </article>

      <!-- ── Liste ─────────────────────────────────── -->
      <ol class="book-list">
        <li
          v-for="(b, i) in books"
          :key="b.title"
          class="book"
        >
          <div class="book-num" aria-hidden="true">{{ i + 1 }}</div>
          <div class="book-body">
            <h2 class="book-title">
              <em>{{ b.title }}</em>
            </h2>
            <p class="book-meta">{{ b.author }} · {{ b.year }} · {{ b.genre }}</p>
            <p class="book-summary">{{ b.summary }}</p>
          </div>
        </li>
      </ol>

    </main>
  </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'

const books = [
  {
    title: 'Le Comte de Monte-Cristo',
    author: 'Alexandre Dumas',
    year: 1844,
    genre: "roman d'aventure",
    summary: "Un jeune marin, victime d'une trahison, est emprisonné injustement. Une grande histoire de vengeance, d'évasion et de justice — un roman impossible à lâcher.",
  },
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: 1862,
    genre: 'roman',
    summary: "Dans la France du XIXᵉ siècle, un ancien prisonnier cherche à se racheter, poursuivi sans relâche par un policier obstiné. Une fresque sociale sur la misère et l'espoir.",
  },
  {
    title: 'Les Trois Mousquetaires',
    author: 'Alexandre Dumas',
    year: 1844,
    genre: "roman de cape et d'épée",
    summary: "Le jeune d'Artagnan monte à Paris pour devenir mousquetaire du roi. Amitié, duels et intrigues de cour. « Un pour tous, tous pour un ! »",
  },
  {
    title: 'Notre-Dame de Paris',
    author: 'Victor Hugo',
    year: 1831,
    genre: 'roman historique',
    summary: "Autour de la célèbre cathédrale se croisent les destins de la belle Esmeralda et de Quasimodo, le sonneur de cloches. Le Paris médiéval prend vie.",
  },
  {
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    year: 1857,
    genre: 'roman réaliste',
    summary: "Emma, mariée à un médecin de province, rêve d'une vie plus passionnante que son quotidien. Un chef-d'œuvre du réalisme.",
  },
  {
    title: 'Le Rouge et le Noir',
    author: 'Stendhal',
    year: 1830,
    genre: 'roman',
    summary: "Julien Sorel, jeune homme ambitieux d'origine modeste, veut s'élever dans la société. Le portrait d'une époque et d'une ambition dévorante.",
  },
  {
    title: 'Le Père Goriot',
    author: 'Honoré de Balzac',
    year: 1835,
    genre: 'roman',
    summary: "Dans une pension parisienne, un vieil homme se sacrifie pour ses filles tandis qu'un jeune étudiant découvre les règles cruelles de la société.",
  },
  {
    title: 'Germinal',
    author: 'Émile Zola',
    year: 1885,
    genre: 'roman naturaliste',
    summary: "La vie dure des mineurs de charbon dans le nord de la France. Un roman puissant sur le travail, la pauvreté et la révolte ouvrière.",
  },
  {
    title: 'Bel-Ami',
    author: 'Guy de Maupassant',
    year: 1885,
    genre: 'roman',
    summary: "Un jeune homme séduisant utilise son charme pour réussir dans le journalisme et la haute société parisienne. Une satire de l'arrivisme.",
  },
  {
    title: 'La Princesse de Clèves',
    author: 'Madame de La Fayette',
    year: 1678,
    genre: 'roman',
    summary: "À la cour du roi Henri II, une jeune femme mariée éprouve des sentiments interdits. Considéré comme l'un des premiers grands romans français.",
  },
  {
    title: "L'Étranger",
    author: 'Albert Camus',
    year: 1942,
    genre: 'roman',
    summary: "Meursault, un homme étrangement indifférent, raconte sa vie à Alger. Un roman célèbre sur l'absurde et la condition humaine.",
  },
  {
    title: 'La Peste',
    author: 'Albert Camus',
    year: 1947,
    genre: 'roman',
    summary: "Une ville d'Algérie est frappée par une épidémie. Les habitants y font face, chacun à sa manière. Une réflexion sur la solidarité face au malheur.",
  },
  {
    title: 'Du côté de chez Swann',
    author: 'Marcel Proust',
    year: 1913,
    genre: 'roman',
    summary: "Le narrateur se souvient de son enfance et explore la mémoire et le temps. Le début de l'immense « À la recherche du temps perdu ».",
  },
  {
    title: 'Candide',
    author: 'Voltaire',
    year: 1759,
    genre: 'conte philosophique',
    summary: "Le naïf Candide voyage à travers le monde et découvre que tout ne va pas « pour le mieux ». Un conte court, drôle et plein d'ironie.",
  },
  {
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    genre: 'conte',
    summary: "Un aviateur tombé en panne dans le désert rencontre un petit prince venu d'une autre planète. Un conte poétique pour les petits et les grands.",
  },
  {
    title: 'Les Liaisons dangereuses',
    author: 'Choderlos de Laclos',
    year: 1782,
    genre: 'roman épistolaire',
    summary: "Deux nobles manipulateurs jouent avec les sentiments des autres, à travers un échange de lettres. Un roman brillant et cruel du XVIIIᵉ siècle.",
  },
  {
    title: 'Voyage au centre de la Terre',
    author: 'Jules Verne',
    year: 1864,
    genre: "roman d'aventure",
    summary: "Un professeur et son neveu descendent dans un volcan pour explorer les profondeurs de la Terre. Une grande aventure scientifique et imaginaire.",
  },
  {
    title: 'Cyrano de Bergerac',
    author: 'Edmond Rostand',
    year: 1897,
    genre: 'théâtre',
    summary: "Cyrano, poète au grand nez et à l'esprit brillant, aime en secret la belle Roxane. Une pièce drôle, émouvante et pleine de panache.",
  },
  {
    title: 'Le Tartuffe',
    author: 'Molière',
    year: 1664,
    genre: 'comédie',
    summary: "Un faux dévot s'introduit dans une famille pour la tromper. Une comédie satirique sur l'hypocrisie, encore très actuelle.",
  },
  {
    title: 'Phèdre',
    author: 'Jean Racine',
    year: 1677,
    genre: 'tragédie',
    summary: "Phèdre est dévorée par une passion interdite. Une tragédie classique en vers sur le destin, le désir et la culpabilité.",
  },
  {
    title: 'Les Fables',
    author: 'Jean de La Fontaine',
    year: '1668–1694',
    genre: 'poésie',
    summary: "De courtes histoires d'animaux qui cachent une leçon de morale : « La Cigale et la Fourmi », « Le Corbeau et le Renard »…",
  },
  {
    title: 'Les Fleurs du mal',
    author: 'Charles Baudelaire',
    year: 1857,
    genre: 'poésie',
    summary: "Un recueil de poèmes sur la beauté, l'amour, l'ennui et la modernité. Une œuvre majeure et révolutionnaire de la poésie française.",
  },
  {
    title: 'Les Essais',
    author: 'Michel de Montaigne',
    year: 1580,
    genre: 'essai',
    summary: "Montaigne réfléchit librement sur lui-même et sur la condition humaine. Le livre qui a inventé le genre de l'essai.",
  },
  {
    title: 'Le Deuxième Sexe',
    author: 'Simone de Beauvoir',
    year: 1949,
    genre: 'essai',
    summary: "Un essai fondateur sur la condition des femmes dans la société. « On ne naît pas femme : on le devient. »",
  },
  {
    title: 'Gargantua',
    author: 'François Rabelais',
    year: 1534,
    genre: 'roman',
    summary: "Les aventures comiques d'un géant, mêlant humour, satire et savoir. Un classique joyeux et inventif de la Renaissance.",
  },
]
</script>

<style scoped>
.lesson {
  gap: 1rem;
}

/* ── Inline helpers ────────────────────────────── */
.hl-blue { color: var(--clr-blue); font-weight: 700; }
.hl-red  { color: var(--clr-red);  font-weight: 700; }

/* ── Intro ─────────────────────────────────────── */
.intro {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--clr-ink);
  margin: 0;
}

.intro-hint {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--clr-ink-soft);
  margin: 0.35rem 0 0;
}

/* ── Book list ─────────────────────────────────── */
.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  counter-reset: book;
}

.book {
  display: flex;
  gap: 0.85rem;
  padding: 0.9rem 1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
}

.book-num {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--clr-blue-light);
  color: var(--clr-blue);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
}

.book-body {
  min-width: 0;
}

.book-title {
  font-family: var(--font-serif);
  font-size: 1.02rem;
  color: var(--clr-blue-dark);
  margin: 0 0 0.15rem;
  line-height: 1.3;
}

.book-meta {
  font-family: var(--font-sans);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--clr-ink-soft);
  margin: 0 0 0.4rem;
}

.book-summary {
  font-family: var(--font-serif);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--clr-ink-mid);
  margin: 0;
}

</style>
