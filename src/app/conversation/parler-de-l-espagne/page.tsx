import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/parler-de-l-espagne";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La situation</h2>

        <p>
          Vous êtes invitée dans une école, en France. Devant vous, une classe
          d’enfants de dix ans. Ils savent que vous venez d’Espagne et ils ont
          des questions. Beaucoup de questions.
        </p>

        <Situations />
      </section>

      <section>
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

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi répondre aux enfants. Prenez ce qui vous sert, laissez le
          reste.
        </p>

        <ul className="mots">
          <li>je viens de Valence</li>
          <li>au bord de la mer</li>
          <li>dans le nord</li>
          <li>il fait chaud</li>
          <li>il pleut</li>
          <li>il neige</li>
          <li>un plat</li>
          <li>la paella</li>
          <li>le dimanche, en famille</li>
          <li>une fête</li>
          <li>la rue</li>
          <li>l’école</li>
          <li>la récréation</li>
          <li>quand j’étais petite</li>
          <li>on finissait à cinq heures</li>
          <li>je ne sais pas</li>
          <li>peut-être</li>
          <li>vous pouvez répéter ?</li>
          <li>une chanson</li>
          <li>plus connu que</li>
        </ul>
      </section>
    </article>
  );
}
