import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/le-village";

export const metadata = lessonMetadata(PATH);

/* Trois indices, sur les mots que l'espagnol ne donne pas : un faux ami qui
   coûte la phrase entière, un nom de saison et un nom de parenté. Aucun ne
   porte sur un démonstratif, qui est ce que le texte existe pour faire
   travailler (`.claude/agents/lesson-author.md`). Formes de base uniquement. */
const LINES: Part[][] = [
  ["Esta casa es la de mis ", { es: "abuelos", fr: "les grands-parents" }, "."],
  [
    "Está en un ",
    { es: "pueblo", fr: "un village" },
    " de montaña, a diez kilómetros de aquí.",
  ],
  [
    "Aquellos ",
    { es: "veranos", fr: "un été" },
    " fueron los mejores de mi vida.",
  ],
  ["Mi hermana prefiere el pueblo de la costa, pero yo prefiero este."],
];

const MODEL = [
  "Cette maison est celle de mes grands-parents.",
  "Elle est dans un village de montagne, à dix kilomètres d’ici.",
  "Ces étés-là ont été les meilleurs de ma vie.",
  "Ma sœur préfère le village de la côte, mais moi, je préfère celui-ci.",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Quatre phrases à écrire en français. Le texte revient quatre fois sur
          les mêmes choses : à vous de ne pas répéter les noms.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Votre version n’a pas à être identique à celle-ci. «{" "}
              <span className="fr">à dix kilomètres d’ici</span> » peut se
              réduire à « <span className="fr">à dix kilomètres</span> », et «{" "}
              <span className="fr">les meilleurs</span> » vaut «{" "}
              <span className="fr">les plus beaux</span> ». Deux choses ne
              passent pas : écrire «{" "}
              <span className="fr">la maison de mes grands-parents</span> » au
              lieu de « <span className="fr">celle de</span> », puisque le nom
              vient d’être dit, et laisser «{" "}
              <span className="fr">celui</span> » tout seul à la fin, qui ne
              s’emploie jamais sans suite.
            </>
          }
        />
      </section>
    </article>
  );
}
