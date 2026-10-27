import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/parler-du-travail";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "les horaires",
  "commencer",
  "finir",
  "tôt",
  "tard",
  "la pause déjeuner",
  "la cantine",
  "la machine à café",
  "le badge",
  "un collègue",
  "le chef",
  "une réunion",
  "les congés",
  "un jour férié",
  "mon ancien travail",
  "avant",
  "pareil",
  "presque la même chose",
  "tutoyer",
  "vouvoyer",
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
          C’est votre première semaine dans une entreprise en France. À midi, un
          collègue s’assoit à côté de vous avec son plateau. C’est lui qui vous
          accueille : il vous montre comment ça marche ici, et il est curieux de
          savoir comment on travaille en Espagne. Quelqu’un joue le collègue ;
          vous répondez, et vous demandez à votre tour.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Es tu primera semana en una empresa en Francia. A mediodía, un
          compañero se sienta a tu lado con su bandeja. Es él quien te acoge: te
          enseña cómo funcionan las cosas aquí, y tiene curiosidad por saber
          cómo se trabaja en España. Alguien hace de compañero; tú respondes y,
          a tu vez, preguntas.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Une conversation entre collègues n’a pas de but à atteindre. Elle
          avance par petits échanges, et chacun donne autant qu’il reçoit.
        </p>

        <ol>
          <li>Dire ce que vous faites, et à quelle heure.</li>
          <li>Écouter la différence, puis la nommer avec un chiffre.</li>
          <li>Faire expliquer un mot que vous ne connaissez pas.</li>
          <li>Raconter votre ancien travail, à l’imparfait.</li>
          <li>Poser la même question à votre collègue.</li>
        </ol>

        <div className="attention">
          Au travail, <span className="fr">tu</span> et{" "}
          <span className="fr">vous</span> ne se choisissent pas une fois pour
          toutes. Entre collègues, on passe vite au{" "}
          <span className="fr">tu</span> : quelqu’un demande{" "}
          <span className="fr">« on se tutoie ? »</span> et c’est réglé. Avec un
          client, avec quelqu’un qui arrive, on garde{" "}
          <span className="fr">le vous</span>, et on attend qu’on vous propose
          l’autre.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Comparez avec un chiffre, pas avec un adjectif.
          </p>
          <p>
            <span className="fr">Je commence à huit heures et demie</span> se
            comprend tout de suite ; <span className="fr">c’est très tôt</span>{" "}
            ne dit rien à quelqu’un qui ne connaît pas vos horaires. Une heure,
            un nombre de jours, un nombre de semaines : c’est aussi le français
            le plus facile à produire.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          Una conversación entre compañeros no tiene un objetivo que alcanzar.
          Avanza con pequeños intercambios, y cada uno da tanto como recibe.
        </p>
        <ol>
          <li>Decir lo que haces y a qué hora.</li>
          <li>Escuchar la diferencia y nombrarla con una cifra.</li>
          <li>Pedir que te expliquen una palabra que no conoces.</li>
          <li>
            Contar tu antiguo trabajo, en{" "}
            <span className="fr" lang="fr">
              imparfait
            </span>
            .
          </li>
          <li>Hacer la misma pregunta a tu compañero.</li>
        </ol>
        <div className="attention">
          En el trabajo,{" "}
          <span className="fr" lang="fr">
            tu
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            vous
          </span>{" "}
          no se eligen de una vez para siempre. Entre compañeros se pasa pronto
          al{" "}
          <span className="fr" lang="fr">
            tu
          </span>
          : alguien pregunta{" "}
          <span className="fr" lang="fr">
            « on se tutoie ? »
          </span>{" "}
          y asunto resuelto. Con un cliente, o con alguien que acaba de llegar,
          se mantiene{" "}
          <span className="fr" lang="fr">
            le vous
          </span>{" "}
          y se espera a que te propongan el otro.
        </div>
        <div className="astuce">
          <p className="astuce-hook">
            Compara con una cifra, no con un adjetivo.
          </p>
          <p>
            <span className="fr" lang="fr">
              Je commence à huit heures et demie
            </span>{" "}
            se entiende enseguida;{" "}
            <span className="fr" lang="fr">
              c’est très tôt
            </span>{" "}
            no le dice nada a alguien que no conoce tu horario. Una hora, un
            número de días, un número de semanas: es también el francés más
            fácil de producir.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation à table. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para llevar la conversación en la mesa. Coge lo que te
          sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
