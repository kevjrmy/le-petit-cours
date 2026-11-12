import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { NumberSpeaker } from "@/components/speech/NumberSpeaker";

const PATH = "/orthographe/ecrire-les-nombres";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared; captions and column heads come in each
   language. For the heritage speaker (#13): they say every one of these
   numbers already, so nothing here is read aloud or glossed — the page is the
   spelling, in tables, with one line of rule per section. */

type Ui = "fr" | "es";

function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

/* Spaces inside a figure are non-breaking, so « 2 300 » never splits. */
const HYPHENS: [string, string, string][] = [
  ["22", "vingt-deux", "vingt-deux"],
  ["21", "vingt et un", "vingt-et-un"],
  ["71", "soixante et onze", "soixante-et-onze"],
  ["81", "quatre-vingt-un", "quatre-vingt-un"],
  ["105", "cent cinq", "cent-cinq"],
  ["2 300", "deux mille trois cents", "deux-mille-trois-cents"],
];

const PLURAL: [string, string, { fr: string; es: string }][] = [
  ["80", "quatre-vingts", { fr: "multiplié, rien après", es: "multiplicado, nada detrás" }],
  ["82", "quatre-vingt-deux", { fr: "un nombre suit", es: "sigue un número" }],
  ["200", "deux cents", { fr: "multiplié, rien après", es: "multiplicado, nada detrás" }],
  ["205", "deux cent cinq", { fr: "un nombre suit", es: "sigue un número" }],
  ["100", "cent", { fr: "pas multiplié", es: "no multiplicado" }],
  ["80 000", "quatre-vingt mille", { fr: "« mille » suit", es: "sigue « mille »" }],
  [
    "200 000 000",
    "deux cents millions",
    { fr: "« million » est un nom", es: "« million » es un sustantivo" },
  ],
];

const BIG: [string, string, string][] = [
  ["1 000", "mille", "Mille euros, c’est cher."],
  ["3 000", "trois mille", "La salle compte trois mille places."],
  ["1 000 000", "un million", "Un million d’habitants."],
  ["3 000 000", "trois millions", "Trois millions de personnes."],
  ["2 000 000 000", "deux milliards", "Deux milliards d’euros."],
];

function HyphenTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Les mêmes nombres, avant et après la réforme de 1990"
            : "Los mismos números, antes y después de la reforma de 1990"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Nombre" : "Número"}</th>
            <th scope="col">{ui === "fr" ? "Traditionnelle" : "Tradicional"}</th>
            <th scope="col">{ui === "fr" ? "Rectifiée (1990)" : "Reformada (1990)"}</th>
          </tr>
        </thead>
        <tbody>
          {HYPHENS.map(([n, old, reformed]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {old}
              </td>
              <td className="fr" lang="fr">
                {reformed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PluralTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Le « s » de « vingt » et « cent », cas par cas"
            : "La « s » de « vingt » y « cent », caso por caso"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Nombre" : "Número"}</th>
            <th scope="col">{ui === "fr" ? "Écrit" : "Escrito"}</th>
            <th scope="col">{ui === "fr" ? "Pourquoi" : "Por qué"}</th>
          </tr>
        </thead>
        <tbody>
          {PLURAL.map(([n, written, why]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {written}
              </td>
              <td>{why[ui]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BigTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "« mille » ne bouge pas ; « million » et « milliard » s’accordent"
            : "« mille » no cambia; « million » y « milliard » concuerdan"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Nombre" : "Número"}</th>
            <th scope="col">{ui === "fr" ? "Écrit" : "Escrito"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {BIG.map(([n, written, ex]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {written}
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
          bilingual by itself (`T`), so it sits outside the paired sections.
          It writes the traditional spelling, the page's first column. */}
      <NumberSpeaker examples={[21, 80, 200, 205, 80000]} />

      <section data-ui="fr">
        <h2>Le trait d’union et le « et »</h2>

        <div className="rule">
          Sous cent, un trait d’union entre la dizaine et l’unité, sauf autour
          de <F>et</F> ; aucun autour de <F>cent</F> et <F>mille</F>. Depuis
          1990, on peut aussi en mettre partout. Les deux
          sont justes : choisissez-en une et gardez-la.
        </div>

        <HyphenTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El guion y el « et »:{" "}
          <F>vingt-deux, vingt et un</F>
        </h2>

        <div className="rule">
          Por debajo de cien, un guion entre la decena y la unidad, salvo
          alrededor de <F>et</F>; ninguno alrededor de <F>cent</F> y{" "}
          <F>mille</F>. Desde 1990 también se puede poner en todas
          partes. Las dos son correctas: elige una y mantenla.
        </div>

        <HyphenTable ui="es" />
      </section>

      <section data-ui="fr">
        <h2>
          Le « s » de <F>vingt</F> et <F>cent</F>
        </h2>

        <div className="rule">
          <F>vingt</F> et <F>cent</F> prennent un <F>s</F> quand ils sont
          multipliés et que rien ne les suit, ou seulement{" "}
          <F>millions</F> ou <F>milliards</F>.
        </div>

        <PluralTable ui="fr" />

        <div className="exception">
          Un nombre qui sert de numéro ne prend jamais de <F>s</F> :{" "}
          <F>page quatre-vingt</F>, <F>la chambre deux cent</F>,{" "}
          <F>les années quatre-vingt</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          La « s » de <F>vingt</F> y <F>cent</F>
        </h2>

        <div className="rule">
          <F>vingt</F> y <F>cent</F> llevan <F>s</F> cuando están
          multiplicados y no les sigue nada, o solo <F>millions</F> o{" "}
          <F>milliards</F>.
        </div>

        <PluralTable ui="es" />

        <div className="exception">
          Un número que sirve para numerar nunca lleva <F>s</F>:{" "}
          <F>page quatre-vingt</F>, <F>la chambre deux cent</F>,{" "}
          <F>les années quatre-vingt</F>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          <F>Mille</F>, <F>million</F>, <F>milliard</F>
        </h2>

        <div className="rule">
          <F>mille</F> est un nombre : il ne prend jamais de <F>s</F>.{" "}
          <F>million</F> et <F>milliard</F> sont des noms : un <F>s</F> au
          pluriel, et <F>de</F> devant ce qu’on compte.
        </div>

        <BigTable ui="fr" />

        <div className="attention">
          <s className="fr">deux milles</s> et{" "}
          <s className="fr">un mille euros</s> sont faux : <F>deux mille</F>,{" "}
          <F>mille euros</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>Mille</F>, <F>million</F>, <F>milliard</F>
        </h2>

        <div className="rule">
          <F>mille</F> es un número: nunca lleva <F>s</F>. <F>million</F> y{" "}
          <F>milliard</F> son sustantivos: <F>s</F> en plural, y <F>de</F>{" "}
          delante de lo que se cuenta.
        </div>

        <BigTable ui="es" />

        <div className="attention">
          <s className="fr" lang="fr">deux milles</s> y{" "}
          <s className="fr" lang="fr">un mille euros</s> están mal:{" "}
          <F>deux mille</F>, <F>mille euros</F>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Un trait d’union sous cent, sauf autour de <F>et</F> ; ou partout,
            depuis 1990.
          </li>
          <li>
            <F>quatre-vingts</F>, <F>deux cents</F> : un <F>s</F> si rien ne
            suit.
          </li>
          <li>
            <F>quatre-vingt-deux</F>, <F>deux cent mille</F> : pas de{" "}
            <F>s</F> si un nombre suit.
          </li>
          <li>Un numéro de page, de chambre ou d’année : jamais de <F>s</F>.</li>
          <li>
            <F>million</F> et <F>milliard</F> sont des noms :{" "}
            <F>trois millions de personnes</F>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Un guion por debajo de cien, salvo alrededor de <F>et</F>; o en todas
            partes, desde 1990.
          </li>
          <li>
            <F>quatre-vingts</F>, <F>deux cents</F>: una <F>s</F> si no sigue
            nada.
          </li>
          <li>
            <F>quatre-vingt-deux</F>, <F>deux cent mille</F>: sin <F>s</F> si
            sigue un número.
          </li>
          <li>Un número de página, de habitación o de año: nunca <F>s</F>.</li>
          <li>
            <F>million</F> y <F>milliard</F> son sustantivos:{" "}
            <F>trois millions de personnes</F>.
          </li>
        </ul>
      </div>
    </article>
  );
}
