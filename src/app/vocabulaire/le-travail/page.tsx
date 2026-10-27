import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/le-travail";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (the words, their French definitions, the examples) is written once, below,
   and shared; only captions, heads and the explanations differ. */

const JOBS: { m: string; f: string; change: string | null }[] = [
  { m: "un boulanger", f: "une boulangère", change: "-er → -ère" },
  { m: "un infirmier", f: "une infirmière", change: "-ier → -ière" },
  { m: "un vendeur", f: "une vendeuse", change: "-eur → -euse" },
  { m: "un serveur", f: "une serveuse", change: "-eur → -euse" },
  { m: "un informaticien", f: "une informaticienne", change: "-ien → -ienne" },
  { m: "un avocat", f: "une avocate", change: "-t → -te" },
  { m: "un ingénieur", f: "une ingénieure", change: "-eur → -eure" },
  { m: "un médecin", f: "une médecin", change: null },
];

const NOT_CHANGING = { fr: "forme unique", es: "forma única" };

const WORK_WORDS = [
  ["une entreprise", "une société, l’endroit qui emploie des gens", "Elle travaille dans une grande entreprise."],
  ["un bureau", "la pièce où l’on travaille, et aussi la table", "Mon bureau est au troisième étage."],
  ["un collègue", "une personne qui travaille au même endroit que vous", "Je déjeune avec un collègue."],
  ["le patron", "la personne qui dirige l’entreprise", "Le patron arrive à sept heures."],
  ["un contrat", "le papier signé qui fixe les conditions du travail", "J’ai signé mon contrat lundi."],
  ["un salaire", "l’argent reçu chaque mois pour son travail", "Le salaire est payé le 30 du mois."],
  ["les congés", "les jours où l’on ne travaille pas et où l’on est payé", "Je prends mes congés en août."],
  ["une réunion", "un moment où plusieurs collègues parlent d’un sujet", "La réunion dure une heure."],
];

const TRICKY_WORDS = [
  [
    "un stage",
    "une période courte de travail pour apprendre un métier, souvent pendant les études",
    "Elle a fait un stage de trois mois dans une école.",
  ],
  [
    "une réunion",
    "un rendez-vous de travail entre collègues, pas des retrouvailles",
    "J’ai une réunion avec le service commercial à quatorze heures.",
  ],
  ["rester", "ne pas partir, demeurer à un endroit", "Je suis resté au bureau jusqu’à vingt heures."],
  ["demander", "poser une question, ou réclamer quelque chose", "J’ai demandé une augmentation à mon patron."],
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function JobsTable({
  lang,
  caption,
  heads,
}: {
  lang: "fr" | "es";
  caption: string;
  heads: string[];
}) {
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
          {JOBS.map((job) => (
            <tr key={job.m}>
              <th scope="row" className="fr" lang="fr">
                {job.m}
              </th>
              <td className="fr" lang="fr">
                {job.f}
              </td>
              {job.change ? (
                <td className="fr" lang="fr">
                  {job.change}
                </td>
              ) : (
                <td>{NOT_CHANGING[lang]}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function JobExamples() {
  return (
    <div className="example" lang="fr">
      Je suis <strong>ingénieure</strong>. · Qu’est-ce que vous faites{" "}
      <strong>dans la vie</strong> ? · Je travaille <strong>comme</strong>{" "}
      vendeuse.
    </div>
  );
}

function WordsTable({
  rows,
  caption,
  heads,
}: {
  rows: string[][];
  caption: string;
  heads: string[];
}) {
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
          {rows.map(([word, definition, example]) => (
            <tr key={word}>
              <th scope="row" className="fr" lang="fr">
                {word}
              </th>
              <td lang="fr">{definition}</td>
              <td className="fr" lang="fr">
                {example}
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
        <h2>Dire son métier</h2>

        <div className="rule">
          Après le verbe <span className="fr">être</span>, le nom du métier
          s’emploie <strong>sans article</strong> :{" "}
          <span className="fr">je suis professeur</span>,{" "}
          <span className="fr">elle est infirmière</span>.
        </div>

        <div className="attention">
          L’article revient dès qu’un adjectif s’ajoute :{" "}
          <span className="fr">je suis un bon professeur</span>. C’est
          l’adjectif qui l’appelle, pas le métier.
        </div>

        <JobsTable
          lang="fr"
          caption="Les métiers changent de forme au féminin, comme les adjectifs"
          heads={["Masculin", "Féminin", "La terminaison qui bouge"]}
        />

        <div className="exception">
          Les deux dernières lignes sortent de la règle. Tous les métiers en{" "}
          <span className="fr">-eur</span> ne font pas{" "}
          <span className="fr">-euse</span> :{" "}
          <span className="fr">ingénieur</span> donne{" "}
          <span className="fr">ingénieure</span> et{" "}
          <span className="fr">professeur</span> donne{" "}
          <span className="fr">professeure</span>, parce que ces deux-là ne
          viennent pas d’un verbe. Et{" "}
          <span className="fr">médecin</span> ne change pas du tout : on dit{" "}
          <span className="fr">une médecin</span>.
        </div>

        <JobExamples />
      </section>

      <section data-ui="es" lang="es">
        <h2>Decir tu oficio</h2>

        <div className="rule">
          Después del verbo <Fr>être</Fr>, el nombre del oficio se usa{" "}
          <strong>sin artículo</strong>: <Fr>je suis professeur</Fr>,{" "}
          <Fr>elle est infirmière</Fr>.
        </div>

        <div className="attention">
          El artículo vuelve en cuanto se añade un adjetivo:{" "}
          <Fr>je suis un bon professeur</Fr>. Lo pide el adjetivo, no el
          oficio.
        </div>

        <JobsTable
          lang="es"
          caption="Los oficios cambian de forma en femenino, como los adjetivos"
          heads={["Masculino", "Femenino", "La terminación que cambia"]}
        />

        <div className="exception">
          Las dos últimas filas se salen de la regla. No todos los oficios en{" "}
          <Fr>-eur</Fr> hacen <Fr>-euse</Fr>: <Fr>ingénieur</Fr> da{" "}
          <Fr>ingénieure</Fr> y <Fr>professeur</Fr> da <Fr>professeure</Fr>,
          porque esas dos palabras no vienen de un verbo. Y <Fr>médecin</Fr> no
          cambia en absoluto: se dice <Fr>une médecin</Fr>.
        </div>

        <JobExamples />
      </section>

      <section data-ui="fr">
        <h2>Le lieu, les gens, le contrat</h2>

        <WordsTable
          rows={WORK_WORDS}
          caption="Les mots qu’on emploie tous les jours au bureau ou à l’atelier"
          heads={["Mot", "Définition", "Exemple"]}
        />

        <div className="attention">
          <span className="fr">les congés</span> est un pluriel : pour les
          vacances de l’année, on dit plutôt{" "}
          <span className="fr">les congés</span> que{" "}
          <span className="fr">un congé</span>. On dit <span className="fr">je suis en congés</span> ou{" "}
          <span className="fr">je prends mes congés</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El lugar, la gente, el contrato</h2>

        <WordsTable
          rows={WORK_WORDS}
          caption="Las palabras de cada día en la oficina o en el taller"
          heads={["Palabra", "Definición", "Ejemplo"]}
        />

        <div className="attention">
          <Fr>les congés</Fr> es un plural: para las vacaciones del año, se
          dice más bien <Fr>les congés</Fr> que <Fr>un congé</Fr>. Se dice <Fr>je suis en congés</Fr>{" "}
          o <Fr>je prends mes congés</Fr>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Quatre mots qui trompent</h2>

        <p>
          Ces quatre-là ressemblent à des mots que vous connaissez déjà, et ne
          veulent pas dire la même chose. Ils reviennent sans arrêt dans la vie
          professionnelle.
        </p>

        <WordsTable
          rows={TRICKY_WORDS}
          caption="Quatre mots du travail dont le sens ne se devine pas"
          heads={["Mot", "Définition", "Exemple"]}
        />

        <div className="astuce">
          <p className="astuce-hook">
            Un métier s’apprend avec son article, comme n’importe quel nom.
          </p>
          <p>
            Notez <span className="fr">une entreprise</span>,{" "}
            <span className="fr">un bureau</span>,{" "}
            <span className="fr">une réunion</span>, jamais le mot seul. Le
            genre fait partie du mot, et un nom noté sans lui devra être
            réappris à chaque fois que vous l’emploierez.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuatro palabras que engañan</h2>

        <p>
          Estas cuatro se parecen a palabras que ya conoces, y no significan lo
          mismo. Aparecen sin parar en la vida profesional.
        </p>

        <WordsTable
          rows={TRICKY_WORDS}
          caption="Cuatro palabras del trabajo cuyo sentido no se adivina"
          heads={["Palabra", "Definición", "Ejemplo"]}
        />

        <div className="astuce">
          <p className="astuce-hook">
            Un oficio se aprende con su artículo, como cualquier sustantivo.
          </p>
          <p>
            Anota <Fr>une entreprise</Fr>, <Fr>un bureau</Fr>,{" "}
            <Fr>une réunion</Fr>, nunca la palabra sola. El género forma parte
            de la palabra, y un sustantivo anotado sin él habrá que reaprenderlo
            cada vez que lo uses.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Après <span className="fr">être</span>, le métier se dit sans
            article ; l’adjectif le fait revenir.
          </li>
          <li>
            Le féminin suit les terminaisons de l’adjectif :{" "}
            <span className="fr">-er → -ère</span>,{" "}
            <span className="fr">-eur → -euse</span>,{" "}
            <span className="fr">-ien → -ienne</span>.
          </li>
          <li>
            <span className="fr">ingénieure</span> et{" "}
            <span className="fr">professeure</span> font exception ;{" "}
            <span className="fr">médecin</span> ne change pas.
          </li>
          <li>
            <span className="fr">les congés</span> s’emploie au pluriel.
          </li>
          <li>
            <span className="fr">un stage</span>,{" "}
            <span className="fr">une réunion</span>,{" "}
            <span className="fr">rester</span> et{" "}
            <span className="fr">demander</span> ne veulent pas dire ce qu’ils
            semblent dire : relisez leur définition.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Después de <Fr>être</Fr>, el oficio se dice sin artículo; el
            adjetivo lo hace volver.
          </li>
          <li>
            El femenino sigue las terminaciones del adjetivo:{" "}
            <Fr>-er → -ère</Fr>, <Fr>-eur → -euse</Fr>,{" "}
            <Fr>-ien → -ienne</Fr>.
          </li>
          <li>
            <Fr>ingénieure</Fr> y <Fr>professeure</Fr> son excepciones;{" "}
            <Fr>médecin</Fr> no cambia.
          </li>
          <li>
            <Fr>les congés</Fr> se usa en plural.
          </li>
          <li>
            <Fr>un stage</Fr>, <Fr>une réunion</Fr>, <Fr>rester</Fr> y{" "}
            <Fr>demander</Fr> no significan lo que parecen: relee su
            definición.
          </li>
        </ul>
      </div>
    </article>
  );
}
