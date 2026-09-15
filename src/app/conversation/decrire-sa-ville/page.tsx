import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/decrire-sa-ville";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
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

      <section>
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
          pas <span className="fr">« je connais une belle place pour manger »</span>,
          on dit <span className="fr">« je connais un bon endroit pour manger »</span>.
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation du début à la fin. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>dans le sud</li>
          <li>au bord de la mer</li>
          <li>à une heure de</li>
          <li>une grande ville</li>
          <li>un village</li>
          <li>pas très grand</li>
          <li>le centre-ville</li>
          <li>la vieille ville</li>
          <li>une place</li>
          <li>un marché</li>
          <li>en bas de chez moi</li>
          <li>en face</li>
          <li>un endroit</li>
          <li>ça vaut le coup</li>
          <li>à pied</li>
          <li>en bus</li>
          <li>il faut vingt minutes</li>
          <li>c’est loin</li>
          <li>au mois d’août</li>
          <li>il fait chaud</li>
          <li>il y a du monde</li>
          <li>il n’y a pas grand-chose</li>
          <li>c’est une sorte de</li>
          <li>ça ressemble à</li>
        </ul>
      </section>
    </article>
  );
}
