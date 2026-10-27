import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-pronoms-demonstratifs";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

const FORMS = [
  { noun: { fr: "masculin singulier", es: "masculino singular" }, pronoun: "celui", example: "Quel gâteau ? Celui-là." },
  { noun: { fr: "féminin singulier", es: "femenino singular" }, pronoun: "celle", example: "Ma voiture est celle de gauche." },
  { noun: { fr: "masculin pluriel", es: "masculino plural" }, pronoun: "ceux", example: "Ces livres ? Ceux-là sont à moi." },
  { noun: { fr: "féminin pluriel", es: "femenino plural" }, pronoun: "celles", example: "Mes clés sont celles du tiroir." },
];

const FOLLOWS = [
  { head: "-ci / -là", says: { fr: "on le montre", es: "se señala" }, example: "Ce sac ? Celui-là." },
  { head: "de", says: { fr: "on dit à qui il est", es: "se dice de quién es" }, example: "C’est celui de Marie." },
  { head: "qui / que", says: { fr: "on le décrit", es: "se describe" }, example: "C’est celui qui coûte le moins cher." },
];

function FormsTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? "Las cuatro formas y el nombre que sustituye cada una"
            : "Les quatre formes, et le nom que chacune remplace"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "El nombre sustituido" : "Le nom remplacé"}</th>
            <th scope="col">{es ? "El pronombre" : "Le pronom"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {FORMS.map((row) => (
            <tr key={row.pronoun}>
              <th scope="row">{row.noun[lang]}</th>
              <td className="fr" lang="fr">
                {row.pronoun}
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

function FollowsTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? "Las tres continuaciones posibles, con un mismo nombre"
            : "Les trois suites possibles, sur un même nom"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "La continuación" : "La suite"}</th>
            <th scope="col">{es ? "Lo que dice" : "Ce qu’elle dit"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {FOLLOWS.map((row) => (
            <tr key={row.head}>
              <th scope="row" className="fr" lang="fr">
                {row.head}
              </th>
              <td>{row.says[lang]}</td>
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

function ChooseExamples() {
  return (
    <div className="example" lang="fr">
      Ces deux manteaux me plaisent. <strong>Celui-ci</strong> est plus
      chaud, mais <strong>celui-là</strong> est moins cher.
      <br />
      Vous préférez quelle chambre ? <strong>Celle-là</strong>, avec la
      fenêtre.
    </div>
  );
}

function DeterminerExamples() {
  return (
    <div className="example" lang="fr">
      <strong>Ce pull-là</strong> est trop grand. · Le rouge ? Non,{" "}
      <strong>celui-là</strong>.
    </div>
  );
}

function WhichExamples() {
  return (
    <div className="example" lang="fr">
      Mon vélo est <strong>celui de</strong> mon frère.
      <br />
      Prends <strong>celle qui</strong> est sur la table.
      <br />
      La photo que je préfère, c’est <strong>celle du</strong> mariage.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Quatre formes, et jamais toutes seules</h2>

        <div className="rule">
          Le pronom démonstratif remplace un nom déjà dit, pour ne pas le
          répéter. Il s’accorde avec ce nom, et il ne reste jamais seul : il
          faut toujours quelque chose derrière lui.
        </div>

        <FormsTable lang="fr" />

        <div className="attention">
          <span className="fr">celui</span> ne vit jamais seul. On ne dit pas{" "}
          <s className="fr">je prends celui</s>. Il faut une suite, et il
          n’y en a que trois : <span className="fr">-ci</span> ou{" "}
          <span className="fr">-là</span>, <span className="fr">de</span> et un
          nom, ou une phrase qui commence par{" "}
          <span className="fr">qui</span> ou <span className="fr">que</span>.
        </div>

        <p>
          Le genre vient du nom remplacé, pas de la chose montrée du doigt. Si
          le mot était <span className="fr">une écharpe</span>, le pronom est{" "}
          <span className="fr">celle</span>, même si la personne qui parle tient
          déjà l’objet dans la main.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuatro formas, y nunca solas</h2>

        <div className="rule">
          El pronombre demostrativo sustituye a un nombre ya dicho, para no
          repetirlo. Concuerda con ese nombre y nunca se queda solo: siempre
          necesita algo detrás.
        </div>

        <FormsTable lang="es" />

        <div className="attention">
          <span className="fr" lang="fr">celui</span> nunca va solo. No se
          dice <s className="fr" lang="fr">je prends celui</s>. Hace falta una
          continuación, y solo hay tres:{" "}
          <span className="fr" lang="fr">-ci</span> o{" "}
          <span className="fr" lang="fr">-là</span>,{" "}
          <span className="fr" lang="fr">de</span> y un nombre, o una frase que
          empieza por <span className="fr" lang="fr">qui</span> o{" "}
          <span className="fr" lang="fr">que</span>.
        </div>

        <p>
          El género viene del nombre sustituido, no de la cosa que se señala con
          el dedo. Si la palabra era <span className="fr" lang="fr">une écharpe</span>,
          el pronombre es <span className="fr" lang="fr">celle</span>, aunque
          quien habla ya tenga el objeto en la mano.
        </p>
      </section>

      <section data-ui="fr">
        <h2>celui-ci, celui-là : choisir entre deux</h2>

        <div className="rule">
          Avec <strong>-ci</strong> et <strong>-là</strong>, le pronom montre.
          Il sert à choisir entre deux choses qu’on vient de nommer :{" "}
          <span className="fr">-ci</span> pour la plus proche,{" "}
          <span className="fr">-là</span> pour l’autre.
        </div>

        <ChooseExamples />

        <p>
          Le trait d’union est obligatoire, comme après le nom dans{" "}
          <Link href="/grammaire/les-determinants-demonstratifs">
            Les déterminants démonstratifs
          </Link>
          . La différence est simple à voir : le déterminant garde son nom
          derrière lui, le pronom l’a remplacé.
        </p>

        <DeterminerExamples />

        <div className="astuce">
          <p className="astuce-hook">
            Dans un magasin, <strong>celui-là</strong> et{" "}
            <strong>celle-là</strong> suffisent à tout acheter.
          </p>
          <p>
            Le vendeur a nommé l’objet, vous n’avez plus qu’à le reprendre au
            bon genre : <span className="fr">je prends celui-là</span> pour un
            pull, <span className="fr">je prends celle-là</span> pour une
            écharpe. C’est la phrase la plus utile de cette leçon.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">celui-ci, celui-là</span>: elegir entre dos
        </h2>

        <div className="rule">
          Con <strong lang="fr">-ci</strong> y <strong lang="fr">-là</strong>,
          el pronombre señala. Sirve para elegir entre dos cosas que acabas de
          nombrar: <span className="fr" lang="fr">-ci</span> para la más
          cercana, <span className="fr" lang="fr">-là</span> para la otra.
        </div>

        <ChooseExamples />

        <p>
          El guion es obligatorio, como después del nombre en{" "}
          <Link href="/grammaire/les-determinants-demonstratifs" lang="fr">
            Les déterminants démonstratifs
          </Link>
          . La diferencia es fácil de ver: el determinante conserva su nombre
          detrás, el pronombre lo ha sustituido.
        </p>

        <DeterminerExamples />

        <div className="astuce">
          <p className="astuce-hook">
            En una tienda, <strong lang="fr">celui-là</strong> y{" "}
            <strong lang="fr">celle-là</strong> bastan para comprarlo todo.
          </p>
          <p>
            El vendedor ha nombrado el objeto; tú solo tienes que retomarlo con
            el género correcto:{" "}
            <span className="fr" lang="fr">je prends celui-là</span> para{" "}
            <span className="fr" lang="fr">un pull</span>,{" "}
            <span className="fr" lang="fr">je prends celle-là</span> para{" "}
            <span className="fr" lang="fr">une écharpe</span>. Es la frase más útil de esta lección.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>celui de, celui qui : dire lequel</h2>

        <div className="rule">
          Pour dire à qui la chose appartient, ou d’où elle vient, on met{" "}
          <strong>de</strong> après le pronom. Pour la décrire, on met une
          phrase qui commence par <strong>qui</strong> ou{" "}
          <strong>que</strong>.
        </div>

        <WhichExamples />

        <p>
          <span className="fr">de</span> se contracte devant{" "}
          <span className="fr">le</span> et <span className="fr">les</span>,
          comme partout ailleurs :{" "}
          <span className="fr">celui du voisin</span>,{" "}
          <span className="fr">celles des enfants</span>.
        </p>

        <FollowsTable lang="fr" />

        <div className="attention">
          Dans <span className="fr">celui qui</span>, le verbe qui suit s’accorde
          avec le pronom, donc avec le nom remplacé :{" "}
          <span className="fr">ceux qui arrivent en retard attendent</span>,{" "}
          <span className="fr">celle qui est sur la table est à moi</span>.
        </div>

        <div className="exception">
          Quand la chose n’a pas de nom, parce qu’il s’agit d’une idée ou de
          toute une phrase, le pronom n’est ni{" "}
          <span className="fr">celui</span> ni <span className="fr">celle</span>{" "}
          mais <span className="fr">ce</span> :{" "}
          <span className="fr">ce qui compte, c’est d’essayer</span>. C’est la
          suite de cette leçon, dans{" "}
          <Link href="/grammaire/ce-qui-ce-que-ce-dont">
            Ce qui, ce que, ce dont
          </Link>
          .
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">celui de, celui qui</span>: decir cuál
        </h2>

        <div className="rule">
          Para decir de quién es la cosa, o de dónde viene, se pone{" "}
          <strong lang="fr">de</strong> después del pronombre. Para describirla,
          se pone una frase que empieza por <strong lang="fr">qui</strong> o{" "}
          <strong lang="fr">que</strong>.
        </div>

        <WhichExamples />

        <p>
          <span className="fr" lang="fr">de</span> se contrae delante de{" "}
          <span className="fr" lang="fr">le</span> y{" "}
          <span className="fr" lang="fr">les</span>, como en todas partes:{" "}
          <span className="fr" lang="fr">celui du voisin</span>,{" "}
          <span className="fr" lang="fr">celles des enfants</span>.
        </p>

        <FollowsTable lang="es" />

        <div className="attention">
          En <span className="fr" lang="fr">celui qui</span>, el verbo que
          sigue concuerda con el pronombre, es decir, con el nombre
          sustituido:{" "}
          <span className="fr" lang="fr">ceux qui arrivent en retard attendent</span>,{" "}
          <span className="fr" lang="fr">celle qui est sur la table est à moi</span>.
        </div>

        <div className="exception">
          Cuando la cosa no tiene nombre, porque es una idea o toda una frase,
          el pronombre no es <span className="fr" lang="fr">celui</span> ni{" "}
          <span className="fr" lang="fr">celle</span> sino{" "}
          <span className="fr" lang="fr">ce</span>:{" "}
          <span className="fr" lang="fr">ce qui compte, c’est d’essayer</span>.
          Es la continuación de esta lección, en{" "}
          <Link href="/grammaire/ce-qui-ce-que-ce-dont" lang="fr">
            Ce qui, ce que, ce dont
          </Link>
          .
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre formes, accordées avec le nom remplacé :{" "}
            <span className="fr">celui</span>, <span className="fr">celle</span>
            , <span className="fr">ceux</span>,{" "}
            <span className="fr">celles</span>.
          </li>
          <li>
            Le pronom ne reste jamais seul : il faut{" "}
            <span className="fr">-ci</span> ou <span className="fr">-là</span>,{" "}
            <span className="fr">de</span> et un nom, ou{" "}
            <span className="fr">qui</span> et une phrase.
          </li>
          <li>
            <span className="fr">celui-là</span> montre et choisit ;{" "}
            <span className="fr">celui de</span> dit à qui la chose est ;{" "}
            <span className="fr">celui qui</span> la décrit.
          </li>
          <li>
            Le déterminant garde son nom derrière lui, le pronom l’a remplacé :{" "}
            <span className="fr">ce pull-là</span> contre{" "}
            <span className="fr">celui-là</span>.
          </li>
          <li>
            Pour une idée sans nom, le pronom est{" "}
            <span className="fr">ce</span>, pas{" "}
            <span className="fr">celui</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Cuatro formas, que concuerdan con el nombre sustituido:{" "}
            <span className="fr" lang="fr">celui</span>,{" "}
            <span className="fr" lang="fr">celle</span>,{" "}
            <span className="fr" lang="fr">ceux</span>,{" "}
            <span className="fr" lang="fr">celles</span>.
          </li>
          <li>
            El pronombre nunca va solo: hace falta{" "}
            <span className="fr" lang="fr">-ci</span> o{" "}
            <span className="fr" lang="fr">-là</span>,{" "}
            <span className="fr" lang="fr">de</span> y un nombre, o{" "}
            <span className="fr" lang="fr">qui</span> y una frase.
          </li>
          <li>
            <span className="fr" lang="fr">celui-là</span> señala y elige;{" "}
            <span className="fr" lang="fr">celui de</span> dice de quién es la
            cosa; <span className="fr" lang="fr">celui qui</span> la describe.
          </li>
          <li>
            El determinante conserva su nombre detrás, el pronombre lo ha
            sustituido: <span className="fr" lang="fr">ce pull-là</span> frente
            a <span className="fr" lang="fr">celui-là</span>.
          </li>
          <li>
            Para una idea sin nombre, el pronombre es{" "}
            <span className="fr" lang="fr">ce</span>, no{" "}
            <span className="fr" lang="fr">celui</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
