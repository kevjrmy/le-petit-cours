import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-indefinis";

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
    form: "un",
    noun: { fr: "masculin singulier", es: "masculino singular" },
    example: "Il y a un problème.",
    gloss: "Hay un problema.",
  },
  {
    form: "une",
    noun: { fr: "féminin singulier", es: "femenino singular" },
    example: "J’ai une question.",
    gloss: "Tengo una pregunta.",
  },
  {
    form: "des",
    noun: { fr: "pluriel, les deux genres", es: "plural, los dos géneros" },
    example: "Elle achète des livres.",
    gloss: "Ella compra libros.",
  },
];

const ENDINGS = [
  { end: "-tion, -sion", gender: "f", example: "une question, une décision", gloss: "pregunta, decisión" },
  { end: "-té", gender: "f", example: "une université, la santé", gloss: "universidad, salud" },
  { end: "-ance, -ence", gender: "f", example: "une chance, la patience", gloss: "suerte, paciencia" },
  { end: "-ette", gender: "f", example: "une fourchette, une baguette", gloss: "tenedor, barra de pan" },
  { end: "-ment", gender: "m", example: "un moment, un appartement", gloss: "momento, piso" },
  { end: "-eau", gender: "m", example: "un bureau, un couteau", gloss: "escritorio o despacho, cuchillo" },
  { end: "-age", gender: "m", example: "un fromage, un village", gloss: "queso, pueblo" },
  { end: "-isme", gender: "m", example: "un organisme, un mécanisme", gloss: "organismo, mecanismo" },
];

const GENDER = {
  f: { fr: "féminin", es: "femenino" },
  m: { fr: "masculin", es: "masculino" },
};

function FormsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les trois formes et le nom devant chacune"
            : "Las tres formas y el nombre que decide cada una"}
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

function EndingsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les fins de mot qui annoncent le genre du nom"
            : "Los finales que anuncian el género del nombre"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "La fin" : "El final"}</th>
            <th scope="col">{fr ? "Le genre" : "El género"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {ENDINGS.map((row) => (
            <tr key={row.end}>
              <th scope="row" className="fr" lang="fr">{row.end}</th>
              <td>{GENDER[row.gender as "f" | "m"][lang]}</td>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dog() {
  return (
    <div className="example" lang="fr">
      Hier, j’ai vu <strong>un</strong> chien devant la porte.
      <br />
      Ce matin, <strong>le</strong> chien était encore là.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>
          <span className="fr">un</span>, <span className="fr">une</span>,{" "}
          <span className="fr">des</span>
        </h2>

        <div className="rule">
          L’article indéfini présente une chose nouvelle. C’est le{" "}
          <span lang="es">un, una, unos, unas</span> de l’espagnol. Il a trois
          formes : <span className="fr">un</span>,{" "}
          <span className="fr">une</span> et <span className="fr">des</span> au
          pluriel, pour les deux genres.
        </div>

        <FormsTable lang="fr" />

        <div className="attention">
          <span className="fr">des</span> est le pluriel de{" "}
          <span className="fr">un</span> et <span className="fr">une</span>, et
          il est obligatoire. En espagnol, on ne dit souvent rien :{" "}
          <em lang="es">compro manzanas</em>. En français, il y a toujours un
          article : <span className="fr">j’achète des pommes</span>.{" "}
          <s className="fr">j’achète pommes</s> n’existe pas. C’est un oubli
          très fréquent : il manque un mot entier.
        </div>

        <p>
          Après une négation, <span className="fr">un</span>,{" "}
          <span className="fr">une</span> et <span className="fr">des</span>{" "}
          deviennent <span className="fr">de</span> :{" "}
          <span className="fr">je n’ai pas de voiture</span>
          <Gloss lang="fr">no tengo coche</Gloss>. Avec{" "}
          <span className="fr">c’est</span>, rien ne change :{" "}
          <span className="fr">ce n’est pas un chien</span>
          <Gloss lang="fr">no es un perro</Gloss>. La règle complète est dans{" "}
          <Link href="/grammaire/la-negation" lang="fr">La négation</Link>.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">des</span>
        </h2>

        <div className="rule">
          El artículo indefinido presenta una cosa nueva. Es el «un, una, unos,
          unas» del español. Tiene tres formas:{" "}
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span> y{" "}
          <span className="fr" lang="fr">des</span> en plural, para los dos
          géneros.
        </div>

        <FormsTable lang="es" />

        <div className="attention">
          <span className="fr" lang="fr">des</span> es el plural de{" "}
          <span className="fr" lang="fr">un</span> y{" "}
          <span className="fr" lang="fr">une</span>, y es obligatorio. En
          español muchas veces no dices nada: <em>compro manzanas</em>. En
          francés siempre hay un artículo:{" "}
          <span className="fr" lang="fr">j’achète des pommes</span>.{" "}
          <s className="fr" lang="fr">j’achète pommes</s> no existe. Es un
          olvido muy frecuente: falta una palabra entera.
        </div>

        <p>
          Después de una negación, <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span> y{" "}
          <span className="fr" lang="fr">des</span> pasan a{" "}
          <span className="fr" lang="fr">de</span>:{" "}
          <span className="fr" lang="fr">je n’ai pas de voiture</span> (no
          tengo coche). Con <span className="fr" lang="fr">c’est</span> no
          cambia: <span className="fr" lang="fr">ce n’est pas un chien</span>{" "}
          (no es un perro). La regla completa está en{" "}
          <Link href="/grammaire/la-negation" lang="fr">La négation</Link>.
        </p>
      </section>

      <section data-ui="fr">
        <h2>
          <span className="fr">un</span> présente,{" "}
          <span className="fr">le</span> désigne
        </h2>

        <div className="rule">
          La première fois, une chose vient avec <span className="fr">un</span>{" "}
          ou <span className="fr">une</span>. Ensuite, tout le monde sait de
          quoi on parle, et la chose revient avec{" "}
          <span className="fr">le</span> ou <span className="fr">la</span>.
          C’est pareil en espagnol.
        </div>

        <Dog />

        <p>
          En espagnol : <span lang="es">Ayer vi un perro delante de la puerta.
          Esta mañana el perro todavía estaba allí.</span> Le même mot prend les
          deux articles : l’ordre de l’histoire décide, pas le nom. Les formes
          de l’autre série sont dans{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="attention">
          Après <span className="fr">c’est</span>, l’article est presque
          toujours là : <span className="fr">c’est un médecin</span>
          <Gloss lang="fr">es médico</Gloss>,{" "}
          <span className="fr">c’est une amie</span>
          <Gloss lang="fr">es una amiga</Gloss>. En espagnol, on dit{" "}
          <span lang="es">« es médico »</span>, sans article. En français, sans
          article, la phrase change de forme :{" "}
          <span className="fr">il est médecin</span>. C’est expliqué dans{" "}
          <Link href="/grammaire/c-est-ce-sont" lang="fr">C’est, ce sont</Link>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">un</span> presenta,{" "}
          <span className="fr" lang="fr">le</span> señala
        </h2>

        <div className="rule">
          La primera vez que sale una cosa, va con{" "}
          <span className="fr" lang="fr">un</span> o{" "}
          <span className="fr" lang="fr">une</span>. Después, todos saben cuál
          es, y vuelve con <span className="fr" lang="fr">le</span> o{" "}
          <span className="fr" lang="fr">la</span>. Es igual que en español.
        </div>

        <Dog />

        <p>
          Ayer vi un perro delante de la puerta. Esta mañana el perro todavía
          estaba allí. La misma palabra lleva los dos artículos: lo decide el
          orden de la historia, no el nombre. Las formas de la otra serie están
          en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="attention">
          Después de <span className="fr" lang="fr">c’est</span>, el artículo
          casi siempre está: <span className="fr" lang="fr">c’est un médecin</span>{" "}
          (es médico), <span className="fr" lang="fr">c’est une amie</span> (es
          una amiga). En español dices «es médico», sin artículo. En francés,
          sin artículo, la frase cambia de forma:{" "}
          <span className="fr" lang="fr">il est médecin</span>. Se explica en{" "}
          <Link href="/grammaire/c-est-ce-sont" lang="fr">C’est, ce sont</Link>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          <span className="fr">un</span> ou <span className="fr">une</span> ? Ce
          que dit la fin du nom
        </h2>

        <div className="rule">
          Pour choisir entre <span className="fr">un</span> et{" "}
          <span className="fr">une</span>, il faut connaître le genre du nom. La fin du
          mot le donne souvent.
        </div>

        <EndingsTable lang="fr" />

        <p>
          Le genre français et le genre espagnol ne sont pas toujours les
          mêmes : l’espagnol ne prouve rien. Regardez <em lang="es">tenedor</em>,
          masculin en espagnol, et <span className="fr">une fourchette</span> en
          français.
        </p>

        <div className="exception">
          Presque toutes les lignes ont des exceptions. Les plus courantes
          s’apprennent par cœur. <span className="fr">le silence</span>
          <Gloss lang="fr">silencio</Gloss>,{" "}
          <span className="fr">le côté</span>
          <Gloss lang="fr">lado</Gloss> et{" "}
          <span className="fr">l’été</span>
          <Gloss lang="fr">verano</Gloss> sont masculins, mais ils finissent
          comme un féminin. <span className="fr">l’eau</span>
          <Gloss lang="fr">agua</Gloss>, <span className="fr">la peau</span>
          <Gloss lang="fr">piel</Gloss>, <span className="fr">la page</span>
          <Gloss lang="fr">página</Gloss>, <span className="fr">la plage</span>
          <Gloss lang="fr">playa</Gloss> et <span className="fr">l’image</span>
          <Gloss lang="fr">imagen</Gloss> sont féminins.
        </div>

        <div className="attention">
          Le genre n’est pas toujours celui de l’espagnol, même si les deux mots se
          ressemblent ou sont identiques : <em lang="es">el mar</em> se dit{" "}
          <span className="fr">la mer</span> (féminin) et{" "}
          <em lang="es">la sal</em> se dit <span className="fr">le sel</span>{" "}
          (masculin). Quand la fin ne dit rien, apprenez le nom avec son
          article. C’est pourquoi le dictionnaire écrit toujours{" "}
          <span className="fr">n. m.</span> ou <span className="fr">n. f.</span>{" "}
          à côté du mot.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          ¿<span className="fr" lang="fr">un</span> o{" "}
          <span className="fr" lang="fr">une</span>? Lo que dice el final del
          nombre
        </h2>

        <div className="rule">
          Para elegir entre <span className="fr" lang="fr">un</span> y{" "}
          <span className="fr" lang="fr">une</span> necesitas el género del
          nombre. El final de la palabra lo da muchas veces.
        </div>

        <EndingsTable lang="es" />

        <p>
          El género francés y el español no siempre coinciden: el español no
          prueba nada. Fíjate en <em>tenedor</em>, masculino en español y{" "}
          <span className="fr" lang="fr">une fourchette</span> en francés.
        </p>

        <div className="exception">
          Casi todas las filas tienen excepciones, y las más comunes se
          aprenden de memoria. <span className="fr" lang="fr">le silence</span>{" "}
          (silencio), <span className="fr" lang="fr">le côté</span> (lado)
          y <span className="fr" lang="fr">l’été</span> (verano) son
          masculinos aunque acaben como un femenino;{" "}
          <span className="fr" lang="fr">l’eau</span> (agua),{" "}
          <span className="fr" lang="fr">la peau</span> (piel),{" "}
          <span className="fr" lang="fr">la page</span> (página),{" "}
          <span className="fr" lang="fr">la plage</span> (playa) e{" "}
          <span className="fr" lang="fr">l’image</span> (imagen) son
          femeninos.
        </div>

        <div className="attention">
          El género no siempre es el del español, aunque la palabra se parezca
          o sea la misma: <em>el mar</em> es{" "}
          <span className="fr" lang="fr">la mer</span> (femenino) y{" "}
          <em>la sal</em> es <span className="fr" lang="fr">le sel</span>{" "}
          (masculino). Cuando el final no dice nada, aprende el nombre con su
          artículo. Por eso el diccionario escribe siempre{" "}
          <span className="fr" lang="fr">n. m.</span> o{" "}
          <span className="fr" lang="fr">n. f.</span> junto a la palabra.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Trois formes : <span className="fr">un</span>,{" "}
            <span className="fr">une</span> et <span className="fr">des</span> au
            pluriel, pour les deux genres.
          </li>
          <li>
            <span className="fr">des</span> est le pluriel de{" "}
            <span className="fr">un</span> et <span className="fr">une</span>, et
            on ne peut pas l’enlever : <em lang="es">compro manzanas</em>, c’est{" "}
            <span className="fr">j’achète des pommes</span>.
          </li>
          <li>
            La première fois, <span className="fr">un</span> ; ensuite,{" "}
            <span className="fr">le</span>. L’ordre de l’histoire décide.
          </li>
          <li>
            La fin du mot annonce souvent le genre :{" "}
            <span className="fr">-tion</span>, <span className="fr">-té</span>,{" "}
            <span className="fr">-ance</span>, <span className="fr">-ette</span>{" "}
            sont féminins ; <span className="fr">-ment</span>,{" "}
            <span className="fr">-eau</span>, <span className="fr">-age</span>,{" "}
            <span className="fr">-isme</span> sont masculins.
          </li>
          <li>
            Si la fin ne dit rien, apprenez le nom avec son article.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Tres formas: <span className="fr" lang="fr">un</span>,{" "}
            <span className="fr" lang="fr">une</span> y{" "}
            <span className="fr" lang="fr">des</span> en plural, para los dos
            géneros.
          </li>
          <li>
            <span className="fr" lang="fr">des</span> es el plural de{" "}
            <span className="fr" lang="fr">un</span> y{" "}
            <span className="fr" lang="fr">une</span> y no se puede quitar:{" "}
            <em>compro manzanas</em> es{" "}
            <span className="fr" lang="fr">j’achète des pommes</span>.
          </li>
          <li>
            La primera vez, <span className="fr" lang="fr">un</span>; después,{" "}
            <span className="fr" lang="fr">le</span>. Lo decide el orden de la
            historia.
          </li>
          <li>
            El final de la palabra anuncia muchas veces el género:{" "}
            <span className="fr" lang="fr">-tion</span>,{" "}
            <span className="fr" lang="fr">-té</span>,{" "}
            <span className="fr" lang="fr">-ance</span>,{" "}
            <span className="fr" lang="fr">-ette</span> son femeninos;{" "}
            <span className="fr" lang="fr">-ment</span>,{" "}
            <span className="fr" lang="fr">-eau</span>,{" "}
            <span className="fr" lang="fr">-age</span>,{" "}
            <span className="fr" lang="fr">-isme</span> son masculinos.
          </li>
          <li>
            Si el final no dice nada, aprende el nombre con su artículo.
          </li>
        </ul>
      </div>
    </article>
  );
}
