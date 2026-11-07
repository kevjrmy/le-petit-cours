import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/raconter-ses-vacances";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared, in the
   order the story runs. */
const WORDS = [
  "partir en vacances",
  "le séjour",
  "prendre l’avion",
  "prendre le train",
  "louer une voiture",
  "une chambre d’hôte",
  "une auberge de jeunesse",
  "le camping",
  "rendre visite à",
  "visiter",
  "se promener",
  "faire une randonnée",
  "se baigner",
  "goûter",
  "d’abord",
  "ensuite",
  "le lendemain",
  "il faisait beau",
  "il pleuvait",
  "il y avait du monde",
  "le paysage",
  "c’était magnifique",
  "c’était décevant",
  "ça m’a plu",
  "finalement",
  "rentrer",
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
          C’est lundi matin, vous revenez de vacances. Un ami ou un collègue,
          qui n’est pas parti, vient vous voir : il veut tout savoir. Quelqu’un
          d’autre joue cette personne : il pose ses questions, il réagit, il
          vous demande des détails. Vous racontez votre voyage, le vrai ou un
          voyage inventé.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Es lunes por la mañana y vuelves de vacaciones. Un amigo o un
          compañero, que no se ha ido, viene a verte: quiere saberlo todo. Otra
          persona hace de él: hace sus preguntas, reacciona, te pide detalles.
          Tú cuentas tu viaje, el de verdad o uno inventado.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>Un récit de vacances se raconte presque toujours dans cet ordre.</p>

        <ol>
          <li>
            Dire où vous êtes allé(e), quand, pour combien de temps et avec qui.
          </li>
          <li>Dire comment vous y êtes allé(e) et où vous avez dormi.</li>
          <li>Raconter ce que vous avez fait, dans l’ordre.</li>
          <li>Décrire le temps et le lieu : comment c’était.</li>
          <li>Dire ce qui vous a plu, ce qui vous a déçu, et le retour.</li>
        </ol>

        <div className="astuce">
          <p className="astuce-hook">
            Ce qui s’est passé, une fois : passé composé. Le décor : imparfait.
          </p>
          <p>
            Une chose qui s’est passée une fois est au passé composé :{" "}
            <span className="fr">nous avons visité le vieux port</span>,{" "}
            <span className="fr">ça m’a plu</span>. Le temps, le lieu (
            <span className="fr">c’était…</span>) et ce qu’on faisait chaque
            jour (<span className="fr">tous les matins…</span>) sont à
            l’imparfait : <span className="fr">il faisait beau</span>,{" "}
            <span className="fr">il y avait du monde</span>. Pour lier les
            étapes, utilisez <span className="fr">d’abord</span>,{" "}
            <span className="fr">ensuite</span>,{" "}
            <span className="fr">le lendemain</span> et{" "}
            <span className="fr">finalement</span>.
          </p>
        </div>

        <div className="attention">
          <span className="fr">visiter</span> se dit d’un lieu. Pour une
          personne, on dit <span className="fr">rendre visite à</span> : on ne
          dit pas <s className="fr">« j’ai visité ma tante »</s>, on dit{" "}
          <span className="fr">« j’ai rendu visite à ma tante »</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>Un relato de vacaciones se cuenta casi siempre en este orden.</p>
        <ol>
          <li>Decir adónde fuiste, cuándo, cuánto tiempo y con quién.</li>
          <li>Decir cómo fuiste y dónde dormiste.</li>
          <li>Contar lo que hiciste, en orden.</li>
          <li>Describir el tiempo y el lugar: cómo era.</li>
          <li>Decir lo que te gustó, lo que te decepcionó y la vuelta.</li>
        </ol>
        <div className="astuce">
          <p className="astuce-hook">
            Lo que pasó una vez: passé composé. El decorado: imparfait.
          </p>
          <p>
            Lo que pasó una vez va en passé composé:{" "}
            <span className="fr" lang="fr">
              nous avons visité le vieux port
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              ça m’a plu
            </span>
            . El tiempo, el lugar (
            <span className="fr" lang="fr">
              c’était…
            </span>
            ) y lo que hacías cada día (
            <span className="fr" lang="fr">
              tous les matins…
            </span>
            ) van en imparfait:{" "}
            <span className="fr" lang="fr">
              il faisait beau
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              il y avait du monde
            </span>
            . Para unir las etapas, usa{" "}
            <span className="fr" lang="fr">
              d’abord
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              ensuite
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              le lendemain
            </span>{" "}
            y{" "}
            <span className="fr" lang="fr">
              finalement
            </span>
            .
          </p>
        </div>
        <div className="attention">
          <span className="fr" lang="fr">
            visiter
          </span>{" "}
          se dice de un lugar. Para una persona se dice{" "}
          <span className="fr" lang="fr">
            rendre visite à
          </span>
          : no se dice{" "}
          <s className="fr" lang="fr">
            « j’ai visité ma tante »
          </s>
          , se dice{" "}
          <span className="fr" lang="fr">
            « j’ai rendu visite à ma tante »
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
