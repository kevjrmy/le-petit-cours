import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-pronoms-cod-coi";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

const T = (fr: string, es: string) => ({ fr, es });

/* A head that is French itself (moi, toi) is flagged `french`. */
const COD_ROWS = [
  { head: T("moi", "moi"), french: true, pronoun: "me", example: "Il me voit." },
  { head: T("toi", "toi"), french: true, pronoun: "te", example: "Je te comprends." },
  { head: T("un nom masculin", "un nombre masculino"), pronoun: "le", example: "Ce livre ? Je le lis." },
  { head: T("un nom féminin", "un nombre femenino"), pronoun: "la", example: "Cette robe ? Je la prends." },
  { head: T("un pluriel", "un plural"), pronoun: "les", example: "Les clés ? Je les cherche." },
];

const FORMS = [
  { head: T("3ᵉ personne du singulier", "3.ª persona del singular"), cod: "le / la", coi: "lui" },
  { head: T("3ᵉ personne du pluriel", "3.ª persona del plural"), cod: "les", coi: "leur" },
  { head: T("les autres", "las demás"), cod: "me, te, nous, vous", coi: "me, te, nous, vous" },
];

const PLACES = [
  { head: T("présent", "presente"), example: "Je les invite." },
  { head: T("passé composé", "passé composé"), french: true, example: "Je les ai invités." },
  { head: T("négation", "negación"), example: "Je ne les invite pas." },
  { head: T("deux verbes", "dos verbos"), example: "Je vais les inviter." },
];

function CodExamples() {
  return (
    <div className="example" lang="fr">
      Je regarde <strong>la télévision</strong>. → Je <strong>la</strong>{" "}
      regarde.
      <br />
      Tu connais <strong>mes parents</strong> ? → Tu <strong>les</strong>{" "}
      connais ?
    </div>
  );
}

function CoiExamples() {
  return (
    <div className="example" lang="fr">
      Je téléphone <strong>à ma sœur</strong>. → Je <strong>lui</strong>{" "}
      téléphone.
      <br />
      Il parle <strong>à ses collègues</strong>. → Il <strong>leur</strong>{" "}
      parle.
    </div>
  );
}

function CodTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? "Los pronombres de complemento directo"
            : "Les pronoms compléments d’objet direct"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "Sustituye a" : "Il remplace"}</th>
            <th scope="col">{es ? "Pronombre" : "Pronom"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {COD_ROWS.map((row) => (
            <tr key={row.head.fr}>
              <th
                scope="row"
                {...(row.french ? { className: "fr", lang: "fr" } : {})}
              >
                {row.head[lang]}
              </th>
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

function FormsTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? (
              <>
                <span lang="fr">COD</span> y <span lang="fr">COI</span>: las
                formas que cambian
              </>
            )
            : "COD et COI : les formes qui changent"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "Persona" : "Personne"}</th>
            <th scope="col" className="fr" lang="fr">
              COD
            </th>
            <th scope="col" className="fr" lang="fr">
              COI
            </th>
          </tr>
        </thead>
        <tbody>
          {FORMS.map((row) => (
            <tr key={row.head.fr}>
              <th scope="row">{row.head[lang]}</th>
              <td className="fr" lang="fr">
                {row.cod}
              </td>
              <td className="fr" lang="fr">
                {row.coi}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlaceTable({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {es
            ? "El lugar del pronombre según la forma de la frase"
            : "La place du pronom selon la forme de la phrase"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{es ? "Forma" : "Forme"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {PLACES.map((row) => (
            <tr key={row.head.fr}>
              <th
                scope="row"
                {...(row.french && es ? { lang: "fr" } : {})}
              >
                {row.head[lang]}
              </th>
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

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Le COD : le verbe va droit au complément</h2>

        <div className="rule">
          Le complément d’objet <strong>direct</strong> suit le verbe sans
          préposition. Pour ne pas répéter le mot, on le remplace par{" "}
          <span className="fr">le</span>, <span className="fr">la</span>,{" "}
          <span className="fr">les</span> — et le pronom se place{" "}
          <strong>devant le verbe</strong>.
        </div>

        <CodExamples />

        <CodTable lang="fr" />

        <div className="attention">
          Devant une voyelle, <span className="fr">me</span>,{" "}
          <span className="fr">te</span>, <span className="fr">le</span> et{" "}
          <span className="fr">la</span> perdent leur voyelle :{" "}
          <span className="fr">Je l’écoute</span>,{" "}
          <span className="fr">Il m’attend</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El <span className="fr" lang="fr">COD</span>: el verbo va directo al complemento
        </h2>

        <div className="rule">
          El complemento directo va después del verbo, sin preposición. Para no
          repetir la palabra, se sustituye por{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">la</span>,{" "}
          <span className="fr" lang="fr">les</span>, y el pronombre se coloca{" "}
          <strong>delante del verbo</strong>.
        </div>

        <CodExamples />

        <CodTable lang="es" />

        <div className="attention">
          Delante de una vocal, <span className="fr" lang="fr">me</span>,{" "}
          <span className="fr" lang="fr">te</span>,{" "}
          <span className="fr" lang="fr">le</span> y{" "}
          <span className="fr" lang="fr">la</span> pierden la vocal:{" "}
          <span className="fr" lang="fr">Je l’écoute</span>,{" "}
          <span className="fr" lang="fr">Il m’attend</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Le COI : le verbe passe par « à »</h2>

        <div className="rule">
          Le complément d’objet <strong>indirect</strong> est relié au verbe par
          la préposition <span className="fr">à</span>. Quand il désigne une
          personne, on le remplace par <span className="fr">lui</span> au
          singulier et <span className="fr">leur</span> au pluriel — sans
          distinguer le masculin du féminin.
        </div>

        <CoiExamples />

        <FormsTable lang="fr" />

        <div className="astuce">
          <p className="astuce-hook">Posez la question au verbe</p>
          <p>
            <strong>Qui ?</strong> ou <strong>quoi ?</strong> sans préposition →
            c’est un COD. <strong>À qui ?</strong> → c’est un COI. Le piège est
            que les deux langues ne construisent pas les mêmes verbes de la même
            façon : on dit <span className="fr">téléphoner à quelqu’un</span>{" "}
            mais <span className="fr">appeler quelqu’un</span>. Apprenez la
            préposition avec le verbe, comme une seule et même chose.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El <span className="fr" lang="fr">COI</span>: el verbo pasa por «
          <span className="fr" lang="fr">à</span>»
        </h2>

        <div className="rule">
          El complemento indirecto se une al verbo con la preposición{" "}
          <span className="fr" lang="fr">à</span>. Cuando es una persona, se
          sustituye por <span className="fr" lang="fr">lui</span> en singular y{" "}
          <span className="fr" lang="fr">leur</span> en plural, sin distinguir
          el masculino del femenino.
        </div>

        <CoiExamples />

        <FormsTable lang="es" />

        <div className="astuce">
          <p className="astuce-hook">Hazle la pregunta al verbo</p>
          <p>
            <strong lang="fr">Qui ?</strong> o <strong lang="fr">quoi ?</strong>{" "}
            sin preposición → es un <span className="fr" lang="fr">COD</span>.{" "}
            <strong lang="fr">À qui ?</strong> → es un{" "}
            <span className="fr" lang="fr">COI</span>. La trampa es que los dos
            idiomas no construyen igual los mismos verbos: se dice{" "}
            <span className="fr" lang="fr">téléphoner à quelqu’un</span> pero{" "}
            <span className="fr" lang="fr">appeler quelqu’un</span>. Aprende la
            preposición junto con el verbo, como una sola cosa.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Où placer le pronom</h2>

        <div className="rule">
          Le pronom se place <strong>devant le verbe conjugué</strong>. Au passé
          composé, il passe donc devant l’auxiliaire ; à la forme négative,{" "}
          <span className="fr">ne</span> se met avant lui.
        </div>

        <PlaceTable lang="fr" />

        <div className="attention">
          Quand un COD est placé avant le verbe, le participe passé s’accorde
          avec lui : <span className="fr">Je les ai invit<strong>és</strong></span>{" "}
          · <span className="fr">Cette lettre, je l’ai écrit<strong>e</strong></span>.
          L’accord ne s’entend pas toujours, mais il s’écrit.
        </div>

        <div className="exception">
          L’impératif affirmatif. Là, le pronom passe{" "}
          <strong>après</strong> le verbe, avec un trait d’union, et{" "}
          <span className="fr">me</span> devient{" "}
          <span className="fr">moi</span> : <span className="fr">Regarde-la !</span>{" "}
          · <span className="fr">Téléphone-moi !</span> À la forme négative, il
          reprend sa place habituelle : <span className="fr">Ne la regarde pas.</span>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Dónde colocar el pronombre</h2>

        <div className="rule">
          El pronombre se coloca <strong>delante del verbo conjugado</strong>.
          En <span className="fr" lang="fr">passé composé</span> va, por tanto,
          delante del auxiliar; en la forma negativa,{" "}
          <span className="fr" lang="fr">ne</span> va antes que él.
        </div>

        <PlaceTable lang="es" />

        <div className="attention">
          Cuando un <span className="fr" lang="fr">COD</span> va antes del
          verbo, el participio concuerda con él:{" "}
          <span className="fr" lang="fr">Je les ai invit<strong>és</strong></span>{" "}
          ·{" "}
          <span className="fr" lang="fr">Cette lettre, je l’ai écrit<strong>e</strong></span>.
          La concordancia no siempre se oye, pero se escribe.
        </div>

        <div className="exception">
          El imperativo afirmativo. Ahí el pronombre va <strong>después</strong>{" "}
          del verbo, con un guion, y <span className="fr" lang="fr">me</span>{" "}
          pasa a ser <span className="fr" lang="fr">moi</span>:{" "}
          <span className="fr" lang="fr">Regarde-la !</span> ·{" "}
          <span className="fr" lang="fr">Téléphone-moi !</span> En la forma
          negativa recupera su lugar habitual:{" "}
          <span className="fr" lang="fr">Ne la regarde pas.</span>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le COD suit le verbe sans préposition. Il se remplace par{" "}
            <span className="fr">le</span>, <span className="fr">la</span>,{" "}
            <span className="fr">les</span>.
          </li>
          <li>
            Le COI est relié au verbe par <span className="fr">à</span>. Pour
            une personne, il se remplace par <span className="fr">lui</span> au
            singulier et <span className="fr">leur</span> au pluriel.
          </li>
          <li>
            Le pronom se place devant le verbe conjugué, donc devant
            l’auxiliaire au passé composé. Sauf à l’impératif affirmatif, où il
            passe après : <span className="fr">Regarde-la !</span>
          </li>
          <li>
            Devant une voyelle, <span className="fr">me</span>,{" "}
            <span className="fr">te</span>, <span className="fr">le</span> et{" "}
            <span className="fr">la</span> perdent leur voyelle :{" "}
            <span className="fr">Je l’écoute</span>.
          </li>
          <li>
            Quand le COD est placé avant le verbe, le participe passé s’accorde
            avec lui : <span className="fr">Je les ai invités</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El <span className="fr" lang="fr">COD</span> va después del verbo
            sin preposición. Se sustituye por{" "}
            <span className="fr" lang="fr">le</span>,{" "}
            <span className="fr" lang="fr">la</span>,{" "}
            <span className="fr" lang="fr">les</span>.
          </li>
          <li>
            El <span className="fr" lang="fr">COI</span> se une al verbo con{" "}
            <span className="fr" lang="fr">à</span>. Si es una persona, se
            sustituye por <span className="fr" lang="fr">lui</span> en singular
            y <span className="fr" lang="fr">leur</span> en plural.
          </li>
          <li>
            El pronombre va delante del verbo conjugado, o sea delante del
            auxiliar en <span className="fr" lang="fr">passé composé</span>.
            Excepto en el imperativo afirmativo, donde va después:{" "}
            <span className="fr" lang="fr">Regarde-la !</span>
          </li>
          <li>
            Delante de una vocal, <span className="fr" lang="fr">me</span>,{" "}
            <span className="fr" lang="fr">te</span>,{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">la</span> pierden la vocal:{" "}
            <span className="fr" lang="fr">Je l’écoute</span>.
          </li>
          <li>
            Cuando el <span className="fr" lang="fr">COD</span> va antes del
            verbo, el participio concuerda con él:{" "}
            <span className="fr" lang="fr">Je les ai invités</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
