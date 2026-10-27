import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-partitifs";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The French taught is written once, below, and shared. */

type Lang = "fr" | "es";

const FORMS = [
  { noun: { fr: "masculin", es: "masculino" }, form: "du", example: "Je mange du pain." },
  { noun: { fr: "féminin", es: "femenino" }, form: "de la", example: "Elle boit de la limonade." },
  {
    noun: { fr: "devant une voyelle ou un h muet", es: "delante de vocal o de h muda" },
    form: "de l’",
    example: "Il faut de l’eau.",
  },
  { noun: { fr: "pluriel", es: "plural" }, form: "des", example: "On achète des épinards." },
];

const THREE = [
  {
    article: "le",
    phrase: "J’aime le gâteau.",
    sense: { fr: "le gâteau en général, tous les gâteaux", es: "el pastel en general, todos los pasteles" },
  },
  {
    article: "un",
    phrase: "Je prends un gâteau.",
    sense: { fr: "un gâteau entier, qu’on peut compter", es: "un pastel entero, que se puede contar" },
  },
  {
    article: "du",
    phrase: "Je prends du gâteau.",
    sense: { fr: "une part, prise dans le gâteau", es: "una porción, tomada del pastel" },
  },
];

const QUANTITIES = [
  ["du pain", "beaucoup de pain", "beaucoup"],
  ["du sel", "un peu de sel", "un peu"],
  ["des tomates", "un kilo de tomates", "un kilo"],
  ["de l’eau", "une bouteille d’eau", "une bouteille"],
];

function FormsTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? { caption: "Les formes, et le nom qui décide de chacune", cols: ["Le nom", "La forme", "Exemple"] }
      : { caption: "Las formas, y el nombre que decide cada una", cols: ["El nombre", "La forma", "Ejemplo"] };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <thead>
          <tr>
            {t.cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FORMS.map((row) => (
            <tr key={row.form}>
              <th scope="row">{row.noun[lang]}</th>
              <td className="fr" lang="fr">
                {row.form}
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

function ThreeTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? { caption: "Le même nom, trois articles, trois sens", cols: ["L’article", "La phrase", "Ce qu’elle dit"] }
      : { caption: "El mismo nombre, tres artículos, tres sentidos", cols: ["El artículo", "La frase", "Lo que dice"] };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <thead>
          <tr>
            {t.cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {THREE.map((row) => (
            <tr key={row.article}>
              <th scope="row" className="fr" lang="fr">
                {row.article}
              </th>
              <td className="fr" lang="fr">
                {row.phrase}
              </td>
              <td>{row.sense[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuantityTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? {
          caption: "Ce que devient l’article derrière un mot de quantité",
          cols: ["Sans quantité", "Avec quantité", "Le mot qui l’a chassé"],
        }
      : {
          caption: "Lo que pasa con el artículo detrás de una palabra de cantidad",
          cols: ["Sin cantidad", "Con cantidad", "La palabra que lo echa"],
        };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <thead>
          <tr>
            {t.cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {QUANTITIES.map((row) => (
            <tr key={row[0]}>
              {row.map((cell) => (
                <td key={cell} className="fr" lang="fr">
                  {cell}
                </td>
              ))}
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
        <h2>Une partie, pas un nombre</h2>

        <div className="rule">
          Devant un nom qu’on ne compte pas, le français emploie un article à
          lui : <span className="fr">du</span>,{" "}
          <span className="fr">de la</span>, <span className="fr">de l’</span>,
          et <span className="fr">des</span> au pluriel. Il dit qu’on prend une
          certaine quantité de la chose, sans dire laquelle.
        </div>

        <FormsTable lang="fr" />

        <p>
          Au pluriel, il n’y a rien à choisir :{" "}
          <span className="fr">des</span> sert à la fois de pluriel à{" "}
          <span className="fr">un</span> et de pluriel à{" "}
          <span className="fr">du</span>. La question ne se pose donc qu’au
          singulier.
        </p>

        <div className="attention">
          Ce qui ne se compte pas ne prend jamais{" "}
          <span className="fr">un</span> ni <span className="fr">une</span>. On
          ne dit pas <s className="fr">un lait</s>, on dit{" "}
          <span className="fr">du lait</span>, ou bien{" "}
          <span className="fr">un verre de lait</span> quand on veut compter :
          alors c’est le verre qu’on compte, pas le lait.
        </div>

        <p>
          L’article partitif ne sert pas qu’à la nourriture. Tout ce qui se
          prend par quantité le demande, y compris ce qui ne se touche pas :{" "}
          <span className="fr">du courage</span>,{" "}
          <span className="fr">de la chance</span>,{" "}
          <span className="fr">de la patience</span>,{" "}
          <span className="fr">du bruit</span>. Appliqué aux ingrédients, il est
          aussi dans{" "}
          <Link href="/vocabulaire/la-recette-des-croissants">
            La recette des croissants
          </Link>
          .
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>Una parte, no un número</h2>

        <div className="rule">
          Delante de un nombre que no se cuenta, el francés usa un artículo
          propio:{" "}
          <span className="fr" lang="fr">du</span>,{" "}
          <span className="fr" lang="fr">de la</span>,{" "}
          <span className="fr" lang="fr">de l’</span>, y{" "}
          <span className="fr" lang="fr">des</span> en plural. Dice que se toma
          una cierta cantidad de la cosa, sin decir cuál.
        </div>

        <FormsTable lang="es" />

        <p>
          En plural no hay nada que elegir:{" "}
          <span className="fr" lang="fr">des</span> sirve a la vez de plural de{" "}
          <span className="fr" lang="fr">un</span> y de plural de{" "}
          <span className="fr" lang="fr">du</span>. La duda solo existe en
          singular.
        </p>

        <div className="attention">
          Lo que no se cuenta no lleva nunca{" "}
          <span className="fr" lang="fr">un</span> ni{" "}
          <span className="fr" lang="fr">une</span>. No se dice{" "}
          <s className="fr" lang="fr">un lait</s>, se dice{" "}
          <span className="fr" lang="fr">du lait</span>, o bien{" "}
          <span className="fr" lang="fr">un verre de lait</span> cuando se
          quiere contar: entonces lo que se cuenta es el vaso, no la leche.
        </div>

        <p>
          El artículo partitivo no sirve solo para la comida. Todo lo que se
          toma por cantidad lo pide, también lo que no se toca:{" "}
          <span className="fr" lang="fr">du courage</span>,{" "}
          <span className="fr" lang="fr">de la chance</span>,{" "}
          <span className="fr" lang="fr">de la patience</span>,{" "}
          <span className="fr" lang="fr">du bruit</span>. Aplicado a los
          ingredientes, aparece también en{" "}
          <Link href="/vocabulaire/la-recette-des-croissants">
            La recette des croissants
          </Link>
          .
        </p>
      </section>

      <section data-ui="fr">
        <h2>le, un ou du ?</h2>

        <div className="rule">
          Trois articles pour le même nom, et trois sens différents.{" "}
          <span className="fr">le</span> désigne la chose entière ou connue,{" "}
          <span className="fr">un</span> en compte un exemplaire,{" "}
          <span className="fr">du</span> en prélève une partie.
        </div>

        <ThreeTable lang="fr" />

        <div className="attention">
          Les verbes qui disent un goût gardent toujours l’article défini :{" "}
          <span className="fr">j’aime le café</span>,{" "}
          <span className="fr">elle adore les gâteaux</span>,{" "}
          <span className="fr">je déteste le bruit</span>. On n’écrit jamais{" "}
          <s className="fr">j’aime du café</s> : aimer ne prend pas une
          part, il prend la chose entière.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Posez la question au verbe : est-ce qu’on en prend, ou est-ce qu’on
            en parle ?
          </p>
          <p>
            Avec <span className="fr">manger</span>,{" "}
            <span className="fr">boire</span>,{" "}
            <span className="fr">acheter</span>,{" "}
            <span className="fr">prendre</span> et{" "}
            <span className="fr">il faut</span>, on prend une quantité, donc{" "}
            <span className="fr">du</span>. Avec{" "}
            <span className="fr">aimer</span>,{" "}
            <span className="fr">adorer</span>,{" "}
            <span className="fr">détester</span> et{" "}
            <span className="fr">préférer</span>, on parle de la chose entière,
            donc <span className="fr">le</span>. La même phrase peut contenir
            les deux : <span className="fr">j’aime le thé, alors je bois du thé
            tous les matins</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">le, un ou du ?</span>
        </h2>

        <div className="rule">
          Tres artículos para el mismo nombre, y tres sentidos distintos.{" "}
          <span className="fr" lang="fr">le</span> señala la cosa entera o ya
          conocida, <span className="fr" lang="fr">un</span> cuenta un
          ejemplar, <span className="fr" lang="fr">du</span> toma una parte.
        </div>

        <ThreeTable lang="es" />

        <div className="attention">
          Los verbos que dicen un gusto conservan siempre el artículo
          definido:{" "}
          <span className="fr" lang="fr">j’aime le café</span>,{" "}
          <span className="fr" lang="fr">elle adore les gâteaux</span>,{" "}
          <span className="fr" lang="fr">je déteste le bruit</span>. Nunca se
          escribe <s className="fr" lang="fr">j’aime du café</s>:{" "}
          <span className="fr" lang="fr">aimer</span> no toma una parte, toma
          la cosa entera.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Hazle la pregunta al verbo: ¿se toma una parte o se habla de la
            cosa?
          </p>
          <p>
            Con <span className="fr" lang="fr">manger</span>,{" "}
            <span className="fr" lang="fr">boire</span>,{" "}
            <span className="fr" lang="fr">acheter</span>,{" "}
            <span className="fr" lang="fr">prendre</span> y{" "}
            <span className="fr" lang="fr">il faut</span> se toma una cantidad,
            así que <span className="fr" lang="fr">du</span>. Con{" "}
            <span className="fr" lang="fr">aimer</span>,{" "}
            <span className="fr" lang="fr">adorer</span>,{" "}
            <span className="fr" lang="fr">détester</span> y{" "}
            <span className="fr" lang="fr">préférer</span> se habla de la cosa
            entera, así que <span className="fr" lang="fr">le</span>. Una misma
            frase puede llevar los dos:{" "}
            <span className="fr" lang="fr">
              j’aime le thé, alors je bois du thé tous les matins
            </span>
            .
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Après une quantité, il ne reste que « de »</h2>

        <div className="rule">
          Dès qu’un mot dit la quantité, l’article disparaît et il ne reste
          que <strong>de</strong>. La quantité a pris sa place.
        </div>

        <QuantityTable lang="fr" />

        <div className="attention">
          <span className="fr">de</span> reste seul :{" "}
          <span className="fr">beaucoup du pain</span> et{" "}
          <span className="fr">assez de la patience</span> ne s’écrivent pas.
          Et devant une voyelle, <span className="fr">de</span> s’élide :{" "}
          <span className="fr">un peu d’eau</span>,{" "}
          <span className="fr">trop d’huile</span>.
        </div>

        <p>
          La négation produit exactement le même effet :{" "}
          <span className="fr">je ne bois pas de café</span>. Ce qu’elle change
          et ce qu’elle épargne est dans{" "}
          <Link href="/grammaire/la-negation">La négation</Link>.
        </p>

        <div className="exception">
          Deux expressions gardent l’article entier :{" "}
          <span className="fr">bien des gens</span> et{" "}
          <span className="fr">la plupart des élèves</span>. Ce sont des
          tournures figées ; apprenez-les telles quelles plutôt que d’y chercher
          la règle.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Después de una cantidad, solo queda «
          <span className="fr" lang="fr">de</span>»
        </h2>

        <div className="rule">
          En cuanto una palabra dice la cantidad, el artículo desaparece y solo
          queda <strong lang="fr">de</strong>. La cantidad ha ocupado su sitio.
        </div>

        <QuantityTable lang="es" />

        <div className="attention">
          <span className="fr" lang="fr">de</span> se queda solo:{" "}
          <span className="fr" lang="fr">beaucoup du pain</span> y{" "}
          <span className="fr" lang="fr">assez de la patience</span> no se
          escriben. Y delante de vocal,{" "}
          <span className="fr" lang="fr">de</span> se elide:{" "}
          <span className="fr" lang="fr">un peu d’eau</span>,{" "}
          <span className="fr" lang="fr">trop d’huile</span>.
        </div>

        <p>
          La negación produce exactamente el mismo efecto:{" "}
          <span className="fr" lang="fr">je ne bois pas de café</span>. Lo que
          cambia y lo que respeta está en{" "}
          <Link href="/grammaire/la-negation">La négation</Link>.
        </p>

        <div className="exception">
          Dos expresiones conservan el artículo entero:{" "}
          <span className="fr" lang="fr">bien des gens</span> y{" "}
          <span className="fr" lang="fr">la plupart des élèves</span>. Son
          expresiones fijas; apréndelas tal cual en lugar de buscarles una
          regla.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Devant ce qui ne se compte pas :{" "}
            <span className="fr">du</span>, <span className="fr">de la</span>,{" "}
            <span className="fr">de l’</span>, et{" "}
            <span className="fr">des</span> au pluriel.
          </li>
          <li>
            Ce qui ne se compte pas ne prend jamais{" "}
            <span className="fr">un</span> :{" "}
            <span className="fr">du lait</span>, ou{" "}
            <span className="fr">un verre de lait</span>.
          </li>
          <li>
            <span className="fr">le</span> pour la chose entière,{" "}
            <span className="fr">un</span> pour un exemplaire,{" "}
            <span className="fr">du</span> pour une partie.
          </li>
          <li>
            <span className="fr">aimer</span>,{" "}
            <span className="fr">adorer</span>,{" "}
            <span className="fr">détester</span> gardent toujours{" "}
            <span className="fr">le</span>.
          </li>
          <li>
            Après une quantité comme après une négation, il ne reste que{" "}
            <span className="fr">de</span> :{" "}
            <span className="fr">beaucoup de pain</span>,{" "}
            <span className="fr">pas de café</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Delante de lo que no se cuenta:{" "}
            <span className="fr" lang="fr">du</span>,{" "}
            <span className="fr" lang="fr">de la</span>,{" "}
            <span className="fr" lang="fr">de l’</span>, y{" "}
            <span className="fr" lang="fr">des</span> en plural.
          </li>
          <li>
            Lo que no se cuenta no lleva nunca{" "}
            <span className="fr" lang="fr">un</span>:{" "}
            <span className="fr" lang="fr">du lait</span>, o{" "}
            <span className="fr" lang="fr">un verre de lait</span>.
          </li>
          <li>
            <span className="fr" lang="fr">le</span> para la cosa entera,{" "}
            <span className="fr" lang="fr">un</span> para un ejemplar,{" "}
            <span className="fr" lang="fr">du</span> para una parte.
          </li>
          <li>
            <span className="fr" lang="fr">aimer</span>,{" "}
            <span className="fr" lang="fr">adorer</span>,{" "}
            <span className="fr" lang="fr">détester</span> conservan siempre{" "}
            <span className="fr" lang="fr">le</span>.
          </li>
          <li>
            Después de una cantidad, como después de una negación, solo queda{" "}
            <span className="fr" lang="fr">de</span>:{" "}
            <span className="fr" lang="fr">beaucoup de pain</span>,{" "}
            <span className="fr" lang="fr">pas de café</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
