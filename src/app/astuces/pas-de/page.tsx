import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/pas-de";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Après une négation</h2>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>un</strong>, <strong>une</strong>, <strong>des</strong>,{" "}
            <strong>du</strong>, <strong>de la</strong>,{" "}
            <strong>de l’</strong> : après une négation, il ne reste que{" "}
            <strong>de</strong>.
          </p>
          <p>
            Un seul mot pour les six, et il ne s’accorde avec rien. Devant une
            voyelle, il s’élide à son tour :{" "}
            <span className="fr">pas d’argent</span>,{" "}
            <span className="fr">pas d’amis</span>.
          </p>
        </div>

        <div className="example">
          J’ai <strong>un</strong> vélo. → Je n’ai pas <strong>de</strong> vélo.
          <br />
          Je bois <strong>du</strong> café. → Je ne bois pas{" "}
          <strong>de</strong> café.
          <br />
          Il y a <strong>des</strong> places. → Il n’y a pas{" "}
          <strong>de</strong> places.
        </div>

        <div className="exception">
          le verbe <span className="fr">être</span> n’y touche pas :{" "}
          <span className="fr">ce n’est pas un problème</span>,{" "}
          <span className="fr">ce ne sont pas des touristes</span>. Et l’article
          défini ne bouge jamais non plus :{" "}
          <span className="fr">je n’aime pas le café</span> garde son{" "}
          <span className="fr">le</span>, parce qu’aimer ne prend pas une
          quantité. Le détail est dans{" "}
          <Link href="/grammaire/la-negation">La négation</Link>.
        </div>
      </section>

      <section>
        <h2>Après une quantité</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Un mot de quantité occupe la place de l’article, et laisse le même{" "}
            <strong>de</strong> derrière lui.
          </p>
          <p>
            <span className="fr">beaucoup</span>,{" "}
            <span className="fr">un peu</span>,{" "}
            <span className="fr">trop</span>,{" "}
            <span className="fr">assez</span>,{" "}
            <span className="fr">un kilo</span>,{" "}
            <span className="fr">une bouteille</span> : tous se comportent de la
            même façon, et pour la même raison qu’une négation. La quantité est
            déjà dite, l’article n’a plus rien à annoncer.
          </p>
        </div>

        <div className="example">
          <strong>du</strong> pain → beaucoup <strong>de</strong> pain
          <br />
          <strong>de l’</strong>eau → une bouteille <strong>d’</strong>eau
          <br />
          <strong>des</strong> tomates → un kilo <strong>de</strong> tomates
        </div>

        <div className="exception">
          deux tournures figées gardent l’article entier :{" "}
          <span className="fr">bien des gens</span> et{" "}
          <span className="fr">la plupart des élèves</span>. Elles s’apprennent
          telles quelles. La règle complète, avec le choix entre{" "}
          <span className="fr">le</span>, <span className="fr">un</span> et{" "}
          <span className="fr">du</span>, est dans{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Après une négation, <span className="fr">un</span>,{" "}
            <span className="fr">une</span>, <span className="fr">des</span>,{" "}
            <span className="fr">du</span>, <span className="fr">de la</span> et{" "}
            <span className="fr">de l’</span> se réduisent tous à{" "}
            <span className="fr">de</span>.
          </li>
          <li>
            Après un mot de quantité, exactement la même chose :{" "}
            <span className="fr">beaucoup de pain</span>.
          </li>
          <li>
            Devant une voyelle, <span className="fr">de</span> s’élide :{" "}
            <span className="fr">pas d’argent</span>.
          </li>
          <li>
            Avec <span className="fr">être</span>, rien ne change :{" "}
            <span className="fr">ce n’est pas un problème</span>.
          </li>
          <li>
            L’article défini ne bouge pas non plus :{" "}
            <span className="fr">je n’aime pas le café</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
