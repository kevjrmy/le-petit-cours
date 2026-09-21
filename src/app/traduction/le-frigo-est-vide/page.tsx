import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/le-frigo-est-vide";

export const metadata = lessonMetadata(PATH);

/* Trois indices, sur les mots que l'espagnol ne donne pas : un nom d'objet, un
   verbe qui change de construction et un nom que son cognat trahit. Aucun ne
   porte sur un article, qui est ce que le texte existe pour faire travailler
   (`.claude/agents/lesson-author.md`). Formes de base uniquement. */
const LINES: Part[][] = [
  ["No queda nada en ", { es: "la nevera", fr: "le frigo" }, "."],
  ["Tengo que comprar pan, leche y huevos."],
  [
    "Mi hijo no come carne, pero ",
    { es: "le encanta", fr: "adorer" },
    " el pescado.",
  ],
  [
    "Si sobra ",
    { es: "dinero", fr: "l’argent" },
    ", compraré un kilo de naranjas.",
  ],
];

const MODEL = [
  "Il ne reste rien dans le frigo.",
  "Je dois acheter du pain, du lait et des œufs.",
  "Mon fils ne mange pas de viande, mais il adore le poisson.",
  "S’il reste de l’argent, j’achèterai un kilo d’oranges.",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Quatre phrases à écrire en français. Presque chaque nom du texte
          arrive sans rien devant lui : en français, il lui faudra quelque
          chose.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Votre version n’a pas à être identique à celle-ci. «{" "}
              <span className="fr">il n’y a plus rien</span> » vaut «{" "}
              <span className="fr">il ne reste rien</span> », «{" "}
              <span className="fr">le réfrigérateur</span> » vaut «{" "}
              <span className="fr">le frigo</span> », et «{" "}
              <span className="fr">je vais acheter</span> » vaut le futur.
              Deux choses ne passent pas : un nom laissé tout nu, comme «{" "}
              <span className="fr">acheter pain</span> », et «{" "}
              <span className="fr">pas de la viande</span> » à la place de «{" "}
              <span className="fr">pas de viande</span> ».
            </>
          }
        />
      </section>
    </article>
  );
}
