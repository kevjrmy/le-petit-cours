import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Traduction, type Part } from "@/components/exercice/Traduction";

const PATH = "/traduction/une-journee";

export const metadata = lessonMetadata(PATH);

/* Hints on the three words Spanish does not give away: a pronominal verb, a
   connector, and a noun whose cognate misleads. Base forms only. */
const LINES: Part[][] = [
  ["Ayer ", { es: "me desperté", fr: "se réveiller" }, " a las siete."],
  [
    "Tenía dolor de garganta, ",
    { es: "así que", fr: "alors" },
    " llamé al médico.",
  ],
  [
    "La secretaria me dio ",
    { es: "una cita", fr: "un rendez-vous" },
    " para el jueves a las nueve y media.",
  ],
  ["Después fui a trabajar, pero no comí nada."],
];

const MODEL = [
  "Hier, je me suis réveillée à sept heures.",
  "J’avais mal à la gorge, alors j’ai appelé le médecin.",
  "La secrétaire m’a donné un rendez-vous pour jeudi, à neuf heures et demie.",
  "Ensuite, je suis allée travailler, mais je n’ai rien mangé.",
];

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Quatre phrases à écrire en français. Lisez tout avant de commencer :
          la première phrase décide du temps des autres.
        </p>

        <Traduction
          lines={LINES}
          model={MODEL}
          note={
            <>
              Votre version n’a pas à être identique à celle-ci. «{" "}
              <span className="fr">alors</span> » et «{" "}
              <span className="fr">donc</span> » vont toutes les deux, et «{" "}
              <span className="fr">neuf heures trente</span> » vaut «{" "}
              <span className="fr">neuf heures et demie</span> ». Comparez les
              temps, les accords et l’ordre des mots, pas les synonymes.
            </>
          }
        />
      </section>
    </article>
  );
}
