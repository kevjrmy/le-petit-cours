import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/l-imparfait";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The French taught is written once, below, and shared — the two
   bodies can differ in what they explain, never in the French they show. */

const SUBJECTS = ["je", "tu", "il / elle / on", "nous", "vous", "ils / elles"];

const ENDINGS: Record<"parler" | "finir" | "prendre", string[]> = {
  parler: ["parlais", "parlais", "parlait", "parlions", "parliez", "parlaient"],
  finir: ["finissais", "finissais", "finissait", "finissions", "finissiez", "finissaient"],
  prendre: ["prenais", "prenais", "prenait", "prenions", "preniez", "prenaient"],
};

const USES = [
  { fr: "une description", es: "una descripción", example: "Il faisait froid et la maison était vide." },
  { fr: "une habitude", es: "una costumbre", example: "Tous les étés, nous allions chez ma grand-mère." },
  { fr: "une action qui durait", es: "una acción que duraba", example: "Je dormais quand tu as appelé." },
];

function Stems() {
  return (
    <div className="example" lang="fr">
      nous parl<strong>ons</strong> → parl- → je parl<strong>ais</strong>
      <br />
      nous finiss<strong>ons</strong> → finiss- → je finiss
      <strong>ais</strong>
      <br />
      nous pren<strong>ons</strong> → pren- → je pren<strong>ais</strong>
    </div>
  );
}

function EndingsTable({ caption, subject }: { caption: string; subject: string }) {
  const verbs = Object.keys(ENDINGS) as (keyof typeof ENDINGS)[];
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{subject}</th>
            {verbs.map((verb) => (
              <th key={verb} scope="col" className="fr" lang="fr">
                {verb}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SUBJECTS.map((pronoun, row) => (
            <tr key={pronoun}>
              <th scope="row" className="fr" lang="fr">
                {pronoun}
              </th>
              {verbs.map((verb) => (
                <td key={verb} className="fr" lang="fr">
                  {ENDINGS[verb][row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsesTable({ lang }: { lang: "fr" | "es" }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {lang === "fr"
            ? "Les trois emplois courants de l’imparfait"
            : "Los tres usos habituales del imperfecto"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{lang === "fr" ? "Emploi" : "Uso"}</th>
            <th scope="col">{lang === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {USES.map((use) => (
            <tr key={use.fr}>
              <th scope="row">{use[lang]}</th>
              <td className="fr" lang="fr">
                {use.example}
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

      <section data-ui="fr">
        <h2>Former l’imparfait</h2>

        <div className="rule">
          On part du verbe conjugué avec <span className="fr">nous</span> au
          présent, on enlève <span className="fr">-ons</span>, et on ajoute les
          terminaisons de l’imparfait.
        </div>

        <Stems />

        <EndingsTable caption="Les terminaisons de l’imparfait, sur trois verbes" subject="Sujet" />

        <div className="attention">
          Les terminaisons sont les mêmes pour <strong>tous</strong> les verbes
          du français. Quatre d’entre elles se prononcent de façon identique :{" "}
          <span className="fr">
            je parlais, tu parlais, il parlait, ils parlaient
          </span>
          . Seule l’orthographe les sépare, et elle dépend du sujet.
        </div>

        <div className="exception">
          <span className="fr">être</span>. Son radical ne vient pas du{" "}
          <span className="fr">nous</span> du présent :{" "}
          <span className="fr">
            j’étais, tu étais, il était, nous étions, vous étiez, ils étaient
          </span>
          . C’est le seul verbe irrégulier à ce temps.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Formar el imperfecto</h2>

        <div className="rule">
          Se parte del verbo conjugado con{" "}
          <span className="fr" lang="fr">nous</span> en presente, se quita{" "}
          <span className="fr" lang="fr">-ons</span> y se añaden las
          terminaciones del imperfecto.
        </div>

        <Stems />

        <EndingsTable caption="Las terminaciones del imperfecto, en tres verbos" subject="Sujeto" />

        <div className="attention">
          Las terminaciones son las mismas para <strong>todos</strong> los
          verbos del francés. Cuatro de ellas se pronuncian igual:{" "}
          <span className="fr" lang="fr">
            je parlais, tu parlais, il parlait, ils parlaient
          </span>
          . Solo la ortografía las distingue, y depende del sujeto.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">être</span>. Su raíz no viene del{" "}
          <span className="fr" lang="fr">nous</span> del presente:{" "}
          <span className="fr" lang="fr">
            j’étais, tu étais, il était, nous étions, vous étiez, ils étaient
          </span>
          . Es el único verbo irregular en este tiempo.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Quand l’employer</h2>

        <p>
          L’imparfait ne dit pas <em>quand</em> une action a commencé ni{" "}
          <em>quand</em> elle a fini. Il installe une situation, une habitude,
          une description. Trois emplois couvrent presque tout.
        </p>

        <UsesTable lang="fr" />

        <div className="astuce">
          <p className="astuce-hook">Trois phrases à garder toutes faites</p>
          <p>
            <span className="fr">c’était</span>,{" "}
            <span className="fr">il y avait</span>,{" "}
            <span className="fr">il faisait</span> ouvrent la plupart des
            descriptions au passé : <span className="fr">C’était en 2019</span>{" "}
            · <span className="fr">Il y avait beaucoup de monde</span> ·{" "}
            <span className="fr">Il faisait très chaud</span>. Trois formes
            apprises, et le décor est planté.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuándo usarlo</h2>

        <p>
          El imperfecto no dice <em>cuándo</em> empezó una acción ni{" "}
          <em>cuándo</em> terminó. Presenta una situación, una costumbre, una
          descripción. Tres usos lo cubren casi todo.
        </p>

        <UsesTable lang="es" />

        <div className="astuce">
          <p className="astuce-hook">Tres frases para tener a mano</p>
          <p>
            <span className="fr" lang="fr">c’était</span>,{" "}
            <span className="fr" lang="fr">il y avait</span>,{" "}
            <span className="fr" lang="fr">il faisait</span> abren la mayoría de
            las descripciones en pasado:{" "}
            <span className="fr" lang="fr">C’était en 2019</span> ·{" "}
            <span className="fr" lang="fr">Il y avait beaucoup de monde</span> ·{" "}
            <span className="fr" lang="fr">Il faisait très chaud</span>. Con tres
            formas aprendidas, el escenario está listo.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le radical vient du <span className="fr">nous</span> du présent, sans{" "}
            <span className="fr">-ons</span>.
          </li>
          <li>
            Les terminaisons sont les mêmes pour tous les verbes :{" "}
            <span className="fr">-ais, -ais, -ait, -ions, -iez, -aient</span>.
          </li>
          <li>
            Quatre d’entre elles se prononcent de la même façon. Seule
            l’orthographe les sépare, et elle dépend du sujet.
          </li>
          <li>
            <span className="fr">être</span> est le seul verbe irrégulier :{" "}
            <span className="fr">j’étais</span>.
          </li>
          <li>
            Trois emplois : la description, l’habitude, l’action qui durait.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            La raíz viene del <span className="fr" lang="fr">nous</span> del
            presente, sin <span className="fr" lang="fr">-ons</span>.
          </li>
          <li>
            Las terminaciones son las mismas para todos los verbos:{" "}
            <span className="fr" lang="fr">-ais, -ais, -ait, -ions, -iez, -aient</span>.
          </li>
          <li>
            Cuatro de ellas se pronuncian igual. Solo la ortografía las
            distingue, y depende del sujeto.
          </li>
          <li>
            <span className="fr" lang="fr">être</span> es el único verbo
            irregular: <span className="fr" lang="fr">j’étais</span>.
          </li>
          <li>Tres usos: la descripción, la costumbre, la acción que duraba.</li>
        </ul>
      </div>
    </article>
  );
}
