import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/un-week-end-a-la-plage";

export const metadata = lessonMetadata(PATH);

/* Every sentence is built to force a homophone: son/sont, est/et, a/à, ont, on,
   où. The hints are the three nouns, so none of them helps with the choice the
   text is actually testing. `coche` earns its place: it exists in French and
   means something else entirely. */
const LINES: Part[][] = [
  [
    "Su hermano está en casa con sus dos ",
    { es: "perros", fr: "un chien" },
    ". Son muy grandes.",
  ],
  [
    "Sus padres tienen un ",
    { es: "coche", fr: "une voiture" },
    " y una casa cerca de la playa.",
  ],
  ["El sábado vamos allí, y sus primos vienen también."],
  ["¿Dónde está tu ", { es: "maleta", fr: "une valise" }, "?"],
];

const MODEL = [
  "Son frère est à la maison avec ses deux chiens. Ils sont très grands.",
  "Ses parents ont une voiture et une maison près de la plage.",
  "Samedi, on va là-bas, et ses cousins viennent aussi.",
  "Où est ta valise ?",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Quatre phrases ordinaires, et un piège dans chacune. Les mots qui
          vous feront hésiter se prononcent tous comme un autre : lire votre
          version à voix haute ne vous dira rien. Il faut la regarder.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Comparez lettre à lettre : <span className="fr">son</span> et{" "}
              <span className="fr">sont</span>,{" "}
              <span className="fr">est</span> et <span className="fr">et</span>,{" "}
              <span className="fr">a</span> et <span className="fr">à</span>,{" "}
              <span className="fr">on</span> et <span className="fr">ont</span>,{" "}
              <span className="fr">où</span> et <span className="fr">ou</span>.
              Le reste de la phrase peut varier ; ces cinq paires, non.
            </>
          }
        />
      </section>
    </article>
  );
}
