import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/ce-qui-ce-que-ce-dont";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

const FORMS = [
  { form: "ce qui", follows: { fr: "un verbe, tout de suite", es: "un verbo, enseguida" }, example: "Je ne sais pas ce qui s’est passé." },
  { form: "ce que", follows: { fr: "un sujet, puis un verbe", es: "un sujeto, y luego un verbo" }, example: "Je ne comprends pas ce que tu dis." },
];

const VERBS = [
  ["dire", "dire quelque chose", "ce que je dis"],
  ["parler", "parler de quelque chose", "ce dont je parle"],
  ["avoir besoin", "avoir besoin de quelque chose", "ce dont j’ai besoin"],
  ["attendre", "attendre quelque chose", "ce que j’attends"],
];

function FormsTable({
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
            {heads.map((head) => (
              <th key={head} scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FORMS.map((row) => (
            <tr key={row.form}>
              <th scope="row" className="fr" lang="fr">
                {row.form}
              </th>
              <td>{row.follows[lang]}</td>
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

function VerbsTable({ caption, heads }: { caption: string; heads: [string, string, string] }) {
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
          {VERBS.map(([verb, construction, form]) => (
            <tr key={verb}>
              <th scope="row" className="fr" lang="fr">
                {verb}
              </th>
              <td className="fr" lang="fr">
                {construction}
              </td>
              <td className="fr" lang="fr">
                {form}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuiQueExamples() {
  return (
    <div className="example" lang="fr">
      Dis-moi <strong>ce qui</strong> ne va pas. · Fais <strong>ce que</strong>{" "}
      tu veux.
      <br />
      Elle a compris <strong>ce qui</strong> m’inquiétait, et{" "}
      <strong>ce que</strong> j’attendais d’elle.
    </div>
  );
}

function DontExamples() {
  return (
    <div className="example" lang="fr">
      C’est exactement <strong>ce dont</strong> j’ai besoin.
      <br />
      Je n’ai pas compris <strong>ce dont</strong> tu parles.
      <br />
      <strong>Ce dont</strong> elle se souvient le mieux, c’est le bruit de la
      mer.
    </div>
  );
}

function HighlightExamples() {
  return (
    <div className="example" lang="fr">
      <strong>Ce qui</strong> compte, <strong>c’est</strong> d’essayer.
      <br />
      <strong>Ce que</strong> je veux, <strong>c’est</strong> une réponse
      claire.
      <br />
      <strong>Ce dont</strong> j’ai peur, <strong>c’est</strong> de me tromper
      devant tout le monde.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>La chose qu’on ne nomme pas</h2>

        <div className="rule">
          Quand ce qu’on reprend n’a pas de nom, parce que c’est une idée, une
          phrase entière ou quelque chose qu’on ignore, le pronom n’est ni{" "}
          <span className="fr">celui</span> ni <span className="fr">celle</span>{" "}
          : c’est <strong>ce</strong>. Derrière lui,{" "}
          <strong>qui</strong> quand il est le sujet du verbe qui suit,{" "}
          <strong>que</strong> quand il en est le complément.
        </div>

        <FormsTable
          caption="Ce qui vient juste après décide de la forme"
          heads={["La forme", "Ce qui suit", "Exemple"]}
          lang="fr"
        />

        <p>
          Le test tient en un coup d’œil : regardez le mot juste après. Un verbe
          ? Il lui manque un sujet, et la forme est{" "}
          <span className="fr">ce qui</span>. Un sujet ? Le verbe a déjà le sien,
          et la forme est <span className="fr">ce que</span>.
        </p>

        <QuiQueExamples />

        <div className="attention">
          <span className="fr">ce que</span> s’élide devant une voyelle et
          devient <span className="fr">ce qu’</span> :{" "}
          <span className="fr">ce qu’il dit</span>,{" "}
          <span className="fr">ce qu’elle veut</span>.{" "}
          <span className="fr">ce qui</span> ne s’élide jamais : on écrit{" "}
          <span className="fr">ce qui est arrivé</span>, jamais{" "}
          <s className="fr">ce qu’est arrivé</s>. L’apostrophe est donc le
          signe qu’un sujet suit.
        </div>

        <p>
          Après <span className="fr">tout</span>, les deux formes ne changent
          pas : <span className="fr">tout ce qui brille</span>,{" "}
          <span className="fr">tout ce que je sais</span>.
        </p>

        <p>
          Quand la chose reprise a un nom, le pronom redevient{" "}
          <span className="fr">celui</span> ou <span className="fr">celle</span>
          , expliqué dans{" "}
          <Link href="/grammaire/les-pronoms-demonstratifs">
            Les pronoms démonstratifs
          </Link>
          .
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>La cosa que no se nombra</h2>

        <div className="rule">
          Cuando lo que se retoma no tiene nombre, porque es una idea, una frase
          entera o algo que se ignora, el pronombre no es ni{" "}
          <span className="fr" lang="fr">celui</span> ni{" "}
          <span className="fr" lang="fr">celle</span>: es <strong>ce</strong>.
          Detrás de él va <strong>qui</strong> cuando es el sujeto del verbo
          siguiente, y <strong>que</strong> cuando es su complemento.
        </div>

        <FormsTable
          caption="Lo que viene justo después decide la forma"
          heads={["La forma", "Lo que sigue", "Ejemplo"]}
          lang="es"
        />

        <p>
          La prueba es cuestión de un vistazo: mira la palabra que viene justo
          después. ¿Un verbo? Le falta un sujeto, y la forma es{" "}
          <span className="fr" lang="fr">ce qui</span>. ¿Un sujeto? El verbo ya
          tiene el suyo, y la forma es{" "}
          <span className="fr" lang="fr">ce que</span>.
        </p>

        <QuiQueExamples />

        <div className="attention">
          <span className="fr" lang="fr">ce que</span> se elide ante una vocal y
          se convierte en <span className="fr" lang="fr">ce qu’</span>:{" "}
          <span className="fr" lang="fr">ce qu’il dit</span>,{" "}
          <span className="fr" lang="fr">ce qu’elle veut</span>.{" "}
          <span className="fr" lang="fr">ce qui</span> no se elide nunca: se
          escribe <span className="fr" lang="fr">ce qui est arrivé</span>, nunca{" "}
          <s className="fr" lang="fr">ce qu’est arrivé</s>. El apóstrofo es,
          pues, la señal de que sigue un sujeto.
        </div>

        <p>
          Después de <span className="fr" lang="fr">tout</span>, las dos formas
          no cambian: <span className="fr" lang="fr">tout ce qui brille</span>,{" "}
          <span className="fr" lang="fr">tout ce que je sais</span>.
        </p>

        <p>
          Cuando la cosa retomada tiene nombre, el pronombre vuelve a ser{" "}
          <span className="fr" lang="fr">celui</span> o{" "}
          <span className="fr" lang="fr">celle</span>, como se explica en{" "}
          <Link href="/grammaire/les-pronoms-demonstratifs" lang="fr">
            Les pronoms démonstratifs
          </Link>
          .
        </p>
      </section>

      <section data-ui="fr">
        <h2>ce dont : quand le verbe réclame « de »</h2>

        <div className="rule">
          Certains verbes ne se construisent pas directement : on parle{" "}
          <span className="fr">de</span> quelque chose, on a besoin{" "}
          <span className="fr">de</span> quelque chose, on se souvient{" "}
          <span className="fr">de</span> quelque chose. Quand ce complément n’a
          pas de nom, la forme est <strong>ce dont</strong>.
        </div>

        <DontExamples />

        <p>
          Le choix ne dépend pas du sens de la phrase mais du verbe. Posez-vous
          la question avec le verbe seul : on dit quelque chose, donc{" "}
          <span className="fr">ce que je dis</span> ; on parle de quelque chose,
          donc <span className="fr">ce dont je parle</span>.
        </p>

        <VerbsTable
          caption="Le verbe décide, pas la chose dont on parle"
          heads={["Le verbe", "Sa construction", "La forme"]}
        />

        <div className="exception">
          Quelques verbes réclament <span className="fr">à</span> plutôt que{" "}
          <span className="fr">de</span>, et la forme devient alors{" "}
          <span className="fr">ce à quoi</span> :{" "}
          <span className="fr">ce à quoi je pense</span>,{" "}
          <span className="fr">ce à quoi il s’attendait</span>. Elle est rare et
          se retient avec les deux verbes qui la demandent,{" "}
          <span className="fr">penser à</span> et{" "}
          <span className="fr">s’attendre à</span>, plutôt que comme une règle.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">ce dont</span>: cuando el verbo pide «<span className="fr" lang="fr">de</span>»
        </h2>

        <div className="rule">
          Algunos verbos no se construyen directamente: se habla{" "}
          <span className="fr" lang="fr">de</span> algo, uno se acuerda{" "}
          <span className="fr" lang="fr">de</span> algo, y se necesita algo,
          que en francés también va con{" "}
          <span className="fr" lang="fr">de</span>. Cuando ese complemento
          no tiene nombre, la forma es <strong>ce dont</strong>.
        </div>

        <DontExamples />

        <p>
          La elección no depende del sentido de la frase sino del verbo.
          Pregúntate con el verbo solo: se dice algo, luego{" "}
          <span className="fr" lang="fr">ce que je dis</span>; se habla de algo,
          luego <span className="fr" lang="fr">ce dont je parle</span>.
        </p>

        <VerbsTable
          caption="Decide el verbo, no la cosa de la que se habla"
          heads={["El verbo", "Su construcción", "La forma"]}
        />

        <div className="exception">
          Unos pocos verbos piden <span className="fr" lang="fr">à</span> en
          lugar de <span className="fr" lang="fr">de</span>, y entonces la forma
          es <span className="fr" lang="fr">ce à quoi</span>:{" "}
          <span className="fr" lang="fr">ce à quoi je pense</span>,{" "}
          <span className="fr" lang="fr">ce à quoi il s’attendait</span>. Es rara
          y se retiene con los dos verbos que la piden,{" "}
          <span className="fr" lang="fr">penser à</span> y{" "}
          <span className="fr" lang="fr">s’attendre à</span>, más que como una
          regla.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Ce qui compte, c’est…</h2>

        <div className="rule">
          Ces trois formes servent aussi à mettre un mot en avant. La phrase
          s’ouvre par <strong>ce qui</strong>, <strong>ce que</strong> ou{" "}
          <strong>ce dont</strong>, et se referme par{" "}
          <strong>c’est</strong>, qui annonce enfin l’élément important.
        </div>

        <HighlightExamples />

        <p>
          C’est la façon la plus simple d’insister à l’écrit sans changer
          l’ordre des mots partout. La virgule marque la pause de la voix, et
          c’est elle qui fait entendre l’insistance.
        </p>

        <div className="attention">
          Devant un nom au pluriel, la reprise s’écrit{" "}
          <span className="fr">ce sont</span> :{" "}
          <span className="fr">ce qui me manque, ce sont les vacances</span>. La
          règle est la même que dans{" "}
          <Link href="/grammaire/c-est-ce-sont">C’est, ce sont</Link>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Deux morceaux, et le second commence toujours par{" "}
            <strong>c’est</strong>.
          </p>
          <p>
            Si vous ouvrez par <span className="fr">ce qui</span> ou{" "}
            <span className="fr">ce que</span>, la phrase n’est pas finie tant
            que <span className="fr">c’est</span> n’est pas arrivé. Une phrase
            comme <span className="fr">ce que je veux une réponse</span> ne se
            termine pas : c’est le signe qu’il manque la reprise.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">Ce qui compte, c’est…</span>
        </h2>

        <div className="rule">
          Estas tres formas sirven también para poner una palabra de relieve. La
          frase se abre con <strong>ce qui</strong>, <strong>ce que</strong> o{" "}
          <strong>ce dont</strong>, y se cierra con <strong>c’est</strong>, que
          por fin anuncia el elemento importante.
        </div>

        <HighlightExamples />

        <p>
          Es la manera más sencilla de insistir por escrito sin cambiar el orden
          de las palabras en toda la frase. La coma marca la pausa de la voz, y
          es ella la que hace oír la insistencia.
        </p>

        <div className="attention">
          Ante un nombre en plural, se cierra con{" "}
          <span className="fr" lang="fr">ce sont</span>:{" "}
          <span className="fr" lang="fr">ce qui me manque, ce sont les vacances</span>.
          La regla es la misma que en{" "}
          <Link href="/grammaire/c-est-ce-sont" lang="fr">
            C’est, ce sont
          </Link>
          .
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dos trozos, y el segundo empieza siempre por <strong>c’est</strong>.
          </p>
          <p>
            Si abres con <span className="fr" lang="fr">ce qui</span> o{" "}
            <span className="fr" lang="fr">ce que</span>, la frase no ha
            terminado hasta que llega <span className="fr" lang="fr">c’est</span>.
            Una frase como{" "}
            <span className="fr" lang="fr">ce que je veux une réponse</span> no
            termina: es la señal de que falta el cierre con <span className="fr" lang="fr">c’est</span>.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Sans nom à reprendre, le pronom est{" "}
            <span className="fr">ce</span> et non{" "}
            <span className="fr">celui</span>.
          </li>
          <li>
            <span className="fr">ce qui</span> est suivi d’un verbe,{" "}
            <span className="fr">ce que</span> d’un sujet puis d’un verbe. Seul{" "}
            <span className="fr">ce que</span> s’élide.
          </li>
          <li>
            <span className="fr">ce dont</span> s’emploie quand le verbe se
            construit avec <span className="fr">de</span> : parler de, avoir
            besoin de, se souvenir de.
          </li>
          <li>
            Pour insister, on ouvre par{" "}
            <span className="fr">ce qui</span>,{" "}
            <span className="fr">ce que</span> ou{" "}
            <span className="fr">ce dont</span>, et on reprend par{" "}
            <span className="fr">c’est</span>.
          </li>
          <li>
            Devant un nom au pluriel, la reprise s’écrit{" "}
            <span className="fr">ce sont</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Sin nombre que retomar, el pronombre es{" "}
            <span className="fr" lang="fr">ce</span> y no{" "}
            <span className="fr" lang="fr">celui</span>.
          </li>
          <li>
            <span className="fr" lang="fr">ce qui</span> va seguido de un verbo,{" "}
            <span className="fr" lang="fr">ce que</span> de un sujeto y luego un
            verbo. Solo <span className="fr" lang="fr">ce que</span> se elide.
          </li>
          <li>
            <span className="fr" lang="fr">ce dont</span> se usa cuando el verbo
            se construye con <span className="fr" lang="fr">de</span>:{" "}
            <span className="fr" lang="fr">parler de</span>,{" "}
            <span className="fr" lang="fr">avoir besoin de</span>,{" "}
            <span className="fr" lang="fr">se souvenir de</span>.
          </li>
          <li>
            Para insistir, se abre con{" "}
            <span className="fr" lang="fr">ce qui</span>,{" "}
            <span className="fr" lang="fr">ce que</span> o{" "}
            <span className="fr" lang="fr">ce dont</span>, y se cierra con{" "}
            <span className="fr" lang="fr">c’est</span>.
          </li>
          <li>
            Ante un nombre en plural, se cierra con{" "}
            <span className="fr" lang="fr">ce sont</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
