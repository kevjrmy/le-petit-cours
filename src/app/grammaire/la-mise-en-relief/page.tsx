import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/la-mise-en-relief";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. A B1 page: no Spanish printed as the
   cause of a mistake (§1); the wrong form is struck through (#93).

   The other way of putting a word forward — « ce que je veux, c'est… » — is
   `gram-ce-qui-ce-que`'s third section; this page is the one that starts with
   « c'est ». */

type Lang = "fr" | "es";

/* French inside explanation prose, in either body. */
function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

/* A form wrong as written (#93). */
function Wrong({ children }: { children: ReactNode }) {
  return (
    <s className="fr" lang="fr">
      {children}
    </s>
  );
}

const SUBJECTS = [
  { who: "moi", example: "C’est moi qui ai les clés.", verb: "j’ai" },
  { who: "toi", example: "C’est toi qui as raison.", verb: "tu as" },
  { who: "lui, elle", example: "C’est elle qui a téléphoné.", verb: "elle a" },
  { who: "nous", example: "C’est nous qui sommes en retard.", verb: "nous sommes" },
  { who: "vous", example: "C’est vous qui avez choisi.", verb: "vous avez" },
  { who: "eux, elles", example: "Ce sont eux qui ont payé.", verb: "ils ont, elles ont" },
];

const REST = [
  {
    what: { fr: "un lieu", es: "un lugar" },
    plain: "J’ai appris le français à Lyon.",
    forward: "C’est à Lyon que j’ai appris le français.",
  },
  {
    what: { fr: "un moment", es: "un momento" },
    plain: "Je pars demain.",
    forward: "C’est demain que je pars.",
  },
  {
    what: { fr: "une raison", es: "una razón" },
    plain: "Je suis venu pour toi.",
    forward: "C’est pour toi que je suis venu.",
  },
  {
    what: { fr: "une personne après « à »", es: "una persona después de «à»" },
    plain: "Je parle à Marie.",
    forward: "C’est à Marie que je parle.",
  },
  {
    what: { fr: "une chose", es: "una cosa" },
    plain: "Je cherche ce livre.",
    forward: "C’est ce livre que je cherche.",
  },
];

function SubjectsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Après « qui », le verbe se conjugue comme avec la personne mise en avant"
            : "Después de «qui», el verbo se conjuga como con la persona destacada"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Mis en avant" : "Destacado"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "Le verbe, comme dans" : "El verbo, como en"}</th>
          </tr>
        </thead>
        <tbody>
          {SUBJECTS.map((row) => (
            <tr key={row.who}>
              <th scope="row" className="fr" lang="fr">
                {row.who}
              </th>
              <td className="fr" lang="fr">
                {row.example}
              </td>
              <td className="fr" lang="fr">
                {row.verb}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RestTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "La même phrase, puis la même phrase avec « c’est… que »"
            : "La misma frase, y luego la misma frase con «c’est… que»"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Mis en avant" : "Destacado"}</th>
            <th scope="col">{fr ? "La phrase simple" : "La frase simple"}</th>
            <th scope="col">{fr ? "Avec « c’est… que »" : "Con «c’est… que»"}</th>
          </tr>
        </thead>
        <tbody>
          {REST.map((row) => (
            <tr key={row.forward}>
              <th scope="row">{row.what[lang]}</th>
              <td className="fr" lang="fr">
                {row.plain}
              </td>
              <td className="fr" lang="fr">
                {row.forward}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NounExamples() {
  return (
    <div className="example" lang="fr">
      <strong>C’est</strong> Paul <strong>qui</strong> a cassé la vitre, pas
      son frère.
      <br />
      <strong>Ce sont</strong> mes voisins <strong>qui</strong> font ce bruit.
    </div>
  );
}

function FixedExamples() {
  return (
    <div className="example" lang="fr">
      Il pleuvait. <strong>C’est pour ça que</strong> je suis resté.
      <br />
      Tu vois ce café ? <strong>C’est là que</strong> j’ai rencontré Paul.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>C’est moi qui : le verbe suit la personne</h2>

        <div className="rule">
          Pour mettre le sujet en avant, on l’encadre :{" "}
          <strong>c’est … qui</strong>. Le verbe après <F>qui</F> s’accorde
          avec ce sujet, et non avec <F>c’est</F> : <F>c’est moi qui ai</F>,{" "}
          <F>c’est nous qui sommes</F>.
        </div>

        <SubjectsTable lang="fr" />

        <NounExamples />

        <p>
          Devant <F>eux</F>, <F>elles</F> ou un nom au pluriel, on écrit{" "}
          <F>ce sont</F>, comme dans{" "}
          <Link href="/grammaire/c-est-ce-sont">Les présentatifs</Link>. La
          phrase dit deux choses à la fois : ce qui s’est passé, et qui l’a
          fait, plutôt qu’un autre.
        </p>

        <div className="attention">
          À l’oral, on entend souvent <Wrong>c’est moi qui a</Wrong>. À l’écrit,
          le verbe s’accorde toujours avec la personne : <F>c’est moi qui ai</F>
          , <F>c’est toi qui as</F>. Pour vérifier, dites la phrase sans{" "}
          <F>c’est … qui</F> : <F>j’ai les clés</F>, donc{" "}
          <F>c’est moi qui ai les clés</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">
            C’est moi qui
          </span>
          : el verbo sigue a la persona
        </h2>

        <div className="rule">
          Para destacar el sujeto, se encierra entre{" "}
          <strong lang="fr">c’est … qui</strong>. El verbo que va después de{" "}
          <F>qui</F> concuerda con ese sujeto, y no con <F>c’est</F>:{" "}
          <F>c’est moi qui ai</F>, <F>c’est nous qui sommes</F>.
        </div>

        <SubjectsTable lang="es" />

        <NounExamples />

        <p>
          Delante de <F>eux</F>, <F>elles</F> o un nombre en plural, se
          escribe <F>ce sont</F>, como en{" "}
          <Link href="/grammaire/c-est-ce-sont" lang="fr">
            Les présentatifs
          </Link>
          . La frase dice dos cosas a la vez: lo que pasó, y quién lo hizo, y
          no otro.
        </p>

        <div className="attention">
          Al hablar se oye mucho <Wrong>c’est moi qui a</Wrong>. Al escribir,
          el verbo concuerda siempre con la persona: <F>c’est moi qui ai</F>,{" "}
          <F>c’est toi qui as</F>. Para comprobarlo, di la frase sin{" "}
          <F>c’est … qui</F>: <F>j’ai les clés</F>, así que{" "}
          <F>c’est moi qui ai les clés</F>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>C’est là que : mettre en avant le reste</h2>

        <div className="rule">
          Le reste de la phrase se met en avant avec{" "}
          <strong>c’est … que</strong> : un lieu, un moment, une raison, une
          chose. Le mot reste <F>que</F>, pour un lieu comme pour un moment.
        </div>

        <RestTable lang="fr" />

        <p>
          Beaucoup de phrases toutes faites ont cette forme, et on les dit
          sans y penser :
        </p>

        <FixedExamples />

        <div className="attention">
          Après un lieu ou un moment, on ne met ni <F>où</F> ni <F>quand</F> :{" "}
          <Wrong>c’est à Lyon où j’ai appris</Wrong>,{" "}
          <Wrong>c’est demain quand je pars</Wrong>. Et le petit mot devant la
          personne ne se répète pas : <F>c’est à Marie que je parle</F>, jamais{" "}
          <Wrong>c’est à Marie à qui je parle</Wrong>.
        </div>

        <div className="exception">
          <F>où</F> est correct après un nom avec son article (<F>la ville</F>
          , <F>le jour</F>) : la phrase ne met plus rien en avant, elle
          présente.{" "}
          <F>C’est à Lyon que j’ai grandi</F> insiste sur le lieu ;{" "}
          <F>c’est la ville où j’ai grandi</F> présente la ville.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">
            C’est là que
          </span>
          : destacar el resto
        </h2>

        <div className="rule">
          El resto de la frase se destaca con{" "}
          <strong lang="fr">c’est … que</strong>: un lugar, un momento, una
          razón, una cosa. La palabra sigue siendo <F>que</F>, para un lugar
          igual que para un momento.
        </div>

        <RestTable lang="es" />

        <p>
          Muchas frases hechas tienen esta forma, y se dicen sin pensar:
        </p>

        <FixedExamples />

        <div className="attention">
          Después de un lugar o un momento no se pone ni <F>où</F> ni{" "}
          <F>quand</F>: <Wrong>c’est à Lyon où j’ai appris</Wrong>,{" "}
          <Wrong>c’est demain quand je pars</Wrong>. Y la palabra pequeña
          delante de la persona no se repite: <F>c’est à Marie que je parle</F>
          , nunca <Wrong>c’est à Marie à qui je parle</Wrong>.
        </div>

        <div className="exception">
          <F>où</F> es correcto después de un nombre con su artículo (
          <F>la ville</F>, <F>le jour</F>): la frase ya no destaca nada,
          presenta.{" "}
          <F>C’est à Lyon que j’ai grandi</F> insiste en el lugar;{" "}
          <F>c’est la ville où j’ai grandi</F> presenta la ciudad.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <F>c’est … qui</F> met le sujet en avant ; <F>c’est … que</F> met
            en avant tout le reste.
          </li>
          <li>
            Après <F>qui</F>, le verbe s’accorde avec la personne mise en
            avant : <F>c’est moi qui ai</F>, <F>c’est nous qui sommes</F>.
          </li>
          <li>
            Devant <F>eux</F>, <F>elles</F> ou un nom au pluriel, on écrit{" "}
            <F>ce sont</F> : <F>ce sont eux qui ont payé</F>.
          </li>
          <li>
            Pour un lieu, un moment ou une raison, le mot reste <F>que</F> :{" "}
            <F>c’est à Lyon que</F>, <F>c’est demain que</F>.
          </li>
          <li>
            Le petit mot devant la personne ne se répète pas :{" "}
            <F>c’est à Marie que je parle</F>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <F>c’est … qui</F> destaca el sujeto; <F>c’est … que</F> destaca
            todo lo demás.
          </li>
          <li>
            Después de <F>qui</F>, el verbo concuerda con la persona destacada:{" "}
            <F>c’est moi qui ai</F>, <F>c’est nous qui sommes</F>.
          </li>
          <li>
            Delante de <F>eux</F>, <F>elles</F> o un nombre en plural se
            escribe <F>ce sont</F>: <F>ce sont eux qui ont payé</F>.
          </li>
          <li>
            Para un lugar, un momento o una razón, la palabra sigue siendo{" "}
            <F>que</F>: <F>c’est à Lyon que</F>, <F>c’est demain que</F>.
          </li>
          <li>
            La palabra pequeña delante de la persona no se repite:{" "}
            <F>c’est à Marie que je parle</F>.
          </li>
        </ul>
      </div>
    </article>
  );
}
