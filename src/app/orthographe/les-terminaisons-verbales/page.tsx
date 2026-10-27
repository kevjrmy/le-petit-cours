import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-terminaisons-verbales";

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

function W({ children }: { children: ReactNode }) {
  return (
    <s className="fr" lang="fr">
      {children}
    </s>
  );
}

const SWAP_ROWS = [
  {
    write: "-er",
    swap: "il va mordre → il va manger",
    example: "Il va manger avant de sortir.",
  },
  {
    write: "-é",
    swap: "il a mordu → il a mangé",
    example: "Il a mangé toute la pizza.",
  },
  {
    write: "-ez",
    swap: "vous mordez → vous mangez",
    example: "Vous mangez avec nous ce soir ?",
  },
];

const SWAP_ROLES: Record<Lang, ReactNode[]> = {
  fr: [
    <>infinitif, après un verbe conjugué ou une préposition</>,
    <>
      participe passé, après avoir ou être (avec être, il s’accorde : elle est
      allée)
    </>,
    <>vous, au présent</>,
  ],
  es: [
    <>infinitivo, después de un verbo conjugado o de una preposición</>,
    <>
      participio, después de <F>avoir</F> o <F>être</F> (con <F>être</F>,
      concuerda: <F>elle est allée</F>)
    </>,
    <>
      <F>vous</F>, en presente
    </>,
  ],
};

function SwapTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Rôle du verbe", "On écrit", "Remplacez par « mordre »", "Exemple"]
      : ["Papel del verbo", "Se escribe", "Sustituye por «mordre»", "Ejemplo"];
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
          {SWAP_ROWS.map((row, i) => (
            <tr key={row.write}>
              <th scope="row">{SWAP_ROLES[lang][i]}</th>
              <td className="fr" lang="fr">
                {row.write}
              </td>
              <td className="fr" lang="fr">
                {row.swap}
              </td>
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

const WRONG_RIGHT = [
  { wrong: "j’ai manger", right: "j’ai mangé" },
  { wrong: "il va mangé", right: "il va manger" },
  { wrong: "vous mangé", right: "vous mangez" },
];

function WrongRight({ lang }: { lang: Lang }) {
  return (
    <div className="example">
      {WRONG_RIGHT.map((row, i) => (
        <span key={row.wrong}>
          {i > 0 && <br />}
          {lang === "fr" ? "On n’écrit pas " : "No se escribe "}
          <W>{lang === "fr" ? `« ${row.wrong} »` : `«${row.wrong}»`}</W>
          {lang === "fr" ? ", on écrit " : ", se escribe "}
          <F>{lang === "fr" ? `« ${row.right} »` : `«${row.right}»`}</F>.
        </span>
      ))}
    </div>
  );
}

const IMPARFAIT_ROWS = [
  { subject: "je, tu", ending: "-ais", example: "Je regardais la télévision tous les soirs." },
  { subject: "il, elle, on", ending: "-ait", example: "Il habitait à Madrid quand il était petit." },
];

function ImparfaitTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Sujet", "Terminaison", "Exemple"]
      : ["Sujeto", "Terminación", "Ejemplo"];
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
          {IMPARFAIT_ROWS.map((row) => (
            <tr key={row.subject}>
              <th scope="row" className="fr" lang="fr">
                {row.subject}
              </th>
              <td className="fr" lang="fr">
                {row.ending}
              </td>
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

function TimeExample({ lang }: { lang: Lang }) {
  const labels =
    lang === "fr"
      ? ["une seule fois", "une habitude"]
      : ["una sola vez", "una costumbre"];
  return (
    <div className="example" lang="fr">
      Hier, j’ai mangé chez ma tante.{" "}
      <span lang={lang}>
        → {labels[0]} :
      </span>{" "}
      -é
      <br />
      Quand j’étais petite, je mangeais chez ma tante tous les dimanches.{" "}
      <span lang={lang}>
        → {labels[1]} :
      </span>{" "}
      -ais
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Le même son, trois terminaisons</h2>

        <div className="rule">
          À la fin d’un verbe du premier groupe, un seul son sert à trois
          emplois : l’infinitif, le participe passé, le <F>vous</F> du présent.
          L’oreille entend la même chose dans les trois cas, donc elle ne peut
          pas choisir. C’est le rôle du verbe dans la phrase qui décide de
          l’orthographe.
        </div>

        <p>
          Le repère le plus sûr est un remplacement. On prend un verbe du
          deuxième ou du troisième groupe dont l’infinitif et le participe passé
          ne se prononcent pas pareil, par exemple <F>mordre</F> et <F>mordu</F>
          , et on le met à la place du verbe qui pose problème. La phrase garde
          son sens, et la terminaison, elle, s’entend enfin.
        </p>

        <SwapTable
          lang="fr"
          caption="Le remplacement par « mordre » qui décide de la terminaison"
        />

        <WrongRight lang="fr" />

        <div className="exception">
          Un verbe du premier groupe ne peut pas servir de remplacement :{" "}
          <F>chanter</F> et <F>chanté</F> se prononcent pareil, eux aussi, et ne
          tranchent rien. Choisissez toujours un verbe du deuxième ou du
          troisième groupe, comme <F>mordre / mordu</F> ou <F>finir / fini</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El mismo sonido, tres terminaciones</h2>

        <div className="rule">
          Al final de un verbo del primer grupo, un solo sonido sirve para tres
          usos: el infinitivo, el participio, el <F>vous</F> del presente. El
          oído oye lo mismo en los tres casos, así que no puede elegir. Lo que
          decide la ortografía es el papel del verbo en la frase.
        </div>

        <p>
          La referencia más segura es una sustitución. Se toma un verbo del
          segundo o del tercer grupo cuyo infinitivo y participio no suenan
          igual, por ejemplo <F>mordre</F> y <F>mordu</F>, y se pone en lugar del
          verbo que plantea el problema. La frase conserva su sentido, y la
          terminación, por fin, se oye.
        </p>

        <SwapTable
          lang="es"
          caption="La sustitución por «mordre» que decide la terminación"
        />

        <WrongRight lang="es" />

        <div className="exception">
          Un verbo del primer grupo no puede servir de sustitución:{" "}
          <F>chanter</F> y <F>chanté</F> suenan igual, ellos también, y no
          deciden nada. Elige siempre un verbo del segundo o del tercer grupo,
          como <F>mordre / mordu</F> o <F>finir / fini</F>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Un autre son : -ais et -ait à l’imparfait</h2>

        <div className="rule">
          <F>-ais</F> et <F>-ait</F> n’ont pas le même son que <F>-é</F> : la
          bouche s’ouvre davantage, comme dans <F>après</F> plutôt que comme dans{" "}
          <F>café</F>. Mais chez beaucoup de gens, cette différence s’efface à
          l’oreille, et c’est là que <W>« je mangé »</W> s’écrit à la place de{" "}
          <F>« je mangeais »</F>.
        </div>

        <p>
          Ce n’est pas un participe : c’est le verbe lui-même, conjugué, sans
          avoir ni être devant. <F>-ais</F> suit <F>je</F> et <F>tu</F>,{" "}
          <F>-ait</F> suit <F>il</F>, <F>elle</F> et <F>on</F>.
        </p>

        <ImparfaitTable
          lang="fr"
          caption="La terminaison de l’imparfait selon le sujet"
        />

        <p>
          Un repère de temps aide aussi à choisir entre les deux terminaisons.{" "}
          <F>hier</F>, <F>un jour</F>, <F>tout à coup</F> annoncent une action
          unique, terminée : c’est le passé composé, avec <F>avoir</F> ou{" "}
          <F>être</F> devant le participe en <F>-é</F>. <F>tous les jours</F>,{" "}
          <F>souvent</F>, <F>quand j’étais petit</F> annoncent une habitude :
          c’est <F>-ais</F> ou <F>-ait</F>.
        </p>

        <TimeExample lang="fr" />

        <div className="astuce">
          <p className="astuce-hook">Avec « nous », les deux temps s’entendent.</p>
          <p>
            Sans repère de temps, remplacez le sujet par <F>nous</F>. Si le verbe
            se termine par <F>-ions</F> (<F>nous mangions</F>), c’est
            l’imparfait. S’il faut <F>avons</F> ou <F>sommes</F> devant le
            participe (<F>nous avons mangé</F>), c’est le passé composé. À la
            première personne du pluriel, les deux s’entendent très bien, même
            quand <F>-ais</F> et <F>-é</F> se ressemblent.
          </p>
        </div>

        <div className="attention">
          À l’imparfait, la terminaison ne s’écrit jamais <F>-é</F> :{" "}
          <W>« je mangé »</W> n’existe pas, seul <F>« je mangeais »</F> est
          correct. Et le participe en <F>-é</F> ne s’écrit jamais seul, comme un
          verbe conjugué : <W>« il mangé »</W> n’existe pas non plus, il faut{" "}
          <F>« il a mangé »</F> ou <F>« il mangeait »</F>, selon ce que la phrase
          raconte.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Otro sonido: <F>-ais</F> y <F>-ait</F> en imperfecto
        </h2>

        <div className="rule">
          <F>-ais</F> y <F>-ait</F> no suenan igual que <F>-é</F>: la boca se
          abre más, como en <F>après</F> y no como en <F>café</F>. Pero en mucha
          gente esa diferencia se borra al oído, y ahí es donde{" "}
          <W>«je mangé»</W> se escribe en lugar de <F>«je mangeais»</F>.
        </div>

        <p>
          No es un participio: es el verbo mismo, conjugado, sin <F>avoir</F> ni{" "}
          <F>être</F> delante. <F>-ais</F> sigue a <F>je</F> y <F>tu</F>,{" "}
          <F>-ait</F> sigue a <F>il</F>, <F>elle</F> y <F>on</F>.
        </p>

        <ImparfaitTable
          lang="es"
          caption="La terminación del imperfecto según el sujeto"
        />

        <p>
          Una referencia de tiempo también ayuda a elegir entre las dos
          terminaciones. <F>hier</F>, <F>un jour</F>, <F>tout à coup</F> anuncian
          una acción única, terminada: es el passé composé, con <F>avoir</F> o{" "}
          <F>être</F> delante del participio en <F>-é</F>. <F>tous les jours</F>,{" "}
          <F>souvent</F>, <F>quand j’étais petit</F> anuncian una costumbre: es{" "}
          <F>-ais</F> o <F>-ait</F>.
        </p>

        <TimeExample lang="es" />

        <div className="astuce">
          <p className="astuce-hook">Con «nous», los dos tiempos se oyen.</p>
          <p>
            Sin referencia de tiempo, sustituye el sujeto por <F>nous</F>. Si el
            verbo termina en <F>-ions</F> (<F>nous mangions</F>), es el
            imperfecto. Si hace falta <F>avons</F> o <F>sommes</F> delante del
            participio (<F>nous avons mangé</F>), es el passé composé. En la
            primera persona del plural, los dos se oyen muy bien, incluso cuando{" "}
            <F>-ais</F> y <F>-é</F> se parecen.
          </p>
        </div>

        <div className="attention">
          En imperfecto, la terminación nunca se escribe <F>-é</F>:{" "}
          <W>«je mangé»</W> no existe, solo <F>«je mangeais»</F> es correcto.
          Y el participio en <F>-é</F> nunca se escribe solo, como un verbo
          conjugado: <W>«il mangé»</W> tampoco existe, hace falta{" "}
          <F>«il a mangé»</F> o <F>«il mangeait»</F>, según lo que cuente la
          frase.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            À la fin d’un verbe du premier groupe, <F>-er</F>, <F>-é</F> et{" "}
            <F>-ez</F> se prononcent pareil : c’est le rôle du verbe dans la
            phrase qui décide de l’orthographe, jamais l’oreille.
          </li>
          <li>
            Le test : remplacer le verbe par un verbe comme <F>mordre</F>, dont
            l’infinitif et le participe se prononcent différemment. <F>-er</F> si{" "}
            <F>mordre</F> convient, <F>-é</F> si <F>mordu</F> convient,{" "}
            <F>-ez</F> si <F>mordez</F> convient.
          </li>
          <li>
            <F>-ais</F> (<F>je</F>, <F>tu</F>) et <F>-ait</F> (<F>il, elle, on</F>
            ) sont l’imparfait : un verbe conjugué seul, jamais un participe,
            pour une habitude.
          </li>
          <li>
            Un repère de temps aide à choisir : <F>hier</F>, <F>un jour</F> pour
            le passé composé, <F>tous les jours</F>, <F>souvent</F> pour
            l’imparfait.
          </li>
          <li>
            Sans repère de temps, remplacer le sujet par <F>nous</F> :{" "}
            <F>-ions</F>, c’est l’imparfait ; <F>avons</F> ou <F>sommes</F>{" "}
            devant le participe, c’est le passé composé.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Al final de un verbo del primer grupo, <F>-er</F>, <F>-é</F> y{" "}
            <F>-ez</F> suenan igual: lo que decide la ortografía es el papel del
            verbo en la frase, nunca el oído.
          </li>
          <li>
            El test: sustituir el verbo por un verbo como <F>mordre</F>, cuyo
            infinitivo y participio suenan distinto. <F>-er</F> si encaja{" "}
            <F>mordre</F>, <F>-é</F> si encaja <F>mordu</F>, <F>-ez</F> si encaja{" "}
            <F>mordez</F>.
          </li>
          <li>
            <F>-ais</F> (<F>je</F>, <F>tu</F>) y <F>-ait</F> (<F>il, elle, on</F>
            ) son el imperfecto: un verbo conjugado solo, nunca un participio,
            para una costumbre.
          </li>
          <li>
            Una referencia de tiempo ayuda a elegir: <F>hier</F>, <F>un jour</F>{" "}
            para el passé composé, <F>tous les jours</F>, <F>souvent</F> para el
            imperfecto.
          </li>
          <li>
            Sin referencia de tiempo, sustituir el sujeto por <F>nous</F>:{" "}
            <F>-ions</F>, es el imperfecto; <F>avons</F> o <F>sommes</F> delante
            del participio, es el passé composé.
          </li>
        </ul>
      </div>
    </article>
  );
}
