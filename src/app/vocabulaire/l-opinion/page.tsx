import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/l-opinion";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (formulas, examples) is written once, below, and shared; the middle column,
   which explains, is written in each language. */

type Row = { word: string; fr: string; es: string; example: string };

const FORMULAS: Row[] = [
  {
    word: "à mon avis",
    fr: "au début de la phrase, pour annoncer votre idée",
    es: "al principio de la frase, para anunciar tu idea",
    example: "À mon avis, le train est plus pratique.",
  },
  {
    word: "je pense que",
    fr: "pour donner une idée, sur tous les sujets",
    es: "para dar una idea, sobre cualquier tema",
    example: "Je pense que c’est une bonne idée.",
  },
  {
    word: "je trouve que",
    fr: "pour juger une chose que vous avez vue, lue ou goûtée",
    es: "para juzgar algo que has visto, leído o probado",
    example: "Je trouve que ce film est trop long.",
  },
  {
    word: "je crois que",
    fr: "quand vous n’êtes pas tout à fait sûr",
    es: "cuando no estás del todo seguro",
    example: "Je crois que le musée est fermé le lundi.",
  },
];

const REPLIES: Row[] = [
  {
    word: "je suis d’accord",
    fr: "vous pensez la même chose",
    es: "piensas lo mismo",
    example: "Je suis d’accord avec toi : c’est trop cher.",
  },
  {
    word: "tu as raison",
    fr: "ce que l’autre dit est juste",
    es: "lo que dice el otro es correcto",
    example: "Tu as raison, il faut réserver.",
  },
  {
    word: "c’est vrai, mais…",
    fr: "vous acceptez une partie, puis vous ajoutez votre idée",
    es: "aceptas una parte y luego añades tu idea",
    example: "C’est vrai, mais le train coûte plus cher.",
  },
  {
    word: "ça dépend",
    fr: "la réponse change avec la situation",
    es: "la respuesta cambia según la situación",
    example: "Ça dépend du prix.",
  },
  {
    word: "je ne suis pas d’accord",
    fr: "vous pensez autre chose",
    es: "piensas otra cosa",
    example: "Je ne suis pas d’accord : le bus est plus rapide.",
  },
  {
    word: "tu as tort",
    fr: "ce que l’autre dit est faux",
    es: "lo que dice el otro no es cierto",
    example: "Tu as tort : le musée est ouvert le dimanche.",
  },
];

const LINKERS: Row[] = [
  {
    word: "par exemple",
    fr: "un cas précis",
    es: "un caso concreto",
    example: "Le train est pratique. Par exemple, je peux lire pendant le voyage.",
  },
  {
    word: "en plus",
    fr: "une deuxième raison",
    es: "una segunda razón",
    example: "C’est loin. En plus, il n’y a pas de bus.",
  },
  {
    word: "surtout",
    fr: "la raison la plus importante",
    es: "la razón más importante",
    example: "J’aime cette ville, surtout pour ses marchés.",
  },
  {
    word: "en général",
    fr: "une chose vraie presque toujours",
    es: "algo que es cierto casi siempre",
    example: "En général, je préfère voyager en train.",
  },
  {
    word: "bref",
    fr: "la fin de l’avis, en quelques mots, à l’oral",
    es: "el final de la opinión, en pocas palabras, en la lengua hablada",
    example: "Bref, je préfère le train.",
  },
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function OpinionTable({
  rows,
  lang,
  caption,
  heads,
}: {
  rows: Row[];
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

function NegativeExample() {
  return (
    <div className="example" lang="fr">
      Je pense que ce <strong>n’</strong>est <strong>pas</strong> une bonne
      idée. · Je trouve que ce restaurant <strong>n’</strong>est{" "}
      <strong>pas</strong> cher.
    </div>
  );
}

function FullOpinion() {
  return (
    <div className="example" lang="fr">
      <strong>À mon avis</strong>, la vie est plus agréable dans une petite
      ville, parce que tout est près. <strong>Par exemple</strong>, je vais au
      travail à pied. <strong>En plus</strong>, les appartements sont moins
      chers. <strong>C’est vrai</strong>, il y a moins de cinémas et de
      concerts, <strong>mais</strong> je préfère le calme.{" "}
      <strong>Bref</strong>, je ne veux pas habiter dans une grande ville.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Dire ce qu’on pense</h2>

        <div className="rule">
          Un avis commence par une petite formule. Après{" "}
          <span className="fr">que</span>, la phrase reste une phrase normale :{" "}
          <span className="fr">je pense que c’est cher</span>.
        </div>

        <OpinionTable
          rows={FORMULAS}
          lang="fr"
          caption="Quatre formules, et ce que chacune dit de votre avis"
          heads={["Formule", "Quand l’employer", "Exemple"]}
        />

        <p>
          Vous connaissez <span className="fr">trouver</span> pour un objet
          perdu : <span className="fr">j’ai trouvé mes clés</span>. Avec{" "}
          <span className="fr">que</span>, le verbe donne un avis.
        </p>

        <div className="attention">
          On dit plutôt <span className="fr">à mon avis</span> que{" "}
          <span className="fr">dans mon opinion</span>. Le mot{" "}
          <span className="fr">opinion</span> existe, mais pas dans cette
          formule.
        </div>

        <p>
          Pour dire le contraire, gardez{" "}
          <span className="fr">je pense que</span> et mettez la négation dans la
          suite de la phrase. C’est la forme la plus simple.
        </p>

        <NegativeExample />
      </section>

      <section data-ui="es" lang="es">
        <h2>Decir lo que piensas</h2>

        <div className="rule">
          Una opinión empieza con una pequeña fórmula. Después de{" "}
          <Fr>que</Fr>, la frase sigue siendo una frase normal:{" "}
          <Fr>je pense que c’est cher</Fr>.
        </div>

        <OpinionTable
          rows={FORMULAS}
          lang="es"
          caption="Cuatro fórmulas, y lo que cada una dice de tu opinión"
          heads={["Fórmula", "Cuándo usarla", "Ejemplo"]}
        />

        <p>
          Ya conoces <Fr>trouver</Fr> para un objeto perdido:{" "}
          <Fr>j’ai trouvé mes clés</Fr>. Con <Fr>que</Fr>, el verbo da una
          opinión.
        </p>

        <div className="attention">
          Se dice más bien <Fr>à mon avis</Fr> que{" "}
          <Fr>dans mon opinion</Fr>. La palabra <Fr>opinion</Fr> existe, pero no en esta fórmula.
        </div>

        <p>
          Para decir lo contrario, conserva <Fr>je pense que</Fr> y pon la
          negación en el resto de la frase. Es la forma más sencilla.
        </p>

        <NegativeExample />
      </section>

      <section data-ui="fr">
        <h2>Répondre à l’avis de l’autre</h2>

        <div className="rule">
          <span className="fr">d’accord</span> va avec le verbe{" "}
          <span className="fr">être</span>.{" "}
          <span className="fr">raison</span> et{" "}
          <span className="fr">tort</span> vont avec le verbe{" "}
          <span className="fr">avoir</span>.
        </div>

        <OpinionTable
          rows={REPLIES}
          lang="fr"
          caption="Six réponses à l’avis de quelqu’un, du oui au non"
          heads={["Réponse", "Ce qu’elle veut dire", "Exemple"]}
        />

        <p>
          <span className="fr">ça dépend</span> garde toujours son{" "}
          <span className="fr">ça</span>. On dit{" "}
          <span className="fr">ça dépend du prix</span>, on ne dit pas{" "}
          <s className="fr">dépend du prix</s>.
        </p>

        <div className="attention">
          <span className="fr">discuter</span>, c’est parler ensemble d’un
          sujet, calmement :{" "}
          <span className="fr">on a discuté du film pendant une heure</span>.
          Quand deux personnes se fâchent, elles{" "}
          <span className="fr">se disputent</span>. Une{" "}
          <span className="fr">discussion</span> entre amis est donc un bon
          moment.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Responder a la opinión del otro</h2>

        <div className="rule">
          <Fr>d’accord</Fr> va con el verbo <Fr>être</Fr>. <Fr>raison</Fr> y{" "}
          <Fr>tort</Fr> van con el verbo <Fr>avoir</Fr>.
        </div>

        <OpinionTable
          rows={REPLIES}
          lang="es"
          caption="Seis respuestas a la opinión de alguien, del sí al no"
          heads={["Respuesta", "Lo que quiere decir", "Ejemplo"]}
        />

        <p>
          <Fr>ça dépend</Fr> conserva siempre su <Fr>ça</Fr>. Se dice{" "}
          <Fr>ça dépend du prix</Fr>; no se dice{" "}
          <s className="fr" lang="fr">
            dépend du prix
          </s>
          .
        </p>

        <div className="attention">
          <Fr>discuter</Fr> es hablar juntos de un tema, con calma:{" "}
          <Fr>on a discuté du film pendant une heure</Fr>. Cuando dos personas
          se enfadan, <Fr>se disputent</Fr>. Una <Fr>discussion</Fr> entre
          amigos es, por tanto, un buen momento.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Aller plus loin qu’une phrase</h2>

        <p>
          Un avis seul est court. Pour le développer, on donne une raison, puis
          un exemple. Les mots de la raison,{" "}
          <span className="fr">parce que</span> et{" "}
          <span className="fr">donc</span>, sont dans{" "}
          <Link href="/grammaire/les-connecteurs">Les connecteurs</Link>. En
          voici cinq autres.
        </p>

        <OpinionTable
          rows={LINKERS}
          lang="fr"
          caption="Cinq mots pour développer un avis, puis le fermer"
          heads={["Mot", "Ce qu’il annonce", "Exemple"]}
        />

        <p>Voici un avis complet : l’idée, une raison, un exemple, la fin.</p>

        <FullOpinion />

        <div className="astuce">
          <p className="astuce-hook">Pourquoi ? Par exemple ?</p>
          <p>
            Quand vous ne savez pas comment continuer, posez-vous ces deux
            questions. Chaque réponse vous donne une phrase de plus.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Ir más allá de una frase</h2>

        <p>
          Una opinión sola es corta. Para desarrollarla, se da una razón y luego
          un ejemplo. Las palabras de la razón, <Fr>parce que</Fr> y{" "}
          <Fr>donc</Fr>, están en{" "}
          <Link href="/grammaire/les-connecteurs" lang="fr">
            Les connecteurs
          </Link>
          . Aquí van cinco más.
        </p>

        <OpinionTable
          rows={LINKERS}
          lang="es"
          caption="Cinco palabras para desarrollar una opinión y luego cerrarla"
          heads={["Palabra", "Lo que anuncia", "Ejemplo"]}
        />

        <p>
          Aquí tienes una opinión completa: la idea, una razón, un ejemplo, el
          final.
        </p>

        <FullOpinion />

        <div className="astuce">
          <p className="astuce-hook">Dos preguntas para seguir hablando</p>
          <p>
            Cuando no sepas cómo continuar, hazte estas dos preguntas:{" "}
            <Fr>Pourquoi ?</Fr> y <Fr>Par exemple ?</Fr> Cada respuesta te da
            una frase más.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Un avis commence par <span className="fr">à mon avis</span>,{" "}
            <span className="fr">je pense que</span>,{" "}
            <span className="fr">je trouve que</span> ou{" "}
            <span className="fr">je crois que</span>.
          </li>
          <li>
            On dit plutôt <span className="fr">à mon avis</span> que{" "}
            <span className="fr">dans mon opinion</span>, et la négation
            se place après <span className="fr">que</span>.
          </li>
          <li>
            <span className="fr">être d’accord</span>, mais{" "}
            <span className="fr">avoir raison</span> et{" "}
            <span className="fr">avoir tort</span> ;{" "}
            <span className="fr">ça dépend</span> garde son{" "}
            <span className="fr">ça</span>.
          </li>
          <li>
            <span className="fr">discuter</span>, c’est parler ensemble ;{" "}
            <span className="fr">se disputer</span>, c’est se fâcher.
          </li>
          <li>
            <span className="fr">par exemple</span>,{" "}
            <span className="fr">en plus</span>,{" "}
            <span className="fr">surtout</span> et{" "}
            <span className="fr">en général</span> développent un avis ;{" "}
            <span className="fr">bref</span> le ferme.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Una opinión empieza con <Fr>à mon avis</Fr>, <Fr>je pense que</Fr>,{" "}
            <Fr>je trouve que</Fr> o <Fr>je crois que</Fr>.
          </li>
          <li>
            Se dice más bien <Fr>à mon avis</Fr> que{" "}
            <Fr>dans mon opinion</Fr>, y la negación va después de <Fr>que</Fr>.
          </li>
          <li>
            <Fr>être d’accord</Fr>, pero <Fr>avoir raison</Fr> y{" "}
            <Fr>avoir tort</Fr>; <Fr>ça dépend</Fr> conserva su <Fr>ça</Fr>.
          </li>
          <li>
            <Fr>discuter</Fr> es hablar juntos; <Fr>se disputer</Fr> es
            enfadarse.
          </li>
          <li>
            <Fr>par exemple</Fr>, <Fr>en plus</Fr>, <Fr>surtout</Fr> y{" "}
            <Fr>en général</Fr> desarrollan una opinión; <Fr>bref</Fr> la
            cierra.
          </li>
        </ul>
      </div>
    </article>
  );
}
