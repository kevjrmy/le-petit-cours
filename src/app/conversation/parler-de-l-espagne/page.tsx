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
        <h2>Si vous bloquez</h2>

        <p>Un exemple parmi d’autres. Ouvrez-le si vous avez besoin d’aide.</p>

        <details>
          <summary>Voir un dialogue complet</summary>
          <div className="example">
            <p>— Madame, vous venez d’où ?</p>
            <p>
              — Je viens d’Espagne, de Valence. C’est une ville au bord de la
              mer, à l’est du pays.
            </p>
            <p>— Il fait chaud tout le temps ?</p>
            <p>
              — L’été, oui, très chaud. Mais en hiver il pleut, et dans le nord
              il neige.
            </p>
            <p>— Vous mangez de la paella tous les jours ?</p>
            <p>
              — Non, non ! On en mange le dimanche, en famille. Le reste du
              temps, on mange comme vous.
            </p>
            <p>— C’est quoi, votre fête préférée ?</p>
            <p>
              — Les Fallas, à Valence. On construit des statues géantes dans la
              rue, et à la fin on les brûle.
            </p>
            <p>— Pardon ? Vous pouvez répéter, s’il vous plaît ?</p>
            <p>— On les brûle. Toutes, la même nuit.</p>
            <p>— Et l’école, c’est comme ici ?</p>
            <p>
              — Un peu. Mais quand j’étais petite, on finissait à cinq heures et
              on mangeait à deux heures.
            </p>
            <p>— Pourquoi vous êtes venue en France ?</p>
            <p>
              — Pour le travail. Et vous, vous connaissez un pays où on parle
              espagnol ?
            </p>
          </div>
        </details>
      </section>
    </article>
  );
}
