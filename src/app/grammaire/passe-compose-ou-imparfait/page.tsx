import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/passe-compose-ou-imparfait";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The French taught is written once, below, and shared. */

type Lang = "fr" | "es";

const QUESTIONS = [
  {
    row: { fr: "Il répond à", es: "Responde a" },
    pc: { question: "Qu’est-ce qui s’est passé ?" },
    imp: { question: "Comment c’était ?" },
  },
];

const CONTRASTS = [
  {
    row: { fr: "L’action est", es: "La acción está" },
    pc: { fr: "terminée, limitée", es: "terminada, limitada" },
    imp: { fr: "en cours, sans limite", es: "en curso, sin límite" },
  },
  {
    row: { fr: "Combien de fois", es: "Cuántas veces" },
    pc: { fr: "une fois, un nombre précis", es: "una vez, un número preciso" },
    imp: { fr: "souvent, chaque jour", es: "a menudo, cada día" },
  },
];

const CLUES = [
  ["soudain, tout à coup", "souvent, d’habitude"],
  ["un jour, ce matin-là", "tous les jours, le lundi"],
  ["hier, la semaine dernière", "à cette époque, quand j’étais petit"],
  ["deux fois, trois heures", "pendant que, toujours"],
];

function Night() {
  return (
    <div className="example" lang="fr">
      Il <strong>faisait</strong> nuit et je <strong>dormais</strong> quand le
      téléphone <strong>a sonné</strong>.
    </div>
  );
}

function Saturday() {
  return (
    <div className="example" lang="fr">
      Samedi, il <strong>pleuvait</strong> et il n’y <strong>avait</strong>{" "}
      personne dans la rue. Je <strong>suis sortie</strong> quand même. J’
      <strong>ai marché</strong> jusqu’à la gare, puis j’<strong>ai pris</strong>{" "}
      un café dans un bar qui <strong>venait</strong> d’ouvrir.
    </div>
  );
}

function TensesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? "Ce que chaque temps apporte à un récit" : "Lo que aporta cada tiempo a un relato"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Question" : "Pregunta"}</th>
            <th scope="col">
              <span className="fr" lang="fr">
                Passé composé
              </span>
            </th>
            <th scope="col">
              <span className="fr" lang="fr">
                Imparfait
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {QUESTIONS.map((q) => (
            <tr key={q.row.fr}>
              <th scope="row">{q.row[lang]}</th>
              <td className="fr" lang="fr">
                {q.pc.question}
              </td>
              <td className="fr" lang="fr">
                {q.imp.question}
              </td>
            </tr>
          ))}
          {CONTRASTS.map((c) => (
            <tr key={c.row.fr}>
              <th scope="row">{c.row[lang]}</th>
              <td>{c.pc[lang]}</td>
              <td>{c.imp[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CluesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Expressions de temps et temps du passé qu’elles appellent"
            : "Expresiones de tiempo y tiempo del pasado que piden"}
        </caption>
        <thead>
          <tr>
            <th scope="col">
              {fr ? "Plutôt " : "Más bien "}
              <span className="fr" lang="fr">
                passé composé
              </span>
            </th>
            <th scope="col">
              {fr ? "Plutôt " : "Más bien "}
              <span className="fr" lang="fr">
                imparfait
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {CLUES.map(([pc, imp]) => (
            <tr key={pc}>
              <td className="fr" lang="fr">
                {pc}
              </td>
              <td className="fr" lang="fr">
                {imp}
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
        <h2>L’action ou le décor</h2>

        <div className="rule">
          Les deux temps parlent du passé, mais ils ne racontent pas la même
          chose. Le <strong>passé composé</strong> dit ce qui est{" "}
          <strong>arrivé</strong> ; l’<strong>imparfait</strong> décrit le{" "}
          <strong>décor</strong> autour.
        </div>

        <TensesTable lang="fr" />

        <Night />

        <p>
          Le décor est à l’imparfait — <span className="fr">il faisait</span>,{" "}
          <span className="fr">je dormais</span>. L’événement qui arrive et qui
          coupe ce décor est au passé composé —{" "}
          <span className="fr">a sonné</span>. Changez les temps de place et
          l’histoire change : <span className="fr">Il a fait nuit</span>{" "}
          raconterait la tombée de la nuit comme un événement.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>La acción o el decorado</h2>

        <div className="rule">
          Los dos tiempos hablan del pasado, pero no cuentan lo mismo. El{" "}
          <strong lang="fr">passé composé</strong> dice lo que{" "}
          <strong>ocurrió</strong>; el <strong lang="fr">imparfait</strong>{" "}
          describe el <strong>decorado</strong> alrededor.
        </div>

        <TensesTable lang="es" />

        <Night />

        <p>
          El decorado va en imperfecto —{" "}
          <span className="fr" lang="fr">il faisait</span>,{" "}
          <span className="fr" lang="fr">je dormais</span>. El suceso que llega
          y corta ese decorado va en <span className="fr" lang="fr">passé composé</span>{" "}
          — <span className="fr" lang="fr">a sonné</span>. Cambia los tiempos de
          sitio y la historia cambia:{" "}
          <span className="fr" lang="fr">Il a fait nuit</span> contaría la
          llegada de la noche como un suceso.
        </p>
      </section>

      <section data-ui="fr">
        <h2>Les mots qui vous mettent sur la piste</h2>

        <p>
          Certaines expressions de temps annoncent presque toujours le même
          temps. Elles ne décident pas à votre place, mais elles indiquent la
          direction.
        </p>

        <CluesTable lang="fr" />

        <div className="attention">
          Une durée précise ferme l’action, donc elle appelle le passé composé :{" "}
          <span className="fr">J’ai vécu dix ans à Lyon</span> — dix ans, c’est
          fini. Avec <span className="fr">Je vivais à Lyon</span>, on ne dit pas
          combien de temps, on plante le décor.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras que te dan la pista</h2>

        <p>
          Algunas expresiones de tiempo anuncian casi siempre el mismo tiempo.
          No deciden por ti, pero indican la dirección.
        </p>

        <CluesTable lang="es" />

        <div className="attention">
          Una duración precisa cierra la acción, así que pide el{" "}
          <span className="fr" lang="fr">passé composé</span>:{" "}
          <span className="fr" lang="fr">J’ai vécu dix ans à Lyon</span> — diez
          años, ya está terminado. Con{" "}
          <span className="fr" lang="fr">Je vivais à Lyon</span> no se dice
          cuánto tiempo, se pone el decorado.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les deux ensemble</h2>

        <p>
          Dans un vrai récit, les deux temps travaillent côte à côte. L’imparfait
          tient la scène, le passé composé fait avancer l’histoire.
        </p>

        <Saturday />

        <div className="astuce">
          <p className="astuce-hook">Le test du film</p>
          <p>
            Demandez-vous si la phrase serait une <strong>photo</strong> ou une{" "}
            <strong>scène qui bouge</strong>. Une photo — le temps qu’il fait,
            l’âge de quelqu’un, ce qu’il y avait autour — c’est l’imparfait. Une
            scène où quelque chose se produit et se termine, c’est le passé
            composé. Le test se trompe surtout sur les verbes d’état comme{" "}
            <span className="fr">savoir</span> ou{" "}
            <span className="fr">vouloir</span> : au passé composé, ils
            signalent le moment précis où l’état a changé —{" "}
            <span className="fr">j’ai su</span>, c’est « à cet instant, j’ai
            appris ».
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Los dos juntos</h2>

        <p>
          En un relato de verdad, los dos tiempos trabajan codo con codo. El
          imperfecto sostiene la escena, el{" "}
          <span className="fr" lang="fr">passé composé</span> hace avanzar la
          historia.
        </p>

        <Saturday />

        <div className="astuce">
          <p className="astuce-hook">La prueba de la película</p>
          <p>
            Pregúntate si la frase sería una <strong>foto</strong> o una{" "}
            <strong>escena en movimiento</strong>. Una foto —el tiempo que hace,
            la edad de alguien, lo que había alrededor— es el imperfecto. Una
            escena donde algo ocurre y termina es el{" "}
            <span className="fr" lang="fr">passé composé</span>. La prueba falla
            sobre todo con los verbos de estado como{" "}
            <span className="fr" lang="fr">savoir</span> o{" "}
            <span className="fr" lang="fr">vouloir</span>: en{" "}
            <span className="fr" lang="fr">passé composé</span> señalan el
            momento preciso en que cambió el estado —{" "}
            <span className="fr" lang="fr">j’ai su</span> es «en ese instante,
            me enteré».
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le passé composé dit ce qui est arrivé ; l’imparfait décrit le décor
            autour.
          </li>
          <li>
            Une action terminée et limitée va au passé composé. Une situation
            sans limite, ou répétée, va à l’imparfait.
          </li>
          <li>
            Certaines expressions indiquent la direction :{" "}
            <span className="fr">soudain</span>,{" "}
            <span className="fr">un jour</span> d’un côté ;{" "}
            <span className="fr">souvent</span>,{" "}
            <span className="fr">tous les jours</span> de l’autre. Elles
            indiquent, elles ne décident pas.
          </li>
          <li>
            Une durée précise ferme l’action, donc elle appelle le passé
            composé : <span className="fr">J’ai vécu dix ans à Lyon</span>.
          </li>
          <li>
            Dans un récit, les deux se relaient : l’imparfait tient la scène, le
            passé composé la fait avancer.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El <span className="fr" lang="fr">passé composé</span> dice lo que
            ocurrió; el imperfecto describe el decorado alrededor.
          </li>
          <li>
            Una acción terminada y limitada va en{" "}
            <span className="fr" lang="fr">passé composé</span>. Una situación
            sin límite, o repetida, va en imperfecto.
          </li>
          <li>
            Algunas expresiones indican la dirección:{" "}
            <span className="fr" lang="fr">soudain</span>,{" "}
            <span className="fr" lang="fr">un jour</span> por un lado;{" "}
            <span className="fr" lang="fr">souvent</span>,{" "}
            <span className="fr" lang="fr">tous les jours</span> por el otro.
            Indican, no deciden.
          </li>
          <li>
            Una duración precisa cierra la acción, así que pide el{" "}
            <span className="fr" lang="fr">passé composé</span>:{" "}
            <span className="fr" lang="fr">J’ai vécu dix ans à Lyon</span>.
          </li>
          <li>
            En un relato, los dos se turnan: el imperfecto sostiene la escena, el{" "}
            <span className="fr" lang="fr">passé composé</span> la hace avanzar.
          </li>
        </ul>
      </div>
    </article>
  );
}
