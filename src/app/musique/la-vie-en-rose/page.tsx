import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/musique/la-vie-en-rose";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The excerpt, the
   French definitions and the pronouns are written once and shared. */

const EXPRESSIONS = [
  [
    "prendre dans ses bras",
    "serrer quelqu’un contre soi",
    "Elle a pris son fils dans ses bras avant de partir.",
  ],
  [
    "tout bas",
    "très doucement, presque sans voix",
    "Il a répondu tout bas, pour ne pas réveiller le bébé.",
  ],
  [
    "voir la vie en rose",
    "trouver que tout est beau, être heureux",
    "Depuis qu’elle a ce travail, elle voit la vie en rose.",
  ],
];

const PRONOUNS = [
  ["je", "moi", "C’est pour moi."],
  ["tu", "toi", "Je viens avec toi."],
  ["il / elle", "lui / elle", "Nous dînons chez lui."],
  ["nous / vous", "nous / vous", "Il est parti sans nous."],
  ["ils / elles", "eux / elles", "Elle travaille pour eux."],
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function Refrain() {
  return (
    <div className="example" lang="fr">
      <p>
        Quand il me prend dans ses bras,
        <br />
        Il me parle tout bas,
        <br />
        Je vois la vie en rose.
      </p>
    </div>
  );
}

function ExpressionsTable({ caption, heads }: { caption: string; heads: string[] }) {
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
          {EXPRESSIONS.map(([expression, definition, example]) => (
            <tr key={expression}>
              <th scope="row" className="fr" lang="fr">
                {expression}
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

function PronounsTable({
  caption,
  heads,
}: {
  caption: React.ReactNode;
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
          {PRONOUNS.map(([subject, after, example]) => (
            <tr key={subject}>
              <th scope="row" className="fr" lang="fr">
                {subject}
              </th>
              <td className="fr" lang="fr">
                {after}
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

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Une expression, puis une chanson</h2>

        <p>
          Paroles d’Édith Piaf, musique de Louiguy : la chanson est écrite en
          1945. Piaf la chante sur scène à partir de 1946 et l’enregistre en
          1947 ; c’est devenu la chanson française la plus connue hors de
          France.
        </p>

        <div className="rule">
          Le titre vient d’une expression qui existait avant la chanson :{" "}
          <span className="fr">voir la vie en rose</span>, c’est voir la vie du
          bon côté, être heureux au point que tout paraît beau.
        </div>

        <div className="attention">
          En français, la couleur du bonheur est le{" "}
          <span className="fr">rose</span>, jamais le rouge.{" "}
          <s className="fr">voir la vie en rouge</s> ne veut rien dire. La
          couleur des idées noires, elle, est bien le noir :{" "}
          <span className="fr">broyer du noir</span>, c’est être triste.
        </div>

        <p>
          L’expression s’emploie encore aujourd’hui, souvent au négatif pour
          dire qu’on est lucide : <span className="fr">je ne vois pas la vie en
          rose</span>, ou <span className="fr">il voit tout en rose</span> pour
          dire de quelqu’un qu’il est un peu naïf.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>Una expresión, y luego una canción</h2>

        <p>
          Letra de Édith Piaf, música de Louiguy: la canción se escribe en
          1945. Piaf la canta en el escenario a partir de 1946 y la graba en
          1947; se ha convertido en la canción francesa más conocida fuera de
          Francia.
        </p>

        <div className="rule">
          El título viene de una expresión que existía antes que la canción:{" "}
          <Fr>voir la vie en rose</Fr> es ver la vida por el lado bueno, ser tan
          feliz que todo parece bonito.
        </div>

        <div className="attention">
          En francés, el color de la felicidad es el <Fr>rose</Fr>, nunca el
          rojo.{" "}
          <s className="fr" lang="fr">
            voir la vie en rouge
          </s>{" "}
          no significa nada. El color de las ideas negras sí es el negro:{" "}
          <Fr>broyer du noir</Fr> es estar triste.
        </div>

        <p>
          La expresión se sigue usando hoy, a menudo en negativo para decir que
          uno es lúcido: <Fr>je ne vois pas la vie en rose</Fr>, o{" "}
          <Fr>il voit tout en rose</Fr> para decir de alguien que es un poco
          ingenuo.
        </p>
      </section>

      <section data-ui="fr">
        <h2>Le refrain, mot à mot</h2>

        <p>
          Trois vers suffisent à montrer pourquoi cette chanson se retient : il
          n’y a pas un mot rare dedans.
        </p>

        <Refrain />

        <ExpressionsTable
          caption="Les trois expressions du refrain, définies"
          heads={["Expression", "Définition", "Exemple"]}
        />

        <div className="rule">
          <span className="fr">il me prend</span>,{" "}
          <span className="fr">il me parle</span> : le pronom se place{" "}
          <strong>avant</strong> le verbe, et non après, sauf à l’impératif
          affirmatif (<span className="fr">prends-moi</span>). C’est la règle
          générale en français, et le refrain la donne deux fois de suite.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El estribillo, palabra por palabra</h2>

        <p>
          Tres versos bastan para ver por qué esta canción se queda en la
          memoria: no hay ni una palabra rara.
        </p>

        <Refrain />

        <ExpressionsTable
          caption="Las tres expresiones del estribillo, definidas"
          heads={["Expresión", "Definición", "Ejemplo"]}
        />

        <div className="rule">
          <Fr>il me prend</Fr>, <Fr>il me parle</Fr>: el pronombre va{" "}
          <strong>delante</strong> del verbo, y no detrás, salvo en el
          imperativo afirmativo (<Fr>prends-moi</Fr>). Es la regla general en
          francés, y el estribillo la da dos veces seguidas.
        </div>
      </section>

      <section data-ui="fr">
        <h2>« C’est lui pour moi » : les pronoms toniques</h2>

        <p>
          Plus loin, la chanson dit{" "}
          <span className="fr">c’est lui pour moi, moi pour lui</span>. Ce{" "}
          <span className="fr">moi</span> n’est pas le même mot que le{" "}
          <span className="fr">me</span> du refrain : après une préposition, le
          français emploie une autre série de pronoms.
        </p>

        <PronounsTable
          caption="La forme qu’un pronom prend après pour, avec, chez, sans"
          heads={["Sujet", "Après une préposition", "Exemple"]}
        />

        <div className="exception">
          On dit <span className="fr">pour moi</span>, jamais{" "}
          <s className="fr">pour je</s>. Quatre formes seulement ne changent pas
          d’une colonne à l’autre,{" "}
          <span className="fr">elle</span>, <span className="fr">elles</span>,{" "}
          <span className="fr">nous</span> et <span className="fr">vous</span> ;
          toutes les autres changent, et{" "}
          <span className="fr">eux</span> n’existe que dans cette colonne.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          «<span lang="fr">C’est lui pour moi</span>»: los pronombres tónicos
        </h2>

        <p>
          Más adelante, la canción dice{" "}
          <Fr>c’est lui pour moi, moi pour lui</Fr>. Ese <Fr>moi</Fr> no es la
          misma palabra que el <Fr>me</Fr> del estribillo: después de una
          preposición, el francés usa otra serie de pronombres.
        </p>

        <PronounsTable
          caption={
            <>
              La forma que toma un pronombre después de <Fr>pour</Fr>,{" "}
              <Fr>avec</Fr>, <Fr>chez</Fr>, <Fr>sans</Fr>
            </>
          }
          heads={["Sujeto", "Después de una preposición", "Ejemplo"]}
        />

        <div className="exception">
          Se dice <Fr>pour moi</Fr>, nunca{" "}
          <s className="fr" lang="fr">
            pour je
          </s>
          . Solo cuatro formas no cambian de una columna a otra, <Fr>elle</Fr>,{" "}
          <Fr>elles</Fr>, <Fr>nous</Fr> y <Fr>vous</Fr>; todas las demás
          cambian, y <Fr>eux</Fr> solo existe en esta columna.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">voir la vie en rose</span> veut dire trouver
            que tout est beau ; la chanson est née de l’expression, pas
            l’inverse.
          </li>
          <li>
            La couleur du bonheur est le rose, celle de la tristesse le noir.
          </li>
          <li>
            Le refrain ne contient aucun mot rare : c’est ce qui le rend
            chantable au bout de trois écoutes.
          </li>
          <li>
            <span className="fr">me</span>, <span className="fr">te</span>,{" "}
            <span className="fr">le</span> se placent avant le verbe.
          </li>
          <li>
            Après <span className="fr">pour</span>,{" "}
            <span className="fr">avec</span>, <span className="fr">chez</span>,{" "}
            <span className="fr">sans</span>, on emploie{" "}
            <span className="fr">moi</span>, <span className="fr">toi</span>,{" "}
            <span className="fr">lui</span>, <span className="fr">eux</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <Fr>voir la vie en rose</Fr> significa encontrar que todo es
            bonito; la canción nació de la expresión, no al revés.
          </li>
          <li>
            El color de la felicidad es el rosa, el de la tristeza el negro.
          </li>
          <li>
            El estribillo no contiene ninguna palabra rara: por eso se canta
            después de tres escuchas.
          </li>
          <li>
            <Fr>me</Fr>, <Fr>te</Fr>, <Fr>le</Fr> van delante del verbo.
          </li>
          <li>
            Después de <Fr>pour</Fr>, <Fr>avec</Fr>, <Fr>chez</Fr>,{" "}
            <Fr>sans</Fr>, se usa <Fr>moi</Fr>, <Fr>toi</Fr>, <Fr>lui</Fr>,{" "}
            <Fr>eux</Fr>.
          </li>
        </ul>
      </div>
    </article>
  );
}
