import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-critique";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (formulas, examples) is written once, below, and shared; the middle column,
   which explains, is written in each language. The page follows
   « L'opinion » (`voc-opinion`): it takes for granted « je ne suis pas
   d'accord » and « c'est vrai, mais… », and never restates them. */

type Row = { word: string; fr: string; es: string; example: string };

const CRITICISMS: Row[] = [
  {
    word: "c’est trop + adjectif",
    fr: "il y a plus que nécessaire",
    es: "hay más de lo necesario",
    example: "Ce film est trop long : il dure trois heures.",
  },
  {
    word: "ce n’est pas assez + adjectif",
    fr: "il y a moins que nécessaire",
    es: "hay menos de lo necesario",
    example: "La soupe n’est pas assez chaude.",
  },
  {
    word: "il manque + nom",
    fr: "une chose n’est pas là, et elle devrait y être",
    es: "algo no está, y debería estar",
    example: "Il manque du sel dans les pâtes.",
  },
  {
    word: "le problème, c’est que…",
    fr: "pour annoncer la critique la plus importante",
    es: "para anunciar la crítica más importante",
    example: "L’hôtel est joli. Le problème, c’est qu’il est loin de la plage.",
  },
  {
    word: "je n’ai pas aimé",
    fr: "pour juger une chose que vous avez vue, lue ou goûtée",
    es: "para juzgar algo que has visto, leído o probado",
    example: "Je n’ai pas aimé la fin du livre.",
  },
];

const SCALE: Row[] = [
  {
    word: "pas mal",
    fr: "plutôt bien : c’est un compliment",
    es: "bastante bien: es un cumplido",
    example: "Ton gâteau n’est pas mal du tout !",
  },
  {
    word: "bof",
    fr: "ni bien ni mal, sans plaisir ; à l’oral",
    es: "ni bien ni mal, sin ganas; en la lengua hablada",
    example: "— Tu as aimé le film ? — Bof, il est un peu lent.",
  },
  {
    word: "pas terrible",
    fr: "pas bon, moins bien que prévu",
    es: "no es bueno, peor de lo que pensabas",
    example: "Le restaurant n’est pas terrible : les plats sont froids.",
  },
  {
    word: "mauvais",
    fr: "pas bon du tout, sur tous les sujets",
    es: "nada bueno, sobre cualquier tema",
    example: "Ce café est mauvais, il a un goût de brûlé.",
  },
  {
    word: "nul",
    fr: "très mauvais ; entre amis seulement",
    es: "muy malo; solo entre amigos",
    example: "Ce jeu est nul, on s’ennuie.",
  },
];

const SOFTENERS: Row[] = [
  {
    word: "un peu + adjectif",
    fr: "la critique devient plus douce",
    es: "la crítica se vuelve más suave",
    example: "La chambre est un peu petite.",
  },
  {
    word: "c’est bien, mais…",
    fr: "le positif d’abord, la critique ensuite",
    es: "primero lo positivo, después la crítica",
    example: "Ta présentation est bien, mais elle est un peu longue.",
  },
  {
    word: "tu crois ?",
    fr: "vous doutez, et vous posez une question",
    es: "dudas, y lo dices con una pregunta",
    example: "— Ce quartier est dangereux. — Tu crois ? Moi, j’habite ici, et tout va bien.",
  },
  {
    word: "pas vraiment",
    fr: "un non poli, plus doux que « non »",
    es: "un no educado y suave",
    example: "— Tu es d’accord ? — Pas vraiment.",
  },
  {
    word: "je ne suis pas tout à fait d’accord",
    fr: "vous acceptez une partie, pas tout",
    es: "aceptas una parte, no todo",
    example:
      "Je ne suis pas tout à fait d’accord : le prix est correct, mais le service est lent.",
  },
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function CritiqueTable({
  rows,
  lang,
  caption,
  heads,
}: {
  rows: Row[];
  lang: "fr" | "es";
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
          {rows.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td>{row[lang]}</td>
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

function OneReview() {
  return (
    <div className="example" lang="fr">
      J’ai mangé au nouveau restaurant de la place. Les plats sont{" "}
      <strong>trop</strong> salés et les frites ne sont{" "}
      <strong>pas assez</strong> cuites. En plus, <strong>il manque</strong>{" "}
      des desserts sur la carte. <strong>Le problème, c’est que</strong> le
      repas coûte trente euros !
    </div>
  );
}

function Blunt() {
  return (
    <div className="example" lang="fr">
      Ton exposé est nul. Il est trop long.
    </div>
  );
}

function Gentle() {
  return (
    <div className="example" lang="fr">
      Ton exposé est intéressant, mais il est un peu long.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Critiquer une chose</h2>

        <div className="rule">
          Une critique dit ce qui est en trop, ou ce qui manque.{" "}
          <span className="fr">trop</span> et{" "}
          <span className="fr">pas assez</span> se placent devant l’adjectif.
        </div>

        <CritiqueTable
          rows={CRITICISMS}
          lang="fr"
          caption="Cinq façons de dire qu’une chose ne va pas"
          heads={["Formule", "Quand l’employer", "Exemple"]}
        />

        <p>
          Voici un petit avis sur un restaurant, avec les quatre premières
          formules.
        </p>

        <OneReview />

        <div className="attention">
          Devant un nom, <span className="fr">trop</span> et{" "}
          <span className="fr">assez</span> prennent{" "}
          <span className="fr">de</span>, seul :{" "}
          <span className="fr">trop de bruit</span>,{" "}
          <span className="fr">pas assez de place</span>. On ne dit pas{" "}
          <s className="fr">trop du bruit</s>. La règle est dans{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Criticar una cosa</h2>

        <div className="rule">
          Una crítica dice lo que sobra o lo que falta. <Fr>trop</Fr> y{" "}
          <Fr>pas assez</Fr> van delante del adjetivo.
        </div>

        <CritiqueTable
          rows={CRITICISMS}
          lang="es"
          caption="Cinco maneras de decir que algo no va bien"
          heads={["Fórmula", "Cuándo usarla", "Ejemplo"]}
        />

        <p>
          Aquí tienes una pequeña opinión sobre un restaurante, con las cuatro
          primeras fórmulas.
        </p>

        <OneReview />

        <div className="attention">
          Delante de un nombre, <Fr>trop</Fr> y <Fr>assez</Fr> llevan{" "}
          <Fr>de</Fr>, solo: <Fr>trop de bruit</Fr>,{" "}
          <Fr>pas assez de place</Fr>. No se dice{" "}
          <s className="fr" lang="fr">
            trop du bruit
          </s>
          . La regla está en{" "}
          <Link href="/grammaire/les-articles-partitifs" lang="fr">
            Les articles partitifs
          </Link>
          .
        </div>
      </section>

      <section data-ui="fr">
        <h2>Du compliment à la critique</h2>

        <div className="rule">
          Ces cinq mots vont du plus gentil au plus dur.{" "}
          <span className="fr">bof</span> et <span className="fr">nul</span> se
          disent à l’oral, entre amis.
        </div>

        <CritiqueTable
          rows={SCALE}
          lang="fr"
          caption="Cinq jugements, de « pas mal » à « nul »"
          heads={["Mot", "Ce qu’il veut dire", "Exemple"]}
        />

        <p>
          <span className="fr">pas mal</span> a une négation, mais c’est une
          bonne note. Avec <span className="fr">du tout</span>, c’est même un
          vrai compliment.
        </p>

        <div className="attention">
          <span className="fr">pas terrible</span> n’est pas un compliment. Il
          veut dire : pas bon, moins bien que prévu.{" "}
          <span className="fr">
            Les photos ne sont pas terribles : on ne voit pas les visages.
          </span>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Del cumplido a la crítica</h2>

        <div className="rule">
          Estas cinco palabras van de la más amable a la más dura.{" "}
          <Fr>bof</Fr> y <Fr>nul</Fr> se dicen en la lengua hablada, entre
          amigos.
        </div>

        <CritiqueTable
          rows={SCALE}
          lang="es"
          caption={
            <>
              Cinco juicios, de « <span lang="fr">pas mal</span> » a «{" "}
              <span lang="fr">nul</span> »
            </>
          }
          heads={["Palabra", "Lo que quiere decir", "Ejemplo"]}
        />

        <p>
          <Fr>pas mal</Fr> lleva una negación, pero es una buena nota. Con{" "}
          <Fr>du tout</Fr>, es incluso un cumplido de verdad.
        </p>

        <div className="attention">
          <Fr>pas terrible</Fr> no es un cumplido. Quiere decir: no es bueno, es
          peor de lo que esperabas.{" "}
          <Fr>Les photos ne sont pas terribles : on ne voit pas les visages.</Fr>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Dire non avec douceur</h2>

        <div className="rule">
          Un petit mot rend la critique plus douce. Le désaccord aussi :{" "}
          <span className="fr">pas vraiment</span> est plus poli que{" "}
          <span className="fr">non</span>.
        </div>

        <CritiqueTable
          rows={SOFTENERS}
          lang="fr"
          caption="Cinq formules pour critiquer ou dire non sans blesser"
          heads={["Formule", "Ce qu’elle fait", "Exemple"]}
        />

        <p>Comparez. Cette critique est dure :</p>

        <Blunt />

        <p>Celle-ci dit la même chose, avec douceur :</p>

        <Gentle />

        <div className="attention">
          Critiquez la chose, pas la personne.{" "}
          <span className="fr">ton gâteau est un peu sec</span> est une
          critique ; <span className="fr">tu cuisines mal</span> blesse.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Decir que no con suavidad</h2>

        <div className="rule">
          Una palabra pequeña hace la crítica más suave. El desacuerdo también:{" "}
          <Fr>pas vraiment</Fr> es más educado que <Fr>non</Fr>.
        </div>

        <CritiqueTable
          rows={SOFTENERS}
          lang="es"
          caption="Cinco fórmulas para criticar o decir que no sin herir"
          heads={["Fórmula", "Lo que hace", "Ejemplo"]}
        />

        <p>Compara. Esta crítica es dura:</p>

        <Blunt />

        <p>Esta dice lo mismo, con suavidad:</p>

        <Gentle />

        <div className="attention">
          Critica la cosa, no a la persona. <Fr>ton gâteau est un peu sec</Fr>{" "}
          es una crítica; <Fr>tu cuisines mal</Fr> hace daño.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Une critique dit ce qui est en trop ou ce qui manque :{" "}
            <span className="fr">trop</span>,{" "}
            <span className="fr">pas assez</span>,{" "}
            <span className="fr">il manque</span>,{" "}
            <span className="fr">le problème, c’est que</span>.
          </li>
          <li>
            Devant un nom, <span className="fr">trop</span> et{" "}
            <span className="fr">assez</span> prennent{" "}
            <span className="fr">de</span> seul :{" "}
            <span className="fr">trop de bruit</span>.
          </li>
          <li>
            Du plus gentil au plus dur : <span className="fr">pas mal</span>,{" "}
            <span className="fr">bof</span>,{" "}
            <span className="fr">pas terrible</span>,{" "}
            <span className="fr">mauvais</span>,{" "}
            <span className="fr">nul</span>.
          </li>
          <li>
            <span className="fr">pas mal</span> est une bonne note ;{" "}
            <span className="fr">pas terrible</span> est une critique.
          </li>
          <li>
            Pour adoucir : <span className="fr">un peu</span>,{" "}
            <span className="fr">c’est bien, mais…</span>,{" "}
            <span className="fr">tu crois ?</span>,{" "}
            <span className="fr">pas vraiment</span>,{" "}
            <span className="fr">pas tout à fait d’accord</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Una crítica dice lo que sobra o lo que falta: <Fr>trop</Fr>,{" "}
            <Fr>pas assez</Fr>, <Fr>il manque</Fr>,{" "}
            <Fr>le problème, c’est que</Fr>.
          </li>
          <li>
            Delante de un nombre, <Fr>trop</Fr> y <Fr>assez</Fr> llevan{" "}
            <Fr>de</Fr> solo: <Fr>trop de bruit</Fr>.
          </li>
          <li>
            De lo más amable a lo más duro: <Fr>pas mal</Fr>, <Fr>bof</Fr>,{" "}
            <Fr>pas terrible</Fr>, <Fr>mauvais</Fr>, <Fr>nul</Fr>.
          </li>
          <li>
            <Fr>pas mal</Fr> es una buena nota; <Fr>pas terrible</Fr> es una
            crítica.
          </li>
          <li>
            Para suavizar: <Fr>un peu</Fr>, <Fr>c’est bien, mais…</Fr>,{" "}
            <Fr>tu crois ?</Fr>, <Fr>pas vraiment</Fr>,{" "}
            <Fr>pas tout à fait d’accord</Fr>.
          </li>
        </ul>
      </div>
    </article>
  );
}
