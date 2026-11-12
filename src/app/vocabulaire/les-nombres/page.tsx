import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { NumberSpeaker } from "@/components/speech/NumberSpeaker";

const PATH = "/vocabulaire/les-nombres";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (tables, examples) is written once, below, and shared; captions and column
   heads are passed in each language. */

type Ui = "fr" | "es";

/* Zéro to vingt et un: twenty-two numbers, eleven rows of two. 17 to 21 are
   the first built ones, 21 the first with « et ». */
const SMALL: [string, string][] = [
  ["0", "zéro"],
  ["1", "un"],
  ["2", "deux"],
  ["3", "trois"],
  ["4", "quatre"],
  ["5", "cinq"],
  ["6", "six"],
  ["7", "sept"],
  ["8", "huit"],
  ["9", "neuf"],
  ["10", "dix"],
  ["11", "onze"],
  ["12", "douze"],
  ["13", "treize"],
  ["14", "quatorze"],
  ["15", "quinze"],
  ["16", "seize"],
  ["17", "dix-sept"],
  ["18", "dix-huit"],
  ["19", "dix-neuf"],
  ["20", "vingt"],
  ["21", "vingt et un"],
];

const BIG: [string, string, string, string][] = [
  ["70", "soixante-dix", "60 + 10", "Il a soixante-dix ans."],
  ["71", "soixante et onze", "60 + 11", "J’ai soixante et onze euros."],
  ["79", "soixante-dix-neuf", "60 + 19", "J’ai soixante-dix-neuf euros."],
  ["80", "quatre-vingts", "4 × 20", "J’ai quatre-vingts euros."],
  ["81", "quatre-vingt-un", "80 + 1", "Elle a quatre-vingt-un ans."],
  ["90", "quatre-vingt-dix", "80 + 10", "Il a quatre-vingt-dix ans."],
  ["91", "quatre-vingt-onze", "80 + 11", "J’ai quatre-vingt-onze euros."],
  ["99", "quatre-vingt-dix-neuf", "80 + 19", "Elle a quatre-vingt-dix-neuf ans."],
];

const ROWS = Math.ceil(SMALL.length / 2);

function SmallTable({ ui }: { ui: Ui }) {
  const digit = ui === "fr" ? "Chiffre" : "Cifra";
  const fr = ui === "fr" ? "En français" : "En francés";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Les nombres de zéro à vingt et un"
            : "Los números del cero al veintiuno"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{digit}</th>
            <th scope="col">{fr}</th>
            <th scope="col">{digit}</th>
            <th scope="col">{fr}</th>
          </tr>
        </thead>
        <tbody>
          {SMALL.slice(0, ROWS).map(([n, word], i) => {
            const right = SMALL[i + ROWS];
            return (
              <tr key={n}>
                <th scope="row">{n}</th>
                <td className="fr" lang="fr">
                  {word}
                </td>
                {right ? (
                  <>
                    <th scope="row">{right[0]}</th>
                    <td className="fr" lang="fr">
                      {right[1]}
                    </td>
                  </>
                ) : (
                  <td colSpan={2} />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* 70, 80 and 90 where French has words of its own. Switzerland is split for
   80: « huitante » in some cantons, « quatre-vingts » in the others.
   « octante » is old, and no one says it now. */
const REGIONS: [string, string, string, string][] = [
  ["70", "soixante-dix", "septante", "septante"],
  ["80", "quatre-vingts", "quatre-vingts", "huitante ou quatre-vingts"],
  ["90", "quatre-vingt-dix", "nonante", "nonante"],
];

function RegionsTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "70, 80 et 90 en France, en Belgique et en Suisse"
            : "70, 80 y 90 en Francia, en Bélgica y en Suiza"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "France" : "Francia"}</th>
            <th scope="col">{ui === "fr" ? "Belgique" : "Bélgica"}</th>
            <th scope="col">{ui === "fr" ? "Suisse" : "Suiza"}</th>
          </tr>
        </thead>
        <tbody>
          {REGIONS.map(([n, france, belgium, switzerland]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {france}
              </td>
              <td className="fr" lang="fr">
                {belgium}
              </td>
              <td className="fr" lang="fr">
                {switzerland}
              </td>
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
            ? "Les trois dizaines qu’on dit en additionnant, et le calcul caché"
            : "Las tres decenas que se dicen sumando, y el cálculo que esconden"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">{ui === "fr" ? "Le calcul" : "El cálculo"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {BIG.map(([n, word, calc, ex]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {word}
              </td>
              <td>{calc}</td>
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

/* Each ten, then ten plus one and ten plus two: the « et » of 21 to 61 shows
   in the column, beside the hyphen of the rest, with no rule needed. */
const TENS: [string, string, string, string][] = [
  ["20", "vingt", "vingt et un", "vingt-deux"],
  ["30", "trente", "trente et un", "trente-deux"],
  ["40", "quarante", "quarante et un", "quarante-deux"],
  ["50", "cinquante", "cinquante et un", "cinquante-deux"],
  ["60", "soixante", "soixante et un", "soixante-deux"],
];

function TensTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Chaque dizaine, puis la dizaine plus un et plus deux"
            : "Cada decena, y luego la decena más uno y más dos"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">+ 1</th>
            <th scope="col">+ 2</th>
          </tr>
        </thead>
        <tbody>
          {TENS.map(([n, word, one, two]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {word}
              </td>
              <td className="fr" lang="fr">
                {one}
              </td>
              <td className="fr" lang="fr">
                {two}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* What the numbers are for at A1: a price, an age, a telephone number. The
   first column is the explanation's, so it comes in each language. */
const USES: [{ fr: string; es: string }, string, string][] = [
  [{ fr: "Un prix", es: "Un precio" }, "2,50 €", "deux euros cinquante"],
  [{ fr: "Un prix", es: "Un precio" }, "13,20 €", "treize euros vingt"],
  [{ fr: "Un âge", es: "Una edad" }, "30 ans", "J’ai trente ans."],
  [{ fr: "Un âge", es: "Una edad" }, "81 ans", "Elle a quatre-vingt-un ans."],
  [
    { fr: "Un téléphone", es: "Un teléfono" },
    "06 24 71 80 93",
    "zéro six, vingt-quatre, soixante et onze, quatre-vingts, quatre-vingt-treize",
  ],
];

function UsesTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Les euros puis les centimes, « avoir » et « ans », et un téléphone deux chiffres par deux"
            : "Los euros y luego los céntimos, «avoir» y «ans», y un teléfono de dos en dos"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Pour dire" : "Para decir"}</th>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
          </tr>
        </thead>
        <tbody>
          {USES.map(([use, n, said]) => (
            <tr key={n}>
              <th scope="row">{use[ui]}</th>
              <td className="fr" lang="fr">
                {n}
              </td>
              <td className="fr" lang="fr">
                {said}
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
      <NumberSpeaker examples={[21, 71, 80, 81, 99]} />

      <section data-ui="fr">
        <h2>De zéro à soixante-neuf</h2>

        <div className="rule">
          De 0 à 16, un mot par nombre. Ensuite, on additionne, avec{" "}
          <span className="fr">et</span> devant <span className="fr">un</span> :{" "}
          <span className="fr">vingt et un</span>, mais{" "}
          <span className="fr">vingt-deux</span>.
        </div>

        <SmallTable ui="fr" />

        <TensTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Del cero al sesenta y nueve:{" "}
          <span className="fr" lang="fr">
            de zéro à soixante-neuf
          </span>
        </h2>

        <div className="rule">
          Del 0 al 16, una palabra por número. Después se suma, con{" "}
          <span className="fr" lang="fr">et</span> delante de{" "}
          <span className="fr" lang="fr">un</span>:{" "}
          <span className="fr" lang="fr">vingt et un</span>, pero{" "}
          <span className="fr" lang="fr">vingt-deux</span>.
        </div>

        <SmallTable ui="es" />

        <TensTable ui="es" />
      </section>

      <section data-ui="fr">
        <h2>
          <span className="fr">Soixante-dix, quatre-vingts, quatre-vingt-dix</span>
        </h2>

        <div className="rule">70 = 60 + 10 · 80 = 4 × 20 · 90 = 80 + 10.</div>

        <BigTable ui="fr" />

        <p>
          En Belgique et en Suisse, 70 et 90 ont leur propre mot :{" "}
          <span className="fr">septante</span> et{" "}
          <span className="fr">nonante</span>. Ils se construisent comme{" "}
          <span className="fr">soixante</span> :{" "}
          <span className="fr">septante et un</span>,{" "}
          <span className="fr">nonante-deux</span>. Certains cantons suisses
          disent aussi <span className="fr">huitante</span> pour 80.
        </p>

        <RegionsTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">
            Soixante-dix, quatre-vingts, quatre-vingt-dix
          </span>
        </h2>

        <div className="rule">70 = 60 + 10 · 80 = 4 × 20 · 90 = 80 + 10.</div>

        <BigTable ui="es" />

        <p>
          En Bélgica y en Suiza, 70 y 90 tienen su propia palabra:{" "}
          <span className="fr" lang="fr">septante</span> y{" "}
          <span className="fr" lang="fr">nonante</span>. Se construyen como{" "}
          <span className="fr" lang="fr">soixante</span>:{" "}
          <span className="fr" lang="fr">septante et un</span>,{" "}
          <span className="fr" lang="fr">nonante-deux</span>. Algunos cantones
          suizos dicen también <span className="fr" lang="fr">huitante</span>{" "}
          para 80.
        </p>

        <RegionsTable ui="es" />
      </section>

      <section data-ui="fr">
        <h2>Le prix, l’âge, le numéro</h2>

        <UsesTable ui="fr" />

        <div className="attention">
          L’âge prend toujours <span className="fr">ans</span> :{" "}
          <s className="fr">j’ai trente</s> est faux.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Un precio, una edad, un número:{" "}
          <span className="fr" lang="fr">
            le prix, l’âge, le numéro
          </span>
        </h2>

        <UsesTable ui="es" />

        <div className="attention">
          La edad lleva siempre <span className="fr" lang="fr">ans</span>:{" "}
          <s className="fr" lang="fr">j’ai trente</s> está mal.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>De 0 à 16, un mot par nombre ; ensuite, on additionne.</li>
          <li>
            <span className="fr">et</span> devant <span className="fr">un</span> de 21 à 61, et
            dans <span className="fr">soixante et onze</span> ; jamais en 81 ni en 91.
          </li>
          <li>70 = 60 + 10, 80 = 4 × 20, 90 = 80 + 10.</li>
          <li>Un prix : les euros, puis les centimes. Un téléphone : deux chiffres par deux.</li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>Del 0 al 16, una palabra por número; después se suma.</li>
          <li>
            <span className="fr" lang="fr">et</span> delante de{" "}
            <span className="fr" lang="fr">un</span> del 21 al 61, y en{" "}
            <span className="fr" lang="fr">soixante et onze</span>; nunca en 81 ni
            en 91.
          </li>
          <li>70 = 60 + 10, 80 = 4 × 20, 90 = 80 + 10.</li>
          <li>Un precio: los euros y luego los céntimos. Un teléfono: de dos en dos.</li>
        </ul>
      </div>
    </article>
  );
}
