import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/prendre-rendez-vous";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "un rendez-vous",
  "le cabinet",
  "le docteur",
  "la secrétaire",
  "je voudrais",
  "c’est pour quoi ?",
  "j’ai mal à la gorge",
  "la fièvre",
  "depuis lundi",
  "vous êtes disponible quand ?",
  "le matin",
  "l’après-midi",
  "plus tôt",
  "ça me convient",
  "annuler",
  "déplacer",
  "pour mon fils",
  "c’est à quel nom ?",
  "vous pouvez répéter ?",
  "la carte Vitale",
];

function Mots() {
  return (
    <ul className="mots">
      {WORDS.map((w) => (
        <li key={w} lang="fr">
          {w}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>La situation</h2>

        <p>
          Vous téléphonez au cabinet du docteur Lambert. Vous voulez un
          rendez-vous cette semaine. Quelqu’un décroche et joue la secrétaire :
          à vous de mener la conversation jusqu’au bout.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Llamas a la consulta del doctor Lambert. Quieres una cita esta semana.
          Alguien descuelga y hace de secretaria: te toca llevar la conversación
          hasta el final.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Une conversation au téléphone suit presque toujours le même ordre.
        </p>

        <ol>
          <li>Saluer et dire pourquoi vous appelez.</li>
          <li>Dire ce qui ne va pas.</li>
          <li>Dire quand vous êtes libre.</li>
          <li>Répondre à ce qu’on vous propose.</li>
          <li>Donner votre nom, confirmer, remercier.</li>
        </ol>

        <div className="astuce">
          <p className="astuce-hook">
            Répétez le jour et l’heure avant de raccrocher.
          </p>
          <p>
            C’est ce qui fait qu’un rendez-vous est vraiment pris, et c’est
            votre dernière occasion de corriger si vous avez mal entendu.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>Una conversación por teléfono sigue casi siempre el mismo orden.</p>
        <ol>
          <li>Saludar y decir por qué llamas.</li>
          <li>Decir qué te pasa.</li>
          <li>Decir cuándo estás libre.</li>
          <li>Responder a lo que te proponen.</li>
          <li>Dar tu nombre, confirmar y dar las gracias.</li>
        </ol>
        <div className="astuce">
          <p className="astuce-hook">
            Repite el día y la hora antes de colgar.
          </p>
          <p>
            Así la cita queda realmente tomada, y es tu última ocasión de
            corregir si has oído mal.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation au téléphone. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para llevar la conversación por teléfono. Coge lo que te
          sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
