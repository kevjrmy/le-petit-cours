import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/prendre-rendez-vous";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La situation</h2>

        <p>
          Vous téléphonez au cabinet du docteur Lambert. Vous voulez un
          rendez-vous cette semaine. Quelqu’un décroche et joue la secrétaire :
          à vous de mener la conversation jusqu’au bout.
        </p>

        <Situations />
      </section>

      <section>
        <h2>Les étapes</h2>

        <p>Une conversation au téléphone suit presque toujours le même ordre.</p>

        <ol>
          <li>Saluer et dire pourquoi vous appelez.</li>
          <li>Dire ce qui ne va pas.</li>
          <li>Dire quand vous êtes libre.</li>
          <li>Répondre à ce qu’on vous propose.</li>
          <li>Donner votre nom, confirmer, remercier.</li>
        </ol>

        <div className="astuce">
          <p className="astuce-hook">
            Répétez le jour et l’heure avant de raccrocher.
          </p>
          <p>
            C’est ce qui fait qu’un rendez-vous est vraiment pris, et c’est
            votre dernière occasion de corriger si vous avez mal entendu.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation au téléphone. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>un rendez-vous</li>
          <li>le cabinet</li>
          <li>le docteur</li>
          <li>la secrétaire</li>
          <li>je voudrais</li>
          <li>c’est pour quoi ?</li>
          <li>j’ai mal à la gorge</li>
          <li>la fièvre</li>
          <li>depuis lundi</li>
          <li>vous êtes disponible quand ?</li>
          <li>le matin</li>
          <li>l’après-midi</li>
          <li>plus tôt</li>
          <li>ça me convient</li>
          <li>annuler</li>
          <li>déplacer</li>
          <li>pour mon fils</li>
          <li>c’est à quel nom ?</li>
          <li>vous pouvez répéter ?</li>
          <li>la carte Vitale</li>
        </ul>
      </section>
    </article>
  );
}
