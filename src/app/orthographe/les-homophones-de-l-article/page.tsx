import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-homophones-de-l-article";

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

const LA_ROWS: { word: string; what: Record<Lang, string>; swap: string; example: string }[] = [
  {
    word: "la",
    what: { fr: "un article, ou un pronom devant le verbe", es: "un artículo, o un pronombre delante del verbo" },
    swap: "les",
    example: "la maison · je la vois",
  },
  {
    word: "l’a",
    what: { fr: "le verbe avoir, avec un pronom collé", es: "el verbo avoir, con un pronombre pegado" },
    swap: "l’avait",
    example: "il l’a vue",
  },
  {
    word: "là",
    what: { fr: "un adverbe : l’endroit", es: "un adverbio: el lugar" },
    swap: "ici",
    example: "pose-le là",
  },
];

function LaTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Le mot", "Ce que c’est", "Remplacez par", "Exemple"]
      : ["La palabra", "Qué es", "Sustituye por", "Ejemplo"];
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
          {LA_ROWS.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td>{row.what[lang]}</td>
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

function LaExample({ lang }: { lang: Lang }) {
  const l =
    lang === "fr"
      ? ["pronom", "verbe", "adverbe"]
      : ["pronombre", "verbo", "adverbio"];
  return (
    <div className="example" lang="fr">
      je <strong>la</strong> vois → je <strong>les</strong> vois ✓ <span lang={lang}>{l[0]}</span>
      <br />
      il <strong>l’a</strong> vue → il <strong>l’avait</strong> vue ✓ <span lang={lang}>{l[1]}</span>
      <br />
      pose-le <strong>là</strong> → pose-le <strong>ici</strong> ✓ <span lang={lang}>{l[2]}</span>
    </div>
  );
}

function DesExample() {
  return (
    <div className="example" lang="fr">
      <strong>Des</strong> enfants jouent dans la cour.
      <br />
      <strong>Dès</strong> huit heures, le magasin est ouvert. →{" "}
      <strong>À partir de</strong> huit heures. ✓
    </div>
  );
}

function DuExample({ lang }: { lang: Lang }) {
  const label = lang === "fr" ? "participe" : "participio";
  return (
    <div className="example" lang="fr">
      Je bois <strong>du</strong> café.
      <br />
      Il a <strong>dû</strong> partir plus tôt. → Il a <strong>pu</strong>{" "}
      partir plus tôt. ✓ <span lang={lang}>{label}</span>
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>la, l’a, là : trois mots pour un son</h2>

        <p>
          Trois façons d’écrire la même syllabe. La première appartient au nom
          ou au verbe qu’elle accompagne, la deuxième est le verbe <F>avoir</F>,
          la troisième est un adverbe. Chacune a son remplacement.
        </p>

        <LaTable lang="fr" caption="Le remplacement qui décide, mot par mot" />

        <LaExample lang="fr" />

        <div className="attention">
          <F>l’a</F> est toujours suivi d’un participe passé, parce que c’est un
          passé composé auquel il manque le sujet : <F>il l’a pris</F>,{" "}
          <F>elle l’a compris</F>. Si aucun participe ne suit, ce n’est pas{" "}
          <F>l’a</F>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            L’accent de <strong>là</strong> se retrouve dans tous ses composés.
          </p>
          <p>
            <F>voilà</F>, <F>là-bas</F>, <F>ce jour-là</F>, <F>celui-là</F>{" "}
            portent le même <F>à</F> accentué, et pour la même raison : ils
            montrent un endroit ou un moment. Les formes en <F>-là</F> collées au
            nom sont dans{" "}
            <Link href="/grammaire/les-determinants-demonstratifs">
              Les déterminants démonstratifs
            </Link>
            .
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>la, l’a, là</F>: tres palabras para un sonido
        </h2>

        <p>
          Tres maneras de escribir la misma sílaba. La primera pertenece al
          nombre o al verbo que acompaña, la segunda es el verbo <F>avoir</F>, la
          tercera es un adverbio. Cada una tiene su sustitución.
        </p>

        <LaTable lang="es" caption="La sustitución que decide, palabra por palabra" />

        <LaExample lang="es" />

        <div className="attention">
          <F>l’a</F> va siempre seguido de un participio, porque es un passé
          composé al que le falta el sujeto: <F>il l’a pris</F>,{" "}
          <F>elle l’a compris</F>. Si no sigue ningún participio, no es{" "}
          <F>l’a</F>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            El acento de <strong>là</strong> se repite en todos sus compuestos.
          </p>
          <p>
            <F>voilà</F>, <F>là-bas</F>, <F>ce jour-là</F>, <F>celui-là</F>{" "}
            llevan la misma <F>à</F> acentuada, y por la misma razón: señalan un
            lugar o un momento. Las formas en <F>-là</F> pegadas al nombre están
            en{" "}
            <Link href="/grammaire/les-determinants-demonstratifs" lang="fr">
              Les déterminants démonstratifs
            </Link>
            .
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>des ou dès : l’accent change le mot</h2>

        <div className="rule">
          <F>des</F> est un article : il annonce un nom au pluriel. <F>dès</F>,
          avec son accent grave, est une préposition de temps et signifie{" "}
          <F>à partir de</F>.
        </div>

        <DesExample />

        <p>
          C’est le raisonnement de <F>ou / où</F> dans{" "}
          <Link href="/orthographe/les-homophones">Les homophones</Link> :
          l’accent penche du côté du repère, ici un repère dans le temps. Sans
          accent, le mot est un article, et il faut un nom pluriel derrière lui.
        </p>

        <div className="attention">
          <F>dès</F> se place devant un moment, jamais devant une durée : on
          écrit <F>dès demain</F>, <F>dès son arrivée</F>, mais{" "}
          <F>pendant deux heures</F>. Un moment répond à <F>quand ?</F>, une
          durée à <F>combien de temps ?</F>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>des</F> o <F>dès</F>: el acento cambia la palabra
        </h2>

        <div className="rule">
          <F>des</F> es un artículo: anuncia un nombre en plural. <F>dès</F>, con
          su acento grave, es una preposición de tiempo y significa{" "}
          <F>à partir de</F>.
        </div>

        <DesExample />

        <p>
          Es el mismo razonamiento que <F>ou / où</F> en{" "}
          <Link href="/orthographe/les-homophones" lang="fr">
            Les homophones
          </Link>
          : el acento se inclina del lado del punto de referencia, aquí un punto
          de referencia en el tiempo. Sin acento, la palabra es un artículo, y
          detrás necesita un nombre en plural.
        </p>

        <div className="attention">
          <F>dès</F> va delante de un momento, nunca delante de una duración: se
          escribe <F>dès demain</F>, <F>dès son arrivée</F>, pero{" "}
          <F>pendant deux heures</F>. Un momento responde a <F>quand ?</F>, una
          duración a <F>combien de temps ?</F>
        </div>
      </section>

      <section data-ui="fr">
        <h2>du ou dû : l’accent du participe</h2>

        <div className="rule">
          <F>du</F> est un article. <F>dû</F> est le participe passé du verbe{" "}
          <F>devoir</F>, et son accent circonflexe n’est là que pour le
          distinguer de l’autre.
        </div>

        <DuExample lang="fr" />

        <p>
          Le test est le même que pour tous les participes : remplacez le mot par
          un autre participe passé. Si la phrase tient, l’accent est nécessaire.
        </p>

        <div className="attention">
          L’accent ne survit qu’au masculin singulier. Dès que le participe
          s’accorde, il le perd : <F>dû</F>, mais <F>due</F>, <F>dus</F>,{" "}
          <F>dues</F>. C’est la preuve que l’accent distingue et ne prononce
          rien.
        </div>

        <div className="exception">
          Le nom <F>le dû</F> existe, au sens de ce qu’on doit à quelqu’un :{" "}
          <F>réclamer son dû</F>. Il est rare, et il garde l’accent.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>du</F> o <F>dû</F>: el acento del participio
        </h2>

        <div className="rule">
          <F>du</F> es un artículo. <F>dû</F> es el participio del verbo{" "}
          <F>devoir</F>, y su acento circunflejo está ahí solo para distinguirlo
          del otro.
        </div>

        <DuExample lang="es" />

        <p>
          El test es el mismo que para todos los participios: sustituye la
          palabra por otro participio. Si la frase se sostiene, el acento es
          necesario.
        </p>

        <div className="attention">
          El acento solo sobrevive en masculino singular. En cuanto el
          participio concuerda, lo pierde: <F>dû</F>, pero <F>due</F>, <F>dus</F>
          , <F>dues</F>. Es la prueba de que el acento distingue y no pronuncia
          nada.
        </div>

        <div className="exception">
          Existe el nombre <F>le dû</F>, en el sentido de lo que se le debe a
          alguien: <F>réclamer son dû</F>. Es raro, y conserva el acento.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <F>la</F> se remplace par <F>les</F>, <F>l’a</F> par <F>l’avait</F>,{" "}
            <F>là</F> par <F>ici</F>.
          </li>
          <li>
            <F>l’a</F> est toujours suivi d’un participe passé.
          </li>
          <li>
            <F>dès</F> vaut <F>à partir de</F> ; <F>des</F> annonce un nom
            pluriel.
          </li>
          <li>
            <F>dû</F> est le participe de <F>devoir</F> et se remplace par un
            autre participe.
          </li>
          <li>
            L’accent de <F>dû</F> disparaît dès l’accord : <F>due</F>,{" "}
            <F>dus</F>, <F>dues</F>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <F>la</F> se sustituye por <F>les</F>, <F>l’a</F> por <F>l’avait</F>,{" "}
            <F>là</F> por <F>ici</F>.
          </li>
          <li>
            <F>l’a</F> va siempre seguido de un participio.
          </li>
          <li>
            <F>dès</F> equivale a <F>à partir de</F>; <F>des</F> anuncia un
            nombre en plural.
          </li>
          <li>
            <F>dû</F> es el participio de <F>devoir</F> y se sustituye por otro
            participio.
          </li>
          <li>
            El acento de <F>dû</F> desaparece con la concordancia: <F>due</F>,{" "}
            <F>dus</F>, <F>dues</F>.
          </li>
        </ul>
      </div>
    </article>
  );
}
