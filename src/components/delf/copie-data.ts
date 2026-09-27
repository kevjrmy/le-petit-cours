/**
 * Ce qu'une épreuve de compréhension déclare pour être corrigée à l'écran
 * (#82) : ses exercices, ses questions, et le barème de chacune.
 *
 * **Pas de `"use client"` ici**, et c'est ce qui permet à la page, un Server
 * Component, d'appeler `verifierCopie` au chargement du module : un barème qui
 * ne tombe pas juste casse `next build` au lieu d'afficher « 24 / 25 » à un
 * candidat qui a tout bon. C'est le piège de §9 (« Every count in a sentence
 * must match the rows under it »), sur la page où l'on fait le plus confiance au
 * chiffre.
 */

/** Une réponse à cocher : une ligne de propositions, une seule juste. */
export interface Partie {
  /** Ce que demande cette ligne, quand la question en a deux (vrai ou faux,
   *  puis la phrase du texte qui le montre). */
  consigne?: string;
  /** Deux à huit propositions, dans un ordre fixe : rien ne mélange. */
  options: string[];
  /** L'indice de la bonne proposition dans `options`. */
  reponse: number;
  points: number;
}

export interface QuestionEpreuve {
  /** Unique dans l'épreuve. Sert de clé aux réponses. */
  id: string;
  exercice: number;
  /** Les questions d'un même `groupe` sont dessinées ensemble, là où la page
   *  place `<Questions groupe="…" />`. Un exercice peut en avoir deux, quand
   *  une consigne sépare ses questions. */
  groupe: string;
  enonce: string;
  parties: Partie[];
  /** Montré sous la question une fois la copie corrigée : la phrase du
   *  document qui donne la réponse. */
  pourquoi?: string;
}

export interface CopieEpreuve {
  exercices: { numero: number; points: number }[];
  questions: QuestionEpreuve[];
}

export const pointsDe = (question: QuestionEpreuve) =>
  question.parties.reduce((total, partie) => total + partie.points, 0);

/** Un nombre de points à la française : « 1,5 », jamais « 1.5 ». */
export const enPoints = (n: number) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

/**
 * Jette si le barème ne tombe pas juste : chaque exercice doit valoir ce qu'il
 * annonce, l'épreuve 25, chaque réponse doit exister, chaque id être unique.
 * Rendu tel quel pour s'écrire `export const COPIE = verifierCopie({ … })`.
 */
export function verifierCopie(copie: CopieEpreuve): CopieEpreuve {
  const ids = new Set<string>();

  for (const question of copie.questions) {
    if (ids.has(question.id))
      throw new Error(`Épreuve : id en double, ${question.id}`);
    ids.add(question.id);

    for (const partie of question.parties) {
      if (partie.reponse < 0 || partie.reponse >= partie.options.length) {
        throw new Error(`Épreuve : ${question.id} n'a pas de bonne réponse`);
      }
    }
  }

  for (const { numero, points } of copie.exercices) {
    const somme = copie.questions
      .filter((q) => q.exercice === numero)
      .reduce((total, q) => total + pointsDe(q), 0);
    if (somme !== points) {
      throw new Error(
        `Épreuve : l'exercice ${numero} annonce ${points} points, ses questions en valent ${somme}`,
      );
    }
  }

  const total = copie.exercices.reduce((t, e) => t + e.points, 0);
  if (total !== 25) throw new Error(`Épreuve : ${total} points au lieu de 25`);

  return copie;
}
