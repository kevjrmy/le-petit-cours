import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/se-presenter";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La situation</h2>

        <p>
          Vous rencontrez quelqu’un pour la première fois : en cours, chez un
          voisin, ou au travail le premier jour. Quelqu’un d’autre joue cette
          personne. Vous devez dire qui vous êtes, comprendre qui elle est, et
          demander de l’aide quand vous ne comprenez pas. C’est la première
          conversation qu’on a en français, et c’est celle qu’on a le plus
          souvent.
        </p>

        <Situations />
      </section>

      <section>
        <h2>Les étapes</h2>

        <p>
          Une présentation suit presque toujours le même ordre. Chaque étape
          demande une phrase que vous seul pouvez produire.
        </p>

        <ol>
          <li>Saluer, et dire votre nom.</li>
          <li>
            Demander le nom de l’autre personne. Demander de répéter, ou
            d’épeler.
          </li>
          <li>Dire d’où vous venez, et où vous habitez.</li>
          <li>Dire votre âge, votre métier ou ce que vous étudiez.</li>
          <li>Remercier, et prendre congé.</li>
        </ol>

        <div className="attention">
          l’âge se dit avec le verbe <span className="fr">avoir</span>, et le
          mot <span className="fr">ans</span> ne se supprime jamais. On dit{" "}
          <span className="fr">j’ai vingt-cinq ans</span>. On ne dit pas{" "}
          <span className="fr">je suis vingt-cinq</span>, ni{" "}
          <span className="fr">j’ai vingt-cinq</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            La question courte est celle que vous entendez.
          </p>
          <p>
            Dans un livre, la question s’écrit{" "}
            <span className="fr">D’où venez-vous ?</span>. Dans la rue, on vous
            dit <span className="fr">Vous êtes d’où ?</span>, et à quelqu’un
            de votre âge <span className="fr">Tu es d’où ?</span>. Les trois
            demandent la même chose. Apprenez la courte pour comprendre, la
            longue pour écrire.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation du début à la fin. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>bonjour</li>
          <li>bonsoir</li>
          <li>salut</li>
          <li>je m’appelle</li>
          <li>comment vous appelez-vous ?</li>
          <li>enchanté</li>
          <li>vous pouvez répéter ?</li>
          <li>vous pouvez épeler ?</li>
          <li>plus lentement</li>
          <li>je ne comprends pas</li>
          <li>je viens de</li>
          <li>j’habite à</li>
          <li>je suis espagnol</li>
          <li>je parle un peu français</li>
          <li>j’ai vingt ans</li>
          <li>je suis étudiant</li>
          <li>je travaille dans</li>
          <li>voici</li>
          <li>et vous ?</li>
          <li>merci beaucoup</li>
          <li>au revoir</li>
          <li>à bientôt</li>
          <li>bonne journée</li>
        </ul>
      </section>
    </article>
  );
}
