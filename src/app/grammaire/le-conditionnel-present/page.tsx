import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-conditionnel-present";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

const PERSONS = ["je", "tu", "il / elle", "nous", "vous", "ils / elles"];

const FORMS: Record<"parler" | "finir" | "prendre", string[]> = {
  parler: ["parlerais", "parlerais", "parlerait", "parlerions", "parleriez", "parleraient"],
  finir: ["finirais", "finirais", "finirait", "finirions", "finiriez", "finiraient"],
  prendre: ["prendrais", "prendrais", "prendrait", "prendrions", "prendriez", "prendraient"],
};

const BASES = [
  ["être", "ser-", "je serais"],
  ["avoir", "aur-", "j’aurais"],
  ["aller", "ir-", "j’irais"],
  ["faire", "fer-", "je ferais"],
  ["pouvoir", "pourr-", "je pourrais"],
  ["vouloir", "voudr-", "je voudrais"],
  ["venir", "viendr-", "je viendrais"],
  ["devoir", "devr-", "je devrais"],
];

const POLITE = [
  ["Je veux un café.", "Je voudrais un café."],
  ["Pouvez-vous répéter ?", "Pourriez-vous répéter ?"],
  ["Tu dois lui écrire.", "Tu devrais lui écrire."],
  ["Je veux visiter Lyon.", "J’aimerais visiter Lyon."],
];

function FormsTable({ caption, person }: { caption: string; person: string }) {
  const verbs = Object.keys(FORMS) as (keyof typeof FORMS)[];
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{person}</th>
            {verbs.map((verb) => (
              <th key={verb} scope="col" className="fr" lang="fr">
                {verb}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERSONS.map((pronoun, row) => (
            <tr key={pronoun}>
              <th scope="row" className="fr" lang="fr">
                {pronoun}
              </th>
              {verbs.map((verb) => (
                <td key={verb} className="fr" lang="fr">
                  {FORMS[verb][row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BasesTable({ caption, heads }: { caption: string; heads: [string, string, string] }) {
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
          {BASES.map(([verb, base, example]) => (
            <tr key={verb}>
              <th scope="row" className="fr" lang="fr">
                {verb}
              </th>
              <td className="fr" lang="fr">
                {base}
              </td>
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

function PoliteTable({ caption, heads }: { caption: string; heads: [string, string] }) {
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
          {POLITE.map(([direct, polite]) => (
            <tr key={direct}>
              <th scope="row" className="fr" lang="fr">
                {direct}
              </th>
              <td className="fr" lang="fr">
                {polite}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IfExamples() {
  return (
    <div className="example" lang="fr">
      <strong>Si</strong> j’<strong>avais</strong> le temps, je{" "}
      <strong>viendrais</strong> avec vous.
      <br />
      <strong>Si</strong> nous <strong>habitions</strong> à Paris, nous{" "}
      <strong>irions</strong> au théâtre tous les mois.
      <br />
      Je te le <strong>dirais</strong> <strong>si</strong> je le{" "}
      <strong>savais</strong>.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>L’infinitif, plus les terminaisons de l’imparfait</h2>

        <div className="rule">
          Le conditionnel présent se forme sur l’infinitif, auquel on ajoute{" "}
          <span className="fr">-ais</span>,{" "}
          <span className="fr">-ais</span>, <span className="fr">-ait</span>,{" "}
          <span className="fr">-ions</span>,{" "}
          <span className="fr">-iez</span>,{" "}
          <span className="fr">-aient</span>. Ce sont exactement les
          terminaisons de l’imparfait.
        </div>

        <FormsTable
          caption="Trois verbes au conditionnel présent, un par groupe"
          person="Personne"
        />

        <p>
          Les verbes en <span className="fr">-re</span> perdent leur{" "}
          <span className="fr">e</span> final :{" "}
          <span className="fr">prendre</span> donne{" "}
          <span className="fr">je prendrais</span>. Quelques verbes courants
          ont une base à eux, et c’est la même qu’au futur.
        </p>

        <BasesTable
          caption="Les huit bases qu’il faut connaître par cœur"
          heads={["Verbe", "La base", "Exemple"]}
        />

        <div className="astuce">
          <p className="astuce-hook">
            Il y a toujours un <span className="fr">r</span> avant la
            terminaison.
          </p>
          <p>
            <span className="fr">je parlais</span> est un imparfait,{" "}
            <span className="fr">je parlerais</span> un conditionnel. Le{" "}
            <span className="fr">r</span> est la seule différence, à l’oral
            comme à l’écrit, et il y est dans toutes les bases irrégulières :{" "}
            <span className="fr">aur-</span>, <span className="fr">ir-</span>,{" "}
            <span className="fr">pourr-</span>,{" "}
            <span className="fr">viendr-</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El infinitivo, más las terminaciones del imperfecto</h2>

        <div className="rule">
          El condicional presente se forma sobre el infinitivo, al que se
          añaden <span className="fr" lang="fr">-ais</span>,{" "}
          <span className="fr" lang="fr">-ais</span>,{" "}
          <span className="fr" lang="fr">-ait</span>,{" "}
          <span className="fr" lang="fr">-ions</span>,{" "}
          <span className="fr" lang="fr">-iez</span>,{" "}
          <span className="fr" lang="fr">-aient</span>. Son exactamente las
          terminaciones del imperfecto.
        </div>

        <FormsTable
          caption="Tres verbos en condicional presente, uno por grupo"
          person="Persona"
        />

        <p>
          Los verbos en <span className="fr" lang="fr">-re</span> pierden la{" "}
          <span className="fr" lang="fr">e</span> final:{" "}
          <span className="fr" lang="fr">prendre</span> da{" "}
          <span className="fr" lang="fr">je prendrais</span>. Algunos verbos
          corrientes tienen una base propia, y es la misma que en el futuro.
        </p>

        <BasesTable
          caption="Las ocho bases que hay que saber de memoria"
          heads={["Verbo", "La base", "Ejemplo"]}
        />

        <div className="astuce">
          <p className="astuce-hook">
            Siempre hay una <span className="fr" lang="fr">r</span> antes de la
            terminación.
          </p>
          <p>
            <span className="fr" lang="fr">je parlais</span> es un imperfecto,{" "}
            <span className="fr" lang="fr">je parlerais</span> un condicional.
            La <span className="fr" lang="fr">r</span> es la única diferencia,
            tanto al hablar como al escribir, y está en todas las bases
            irregulares: <span className="fr" lang="fr">aur-</span>,{" "}
            <span className="fr" lang="fr">ir-</span>,{" "}
            <span className="fr" lang="fr">pourr-</span>,{" "}
            <span className="fr" lang="fr">viendr-</span>.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Demander sans exiger</h2>

        <div className="rule">
          Le conditionnel transforme une demande en proposition. C’est son
          emploi le plus fréquent, et il ne dit rien d’une condition :{" "}
          <span className="fr">je voudrais</span> est simplement la forme polie
          de <span className="fr">je veux</span>.
        </div>

        <PoliteTable
          caption="La même demande, au présent puis au conditionnel"
          heads={["Direct", "Poli"]}
        />

        <div className="attention">
          <span className="fr">tu devrais</span> est un conseil, pas une
          obligation. <span className="fr">tu dois lui écrire</span> ne laisse
          pas le choix ; <span className="fr">tu devrais lui écrire</span> le
          laisse entier. C’est la nuance qui manque le plus souvent dans un
          message écrit en français.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Pedir sin exigir</h2>

        <div className="rule">
          El condicional convierte una petición en una propuesta. Es su uso más
          frecuente, y no dice nada de una condición:{" "}
          <span className="fr" lang="fr">je voudrais</span> es simplemente la
          forma educada de <span className="fr" lang="fr">je veux</span>.
        </div>

        <PoliteTable
          caption="La misma petición, en presente y luego en condicional"
          heads={["Directo", "Educado"]}
        />

        <div className="attention">
          <span className="fr" lang="fr">tu devrais</span> es un consejo, no una
          obligación. <span className="fr" lang="fr">tu dois lui écrire</span> no
          deja elección; <span className="fr" lang="fr">tu devrais lui écrire</span>{" "}
          la deja intacta. Es el matiz que más falta en un mensaje escrito en
          francés.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Ce qui arriverait, si</h2>

        <div className="rule">
          Pour dire ce qui se passerait dans une situation imaginaire, la
          phrase a deux moitiés :{" "}
          <span className="fr">si</span> plus l’<strong>imparfait</strong> d’un
          côté, le <strong>conditionnel</strong> de l’autre.
        </div>

        <IfExamples />

        <p>
          Les deux moitiés peuvent s’échanger, comme dans la troisième phrase.
          Ce qui ne change jamais, c’est le temps de chacune.
        </p>

        <div className="attention">
          On ne met jamais de conditionnel après{" "}
          <span className="fr">si</span>. On écrit{" "}
          <span className="fr">si j’avais</span>, jamais{" "}
          <s className="fr">si j’aurais</s>, et{" "}
          <span className="fr">si je pouvais</span>, jamais{" "}
          <s className="fr">si je pourrais</s>. La faute est fréquente,
          y compris chez des francophones, et elle se voit immédiatement à
          l’écrit.
        </div>

        <div className="exception">
          <span className="fr">si</span> a un autre emploi, où il veut dire{" "}
          <span className="fr">est-ce que</span>. Là, le conditionnel est
          possible : <span className="fr">je me demande s’il viendrait</span>.
          Le test tient en une question : est-ce que{" "}
          <span className="fr">si</span> pose une condition, ou est-ce qu’il
          pose une question ? Ici, il pose une question, et la règle ci-dessus
          ne s’applique pas.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Lo que pasaría, si</h2>

        <div className="rule">
          Para decir lo que pasaría en una situación imaginaria, la frase tiene
          dos mitades: <span className="fr" lang="fr">si</span> más el{" "}
          <strong>imperfecto</strong> por un lado, el{" "}
          <strong>condicional</strong> por el otro.
        </div>

        <IfExamples />

        <p>
          Las dos mitades se pueden intercambiar, como en la tercera frase. Lo
          que nunca cambia es el tiempo de cada una.
        </p>

        <div className="attention">
          Nunca se pone condicional después de{" "}
          <span className="fr" lang="fr">si</span>. Se escribe{" "}
          <span className="fr" lang="fr">si j’avais</span>, nunca{" "}
          <s className="fr" lang="fr">si j’aurais</s>, y{" "}
          <span className="fr" lang="fr">si je pouvais</span>, nunca{" "}
          <s className="fr" lang="fr">si je pourrais</s>. El error es
          frecuente, incluso entre francófonos, y se ve enseguida por escrito.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">si</span> tiene otro uso, en el que
          significa <span className="fr" lang="fr">est-ce que</span>. Ahí el
          condicional es posible:{" "}
          <span className="fr" lang="fr">je me demande s’il viendrait</span>. La
          prueba es una pregunta: ¿<span className="fr" lang="fr">si</span>{" "}
          plantea una condición o plantea una pregunta? Aquí plantea una
          pregunta, y la regla de arriba no se aplica.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Infinitif plus les terminaisons de l’imparfait, avec un{" "}
            <span className="fr">r</span> toujours devant.
          </li>
          <li>
            Huit verbes courants ont une base à eux, la même qu’au futur.
          </li>
          <li>
            Il rend une demande polie :{" "}
            <span className="fr">je voudrais</span>,{" "}
            <span className="fr">pourriez-vous</span>,{" "}
            <span className="fr">tu devrais</span>.
          </li>
          <li>
            Pour une situation imaginaire :{" "}
            <span className="fr">si</span> plus imparfait d’un côté,
            conditionnel de l’autre.
          </li>
          <li>
            Jamais de conditionnel derrière un{" "}
            <span className="fr">si</span> de condition.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Infinitivo más las terminaciones del imperfecto, con una{" "}
            <span className="fr" lang="fr">r</span> siempre delante.
          </li>
          <li>
            Ocho verbos corrientes tienen una base propia, la misma que en el
            futuro.
          </li>
          <li>
            Hace educada una petición:{" "}
            <span className="fr" lang="fr">je voudrais</span>,{" "}
            <span className="fr" lang="fr">pourriez-vous</span>,{" "}
            <span className="fr" lang="fr">tu devrais</span>.
          </li>
          <li>
            Para una situación imaginaria:{" "}
            <span className="fr" lang="fr">si</span> más imperfecto por un lado,
            condicional por el otro.
          </li>
          <li>
            Nunca condicional detrás de un{" "}
            <span className="fr" lang="fr">si</span> de condición.
          </li>
        </ul>
      </div>
    </article>
  );
}
