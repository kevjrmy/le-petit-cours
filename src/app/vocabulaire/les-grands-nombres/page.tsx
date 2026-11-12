import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { NumberSpeaker } from "@/components/speech/NumberSpeaker";

const PATH = "/vocabulaire/les-grands-nombres";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (tables, examples) is written once, below, and shared; captions and column
   heads are passed in each language. 0 to 99 belong to `voc-nombres` (A1):
   this page starts at 100 and never restates them. */

type Ui = "fr" | "es";

const BIG: [string, string, string][] = [
  ["100", "cent", "Il y a cent places dans la salle."],
  ["200", "deux cents", "Le loyer augmente de deux cents euros."],
  ["250", "deux cent cinquante", "Le livre a deux cent cinquante pages."],
  ["1 000", "mille", "Le vélo coûte mille euros."],
  ["3 000", "trois mille", "La ville a trois mille habitants."],
  ["1 000 000", "un million", "Le film a fait un million d’entrées."],
  ["2 000 000", "deux millions", "Paris a plus de deux millions d’habitants."],
];

/* The short form's letters are raised: `1er`, `2e` (`<sup>`). */
const ORDINALS: [string, string, ReactNode, string][] = [
  [
    "1",
    "premier, première",
    <>
      1<sup>er</sup>, 1<sup>re</sup>
    </>,
    "J’habite au premier étage.",
  ],
  ["2", "deuxième", <>2<sup>e</sup></>, "C’est la deuxième fois."],
  ["4", "quatrième", <>4<sup>e</sup></>, "Le bureau est au quatrième étage."],
  ["5", "cinquième", <>5<sup>e</sup></>, "Prenez la cinquième rue à droite."],
  ["9", "neuvième", <>9<sup>e</sup></>, "C’est son neuvième roman."],
  ["21", "vingt et unième", <>21<sup>e</sup></>, "Nous sommes au vingt et unième siècle."],
];

function BigTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "De cent à deux millions, et la petite marque du pluriel"
            : "De cien a dos millones, y la pequeña marca del plural"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {BIG.map(([n, word, ex]) => (
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

function OrdinalTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Le rang, dit en lettres et écrit en abrégé"
            : "El orden, dicho en letras y escrito abreviado"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">{ui === "fr" ? "Abrégé" : "Abreviado"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {ORDINALS.map(([n, word, short, ex]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {word}
              </td>
              <td className="fr" lang="fr">
                {short}
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

/* A year is read whole; ten years are « les années », after « dans ». */
const YEARS: [string, string, string][] = [
  ["1789", "mille sept cent quatre-vingt-neuf", "La Révolution commence en 1789."],
  ["1998", "mille neuf cent quatre-vingt-dix-huit", "Je suis né en 1998."],
  ["2026", "deux mille vingt-six", "Nous sommes en 2026."],
  ["80", "les années quatre-vingt", "Ils se sont rencontrés dans les années 80."],
];

function YearTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Trois années et une décennie, lues en entier"
            : "Tres años y una década, leídos enteros"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {YEARS.map(([n, word, ex]) => (
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

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      {/* The tool first, before the lesson: the one interface in the page,
          bilingual by itself (`T`), so it sits outside the paired sections. */}
      <NumberSpeaker examples={[200, 1000, 1980, 2026, 2000000]} />

      <section data-ui="fr">
        <h2>Cent, mille, un million</h2>

        <div className="rule">
          Pas de <span className="fr">un</span> devant{" "}
          <span className="fr">cent</span> et <span className="fr">mille</span>.{" "}
          <span className="fr">mille</span> ne prend jamais de{" "}
          <span className="fr">s</span> ; <span className="fr">million</span>{" "}
          prend un <span className="fr">s</span> et <span className="fr">de</span>.
        </div>

        <BigTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Cien, mil, un millón:{" "}
          <span className="fr" lang="fr">
            cent, mille, un million
          </span>
        </h2>

        <div className="rule">
          Sin <span className="fr" lang="fr">un</span> delante de{" "}
          <span className="fr" lang="fr">cent</span> y{" "}
          <span className="fr" lang="fr">mille</span>.{" "}
          <span className="fr" lang="fr">mille</span> nunca lleva{" "}
          <span className="fr" lang="fr">s</span>;{" "}
          <span className="fr" lang="fr">million</span> lleva{" "}
          <span className="fr" lang="fr">s</span> y{" "}
          <span className="fr" lang="fr">de</span>.
        </div>

        <BigTable ui="es" />
      </section>

      <section data-ui="fr">
        <h2>Dire une année</h2>

        <div className="rule">
          Une année : <span className="fr">en 1998</span>, sans article. Dix
          ans : <span className="fr">dans les années 80</span>.
        </div>

        <YearTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Decir un año:{" "}
          <span className="fr" lang="fr">
            en 2026
          </span>
        </h2>

        <div className="rule">
          Un año: <span className="fr" lang="fr">en 1998</span>, sin artículo.
          Diez años: <span className="fr" lang="fr">dans les années 80</span>.
        </div>

        <YearTable ui="es" />
      </section>

      <section data-ui="fr">
        <h2>Premier, deuxième, troisième</h2>

        <div className="rule">
          On ajoute <span className="fr">-ième</span> au nombre ;{" "}
          <span className="fr">un</span> devient{" "}
          <span className="fr">premier</span>.
        </div>

        <OrdinalTable ui="fr" />

        <div className="attention">
          Le siècle prend le rang :{" "}
          <span className="fr">le vingt et unième siècle</span>, et non{" "}
          <span lang="es">« siglo veintiuno »</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Primero, segundo, tercero:{" "}
          <span className="fr" lang="fr">
            premier, deuxième
          </span>
        </h2>

        <div className="rule">
          Se añade <span className="fr" lang="fr">-ième</span> al número;{" "}
          <span className="fr" lang="fr">un</span> se convierte en{" "}
          <span className="fr" lang="fr">premier</span>.
        </div>

        <OrdinalTable ui="es" />

        <div className="attention">
          El siglo lleva el puesto:{" "}
          <span className="fr" lang="fr">le vingt et unième siècle</span>, no
          «siglo veintiuno».
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">cent</span>, <span className="fr">mille</span>{" "}
            sans <span className="fr">un</span> ;{" "}
            <span className="fr">mille</span> sans <span className="fr">s</span>.
          </li>
          <li>
            <span className="fr">deux millions de personnes</span> : un{" "}
            <span className="fr">s</span> et <span className="fr">de</span>.
          </li>
          <li>
            <span className="fr">en</span> devant une année,{" "}
            <span className="fr">dans les années</span> devant une décennie.
          </li>
          <li>
            Le rang : <span className="fr">-ième</span>, sauf{" "}
            <span className="fr">premier</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">cent</span>,{" "}
            <span className="fr" lang="fr">mille</span> sin{" "}
            <span className="fr" lang="fr">un</span>;{" "}
            <span className="fr" lang="fr">mille</span> sin{" "}
            <span className="fr" lang="fr">s</span>.
          </li>
          <li>
            <span className="fr" lang="fr">deux millions de personnes</span>:
            una <span className="fr" lang="fr">s</span> y{" "}
            <span className="fr" lang="fr">de</span>.
          </li>
          <li>
            <span className="fr" lang="fr">en</span> delante de un año,{" "}
            <span className="fr" lang="fr">dans les années</span> delante de una
            década.
          </li>
          <li>
            El puesto: <span className="fr" lang="fr">-ième</span>, salvo{" "}
            <span className="fr" lang="fr">premier</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
