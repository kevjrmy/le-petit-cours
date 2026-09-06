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
        <h2>Si vous bloquez</h2>

        <p>
          Un exemple parmi d’autres. Ouvrez-le si vous avez besoin d’aide.
        </p>

        <details>
          <summary>Voir un dialogue complet</summary>
          <div className="example">
            <p>— Cabinet du docteur Lambert, bonjour.</p>
            <p>
              — Bonjour madame. Je voudrais prendre rendez-vous avec le docteur,
              s’il vous plaît.
            </p>
            <p>— Oui. C’est pour quoi ?</p>
            <p>— J’ai mal à la gorge depuis lundi, et j’ai un peu de fièvre.</p>
            <p>— D’accord. Vous êtes disponible quand ?</p>
            <p>— Le matin, si c’est possible. L’après-midi, je travaille.</p>
            <p>— Alors… jeudi, à neuf heures quarante-cinq ?</p>
            <p>— Jeudi, c’est un peu loin. Vous n’avez rien avant ?</p>
            <p>— J’ai mardi, à huit heures trente.</p>
            <p>— Mardi à huit heures trente, c’est parfait.</p>
            <p>— C’est à quel nom ?</p>
            <p>— Martin. M-A-R-T-I-N.</p>
            <p>
              — Très bien. Mardi, à huit heures trente. N’oubliez pas votre
              carte Vitale.
            </p>
            <p>— Merci beaucoup. Au revoir madame.</p>
          </div>
        </details>
      </section>
    </article>
  );
}
