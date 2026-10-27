import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-futur-proche";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

const ROWS = [
  { subject: "je", aller: "vais", inf: "parler", example: "Je vais parler au directeur." },
  { subject: "tu", aller: "vas", inf: "finir", example: "Tu vas finir avant midi ?" },
  { subject: "il / elle / on", aller: "va", inf: "partir", example: "Le train va partir." },
  { subject: "nous", aller: "allons", inf: "manger", example: "Nous allons manger à huit heures." },
  { subject: "vous", aller: "allez", inf: "prendre", example: "Vous allez prendre un dessert ?" },
  { subject: "ils / elles", aller: "vont", inf: "venir", example: "Elles vont venir dimanche." },
];

const PLACES = [
  {
    fr: "réfléchi",
    es: "reflexivo",
    place: { fr: "devant l’infinitif", es: "delante del infinitivo" },
    example: "Je vais me coucher tôt.",
  },
  {
    fr: "objet direct",
    es: "complemento directo",
    place: { fr: "devant l’infinitif", es: "delante del infinitivo" },
    example: "Ce livre ? Je vais le lire ce soir.",
  },
  {
    fr: "objet indirect",
    es: "complemento indirecto",
    place: { fr: "devant l’infinitif", es: "delante del infinitivo" },
    example: "Je vais lui téléphoner demain.",
  },
];

function PersonTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? "El futuro próximo, persona por persona, con verbos distintos"
            : "Le futur proche, personne par personne, avec des verbes différents"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "Sujeto" : "Sujet"}</th>
            <th scope="col" className="fr" lang="fr">
              aller
            </th>
            <th scope="col">{es ? "Infinitivo" : "Infinitif"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.subject}>
              <th scope="row" className="fr" lang="fr">
                {row.subject}
              </th>
              <td className="fr" lang="fr">
                {row.aller}
              </td>
              <td className="fr" lang="fr">
                {row.inf}
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

function PlaceTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? "Dónde va el pronombre en una frase en futuro próximo"
            : "Où se met le pronom dans une phrase au futur proche"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "Tipo de pronombre" : "Type de pronom"}</th>
            <th scope="col">{es ? "Su lugar" : "Sa place"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {PLACES.map((row) => (
            <tr key={row.fr}>
              <th scope="row">{row[lang]}</th>
              <td>{row.place[lang]}</td>
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

function Negation() {
  return (
    <div className="example" lang="fr">
      Je <strong>ne</strong> vais <strong>pas</strong> travailler demain.
      <br />
      Ils <strong>ne</strong> vont <strong>pas</strong> venir.
      <br />
      On <strong>ne</strong> va <strong>pas</strong> rester longtemps.
    </div>
  );
}

function Uses() {
  return (
    <div className="example" lang="fr">
      Attention, tu <strong>vas tomber</strong> ! · Je{" "}
      <strong>vais chercher</strong> les enfants dans dix minutes. · On{" "}
      <strong>va déménager</strong> le mois prochain.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Le verbe « aller », puis l’infinitif</h2>

        <div className="rule">
          Le futur proche se construit avec{" "}
          <span className="fr">aller</span> au présent, suivi du verbe à{" "}
          <strong>l’infinitif</strong>. Les deux verbes se touchent : il n’y a
          rien entre eux.
        </div>

        <div className="attention">
          On écrit <span className="fr">je vais manger</span>, jamais{" "}
          <s className="fr">je vais à manger</s>. Aucune préposition ne
          sépare <span className="fr">aller</span> de l’infinitif. C’est la
          faute la plus fréquente sur ce temps.
        </div>

        <PersonTable lang="fr" />

        <div className="exception">
          Quand le verbe à l’infinitif est justement{" "}
          <span className="fr">aller</span>, on le répète :{" "}
          <span className="fr">je vais aller à la gare</span>. La phrase paraît
          lourde, elle est correcte, et c’est ce que tout le monde dit.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El verbo <span className="fr" lang="fr">«aller»</span>, y después el infinitivo
        </h2>

        <div className="rule">
          El futuro próximo se forma con{" "}
          <span className="fr" lang="fr">aller</span> en presente, seguido del
          verbo en <strong>infinitivo</strong>. Los dos verbos van juntos: no
          hay nada entre ellos.
        </div>

        <div className="attention">
          Se escribe <span className="fr" lang="fr">je vais manger</span>, nunca{" "}
          <s className="fr" lang="fr">je vais à manger</s>. Ninguna preposición
          separa <span className="fr" lang="fr">aller</span> del infinitivo. Es
          el error más frecuente en este tiempo.
        </div>

        <PersonTable lang="es" />

        <div className="exception">
          Cuando el verbo en infinitivo es precisamente{" "}
          <span className="fr" lang="fr">aller</span>, se repite:{" "}
          <span className="fr" lang="fr">je vais aller à la gare</span>. La
          frase parece pesada, pero es correcta, y es lo que dice todo el mundo.
        </div>
      </section>

      <section data-ui="fr">
        <h2>La négation et les pronoms</h2>

        <div className="rule">
          Le verbe conjugué de la phrase, c’est{" "}
          <span className="fr">aller</span>. C’est donc lui, et lui seul, que{" "}
          <span className="fr">ne … pas</span> encadre. L’infinitif reste
          dehors, après <span className="fr">pas</span>.
        </div>

        <Negation />

        <p>
          Un pronom, lui, ne se place pas au même endroit : il se colle à
          l’infinitif, parce que c’est l’infinitif qui le gouverne.
        </p>

        <PlaceTable lang="fr" />

        <div className="attention">
          Le pronom ne se met jamais devant{" "}
          <span className="fr">aller</span>. On écrit{" "}
          <span className="fr">tu vas te laver</span>, jamais{" "}
          <s className="fr">tu te vas laver</s>. Et quand la phrase est
          négative, le pronom reste avec son infinitif, donc derrière{" "}
          <span className="fr">pas</span> :{" "}
          <span className="fr">je ne vais pas me coucher</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>La negación y los pronombres</h2>

        <div className="rule">
          El verbo conjugado de la frase es{" "}
          <span className="fr" lang="fr">aller</span>. Por eso{" "}
          <span className="fr" lang="fr">ne … pas</span> rodea a este verbo, y
          solo a él. El infinitivo queda fuera, detrás de{" "}
          <span className="fr" lang="fr">pas</span>.
        </div>

        <Negation />

        <p>
          El pronombre, en cambio, no va en el mismo sitio: se pega al
          infinitivo, porque es el infinitivo quien lo rige.
        </p>

        <PlaceTable lang="es" />

        <div className="attention">
          El pronombre nunca va delante de{" "}
          <span className="fr" lang="fr">aller</span>. Se escribe{" "}
          <span className="fr" lang="fr">tu vas te laver</span>, nunca{" "}
          <s className="fr" lang="fr">tu te vas laver</s>. Y cuando la frase es
          negativa, el pronombre se queda con su infinitivo, es decir, detrás de{" "}
          <span className="fr" lang="fr">pas</span>:{" "}
          <span className="fr" lang="fr">je ne vais pas me coucher</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Quand on l’emploie</h2>

        <p>
          Le futur proche dit ce qui va arriver bientôt, ou ce qui est déjà
          décidé. C’est le futur de la conversation : dans une journée ordinaire,
          on l’emploie presque tout le temps.
        </p>

        <Uses />

        <p>
          Les mots qui l’accompagnent disent la même chose que lui :{" "}
          <span className="fr">tout de suite</span>,{" "}
          <span className="fr">dans cinq minutes</span>,{" "}
          <span className="fr">ce soir</span>,{" "}
          <span className="fr">demain</span>,{" "}
          <span className="fr">la semaine prochaine</span>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            Deux verbes que vous connaissez déjà, et le futur est fait.
          </p>
          <p>
            Le futur simple demande un radical par verbe :{" "}
            <span className="fr">je ferai</span>,{" "}
            <span className="fr">je viendrai</span>,{" "}
            <span className="fr">je pourrai</span>. Le futur proche n’en demande
            aucun. Si vous savez conjuguer{" "}
            <span className="fr">aller</span> au présent, vous pouvez mettre
            n’importe quel verbe au futur, sans rien apprendre de plus.
            Servez-vous-en pendant que vous apprenez l’autre.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuándo se usa</h2>

        <p>
          El futuro próximo dice lo que va a pasar pronto, o lo que ya está
          decidido. Es el futuro de la conversación: en un día normal se usa
          casi todo el tiempo.
        </p>

        <Uses />

        <p>
          Las palabras que lo acompañan dicen lo mismo que él:{" "}
          <span className="fr" lang="fr">tout de suite</span>,{" "}
          <span className="fr" lang="fr">dans cinq minutes</span>,{" "}
          <span className="fr" lang="fr">ce soir</span>,{" "}
          <span className="fr" lang="fr">demain</span>,{" "}
          <span className="fr" lang="fr">la semaine prochaine</span>.
        </p>

        <div className="astuce">
          <p className="astuce-hook">
            Dos verbos que ya conoces, y el futuro está hecho.
          </p>
          <p>
            El futuro simple pide una raíz distinta para cada verbo:{" "}
            <span className="fr" lang="fr">je ferai</span>,{" "}
            <span className="fr" lang="fr">je viendrai</span>,{" "}
            <span className="fr" lang="fr">je pourrai</span>. El futuro próximo
            no pide ninguna. Si sabes conjugar{" "}
            <span className="fr" lang="fr">aller</span> en presente, puedes
            poner cualquier verbo en futuro sin aprender nada más. Úsalo
            mientras aprendes el otro.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">aller</span> au présent, puis l’infinitif, et
            rien entre les deux.
          </li>
          <li>
            <span className="fr">ne … pas</span> encadre{" "}
            <span className="fr">aller</span> seul ; l’infinitif se met après{" "}
            <span className="fr">pas</span>.
          </li>
          <li>
            Le pronom se colle à l’infinitif :{" "}
            <span className="fr">je vais me coucher</span>,{" "}
            <span className="fr">je vais le lire</span>.
          </li>
          <li>
            Il dit ce qui arrive bientôt ou ce qui est décidé, et va avec{" "}
            <span className="fr">ce soir</span>,{" "}
            <span className="fr">demain</span>,{" "}
            <span className="fr">la semaine prochaine</span>.
          </li>
          <li>
            Il ne demande aucun radical nouveau : c’est le futur le plus rapide
            à produire.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">aller</span> en presente, después el
            infinitivo, y nada entre los dos.
          </li>
          <li>
            <span className="fr" lang="fr">ne … pas</span> rodea solo a{" "}
            <span className="fr" lang="fr">aller</span>; el infinitivo va
            después de <span className="fr" lang="fr">pas</span>.
          </li>
          <li>
            El pronombre se pega al infinitivo:{" "}
            <span className="fr" lang="fr">je vais me coucher</span>,{" "}
            <span className="fr" lang="fr">je vais le lire</span>.
          </li>
          <li>
            Dice lo que ocurre pronto o lo que ya está decidido, y va con{" "}
            <span className="fr" lang="fr">ce soir</span>,{" "}
            <span className="fr" lang="fr">demain</span>,{" "}
            <span className="fr" lang="fr">la semaine prochaine</span>.
          </li>
          <li>
            No pide ninguna raíz nueva: es el futuro más rápido de producir.
          </li>
        </ul>
      </div>
    </article>
  );
}
