import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/parler-de-ses-gouts";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the A1 Spanish gloss are written once, below, and shared. */

type Lang = "fr" | "es";

/* A Spanish gloss in brackets: in the French body it is marked as Spanish. */
function Gloss({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <> ({lang === "fr" ? <span lang="es">{children}</span> : children})</>;
}

const TASTES = [
  { expression: "détester", example: "Je déteste le bruit.", gloss: "Odio el ruido." },
  { expression: "ne pas aimer", example: "Je n’aime pas la pluie.", gloss: "No me gusta la lluvia." },
  { expression: "aimer bien", example: "J’aime bien le thé.", gloss: "Me gusta (bastante) el té." },
  { expression: "aimer", example: "Tu aimes la musique.", gloss: "Te gusta la música." },
  { expression: "aimer beaucoup", example: "Elle aime beaucoup le chocolat.", gloss: "Le gusta mucho el chocolate." },
  { expression: "adorer", example: "J’adore la mer.", gloss: "Me encanta el mar." },
];

const ARTICLES = [
  {
    what: { fr: "un goût", es: "un gusto" },
    example: "J’aime le chocolat.",
    gloss: "Me gusta el chocolate.",
  },
  {
    what: { fr: "un goût, au féminin", es: "un gusto, femenino" },
    example: "J’adore la musique.",
    gloss: "Me encanta la música.",
  },
  {
    what: { fr: "un goût, au pluriel", es: "un gusto, plural" },
    example: "Elle aime les chats.",
    gloss: "Le gustan los gatos.",
  },
  {
    what: { fr: "une chose que vous demandez", es: "algo que pides" },
    example: "Je voudrais un café.",
    gloss: "Quisiera un café.",
  },
  {
    what: { fr: "une chose que vous mangez", es: "algo que comes" },
    example: "Je mange du chocolat.",
    gloss: "Como chocolate.",
  },
];

const INFINITIVES = [
  { verb: "aimer", example: "J’aime lire.", gloss: "Me gusta leer." },
  { verb: "adorer", example: "Elle adore danser.", gloss: "Le encanta bailar." },
  { verb: "détester", example: "Je déteste cuisiner.", gloss: "Odio cocinar." },
  { verb: "préférer", example: "Je préfère marcher.", gloss: "Prefiero caminar." },
  { verb: "ne pas aimer", example: "Tu n’aimes pas chanter.", gloss: "No te gusta cantar." },
];

function Head({ lang, cols }: { lang: Lang; cols: [string, string, string][] | [string, string, string] }) {
  const trio = cols as [string, string, string];
  return (
    <thead>
      <tr>
        {(lang === "fr" ? ["fr", "fr", "fr"] : ["es", "es", "es"]).map((_, i) => (
          <th key={i} scope="col">
            {trio[i]}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TastesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les verbes des goûts, du moins aimé au plus aimé"
            : "Los verbos de los gustos, de lo que no te gusta a lo que te encanta"}
        </caption>
        <Head
          lang={lang}
          cols={fr ? ["L’expression", "Exemple", "En espagnol"] : ["La expresión", "Ejemplo", "En español"]}
        />
        <tbody>
          {TASTES.map((row) => (
            <tr key={row.expression}>
              <th scope="row" className="fr" lang="fr">{row.expression}</th>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticlesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? (
            <>
              Le même nom avec les goûts et avec «&nbsp;
              <span className="fr">je voudrais</span>&nbsp;» ou «&nbsp;
              <span className="fr">je mange</span>&nbsp;»
            </>
          ) : (
            <>
              El mismo nombre con los gustos y con «<span className="fr" lang="fr">je voudrais</span>» o «<span className="fr" lang="fr">je mange</span>»
            </>
          )}
        </caption>
        <Head
          lang={lang}
          cols={fr ? ["Ce que vous dites", "Exemple", "En espagnol"] : ["Qué dices", "Ejemplo", "En español"]}
        />
        <tbody>
          {ARTICLES.map((row) => (
            <tr key={row.example}>
              <th scope="row">{row.what[lang]}</th>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfinitivesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les goûts avec un verbe à l’infinitif"
            : "Los gustos con un verbo en infinitivo"}
        </caption>
        <Head
          lang={lang}
          cols={fr ? ["Verbe", "Exemple", "En espagnol"] : ["Verbo", "Ejemplo", "En español"]}
        />
        <tbody>
          {INFINITIVES.map((row) => (
            <tr key={row.example}>
              <th scope="row" className="fr" lang="fr">{row.verb}</th>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
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
        <h2>En français, la personne est le sujet</h2>

        <div className="rule">
          En espagnol, la chose est le sujet : <em lang="es">me gusta el
          café</em>. En français, le sujet est la personne et le verbe est{" "}
          <span className="fr">aimer</span> :{" "}
          <span className="fr">j’aime le café</span>. La phrase se construit à
          l’envers de l’espagnol.
        </div>

        <TastesTable lang="fr" />

        <p>
          Pour comparer, on utilise <span className="fr">préférer</span> :{" "}
          <span className="fr">je préfère le thé</span>
          <Gloss lang="fr">prefiero el té</Gloss>. Avec deux choses, la
          deuxième prend <span className="fr">à</span> :{" "}
          <span className="fr">je préfère le thé au café</span>
          <Gloss lang="fr">prefiero el té al café</Gloss>. Les quatre verbes se
          conjuguent comme{" "}
          <Link href="/conjugaison/parler" lang="fr">parler</Link> ; dans{" "}
          <span className="fr">préférer</span>, un accent change :{" "}
          <span className="fr">je préfère</span>.
        </p>

        <div className="attention">
          <span className="fr">beaucoup</span> et <span className="fr">bien</span>{" "}
          se mettent après le verbe :{" "}
          <span className="fr">j’aime beaucoup le café</span>,{" "}
          <span className="fr">j’aime bien le café</span>. On ne dit pas{" "}
          <s className="fr">j’aime très le café</s>, même si en espagnol on dit{" "}
          <em lang="es">me gusta muchísimo</em>. Et{" "}
          <span className="fr">aimer bien</span> est moins fort qu’
          <span className="fr">aimer</span> : ce n’est pas{" "}
          <span lang="es">« querer bien »</span>.
        </div>

        <div className="exception">
          Avec une personne, <span className="fr">j’aime Paul</span> veut dire
          qu’on est amoureux. Pour dire que vous trouvez quelqu’un sympathique,
          dites{" "}
          <span className="fr">j’aime bien Paul</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>En francés, la persona es el sujeto</h2>

        <div className="rule">
          En español, la cosa es el sujeto: <em>me gusta el café</em>. En
          francés, el sujeto es la persona y el verbo es{" "}
          <span className="fr" lang="fr">aimer</span>:{" "}
          <span className="fr" lang="fr">j’aime le café</span>. La frase se
          construye al revés que en español.
        </div>

        <TastesTable lang="es" />

        <p>
          Para comparar, <span className="fr" lang="fr">préférer</span>:{" "}
          <span className="fr" lang="fr">je préfère le thé</span> (prefiero el
          té). Con dos cosas, la segunda va con <span className="fr" lang="fr">à</span>:{" "}
          <span className="fr" lang="fr">je préfère le thé au café</span>{" "}
          (prefiero el té al café). Los cuatro verbos se conjugan como{" "}
          <Link href="/conjugaison/parler" lang="fr">parler</Link>; en{" "}
          <span className="fr" lang="fr">préférer</span> cambia un acento:{" "}
          <span className="fr" lang="fr">je préfère</span>.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">beaucoup</span> y{" "}
          <span className="fr" lang="fr">bien</span> van después del verbo:{" "}
          <span className="fr" lang="fr">j’aime beaucoup le café</span>,{" "}
          <span className="fr" lang="fr">j’aime bien le café</span>. No dices{" "}
          <s className="fr" lang="fr">j’aime très le café</s>, aunque en
          español digas <em>me gusta muchísimo</em>. Y{" "}
          <span className="fr" lang="fr">aimer bien</span> es más flojo que{" "}
          <span className="fr" lang="fr">aimer</span>: no es «querer bien».
        </div>

        <div className="exception">
          Con una persona, <span className="fr" lang="fr">j’aime Paul</span>{" "}
          suena a amor. Para decir que alguien te cae bien, usa{" "}
          <span className="fr" lang="fr">j’aime bien Paul</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Après <span className="fr">aimer</span>, l’article défini
        </h2>

        <div className="rule">
          Parler de ses goûts, c’est parler d’une chose en général. Alors, après{" "}
          <span className="fr">aimer</span>, <span className="fr">adorer</span>,{" "}
          <span className="fr">détester</span> et{" "}
          <span className="fr">préférer</span>, on met{" "}
          <span className="fr">le</span>, <span className="fr">la</span> ou{" "}
          <span className="fr">les</span>. Jamais <span className="fr">un</span>,{" "}
          <span className="fr">une</span>, <span className="fr">du</span> ni{" "}
          <span className="fr">des</span>. Les formes sont dans{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </div>

        <ArticlesTable lang="fr" />

        <div className="attention">
          <s className="fr">j’aime du chocolat</s> et{" "}
          <s className="fr">j’aime chocolat</s> n’existent pas. Pour dire un
          goût, vous pensez au chocolat en général :{" "}
          <span className="fr">j’aime le chocolat</span>. Pour demander ou
          manger une partie, c’est un autre cas : voyez{" "}
          <Link href="/grammaire/les-articles-partitifs" lang="fr">
            Les articles partitifs
          </Link>
          .
        </div>

        <p>
          Avec la négation, l’article reste :{" "}
          <span className="fr">je n’aime pas le café</span>
          <Gloss lang="fr">no me gusta el café</Gloss>.{" "}
          <s className="fr">je n’aime pas de café</s> est une erreur. Le
          passage à <span className="fr">de</span> (
          <span className="fr">je ne mange pas de chocolat</span>) est pour
          manger ou avoir, pas pour aimer. Voyez{" "}
          <Link href="/grammaire/la-negation" lang="fr">La négation</Link>.
        </p>

        <div className="exception">
          <span className="fr">l’</span> devant une voyelle :{" "}
          <span className="fr">j’aime l’été</span>
          <Gloss lang="fr">me gusta el verano</Gloss>. Et au pluriel,{" "}
          <span className="fr">les</span> reste pareil :{" "}
          <span className="fr">je déteste les lundis</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Después de <span className="fr" lang="fr">aimer</span>, el artículo definido</h2>

        <div className="rule">
          Hablar de gustos es hablar de una cosa en general. Por eso, después de{" "}
          <span className="fr" lang="fr">aimer</span>,{" "}
          <span className="fr" lang="fr">adorer</span>,{" "}
          <span className="fr" lang="fr">détester</span> y{" "}
          <span className="fr" lang="fr">préférer</span> va{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">la</span> o{" "}
          <span className="fr" lang="fr">les</span>. Nunca{" "}
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">du</span> ni{" "}
          <span className="fr" lang="fr">des</span>. Las formas están en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </div>

        <ArticlesTable lang="es" />

        <div className="attention">
          <s className="fr" lang="fr">j’aime du chocolat</s> y{" "}
          <s className="fr" lang="fr">j’aime chocolat</s> no existen.
          Cuando dices lo que te gusta, piensas en el chocolate en general:{" "}
          <span className="fr" lang="fr">j’aime le chocolat</span>. Cuando
          pides o comes una parte, es otro caso: mira{" "}
          <Link href="/grammaire/les-articles-partitifs" lang="fr">
            Les articles partitifs
          </Link>
          .
        </div>

        <p>
          Con la negación, el artículo se queda:{" "}
          <span className="fr" lang="fr">je n’aime pas le café</span> (no me
          gusta el café).{" "}
          <s className="fr" lang="fr">
            je n’aime pas de café
          </s>{" "}
          es un error. El cambio a <span className="fr" lang="fr">de</span> (
          <span className="fr" lang="fr">je ne mange pas de chocolat</span>) es
          para lo que comes o tienes, no para lo que te gusta. Mira{" "}
          <Link href="/grammaire/la-negation" lang="fr">La négation</Link>.
        </p>

        <div className="exception">
          <span className="fr" lang="fr">l’</span> delante de vocal:{" "}
          <span className="fr" lang="fr">j’aime l’été</span> (me gusta el
          verano). Y en plural, <span className="fr" lang="fr">les</span> se
          queda igual: <span className="fr" lang="fr">je déteste les lundis</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          <span className="fr">aimer</span> + verbe à l’infinitif
        </h2>

        <div className="rule">
          Pour parler d’une activité, mettez un verbe à l’infinitif après :{" "}
          <span className="fr">j’aime lire</span>
          <Gloss lang="fr">me gusta leer</Gloss>. Il n’y a ni article ni
          préposition entre les deux verbes.
        </div>

        <InfinitivesTable lang="fr" />

        <div className="attention">
          En espagnol, <em lang="es">gusta</em> / <em lang="es">gustan</em>{" "}
          change selon la chose aimée : <em lang="es">me gusta leer</em>,{" "}
          <em lang="es">me gustan los libros</em>. En français,{" "}
          <span className="fr">aimer</span> change seulement selon le sujet :{" "}
          <span className="fr">j’aime lire</span>,{" "}
          <span className="fr">j’aime les livres</span>.
        </div>

        <div className="exception">
          À la négation, <span className="fr">ne… pas</span> entoure{" "}
          <span className="fr">aimer</span> et l’infinitif reste derrière :{" "}
          <span className="fr">je n’aime pas danser</span>
          <Gloss lang="fr">no me gusta bailar</Gloss>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">aimer</span> + verbo en infinitivo
        </h2>

        <div className="rule">
          Para decir lo que te gusta hacer, pones un verbo en infinitivo
          después: <span className="fr" lang="fr">j’aime lire</span> (me gusta
          leer). No hay artículo ni preposición entre los dos verbos.
        </div>

        <InfinitivesTable lang="es" />

        <div className="attention">
          En español, <em>gusta</em> / <em>gustan</em> cambia según lo que te
          gusta: <em>me gusta leer</em>, <em>me gustan los libros</em>. En
          francés, <span className="fr" lang="fr">aimer</span> solo cambia
          según quién habla:{" "}
          <span className="fr" lang="fr">j’aime lire</span>,{" "}
          <span className="fr" lang="fr">j’aime les livres</span>.
        </div>

        <div className="exception">
          En la negación, <span className="fr" lang="fr">ne… pas</span> rodea a{" "}
          <span className="fr" lang="fr">aimer</span> y el infinitivo se queda
          detrás: <span className="fr" lang="fr">je n’aime pas danser</span> (no
          me gusta bailar).
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            La personne est le sujet : <em lang="es">me gusta el café</em>,
            c’est <span className="fr">j’aime le café</span>.
          </li>
          <li>
            Du moins aimé au plus aimé : <span className="fr">détester</span>,{" "}
            <span className="fr">ne pas aimer</span>,{" "}
            <span className="fr">aimer bien</span>,{" "}
            <span className="fr">aimer</span>,{" "}
            <span className="fr">aimer beaucoup</span>,{" "}
            <span className="fr">adorer</span> ; et{" "}
            <span className="fr">préférer</span> pour choisir.
          </li>
          <li>
            Après ces verbes, on met <span className="fr">le</span>,{" "}
            <span className="fr">la</span>, <span className="fr">l’</span> ou{" "}
            <span className="fr">les</span>, pas <span className="fr">un</span>{" "}
            ni <span className="fr">du</span>.
          </li>
          <li>
            À la négation, l’article reste :{" "}
            <span className="fr">je n’aime pas le café</span>.
          </li>
          <li>
            Pour une activité, un infinitif sans rien devant :{" "}
            <span className="fr">j’aime lire</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            La persona es el sujeto:{" "}
            <em>me gusta el café</em> es{" "}
            <span className="fr" lang="fr">j’aime le café</span>.
          </li>
          <li>
            De lo que no te gusta a lo que te encanta:{" "}
            <span className="fr" lang="fr">détester</span>,{" "}
            <span className="fr" lang="fr">ne pas aimer</span>,{" "}
            <span className="fr" lang="fr">aimer bien</span>,{" "}
            <span className="fr" lang="fr">aimer</span>,{" "}
            <span className="fr" lang="fr">aimer beaucoup</span>,{" "}
            <span className="fr" lang="fr">adorer</span>; y{" "}
            <span className="fr" lang="fr">préférer</span> para elegir.
          </li>
          <li>
            Después de estos verbos va{" "}
            <span className="fr" lang="fr">le</span>,{" "}
            <span className="fr" lang="fr">la</span>,{" "}
            <span className="fr" lang="fr">l’</span> o{" "}
            <span className="fr" lang="fr">les</span>, no{" "}
            <span className="fr" lang="fr">un</span> ni{" "}
            <span className="fr" lang="fr">du</span>.
          </li>
          <li>
            En la negación el artículo se queda:{" "}
            <span className="fr" lang="fr">je n’aime pas le café</span>.
          </li>
          <li>
            Para una actividad, un infinitivo sin nada delante:{" "}
            <span className="fr" lang="fr">j’aime lire</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
