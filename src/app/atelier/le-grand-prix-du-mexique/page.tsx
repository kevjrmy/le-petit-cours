import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Trous } from "../_exercice/Trous";
import { A, ACCORD, DOUBLES, MOTS, SIGNES, TEXTE } from "./exercice";

const PATH = "/atelier/le-grand-prix-du-mexique";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un compte rendu de course, le Grand Prix de Mexico
   du 1er novembre 2026. L'élève corrige d'abord sa copie lui-même, cinq
   formes par trou, le corrigé caché dessous ; puis un petit plateau par
   faute, chacun sous une explication de deux ou trois phrases ; et « En
   résumé ». Elle tutoie l'élève qui la lit.

   **Anonyme** (`AGENTS.md` §9b) : rien ne dit qui a écrit le texte. Les noms
   sont ceux des pilotes de la course.

   **Ce qui a changé depuis le 27 octobre** : tout est au passé composé, plus
   un seul passé simple, et les accents sont là. La page commence par le
   dire. « à cause de Hamilton » est l'avis de l'élève (les commissaires ont
   pénalisé Leclerc) : le corrigé garde l'avis et corrige la phrase. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Corrige ton texte</h2>

        <p>
          D’abord, bravo : tout ton texte est au passé composé (
          <span className="fr">a gagné</span>,{" "}
          <span className="fr">est devenu</span>,{" "}
          <span className="fr">a été complété</span>), sans un seul passé
          simple. Et presque tous les accents sont là.
        </p>

        <p>
          Voici ton texte. Presque tout est déjà corrigé, sauf seize endroits.
          Pour chaque trou, cinq formes : celle que tu avais écrite, la bonne,
          et trois pièges. À toi de trouver la bonne.
        </p>

        <Trous
          texte={TEXTE}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />

        <p>
          Quand tu as fini, ouvre le corrigé : tout ce qui a changé dans ton
          texte est en gras.
        </p>

        <Corrige>
          <Copie>
            <p>
              Hier, Verstappen a gagné le <strong>Grand Prix</strong> de
              la Formule 1 au Mexique, une course{" "}
              <strong>passionnante</strong>, avec un accident important des
              deux Ferrari au <strong>début</strong> de la course, qui, pour
              moi <strong>personnellement</strong>,{" "}
              <strong>était la faute de</strong> Hamilton.
            </p>
            <p>
              Mais toute l’attention a été <strong>captée</strong> par Kimi
              Antonelli, qui est <strong>officiellement devenu</strong>{" "}
              <strong>le plus jeune pilote à gagner</strong>{" "}
              <strong>le titre de champion du monde</strong>,{" "}
              <strong>à</strong> seulement 20 ans.
            </p>
            <p>
              Le podium a été complété par Lewis Hamilton, et la{" "}
              <strong>4e</strong> place <strong>est revenue à</strong> mon{" "}
              <strong>2e pilote</strong> préféré, Charles{" "}
              <strong>Leclerc</strong>.
            </p>
          </Copie>
        </Corrige>
      </section>

      <section>
        <h2>2. L’accord avec être</h2>

        <p>
          Dans ton texte : <s className="fr">l’attention a été remporté</s>,{" "}
          <s className="fr">Antonelli est devenue</s>. Mais{" "}
          <span className="fr">le podium a été complété</span> est juste. Avec{" "}
          <span className="fr">être</span>, le mot qui suit change avec le
          sujet.
        </p>

        <div className="rule">
          Après <span className="fr">est</span> ou{" "}
          <span className="fr">a été</span>, regarde le sujet.{" "}
          <span className="fr">elle</span> : un <span className="fr">e</span>.{" "}
          <span className="fr">ils</span> : un <span className="fr">s</span>.{" "}
          <span className="fr">il</span> : rien.
        </div>

        <div className="example">
          l’attention a été capt<strong>ée</strong> · Antonelli est devenu ·
          les pilotes sont rentr<strong>és</strong>
        </div>

        <Choix
          items={ACCORD}
          consigne="Choisis la bonne forme. Regarde d’abord le sujet."
          nom="l’accord avec être"
        />
      </section>

      <section>
        <h2>3. Les doubles consonnes</h2>

        <p>
          Dans ton texte : <s className="fr">passionante</s>,{" "}
          <s className="fr">personellement</s>,{" "}
          <s className="fr">officielment</s>. L’espagnol écrit une seule
          consonne (<i lang="es">pasión</i>, <i lang="es">personal</i>,{" "}
          <i lang="es">oficial</i>), et ta main la recopie. Le français en
          met souvent deux.
        </p>

        <div className="rule">
          <span className="fr">passion</span>,{" "}
          <span className="fr">personnel</span>,{" "}
          <span className="fr">officiel</span> : deux consonnes. Et les mots
          faits avec eux les gardent :{" "}
          <span className="fr">passionnante</span>,{" "}
          <span className="fr">personnellement</span>,{" "}
          <span className="fr">officiellement</span>.
        </div>

        <Choix
          items={DOUBLES}
          consigne="Choisis la bonne forme."
          nom="les doubles consonnes"
        />
      </section>

      <section>
        <h2>4. Le plus jeune à…</h2>

        <p>
          Dans ton texte : <s className="fr">le conducteur le plus jeune a
          gagné</s>. En espagnol, <i lang="es">el más joven en ganar</i>. En
          français, c’est <span className="fr">à</span>.
        </p>

        <div className="rule">
          <span className="fr">le plus jeune</span>,{" "}
          <span className="fr">le premier</span>,{" "}
          <span className="fr">le dernier</span>,{" "}
          <span className="fr">le seul</span> : puis{" "}
          <span className="fr">à</span> et le verbe.
        </div>

        <div className="example">
          le plus jeune pilote <strong>à gagner</strong> le titre
        </div>

        <Choix
          items={A}
          consigne="Choisis la bonne forme."
          nom="le plus jeune à"
        />
      </section>

      <section>
        <h2>5. Comme on dit</h2>

        <p>
          Ces mots de ton texte se comprennent, mais en français on les dit
          autrement. Quand on parle plusieurs langues, l’une se glisse parfois
          dans l’autre : ici, l’espagnol (<i lang="es">conductor</i>,{" "}
          <i lang="es">con solo 20 años</i>) et l’anglais (WDC).
        </p>

        <div className="example">
          le pilote · le titre de champion du monde · à 20 ans · l’attention
          est captée
        </div>

        <Choix
          items={MOTS}
          consigne="Choisis la façon de le dire."
          nom="comme on dit"
        />
      </section>

      <section>
        <h2>6. Les chiffres et les majuscules</h2>

        <p>
          Dans ton texte : <s className="fr">4ème</s>,{" "}
          <s className="fr">2ème</s>, <s className="fr">leclerc</s>,{" "}
          <s className="fr">grand prix</s>.
        </p>

        <div className="rule">
          Après le chiffre, juste un <span className="fr">e</span> :{" "}
          <span className="fr">4e</span>, <span className="fr">2e</span>. Un
          nom propre prend une majuscule :{" "}
          <span className="fr">Leclerc</span>,{" "}
          <span className="fr">le Grand Prix</span>.
        </div>

        <Choix
          items={SIGNES}
          consigne="Choisis la bonne forme."
          nom="les chiffres et les majuscules"
        />
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <strong>Avec être</strong>, le mot qui suit change avec le sujet :{" "}
            <span className="fr">l’attention a été captée</span>,{" "}
            <span className="fr">Antonelli est devenu</span>.
          </li>
          <li>
            <strong>Une consonne en espagnol, souvent deux en français</strong>{" "}
            : <span className="fr">passionnante</span>,{" "}
            <span className="fr">personnellement</span>,{" "}
            <span className="fr">officiellement</span>.
          </li>
          <li>
            <strong>le plus jeune, le premier, le seul :</strong>{" "}
            <span className="fr">à</span> et le verbe.
          </li>
          <li>
            <strong>Comme on dit :</strong> <span className="fr">pilote</span>
            , <span className="fr">champion du monde</span>,{" "}
            <span className="fr">à 20 ans</span>.
          </li>
          <li>
            <strong>4e, 2e</strong>, et une majuscule aux noms :{" "}
            <span className="fr">Leclerc</span>,{" "}
            <span className="fr">Grand Prix</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
