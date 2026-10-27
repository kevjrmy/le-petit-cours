import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/la-negation";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The French taught is written once, below, and shared. */

type Lang = "fr" | "es";

function Frame() {
  return (
    <div className="example" lang="fr">
      Je parle. → Je <strong>ne</strong> parle <strong>pas</strong>.
      <br />
      Elle travaille le dimanche. → Elle <strong>ne</strong> travaille{" "}
      <strong>pas</strong> le dimanche.
      <br />
      Ils sont français. → Ils <strong>ne</strong> sont <strong>pas</strong>{" "}
      français.
    </div>
  );
}

function Elision() {
  return (
    <div className="example" lang="fr">
      Je <strong>n’</strong>aime pas le café. · Il <strong>n’</strong>habite
      pas ici. · On <strong>n’</strong>a pas le temps.
    </div>
  );
}

function Swap() {
  return (
    <div className="example" lang="fr">
      J’ai <strong>du</strong> pain. → Je n’ai plus <strong>de</strong> pain.
      <br />
      Je bois <strong>du</strong> café. → Je ne bois jamais <strong>de</strong>{" "}
      café.
    </div>
  );
}

const ARTICLES = [
  ["J’ai un vélo.", "Je n’ai pas de vélo."],
  ["Elle a une voiture.", "Elle n’a pas de voiture."],
  ["Nous avons des enfants.", "Nous n’avons pas d’enfants."],
  ["Il boit du thé.", "Il ne boit pas de thé."],
];

const NEGATIONS = [
  { form: "ne … plus", sense: { fr: "c’était vrai avant, c’est fini", es: "era verdad antes, ya se acabó" }, example: "Je ne fume plus." },
  { form: "ne … jamais", sense: { fr: "zéro fois, aucune fois", es: "cero veces, ninguna vez" }, example: "Il ne ment jamais." },
  { form: "ne … rien", sense: { fr: "aucune chose", es: "ninguna cosa" }, example: "Elle ne voit rien." },
  { form: "ne … personne", sense: { fr: "aucune personne", es: "ninguna persona" }, example: "Nous ne connaissons personne." },
];

function ArticlesTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? {
          caption: "Ce que l’article devient quand la phrase passe au négatif",
          cols: ["Phrase affirmative", "Phrase négative"],
        }
      : {
          caption: "Lo que pasa con el artículo cuando la frase se vuelve negativa",
          cols: ["Frase afirmativa", "Frase negativa"],
        };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <thead>
          <tr>
            {t.cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ARTICLES.map(([yes, no]) => (
            <tr key={yes}>
              <th scope="row" className="fr" lang="fr">
                {yes}
              </th>
              <td className="fr" lang="fr">
                {no}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NegationsTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? {
          caption: "Les quatre négations qui remplacent « pas », et ce qu’elles disent de plus",
          cols: ["Négation", "Sens", "Exemple"],
        }
      : {
          caption: (
            <>
              Las cuatro negaciones que sustituyen a «<span lang="fr">pas</span>», y lo que dicen de más
            </>
          ),
          cols: ["Negación", "Sentido", "Ejemplo"],
        };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <thead>
          <tr>
            {t.cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {NEGATIONS.map((row) => (
            <tr key={row.form}>
              <th scope="row" className="fr" lang="fr">
                {row.form}
              </th>
              <td>{row.sense[lang]}</td>
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
        <h2>Deux mots autour du verbe</h2>

        <div className="rule">
          La négation française s’écrit en <strong>deux morceaux</strong>.{" "}
          <span className="fr">ne</span> se met avant le verbe conjugué,{" "}
          <span className="fr">pas</span> se met après. Le verbe est pris entre
          les deux.
        </div>

        <Frame />

        <p>
          Devant une voyelle ou un <span className="fr">h</span> muet,{" "}
          <span className="fr">ne</span> devient{" "}
          <span className="fr">n’</span>.
        </p>

        <Elision />

        <div className="attention">
          Au passé composé, les deux morceaux encadrent{" "}
          <strong>l’auxiliaire</strong>, pas le participe :{" "}
          <span className="fr">je n’ai pas mangé</span>,{" "}
          <span className="fr">elle n’est pas venue</span>. Le participe reste
          en dehors, après <span className="fr">pas</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            À l’oral, le <span className="fr">ne</span> disparaît. À l’écrit,
            jamais.
          </p>
          <p>
            On entend tous les jours{" "}
            <span className="fr">je sais pas</span>,{" "}
            <span className="fr">c’est pas grave</span>. C’est du français
            courant et vous pouvez le dire. Mais une phrase écrite sans{" "}
            <span className="fr">ne</span> est une phrase fausse : dans une
            lettre, un message professionnel ou un examen, les deux morceaux
            sont obligatoires.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Dos palabras alrededor del verbo</h2>

        <div className="rule">
          La negación francesa se escribe en <strong>dos trozos</strong>.{" "}
          <span className="fr" lang="fr">ne</span> va antes del verbo conjugado,{" "}
          <span className="fr" lang="fr">pas</span> va después. El verbo queda
          entre los dos.
        </div>

        <Frame />

        <p>
          Delante de vocal o de <span className="fr" lang="fr">h</span> muda,{" "}
          <span className="fr" lang="fr">ne</span> se convierte en{" "}
          <span className="fr" lang="fr">n’</span>.
        </p>

        <Elision />

        <div className="attention">
          En el <span className="fr" lang="fr">passé composé</span>, los dos
          trozos rodean <strong>al auxiliar</strong>, no al participio:{" "}
          <span className="fr" lang="fr">je n’ai pas mangé</span>,{" "}
          <span className="fr" lang="fr">elle n’est pas venue</span>. El
          participio se queda fuera, después de{" "}
          <span className="fr" lang="fr">pas</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Al hablar, el <span className="fr" lang="fr">ne</span> desaparece. Al
            escribir, nunca.
          </p>
          <p>
            Todos los días se oye{" "}
            <span className="fr" lang="fr">je sais pas</span>,{" "}
            <span className="fr" lang="fr">c’est pas grave</span>. Es francés
            corriente y puedes decirlo. Pero una frase escrita sin{" "}
            <span className="fr" lang="fr">ne</span> es una frase incorrecta: en
            una carta, un mensaje profesional o un examen, los dos trozos son
            obligatorios.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Après la négation, l’article change</h2>

        <div className="rule">
          <span className="fr">un</span>, <span className="fr">une</span>,{" "}
          <span className="fr">des</span>, <span className="fr">du</span>,{" "}
          <span className="fr">de la</span>, <span className="fr">de l’</span>{" "}
          deviennent{" "}
          <strong>
            <span className="fr">de</span>
          </strong>{" "}
          après une négation, quel que soit le genre et le nombre du nom.
        </div>

        <ArticlesTable lang="fr" />

        <p>
          Devant une voyelle, <span className="fr">de</span> s’élide à son tour
          et donne <span className="fr">d’</span> :{" "}
          <span className="fr">il n’y a pas d’eau dans le verre</span>.
        </p>

        <div className="exception">
          L’article défini ne bouge pas.{" "}
          <span className="fr">le</span>, <span className="fr">la</span>,{" "}
          <span className="fr">les</span> restent tels quels :{" "}
          <span className="fr">je n’aime pas le café</span>, jamais{" "}
          <s className="fr">je n’aime pas de café</s>. Et après le verbe{" "}
          <span className="fr">être</span>, rien ne change non plus :{" "}
          <span className="fr">ce n’est pas un problème</span>. Les deux
          exceptions tiennent sur une ligne dans{" "}
          <Link href="/astuces/pas-de">pas de ou pas un ?</Link>, et les
          articles eux-mêmes sont dans{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Después de la negación, el artículo cambia</h2>

        <div className="rule">
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">des</span>,{" "}
          <span className="fr" lang="fr">du</span>,{" "}
          <span className="fr" lang="fr">de la</span>,{" "}
          <span className="fr" lang="fr">de l’</span> se convierten en{" "}
          <strong>
            <span className="fr" lang="fr">de</span>
          </strong>{" "}
          después de una negación, sea cual sea el género y el número del
          nombre.
        </div>

        <ArticlesTable lang="es" />

        <p>
          Delante de vocal, <span className="fr" lang="fr">de</span> se elide a
          su vez y da <span className="fr" lang="fr">d’</span>:{" "}
          <span className="fr" lang="fr">il n’y a pas d’eau dans le verre</span>.
        </p>

        <div className="exception">
          El artículo definido no se mueve.{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">la</span>,{" "}
          <span className="fr" lang="fr">les</span> se quedan como están:{" "}
          <span className="fr" lang="fr">je n’aime pas le café</span>, nunca{" "}
          <s className="fr" lang="fr">je n’aime pas de café</s>. Y después del
          verbo <span className="fr" lang="fr">être</span> tampoco cambia nada:{" "}
          <span className="fr" lang="fr">ce n’est pas un problème</span>. Las
          dos excepciones caben en una línea en{" "}
          <Link href="/astuces/pas-de">pas de ou pas un ?</Link>, y los
          artículos en sí están en{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>
      </section>

      <section data-ui="fr">
        <h2>Quand « pas » cède sa place</h2>

        <p>
          <span className="fr">ne</span> reste toujours devant le verbe, mais le
          deuxième morceau peut changer pour préciser le sens de la négation.
        </p>

        <NegationsTable lang="fr" />

        <p>
          <span className="fr">plus</span> et{" "}
          <span className="fr">jamais</span> gardent la règle de la section
          précédente : l’article devient <span className="fr">de</span>{" "}
          derrière eux exactement comme derrière{" "}
          <span className="fr">pas</span>.
        </p>

        <Swap />

        <p>
          Avec <span className="fr">rien</span> et{" "}
          <span className="fr">personne</span>, la question ne se pose pas :
          ils prennent la place du nom au lieu de se mettre devant lui. Il n’y
          a rien derrière eux, donc pas d’article à changer.
        </p>

        <div className="attention">
          Ces mots remplacent <span className="fr">pas</span>, ils ne
          s’ajoutent pas à lui. On dit{" "}
          <span className="fr">je ne fume plus</span>, jamais{" "}
          <s className="fr">je ne fume pas plus</s>.
        </div>

        <div className="exception">
          Au passé composé, <span className="fr">personne</span> se place après
          le participe, alors que les trois autres restent devant :{" "}
          <span className="fr">je n’ai rien vu</span> mais{" "}
          <span className="fr">je n’ai vu personne</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Cuando «<span className="fr" lang="fr">pas</span>» cede su sitio
        </h2>

        <p>
          <span className="fr" lang="fr">ne</span> va siempre delante del verbo,
          pero el segundo trozo puede cambiar para precisar el sentido de la
          negación.
        </p>

        <NegationsTable lang="es" />

        <p>
          <span className="fr" lang="fr">plus</span> y{" "}
          <span className="fr" lang="fr">jamais</span> mantienen la regla de la
          sección anterior: el artículo se convierte en{" "}
          <span className="fr" lang="fr">de</span> detrás de ellos exactamente
          igual que detrás de <span className="fr" lang="fr">pas</span>.
        </p>

        <Swap />

        <p>
          Con <span className="fr" lang="fr">rien</span> y{" "}
          <span className="fr" lang="fr">personne</span> no hay duda: ocupan el
          lugar del nombre en vez de ir delante de él. No hay nada detrás de
          ellos, así que no hay artículo que cambiar.
        </p>

        <div className="attention">
          Estas palabras sustituyen a <span className="fr" lang="fr">pas</span>,
          no se suman a él. Se dice{" "}
          <span className="fr" lang="fr">je ne fume plus</span>, nunca{" "}
          <s className="fr" lang="fr">je ne fume pas plus</s>.
        </div>

        <div className="exception">
          En el <span className="fr" lang="fr">passé composé</span>,{" "}
          <span className="fr" lang="fr">personne</span> va después del
          participio, mientras que las otras tres van delante:{" "}
          <span className="fr" lang="fr">je n’ai rien vu</span> pero{" "}
          <span className="fr" lang="fr">je n’ai vu personne</span>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">ne</span> avant le verbe conjugué,{" "}
            <span className="fr">pas</span> après : le verbe est entre les deux.
          </li>
          <li>
            Devant une voyelle, <span className="fr">ne</span> devient{" "}
            <span className="fr">n’</span>.
          </li>
          <li>
            Au passé composé, les deux morceaux encadrent l’auxiliaire ; le
            participe reste après.
          </li>
          <li>
            <span className="fr">un</span>, <span className="fr">une</span>,{" "}
            <span className="fr">des</span>, <span className="fr">du</span>,{" "}
            <span className="fr">de la</span> et{" "}
            <span className="fr">de l’</span> deviennent{" "}
            <span className="fr">de</span>, après{" "}
            <span className="fr">plus</span> et{" "}
            <span className="fr">jamais</span> comme après{" "}
            <span className="fr">pas</span>. L’article défini, lui, ne change
            pas.
          </li>
          <li>
            <span className="fr">plus</span>,{" "}
            <span className="fr">jamais</span>, <span className="fr">rien</span>
            , <span className="fr">personne</span> prennent la place de{" "}
            <span className="fr">pas</span> et ne s’ajoutent jamais à lui.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">ne</span> antes del verbo conjugado,{" "}
            <span className="fr" lang="fr">pas</span> después: el verbo queda
            entre los dos.
          </li>
          <li>
            Delante de vocal, <span className="fr" lang="fr">ne</span> se
            convierte en <span className="fr" lang="fr">n’</span>.
          </li>
          <li>
            En el <span className="fr" lang="fr">passé composé</span>, los dos
            trozos rodean al auxiliar; el participio queda después.
          </li>
          <li>
            <span className="fr" lang="fr">un</span>,{" "}
            <span className="fr" lang="fr">une</span>,{" "}
            <span className="fr" lang="fr">des</span>,{" "}
            <span className="fr" lang="fr">du</span>,{" "}
            <span className="fr" lang="fr">de la</span> y{" "}
            <span className="fr" lang="fr">de l’</span> se convierten en{" "}
            <span className="fr" lang="fr">de</span>, después de{" "}
            <span className="fr" lang="fr">plus</span> y{" "}
            <span className="fr" lang="fr">jamais</span> como después de{" "}
            <span className="fr" lang="fr">pas</span>. El artículo definido, en
            cambio, no cambia.
          </li>
          <li>
            <span className="fr" lang="fr">plus</span>,{" "}
            <span className="fr" lang="fr">jamais</span>,{" "}
            <span className="fr" lang="fr">rien</span>,{" "}
            <span className="fr" lang="fr">personne</span> ocupan el lugar de{" "}
            <span className="fr" lang="fr">pas</span> y nunca se suman a él.
          </li>
        </ul>
      </div>
    </article>
  );
}
