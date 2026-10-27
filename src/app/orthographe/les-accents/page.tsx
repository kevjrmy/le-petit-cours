import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-accents";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function W({ children }: { children: ReactNode }) {
  return (
    <s className="fr" lang="fr">
      {children}
    </s>
  );
}

const SIGNS: { sign: string; example: string; name: Record<Lang, string>; letters: Record<Lang, ReactNode> }[] = [
  {
    sign: "é",
    example: "février",
    name: { fr: "l’accent aigu", es: "el acento agudo" },
    letters: {
      fr: <>sur le <F>e</F> seulement</>,
      es: <>solo sobre la <F>e</F></>,
    },
  },
  {
    sign: "è à ù",
    example: "père · là · où",
    name: { fr: "l’accent grave", es: "el acento grave" },
    letters: {
      fr: <>sur <F>e</F>, <F>a</F>, <F>u</F></>,
      es: <>sobre <F>e</F>, <F>a</F>, <F>u</F></>,
    },
  },
  {
    sign: "ê â î ô û",
    example: "même · hôpital · août",
    name: { fr: "l’accent circonflexe", es: "el acento circunflejo" },
    letters: { fr: <>sur les cinq voyelles</>, es: <>sobre las cinco vocales</> },
  },
  {
    sign: "ë ï ü",
    example: "Noël · maïs",
    name: { fr: "le tréma", es: "la diéresis" },
    letters: {
      fr: <>sur <F>e</F>, <F>i</F>, <F>u</F></>,
      es: <>sobre <F>e</F>, <F>i</F>, <F>u</F></>,
    },
  },
  {
    sign: "ç",
    example: "français",
    name: { fr: "la cédille", es: "la cedilla" },
    letters: {
      fr: <>sous le <F>c</F> seulement</>,
      es: <>solo debajo de la <F>c</F></>,
    },
  },
];

const SIGN_HEADS: Record<Lang, string[]> = {
  fr: ["Signe", "Son nom", "Sur quelles lettres", "Exemple"],
  es: ["Signo", "Su nombre", "En qué letras", "Ejemplo"],
};

function SignsTable({ lang, caption }: { lang: Lang; caption: string }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {SIGN_HEADS[lang].map((head) => (
              <th key={head} scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIGNS.map((row) => (
            <tr key={row.sign}>
              <th scope="row" className="fr" lang="fr">
                {row.sign}
              </th>
              <td>{row.name[lang]}</td>
              <td>{row.letters[lang]}</td>
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

function VowelExample() {
  return (
    <div className="example" lang="fr">
      <span className="fr">é</span> : café · école · vous avez parlé
      <br />
      <span className="fr">è ê</span> : père · après · tête · fenêtre
    </div>
  );
}

const E_ROWS = [
  { write: "é", examples: "le marché · l’année · il a mangé" },
  { write: "è", examples: "le père · la règle · la lèvre · après · très" },
  { write: null, examples: "elle · cette · la mer · avec" },
];

const E_WHEN: Record<Lang, string[]> = {
  fr: [
    "en fin de mot, suivi au plus d’un e ou d’un s muet (sauf -ès)",
    "suivi d’une consonne, ou d’une consonne + l ou r, puis d’un e muet ; et aussi -ès en fin de mot",
    "suivi de deux consonnes, ou fermant le mot",
  ],
  es: [
    "al final de la palabra, seguida como mucho de una e o una s mudas (salvo -ès)",
    "seguida de una consonante, o de una consonante + l o r, y luego de una e muda; y también -ès al final de la palabra",
    "seguida de dos consonantes, o cerrando la palabra",
  ],
};

function ETable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Si le e est…", "On écrit", "Exemples"]
      : ["Si la e está…", "Se escribe", "Ejemplos"];
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
          {E_ROWS.map((row, i) => (
            <tr key={i}>
              <th scope="row">{E_WHEN[lang][i]}</th>
              {row.write ? (
                <td className="fr" lang="fr">
                  {row.write}
                </td>
              ) : (
                <td>{lang === "fr" ? "rien" : "nada"}</td>
              )}
              <td className="fr" lang="fr">
                {row.examples}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const C_ROWS = [
  { before: "e, i", write: "c", sound: "s", examples: "le cinéma · douce" },
  { before: "a, o, u", write: "ç", sound: "s", examples: "français · un garçon · il a reçu" },
  { before: "a, o, u", write: "c", sound: "k", examples: "le café · l’école · écouter" },
];

function CTable({ lang, caption }: { lang: Lang; caption: string }) {
  const heads =
    lang === "fr"
      ? ["Devant", "On écrit", "Se prononce", "Exemples"]
      : ["Delante de", "Se escribe", "Suena", "Ejemplos"];
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
          {C_ROWS.map((row, i) => (
            <tr key={i}>
              <th scope="row" className="fr" lang="fr">
                {row.before}
              </th>
              <td className="fr" lang="fr">
                {row.write}
              </td>
              <td className="fr" lang="fr">
                {row.sound}
              </td>
              <td className="fr" lang="fr">
                {row.examples}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CedillaExample() {
  return (
    <div className="example" lang="fr">
      nous commen<strong>ç</strong>ons · mais nous commen<strong>c</strong>
      ions
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Ce qu’un accent français fait, et ne fait pas</h2>

        <div className="rule">
          L’accent français ne dit <strong>jamais</strong> où tombe la syllabe
          forte. Il fait l’un de trois métiers : il{" "}
          <strong>change le son</strong> de la voyelle, il{" "}
          <strong>sépare deux mots</strong> qui s’écriraient pareil, ou il ne
          s’entend pas du tout.
        </div>

        <p>
          C’est pour cela qu’on ne peut pas placer un accent à l’oreille, en
          cherchant l’endroit où l’on appuie. En français, on appuie toujours
          sur la fin du mot, et cela ne s’écrit nulle part.
        </p>

        <SignsTable
          lang="fr"
          caption="Les cinq signes, et les lettres sur lesquelles chacun peut se poser"
        />

        <p>
          Le tréma dit une seule chose : les deux voyelles se prononcent{" "}
          <strong>séparément</strong>. <F>Noël</F> se dit en deux temps,{" "}
          <F>maïs</F> aussi. Sans le tréma, la première voyelle serait avalée par
          la seconde.
        </p>

        <div className="attention">
          Un accent fait partie du mot, au même titre qu’une lettre. Écrire{" "}
          <W>eleve</W> pour <F>élève</F> n’est pas une frappe manquée, c’est une
          faute d’orthographe. Et <F>ou</F> et <F>où</F> ne sont pas le même mot
          : les tests qui les séparent sont sur <F>Les homophones</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Lo que hace un acento francés, y lo que no hace</h2>

        <div className="rule">
          El acento francés <strong>nunca</strong> indica dónde cae la sílaba
          fuerte. Hace uno de tres trabajos: <strong>cambia el sonido</strong> de
          la vocal, <strong>separa dos palabras</strong> que se escribirían
          igual, o no se oye en absoluto.
        </div>

        <p>
          Por eso no se puede poner un acento de oído, buscando el lugar donde se
          apoya la voz. En francés la voz se apoya siempre en el final de la
          palabra, y eso no se escribe en ningún sitio.
        </p>

        <SignsTable
          lang="es"
          caption="Los cinco signos, y las letras sobre las que puede ir cada uno"
        />

        <p>
          La diéresis dice una sola cosa: las dos vocales se pronuncian{" "}
          <strong>por separado</strong>. <F>Noël</F> se dice en dos tiempos,{" "}
          <F>maïs</F> también. Sin la diéresis, la primera vocal quedaría
          absorbida por la segunda.
        </p>

        <div className="attention">
          Un acento forma parte de la palabra, igual que una letra. Escribir{" "}
          <W>eleve</W> en lugar de <F>élève</F> no es un despiste al teclear, es
          una falta de ortografía. Y <F>ou</F> y <F>où</F> no son la misma
          palabra: los tests que las separan están en <F>Les homophones</F>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Sur le e : é, è, ou rien du tout</h2>

        <div className="rule">
          C’est le métier le plus important, et le seul qui s’entende. Sur le{" "}
          <F>e</F>, l’accent décide de la bouche : presque fermée pour <F>é</F>,
          nettement ouverte pour <F>è</F> et <F>ê</F>.
        </div>

        <VowelExample />

        <p>
          Le son ne suffit pourtant pas à choisir, parce que le même son ouvert
          s’écrit tantôt avec un accent, tantôt sans. Trois repères suffisent, et
          ils regardent ce qui suit le <F>e</F>.
        </p>

        <ETable lang="fr" caption="Ce qui suit le e décide de l’accent qu’il porte" />

        <div className="exception">
          La troisième ligne est le vrai piège. <F>mer</F>, <F>elle</F> et{" "}
          <F>avec</F> se prononcent avec le son ouvert, exactement comme{" "}
          <F>père</F>, et pourtant ils ne portent aucun accent. On n’écrit
          jamais <W>mèr</W> ni <W>èlle</W>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un mot peut porter les deux, dans cet ordre.
          </p>
          <p>
            <F>l’élève</F> commence par un <F>é</F> fermé et finit par un{" "}
            <F>è</F> ouvert. Lisez le mot lentement et vous entendrez les deux
            bouches. C’est le meilleur mot à garder en tête pour vérifier que
            vous entendez la différence.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Sobre la e: é, è o nada</h2>

        <div className="rule">
          Es el trabajo más importante, y el único que se oye. Sobre la{" "}
          <F>e</F>, el acento decide la boca: casi cerrada para <F>é</F>,
          claramente abierta para <F>è</F> y <F>ê</F>.
        </div>

        <VowelExample />

        <p>
          Pero el sonido no basta para elegir, porque el mismo sonido abierto se
          escribe unas veces con acento y otras sin él. Bastan tres referencias,
          y todas miran lo que sigue a la <F>e</F>.
        </p>

        <ETable lang="es" caption="Lo que sigue a la e decide el acento que lleva" />

        <div className="exception">
          La tercera fila es la verdadera trampa. <F>mer</F>, <F>elle</F> y{" "}
          <F>avec</F> se pronuncian con el sonido abierto, exactamente como{" "}
          <F>père</F>, y sin embargo no llevan ningún acento. Nunca se escribe{" "}
          <W>mèr</W> ni <W>èlle</W>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Una palabra puede llevar los dos, en este orden.
          </p>
          <p>
            <F>l’élève</F> empieza con una <F>é</F> cerrada y termina con una{" "}
            <F>è</F> abierta. Lee la palabra despacio y oirás las dos bocas. Es
            la mejor palabra para comprobar que oyes la diferencia.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>La cédille</h2>

        <div className="rule">
          Le <F>c</F> se prononce comme un <F>s</F> devant <F>e</F> et <F>i</F>,
          et comme un <F>k</F> devant <F>a</F>, <F>o</F> et <F>u</F>. La cédille
          sert à garder le son <F>s</F> devant ces trois voyelles-là.
        </div>

        <CTable
          lang="fr"
          caption="Quand le c suffit et quand il faut lui mettre une cédille"
        />

        <div className="exception">
          Jamais de cédille devant <F>e</F> ni <F>i</F>. Le <F>c</F> y est déjà
          doux, la cédille n’aurait rien à y faire : on écrit <F>ce</F>,{" "}
          <F>ci</F>, <F>cinéma</F>, et jamais <W>çe</W> ni <W>çi</W>.
        </div>

        <CedillaExample />

        <div className="attention">
          La cédille ne se tape pas sur un clavier espagnol, et <F>œ</F> non
          plus. Ce n’est pas une raison pour les laisser tomber :{" "}
          <W>francais</W> et <W>soeur</W> sont des fautes. Copiez le caractère,
          ou passez le clavier en français le temps d’écrire.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>La cedilla</h2>

        <div className="rule">
          La <F>c</F> suena como una <F>s</F> delante de <F>e</F> e <F>i</F>, y
          como una <F>k</F> delante de <F>a</F>, <F>o</F> y <F>u</F>. La cedilla
          sirve para mantener el sonido <F>s</F> delante de esas tres vocales.
        </div>

        <CTable
          lang="es"
          caption="Cuándo basta la c y cuándo hay que ponerle cedilla"
        />

        <div className="exception">
          Nunca hay cedilla delante de <F>e</F> ni de <F>i</F>. La <F>c</F> ya es
          suave ahí y la cedilla no tendría nada que hacer: se escribe{" "}
          <F>ce</F>, <F>ci</F>, <F>cinéma</F>, y nunca <W>çe</W> ni <W>çi</W>.
        </div>

        <CedillaExample />

        <div className="attention">
          La cedilla no se escribe con un teclado español, y la <F>œ</F> tampoco.
          No es una razón para dejarlas: <W>francais</W> y <W>soeur</W> son
          faltas. Copia el carácter, o pon el teclado en francés mientras
          escribes.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            L’accent français ne marque pas la syllabe forte : il change le son,
            il sépare deux mots, ou il ne s’entend pas.
          </li>
          <li>
            Cinq signes : <F>é</F> aigu, <F>è à ù</F> grave, <F>ê â î ô û</F>{" "}
            circonflexe, <F>ë ï ü</F> tréma, <F>ç</F> cédille.
          </li>
          <li>
            Sur le <F>e</F>, c’est ce qui suit qui décide : <F>é</F> en fin de
            mot, <F>è</F> devant consonne plus <F>e</F> muet (et en <F>-ès</F>
            final), rien devant deux consonnes.
          </li>
          <li>
            <F>mer</F>, <F>elle</F>, <F>avec</F> sonnent ouvert et ne prennent
            pourtant aucun accent.
          </li>
          <li>
            La cédille garde le son <F>s</F> devant <F>a</F>, <F>o</F>,{" "}
            <F>u</F>, et ne s’écrit jamais devant <F>e</F> ni <F>i</F>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El acento francés no marca la sílaba fuerte: cambia el sonido,
            separa dos palabras, o no se oye.
          </li>
          <li>
            Cinco signos: <F>é</F> agudo, <F>è à ù</F> grave, <F>ê â î ô û</F>{" "}
            circunflejo, <F>ë ï ü</F> diéresis, <F>ç</F> cedilla.
          </li>
          <li>
            Sobre la <F>e</F>, decide lo que sigue: <F>é</F> al final de la
            palabra, <F>è</F> delante de consonante más <F>e</F> muda (y en{" "}
            <F>-ès</F> final), nada delante de dos consonantes.
          </li>
          <li>
            <F>mer</F>, <F>elle</F>, <F>avec</F> suenan abiertas y, sin embargo,
            no llevan ningún acento.
          </li>
          <li>
            La cedilla mantiene el sonido <F>s</F> delante de <F>a</F>, <F>o</F>,{" "}
            <F>u</F>, y nunca se escribe delante de <F>e</F> ni de <F>i</F>.
          </li>
        </ul>
      </div>
    </article>
  );
}
