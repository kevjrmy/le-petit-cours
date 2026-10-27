import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/parler-de-l-espagne";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "je viens de Valence",
  "au bord de la mer",
  "dans le nord",
  "il fait chaud",
  "il pleut",
  "il neige",
  "un plat",
  "la paella",
  "le dimanche, en famille",
  "une fête",
  "la rue",
  "l’école",
  "la récréation",
  "quand j’étais petite",
  "on finissait à cinq heures",
  "je ne sais pas",
  "peut-être",
  "vous pouvez répéter ?",
  "une chanson",
  "plus connu que",
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
          Vous êtes invitée dans une école, en France. Devant vous, une classe
          d’enfants de dix ans. Ils savent que vous venez d’Espagne et ils ont
          des questions. Beaucoup de questions.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Te han invitado a un colegio, en Francia. Delante de ti, una clase de
          niños de diez años. Saben que vienes de España y tienen preguntas.
          Muchas preguntas.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Ici, ce n’est pas vous qui menez : ce sont eux. Vous, vous tenez la
          conversation.
        </p>

        <ol>
          <li>Dire d’où vous venez, et où c’est.</li>
          <li>Répondre à la question, avec un exemple.</li>
          <li>Faire répéter quand vous n’avez pas compris.</li>
          <li>Dire que vous ne savez pas, quand vous ne savez pas.</li>
          <li>Poser une question aux enfants à votre tour.</li>
        </ol>

        <div className="astuce">
          <p className="astuce-hook">
            Répondez avec un exemple, pas avec une définition.
          </p>
          <p>
            Un enfant qui demande « c’est comment, l’Espagne ? » attend une rue,
            un plat, une heure, pas une phrase générale. C’est aussi beaucoup
            plus facile à dire en français.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          Aquí no eres tú quien lleva la voz cantante: son ellos. Tú sostienes
          la conversación.
        </p>
        <ol>
          <li>Decir de dónde eres y dónde está.</li>
          <li>Responder a la pregunta, con un ejemplo.</li>
          <li>Pedir que repitan cuando no has entendido.</li>
          <li>Decir que no lo sabes, cuando no lo sabes.</li>
          <li>Hacer tú una pregunta a los niños.</li>
        </ol>
        <div className="astuce">
          <p className="astuce-hook">
            Responde con un ejemplo, no con una definición.
          </p>
          <p>
            Un niño que pregunta{" "}
            <span className="fr" lang="fr">
              c’est comment, l’Espagne ?
            </span>{" "}
            espera una calle, un plato, una hora, no una frase general. Y es
            mucho más fácil de decir en francés.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi répondre aux enfants. Prenez ce qui vous sert, laissez le
          reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para responder a los niños. Coge lo que te sirva y deja
          el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
