import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/donner-son-avis";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "à mon avis",
  "je pense que",
  "je trouve que",
  "je préfère",
  "parce que",
  "plus pratique",
  "moins cher",
  "par exemple",
  "en plus",
  "surtout",
  "en général",
  "c’est vrai, mais…",
  "par contre",
  "ça dépend de",
  "je suis d’accord",
  "je ne suis pas d’accord",
  "tu as raison",
  "bref",
  "et toi ?",
  "qu’est-ce que tu en penses ?",
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
          Vous prenez un café avec une amie française. Elle aime discuter : elle
          pose une question, elle écoute votre avis, et elle n’est jamais tout à
          fait d’accord. Quelqu’un joue l’amie ; vous défendez votre idée, et
          vous lui demandez son avis.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Tomas un café con una amiga francesa. Le gusta charlar: hace una
          pregunta, escucha tu opinión y nunca está del todo de acuerdo. Alguien
          hace de la amiga; tú defiendes tu idea y le preguntas su opinión.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Un avis solide a toujours la même forme. Suivez-la dans l’ordre :
          chaque étape vous donne une phrase de plus.
        </p>

        <ol>
          <li>Dire votre avis, en une phrase.</li>
          <li>Donner une raison.</li>
          <li>Donner un exemple pris dans votre vie.</li>
          <li>Écouter l’avis de votre amie, et en accepter une partie.</li>
          <li>Fermer votre avis, puis demander son avis à votre amie.</li>
        </ol>

        <div className="attention">
          Pour dire non à une idée, gardez{" "}
          <span className="fr">je pense que</span> et mettez la négation après :{" "}
          <span className="fr">je pense que ce n’est pas vrai</span>. C’est la
          forme la plus simple, et elle est toujours juste.
        </div>

        <div className="astuce">
          <p className="astuce-hook">Une idée par phrase.</p>
          <p>
            Ne cherchez pas la longue phrase. Trois phrases courtes valent mieux
            qu’une longue où l’on se perd, et votre amie a le temps de répondre
            entre deux.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          Una opinión sólida tiene siempre la misma forma. Síguela en orden:
          cada etapa te da una frase más.
        </p>
        <ol>
          <li>Decir tu opinión, en una frase.</li>
          <li>Dar una razón.</li>
          <li>Dar un ejemplo sacado de tu vida.</li>
          <li>Escuchar la opinión de tu amiga y aceptar una parte.</li>
          <li>Cerrar tu opinión y preguntarle la suya a tu amiga.</li>
        </ol>
        <div className="attention">
          Para decir que no a una idea, conserva{" "}
          <span className="fr" lang="fr">
            je pense que
          </span>{" "}
          y pon la negación después:{" "}
          <span className="fr" lang="fr">
            je pense que ce n’est pas vrai
          </span>
          . Es la forma más sencilla, y siempre es correcta.
        </div>
        <div className="astuce">
          <p className="astuce-hook">Una idea por frase.</p>
          <p>
            No busques la frase larga. Tres frases cortas valen más que una
            larga en la que te pierdes, y tu amiga tiene tiempo de responder
            entre una y otra.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la discussion jusqu’au bout du café. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para sostener la discusión hasta el final del café. Coge
          lo que te sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
