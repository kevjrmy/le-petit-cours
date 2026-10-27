import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-determinants-demonstratifs";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The French taught is written once, below, and shared. */

type Lang = "fr" | "es";

const FORMS = [
  { noun: { fr: "masculin, devant une consonne", es: "masculino, delante de consonante" }, form: "ce", example: "Ce train part à huit heures." },
  {
    noun: { fr: "masculin, devant une voyelle ou un h muet", es: "masculino, delante de vocal o de h muda" },
    form: "cet",
    example: "Cet homme attend depuis une heure.",
  },
  { noun: { fr: "féminin", es: "femenino" }, form: "cette", example: "Cette rue monte beaucoup." },
  { noun: { fr: "pluriel, masculin ou féminin", es: "plural, masculino o femenino" }, form: "ces", example: "Ces photos sont anciennes." },
];

const TIMES = [
  {
    expression: "ce matin",
    moment: { fr: "le matin d’aujourd’hui", es: "la mañana de hoy" },
    example: "Ce matin, j’ai raté le bus.",
  },
  {
    expression: "ce soir",
    moment: { fr: "le soir d’aujourd’hui", es: "la noche de hoy" },
    example: "Ce soir, on mange dehors.",
  },
  {
    expression: "cette semaine",
    moment: { fr: "la semaine où l’on est", es: "la semana en que estamos" },
    example: "Cette semaine, je travaille beaucoup.",
  },
  {
    expression: "cette année",
    moment: { fr: "l’année où l’on est", es: "el año en que estamos" },
    example: "Cette année, elle apprend le français.",
  },
];

function NearFar() {
  return (
    <div className="example" lang="fr">
      Je prends <strong>ce pull-ci</strong>, pas <strong>ce pull-là</strong>.
      <br />
      <strong>Cette place-ci</strong> est libre,{" "}
      <strong>cette place-là</strong> est réservée.
    </div>
  );
}

function Story() {
  return (
    <div className="example" lang="fr">
      <strong>Ce jour-là</strong>, il pleuvait et personne n’est venu.
      <br />
      Nous habitions à Séville : <strong>cette année-là</strong>, nous
      n’avions pas de voiture.
    </div>
  );
}

function Head({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr>
        {cols.map((c) => (
          <th key={c} scope="col">
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function FormsTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? { caption: "Les quatre formes, et le nom qui décide de chacune", cols: ["Le nom", "La forme", "Exemple"] }
      : { caption: "Las cuatro formas, y el nombre que decide cada una", cols: ["El nombre", "La forma", "Ejemplo"] };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <Head cols={t.cols} />
        <tbody>
          {FORMS.map((row) => (
            <tr key={row.form}>
              <th scope="row">{row.noun[lang]}</th>
              <td className="fr" lang="fr">
                {row.form}
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

function TimesTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? {
          caption: "Le moment que l’expression désigne, sans rien ajouter",
          cols: ["L’expression", "Le moment désigné", "Exemple"],
        }
      : {
          caption: "El momento que designa la expresión, sin añadir nada",
          cols: ["La expresión", "El momento designado", "Ejemplo"],
        };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <Head cols={t.cols} />
        <tbody>
          {TIMES.map((row) => (
            <tr key={row.expression}>
              <th scope="row" className="fr" lang="fr">
                {row.expression}
              </th>
              <td>{row.moment[lang]}</td>
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

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Quatre formes, décidées par le nom</h2>

        <div className="rule">
          Le déterminant démonstratif se met devant un nom pour le montrer. Il
          s’accorde en genre et en nombre avec ce nom, et il remplace l’article :
          on dit <span className="fr">le livre</span> ou{" "}
          <span className="fr">ce livre</span>, jamais les deux ensemble.
        </div>

        <FormsTable lang="fr" />

        <p>
          Une seule forme au pluriel, pour les deux genres :{" "}
          <span className="fr">ces trains</span> et{" "}
          <span className="fr">ces rues</span>. C’est au singulier que le genre
          se voit.
        </p>

        <div className="attention">
          <span className="fr">cet</span> et <span className="fr">cette</span>{" "}
          se prononcent exactement pareil. L’oreille ne sépare rien, le genre du
          nom décide seul : on écrit{" "}
          <span className="fr">cet appartement</span> parce que{" "}
          <span className="fr">appartement</span> est masculin, et{" "}
          <span className="fr">cette école</span> parce que{" "}
          <span className="fr">école</span> est féminin.{" "}
          <span className="fr">cet</span> ne se met jamais devant un nom
          féminin.
        </div>

        <div className="exception">
          Devant un <span className="fr">h</span> aspiré, le heurt entre les
          deux voyelles n’a pas lieu et la forme courte revient :{" "}
          <span className="fr">ce héros</span>,{" "}
          <span className="fr">ce hasard</span>,{" "}
          <span className="fr">ce haricot</span>. Ces mots sont peu nombreux et
          s’apprennent un par un, comme pour l’article :{" "}
          <span className="fr">le héros</span> et non{" "}
          <s className="fr">l’héros</s>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuatro formas, decididas por el nombre</h2>

        <div className="rule">
          El determinante demostrativo se pone delante de un nombre para
          señalarlo. Concuerda en género y número con ese nombre, y sustituye al
          artículo: se dice <span className="fr" lang="fr">le livre</span> o{" "}
          <span className="fr" lang="fr">ce livre</span>, nunca los dos juntos.
        </div>

        <FormsTable lang="es" />

        <p>
          Una sola forma en plural, para los dos géneros:{" "}
          <span className="fr" lang="fr">ces trains</span> y{" "}
          <span className="fr" lang="fr">ces rues</span>. El género solo se ve
          en singular.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">cet</span> y{" "}
          <span className="fr" lang="fr">cette</span> se pronuncian exactamente
          igual. El oído no distingue nada, solo decide el género del nombre: se
          escribe <span className="fr" lang="fr">cet appartement</span> porque{" "}
          <span className="fr" lang="fr">appartement</span> es masculino, y{" "}
          <span className="fr" lang="fr">cette école</span> porque{" "}
          <span className="fr" lang="fr">école</span> es femenino.{" "}
          <span className="fr" lang="fr">cet</span> no se pone nunca delante de
          un nombre femenino.
        </div>

        <div className="exception">
          Delante de una <span className="fr" lang="fr">h</span> aspirada no hay
          choque entre las dos vocales y vuelve la forma corta:{" "}
          <span className="fr" lang="fr">ce héros</span>,{" "}
          <span className="fr" lang="fr">ce hasard</span>,{" "}
          <span className="fr" lang="fr">ce haricot</span>. Estas palabras son
          pocas y se aprenden una a una, como con el artículo:{" "}
          <span className="fr" lang="fr">le héros</span> y no{" "}
          <s className="fr" lang="fr">l’héros</s>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Montrer ce qui est près, montrer ce qui est loin</h2>

        <div className="rule">
          Une seule série de formes sert pour tout ce qu’on montre, près ou
          loin. Quand il faut vraiment séparer deux choses, on ajoute{" "}
          <strong>-ci</strong> ou <strong>-là</strong> après le nom :{" "}
          <span className="fr">-ci</span> pour ce qui est près,{" "}
          <span className="fr">-là</span> pour ce qui est plus loin.
        </div>

        <NearFar />

        <p>
          En français, la distance n’est pas obligatoire : un seul mot montre, et{" "}
          <span className="fr">-ci</span> et <span className="fr">-là</span> ne
          servent qu’à opposer deux choses dans la même phrase. Dites{" "}
          <span className="fr">ce pull</span> quand il n’y en a qu’un à montrer.
        </p>

        <div className="attention">
          Le trait d’union est obligatoire, et il se place{" "}
          <strong>après le nom</strong>, pas après le déterminant. On écrit{" "}
          <span className="fr">ce livre-là</span> ; la forme{" "}
          <s className="fr">ce-là livre</s> n’existe pas.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dans la langue de tous les jours, <strong>-là</strong> sert presque
            toujours seul.
          </p>
          <p>
            <span className="fr">donne-moi ce stylo-là</span> s’entend partout,
            y compris pour un objet posé juste devant celui qui parle.{" "}
            <span className="fr">-ci</span>, lui, n’apparaît guère que dans une
            comparaison. Si vous hésitez et que vous ne comparez rien, écrivez{" "}
            <span className="fr">-là</span> ou n’écrivez rien.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Señalar lo que está cerca, señalar lo que está lejos</h2>

        <div className="rule">
          Una sola serie de formas sirve para todo lo que se señala, cerca o
          lejos. Cuando de verdad hay que separar dos cosas, se añade{" "}
          <strong lang="fr">-ci</strong> o <strong lang="fr">-là</strong> después
          del nombre: <span className="fr" lang="fr">-ci</span> para lo que está
          cerca, <span className="fr" lang="fr">-là</span> para lo que está más
          lejos.
        </div>

        <NearFar />

        <p>
          En francés la distancia no es obligatoria: una sola palabra señala, y{" "}
          <span className="fr" lang="fr">-ci</span> y{" "}
          <span className="fr" lang="fr">-là</span> solo sirven para oponer dos
          cosas en la misma frase. Di <span className="fr" lang="fr">ce pull</span>{" "}
          cuando solo hay uno que señalar.
        </p>

        <div className="attention">
          El guion es obligatorio, y se pone <strong>después del nombre</strong>,
          no después del determinante. Se escribe{" "}
          <span className="fr" lang="fr">ce livre-là</span>; la forma{" "}
          <s className="fr" lang="fr">ce-là livre</s> no existe.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            En la lengua de todos los días, <strong lang="fr">-là</strong> casi
            siempre va solo.
          </p>
          <p>
            <span className="fr" lang="fr">donne-moi ce stylo-là</span> se oye
            en todas partes, también para un objeto que está justo delante de
            quien habla. <span className="fr" lang="fr">-ci</span>, en cambio,
            casi solo aparece en una comparación. Si dudas y no comparas nada,
            escribe <span className="fr" lang="fr">-là</span> o no escribas
            nada.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Ce matin, cette semaine : le démonstratif du temps</h2>

        <div className="rule">
          Devant un nom qui dit un moment, le démonstratif désigne le moment où
          l’on parle. <span className="fr">ce matin</span>, c’est le matin
          d’aujourd’hui.
        </div>

        <TimesTable lang="fr" />

        <p>
          Pour parler d’un moment du passé ou de l’avenir déjà nommé, on
          ajoute <span className="fr">-là</span> :{" "}
          <span className="fr">ce jour-là</span>,{" "}
          <span className="fr">cette année-là</span>,{" "}
          <span className="fr">à ce moment-là</span>. C’est la forme du récit,
          et elle revient dans presque toutes les histoires racontées à
          l’imparfait et au passé composé.
        </p>

        <Story />

        <div className="attention">
          Sans <span className="fr">-là</span>, l’expression parle du présent.{" "}
          <span className="fr">ce matin</span> est le matin d’aujourd’hui,{" "}
          <span className="fr">ce matin-là</span> est un matin de l’histoire
          qu’on raconte. Le petit mot change l’époque de la phrase entière.
        </div>

        <div className="exception">
          <span className="fr">ce jour</span> ne se dit pas pour aujourd’hui.
          Pour le jour où l’on parle, le mot est{" "}
          <span className="fr">aujourd’hui</span> ;{" "}
          <span className="fr">ce jour-là</span>, avec{" "}
          <span className="fr">-là</span>, existe et désigne un autre jour.
        </div>

        <p>
          Ces formes racontent : elles vont avec les temps du passé, expliqués
          dans{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait">
            Passé composé ou imparfait ?
          </Link>
          .
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">Ce matin, cette semaine</span>: el
          demostrativo del tiempo
        </h2>

        <div className="rule">
          Delante de un nombre que dice un momento, el demostrativo señala el
          momento en que se habla. <span className="fr" lang="fr">ce matin</span>{" "}
          es la mañana de hoy.
        </div>

        <TimesTable lang="es" />

        <p>
          Para hablar de un momento del pasado o del futuro ya nombrado, se
          añade <span className="fr" lang="fr">-là</span>:{" "}
          <span className="fr" lang="fr">ce jour-là</span>,{" "}
          <span className="fr" lang="fr">cette année-là</span>,{" "}
          <span className="fr" lang="fr">à ce moment-là</span>. Es la forma del
          relato, y vuelve en casi todas las historias contadas con el
          imperfecto y el <span className="fr" lang="fr">passé composé</span>.
        </p>

        <Story />

        <div className="attention">
          Sin <span className="fr" lang="fr">-là</span>, la expresión habla del
          presente. <span className="fr" lang="fr">ce matin</span> es la mañana
          de hoy, <span className="fr" lang="fr">ce matin-là</span> es una
          mañana de la historia que se cuenta. La palabrita cambia la época de
          toda la frase.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">ce jour</span> no se dice para hoy.
          Para el día en que se habla, la palabra es{" "}
          <span className="fr" lang="fr">aujourd’hui</span>;{" "}
          <span className="fr" lang="fr">ce jour-là</span>, con{" "}
          <span className="fr" lang="fr">-là</span>, existe y designa otro día.
        </div>

        <p>
          Estas formas sirven para contar en pasado, con los tiempos explicados en{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait">
            Passé composé ou imparfait ?
          </Link>
          .
        </p>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre formes, choisies par le nom :{" "}
            <span className="fr">ce</span>, <span className="fr">cet</span>,{" "}
            <span className="fr">cette</span>, <span className="fr">ces</span>.
          </li>
          <li>
            <span className="fr">cet</span> est masculin et sert devant une
            voyelle ; <span className="fr">cette</span> est féminin. Les deux se
            prononcent pareil, et seul le genre du nom décide.
          </li>
          <li>
            Le démonstratif remplace l’article : jamais{" "}
            <span className="fr">le</span> et <span className="fr">ce</span>{" "}
            ensemble.
          </li>
          <li>
            <span className="fr">-ci</span> et <span className="fr">-là</span>{" "}
            s’ajoutent après le nom, avec un trait d’union, et seulement pour
            opposer deux choses.
          </li>
          <li>
            Devant un nom de temps, le démonstratif désigne le moment présent ;
            avec <span className="fr">-là</span>, il désigne un moment de
            l’histoire racontée.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Cuatro formas, elegidas por el nombre:{" "}
            <span className="fr" lang="fr">ce</span>,{" "}
            <span className="fr" lang="fr">cet</span>,{" "}
            <span className="fr" lang="fr">cette</span>,{" "}
            <span className="fr" lang="fr">ces</span>.
          </li>
          <li>
            <span className="fr" lang="fr">cet</span> es masculino y se usa
            delante de vocal; <span className="fr" lang="fr">cette</span> es
            femenino. Las dos se pronuncian igual, y solo decide el género del
            nombre.
          </li>
          <li>
            El demostrativo sustituye al artículo: nunca{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">ce</span> juntos.
          </li>
          <li>
            <span className="fr" lang="fr">-ci</span> y{" "}
            <span className="fr" lang="fr">-là</span> se añaden después del
            nombre, con guion, y solo para oponer dos cosas.
          </li>
          <li>
            Delante de un nombre de tiempo, el demostrativo señala el momento
            presente; con <span className="fr" lang="fr">-là</span>, señala un
            momento de la historia contada.
          </li>
        </ul>
      </div>
    </article>
  );
}
