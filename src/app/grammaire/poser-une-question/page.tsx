import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/poser-une-question";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the A1 Spanish gloss are written once, below, and shared. */

type Lang = "fr" | "es";

const NB = " ";

const WAYS: { head: (lang: Lang) => ReactNode; how: (lang: Lang) => ReactNode; example: string }[] = [
  {
    head: (lang) => (lang === "fr" ? "l’intonation" : "la entonación"),
    how: (lang) =>
      lang === "fr"
        ? "la phrase normale, avec la voix qui monte à la fin"
        : "la frase normal, con la voz que sube al final",
    example: `Tu parles français${NB}?`,
  },
  {
    head: () => <span className="fr" lang="fr">est-ce que</span>,
    how: (lang) => (
      <>
        <span className="fr" lang="fr">est-ce que</span>{" "}
        {lang === "fr" ? "+ la phrase normale" : "+ la frase normal"}
      </>
    ),
    example: `Est-ce que tu parles français${NB}?`,
  },
  {
    head: (lang) => (lang === "fr" ? "l’inversion" : "la inversión"),
    how: (lang) =>
      lang === "fr"
        ? "le verbe passe avant le sujet : formel, pour plus tard"
        : "el verbo va antes del sujeto: formal, para más adelante",
    example: `Parles-tu français${NB}?`,
  },
];

const WORDS = [
  { word: "qui", gloss: "quién", example: `Tu parles à qui${NB}?`, answer: "À ma sœur." },
  { word: "où", gloss: "dónde", example: `Où est-ce que tu habites${NB}?`, answer: "À Madrid." },
  { word: "quand", gloss: "cuándo", example: `Tu pars quand${NB}?`, answer: "Demain." },
  { word: "comment", gloss: "cómo", example: `Comment tu t’appelles${NB}?`, answer: "Je m’appelle Lucas." },
  { word: "combien", gloss: "cuánto", example: `Ça coûte combien${NB}?`, answer: "Dix euros." },
  { word: "pourquoi", gloss: "por qué", example: `Pourquoi tu pars${NB}?`, answer: "Parce que je travaille." },
  { word: "qu’est-ce que", gloss: "qué", example: `Qu’est-ce que tu manges${NB}?`, answer: "Une pomme." },
];

const QUELS = [
  {
    form: "quel",
    noun: { fr: "masculin, un seul", es: "masculino, uno" },
    example: `Tu as quel âge${NB}?`,
    gloss: "¿Qué edad tienes?",
  },
  {
    form: "quelle",
    noun: { fr: "féminin, une seule", es: "femenino, una" },
    example: `Quelle heure est-il${NB}?`,
    gloss: "¿Qué hora es?",
  },
  {
    form: "quels",
    noun: { fr: "masculin, plusieurs", es: "masculino, varios" },
    example: `Tu aimes quels films${NB}?`,
    gloss: "¿Qué películas te gustan?",
  },
  {
    form: "quelles",
    noun: { fr: "féminin, plusieurs", es: "femenino, varias" },
    example: `Quelles langues tu parles${NB}?`,
    gloss: "¿Qué idiomas hablas?",
  },
];

function WaysTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les trois formes de la question « oui ou non »"
            : "Las tres formas de preguntar «sí o no»"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Forme" : "Forma"}</th>
            <th scope="col">{fr ? "Comment on fait" : "Cómo se hace"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {WAYS.map((row, i) => (
            <tr key={i}>
              <th scope="row">{row.head(lang)}</th>
              <td>{row.how(lang)}</td>
              <td className="fr" lang="fr">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WordsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? "Les mots interrogatifs les plus utiles" : "Las palabras interrogativas más útiles"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Mot" : "Palabra"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "Réponse" : "Respuesta"}</th>
          </tr>
        </thead>
        <tbody>
          {WORDS.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">{row.word}</th>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
              <td className="fr" lang="fr">{row.example}</td>
              <td className="fr" lang="fr">{row.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuelTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? "« " : "«"}
          <span className="fr" lang="fr">Quel</span>
          {fr ? " » s’accorde avec le nom suivant" : "» concuerda con el nombre que sigue"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Forme" : "Forma"}</th>
            <th scope="col">{fr ? "Le nom est" : "El nombre es"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {QUELS.map((row) => (
            <tr key={row.form}>
              <th scope="row" className="fr" lang="fr">{row.form}</th>
              <td>{row.noun[lang]}</td>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
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
        <h2>Poser une question « oui ou non » : trois formes</h2>

        <div className="rule">
          Pour une question avec « oui » ou « non », il y a trois façons. La
          plus facile : vous dites la phrase normale et{" "}
          <strong>vous montez la voix à la fin</strong>. La deuxième : vous
          mettez <strong>est-ce que</strong> au début, et le reste ne change
          pas. La troisième existe, mais elle est pour plus tard.
        </div>

        <WaysTable lang="fr" />

        <p>
          Avec les deux premières, la réponse est <span className="fr">oui</span>{" "}
          ou <span className="fr">non</span>. Si le sujet commence par une
          voyelle, <span className="fr">que</span> s’unit à lui avec une
          apostrophe :{" "}
          <span className="fr">Est-ce qu’elle habite ici&nbsp;?</span>
        </p>

        <div className="attention">
          En espagnol, on reconnaît une question aux signes <em>¿ ?</em>. En
          français, <strong>on n’écrit pas le signe d’ouverture</strong>, et{" "}
          <strong>il y a un espace avant le signe de fermeture</strong> :{" "}
          <span className="fr">Tu parles français&nbsp;?</span>, pas{" "}
          <s className="fr">¿Tu parles français?</s>. Cet espace ne se coupe
          pas en fin de ligne.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Preguntar «sí o no»: tres formas</h2>

        <div className="rule">
          Para una pregunta con respuesta «sí» o «no», tienes tres maneras.
          La más fácil: dices la frase normal y{" "}
          <strong>subes la voz al final</strong>. La segunda: pones{" "}
          <strong lang="fr">est-ce que</strong> al principio y el resto no
          cambia. La tercera existe, pero es para más adelante.
        </div>

        <WaysTable lang="es" />

        <p>
          Con las dos primeras, la respuesta es{" "}
          <span className="fr" lang="fr">oui</span> o{" "}
          <span className="fr" lang="fr">non</span>. Si el sujeto empieza por
          vocal, <span className="fr" lang="fr">que</span> se une a él con
          apóstrofo:{" "}
          <span className="fr" lang="fr">Est-ce qu’elle habite ici&nbsp;?</span>
        </p>

        <div className="attention">
          En español, una pregunta se reconoce por los signos{" "}
          <em>¿ ?</em>. En francés{" "}
          <strong>no se escribe el signo de apertura</strong>, y{" "}
          <strong>hay un espacio antes del signo de cierre</strong>:{" "}
          <span className="fr" lang="fr">Tu parles français&nbsp;?</span>, no{" "}
          <s className="fr" lang="fr">¿Tu parles français?</s>. Ese
          espacio es el que no se puede partir al cambiar de línea.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour poser une question</h2>

        <div className="rule">
          Pour poser une question précise, on utilise un mot interrogatif. Il y
          a trois façons. À l’oral, il va <strong>à la fin</strong> :{" "}
          <span className="fr">Tu habites où&nbsp;?</span> Dans une phrase plus
          soignée, il va <strong>au début</strong>, avec{" "}
          <span className="fr">est-ce que</span> :{" "}
          <span className="fr">Où est-ce que tu habites&nbsp;?</span> À l’oral,
          on le met aussi très souvent <strong>au début sans</strong>{" "}
          <span className="fr">est-ce que</span> :{" "}
          <span className="fr">Où tu habites&nbsp;?</span>
        </div>

        <WordsTable lang="fr" />

        <p>
          En espagnol, <em lang="es">quién</em>, <em lang="es">dónde</em>,{" "}
          <em lang="es">cuándo</em>, <em lang="es">cómo</em> et{" "}
          <em lang="es">cuánto</em> ont un accent. En français,{" "}
          <strong>aucun mot ne porte d’accent pour poser une question</strong> :
          on écrit <span className="fr">qui</span>,{" "}
          <span className="fr">quand</span>, <span className="fr">comment</span>.
          Seul <span className="fr">où</span> a un accent, et il l’a toujours,
          même quand on ne pose pas de question.
        </p>

        <p>
          <span className="fr">pourquoi</span> pose la question et{" "}
          <span className="fr">parce que</span> répond. Ce sont deux mots
          différents, comme <span lang="es">« por qué »</span> et{" "}
          <span lang="es">« porque »</span> :{" "}
          <span className="fr">
            Pourquoi tu étudies le français&nbsp;? – Parce que j’aime ça.
          </span>
        </p>

        <div className="attention">
          <span className="fr">qu’est-ce que</span> est le{" "}
          <span lang="es">« qué »</span> d’une question sur une chose, et il va
          toujours au début :{" "}
          <span className="fr">Qu’est-ce que tu fais&nbsp;?</span>{" "}
          (<span lang="es">¿qué haces?</span>).{" "}
          <s className="fr">Tu fais qu’est-ce que&nbsp;?</s> n’existe pas. À la
          fin de la phrase, <span lang="es">« qué »</span> se dit{" "}
          <span className="fr">quoi</span> :{" "}
          <span className="fr">Tu fais quoi&nbsp;?</span>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para preguntar</h2>

        <div className="rule">
          Para preguntar por algo concreto usas una palabra interrogativa. Hay
          tres maneras. En la conversación va{" "}
          <strong>al final</strong>:{" "}
          <span className="fr" lang="fr">Tu habites où&nbsp;?</span> En una
          frase más cuidada va <strong>al principio</strong>, seguida de{" "}
          <span className="fr" lang="fr">est-ce que</span>:{" "}
          <span className="fr" lang="fr">Où est-ce que tu habites&nbsp;?</span>{" "}
          Al hablar también es muy corriente ponerla{" "}
          <strong>al principio sin</strong>{" "}
          <span className="fr" lang="fr">est-ce que</span>:{" "}
          <span className="fr" lang="fr">Où tu habites&nbsp;?</span>
        </div>

        <WordsTable lang="es" />

        <p>
          En español, <em>quién</em>, <em>dónde</em>, <em>cuándo</em>,{" "}
          <em>cómo</em> y <em>cuánto</em> llevan tilde. En francés{" "}
          <strong>ninguna palabra lleva acento para preguntar</strong>: se
          escribe <span className="fr" lang="fr">qui</span>,{" "}
          <span className="fr" lang="fr">quand</span>,{" "}
          <span className="fr" lang="fr">comment</span>. Solo{" "}
          <span className="fr" lang="fr">où</span> lleva un acento, y lo lleva
          siempre, también cuando no preguntas.
        </p>

        <p>
          <span className="fr" lang="fr">pourquoi</span> pregunta y{" "}
          <span className="fr" lang="fr">parce que</span> responde. Son dos
          palabras distintas, como «por qué» y «porque»:{" "}
          <span className="fr" lang="fr">
            Pourquoi tu étudies le français&nbsp;? – Parce que j’aime ça.
          </span>
        </p>

        <div className="attention">
          <span className="fr" lang="fr">qu’est-ce que</span> es el «qué» de
          una pregunta sobre una cosa, y va siempre al principio:{" "}
          <span className="fr" lang="fr">Qu’est-ce que tu fais&nbsp;?</span>{" "}
          (¿qué haces?). No existe{" "}
          <s className="fr" lang="fr">Tu fais qu’est-ce que&nbsp;?</s>.
          Al final de la frase, «qué» se dice{" "}
          <span className="fr" lang="fr">quoi</span>:{" "}
          <span className="fr" lang="fr">Tu fais quoi&nbsp;?</span>
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          « Qué » devant un nom : <span className="fr">quel</span>
        </h2>

        <div className="rule">
          Quand <span lang="es">« qué »</span> est devant un nom, le français
          dit <strong>quel</strong>, pas <span className="fr">que</span>. Il
          s’accorde avec le nom, comme un adjectif :{" "}
          <span className="fr">quel</span>, <span className="fr">quelle</span>,{" "}
          <span className="fr">quels</span>, <span className="fr">quelles</span>.
        </div>

        <QuelTable lang="fr" />

        <p>
          À l’oral, les quatre formes se disent pareil : on les distingue
          seulement à l’écrit (sauf devant une voyelle, à cause de la liaison :{" "}
          <span className="fr">quels‿amis</span>). On l’emploie aussi avec le
          verbe <span lang="es">« ser »</span> pour dire{" "}
          <span lang="es">« cuál »</span> :{" "}
          <span className="fr">Quelle est ton adresse&nbsp;?</span>{" "}
          (<span lang="es">¿cuál es tu dirección?</span>).
        </p>

        <div className="attention">
          En espagnol, on dit <span lang="es">« ¿qué hora es? »</span>. En
          français, <s className="fr">Que heure est-il&nbsp;?</s> n’existe pas :
          on dit <span className="fr">Quelle heure est-il&nbsp;?</span>, parce
          que <span lang="es">« hora »</span> se dit{" "}
          <span className="fr">heure</span>, un nom féminin. La phrase{" "}
          <span className="fr">Quelle heure est-il&nbsp;?</span> utilise
          l’inversion de la première section, mais c’est une formule fixe :
          apprenez-la telle quelle.
        </div>

        <div className="exception">
          <span className="fr">quel</span> va toujours avec un nom (
          <span className="fr">quel âge</span>,{" "}
          <span className="fr">quelle heure</span>). Sans nom, pour une question
          sur une chose, on utilise <span className="fr">qu’est-ce que</span> ou{" "}
          <span className="fr">quoi</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          «Qué» delante de un nombre:{" "}
          <span className="fr" lang="fr">quel</span>
        </h2>

        <div className="rule">
          Cuando «qué» va delante de un nombre, en francés se dice{" "}
          <strong lang="fr">quel</strong>, no{" "}
          <span className="fr" lang="fr">que</span>. Concuerda con el nombre,
          como un adjetivo: <span className="fr" lang="fr">quel</span>,{" "}
          <span className="fr" lang="fr">quelle</span>,{" "}
          <span className="fr" lang="fr">quels</span>,{" "}
          <span className="fr" lang="fr">quelles</span>.
        </div>

        <QuelTable lang="es" />

        <p>
          Al hablar, las cuatro formas suenan igual: se distinguen solo al
          escribir (salvo delante de vocal, por la liaison:{" "}
          <span className="fr" lang="fr">quels‿amis</span>). También sirve cuando el verbo es «ser» y quieres decir
          «cuál»:{" "}
          <span className="fr" lang="fr">Quelle est ton adresse&nbsp;?</span>{" "}
          (¿cuál es tu dirección?).
        </p>

        <div className="attention">
          En español dices «¿qué hora es?». En francés{" "}
          <s className="fr" lang="fr">Que heure est-il&nbsp;?</s> no
          existe: se dice{" "}
          <span className="fr" lang="fr">Quelle heure est-il&nbsp;?</span>,
          porque «hora» es <span className="fr" lang="fr">heure</span>, un
          nombre femenino. La frase{" "}
          <span className="fr" lang="fr">Quelle heure est-il&nbsp;?</span> usa
          la inversión de la primera sección, pero es una fórmula fija: apréndela
          tal cual.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">quel</span> va siempre con un nombre
          (<span className="fr" lang="fr">quel âge</span>,{" "}
          <span className="fr" lang="fr">quelle heure</span>). Sin nombre, para
          preguntar por una cosa, se usa{" "}
          <span className="fr" lang="fr">qu’est-ce que</span> o{" "}
          <span className="fr" lang="fr">quoi</span>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Une question « oui ou non » se fait avec la voix qui monte (
            <span className="fr">Tu parles français&nbsp;?</span>) ou avec{" "}
            <span className="fr">est-ce que</span> au début. L’inversion
            existe, mais elle est formelle.
          </li>
          <li>
            En français, il n’y a pas de <em>¿</em> d’ouverture, et il y a un
            espace avant <em>?</em>.
          </li>
          <li>
            <span className="fr">qui</span>, <span className="fr">où</span>,{" "}
            <span className="fr">quand</span>, <span className="fr">comment</span>{" "}
            et <span className="fr">combien</span> vont à la fin à l’oral, ou au
            début (avec ou sans <span className="fr">est-ce que</span>) ;{" "}
            <span className="fr">pourquoi</span> va au début. Seul{" "}
            <span className="fr">où</span> porte un accent.
          </li>
          <li>
            <span className="fr">pourquoi</span> pose la question et{" "}
            <span className="fr">parce que</span> répond.
          </li>
          <li>
            <span lang="es">« Qué »</span> + nom, c’est{" "}
            <span className="fr">quel</span>, <span className="fr">quelle</span>,{" "}
            <span className="fr">quels</span> ou{" "}
            <span className="fr">quelles</span>, selon le nom ; ils se disent
            pareil.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Una pregunta «sí o no» se hace con la voz que sube (
            <span className="fr" lang="fr">Tu parles français&nbsp;?</span>) o
            con <span className="fr" lang="fr">est-ce que</span> al principio.
            La inversión existe, pero es formal.
          </li>
          <li>
            En francés no hay <em>¿</em> de apertura, y antes de{" "}
            <em>?</em> va un espacio.
          </li>
          <li>
            <span className="fr" lang="fr">qui</span>,{" "}
            <span className="fr" lang="fr">où</span>,{" "}
            <span className="fr" lang="fr">quand</span>,{" "}
            <span className="fr" lang="fr">comment</span> y{" "}
            <span className="fr" lang="fr">combien</span> van al final al
            hablar, o al principio (con o sin{" "}
            <span className="fr" lang="fr">est-ce que</span>);{" "}
            <span className="fr" lang="fr">pourquoi</span> va al principio.
            Solo <span className="fr" lang="fr">où</span> lleva acento.
          </li>
          <li>
            <span className="fr" lang="fr">pourquoi</span> pregunta y{" "}
            <span className="fr" lang="fr">parce que</span> responde.
          </li>
          <li>
            «Qué» + nombre es{" "}
            <span className="fr" lang="fr">quel</span>,{" "}
            <span className="fr" lang="fr">quelle</span>,{" "}
            <span className="fr" lang="fr">quels</span> o{" "}
            <span className="fr" lang="fr">quelles</span>, según el nombre;
            suenan igual.
          </li>
        </ul>
      </div>
    </article>
  );
}
