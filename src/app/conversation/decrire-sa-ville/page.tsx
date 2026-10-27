import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/decrire-sa-ville";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "dans le sud",
  "au bord de la mer",
  "à une heure de",
  "une grande ville",
  "un village",
  "pas très grand",
  "le centre-ville",
  "la vieille ville",
  "une place",
  "un marché",
  "en bas de chez moi",
  "en face",
  "un endroit",
  "ça vaut le coup",
  "à pied",
  "en bus",
  "il faut vingt minutes",
  "c’est loin",
  "au mois d’août",
  "il fait chaud",
  "il y a du monde",
  "il n’y a pas grand-chose",
  "c’est une sorte de",
  "ça ressemble à",
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
          Une amie française arrive chez vous le mois prochain. Elle n’est
          jamais venue, elle ne connaît ni votre ville ni votre région, et elle
          appelle pour préparer son voyage. Quelqu’un d’autre joue l’amie : elle
          pose ses questions, elle réagit, elle demande des précisions. Vous,
          vous devez lui donner une idée de l’endroit où vous vivez, sans lui
          montrer une seule photo.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Una amiga francesa llega a tu casa el mes que viene. Nunca ha estado,
          no conoce tu ciudad ni tu región, y llama para preparar el viaje. Otra
          persona hace de la amiga: hace sus preguntas, reacciona, pide
          precisiones. Tú tienes que darle una idea del lugar donde vives, sin
          enseñarle ni una foto.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Quelqu’un qui prépare un voyage revient toujours aux mêmes cinq
          moments, dans un ordre ou dans un autre.
        </p>

        <ol>
          <li>Situer la ville, par rapport à un endroit qu’elle connaît.</li>
          <li>Dire à quoi elle ressemble, en deux ou trois choses.</li>
          <li>Conseiller un endroit, et dire pourquoi celui-là.</li>
          <li>Expliquer comment on s’y déplace.</li>
          <li>Dire aussi ce qui vous plaît moins.</li>
        </ol>

        <div className="astuce">
          <p className="astuce-hook">
            Situez par rapport à ce qu’elle connaît, pas par rapport à la carte.
          </p>
          <p>
            <span className="fr">à deux heures de Madrid</span> ou{" "}
            <span className="fr">à vingt minutes de la mer</span> lui donnent
            tout de suite une image. Le nom de votre région, lui, ne lui dit
            rien, et c’est aussi la phrase la plus difficile à construire.
          </p>
        </div>

        <div className="attention">
          <span className="fr">une place</span>, en français, c’est la place
          d’un village ou d’une ville, ou bien une place assise. Pour l’endroit
          où l’on va, on dit <span className="fr">un endroit</span> : on ne dit
          pas <s className="fr">« je connais une belle place pour manger »</s>,
          on dit{" "}
          <span className="fr">« je connais un bon endroit pour manger »</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          Quien prepara un viaje vuelve siempre a los mismos cinco momentos, en
          un orden o en otro.
        </p>
        <ol>
          <li>Situar la ciudad, con respecto a un lugar que ella conoce.</li>
          <li>Decir cómo es, en dos o tres cosas.</li>
          <li>Aconsejar un lugar, y decir por qué ese.</li>
          <li>Explicar cómo se mueve uno por allí.</li>
          <li>Decir también lo que te gusta menos.</li>
        </ol>
        <div className="astuce">
          <p className="astuce-hook">
            Sitúa la ciudad con respecto a lo que ella conoce, no con respecto
            al mapa.
          </p>
          <p>
            <span className="fr" lang="fr">
              à deux heures de Madrid
            </span>{" "}
            o{" "}
            <span className="fr" lang="fr">
              à vingt minutes de la mer
            </span>{" "}
            le dan enseguida una imagen. El nombre de tu región, en cambio, no
            le dice nada, y además es la frase más difícil de construir.
          </p>
        </div>
        <div className="attention">
          <span className="fr" lang="fr">
            une place
          </span>
          , en francés, es la plaza de un pueblo o de una ciudad, o bien un
          asiento. Para el sitio al que se va, se dice{" "}
          <span className="fr" lang="fr">
            un endroit
          </span>
          : no se dice{" "}
          <s className="fr" lang="fr">
            « je connais une belle place pour manger »
          </s>
          , se dice{" "}
          <span className="fr" lang="fr">
            « je connais un bon endroit pour manger »
          </span>
          .
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation du début à la fin. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para llevar la conversación de principio a fin. Coge lo
          que te sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
