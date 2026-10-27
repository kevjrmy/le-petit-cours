import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/demander-son-chemin";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "pardon, madame",
  "excusez-moi",
  "je cherche",
  "la gare",
  "la poste",
  "l’arrêt de bus",
  "je suis à pied",
  "c’est par où ?",
  "tout droit",
  "à gauche",
  "à droite",
  "tournez",
  "traversez",
  "prenez la deuxième rue",
  "jusqu’au feu",
  "la place",
  "en face de",
  "à côté de",
  "c’est loin ?",
  "dix minutes à pied",
  "plus lentement",
  "vous pouvez répéter ?",
  "je suis perdu",
  "merci beaucoup",
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
          Vous êtes dans une ville que vous ne connaissez pas, à pied, et vous
          cherchez un endroit précis. Quelqu’un joue le passant : il connaît la
          ville, il répond vite, et il n’a pas beaucoup de temps. Demander est
          la partie facile ; comprendre la réponse et la répéter est la vraie
          épreuve, et c’est celle qui est jouée ici.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Estás en una ciudad que no conoces, a pie, y buscas un sitio concreto.
          Alguien hace de transeúnte: conoce la ciudad, contesta rápido y tiene
          poco tiempo. Preguntar es la parte fácil; entender la respuesta y
          repetirla es la verdadera prueba, y es la que se practica aquí.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Un échange dans la rue dure une minute. Il y a cinq mouvements, et
          le troisième est celui qu’on oublie de préparer.
        </p>

        <ol>
          <li>Aborder quelqu’un et s’excuser de le déranger.</li>
          <li>Dire ce que vous cherchez, et que vous êtes à pied.</li>
          <li>Répéter l’itinéraire à voix haute pour le vérifier.</li>
          <li>Demander si c’est loin, et combien de temps il faut.</li>
          <li>Remercier, même si vous n’avez pas tout compris.</li>
        </ol>

        <div className="attention">
          On aborde un inconnu par <span className="fr">pardon, madame</span> ou{" "}
          <span className="fr">excusez-moi, monsieur</span>, jamais par{" "}
          <span className="fr">bonjour</span> seul et jamais par{" "}
          <span className="fr">tu</span>. Toute la scène se joue au{" "}
          <span className="fr">vous</span>, et les indications qu’on vous donne
          seront à l’impératif : <span className="fr">allez</span>,{" "}
          <span className="fr">tournez</span>,{" "}
          <span className="fr">prenez</span>,{" "}
          <span className="fr">traversez</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Répétez l’itinéraire. C’est la phrase qui vous sauve.
          </p>
          <p>
            <span className="fr">
              Alors, tout droit, puis à gauche au feu ?
            </span>{" "}
            se dit avec des mots que vous avez déjà, et vous apprend tout de
            suite si vous avez compris. Faire répéter une deuxième fois coûte
            beaucoup moins cher que marcher dix minutes dans la mauvaise
            direction.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          Un intercambio en la calle dura un minuto. Tiene cinco movimientos, y
          el tercero es el que se olvida de preparar.
        </p>
        <ol>
          <li>Abordar a alguien y disculparte por molestar.</li>
          <li>Decir qué buscas y que vas a pie.</li>
          <li>Repetir el itinerario en voz alta para comprobarlo.</li>
          <li>Preguntar si está lejos y cuánto se tarda.</li>
          <li>Dar las gracias, aunque no lo hayas entendido todo.</li>
        </ol>
        <div className="attention">
          A un desconocido se le aborda con{" "}
          <span className="fr" lang="fr">
            pardon, madame
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            excusez-moi, monsieur
          </span>
          , nunca con{" "}
          <span className="fr" lang="fr">
            bonjour
          </span>{" "}
          solo y nunca con{" "}
          <span className="fr" lang="fr">
            tu
          </span>
          . Toda la escena se juega con{" "}
          <span className="fr" lang="fr">
            vous
          </span>
          , y las indicaciones que te den irán en imperativo:{" "}
          <span className="fr" lang="fr">
            allez
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            tournez
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            prenez
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            traversez
          </span>
          .
        </div>
        <div className="astuce">
          <p className="astuce-hook">
            Repite el itinerario. Es la frase que te salva.
          </p>
          <p>
            <span className="fr" lang="fr">
              Alors, tout droit, puis à gauche au feu ?
            </span>{" "}
            se dice con palabras que ya conoces, y te dice enseguida si has
            entendido. Pedir que lo repitan por segunda vez sale mucho más
            barato que caminar diez minutos en la dirección equivocada.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi poser la question et suivre la réponse. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para hacer la pregunta y seguir la respuesta. Coge lo que
          te sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
