import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/hier-dans-la-rue";

export const metadata = lessonMetadata(PATH);

/* The hints are two verbs and a time expression, none of which touches the
   pronouns this text exists to practise. `por la noche` is the trap worth
   spending a hint on: a Spanish speaker reaches for « la nuit », which in
   French is the part of the night you sleep through. */
const LINES: Part[][] = [
  [
    "Ayer vi a Marta en la calle. La llamé, pero no me ",
    { es: "oyó", fr: "entendre" },
    ".",
  ],
  [
    "Le escribí un mensaje ",
    { es: "por la noche", fr: "le soir" },
    ".",
  ],
  [
    "Me respondió a las once: me invitó a ",
    { es: "cenar", fr: "dîner" },
    " el viernes.",
  ],
  ["Le dije que sí."],
];

const MODEL = [
  "Hier, j’ai vu Marta dans la rue. Je l’ai appelée, mais elle ne m’a pas entendue.",
  "Je lui ai écrit un message le soir.",
  "Elle m’a répondu à onze heures : elle m’a invitée à dîner vendredi.",
  "Je lui ai dit oui.",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Six pronoms en quatre phrases. Pour chacun, une seule question :
          est-ce qu’on appelle <em>quelqu’un</em>, ou est-ce qu’on écrit{" "}
          <em>à quelqu’un</em> ? La réponse décide du pronom, et le pronom
          décide de l’accord.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Regardez les deux participes : «{" "}
              <span className="fr">elle m’a entendue</span> » prend un{" "}
              <strong>e</strong>, «{" "}
              <span className="fr">elle m’a répondu</span> » n’en prend pas. On
              entend <em>quelqu’un</em>, donc le pronom est COD et le participe
              s’accorde avec lui ; on répond <em>à quelqu’un</em>, donc il est
              COI et rien ne bouge. Même son, deux orthographes.
            </>
          }
        />
      </section>
    </article>
  );
}
