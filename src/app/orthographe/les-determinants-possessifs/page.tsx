import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-determinants-possessifs";

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

const FORMS = [
  { owner: "je", masc: "mon livre", fem: "ma clé", plural: "mes chaussures" },
  { owner: "tu", masc: "ton livre", fem: "ta clé", plural: "tes chaussures" },
  { owner: "il / elle", masc: "son livre", fem: "sa clé", plural: "ses chaussures" },
  { owner: "nous", masc: "notre livre", fem: "notre clé", plural: "nos chaussures" },
  { owner: "vous", masc: "votre livre", fem: "votre clé", plural: "vos chaussures" },
  { owner: "ils / elles", masc: "leur livre", fem: "leur clé", plural: "leurs chaussures" },
];

function FormsTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Le possesseur", "Nom masculin", "Nom féminin", "Nom pluriel"]
      : ["El poseedor", "Sustantivo masculino", "Sustantivo femenino", "Sustantivo plural"];
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
          {FORMS.map((row) => (
            <tr key={row.owner}>
              <th scope="row" className="fr" lang="fr">
                {row.owner}
              </th>
              <td className="fr" lang="fr">
                {row.masc}
              </td>
              <td className="fr" lang="fr">
                {row.fem}
              </td>
              <td className="fr" lang="fr">
                {row.plural}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AgreeExample() {
  return (
    <div className="example" lang="fr">
      Paul lit <strong>sa</strong> lettre. · Marie lit <strong>sa</strong>{" "}
      lettre.
      <br />
      Paul range <strong>son</strong> sac. · Marie range <strong>son</strong>{" "}
      sac.
    </div>
  );
}

function VowelExample() {
  return (
    <div className="example" lang="fr">
      <strong>mon</strong> amie · <strong>ton</strong> école ·{" "}
      <strong>son</strong> histoire · <strong>mon</strong> adresse
    </div>
  );
}

const CONFUSIONS = [
  { pair: "ses / ces", example: "Ces clés-là sont à moi. · Il cherche ses clés." },
  { pair: "son / sont", example: "Son frère travaille ici. · Les enfants sont partis." },
  { pair: "leur / leurs", example: "leur maison · leurs enfants" },
];

function ConfusionsTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr" ? ["Paire", "Le test", "Exemple"] : ["Pareja", "El test", "Ejemplo"];
  const tests: Record<Lang, ReactNode[]> = {
    fr: [
      <>
        ajoutez <F>-là</F> après le nom : si la phrase tient, c’est <F>ces</F>
      </>,
      <>
        remplacez par <F>étaient</F> : si ça marche, c’est <F>sont</F>
      </>,
      <>
        comptez le nom qui suit : un seul objet, <F>leur</F>
      </>,
    ],
    es: [
      <>
        añade <F>-là</F> después del sustantivo: si la frase se sostiene, es{" "}
        <F>ces</F>
      </>,
      <>
        sustituye por <F>étaient</F>: si funciona, es <F>sont</F>
      </>,
      <>
        cuenta el sustantivo que sigue: un solo objeto, <F>leur</F>
      </>,
    ],
  };
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
          {CONFUSIONS.map((row, i) => (
            <tr key={row.pair}>
              <th scope="row" className="fr" lang="fr">
                {row.pair}
              </th>
              <td>{tests[lang][i]}</td>
              <td className="fr" lang="fr">
                {row.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Il s’accorde avec l’objet, pas avec la personne</h2>

        <div className="rule">
          Le déterminant possessif se met devant un nom et dit à qui la chose
          appartient. Il s’accorde en genre et en nombre avec{" "}
          <strong>le nom qu’il accompagne</strong>, jamais avec la personne qui
          possède.
        </div>

        <AgreeExample />

        <p>
          <F>sa</F> ne dit rien de Paul ni de Marie : il dit seulement que{" "}
          <F>lettre</F> est un nom féminin singulier. Le possesseur est déjà dans
          le mot, dans le <F>s</F> de départ.
        </p>

        <FormsTable
          lang="fr"
          caption="Les formes, lues de gauche à droite selon le nom qui suit"
        />

        <div className="attention">
          Les trois dernières lignes n’ont que deux formes au lieu de trois :{" "}
          <F>notre</F>, <F>votre</F> et <F>leur</F> ne changent pas au féminin.
          Seul le pluriel les fait bouger.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Concuerda con el objeto, no con la persona</h2>

        <div className="rule">
          El determinante posesivo va delante de un sustantivo y dice a quién
          pertenece la cosa. Concuerda en género y número con{" "}
          <strong>el sustantivo que acompaña</strong>, nunca con la persona que
          posee.
        </div>

        <AgreeExample />

        <p>
          <F>sa</F> no dice nada de Paul ni de Marie: solo dice que{" "}
          <F>lettre</F> es un sustantivo femenino singular. El poseedor ya está en la
          palabra, en la <F>s</F> inicial.
        </p>

        <FormsTable
          lang="es"
          caption="Las formas, leídas de izquierda a derecha según el sustantivo que sigue"
        />

        <div className="attention">
          Las tres últimas filas tienen solo dos formas en lugar de tres:{" "}
          <F>notre</F>, <F>votre</F> y <F>leur</F> no cambian en femenino. Solo
          el plural las hace cambiar.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Devant une voyelle, le féminin prend la forme du masculin</h2>

        <div className="rule">
          Devant un nom féminin qui commence par une voyelle ou un <F>h</F>{" "}
          muet, on écrit <F>mon</F>, <F>ton</F>, <F>son</F>, et non <F>ma</F>,{" "}
          <F>ta</F>, <F>sa</F>.
        </div>

        <VowelExample />

        <p>
          Le nom reste féminin : on écrit <F>mon amie est partie</F>, avec le{" "}
          <F>e</F> de l’accord. Seul le déterminant a changé de forme, et
          seulement pour éviter deux voyelles qui se heurtent.
        </p>

        <div className="exception">
          Devant un <F>h</F> aspiré, la règle ne s’applique pas, parce que le
          heurt n’a pas lieu : on écrit <F>sa hauteur</F>, <F>ma honte</F>. Ces
          mots sont peu nombreux et s’apprennent un par un.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Delante de una vocal, el femenino toma la forma del masculino</h2>

        <div className="rule">
          Delante de un sustantivo femenino que empieza por vocal o por <F>h</F>{" "}
          muda, se escribe <F>mon</F>, <F>ton</F>, <F>son</F>, y no <F>ma</F>,{" "}
          <F>ta</F>, <F>sa</F>.
        </div>

        <VowelExample />

        <p>
          El sustantivo sigue siendo femenino: se escribe <F>mon amie est partie</F>,
          con la <F>e</F> de la concordancia. Solo ha cambiado la forma del
          determinante, y solo para evitar que choquen dos vocales.
        </p>

        <div className="exception">
          Delante de una <F>h</F> aspirada, la regla no se aplica, porque el
          choque no se produce: se escribe <F>sa hauteur</F>, <F>ma honte</F>.
          Estas palabras son pocas y se aprenden una a una.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les trois confusions à l’écrit</h2>

        <p>
          Ces formes se prononcent comme d’autres mots. À l’oral personne ne le
          remarque ; à l’écrit, il faut décider.
        </p>

        <ConfusionsTable
          lang="fr"
          caption="Trois paires qui se disent pareil, et le test qui les sépare"
        />

        <div className="attention">
          <F>leur</F> devant un verbe est un autre mot, et celui-là ne prend
          jamais de <F>s</F> : <F>je leur ai parlé</F>,{" "}
          <F>elle leur donne un livre</F>. Le <F>s</F> n’apparaît que devant un
          nom pluriel.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Devant un nom, un possessif. Devant un verbe, autre chose.
          </p>
          <p>
            Les trois paires se règlent avec la même question : qu’est-ce qui
            vient juste après ? <F>ses clés</F>, <F>leur maison</F>,{" "}
            <F>son frère</F> sont suivis d’un nom. <F>sont partis</F> et{" "}
            <F>leur ai parlé</F> sont suivis d’un verbe, et ne sont donc pas des
            possessifs.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las tres confusiones al escribir</h2>

        <p>
          Estas formas suenan como otras palabras. Al hablar nadie lo nota; al
          escribir, hay que decidir.
        </p>

        <ConfusionsTable
          lang="es"
          caption="Tres parejas que suenan igual, y el test que las separa"
        />

        <div className="attention">
          <F>leur</F> delante de un verbo es otra palabra, y esa nunca lleva{" "}
          <F>s</F>: <F>je leur ai parlé</F>, <F>elle leur donne un livre</F>. La{" "}
          <F>s</F> solo aparece delante de un sustantivo en plural.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Delante de un sustantivo, un posesivo. Delante de un verbo, otra cosa.
          </p>
          <p>
            Las tres parejas se resuelven con la misma pregunta: ¿qué viene justo
            después? <F>ses clés</F>, <F>leur maison</F>, <F>son frère</F> van
            seguidos de un sustantivo. <F>sont partis</F> y <F>leur ai parlé</F> van
            seguidos de un verbo, y por tanto no son posesivos.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le possessif s’accorde avec le nom qui suit, jamais avec la personne
            qui possède : <F>sa lettre</F> pour Paul comme pour Marie.
          </li>
          <li>
            <F>notre</F>, <F>votre</F> et <F>leur</F> n’ont pas de forme
            féminine ; seul le pluriel les change.
          </li>
          <li>
            Devant un nom féminin commençant par une voyelle : <F>mon amie</F>,{" "}
            <F>ton école</F>. Le nom, lui, reste féminin.
          </li>
          <li>
            Trois tests : <F>ces</F> accepte <F>-là</F> après le nom, <F>sont</F>{" "}
            se remplace par <F>étaient</F>, et <F>leurs</F> se compte sur le nom
            qui suit.
          </li>
          <li>
            Devant un verbe, <F>leur</F> ne prend jamais de <F>s</F>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El posesivo concuerda con el sustantivo que sigue, nunca con la persona
            que posee: <F>sa lettre</F> para Paul igual que para Marie.
          </li>
          <li>
            <F>notre</F>, <F>votre</F> y <F>leur</F> no tienen forma femenina;
            solo el plural las cambia.
          </li>
          <li>
            Delante de un sustantivo femenino que empieza por vocal: <F>mon amie</F>,{" "}
            <F>ton école</F>. El sustantivo, en cambio, sigue siendo femenino.
          </li>
          <li>
            Tres tests: <F>ces</F> admite <F>-là</F> después del sustantivo,{" "}
            <F>sont</F> se sustituye por <F>étaient</F>, y <F>leurs</F> se decide
            contando el sustantivo que sigue.
          </li>
          <li>
            Delante de un verbo, <F>leur</F> nunca lleva <F>s</F>.
          </li>
        </ul>
      </div>
    </article>
  );
}
