import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-quantites";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (tables, examples) is written once, below, and shared; captions and column
   heads are passed in each language. Saying a number is A1's and A2's
   (`voc-nombres`, `voc-grands-nombres`): this page is what B1 does with one —
   round it, take a part of it, say how it moved. */

type Ui = "fr" | "es";

const ROUGHLY: [string, string, string][] = [
  ["une dizaine", "10", "Il y avait une dizaine d’enfants dans le parc."],
  ["une quinzaine", "15", "Nous partons une quinzaine de jours."],
  ["une vingtaine", "20", "Elle a une vingtaine d’années."],
  ["une cinquantaine", "50", "On a invité une cinquantaine de personnes."],
  ["une centaine", "100", "Le village compte une centaine de maisons."],
  ["un millier", "1 000", "Il y a un millier de livres dans la bibliothèque."],
];

const PARTS: [string, string, string][] = [
  ["1/2", "la moitié", "J’ai lu la moitié du livre."],
  ["1/3", "un tiers", "Le loyer prend un tiers de mon salaire."],
  ["1/4", "un quart", "Il a mangé un quart du gâteau."],
  ["3/4", "trois quarts", "Il a perdu les trois quarts de son argent."],
  ["20 %", "vingt pour cent", "On a une réduction de vingt pour cent."],
  ["3,2", "trois virgule deux", "Le bébé pèse trois virgule deux kilos."],
];

function RoughlyTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Un nombre arrondi, toujours suivi de « de »"
            : "Un número redondeado, siempre seguido de «de»"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Le mot" : "La palabra"}</th>
            <th scope="col">{ui === "fr" ? "Environ" : "Más o menos"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {ROUGHLY.map(([word, n, ex]) => (
            <tr key={word}>
              <th scope="row" className="fr" lang="fr">
                {word}
              </th>
              <td>{n}</td>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PartsTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Une fraction, un pourcentage, une décimale, et comment on les lit"
            : "Una fracción, un porcentaje, un decimal, y cómo se leen"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {PARTS.map(([n, word, ex]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {word}
              </td>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Words that go before an exact figure, and the words of a figure that
   moves. Same two columns: the word, then a sentence that uses it. */
const ABOUT: [string, string][] = [
  ["environ", "Il y a environ trente élèves dans la classe."],
  ["à peu près", "Le trajet dure à peu près une heure."],
  ["plus de", "Ça coûte plus de cent euros."],
  ["moins de", "Il a moins de vingt ans."],
];

const CHANGE: [string, string][] = [
  ["augmenter de", "Le prix du pain a augmenté de 10 %."],
  ["baisser de", "Le nombre de touristes a baissé de moitié."],
  ["doubler", "La population a doublé en vingt ans."],
  ["passer de … à", "Le loyer est passé de 600 à 700 euros."],
  ["une hausse de", "On annonce une hausse de 5 %."],
  ["une baisse de", "On annonce une baisse de 2 %."],
];

function WordTable({
  ui,
  caption,
  rows,
}: {
  ui: Ui;
  caption: { fr: string; es: string };
  rows: [string, string][];
}) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption[ui]}</caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Le mot" : "La palabra"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([word, ex]) => (
            <tr key={word}>
              <th scope="row" className="fr" lang="fr">
                {word}
              </th>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ABOUT_CAPTION = {
  fr: "Le chiffre exact, et un mot devant",
  es: "La cifra exacta, con una palabra delante",
};

const CHANGE_CAPTION = {
  fr: "Trois verbes, deux noms, et « de » partout",
  es: "Tres verbos, dos nombres, y «de» en todas partes",
};

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>À peu près</h2>

        <div className="rule">
          <span className="fr">-aine</span> + <span className="fr">de</span> :{" "}
          <span className="fr">une vingtaine de personnes</span>. Pour 1 000,{" "}
          <span className="fr">un millier</span>.
        </div>

        <RoughlyTable ui="fr" />

        <WordTable ui="fr" caption={ABOUT_CAPTION} rows={ABOUT} />

        <div className="attention">
          Jamais <span className="fr">des</span> devant un nombre :{" "}
          <s className="fr">des vingt personnes</s> est faux.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Más o menos:{" "}
          <span className="fr" lang="fr">
            à peu près
          </span>
        </h2>

        <div className="rule">
          <span className="fr" lang="fr">-aine</span> +{" "}
          <span className="fr" lang="fr">de</span>:{" "}
          <span className="fr" lang="fr">une vingtaine de personnes</span>. Para
          1 000, <span className="fr" lang="fr">un millier</span>.
        </div>

        <RoughlyTable ui="es" />

        <WordTable ui="es" caption={ABOUT_CAPTION} rows={ABOUT} />

        <div className="attention">
          Nunca <span className="fr" lang="fr">des</span> delante de un número
          («unos veinte»): <s className="fr" lang="fr">des vingt personnes</s>{" "}
          está mal.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Une partie du tout</h2>

        <div className="rule">
          Une fraction + <span className="fr">de</span> :{" "}
          <span className="fr">la moitié du livre</span>.{" "}
          <span className="fr">%</span> se lit{" "}
          <span className="fr">pour cent</span>.
        </div>

        <PartsTable ui="fr" />

        <div className="attention">
          Pas d’article devant le pourcentage :{" "}
          <span className="fr">20 % des élèves</span>, jamais{" "}
          <s className="fr">le 20 % des élèves</s>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Una parte del todo:{" "}
          <span className="fr" lang="fr">
            la moitié, un tiers
          </span>
        </h2>

        <div className="rule">
          Una fracción + <span className="fr" lang="fr">de</span>:{" "}
          <span className="fr" lang="fr">la moitié du livre</span>.{" "}
          <span className="fr" lang="fr">%</span> se lee{" "}
          <span className="fr" lang="fr">pour cent</span>.
        </div>

        <PartsTable ui="es" />

        <div className="attention">
          Sin artículo delante del porcentaje:{" "}
          <span className="fr" lang="fr">20 % des élèves</span>, nunca{" "}
          <s className="fr" lang="fr">le 20 % des élèves</s>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Ça monte, ça baisse</h2>

        <WordTable ui="fr" caption={CHANGE_CAPTION} rows={CHANGE} />

        <div className="attention">
          <span className="fr">augmenter de 10 %</span>, jamais{" "}
          <s className="fr">augmenter en 10 %</s>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Sube, baja:{" "}
          <span className="fr" lang="fr">
            ça monte, ça baisse
          </span>
        </h2>

        <WordTable ui="es" caption={CHANGE_CAPTION} rows={CHANGE} />

        <div className="attention">
          <span className="fr" lang="fr">augmenter de 10 %</span> («aumentar
          en un 10 %»), nunca{" "}
          <s className="fr" lang="fr">augmenter en 10 %</s>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Un nombre arrondi : <span className="fr">-aine</span> +{" "}
            <span className="fr">de</span>, ou{" "}
            <span className="fr">environ</span> devant le chiffre.
          </li>
          <li>
            Une fraction + <span className="fr">de</span> :{" "}
            <span className="fr">la moitié du livre</span>.
          </li>
          <li>
            <span className="fr">%</span> se lit{" "}
            <span className="fr">pour cent</span>, sans article devant.
          </li>
          <li>
            Un chiffre <span className="fr">augmente</span>,{" "}
            <span className="fr">baisse</span>,{" "}
            <span className="fr">double</span>, ou{" "}
            <span className="fr">passe de … à</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Un número redondeado: <span className="fr" lang="fr">-aine</span> +{" "}
            <span className="fr" lang="fr">de</span>, o{" "}
            <span className="fr" lang="fr">environ</span> delante de la cifra.
          </li>
          <li>
            Una fracción + <span className="fr" lang="fr">de</span>:{" "}
            <span className="fr" lang="fr">la moitié du livre</span>.
          </li>
          <li>
            <span className="fr" lang="fr">%</span> se lee{" "}
            <span className="fr" lang="fr">pour cent</span>, sin artículo
            delante.
          </li>
          <li>
            Una cifra <span className="fr" lang="fr">augmente</span>,{" "}
            <span className="fr" lang="fr">baisse</span>,{" "}
            <span className="fr" lang="fr">double</span>, o{" "}
            <span className="fr" lang="fr">passe de … à</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
