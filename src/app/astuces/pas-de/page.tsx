import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/pas-de";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish (#102). The French taught is written once. */

function Negation() {
  return (
    <div className="example" lang="fr">
      J’ai <strong>un</strong> vélo. → Je n’ai pas <strong>de</strong> vélo.
      <br />
      Je bois <strong>du</strong> café. → Je ne bois jamais <strong>de</strong>{" "}
      café.
      <br />
      Il y a <strong>du</strong> pain. → Il n’y a plus <strong>de</strong> pain.
      <br />
      Elle mange <strong>des</strong> légumes. → Elle ne mange pas{" "}
      <strong>de</strong> légumes.
    </div>
  );
}

function Quantity() {
  return (
    <div className="example" lang="fr">
      <strong>du</strong> pain → beaucoup <strong>de</strong> pain
      <br />
      <strong>de l’</strong>eau → une bouteille <strong>d’</strong>eau
      <br />
      <strong>des</strong> tomates → un kilo <strong>de</strong> tomates
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Après une négation</h2>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>un</strong>, <strong>une</strong>, <strong>des</strong>,{" "}
            <strong>du</strong>, <strong>de la</strong>,{" "}
            <strong>de l’</strong> : après une négation, il ne reste que{" "}
            <strong>de</strong>.
          </p>
          <p>
            Un seul mot pour les six, et il ne s’accorde avec rien. Le mot de
            négation n’y change rien non plus :{" "}
            <span className="fr">pas</span>, <span className="fr">plus</span> et{" "}
            <span className="fr">jamais</span> laissent le même{" "}
            <span className="fr">de</span> derrière eux. Devant une voyelle, il
            s’élide à son tour :{" "}
            <span className="fr">pas d’argent</span>,{" "}
            <span className="fr">pas d’amis</span>.
          </p>
        </div>

        <Negation />

        <div className="exception">
          Le verbe <span className="fr">être</span> n’y touche pas :{" "}
          <span className="fr">ce n’est pas un problème</span>,{" "}
          <span className="fr">ce ne sont pas des touristes</span>. Et l’article
          défini ne bouge jamais non plus :{" "}
          <span className="fr">je n’aime pas le café</span> garde son{" "}
          <span className="fr">le</span>, parce qu’aimer ne prend pas une
          quantité. Le détail est dans{" "}
          <Link href="/grammaire/la-negation">La négation</Link>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Después de una negación</h2>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>un</strong>, <strong>une</strong>, <strong>des</strong>,{" "}
            <strong>du</strong>, <strong>de la</strong>,{" "}
            <strong>de l’</strong>: después de una negación, solo queda{" "}
            <strong>de</strong>.
          </p>
          <p>
            Una sola palabra para las seis, y no concuerda con nada. La palabra
            de negación tampoco cambia nada:{" "}
            <span className="fr" lang="fr">pas</span>,{" "}
            <span className="fr" lang="fr">plus</span> y{" "}
            <span className="fr" lang="fr">jamais</span> dejan el mismo{" "}
            <span className="fr" lang="fr">de</span> detrás. Delante de vocal,
            se elide a su vez:{" "}
            <span className="fr" lang="fr">pas d’argent</span>,{" "}
            <span className="fr" lang="fr">pas d’amis</span>.
          </p>
        </div>

        <Negation />

        <div className="exception">
          El verbo <span className="fr" lang="fr">être</span> no lo toca:{" "}
          <span className="fr" lang="fr">ce n’est pas un problème</span>,{" "}
          <span className="fr" lang="fr">ce ne sont pas des touristes</span>.
          Y el artículo definido tampoco cambia nunca:{" "}
          <span className="fr" lang="fr">je n’aime pas le café</span> conserva
          su <span className="fr" lang="fr">le</span>, porque{" "}
          <span className="fr" lang="fr">aimer</span> no lleva una cantidad. El
          detalle está en <Link href="/grammaire/la-negation">La négation</Link>.
        </div>
      </section>

      <section data-ui="fr">
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

        <Quantity />

        <div className="exception">
          Deux tournures figées gardent l’article entier :{" "}
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

      <section data-ui="es" lang="es">
        <h2>Después de una cantidad</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Una palabra de cantidad ocupa el lugar del artículo y deja el mismo{" "}
            <strong>de</strong> detrás.
          </p>
          <p>
            <span className="fr" lang="fr">beaucoup</span>,{" "}
            <span className="fr" lang="fr">un peu</span>,{" "}
            <span className="fr" lang="fr">trop</span>,{" "}
            <span className="fr" lang="fr">assez</span>,{" "}
            <span className="fr" lang="fr">un kilo</span>,{" "}
            <span className="fr" lang="fr">une bouteille</span>: todas se
            comportan igual, y por la misma razón que una negación. La cantidad
            ya está dicha y el artículo no tiene nada más que anunciar.
          </p>
        </div>

        <Quantity />

        <div className="exception">
          Dos expresiones fijas conservan el artículo entero:{" "}
          <span className="fr" lang="fr">bien des gens</span> y{" "}
          <span className="fr" lang="fr">la plupart des élèves</span>. Se
          aprenden tal cual. La regla completa, con la elección entre{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">un</span> y{" "}
          <span className="fr" lang="fr">du</span>, está en{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Après une négation, <span className="fr">un</span>,{" "}
            <span className="fr">une</span>, <span className="fr">des</span>,{" "}
            <span className="fr">du</span>, <span className="fr">de la</span> et{" "}
            <span className="fr">de l’</span> se réduisent tous à{" "}
            <span className="fr">de</span>, que la négation soit{" "}
            <span className="fr">pas</span>, <span className="fr">plus</span> ou{" "}
            <span className="fr">jamais</span>.
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

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Después de una negación, <span className="fr" lang="fr">un</span>,{" "}
            <span className="fr" lang="fr">une</span>,{" "}
            <span className="fr" lang="fr">des</span>,{" "}
            <span className="fr" lang="fr">du</span>,{" "}
            <span className="fr" lang="fr">de la</span> y{" "}
            <span className="fr" lang="fr">de l’</span> se reducen todos a{" "}
            <span className="fr" lang="fr">de</span>, sea la negación{" "}
            <span className="fr" lang="fr">pas</span>,{" "}
            <span className="fr" lang="fr">plus</span> o{" "}
            <span className="fr" lang="fr">jamais</span>.
          </li>
          <li>
            Después de una palabra de cantidad, exactamente lo mismo:{" "}
            <span className="fr" lang="fr">beaucoup de pain</span>.
          </li>
          <li>
            Delante de vocal, <span className="fr" lang="fr">de</span> se
            elide: <span className="fr" lang="fr">pas d’argent</span>.
          </li>
          <li>
            Con <span className="fr" lang="fr">être</span>, nada cambia:{" "}
            <span className="fr" lang="fr">ce n’est pas un problème</span>.
          </li>
          <li>
            El artículo definido tampoco cambia:{" "}
            <span className="fr" lang="fr">je n’aime pas le café</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
