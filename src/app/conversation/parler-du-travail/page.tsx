import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/parler-du-travail";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
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

      <section>
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
          <p className="astuce-hook">Comparez avec un chiffre, pas avec un adjectif.</p>
          <p>
            <span className="fr">Je commence à huit heures et demie</span> se
            comprend tout de suite ; <span className="fr">c’est très tôt</span>{" "}
            ne dit rien à quelqu’un qui ne connaît pas vos horaires. Une heure,
            un nombre de jours, un nombre de semaines : c’est aussi le français
            le plus facile à produire.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation à table. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <ul className="mots">
          <li>les horaires</li>
          <li>commencer</li>
          <li>finir</li>
          <li>tôt</li>
          <li>tard</li>
          <li>la pause déjeuner</li>
          <li>la cantine</li>
          <li>la machine à café</li>
          <li>le badge</li>
          <li>un collègue</li>
          <li>le chef</li>
          <li>une réunion</li>
          <li>les congés</li>
          <li>un jour férié</li>
          <li>mon ancien travail</li>
          <li>avant</li>
          <li>pareil</li>
          <li>presque la même chose</li>
          <li>tutoyer</li>
          <li>vouvoyer</li>
        </ul>
      </section>
    </article>
  );
}
