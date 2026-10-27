import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-recette-des-croissants";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The recipe, the
   words and their French definitions are the French taught: written once,
   below, and shared. Only captions, heads and the explanations differ. */

const INGREDIENTS_LIST = [
  "500 g de farine",
  "250 ml de lait froid",
  "250 g de beurre froid",
  "60 g de sucre",
  "10 g de sel",
  "20 g de levure fraîche de boulanger",
  "un œuf, pour dorer",
];

const STEPS = [
  "Mélanger la farine, le sucre, le sel, la levure et le lait dans un saladier.",
  "Pétrir la pâte cinq minutes. Elle doit rester souple.",
  "Couvrir le saladier et laisser reposer la pâte deux heures au réfrigérateur.",
  "Étaler la pâte au rouleau. Poser le beurre froid au centre et refermer la pâte dessus.",
  "Étaler de nouveau, puis plier la pâte en trois. Remettre au froid trente minutes.",
  "Recommencer deux fois : étaler, plier en trois, laisser reposer au froid.",
  "Étaler la pâte en un grand rectangle et couper des triangles au couteau.",
  "Rouler chaque triangle, de la base vers la pointe, et poser les croissants sur une plaque.",
  "Laisser pousser deux heures à température ambiante. Les croissants doublent de volume.",
  "Dorer au pinceau avec l’œuf battu.",
  "Cuire vingt minutes dans un four à 190 °C.",
];

const INGREDIENTS = [
  ["la farine", "la poudre blanche qu’on tire du blé", "500 g de farine"],
  ["la levure", "ce qui fait gonfler la pâte et la rend légère", "20 g de levure fraîche"],
  ["le beurre", "la matière grasse jaune qu’on fait avec le lait", "250 g de beurre froid"],
  ["le lait", "la boisson blanche que donne la vache", "250 ml de lait froid"],
  ["le sucre", "ce qu’on met dans le café pour qu’il soit doux", "60 g de sucre"],
  ["le sel", "la poudre blanche qui vient de la mer et relève le goût", "10 g de sel"],
  ["la pâte", "le mélange de farine et de liquide, avant la cuisson", "Pétrir la pâte cinq minutes."],
  ["un œuf", "ce que pond la poule ; celui-ci sert à dorer", "un œuf, pour dorer"],
];

const UTENSILS = [
  ["un saladier", "un grand bol, pour mélanger", "Mélanger dans un saladier."],
  ["un rouleau à pâtisserie", "un cylindre de bois, pour aplatir la pâte", "Étaler la pâte au rouleau."],
  ["un couteau", "l’outil qui coupe", "Couper des triangles au couteau."],
  ["une plaque", "la tôle plate qu’on glisse dans le four", "Poser les croissants sur une plaque."],
  ["un pinceau", "une petite brosse ; ici, pour passer l’œuf", "Dorer au pinceau."],
  ["un four", "l’appareil chaud où l’on fait cuire", "Cuire dans un four à 190 °C."],
  ["un réfrigérateur", "l’appareil froid où l’on garde les aliments", "Laisser reposer au réfrigérateur."],
];

const GESTURES = [
  ["mélanger", "mettre plusieurs choses ensemble", "Mélanger la farine et le lait."],
  ["pétrir", "travailler la pâte avec les mains", "Pétrir la pâte cinq minutes."],
  ["laisser reposer", "ne plus y toucher pendant un moment", "Laisser reposer deux heures."],
  ["étaler", "aplatir la pâte pour qu’elle devienne large et fine", "Étaler la pâte au rouleau."],
  ["plier", "rabattre une partie sur l’autre", "Plier la pâte en trois."],
  ["couper", "séparer avec un couteau", "Couper des triangles."],
  ["rouler", "enrouler sur soi-même, du large vers la pointe", "Rouler chaque triangle."],
  ["laisser pousser", "attendre que la pâte gonfle toute seule", "Laisser pousser deux heures."],
  ["dorer", "passer de l’œuf dessus, pour la couleur", "Dorer au pinceau."],
  ["cuire", "laisser dans le four jusqu’à ce que ce soit prêt", "Cuire vingt minutes."],
];

const QUANTITIES = [
  { q: "500 g", whole: "500 g de farine", fr: "le poids", es: "el peso" },
  { q: "250 ml", whole: "250 ml de lait", fr: "le volume d’un liquide", es: "el volumen de un líquido" },
  {
    q: "une cuillère à soupe",
    whole: "une cuillère à soupe de sucre",
    fr: "une petite quantité, sans balance",
    es: "una cantidad pequeña, sin balanza",
  },
  { q: "une pincée", whole: "une pincée de sel", fr: "ce qui tient entre deux doigts", es: "lo que cabe entre dos dedos" },
  { q: "un peu", whole: "un peu de lait", fr: "une quantité qu’on ne précise pas", es: "una cantidad que no se precisa" },
  { q: "beaucoup", whole: "beaucoup de beurre", fr: "une grande quantité", es: "una gran cantidad" },
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function Recipe() {
  return (
    <>
      <div className="example" lang="fr">
        <ul>
          {INGREDIENTS_LIST.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="example" lang="fr">
        <ol>
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

function WordsTable({
  rows,
  caption,
  heads,
}: {
  rows: string[][];
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
          {rows.map(([word, definition, example]) => (
            <tr key={word}>
              <th scope="row" className="fr" lang="fr">
                {word}
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

function QuantitiesTable({
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
          {QUANTITIES.map((row) => (
            <tr key={row.q}>
              <th scope="row" className="fr" lang="fr">
                {row.q}
              </th>
              <td className="fr" lang="fr">
                {row.whole}
              </td>
              <td>{row[lang]}</td>
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
        <h2>La recette</h2>

        <p>
          Voici la recette du croissant au beurre, celle des boulangeries de
          Paris.
        </p>

        <p>Pour douze croissants.</p>

        <Recipe />

        <div className="attention">
          Une recette française s’écrit à l’infinitif :{" "}
          <span className="fr">mélanger</span>,{" "}
          <span className="fr">étaler</span>, <span className="fr">cuire</span>.
          Ce n’est pas un ordre donné à quelqu’un, c’est la liste des gestes.
          Certains livres emploient l’impératif,{" "}
          <span className="fr">mélangez</span>,{" "}
          <span className="fr">étalez</span>, et cela veut dire exactement la
          même chose.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>La receta</h2>

        <p>
          Esta es la receta del <Fr>croissant au beurre</Fr>, la de las
          panaderías de París.
        </p>

        <p>Para doce croissants.</p>

        <Recipe />

        <div className="attention">
          Una receta francesa se escribe en infinitivo: <Fr>mélanger</Fr>,{" "}
          <Fr>étaler</Fr>, <Fr>cuire</Fr>. No es una orden dada a alguien, es la
          lista de los gestos. Algunos libros emplean el imperativo,{" "}
          <Fr>mélangez</Fr>, <Fr>étalez</Fr>, y quiere decir exactamente lo
          mismo.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots de la recette</h2>

        <WordsTable
          rows={INGREDIENTS}
          caption="Les ingrédients, avec l’article qu’il faut apprendre avec eux"
          heads={["L’ingrédient", "Ce que c’est", "Dans la recette"]}
        />

        <WordsTable
          rows={UTENSILS}
          caption="Les objets que la recette demande"
          heads={["L’ustensile", "À quoi il sert", "Dans la recette"]}
        />

        <WordsTable
          rows={GESTURES}
          caption="Les gestes, dans l’ordre où la recette les demande"
          heads={["Le verbe", "Ce qu’on fait", "Dans la recette"]}
        />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras de la receta</h2>

        <WordsTable
          rows={INGREDIENTS}
          caption="Los ingredientes, con el artículo que hay que aprender con ellos"
          heads={["El ingrediente", "Qué es", "En la receta"]}
        />

        <WordsTable
          rows={UTENSILS}
          caption="Los objetos que pide la receta"
          heads={["El utensilio", "Para qué sirve", "En la receta"]}
        />

        <WordsTable
          rows={GESTURES}
          caption="Los gestos, en el orden en que la receta los pide"
          heads={["El verbo", "Qué se hace", "En la receta"]}
        />
      </section>

      <section data-ui="fr">
        <h2>Dire les quantités</h2>

        <div className="rule">
          Devant un ingrédient qu’on ne compte pas, on emploie{" "}
          <span className="fr">du</span>, <span className="fr">de la</span> ou{" "}
          <span className="fr">de l’</span> :{" "}
          <span className="fr">du beurre</span>,{" "}
          <span className="fr">de la farine</span>,{" "}
          <span className="fr">de l’eau</span>. La règle entière, au-delà de la
          cuisine, est dans{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>

        <div className="attention">
          On ne dit jamais <s className="fr">un beurre</s> ni{" "}
          <s className="fr">une farine</s>. Ces choses-là ne se comptent
          pas : on en prend une quantité, on n’en prend pas un.
        </div>

        <div className="exception">
          Ce qui se compte garde <span className="fr">un</span> et{" "}
          <span className="fr">une</span> :{" "}
          <span className="fr">un œuf</span>,{" "}
          <span className="fr">deux œufs</span>,{" "}
          <span className="fr">un croissant</span>,{" "}
          <span className="fr">un saladier</span>.
        </div>

        <QuantitiesTable
          lang="fr"
          caption="Après une quantité, l’ingrédient arrive toujours avec « de »"
          heads={["La quantité", "La phrase entière", "Ce qu’elle mesure"]}
        />

        <div className="astuce">
          <p className="astuce-hook">
            Dès qu’une quantité est dite, <span className="fr">du</span> et{" "}
            <span className="fr">de la</span> disparaissent.
          </p>
          <p>
            On prend <span className="fr">du beurre</span>, mais{" "}
            <span className="fr">250 g de beurre</span>. On boit{" "}
            <span className="fr">du lait</span>, mais{" "}
            <span className="fr">un verre de lait</span>. La quantité occupe la
            place, et il ne reste que <span className="fr">de</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Decir las cantidades</h2>

        <div className="rule">
          Delante de un ingrediente que no se cuenta, se usa <Fr>du</Fr>,{" "}
          <Fr>de la</Fr> o <Fr>de l’</Fr>: <Fr>du beurre</Fr>,{" "}
          <Fr>de la farine</Fr>, <Fr>de l’eau</Fr>. La regla completa, más allá
          de la cocina, está en{" "}
          <Link href="/grammaire/les-articles-partitifs" lang="fr">
            Les articles partitifs
          </Link>
          .
        </div>

        <div className="attention">
          Nunca se dice{" "}
          <s className="fr" lang="fr">
            un beurre
          </s>{" "}
          ni{" "}
          <s className="fr" lang="fr">
            une farine
          </s>
          . Esas cosas no se cuentan: se toma una cantidad, no se toma una.
        </div>

        <div className="exception">
          Lo que se cuenta conserva <Fr>un</Fr> y <Fr>une</Fr>:{" "}
          <Fr>un œuf</Fr>, <Fr>deux œufs</Fr>, <Fr>un croissant</Fr>,{" "}
          <Fr>un saladier</Fr>.
        </div>

        <QuantitiesTable
          lang="es"
          caption="Después de una cantidad, el ingrediente llega siempre con « de »"
          heads={["La cantidad", "La frase entera", "Lo que mide"]}
        />

        <div className="astuce">
          <p className="astuce-hook">
            En cuanto se dice una cantidad, <Fr>du</Fr> y <Fr>de la</Fr>{" "}
            desaparecen.
          </p>
          <p>
            Se toma <Fr>du beurre</Fr>, pero <Fr>250 g de beurre</Fr>. Se bebe{" "}
            <Fr>du lait</Fr>, pero <Fr>un verre de lait</Fr>. La cantidad ocupa
            el sitio, y solo queda <Fr>de</Fr>.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Une recette s’écrit à l’infinitif :{" "}
            <span className="fr">mélanger</span>,{" "}
            <span className="fr">étaler</span>,{" "}
            <span className="fr">cuire</span>.
          </li>
          <li>
            Un ingrédient s’apprend avec son article :{" "}
            <span className="fr">la farine</span>,{" "}
            <span className="fr">le beurre</span>,{" "}
            <span className="fr">la levure</span>.
          </li>
          <li>
            Devant ce qui ne se compte pas :{" "}
            <span className="fr">du beurre</span>,{" "}
            <span className="fr">de la farine</span>. Jamais{" "}
            <s className="fr">un beurre</s>.
          </li>
          <li>
            Après une quantité, toujours <span className="fr">de</span> :{" "}
            <span className="fr">500 g de farine</span>,{" "}
            <span className="fr">une pincée de sel</span>.
          </li>
          <li>
            Les gestes de la pâte : <span className="fr">pétrir</span>,{" "}
            <span className="fr">étaler</span>,{" "}
            <span className="fr">plier</span>,{" "}
            <span className="fr">rouler</span>,{" "}
            <span className="fr">dorer</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Una receta se escribe en infinitivo: <Fr>mélanger</Fr>,{" "}
            <Fr>étaler</Fr>, <Fr>cuire</Fr>.
          </li>
          <li>
            Un ingrediente se aprende con su artículo: <Fr>la farine</Fr>,{" "}
            <Fr>le beurre</Fr>, <Fr>la levure</Fr>.
          </li>
          <li>
            Delante de lo que no se cuenta: <Fr>du beurre</Fr>,{" "}
            <Fr>de la farine</Fr>. Nunca{" "}
            <s className="fr" lang="fr">
              un beurre
            </s>
            .
          </li>
          <li>
            Después de una cantidad, siempre <Fr>de</Fr>:{" "}
            <Fr>500 g de farine</Fr>, <Fr>une pincée de sel</Fr>.
          </li>
          <li>
            Los gestos de la masa: <Fr>pétrir</Fr>, <Fr>étaler</Fr>,{" "}
            <Fr>plier</Fr>, <Fr>rouler</Fr>, <Fr>dorer</Fr>.
          </li>
        </ul>
      </div>
    </article>
  );
}
