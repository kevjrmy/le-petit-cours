import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/tu-ou-vous";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish (#102). The French taught and the Spanish
   gloss column are written once and shared; the explaining columns carry both
   languages. In the French body a Spanish piece says lang="es". */

type Ui = "fr" | "es";

function Fr({ ui, children }: { ui: Ui; children: ReactNode }) {
  return (
    <span className="fr" lang={ui === "es" ? "fr" : undefined}>
      {children}
    </span>
  );
}

/* A table whose last column is the Spanish gloss, shared by both bodies. */
function Table({
  ui,
  caption,
  heads,
  rows,
}: {
  ui: Ui;
  caption: ReactNode;
  heads: [string, string, string, string];
  rows: { first: ReactNode; firstFr?: boolean; second: ReactNode; ex: string; gloss: string }[];
}) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {heads.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <th
                scope="row"
                className={row.firstFr ? "fr" : undefined}
                lang={row.firstFr && ui === "es" ? "fr" : undefined}
              >
                {row.first}
              </th>
              <td>{row.second}</td>
              <td className="fr" lang={ui === "es" ? "fr" : undefined}>
                {row.ex}
              </td>
              <td lang={ui === "fr" ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TU_VOUS = [
  { who: { fr: "un ami, la famille, un enfant", es: "un amigo, un familiar, un niño" }, say: "tu", ex: "Tu parles français ?", gloss: "¿Hablas francés?" },
  { who: { fr: "un inconnu, un vendeur, un professeur", es: "un desconocido, un vendedor, un profesor" }, say: "vous", ex: "Vous parlez français ?", gloss: "¿Habla usted francés?" },
  { who: { fr: "plusieurs personnes, même des amis", es: "varias personas, aunque sean amigas" }, say: "vous", ex: "Vous venez demain ?", gloss: "¿Venís mañana?" },
];

function TuVousTable({ ui }: { ui: Ui }) {
  return (
    <Table
      ui={ui}
      caption={
        ui === "fr" ? (
          <>
            Avec qui vous dites « <Fr ui={ui}>tu</Fr> » et avec qui vous dites « <Fr ui={ui}>vous</Fr> »
          </>
        ) : (
          <>
            Con quién usas «<Fr ui={ui}>tu</Fr>» y con quién usas «<Fr ui={ui}>vous</Fr>»
          </>
        )
      }
      heads={
        ui === "fr"
          ? ["Vous parlez à…", "Vous dites", "Exemple", "En espagnol"]
          : ["Hablas con…", "Dices", "Ejemplo", "En español"]
      }
      rows={TU_VOUS.map((r) => ({
        first: r.who[ui],
        second: <Fr ui={ui}>{r.say}</Fr>,
        ex: r.ex,
        gloss: r.gloss,
      }))}
    />
  );
}

/* Greetings: the French word, when it is said (per language), an example, the gloss. */
const GREETINGS = [
  { word: "bonjour", when: { fr: "le jour, avec tout le monde", es: "de día, con cualquiera" }, ex: "Bonjour, madame.", gloss: "Buenos días / buenas tardes, señora." },
  { word: "bonsoir", when: { fr: "en fin d’après-midi et le soir", es: "al caer la tarde y de noche" }, ex: "Bonsoir, monsieur.", gloss: "Buenas tardes / buenas noches, señor." },
  { word: "salut", when: null, ex: "Salut, Léa !", gloss: "¡Hola, Léa! / ¡Chao, Léa!" },
  { word: "au revoir", when: { fr: "pour partir, avec tout le monde", es: "adiós, con cualquiera" }, ex: "Au revoir, monsieur.", gloss: "Adiós, señor." },
  { word: "bonne journée", when: { fr: "en partant, le jour", es: "al despedirte, de día" }, ex: "Merci, bonne journée !", gloss: "Gracias, ¡buen día!" },
];

function GreetingsTable({ ui }: { ui: Ui }) {
  return (
    <Table
      ui={ui}
      caption={
        ui === "fr"
          ? "Les formules pour saluer et prendre congé, et le moment où on les dit"
          : "Las fórmulas para saludar y despedirse, y cuándo se dicen"
      }
      heads={
        ui === "fr"
          ? ["Expression", "Quand", "Exemple", "En espagnol"]
          : ["Expresión", "Cuándo", "Ejemplo", "En español"]
      }
      rows={GREETINGS.map((r) => ({
        first: r.word,
        firstFr: true,
        second: r.when ? (
          r.when[ui]
        ) : ui === "fr" ? (
          <>
            seulement avec « <Fr ui={ui}>tu</Fr> » : <Fr ui={ui}>bonjour</Fr> et{" "}
            <Fr ui={ui}>au revoir</Fr>
          </>
        ) : (
          <>
            solo con «<Fr ui={ui}>tu</Fr>»: hola y adiós
          </>
        ),
        ex: r.ex,
        gloss: r.gloss,
      }))}
    />
  );
}

const THANKS = [
  { word: "merci", when: { fr: "remercier", es: "dar las gracias" }, ex: "Merci beaucoup !", gloss: "¡Muchas gracias!" },
  { word: "de rien", when: null, ex: "Merci. – De rien.", gloss: "Gracias. – De nada." },
  { word: "pardon", when: { fr: "un petit choc, pour passer, une phrase mal entendue", es: "un roce, un paso, no haber oído" }, ex: "Pardon ? Vous pouvez répéter ?", gloss: "¿Perdón? ¿Puede repetir?" },
  { word: "excusez-moi", when: { fr: "attirer l’attention, déranger", es: "llamar la atención, molestar" }, ex: "Excusez-moi, où est la gare ?", gloss: "Perdone, ¿dónde está la estación?" },
  { word: "désolé", when: { fr: "regretter vraiment", es: "lamentar de verdad" }, ex: "Je suis désolé, je suis en retard.", gloss: "Lo siento, llego tarde." },
];

function ThanksTable({ ui }: { ui: Ui }) {
  return (
    <Table
      ui={ui}
      caption={
        ui === "fr"
          ? "Quand utiliser chaque mot pour remercier ou s’excuser"
          : "Cuándo usar cada palabra para dar las gracias o pedir perdón"
      }
      heads={
        ui === "fr"
          ? ["Expression", "Quand", "Exemple", "En espagnol"]
          : ["Expresión", "Cuándo", "Ejemplo", "En español"]
      }
      rows={THANKS.map((r) => ({
        first: r.word,
        firstFr: true,
        second: r.when ? (
          r.when[ui]
        ) : ui === "fr" ? (
          <>
            répondre à « <Fr ui={ui}>merci</Fr> »
          </>
        ) : (
          <>
            responder a «<Fr ui={ui}>merci</Fr>»
          </>
        ),
        ex: r.ex,
        gloss: r.gloss,
      }))}
    />
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>
          Tu ou vous ? En français, presque toujours « <span className="fr">vous</span> »
        </h2>

        <div className="astuce">
          <p className="astuce-hook">
            Si ce n’est pas un ami, la famille ou un enfant, dites <strong>vous</strong>. Et si vous
            parlez à plusieurs personnes, dites aussi <strong>vous</strong>.
          </p>
          <p>
            En Espagne, presque tout le monde se tutoie. Le mot <em lang="es">usted</em> sert peu. En
            France, c’est le contraire : avec un inconnu, dans un magasin, avec un professeur ou
            avec votre chef, on dit <span className="fr">vous</span>. Et{" "}
            <span className="fr">vous</span> est aussi le pluriel (<em lang="es">vosotros</em>) : il
            n’y a pas de troisième mot.
          </p>
        </div>

        <TuVousTable ui="fr" />

        <p>
          L’erreur classique : à la boulangère, vous dites <span className="fr">Tu as du pain ?</span>{" "}
          par habitude. C’est correct avec un ami, mais avec elle, cela paraît grossier. On dit{" "}
          <span className="fr">Vous avez du pain ?</span>
        </p>

        <div className="exception">
          Entre jeunes, entre collègues et dans beaucoup de moments détendus, on dit{" "}
          <span className="fr">tu</span> même sans se connaître. Si vous hésitez, commencez par{" "}
          <span className="fr">vous</span>. Si le <span className="fr">tu</span> vous convient,
          l’autre personne vous le dira (<span className="fr">On peut se tutoyer ?</span>). Ne
          commencez jamais par <span className="fr">tu</span> avec une personne âgée ou avec votre
          chef.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>¿Tú o usted? En francés, casi siempre «<span className="fr" lang="fr">vous</span>»</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Si no es un amigo, un familiar o un niño, di{" "}
            <strong lang="fr">vous</strong>. Y si hablas a varias personas, también{" "}
            <strong lang="fr">vous</strong>.
          </p>
          <p>
            En España casi todo el mundo se tutea, así que el <em>usted</em>{" "}
            se usa poco. En Francia es al revés: con un desconocido, en una
            tienda, con un profesor o con tu jefe, se dice{" "}
            <span className="fr" lang="fr">vous</span>. Además,{" "}
            <span className="fr" lang="fr">vous</span> es también el plural
            (<em>vosotros</em>): no existe una tercera palabra.
          </p>
        </div>

        <TuVousTable ui="es" />

        <p>
          El error típico: a la panadera le dices{" "}
          <span className="fr" lang="fr">Tu as du pain ?</span> por costumbre. Es
          lo correcto con un amigo, pero con ella suena grosero. Se dice{" "}
          <span className="fr" lang="fr">Vous avez du pain ?</span>
        </p>

        <div className="exception">
          Entre jóvenes, entre compañeros de trabajo y en muchos ambientes
          informales se usa <span className="fr" lang="fr">tu</span> aunque no
          os conozcáis. Si dudas, empieza con{" "}
          <span className="fr" lang="fr">vous</span>: si te conviene el{" "}
          <span className="fr" lang="fr">tu</span>, la otra persona te lo dirá
          (<span className="fr" lang="fr">On peut se tutoyer ?</span>). Nunca
          empieces tú con <span className="fr" lang="fr">tu</span> a alguien
          mayor o con autoridad.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Saluer et prendre congé</h2>

        <div className="astuce">
          <p className="astuce-hook">
            En entrant quelque part, saluez toujours : <strong>Bonjour</strong>. C’est obligatoire,
            surtout dans un magasin.
          </p>
          <p>
            Entrer dans une boulangerie ou dans un cabinet sans dire{" "}
            <span className="fr">bonjour</span> paraît impoli, même si vous êtes aimable ensuite. En
            sortant, on dit <span className="fr">merci</span> et{" "}
            <span className="fr">au revoir</span>.
          </p>
        </div>

        <GreetingsTable ui="fr" />

        <div className="attention">
          <span className="fr">bonjour</span> sert le matin et l’après-midi : il n’y a pas d’autre
          mot pour « <span lang="es">buenas tardes</span> ». Vers dix-huit heures, on passe à{" "}
          <span className="fr">bonsoir</span>. Et le soir, pour dire au revoir, on dit{" "}
          <span className="fr">bonne soirée</span>.
        </div>

        <div className="exception">
          <span className="fr">salut</span> est très familier : on ne le dit pas à un inconnu ni à
          un professeur. <span className="fr">bonne nuit</span> n’est pas une salutation : on le dit
          seulement à quelqu’un qui va dormir.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Saludar y despedirse</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Al entrar en un sitio, saluda siempre:{" "}
            <strong lang="fr">Bonjour</strong>. Es obligatorio, y más aún en una
            tienda.
          </p>
          <p>
            Entrar en una panadería o en una consulta sin decir{" "}
            <span className="fr" lang="fr">bonjour</span> se toma por una falta
            de educación, aunque después seas muy amable. Al salir, se dan las
            gracias y se dice adiós.
          </p>
        </div>

        <GreetingsTable ui="es" />

        <div className="attention">
          <span className="fr" lang="fr">bonjour</span> sirve por la mañana y
          por la tarde: no existe un «buenas tardes» aparte. Hacia las seis, se
          cambia a <span className="fr" lang="fr">bonsoir</span>. Y por la
          noche, al despedirte, se dice <span className="fr" lang="fr">bonne
          soirée</span>.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">salut</span> es muy cercano: con un
          desconocido o con un profesor no se dice.{" "}
          <span className="fr" lang="fr">bonne nuit</span> no es un saludo, solo
          se dice a quien se va a dormir.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Remercier et s’excuser</h2>

        <div className="astuce">
          <p className="astuce-hook">
            En espagnol, <em lang="es">perdón</em> fait tout. En français, il y a trois mots :{" "}
            <strong>pardon</strong>, <strong>excusez-moi</strong> et <strong>désolé</strong>.
          </p>
          <p>
            Choisissez selon la situation : un petit choc, une question à un inconnu, ou une vraie
            erreur et un vrai regret.
          </p>
        </div>

        <ThanksTable ui="fr" />

        <div className="exception">
          <span className="fr">désolé</span> s’accorde : une femme écrit{" "}
          <span className="fr">désolée</span>. Et avec « <span className="fr">vous</span> », on
          répond à <span className="fr">merci</span> par <span className="fr">je vous en prie</span>,
          plus poli que <span className="fr">de rien</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Dar las gracias y pedir perdón</h2>

        <div className="astuce">
          <p className="astuce-hook">
            En español, <em>perdón</em> lo hace todo. En francés hay tres
            palabras:{" "}
            <strong lang="fr">pardon</strong>,{" "}
            <strong lang="fr">excusez-moi</strong> y{" "}
            <strong lang="fr">désolé</strong>.
          </p>
          <p>
            Elige según lo que pasa: un pequeño choque, una pregunta a un
            desconocido, o un error del que lamentas las consecuencias.
          </p>
        </div>

        <ThanksTable ui="es" />

        <div className="exception">
          <span className="fr" lang="fr">désolé</span> concuerda con quien
          habla: una mujer escribe{" "}
          <span className="fr" lang="fr">désolée</span>. Y con «<span className="fr" lang="fr">vous</span>» se
          responde a <span className="fr" lang="fr">merci</span> con{" "}
          <span className="fr" lang="fr">je vous en prie</span>, más cortés que{" "}
          <span className="fr" lang="fr">de rien</span>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">tu</span> pour les amis, la famille et les enfants ;{" "}
            <span className="fr">vous</span> pour les inconnus, les magasins, les professeurs et
            plusieurs personnes.
          </li>
          <li>
            Si vous hésitez, dites <span className="fr">vous</span> ; l’autre personne propose le{" "}
            <span className="fr">tu</span>.
          </li>
          <li>
            En entrant, <span className="fr">bonjour</span> ; le soir, <span className="fr">bonsoir</span>.
            En sortant, <span className="fr">au revoir</span> et{" "}
            <span className="fr">bonne journée</span>.
          </li>
          <li>
            Dites <span className="fr">salut</span> seulement si vous dites <span className="fr">tu</span>.
          </li>
          <li>
            On répond à <span className="fr">merci</span> par <span className="fr">de rien</span> ;{" "}
            <span className="fr">pardon</span>, <span className="fr">excusez-moi</span> et{" "}
            <span className="fr">désolé(e)</span> ne sont pas la même chose.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">tu</span> para amigos, familia y
            niños; <span className="fr" lang="fr">vous</span> para desconocidos,
            tiendas, profesores y para varias personas.
          </li>
          <li>
            Si dudas, di <span className="fr" lang="fr">vous</span>; el{" "}
            <span className="fr" lang="fr">tu</span> lo propone el otro.
          </li>
          <li>
            Al entrar, <span className="fr" lang="fr">bonjour</span>; de noche,{" "}
            <span className="fr" lang="fr">bonsoir</span>. Al salir,{" "}
            <span className="fr" lang="fr">au revoir</span> y{" "}
            <span className="fr" lang="fr">bonne journée</span>.
          </li>
          <li>
            <span className="fr" lang="fr">salut</span> solo con quien tuteas.
          </li>
          <li>
            <span className="fr" lang="fr">merci</span> se responde{" "}
            <span className="fr" lang="fr">de rien</span>;{" "}
            <span className="fr" lang="fr">pardon</span>,{" "}
            <span className="fr" lang="fr">excusez-moi</span> y{" "}
            <span className="fr" lang="fr">désolé(e)</span> no son lo mismo.
          </li>
        </ul>
      </div>
    </article>
  );
}
