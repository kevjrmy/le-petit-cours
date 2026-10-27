import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/se-presenter";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French with a Spanish gloss (A1, #85),
   written once and shared. */
const Fr = ({ children }: { children: ReactNode }) => (
  <span className="fr" lang="fr">
    {children}
  </span>
);

const WORDS: { fr: ReactNode; es: ReactNode }[] = [
  { fr: "bonjour", es: "hola" },
  { fr: "bonsoir", es: "buenas tardes, buenas noches" },
  { fr: "salut", es: "hola, entre amigos" },
  { fr: "je m’appelle", es: "me llamo" },
  {
    fr: (
      <>
        <Fr>il s’appelle</Fr> / <Fr>elle s’appelle</Fr>
      </>
    ),
    es: "se llama",
  },
  { fr: "comment vous appelez-vous ?", es: "¿cómo se llama?" },
  {
    fr: "enchanté",
    es: (
      <>
        encantado; una mujer dice <Fr>enchantée</Fr>
      </>
    ),
  },
  { fr: "vous pouvez répéter ?", es: "¿puede repetir?" },
  { fr: "vous pouvez épeler ?", es: "¿puede deletrear?" },
  { fr: "plus lentement", es: "más despacio" },
  { fr: "je ne comprends pas", es: "no entiendo" },
  { fr: "je viens de", es: "vengo de" },
  { fr: "j’habite à", es: "vivo en" },
  {
    fr: "je suis espagnol",
    es: (
      <>
        soy español; <Fr>espagnole</Fr> si eres mujer
      </>
    ),
  },
  { fr: "je parle un peu français", es: "hablo un poco de francés" },
  { fr: "j’ai vingt ans", es: "tengo veinte años" },
  {
    fr: "je suis étudiant",
    es: (
      <>
        soy estudiante; <Fr>étudiante</Fr> si eres mujer
      </>
    ),
  },
  { fr: "je suis professeur", es: "soy profesor o profesora" },
  { fr: "je travaille dans", es: "trabajo en" },
  { fr: "voici", es: "este es, esta es" },
  { fr: "et vous ?", es: "¿y usted?" },
  { fr: "merci beaucoup", es: "muchas gracias" },
  { fr: "au revoir", es: "adiós" },
  { fr: "à bientôt", es: "hasta pronto" },
  { fr: "bonne journée", es: "que tengas un buen día" },
];

function Mots() {
  return (
    <ul className="mots">
      {WORDS.map((w, i) => (
        <li key={i}>
          {/* A pair of forms brings its own spans, the slash between them plain. */}
          {typeof w.fr === "string" ? <Fr>{w.fr}</Fr> : w.fr} (<span lang="es">{w.es}</span>)
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>La situation</h2>

        <p>
          Vous rencontrez quelqu’un pour la première fois : en classe, chez un
          voisin ou le premier jour de travail. Une autre personne joue ce rôle.
          Vous devez dire qui vous êtes, comprendre qui est l’autre et demander
          de l’aide quand vous ne comprenez pas. C’est la première conversation
          en français, et la plus fréquente.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>

        <p>
          Conoces a alguien por primera vez: en clase, en casa de un vecino o en
          tu primer día de trabajo. Otra persona hace ese papel. Tienes que
          decir quién eres, entender quién es y pedir ayuda cuando no entiendas.
          Es la primera conversación que se tiene en francés, y la más
          frecuente.
        </p>

        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Une présentation suit presque toujours le même ordre. À chaque étape,
          vous dites une phrase que personne ne peut dire à votre place.
        </p>

        <ol>
          <li>Dites bonjour et votre nom.</li>
          <li>
            Demandez le nom de l’autre personne. Demandez de répéter ou
            d’épeler.
          </li>
          <li>Dites d’où vous êtes et où vous habitez.</li>
          <li>Dites votre âge et votre métier, ou ce que vous étudiez.</li>
          <li>Dites merci et au revoir.</li>
        </ol>

        <div className="attention">
          <p>
            Pour dire votre nom, on dit <Fr>je m’appelle</Fr>. On ne dit pas{" "}
            <s className="fr">je suis appelle</s>. Pour l’âge, on utilise le
            verbe <Fr>avoir</Fr> (<span lang="es">tener</span>) :{" "}
            <Fr>j’ai vingt-cinq ans</Fr> (
            <span lang="es">tengo veinticinco años</span>). On n’oublie jamais
            le mot <Fr>ans</Fr>. On ne dit pas{" "}
            <s className="fr">je suis vingt-cinq</s> ni{" "}
            <s className="fr">j’ai vingt-cinq</s>.
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            La question courte est celle que vous allez entendre.
          </p>
          <p>
            Dans un livre, la question s’écrit <Fr>D’où venez-vous ?</Fr>. Dans
            la rue, on vous dit <Fr>Vous êtes d’où ?</Fr>, et une personne de
            votre âge dit <Fr>Tu es d’où ?</Fr>. Les trois questions veulent
            dire la même chose. Apprenez la courte pour comprendre et la longue
            pour écrire.
          </p>
          <p>
            Dites <Fr>vous</Fr> à une personne que vous ne connaissez pas, à une
            personne âgée ou à quelqu’un qui vous sert (un vendeur, un
            professeur). Dites <Fr>tu</Fr> à des amis, à la famille, aux enfants
            et à la personne qui vous dit <Fr>tu</Fr>. Et <Fr>vous</Fr> est
            aussi le pluriel : <span lang="es">« vosotros », « ustedes »</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Los pasos</h2>

        <p>
          Una presentación sigue casi siempre el mismo orden. En cada paso
          tienes que decir una frase que solo tú puedes producir.
        </p>

        <ol>
          <li>Saluda y di tu nombre.</li>
          <li>
            Pregunta cómo se llama la otra persona. Pide que repita o que
            deletree.
          </li>
          <li>Di de dónde eres y dónde vives.</li>
          <li>Di tu edad y tu profesión, o lo que estudias.</li>
          <li>Da las gracias y despídete.</li>
        </ol>

        <div className="attention">
          <p>
            Para dar tu nombre se dice <Fr>je m’appelle</Fr>. No se dice{" "}
            <s className="fr" lang="fr">
              je suis appelle
            </s>
            . Para la edad se usa el verbo <Fr>avoir</Fr> (tener):{" "}
            <Fr>j’ai vingt-cinq ans</Fr> (tengo veinticinco años). La palabra{" "}
            <Fr>ans</Fr> no se omite nunca. No se dice{" "}
            <s className="fr" lang="fr">
              je suis vingt-cinq
            </s>{" "}
            ni{" "}
            <s className="fr" lang="fr">
              j’ai vingt-cinq
            </s>
            .
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">La pregunta corta es la que oirás.</p>
          <p>
            En un libro, la pregunta se escribe <Fr>D’où venez-vous ?</Fr>. En
            la calle te dirán <Fr>Vous êtes d’où ?</Fr>, y a alguien de tu edad{" "}
            <Fr>Tu es d’où ?</Fr>. Las tres preguntan lo mismo. Aprende la corta
            para entender y la larga para escribir.
          </p>
          <p>
            Usa <Fr>vous</Fr> con alguien que no conoces, con una persona mayor
            o con quien te atiende (un dependiente, un profesor). Usa <Fr>tu</Fr>{" "}
            con amigos, familia, niños y con quien te habla de <Fr>tu</Fr>. Y{" "}
            <Fr>vous</Fr> es también el plural: «vosotros», «ustedes».
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          Avec ces mots, vous pouvez tenir la conversation du début à la fin.
          Prenez ce qui vous sert, laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>

        <p>
          Con esto puedes sostener la conversación de principio a fin. Coge lo
          que te sirva y deja el resto.
        </p>

        <Mots />
      </section>
    </article>
  );
}
