import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-jours-et-la-date";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

const HABITS = [
  { form: "lundi", example: "Lundi, je vais chez le médecin." },
  { form: "le lundi", example: "Le lundi, je fais du sport." },
  { form: "tous les lundis", example: "Tous les lundis, la boulangerie est fermée." },
];

const MEANINGS = {
  fr: [
    "le prochain lundi, une seule fois",
    "chaque lundi, une habitude",
    "la même habitude, dite plus clairement",
  ],
  es: [
    "el próximo lunes, una sola vez",
    "cada lunes, una costumbre",
    "la misma costumbre, dicha con más claridad",
  ],
};

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function Names() {
  return (
    <>
      <div className="example" lang="fr">
        lundi · mardi · mercredi · jeudi · vendredi · samedi · dimanche
      </div>

      <div className="example" lang="fr">
        janvier · février · mars · avril · mai · juin
        <br />
        juillet · août · septembre · octobre · novembre · décembre
      </div>
    </>
  );
}

function HabitsTable({
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
          {HABITS.map((habit, row) => (
            <tr key={habit.form}>
              <th scope="row" className="fr" lang="fr">
                {habit.form}
              </th>
              <td>{MEANINGS[lang][row]}</td>
              <td className="fr" lang="fr">
                {habit.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Saturday() {
  return (
    <div className="example" lang="fr">
      Je pars <strong>samedi</strong>. · <strong>Le samedi</strong>, je ne
      travaille pas.
    </div>
  );
}

function Dates() {
  return (
    <div className="example" lang="fr">
      Nous sommes <strong>le</strong> 14 juillet 2026.
      <br />
      Je pars <strong>le</strong> 1<sup>er</sup> août.
      <br />
      La réunion a lieu <strong>le</strong> 5 mai, à dix heures.
    </div>
  );
}

function First() {
  return (
    <Fr>
      le 1<sup>er</sup> août
    </Fr>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Les jours et les mois</h2>

        <div className="rule">
          Les jours de la semaine et les mois de l’année s’écrivent en{" "}
          <strong>minuscule</strong>, même au milieu d’une date. Ils ne
          prennent une majuscule qu’en début de phrase, comme n’importe quel
          mot.
        </div>

        <Names />

        <p>
          Tous les jours sont masculins :{" "}
          <span className="fr">un lundi de janvier</span>,{" "}
          <span className="fr">le dernier dimanche du mois</span>. Les mois le
          sont aussi, mais on les emploie rarement avec un article.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">
            août
          </span>{" "}
          ne se prononce pas comme il s’écrit : le{" "}
          <span className="fr">a</span> ne s’entend pas. C’est le seul mois de
          la liste qui pose un problème à voix haute, et il est aussi le seul à
          porter un accent circonflexe.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Los días y los meses</h2>

        <div className="rule">
          Los días de la semana y los meses del año se escriben en{" "}
          <strong>minúscula</strong>, incluso en medio de una fecha. Solo llevan
          mayúscula al principio de una frase, como cualquier otra palabra.
        </div>

        <Names />

        <p>
          Todos los días son masculinos: <Fr>un lundi de janvier</Fr>,{" "}
          <Fr>le dernier dimanche du mois</Fr>. Los meses también lo son, pero
          rara vez se usan con artículo.
        </p>

        <div className="attention">
          <Fr>août</Fr> no se pronuncia como se escribe: la <Fr>a</Fr> no se
          oye. Es el único mes de la lista que plantea un problema en voz alta,
          y también el único que lleva acento circunflejo.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Une fois, ou toutes les semaines</h2>

        <div className="rule">
          <span className="fr">lundi</span> tout seul désigne{" "}
          <strong>un jour précis</strong>, celui qui arrive.{" "}
          <span className="fr">le lundi</span>, avec l’article, désigne{" "}
          <strong>tous les lundis</strong>, une habitude.
        </div>

        <HabitsTable
          lang="fr"
          caption="L’article seul fait toute la différence entre un rendez-vous et une habitude"
          heads={["Forme", "Ce que ça veut dire", "Exemple"]}
        />

        <Saturday />

        <div className="astuce">
          <p className="astuce-hook">
            L’article, c’est la répétition. Sans article, c’est une date.
          </p>
          <p>
            Cela vaut aussi pour <span className="fr">le matin</span>,{" "}
            <span className="fr">le soir</span>,{" "}
            <span className="fr">le week-end</span> :{" "}
            <span className="fr">le soir, je lis</span> parle de tous les soirs,
            alors que <span className="fr">ce soir, je lis</span> parle
            d’aujourd’hui.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Una vez, o todas las semanas</h2>

        <div className="rule">
          <Fr>lundi</Fr> solo designa <strong>un día concreto</strong>, el que
          viene. <Fr>le lundi</Fr>, con artículo, designa{" "}
          <strong>todos los lunes</strong>, una costumbre.
        </div>

        <HabitsTable
          lang="es"
          caption="Basta el artículo para distinguir una cita de una costumbre"
          heads={["Forma", "Qué significa", "Ejemplo"]}
        />

        <Saturday />

        <div className="astuce">
          <p className="astuce-hook">
            El artículo es la repetición. Sin artículo, es una fecha.
          </p>
          <p>
            Vale también para <Fr>le matin</Fr>, <Fr>le soir</Fr>,{" "}
            <Fr>le week-end</Fr>: <Fr>le soir, je lis</Fr> habla de todas las
            noches, mientras que <Fr>ce soir, je lis</Fr> habla de hoy.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Dire et écrire la date</h2>

        <div className="rule">
          Une date française commence par{" "}
          <span className="fr">le</span>, puis le nombre, puis le mois, puis
          l’année. Rien ne s’intercale entre le nombre et le mois.
        </div>

        <Dates />

        <div className="exception">
          On écrit <span className="fr">le 5 mai</span>, jamais{" "}
          <s className="fr">le 5 de mai</s>. Et le premier jour du mois
          est le seul qui se compte autrement :{" "}
          <span className="fr">
            le 1<sup>er</sup> août
          </span>
          , qui se lit <span className="fr">le premier août</span>. Pour tous
          les autres, le nombre normal suffit :{" "}
          <span className="fr">le 2 août</span>,{" "}
          <span className="fr">le 3 août</span>.
        </div>

        <div className="attention">
          Pour demander la date, deux questions coexistent :{" "}
          <span className="fr">quel jour sommes-nous ?</span> et{" "}
          <span className="fr">on est le combien ?</span>. La première est plus
          soignée, la seconde très courante. Les deux se répondent par{" "}
          <span className="fr">nous sommes le…</span> ou{" "}
          <span className="fr">on est le…</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Decir y escribir la fecha</h2>

        <div className="rule">
          Una fecha francesa empieza por <Fr>le</Fr>, luego el número, luego el
          mes y luego el año. No se intercala nada entre el número y el mes.
        </div>

        <Dates />

        <div className="exception">
          Se escribe <Fr>le 5 mai</Fr>, nunca{" "}
          <s className="fr" lang="fr">
            le 5 de mai
          </s>
          . Y el primer día del mes es el único que se cuenta de otra manera:{" "}
          <First />, que se lee <Fr>le premier août</Fr>. En todos los demás
          basta el número normal: <Fr>le 2 août</Fr>, <Fr>le 3 août</Fr>.
        </div>

        <div className="attention">
          Para preguntar la fecha hay dos preguntas:{" "}
          <Fr>quel jour sommes-nous ?</Fr> y <Fr>on est le combien ?</Fr>. La
          primera es más cuidada; la segunda, muy corriente. Las dos se
          responden con <Fr>nous sommes le…</Fr> o <Fr>on est le…</Fr>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Jours et mois s’écrivent en minuscule, et tous les jours sont
            masculins.
          </li>
          <li>
            <span className="fr">août</span> se prononce sans le{" "}
            <span className="fr">a</span>.
          </li>
          <li>
            <span className="fr">lundi</span> désigne un jour précis,{" "}
            <span className="fr">le lundi</span> une habitude.
          </li>
          <li>
            La date se construit <span className="fr">le</span> + nombre + mois
            + année, sans rien entre le nombre et le mois.
          </li>
          <li>
            Seul le premier du mois s’écrit{" "}
            <span className="fr">
              1<sup>er</sup>
            </span>
            .
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Días y meses se escriben en minúscula, y todos los días son
            masculinos.
          </li>
          <li>
            <Fr>août</Fr> se pronuncia sin la <Fr>a</Fr>.
          </li>
          <li>
            <Fr>lundi</Fr> designa un día concreto, <Fr>le lundi</Fr> una
            costumbre.
          </li>
          <li>
            La fecha se construye <Fr>le</Fr> + número + mes + año, sin nada
            entre el número y el mes.
          </li>
          <li>
            Solo el primero del mes se escribe{" "}
            <Fr>
              1<sup>er</sup>
            </Fr>
            .
          </li>
        </ul>
      </div>
    </article>
  );
}
