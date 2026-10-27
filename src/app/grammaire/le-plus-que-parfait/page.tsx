import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-plus-que-parfait";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

const PAIRS = [
  ["j’ai mangé", "j’avais mangé"],
  ["tu as compris", "tu avais compris"],
  ["elle est partie", "elle était partie"],
  ["nous sommes venus", "nous étions venus"],
  ["ils se sont levés", "ils s’étaient levés"],
];

const STORY = [
  { tense: "l’imparfait", says: { fr: "le décor, la situation", es: "el decorado, la situación" }, example: "Il pleuvait." },
  { tense: "le passé composé", says: { fr: "ce qui arrive, l’événement", es: "lo que ocurre, el hecho" }, example: "Le train est parti." },
  { tense: "le plus-que-parfait", says: { fr: "ce qui était arrivé avant", es: "lo que había pasado antes" }, example: "J’avais oublié mon billet." },
];

function PairsTable({ caption, heads }: { caption: ReactNode; heads: [ReactNode, ReactNode] }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{heads[0]}</th>
            <th scope="col">{heads[1]}</th>
          </tr>
        </thead>
        <tbody>
          {PAIRS.map(([before, after]) => (
            <tr key={before}>
              <th scope="row" className="fr" lang="fr">
                {before}
              </th>
              <td className="fr" lang="fr">
                {after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OlderExamples() {
  return (
    <div className="example" lang="fr">
      Quand je suis arrivé, le film <strong>avait</strong> déjà{" "}
      <strong>commencé</strong>.
      <br />
      Elle a retrouvé le livre qu’elle <strong>avait perdu</strong> en juin.
      <br />
      Nous étions fatigués parce que nous <strong>avions marché</strong> toute
      la journée.
    </div>
  );
}

function NeverExamples() {
  return (
    <div className="example" lang="fr">
      Je n’<strong>avais</strong> jamais <strong>vu</strong> la mer avant ce
      voyage.
      <br />À dix ans, il <strong>avait</strong> déjà <strong>lu</strong> tout
      Jules Verne.
    </div>
  );
}

function StoryTable({
  caption,
  heads,
  lang,
}: {
  caption: string;
  heads: [string, string, string];
  lang: "fr" | "es";
}) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{heads[0]}</th>
            <th scope="col">{heads[1]}</th>
            <th scope="col">{heads[2]}</th>
          </tr>
        </thead>
        <tbody>
          {STORY.map((row) => (
            <tr key={row.tense}>
              <th scope="row" className="fr" lang="fr">
                {row.tense}
              </th>
              <td>{row.says[lang]}</td>
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

function StoryExample() {
  return (
    <div className="example" lang="fr">
      Il pleuvait sur le quai. Le train <strong>est parti</strong> à l’heure,
      sans moi : j’<strong>avais oublié</strong> mon billet à la maison, et j’
      <strong>étais retourné</strong> le chercher.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Un passé avant le passé</h2>

        <div className="rule">
          Le plus-que-parfait se forme avec{" "}
          <span className="fr">avoir</span> ou{" "}
          <span className="fr">être</span> <strong>à l’imparfait</strong>,
          suivi du participe passé. C’est le passé composé, avec l’auxiliaire à
          l’imparfait au lieu du présent.
        </div>

        <PairsTable
          caption="Le même verbe au passé composé, puis au plus-que-parfait"
          heads={["Passé composé", "Plus-que-parfait"]}
        />

        <div className="attention">
          L’auxiliaire ne change pas. Un verbe qui prend{" "}
          <span className="fr">être</span> au passé composé prend{" "}
          <span className="fr">être</span> ici aussi, et l’accord du participe
          se fait de la même façon :{" "}
          <span className="fr">elle était partie</span>,{" "}
          <span className="fr">elles étaient parties</span>. Si vous savez
          construire le passé composé d’un verbe, vous savez construire son
          plus-que-parfait.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Un pasado antes del pasado</h2>

        <div className="rule">
          El pluscuamperfecto se forma con{" "}
          <span className="fr" lang="fr">avoir</span> o{" "}
          <span className="fr" lang="fr">être</span>{" "}
          <strong>en imperfecto</strong>, seguido del participio pasado. Es el{" "}
          <span className="fr" lang="fr">passé composé</span>, con el auxiliar
          en imperfecto en lugar de en presente.
        </div>

        <PairsTable
          caption={
            <>
              El mismo verbo en <span lang="fr">passé composé</span> y luego en
              pluscuamperfecto
            </>
          }
          heads={[
            <span key="a" lang="fr">Passé composé</span>,
            <span key="b" lang="fr">Plus-que-parfait</span>,
          ]}
        />

        <div className="attention">
          El auxiliar no cambia. Un verbo que lleva{" "}
          <span className="fr" lang="fr">être</span> en el{" "}
          <span className="fr" lang="fr">passé composé</span> lleva{" "}
          <span className="fr" lang="fr">être</span> también aquí, y la concordancia
          del participio es el mismo:{" "}
          <span className="fr" lang="fr">elle était partie</span>,{" "}
          <span className="fr" lang="fr">elles étaient parties</span>. Si sabes
          construir el <span className="fr" lang="fr">passé composé</span> de un
          verbo, sabes construir su pluscuamperfecto.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Quand on l’emploie</h2>

        <div className="rule">
          Il sert quand la phrase parle de deux moments passés et que l’un des
          deux est <strong>plus ancien</strong> que l’autre. Le plus ancien
          prend le plus-que-parfait, l’autre reste au passé composé ou à
          l’imparfait.
        </div>

        <OlderExamples />

        <p>
          Il sert aussi à dire ce qui était déjà arrivé, ou jamais arrivé, à ce
          moment-là, avec <span className="fr">déjà</span> ou{" "}
          <span className="fr">jamais</span>.
        </p>

        <NeverExamples />

        <div className="astuce">
          <p className="astuce-hook">
            Si vous pouvez ajouter <span className="fr">avant</span> sans
            changer le sens, c’est un plus-que-parfait.
          </p>
          <p>
            <span className="fr">le film avait commencé</span> veut dire{" "}
            <span className="fr">le film avait commencé avant</span>. C’est le
            seul test dont vous avez besoin : si l’action est antérieure à
            l’autre, elle recule d’un temps. Sinon, le passé composé suffit.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuándo se usa</h2>

        <div className="rule">
          Se usa cuando la frase habla de dos momentos pasados y uno de ellos es{" "}
          <strong>más antiguo</strong> que el otro. El más antiguo va en
          pluscuamperfecto; el otro se queda en{" "}
          <span className="fr" lang="fr">passé composé</span> o en imperfecto.
        </div>

        <OlderExamples />

        <p>
          También sirve para decir lo que ya había ocurrido, o nunca había
          ocurrido, en aquel momento, con{" "}
          <span className="fr" lang="fr">déjà</span> o{" "}
          <span className="fr" lang="fr">jamais</span>.
        </p>

        <NeverExamples />

        <div className="astuce">
          <p className="astuce-hook">
            Si puedes añadir <span className="fr" lang="fr">avant</span> sin
            cambiar el sentido, es un pluscuamperfecto.
          </p>
          <p>
            <span className="fr" lang="fr">le film avait commencé</span> quiere
            decir <span className="fr" lang="fr">le film avait commencé avant</span>.
            Es la única prueba que necesitas: si la acción es anterior a la
            otra, retrocede un tiempo. Si no, basta el{" "}
            <span className="fr" lang="fr">passé composé</span>.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Dans un récit</h2>

        <p>
          Les trois temps du passé se partagent le travail, et chacun répond à
          une question différente.
        </p>

        <StoryTable
          caption="Ce que chaque temps raconte dans une histoire au passé"
          heads={["Temps", "Ce qu’il dit", "Exemple"]}
          lang="fr"
        />

        <StoryExample />

        <div className="exception">
          Le plus-que-parfait ne raconte pas la suite de l’histoire, il
          l’explique. Trois phrases de suite au plus-que-parfait veulent
          presque toujours dire que le récit a commencé au mauvais endroit.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>En un relato</h2>

        <p>
          Los tres tiempos del pasado se reparten el trabajo, y cada uno
          responde a una pregunta distinta.
        </p>

        <StoryTable
          caption="Lo que cuenta cada tiempo en una historia en pasado"
          heads={["Tiempo", "Lo que dice", "Ejemplo"]}
          lang="es"
        />

        <StoryExample />

        <div className="exception">
          El pluscuamperfecto no cuenta la continuación de la historia, la
          explica. Tres frases seguidas en pluscuamperfecto casi siempre
          significan que el relato ha empezado por el lugar equivocado.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">avoir</span> ou{" "}
            <span className="fr">être</span> à l’imparfait, plus le participe
            passé.
          </li>
          <li>
            L’auxiliaire et l’accord sont ceux du passé composé du même verbe.
          </li>
          <li>
            Il marque l’action la plus ancienne quand la phrase en contient
            deux.
          </li>
          <li>
            Avec <span className="fr">jamais</span> et{" "}
            <span className="fr">déjà</span>, il dit où on en était à ce
            moment-là.
          </li>
          <li>
            Dans un récit : l’imparfait pose le décor, le passé composé fait
            avancer, le plus-que-parfait revient en arrière.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">avoir</span> o{" "}
            <span className="fr" lang="fr">être</span> en imperfecto, más el
            participio pasado.
          </li>
          <li>
            El auxiliar y la concordancia son los del{" "}
            <span className="fr" lang="fr">passé composé</span> del mismo verbo.
          </li>
          <li>
            Marca la acción más antigua cuando la frase contiene dos.
          </li>
          <li>
            Con <span className="fr" lang="fr">jamais</span> y{" "}
            <span className="fr" lang="fr">déjà</span>, dice en qué punto se
            estaba en aquel momento.
          </li>
          <li>
            En un relato: el imperfecto pone el decorado, el{" "}
            <span className="fr" lang="fr">passé composé</span> hace avanzar, el
            pluscuamperfecto vuelve atrás.
          </li>
        </ul>
      </div>
    </article>
  );
}
