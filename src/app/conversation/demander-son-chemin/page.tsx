import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/demander-son-chemin";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
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

      <section>
        <h2>Les étapes</h2>

        <p>
          Un échange dans la rue dure une minute. Il en faut cinq mouvements, et
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
          on aborde un inconnu par{" "}
          <span className="fr">pardon, madame</span> ou{" "}
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
            se dit avec trois mots que vous avez déjà, et vous apprend tout de
            suite si vous avez compris. Faire répéter une deuxième fois coûte
            beaucoup moins cher que marcher dix minutes dans la mauvaise
            direction.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi poser la question et suivre la réponse. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>pardon, madame</li>
          <li>excusez-moi</li>
          <li>je cherche</li>
          <li>la gare</li>
          <li>la poste</li>
          <li>l’arrêt de bus</li>
          <li>je suis à pied</li>
          <li>c’est par où ?</li>
          <li>tout droit</li>
          <li>à gauche</li>
          <li>à droite</li>
          <li>tournez</li>
          <li>traversez</li>
          <li>prenez la deuxième rue</li>
          <li>jusqu’au feu</li>
          <li>la place</li>
          <li>en face de</li>
          <li>à côté de</li>
          <li>c’est loin ?</li>
          <li>dix minutes à pied</li>
          <li>plus lentement</li>
          <li>vous pouvez répéter ?</li>
          <li>je suis perdu</li>
          <li>merci beaucoup</li>
        </ul>
      </section>
    </article>
  );
}
