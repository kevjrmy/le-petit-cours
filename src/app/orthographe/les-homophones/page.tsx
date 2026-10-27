import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-homophones";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

const PAIRS = [
  { pair: "a / à", swap: "avait", works: "a (verbe avoir)" },
  { pair: "et / est", swap: "était", works: "est (verbe être)" },
  { pair: "on / ont", swap: "avaient", works: "ont (verbe avoir)" },
  { pair: "son / sont", swap: "étaient", works: "sont (verbe être)" },
];

function PairsTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Paire", "Remplacez par", "Si ça marche"]
      : ["Pareja", "Sustituye por", "Si funciona"];
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {heads.map((head) => (
              <th key={head} scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PAIRS.map((row) => (
            <tr key={row.pair}>
              <th scope="row" className="fr" lang="fr">
                {row.pair}
              </th>
              <td className="fr" lang="fr">
                {row.swap}
              </td>
              <td className="fr" lang="fr">
                {row.works}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TestExample({ lang }: { lang: Lang }) {
  const labels =
    lang === "fr" ? ["verbe", "préposition"] : ["verbo", "preposición"];
  return (
    <div className="example" lang="fr">
      Il <strong>a</strong> faim → Il <strong>avait</strong> faim. ✓{" "}
      <span lang={lang}>{labels[0]}</span>
      <br />
      Il va <strong>à</strong> Paris → Il va <strong>avait</strong> Paris. ✗{" "}
      <span lang={lang}>{labels[1]}</span>
    </div>
  );
}

function AExample() {
  return (
    <div className="example" lang="fr">
      Elle <strong>a</strong> deux enfants. · Nous partons <strong>à</strong>{" "}
      midi. · Il pense <strong>à</strong> son travail.
    </div>
  );
}

function EtExample() {
  return (
    <div className="example" lang="fr">
      Paul <strong>et</strong> Marie. · Le café <strong>est</strong> chaud. · Il{" "}
      <strong>est</strong> tard <strong>et</strong> je suis fatigué.
    </div>
  );
}

function OnExample() {
  return (
    <div className="example" lang="fr">
      <strong>On</strong> mange à huit heures. · Ils <strong>ont</strong>{" "}
      répondu. · <strong>On</strong> dit qu’ils <strong>ont</strong> déménagé.
    </div>
  );
}

function SonExample() {
  return (
    <div className="example" lang="fr">
      <strong>Son</strong> frère travaille ici. · Les enfants{" "}
      <strong>sont</strong> partis. · <strong>Son</strong> sac et{" "}
      <strong>son</strong> manteau <strong>sont</strong> sur la table.
    </div>
  );
}

function OuExample() {
  return (
    <div className="example" lang="fr">
      Du thé <strong>ou</strong> du café ? → du thé <strong>ou bien</strong> du
      café ? ✓
      <br />
      <strong>Où</strong> est la gare ? · Le jour <strong>où</strong> je suis
      arrivé.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Un test, pas une leçon par mot</h2>

        <div className="rule">
          Deux mots se prononcent pareil et s’écrivent autrement. Pour choisir,
          on ne devine pas : on <strong>remplace</strong> le mot par sa forme à
          un autre temps. Si la phrase tient debout, c’est le verbe ; sinon,
          c’est l’autre mot.
        </div>

        <PairsTable lang="fr" caption="Le remplacement qui décide, paire par paire" />

        <TestExample lang="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>Un test, no una lección por palabra</h2>

        <div className="rule">
          Dos palabras suenan igual y se escriben de forma distinta. Para
          elegir, no se adivina: se <strong>sustituye</strong> la palabra por su
          forma en otro tiempo. Si la frase se sostiene, es el verbo; si no, es
          la otra palabra.
        </div>

        <PairsTable lang="es" caption="La sustitución que decide, pareja por pareja" />

        <TestExample lang="es" />
      </section>

      <section data-ui="fr">
        <h2>Les quatre paires, une par une</h2>

        <h3>a / à</h3>
        <p>
          <F>a</F> est le verbe <F>avoir</F>. <F>à</F>, avec son accent, est une
          préposition : elle indique le lieu, l’heure, le destinataire.
        </p>
        <AExample />

        <h3>et / est</h3>
        <p>
          <F>et</F> ajoute quelque chose ; il relie deux mots. <F>est</F> est le
          verbe <F>être</F>.
        </p>
        <EtExample />

        <h3>on / ont</h3>
        <p>
          <F>on</F> est un sujet : il remplace <F>nous</F> ou <F>les gens</F>.{" "}
          <F>ont</F> est le verbe <F>avoir</F> au pluriel.
        </p>
        <OnExample />

        <h3>son / sont</h3>
        <p>
          <F>son</F> dit à qui la chose appartient ; on peut le remplacer par{" "}
          <F>mon</F>. <F>sont</F> est le verbe <F>être</F> au pluriel.
        </p>
        <SonExample />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las cuatro parejas, una a una</h2>

        <h3>
          <F>a / à</F>
        </h3>
        <p>
          <F>a</F> es el verbo <F>avoir</F>. <F>à</F>, con su acento, es una
          preposición: indica el lugar, la hora, el destinatario.
        </p>
        <AExample />

        <h3>
          <F>et / est</F>
        </h3>
        <p>
          <F>et</F> añade algo; une dos palabras. <F>est</F> es el verbo{" "}
          <F>être</F>.
        </p>
        <EtExample />

        <h3>
          <F>on / ont</F>
        </h3>
        <p>
          <F>on</F> es un sujeto: sustituye a <F>nous</F> o a <F>les gens</F>.{" "}
          <F>ont</F> es el verbo <F>avoir</F> en plural.
        </p>
        <OnExample />

        <h3>
          <F>son / sont</F>
        </h3>
        <p>
          <F>son</F> dice a quién pertenece la cosa; se puede sustituir por{" "}
          <F>mon</F>. <F>sont</F> es el verbo <F>être</F> en plural.
        </p>
        <SonExample />
      </section>

      <section data-ui="fr">
        <h2>ou / où : le cas à part</h2>

        <div className="rule">
          Ici, aucun des deux n’est un verbe, donc le test du remplacement
          change : <F>ou</F> peut se remplacer par <F>ou bien</F>. <F>où</F>,
          avec son accent, parle toujours d’un <strong>lieu</strong> ou d’un{" "}
          <strong>moment</strong>.
        </div>

        <OuExample />

        <div className="astuce">
          <p className="astuce-hook">L’accent penche vers le lieu</p>
          <p>
            <F>à</F>, <F>où</F> : les deux mots accentués de cette page
            indiquent le plus souvent un endroit ou un moment, et ne sont
            jamais un verbe. Le moyen le plus sûr reste le remplacement, mais quand vous hésitez une seconde
            de trop, l’accent est un bon indice.
          </p>
        </div>

        <div className="attention">
          Ces tests marchent parce que l’un des deux mots est un verbe, qu’on
          compare à un autre temps du même verbe. Ils ne disent rien des paires
          où aucun des deux n’en est un — <F>ces / ses</F>, <F>mais / mes</F>,{" "}
          <F>ce / se</F> demandent un autre raisonnement, et l’ont dans{" "}
          <Link href="/orthographe/les-homophones-du-demonstratif">
            Les homophones du démonstratif
          </Link>
          . <F>la / l’a / là</F>, <F>des / dès</F> et <F>du / dû</F> ont la leur
          dans{" "}
          <Link href="/orthographe/les-homophones-de-l-article">
            Les homophones de l’article
          </Link>
          .
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>ou / où</F>: el caso aparte
        </h2>

        <div className="rule">
          Aquí ninguna de las dos es un verbo, así que el test de sustitución
          cambia: <F>ou</F> se puede sustituir por <F>ou bien</F>. <F>où</F>,
          con su acento, habla siempre de un <strong>lugar</strong> o de un{" "}
          <strong>momento</strong>.
        </div>

        <OuExample />

        <div className="astuce">
          <p className="astuce-hook">El acento se inclina hacia el lugar</p>
          <p>
            <F>à</F>, <F>où</F>: las dos palabras acentuadas de esta página
            indican casi siempre un lugar o un momento, y nunca son un verbo.
            El método más seguro sigue siendo la sustitución, pero cuando dudes un segundo de
            más, el acento es una buena pista.
          </p>
        </div>

        <div className="attention">
          Estos tests funcionan porque una de las dos palabras es un verbo, que
          se compara con otro tiempo del mismo verbo. No dicen nada de las
          parejas en las que ninguna lo es: <F>ces / ses</F>,{" "}
          <F>mais / mes</F>, <F>ce / se</F> piden otro razonamiento, y lo tienes
          en{" "}
          <Link href="/orthographe/les-homophones-du-demonstratif" lang="fr">
            Les homophones du démonstratif
          </Link>
          . <F>la / l’a / là</F>, <F>des / dès</F> y <F>du / dû</F> tienen el
          suyo en{" "}
          <Link href="/orthographe/les-homophones-de-l-article" lang="fr">
            Les homophones de l’article
          </Link>
          .
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le test : on remplace le mot par le même verbe à un autre temps. Si
            la phrase tient debout, c’est le verbe.
          </li>
          <li>
            <F>a → avait</F>, <F>est → était</F>, <F>ont → avaient</F>,{" "}
            <F>sont → étaient</F>.
          </li>
          <li>
            L’autre mot de chaque paire n’est pas un verbe : <F>à</F> est une
            préposition, <F>et</F> relie, <F>on</F> est un sujet, <F>son</F> dit
            à qui la chose appartient.
          </li>
          <li>
            <F>ou</F> se remplace par <F>ou bien</F>. <F>où</F> parle d’un lieu
            ou d’un moment.
          </li>
          <li>
            Le test ne vaut que si l’un des deux mots est un verbe. Les autres
            paires demandent un autre raisonnement.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El test: se sustituye la palabra por el mismo verbo en otro tiempo.
            Si la frase se sostiene, es el verbo.
          </li>
          <li>
            <F>a → avait</F>, <F>est → était</F>, <F>ont → avaient</F>,{" "}
            <F>sont → étaient</F>.
          </li>
          <li>
            La otra palabra de cada pareja no es un verbo: <F>à</F> es una
            preposición, <F>et</F> sirve para unir, <F>on</F> es un sujeto, <F>son</F> dice a
            quién pertenece la cosa.
          </li>
          <li>
            <F>ou</F> se sustituye por <F>ou bien</F>. <F>où</F> habla de un
            lugar o de un momento.
          </li>
          <li>
            El test solo vale si una de las dos palabras es un verbo. Las demás
            parejas piden otro razonamiento.
          </li>
        </ul>
      </div>
    </article>
  );
}
