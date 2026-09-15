import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/le-resume-d-un-film";

export const metadata = lessonMetadata(PATH);

/* Three nouns, and not one negation: the four « ne » are what the text exists
   to test. `plato` earns a hint because the cognate misleads — it is the dish,
   not the plate — and `rata` because the noun changes gender crossing the
   border. The summary is written here, in our own words, not copied from the
   film's own blurb (§9b). */
const LINES: Part[][] = [
  [
    "Remy es ",
    { es: "una rata", fr: "un rat" },
    " que vive cerca de París. No come ",
    { es: "basura", fr: "les ordures" },
    ": quiere cocinar.",
  ],
  ["En la cocina de un gran restaurante, nadie quiere ver una rata."],
  ["Allí conoce a Linguini, un joven que no ha cocinado nunca."],
  [
    "Juntos van a preparar el mejor ",
    { es: "plato", fr: "un plat" },
    " del restaurante, pero no van a decir nada.",
  ],
];

const MODEL = [
  "Rémy est un rat qui vit près de Paris. Il ne mange pas d’ordures : il veut cuisiner.",
  "Dans la cuisine d’un grand restaurant, personne ne veut voir un rat.",
  "Là, il rencontre Linguini, un jeune homme qui n’a jamais cuisiné.",
  "Ensemble, ils vont préparer le meilleur plat du restaurant, mais ils ne vont rien dire.",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Brad Bird · <em>Ratatouille</em> · Pixar · 2007 · le début de
          l’histoire
        </p>

        <p>
          Rémy est le rat cuisinier de ce film : voici son histoire, résumée
          ici en quatre phrases. Elles disent surtout ce qui <em>ne</em> se
          passe pas, alors regardez d’abord où vous allez poser votre{" "}
          <span className="fr">ne</span>.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Votre version n’a pas à être identique à celle-ci. «{" "}
              <span className="fr">Rémy</span> » ou «{" "}
              <span className="fr">Remy</span> », «{" "}
              <span className="fr">il habite</span> » ou «{" "}
              <span className="fr">il vit</span> » : peu importe. Ce qui compte,
              ce sont les quatre négations. Après une négation, l’article
              change : «{" "}
              <span className="fr">il ne mange pas d’ordures</span> », jamais «{" "}
              <span className="fr">des ordures</span> ».{" "}
              <span className="fr">personne</span> est ici le sujet, donc «{" "}
              <span className="fr">ne</span> » reste devant le verbe : «{" "}
              <span className="fr">personne ne veut</span> ». Et au futur
              proche, <span className="fr">rien</span> se place entre les deux
              verbes : «{" "}
              <span className="fr">ils ne vont rien dire</span> ».
            </>
          }
        />
      </section>
    </article>
  );
}
