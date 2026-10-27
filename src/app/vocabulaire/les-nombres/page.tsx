import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-nombres";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (tables, examples) is written once, below, and shared; captions and column
   heads are passed in each language. */

type Ui = "fr" | "es";

const SMALL: [string, string][] = [
  ["1", "un"],
  ["2", "deux"],
  ["3", "trois"],
  ["4", "quatre"],
  ["5", "cinq"],
  ["6", "six"],
  ["7", "sept"],
  ["8", "huit"],
  ["9", "neuf"],
  ["10", "dix"],
  ["11", "onze"],
  ["12", "douze"],
  ["13", "treize"],
  ["14", "quatorze"],
  ["15", "quinze"],
  ["16", "seize"],
];

const BIG: [string, string, string, string][] = [
  ["70", "soixante-dix", "60 + 10", "Il a soixante-dix ans."],
  ["71", "soixante et onze", "60 + 11", "J’ai soixante et onze euros."],
  ["79", "soixante-dix-neuf", "60 + 19", "J’ai soixante-dix-neuf euros."],
  ["80", "quatre-vingts", "4 × 20", "J’ai quatre-vingts euros."],
  ["81", "quatre-vingt-un", "80 + 1", "Elle a quatre-vingt-un ans."],
  ["90", "quatre-vingt-dix", "80 + 10", "Il a quatre-vingt-dix ans."],
  ["91", "quatre-vingt-onze", "80 + 11", "J’ai quatre-vingt-onze euros."],
  ["99", "quatre-vingt-dix-neuf", "80 + 19", "Elle a quatre-vingt-dix-neuf ans."],
];

function SmallTable({ ui }: { ui: Ui }) {
  const digit = ui === "fr" ? "Chiffre" : "Cifra";
  const fr = ui === "fr" ? "En français" : "En francés";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Les seize nombres à apprendre un par un"
            : "Los dieciséis números que se aprenden uno por uno"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{digit}</th>
            <th scope="col">{fr}</th>
            <th scope="col">{digit}</th>
            <th scope="col">{fr}</th>
          </tr>
        </thead>
        <tbody>
          {SMALL.slice(0, 8).map(([n, word], i) => {
            const [n2, word2] = SMALL[i + 8];
            return (
              <tr key={n}>
                <th scope="row">{n}</th>
                <td className="fr" lang="fr">
                  {word}
                </td>
                <th scope="row">{n2}</th>
                <td className="fr" lang="fr">
                  {word2}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BigTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Les trois dizaines qu’on dit en additionnant, et le calcul caché"
            : "Las tres decenas que se dicen sumando, y el cálculo que esconden"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Chiffre" : "Cifra"}</th>
            <th scope="col">{ui === "fr" ? "En français" : "En francés"}</th>
            <th scope="col">{ui === "fr" ? "Le calcul" : "El cálculo"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {BIG.map(([n, word, calc, ex]) => (
            <tr key={n}>
              <th scope="row">{n}</th>
              <td className="fr" lang="fr">
                {word}
              </td>
              <td>{calc}</td>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BuildExample() {
  return (
    <div className="example" lang="fr">
      17 dix-sept · 18 dix-huit · 19 dix-neuf
      <br />
      20 vingt · 30 trente · 40 quarante · 50 cinquante · 60 soixante
      <br />
      22 vingt-deux · 35 trente-cinq · 48 quarante-huit · 56 cinquante-six
    </div>
  );
}

function PriceExample() {
  return (
    <div className="example" lang="fr">
      2,50 € → <strong>deux euros cinquante</strong>
      <br />
      13,20 € → <strong>treize euros vingt</strong>
      <br />
      99,99 € → <strong>quatre-vingt-dix-neuf euros quatre-vingt-dix-neuf</strong>
    </div>
  );
}

function AgeExample() {
  return (
    <div className="example" lang="fr">
      J’<strong>ai</strong> trente ans. · Elle <strong>a</strong> quarante-deux ans. · Il{" "}
      <strong>a</strong> quatre-vingt-un ans.
    </div>
  );
}

function PhoneExample() {
  return (
    <div className="example" lang="fr">
      06 24 71 80 93 →{" "}
      <strong>
        zéro six, vingt-quatre, soixante et onze, quatre-vingts, quatre-vingt-treize
      </strong>
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Jusqu’à seize, chaque nombre a son mot</h2>

        <div className="rule">
          De <span className="fr">un</span> (<span lang="es">uno</span>) à{" "}
          <span className="fr">seize</span> (<span lang="es">dieciséis</span>), les nombres ne se
          devinent pas : ce sont seize mots à apprendre. À partir de{" "}
          <span className="fr">dix-sept</span> (<span lang="es">diecisiete</span>), tout se
          construit en additionnant.
        </div>

        <SmallTable ui="fr" />

        <p>
          <span className="fr">zéro</span> n’est pas dans le tableau, parce qu’on ne compte pas
          avec lui. Mais on le dit souvent : dans un prix, dans une heure et au début de tous les
          numéros de téléphone.
        </p>

        <p>
          Ensuite, on additionne. <span className="fr">dix-sept</span> est dix plus sept, et le
          trait d’union relie les deux mots. Les dizaines suivantes sont des mots nouveaux, et on
          les utilise de la même façon.
        </p>

        <BuildExample />

        <div className="attention">
          Devant <span className="fr">un</span> et <span className="fr">onze</span>, la dizaine
          prend <span className="fr">et</span> (<span lang="es">y</span>), sans trait d’union :{" "}
          <span className="fr">vingt et un</span>, <span className="fr">trente et un</span>,{" "}
          <span className="fr">soixante et onze</span>. Dans les autres nombres, le trait d’union
          suffit : <span className="fr">vingt-deux</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Hasta el dieciséis, cada número tiene su palabra:{" "}
          <span className="fr" lang="fr">
            de un à seize
          </span>
        </h2>

        <div className="rule">
          De <span className="fr" lang="fr">un</span> (uno) a{" "}
          <span className="fr" lang="fr">seize</span> (dieciséis) los números
          no se adivinan: son dieciséis palabras que hay que aprender. A partir
          de <span className="fr" lang="fr">dix-sept</span> (diecisiete), todo
          se construye sumando.
        </div>

        <SmallTable ui="es" />

        <p>
          <span className="fr" lang="fr">zéro</span> no está en la tabla porque
          no se cuenta con él, pero se dice a menudo: en un precio, en una hora
          y al principio de todos los números de teléfono.
        </p>

        <p>
          Después se suma. <span className="fr" lang="fr">dix-sept</span> es
          diez más siete, y el guion une las dos palabras. Las decenas
          siguientes son palabras nuevas y se usan como base de la misma manera.
        </p>

        <BuildExample />

        <div className="attention">
          Delante de <span className="fr" lang="fr">un</span> y de{" "}
          <span className="fr" lang="fr">onze</span>, la decena lleva{" "}
          <span className="fr" lang="fr">et</span> (y), sin guion:{" "}
          <span className="fr" lang="fr">vingt et un</span>,{" "}
          <span className="fr" lang="fr">trente et un</span>,{" "}
          <span className="fr" lang="fr">soixante et onze</span>. En los demás
          números basta el guion: <span className="fr" lang="fr">vingt-deux</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          <span className="fr">Soixante-dix, quatre-vingts, quatre-vingt-dix</span>
        </h2>

        <div className="rule">
          Le français de France n’a pas de mot propre pour 70, 80 et 90 (<span lang="es">setenta</span>,{" "}
          <span lang="es">ochenta</span>, <span lang="es">noventa</span>). 70 se construit sur 60 :{" "}
          <strong>60 + 10</strong>. 80 et 90 se construisent sur 4 × 20 :{" "}
          <strong>4 × 20</strong> et <strong>80 + 10</strong>.
        </div>

        <BigTable ui="fr" />

        <div className="exception">
          81 et 91 n’ont pas de <span className="fr">et</span>. On écrit{" "}
          <span className="fr">quatre-vingt-un</span> et{" "}
          <span className="fr">quatre-vingt-onze</span>, même si 71 est{" "}
          <span className="fr">soixante et onze</span>.
        </div>

        <div className="attention">
          <span className="fr">quatre-vingts</span> prend un <span className="fr">s</span> quand le
          nombre finit là, et il le perd si un autre chiffre suit :{" "}
          <span className="fr">quatre-vingts euros</span>, mais{" "}
          <span className="fr">quatre-vingt-deux euros</span>. <span className="fr">cent</span>{" "}
          (<span lang="es">cien</span>) suit la même règle : <span className="fr">deux cents</span>{" "}
          (<span lang="es">doscientos</span>), mais <span className="fr">deux cent cinq</span>{" "}
          (<span lang="es">doscientos cinco</span>). Le nombre <span className="fr">cent</span> tout
          seul ne prend jamais de <span className="fr">s</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            De 60 à 79, on continue avec <span className="fr">soixante</span> ; de 80 à 99, avec{" "}
            <span className="fr">quatre-vingt</span>.
          </p>
          <p>
            Il n’y a que deux bases à retenir pour les trente derniers nombres. En Belgique et en
            Suisse, vous entendrez <span className="fr">septante</span> (70) et{" "}
            <span className="fr">nonante</span> (90) ; en France,{" "}
            <span className="fr">soixante-dix</span> et <span className="fr">quatre-vingt-dix</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">
            Soixante-dix, quatre-vingts, quatre-vingt-dix
          </span>
        </h2>

        <div className="rule">
          El francés de Francia no tiene palabra propia para 70, 80 y 90 (setenta, ochenta,
          noventa). 70 se construye sobre 60:{" "}
          <strong>60 + 10</strong>. 80 y 90 se construyen sobre 4 × 20:{" "}
          <strong>4 × 20</strong> y <strong>80 + 10</strong>.
        </div>

        <BigTable ui="es" />

        <div className="exception">
          81 y 91 no llevan <span className="fr" lang="fr">et</span>. Se escribe{" "}
          <span className="fr" lang="fr">quatre-vingt-un</span> y{" "}
          <span className="fr" lang="fr">quatre-vingt-onze</span>, aunque 71 sea{" "}
          <span className="fr" lang="fr">soixante et onze</span>.
        </div>

        <div className="attention">
          <span className="fr" lang="fr">quatre-vingts</span> lleva una{" "}
          <span className="fr" lang="fr">s</span> cuando termina el número, y la
          pierde en cuanto otra cifra lo sigue:{" "}
          <span className="fr" lang="fr">quatre-vingts euros</span>, pero{" "}
          <span className="fr" lang="fr">quatre-vingt-deux euros</span>.{" "}
          <span className="fr" lang="fr">cent</span> (cien) sigue la misma
          regla: <span className="fr" lang="fr">deux cents</span> (doscientos),
          pero <span className="fr" lang="fr">deux cent cinq</span>{" "}
          (doscientos cinco). Solo <span className="fr" lang="fr">cent</span>{" "}
          nunca lleva <span className="fr" lang="fr">s</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            De 60 a 79 se sigue con soixante; de 80 a 99, con quatre-vingt.
          </p>
          <p>
            Solo hay dos bases que recordar para los treinta últimos números.
            En Bélgica y en Suiza oirás{" "}
            <span className="fr" lang="fr">septante</span> (70) y{" "}
            <span className="fr" lang="fr">nonante</span> (90); en Francia,{" "}
            <span className="fr" lang="fr">soixante-dix</span> y{" "}
            <span className="fr" lang="fr">quatre-vingt-dix</span>.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Le prix, l’âge, le numéro</h2>

        <div className="rule">
          Un prix se dit en deux morceaux : d’abord les euros, puis les centimes, sans rien entre
          les deux. Il n’y a pas de <span lang="es">« con »</span> comme en espagnol :{" "}
          <span className="fr">deux euros cinquante</span>.
        </div>

        <PriceExample />

        <p>
          L’âge se dit avec le verbe <span className="fr">avoir</span> (<span lang="es">tener</span>
          ), et le mot <span className="fr">ans</span> (<span lang="es">años</span>) ne s’enlève
          jamais.
        </p>

        <AgeExample />

        <div className="attention">
          En espagnol, vous dites <span lang="es">« tengo treinta »</span>, sans <span lang="es">« años »</span>, mais en
          français <span className="fr">ans</span> est obligatoire :{" "}
          <s className="fr">j’ai trente</s> est faux. Et le verbe de l’âge est toujours{" "}
          <span className="fr">avoir</span> (<span lang="es">tener</span>), jamais{" "}
          <span className="fr">être</span>.
        </div>

        <p>
          Un numéro de téléphone se lit <strong>deux chiffres par deux chiffres</strong> : cinq
          groupes de deux chiffres.
        </p>

        <PhoneExample />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Un precio, una edad, un número:{" "}
          <span className="fr" lang="fr">
            le prix, l’âge, le numéro
          </span>
        </h2>

        <div className="rule">
          Un precio se dice en dos trozos, primero los euros y luego los
          céntimos, sin nada entre los dos. No hay «con» como en español:{" "}
          <span className="fr" lang="fr">deux euros cinquante</span>.
        </div>

        <PriceExample />

        <p>
          La edad se dice con el verbo <span className="fr" lang="fr">avoir</span>{" "}
          (tener), y la palabra <span className="fr" lang="fr">ans</span> (años)
          no se quita nunca.
        </p>

        <AgeExample />

        <div className="attention">
          En español dices «tengo treinta» sin más, pero en francés{" "}
          <span className="fr" lang="fr">ans</span> es obligatorio:{" "}
          <s className="fr" lang="fr">j’ai trente</s> está mal. Y el verbo
          de la edad es siempre <span className="fr" lang="fr">avoir</span>{" "}
          (tener), nunca <span className="fr" lang="fr">être</span>.
        </div>

        <p>
          Un número de teléfono se lee <strong>de dos en dos</strong>: cinco
          grupos de dos cifras.
        </p>

        <PhoneExample />
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            De <span className="fr">un</span> à <span className="fr">seize</span>, seize mots à
            apprendre. Ensuite, on additionne.
          </li>
          <li>
            <span className="fr">et</span> seulement devant <span className="fr">un</span> et{" "}
            <span className="fr">onze</span> : 21, 31, 41, 51, 61 et 71. Jamais en 81 ni en 91.
          </li>
          <li>70 est 60 + 10, 80 est 4 × 20 et 90 est 80 + 10.</li>
          <li>
            <span className="fr">quatre-vingts</span> et <span className="fr">cent</span> perdent
            le <span className="fr">s</span> si un autre chiffre les suit.
          </li>
          <li>
            Un prix se dit en deux morceaux, l’âge avec <span className="fr">avoir</span> et{" "}
            <span className="fr">ans</span>, et un téléphone deux chiffres par deux chiffres.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            De <span className="fr" lang="fr">un</span> a{" "}
            <span className="fr" lang="fr">seize</span>, dieciséis palabras que
            aprender. Después se suma.
          </li>
          <li>
            <span className="fr" lang="fr">et</span> solo delante de{" "}
            <span className="fr" lang="fr">un</span> y{" "}
            <span className="fr" lang="fr">onze</span>: 21, 31, 41, 51, 61 y 71.
            Nunca en 81 ni en 91.
          </li>
          <li>70 es 60 + 10, 80 es 4 × 20 y 90 es 80 + 10.</li>
          <li>
            <span className="fr" lang="fr">quatre-vingts</span> y{" "}
            <span className="fr" lang="fr">cent</span> pierden la{" "}
            <span className="fr" lang="fr">s</span> en cuanto otra cifra los
            sigue.
          </li>
          <li>
            Un precio se dice en dos trozos, la edad con{" "}
            <span className="fr" lang="fr">avoir</span> y{" "}
            <span className="fr" lang="fr">ans</span>, y un teléfono de dos en
            dos.
          </li>
        </ul>
      </div>
    </article>
  );
}
