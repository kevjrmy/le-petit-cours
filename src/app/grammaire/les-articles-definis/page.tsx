import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-definis";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the A1 Spanish gloss are written once, below, and shared. */

type Lang = "fr" | "es";

/* A Spanish gloss in brackets: in the French body it is marked as Spanish. */
function Gloss({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <> ({lang === "fr" ? <span lang="es">{children}</span> : children})</>;
}

const FORMS = [
  {
    form: "le",
    noun: { fr: "masculin", es: "masculino" },
    example: "Le train part à huit heures.",
    gloss: "El tren sale a las ocho.",
  },
  {
    form: "la",
    noun: { fr: "féminin", es: "femenino" },
    example: "La porte est fermée.",
    gloss: "La puerta está cerrada.",
  },
  {
    form: "l’",
    noun: { fr: "devant une voyelle ou un h muet", es: "delante de vocal o h muda" },
    example: "L’école ouvre à neuf heures.",
    gloss: "La escuela abre a las nueve.",
  },
  {
    form: "les",
    noun: { fr: "pluriel", es: "plural" },
    example: "Les enfants jouent dehors.",
    gloss: "Los niños juegan fuera.",
  },
];

const JOINS = [
  { article: "le", a: "au cinéma", aEs: "al cine", de: "du cinéma", deEs: "del cine" },
  { article: "la", a: "à la gare", aEs: "a la estación", de: "de la gare", deEs: "de la estación" },
  { article: "l’", a: "à l’école", aEs: "a la escuela", de: "de l’école", deEs: "de la escuela" },
  { article: "les", a: "aux enfants", aEs: "a los niños", de: "des enfants", deEs: "de los niños" },
];

const CASES = [
  {
    case: { fr: "une chose en général", es: "una cosa en general" },
    example: "J’aime le chocolat.",
    gloss: "Me gusta el chocolate.",
  },
  {
    case: { fr: "un pays", es: "un país" },
    example: "La France est grande.",
    gloss: "Francia es grande. (sin artículo)",
  },
  {
    case: { fr: "un jour de chaque semaine", es: "un día que se repite" },
    example: "Le lundi, je travaille chez moi.",
    gloss: "Los lunes trabajo en casa.",
  },
];

function FormsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les quatre formes et le nom devant chacune"
            : "Las cuatro formas y el nombre que decide cada una"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Le nom" : "El nombre"}</th>
            <th scope="col">{fr ? "La forme" : "La forma"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {FORMS.map((row) => (
            <tr key={row.form}>
              <th scope="row">{row.noun[lang]}</th>
              <td className="fr" lang="fr">{row.form}</td>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function JoinsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? (
            <>
              <span className="fr">à</span> et <span className="fr">de</span> devant chaque article
            </>
          ) : (
            <>
              Lo que pasa con <span className="fr" lang="fr">à</span> y{" "}
              <span className="fr" lang="fr">de</span> delante de cada artículo
            </>
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "L’article" : "El artículo"}</th>
            <th scope="col">
              {fr ? "Avec " : "Con "}
              <span className="fr" lang="fr">à</span>
              {" (a)"}
            </th>
            <th scope="col">
              {fr ? "Avec " : "Con "}
              <span className="fr" lang="fr">de</span> (de)
            </th>
          </tr>
        </thead>
        <tbody>
          {JOINS.map((row) => (
            <tr key={row.article}>
              <th scope="row" className="fr" lang="fr">{row.article}</th>
              <td>
                <span className="fr" lang="fr">{row.a}</span>
                <Gloss lang={lang}>{row.aEs}</Gloss>
              </td>
              <td>
                <span className="fr" lang="fr">{row.de}</span>
                <Gloss lang={lang}>{row.deEs}</Gloss>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CasesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Trois cas où l’article ne se devine pas"
            : "Tres casos en los que el artículo no se adivina"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Le cas" : "El caso"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {CASES.map((row) => (
            <tr key={row.example}>
              <th scope="row">{row.case[lang]}</th>
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
        <h2>Quatre formes, et le nom décide</h2>

        <div className="rule">
          L’article défini se met devant le nom. C’est le{" "}
          <span lang="es">el, la, los, las</span> de l’espagnol. En français, il
          a quatre formes : <span className="fr">le</span>,{" "}
          <span className="fr">la</span>, <span className="fr">l’</span> et{" "}
          <span className="fr">les</span>.
        </div>

        <FormsTable lang="fr" />

        <p>
          Devant une voyelle (a, e, i, o, u), <span className="fr">le</span> et{" "}
          <span className="fr">la</span> perdent leur voyelle et prennent une
          apostrophe. <s className="fr">la école</s> n’existe pas : on écrit{" "}
          <span className="fr">l’école</span>. On prononce tout ensemble,
          comme un seul mot. <span className="fr">les</span> ne change pas à
          l’écrit : c’est la même forme pour le masculin et pour le féminin.
        </p>

        <div className="attention">
          <span className="fr">l’</span> cache le genre.{" "}
          <span className="fr">l’école</span> est féminin et{" "}
          <span className="fr">l’hôtel</span> est masculin, mais l’article ne le
          dit pas. Apprenez le nom avec son article complet :{" "}
          <span className="fr">une école</span>
          <Gloss lang="fr">una escuela</Gloss>,{" "}
          <span className="fr">un hôtel</span>
          <Gloss lang="fr">un hotel</Gloss>. Et le genre n’est pas toujours
          celui de l’espagnol : <em lang="es">la leche</em> se dit{" "}
          <span className="fr">le lait</span> (masculin).
        </div>

        <div className="exception">
          Devant quelques mots avec un h, il n’y a pas d’apostrophe :{" "}
          <span className="fr">le héros</span>
          <Gloss lang="fr">héroe</Gloss>,{" "}
          <span className="fr">la hauteur</span>
          <Gloss lang="fr">altura</Gloss>,{" "}
          <span className="fr">le haricot</span>
          <Gloss lang="fr">judía</Gloss>. Ces mots sont peu nombreux. On les
          apprend un par un.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuatro formas, y las decide el nombre</h2>

        <div className="rule">
          El artículo definido va delante del nombre. Es el «el, la, los, las»
          del español. En francés tiene cuatro formas:{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">la</span>,{" "}
          <span className="fr" lang="fr">l’</span> y{" "}
          <span className="fr" lang="fr">les</span>.
        </div>

        <FormsTable lang="es" />

        <p>
          Delante de una vocal (a, e, i, o, u), <span className="fr" lang="fr">le</span> y{" "}
          <span className="fr" lang="fr">la</span> pierden la vocal y ponen un
          apóstrofo. <s className="fr" lang="fr">la école</s> no existe:
          se escribe <span className="fr" lang="fr">l’école</span>. Se pronuncia
          todo junto, como una sola palabra. <span className="fr" lang="fr">les</span> no cambia al escribirlo: es igual
          para masculino y femenino.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">l’</span> esconde el género.{" "}
          <span className="fr" lang="fr">l’école</span> es femenino y{" "}
          <span className="fr" lang="fr">l’hôtel</span> es masculino, pero el
          artículo no lo dice. Aprende el nombre con su artículo completo:{" "}
          <span className="fr" lang="fr">une école</span> (una escuela),{" "}
          <span className="fr" lang="fr">un hôtel</span> (un hotel). Y el género
          no siempre es el del español: <em>la leche</em> se dice{" "}
          <span className="fr" lang="fr">le lait</span> (masculino).
        </div>

        <div className="exception">
          Delante de unas pocas palabras con h no hay apóstrofo:{" "}
          <span className="fr" lang="fr">le héros</span> (héroe),{" "}
          <span className="fr" lang="fr">la hauteur</span> (altura),{" "}
          <span className="fr" lang="fr">le haricot</span> (judía). Son pocas
          y se aprenden una por una.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Après <span className="fr">à</span> et{" "}
          <span className="fr">de</span>, l’article se joint
        </h2>

        <div className="rule">
          En espagnol, c’est pareil : a + el = <em lang="es">al</em>, de + el ={" "}
          <em lang="es">del</em>. En français, <span className="fr">à</span> et{" "}
          <span className="fr">de</span> se joignent à{" "}
          <span className="fr">le</span> et à <span className="fr">les</span>.
          Cela fait un seul mot : <strong>au</strong>, <strong>aux</strong>,{" "}
          <strong>du</strong>, <strong>des</strong>. Avec{" "}
          <span className="fr">la</span> et <span className="fr">l’</span>, rien
          ne change.
        </div>

        <JoinsTable lang="fr" />

        <div className="attention">
          <s className="fr">à le</s> et <s className="fr">de le</s> ne
          s’écrivent jamais. La forme jointe est obligatoire :{" "}
          <span className="fr">je vais au marché</span>
          <Gloss lang="fr">voy al mercado</Gloss>,{" "}
          <span className="fr">la voiture du voisin</span>
          <Gloss lang="fr">el coche del vecino</Gloss>.
        </div>

        <p>
          Pour les prépositions avec les pays et les villes, voyez{" "}
          <Link href="/astuces/a-en-au-aux" lang="fr">à, en, au ou aux ?</Link>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>du</strong> et <strong>des</strong> ont deux vies.
          </p>
          <p>
            <span className="fr">la porte du garage</span>
            <Gloss lang="fr">la puerta del garaje</Gloss>, c’est{" "}
            <span className="fr">de</span> + <span className="fr">le</span>.
            Mais <span className="fr">je bois du café</span>
            <Gloss lang="fr">bebo café</Gloss> est autre chose : c’est un autre
            article. Il est expliqué dans{" "}
            <Link href="/grammaire/les-articles-partitifs" lang="fr">
              Les articles partitifs
            </Link>
            . Les deux s’écrivent de la même façon, et seule la phrase dit
            lequel c’est.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Después de <span className="fr" lang="fr">à</span> y{" "}
          <span className="fr" lang="fr">de</span>, el artículo se junta
        </h2>

        <div className="rule">
          En español pasa lo mismo: a + el = <em>al</em>, de + el = <em>del</em>.
          En francés, <span className="fr" lang="fr">à</span> y{" "}
          <span className="fr" lang="fr">de</span> se juntan con{" "}
          <span className="fr" lang="fr">le</span> y con{" "}
          <span className="fr" lang="fr">les</span> y forman una sola palabra:{" "}
          <strong lang="fr">au</strong>, <strong lang="fr">aux</strong>,{" "}
          <strong lang="fr">du</strong>, <strong lang="fr">des</strong>. Con{" "}
          <span className="fr" lang="fr">la</span> y{" "}
          <span className="fr" lang="fr">l’</span> no cambia nada.
        </div>

        <JoinsTable lang="es" />

        <div className="attention">
          <s className="fr" lang="fr">à le</s> y{" "}
          <s className="fr" lang="fr">de le</s> no se escriben nunca. La
          forma junta es obligatoria:{" "}
          <span className="fr" lang="fr">je vais au marché</span> (voy al
          mercado), <span className="fr" lang="fr">la voiture du voisin</span> (el
          coche del vecino).
        </div>

        <p>
          Para las preposiciones con países y ciudades, mira{" "}
          <Link href="/astuces/a-en-au-aux" lang="fr">à, en, au ou aux ?</Link>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            <strong lang="fr">du</strong> y <strong lang="fr">des</strong> tienen
            dos vidas.
          </p>
          <p>
            <span className="fr" lang="fr">la porte du garage</span> (la puerta
            del garaje) es <span className="fr" lang="fr">de</span> +{" "}
            <span className="fr" lang="fr">le</span>. Pero{" "}
            <span className="fr" lang="fr">je bois du café</span> (bebo café) es
            otra cosa: es un artículo distinto, que se explica en{" "}
            <Link href="/grammaire/les-articles-partitifs" lang="fr">
              Les articles partitifs
            </Link>
            . Se escriben igual, y solo la frase te dice cuál es.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Trois cas à bien regarder</h2>

        <div className="rule">
          L’article défini est obligatoire dans trois cas : devant une chose en
          général, devant le nom d’un pays et devant un jour de chaque semaine.
          En espagnol, on ne le met pas toujours (<em lang="es">Francia es
          grande</em>). Alors on l’oublie.
        </div>

        <CasesTable lang="fr" />

        <div className="attention">
          <s className="fr">j’aime chocolat</s> n’existe pas. Dans ces trois
          cas, il faut un article.
        </div>

        <div className="exception">
          <span className="fr">lundi</span> sans article, c’est un lundi précis :{" "}
          <span className="fr">lundi, je pars à Paris</span>
          <Gloss lang="fr">el lunes me voy a París</Gloss>.{" "}
          <span className="fr">le lundi, je pars à Paris</span>, c’est tous les
          lundis. Et après <span className="fr">en</span>, le pays n’a pas
          d’article : <span className="fr">en France</span>
          <Gloss lang="fr">en Francia</Gloss>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Tres casos en que conviene fijarse</h2>

        <div className="rule">
          El artículo definido es obligatorio en tres casos: delante de una
          cosa en general, delante del nombre de un país y delante de un día que
          se repite cada semana. En español a veces no lo pones (<em>Francia es
          grande</em>): por eso se olvida.
        </div>

        <CasesTable lang="es" />

        <div className="attention">
          <s className="fr" lang="fr">j’aime chocolat</s> no existe.
          En estos tres casos hace falta un artículo.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">lundi</span> sin artículo es un lunes
          concreto:{" "}
          <span className="fr" lang="fr">lundi, je pars à Paris</span> (el lunes
          me voy a París). <span className="fr" lang="fr">le lundi, je pars à Paris</span>{" "}
          es todos los lunes. Y después de <span className="fr" lang="fr">en</span>,
          el país no lleva artículo:{" "}
          <span className="fr" lang="fr">en France</span> (en Francia).
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre formes : <span className="fr">le</span>,{" "}
            <span className="fr">la</span>, <span className="fr">l’</span>{" "}
            devant une voyelle et <span className="fr">les</span> au pluriel.
          </li>
          <li>
            <span className="fr">l’</span> cache le genre : apprenez le nom avec{" "}
            <span className="fr">un</span> ou <span className="fr">une</span>.
          </li>
          <li>
            <span className="fr">à</span> et <span className="fr">de</span> se
            joignent à <span className="fr">le</span> et à{" "}
            <span className="fr">les</span> : <span className="fr">au</span>,{" "}
            <span className="fr">aux</span>, <span className="fr">du</span>,{" "}
            <span className="fr">des</span>.
          </li>
          <li>
            Avec <span className="fr">la</span> et <span className="fr">l’</span>,
            rien ne se joint : <span className="fr">à la gare</span>,{" "}
            <span className="fr">de l’école</span>.
          </li>
          <li>
            Une chose en général, un pays, un jour de chaque semaine : l’article
            est obligatoire.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Cuatro formas: <span className="fr" lang="fr">le</span>,{" "}
            <span className="fr" lang="fr">la</span>,{" "}
            <span className="fr" lang="fr">l’</span> delante de vocal y{" "}
            <span className="fr" lang="fr">les</span> en plural.
          </li>
          <li>
            <span className="fr" lang="fr">l’</span> esconde el género: aprende
            el nombre con <span className="fr" lang="fr">un</span> o{" "}
            <span className="fr" lang="fr">une</span>.
          </li>
          <li>
            <span className="fr" lang="fr">à</span> y{" "}
            <span className="fr" lang="fr">de</span> se juntan con{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">les</span>:{" "}
            <span className="fr" lang="fr">au</span>,{" "}
            <span className="fr" lang="fr">aux</span>,{" "}
            <span className="fr" lang="fr">du</span>,{" "}
            <span className="fr" lang="fr">des</span>.
          </li>
          <li>
            Con <span className="fr" lang="fr">la</span> y{" "}
            <span className="fr" lang="fr">l’</span> no se junta nada:{" "}
            <span className="fr" lang="fr">à la gare</span>,{" "}
            <span className="fr" lang="fr">de l’école</span>.
          </li>
          <li>
            Una cosa en general, un país, un día que se repite: el artículo es
            obligatorio.
          </li>
        </ul>
      </div>
    </article>
  );
}
