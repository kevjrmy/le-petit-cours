import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/quand-l-article-disparait";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

const CONTRASTS = [
  {
    without: "un cours de français",
    with: "le cours du professeur",
    change: { fr: "une matière, puis une personne précise", es: "una materia, y luego una persona concreta" },
  },
  {
    without: "une tasse de thé",
    with: "la tasse de ma grand-mère",
    change: { fr: "ce qu’il y a dedans, puis à qui elle est", es: "lo que contiene, y luego de quién es" },
  },
  {
    without: "une carte de France",
    with: "la carte de la région",
    change: { fr: "le sujet de la carte, puis une région connue", es: "el tema del mapa, y luego una región conocida" },
  },
];

const PLACES = [
  { word: "sans", example: "un café sans sucre, sans difficulté", says: { fr: "l’absence de la chose", es: "la ausencia de la cosa" } },
  { word: "en", example: "en voiture, en été, en classe", says: { fr: "le moyen, le moment, le lieu", es: "el medio, el momento, el lugar" } },
  { word: "être", example: "Il est médecin. Elle est avocate.", says: { fr: "le métier, sans rien devant", es: "la profesión, sin nada delante" } },
];

function ContrastTable({
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
          {CONTRASTS.map((row) => (
            <tr key={row.without}>
              <td className="fr" lang="fr">
                {row.without}
              </td>
              <td className="fr" lang="fr">
                {row.with}
              </td>
              <td>{row.change[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlacesTable({
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
          {PLACES.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td className="fr" lang="fr">
                {row.example}
              </td>
              <td>{row.says[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClassifyExamples() {
  return (
    <div className="example" lang="fr">
      un cours <strong>de</strong> français · une salle <strong>de</strong>{" "}
      bains · un billet <strong>de</strong> train · une tasse{" "}
      <strong>de</strong> thé · un professeur <strong>de</strong> mathématiques
    </div>
  );
}

function AdjectiveExamples() {
  return (
    <div className="example" lang="fr">
      des maisons → <strong>de</strong> grandes maisons
      <br />
      des amis → <strong>de</strong> bons amis
      <br />
      des enfants → <strong>de</strong> jeunes enfants
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Le nom qui en qualifie un autre</h2>

        <div className="rule">
          Dans un groupe <span className="fr">nom + de + nom</span>, le second
          nom n’a pas d’article quand il dit l’espèce, la matière, le contenu ou
          l’usage du premier. Il ne désigne alors personne et rien en
          particulier : il classe.
        </div>

        <ClassifyExamples />

        <p>
          L’article revient dès que le second nom désigne quelque chose de
          précis. C’est la seule question à se poser : est-ce que je pourrais
          dire lequel ?
        </p>

        <ContrastTable
          caption="Le même tour, avec et sans article"
          heads={["Sans article", "Avec article", "Ce qui a changé"]}
          lang="fr"
        />

        <div className="attention">
          <span className="fr">en</span> introduit la matière de la même façon,
          et jamais avec un article : <span className="fr">une table en
          bois</span>, <span className="fr">une bague en or</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El nombre que califica a otro</h2>

        <div className="rule">
          En un grupo <span className="fr" lang="fr">nom + de + nom</span>, el
          segundo nombre no lleva artículo cuando dice la especie, la materia,
          el contenido o el uso del primero. No designa a nadie ni nada en
          particular: clasifica.
        </div>

        <ClassifyExamples />

        <p>
          El artículo vuelve en cuanto el segundo nombre designa algo concreto.
          Es la única pregunta que hay que hacerse: ¿podría decir cuál?
        </p>

        <ContrastTable
          caption="La misma construcción, con y sin artículo"
          heads={["Sin artículo", "Con artículo", "Lo que ha cambiado"]}
          lang="es"
        />

        <div className="attention">
          <span className="fr" lang="fr">en</span> introduce la materia de la
          misma manera, y nunca con artículo:{" "}
          <span className="fr" lang="fr">une table en bois</span>,{" "}
          <span className="fr" lang="fr">une bague en or</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Après « sans », après « en », devant un métier</h2>

        <div className="rule">
          Quelques mots font tomber l’article à eux seuls.{" "}
          <span className="fr">sans</span> et <span className="fr">en</span>{" "}
          sont les deux plus fréquents, et le verbe{" "}
          <span className="fr">être</span> le fait aussi devant un nom de
          métier.
        </div>

        <PlacesTable
          caption="Les trois endroits où l’article ne s’écrit pas"
          heads={["Le mot", "Exemple", "Ce qu’il dit"]}
          lang="fr"
        />

        <p>
          Le cas du métier a une contrepartie qu’il faut connaître avec lui :
          dès qu’un article apparaît, la phrase change de forme et commence par{" "}
          <span className="fr">c’est</span>. Les deux sont dans{" "}
          <Link href="/grammaire/c-est-ce-sont">C’est, ce sont</Link>.
        </p>

        <div className="attention">
          L’article revient derrière <span className="fr">sans</span> dès que le
          nom est qualifié ou désigné :{" "}
          <span className="fr">sans une minute de retard</span>,{" "}
          <span className="fr">sans l’aide de personne</span>. Le nom nu est le
          cas général, pas une interdiction.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un nom nu n’est plus un objet : c’est une qualité.
          </p>
          <p>
            <span className="fr">avec plaisir</span>,{" "}
            <span className="fr">avec attention</span>,{" "}
            <span className="fr">sans difficulté</span> ne parlent d’aucun
            plaisir, d’aucune attention et d’aucune difficulté en particulier :
            ils disent comment la chose se fait. C’est pour cela qu’il n’y a
            rien à déterminer, et donc rien à mettre devant.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Después de «<span className="fr" lang="fr">sans</span>», después de «
          <span className="fr" lang="fr">en</span>», delante de una profesión
        </h2>

        <div className="rule">
          Algunas palabras hacen caer el artículo por sí solas.{" "}
          <span className="fr" lang="fr">sans</span> y{" "}
          <span className="fr" lang="fr">en</span> son las dos más frecuentes, y
          el verbo <span className="fr" lang="fr">être</span> lo hace también
          delante de un nombre de profesión.
        </div>

        <PlacesTable
          caption="Los tres sitios donde no se escribe el artículo"
          heads={["La palabra", "Ejemplo", "Lo que dice"]}
          lang="es"
        />

        <p>
          El caso de la profesión tiene una contrapartida que hay que conocer
          con él: en cuanto aparece un artículo, la frase cambia de forma y
          empieza por <span className="fr" lang="fr">c’est</span>. Los dos están
          en{" "}
          <Link href="/grammaire/c-est-ce-sont" lang="fr">
            C’est, ce sont
          </Link>
          .
        </p>

        <div className="attention">
          El artículo vuelve detrás de{" "}
          <span className="fr" lang="fr">sans</span> en cuanto el nombre está
          calificado o determinado:{" "}
          <span className="fr" lang="fr">sans une minute de retard</span>,{" "}
          <span className="fr" lang="fr">sans l’aide de personne</span>. El
          nombre sin artículo es el caso general, no una prohibición.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un nombre sin artículo ya no es un objeto: es una cualidad.
          </p>
          <p>
            <span className="fr" lang="fr">avec plaisir</span>,{" "}
            <span className="fr" lang="fr">avec attention</span>,{" "}
            <span className="fr" lang="fr">sans difficulté</span> no hablan de
            ningún placer, de ninguna atención ni de ninguna dificultad en
            particular: dicen cómo se hace la cosa. Por eso no hay nada que
            determinar, y por tanto nada que poner delante.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>« des » devient « de » devant un adjectif</h2>

        <div className="rule">
          Au pluriel, quand un adjectif se place <strong>avant</strong> le nom,{" "}
          <span className="fr">des</span> se réduit à{" "}
          <span className="fr">de</span>.
        </div>

        <AdjectiveExamples />

        <p>
          L’adjectif placé après le nom ne change rien :{" "}
          <span className="fr">des maisons anciennes</span>,{" "}
          <span className="fr">des amis fidèles</span>. Seule la position
          compte, et seuls quelques adjectifs courants se mettent devant :{" "}
          <span className="fr">grand</span>, <span className="fr">petit</span>,{" "}
          <span className="fr">bon</span>, <span className="fr">beau</span>,{" "}
          <span className="fr">jeune</span>, <span className="fr">vieux</span>,{" "}
          <span className="fr">gros</span>, <span className="fr">joli</span>.
        </p>

        <div className="attention">
          C’est une règle de l’écrit soigné. À l’oral, on entend partout{" "}
          <span className="fr">des grandes maisons</span>, et personne ne
          reprend celui qui le dit. À l’écrit, et dans une copie d’examen, la
          forme attendue reste <span className="fr">de</span>.
        </div>

        <div className="exception">
          Quand l’adjectif et le nom forment un seul mot de la langue,{" "}
          <span className="fr">des</span> reste :{" "}
          <span className="fr">des jeunes gens</span>,{" "}
          <span className="fr">des petits pois</span>,{" "}
          <span className="fr">des grands-parents</span>. Ce ne sont plus un
          adjectif et un nom, c’est un nom en deux morceaux.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          «<span className="fr" lang="fr">des</span>» pasa a «
          <span className="fr" lang="fr">de</span>» delante de un adjetivo
        </h2>

        <div className="rule">
          En plural, cuando un adjetivo se coloca <strong>antes</strong> del
          nombre, <span className="fr" lang="fr">des</span> se reduce a{" "}
          <span className="fr" lang="fr">de</span>.
        </div>

        <AdjectiveExamples />

        <p>
          El adjetivo colocado después del nombre no cambia nada:{" "}
          <span className="fr" lang="fr">des maisons anciennes</span>,{" "}
          <span className="fr" lang="fr">des amis fidèles</span>. Solo cuenta la
          posición, y solo unos pocos adjetivos corrientes se ponen delante:{" "}
          <span className="fr" lang="fr">grand</span>,{" "}
          <span className="fr" lang="fr">petit</span>,{" "}
          <span className="fr" lang="fr">bon</span>,{" "}
          <span className="fr" lang="fr">beau</span>,{" "}
          <span className="fr" lang="fr">jeune</span>,{" "}
          <span className="fr" lang="fr">vieux</span>,{" "}
          <span className="fr" lang="fr">gros</span>,{" "}
          <span className="fr" lang="fr">joli</span>.
        </p>

        <div className="attention">
          Es una regla de la lengua escrita cuidada. Al hablar, se oye por todas
          partes <span className="fr" lang="fr">des grandes maisons</span>, y
          nadie corrige a quien lo dice. Por escrito, y en un examen, la forma
          esperada sigue siendo <span className="fr" lang="fr">de</span>.
        </div>

        <div className="exception">
          Cuando el adjetivo y el nombre forman una sola palabra de la lengua,{" "}
          <span className="fr" lang="fr">des</span> se queda:{" "}
          <span className="fr" lang="fr">des jeunes gens</span>,{" "}
          <span className="fr" lang="fr">des petits pois</span>,{" "}
          <span className="fr" lang="fr">des grands-parents</span>. Ya no son un
          adjetivo y un nombre: es un nombre en dos trozos.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Dans <span className="fr">nom + de + nom</span>, le second n’a pas
            d’article quand il classe le premier :{" "}
            <span className="fr">un cours de français</span>.
          </li>
          <li>
            L’article revient dès que ce second nom désigne quelqu’un ou quelque
            chose de précis : <span className="fr">le cours du professeur</span>
            .
          </li>
          <li>
            <span className="fr">sans</span> et <span className="fr">en</span>{" "}
            font tomber l’article, et{" "}
            <span className="fr">être</span> aussi devant un métier.
          </li>
          <li>
            Un nom nu ne désigne plus un objet : il dit une qualité ou une
            manière.
          </li>
          <li>
            Devant un adjectif placé avant le nom,{" "}
            <span className="fr">des</span> devient{" "}
            <span className="fr">de</span> :{" "}
            <span className="fr">de bons amis</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            En <span className="fr" lang="fr">nom + de + nom</span>, el segundo
            no lleva artículo cuando clasifica al primero:{" "}
            <span className="fr" lang="fr">un cours de français</span>.
          </li>
          <li>
            El artículo vuelve en cuanto ese segundo nombre designa a alguien o
            algo concreto:{" "}
            <span className="fr" lang="fr">le cours du professeur</span>.
          </li>
          <li>
            <span className="fr" lang="fr">sans</span> y{" "}
            <span className="fr" lang="fr">en</span> hacen caer el artículo, y{" "}
            <span className="fr" lang="fr">être</span> también delante de una
            profesión.
          </li>
          <li>
            Un nombre sin artículo ya no designa un objeto: dice una cualidad o
            una manera.
          </li>
          <li>
            Delante de un adjetivo colocado antes del nombre,{" "}
            <span className="fr" lang="fr">des</span> pasa a{" "}
            <span className="fr" lang="fr">de</span>:{" "}
            <span className="fr" lang="fr">de bons amis</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
