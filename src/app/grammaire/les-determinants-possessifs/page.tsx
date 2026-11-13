import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-determinants-possessifs";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). An A1 page: the
   Spanish is written first (#85), and the glosses and Spanish comparisons are
   shared by both. The French taught is written once, below.

   The forms are not laid out as a paradigm here — that table belongs to
   `orthographe/les-determinants-possessifs` (§9). This page starts from the
   two Spanish words that hide them: « mi » (three forms, where Spanish has
   two) and « su » (three owners, where Spanish has one word). */

type Lang = "fr" | "es";

/* French inside explanation prose, in either body. */
function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

/* A Spanish word quoted in the French body. */
function E({ children }: { children: ReactNode }) {
  return <span lang="es">« {children} »</span>;
}

const ONE_OWNER = [
  {
    before: { fr: "un nom masculin", es: "un nombre masculino" },
    forms: "mon · ton · son",
    example: "mon père · ton frère · son fils",
    gloss: "mi padre · tu hermano · su hijo",
  },
  {
    before: { fr: "un nom féminin", es: "un nombre femenino" },
    forms: "ma · ta · sa",
    example: "ma mère · ta sœur · sa fille",
    gloss: "mi madre · tu hermana · su hija",
  },
  {
    before: { fr: "un nom au pluriel", es: "un nombre en plural" },
    forms: "mes · tes · ses",
    example: "mes parents · tes amis · ses enfants",
    gloss: "mis padres · tus amigos · sus hijos",
  },
];

const OWNERS = [
  {
    who: { fr: "une personne : il, elle", es: "una persona: él, ella" },
    forms: "son · sa · ses",
    example: "Ana habite avec sa fille.",
    gloss: "Ana vive con su hija.",
  },
  {
    who: { fr: "plusieurs personnes : ils, elles", es: "varias personas: ellos, ellas" },
    forms: "leur · leurs",
    example: "Ana et Luis habitent avec leur fille.",
    gloss: "Ana y Luis viven con su hija.",
  },
  {
    who: { fr: "vous", es: "usted, ustedes, vosotros" },
    forms: "votre · vos",
    example: "Madame, c’est votre fille ?",
    gloss: "Señora, ¿es su hija?",
  },
];

function OneOwnerTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? (
            <>
              Trois formes pour <E>mi</E>, <E>tu</E> et <E>su</E>, quand la
              chose est à une seule personne
            </>
          ) : (
            "Tres formas para «mi», «tu» y «su», cuando la cosa es de una sola persona"
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Devant" : "Delante de"}</th>
            <th scope="col">{fr ? "La forme" : "La forma"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {ONE_OWNER.map((row) => (
            <tr key={row.forms}>
              <th scope="row">{row.before[lang]}</th>
              <td className="fr" lang="fr">
                {row.forms}
              </td>
              <td className="fr" lang="fr">
                {row.example}
              </td>
              <td lang="es">{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OwnersTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? (
            <>
              Le mot <E>su</E> en français : on compte les personnes
            </>
          ) : (
            "La palabra «su» en francés: se cuentan las personas"
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "La chose est à" : "La cosa es de"}</th>
            <th scope="col">{fr ? "La forme" : "La forma"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {OWNERS.map((row) => (
            <tr key={row.forms}>
              <th scope="row">{row.who[lang]}</th>
              <td className="fr" lang="fr">
                {row.forms}
              </td>
              <td className="fr" lang="fr">
                {row.example}
              </td>
              <td lang="es">{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyExamples() {
  return (
    <div className="example" lang="fr">
      C’est ta clé ? – Oui, c’est <strong>ma</strong> clé.
      <br />
      Paul cherche <strong>sa</strong> clé. Marie cherche <strong>sa</strong>{" "}
      clé.
    </div>
  );
}

function SesLeursExamples() {
  return (
    <div className="example" lang="fr">
      Luis habite avec <strong>ses</strong> enfants.
      <br />
      Luis et Ana habitent avec <strong>leurs</strong> enfants.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>mon, ma, mes : le nom décide</h2>

        <div className="rule">
          En espagnol, <E>mi</E> change seulement au pluriel. En français, il
          change aussi avec le genre du nom. Le début du mot dit à qui est la
          chose : <F>m</F> pour moi, <F>t</F> pour toi, <F>s</F> pour lui ou
          elle. La fin suit le nom : <F>mon père</F>, <F>ma mère</F>,{" "}
          <F>mes parents</F>.
        </div>

        <OneOwnerTable lang="fr" />

        <KeyExamples />

        <p>
          Une femme dit <F>mon père</F>, un homme dit <F>ma mère</F> : le mot
          suit <F>père</F> et <F>mère</F>. Et <F>sa</F> ne dit pas si la clé est
          à Paul ou à Marie. Il dit seulement que <F>clé</F> est un nom féminin.
          C’est comme <E>su</E> en espagnol : <E>Paul busca su llave</E>.
        </p>

        <div className="attention">
          Devant une voyelle, <F>ma</F>, <F>ta</F>, <F>sa</F> deviennent{" "}
          <F>mon</F>, <F>ton</F>, <F>son</F>. Le nom reste féminin. Seul le
          petit mot change, pour bien sonner : <F>mon amie</F>,{" "}
          <F>ton école</F>, <F>son adresse</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">
            mon, ma, mes
          </span>
          : decide el nombre
        </h2>

        <div className="rule">
          En español, «mi» solo cambia en plural. En francés cambia también con
          el género del nombre. El principio de la palabra dice de quién es la
          cosa: <F>m</F> para mí, <F>t</F> para ti, <F>s</F> para él o ella. El
          final va con el nombre: <F>mon père</F>, <F>ma mère</F>,{" "}
          <F>mes parents</F>.
        </div>

        <OneOwnerTable lang="es" />

        <KeyExamples />

        <p>
          Una mujer dice <F>mon père</F> y un hombre dice <F>ma mère</F>: manda{" "}
          <F>père</F> o <F>mère</F>. Y <F>sa</F> no dice si la llave es de Paul
          o de Marie; solo dice que <F>clé</F> es femenino. Es como «su» en
          español: «Paul busca su llave».
        </p>

        <div className="attention">
          Delante de vocal, <F>ma</F>, <F>ta</F>, <F>sa</F> se convierten en{" "}
          <F>mon</F>, <F>ton</F>, <F>son</F>. El nombre sigue siendo femenino;
          solo cambia la palabra pequeña, para que suene bien:{" "}
          <F>mon amie</F>, <F>ton école</F>, <F>son adresse</F>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          <E>su</E> se dit de trois façons
        </h2>

        <div className="rule">
          En espagnol, <E>su</E> sert pour une personne, pour plusieurs, et
          pour <E>usted</E>. En français, il faut choisir. Comptez les
          personnes : une seule, <F>son</F>, <F>sa</F>, <F>ses</F> ; plusieurs,{" "}
          <F>leur</F>, <F>leurs</F> ; et pour <F>vous</F>, <F>votre</F>,{" "}
          <F>vos</F>.
        </div>

        <OwnersTable lang="fr" />

        <SesLeursExamples />

        <p>
          <F>ses</F> et <F>leurs</F> sont tous les deux devant un pluriel. La
          différence est le nombre de personnes : Luis seul, <F>ses</F> ; Luis
          et Ana, <F>leurs</F>. <F>votre</F> et <F>vos</F> servent aussi pour{" "}
          <E>vuestro</E>, parce que <F>vous</F> est aussi <E>vosotros</E>. Et
          pour <E>nuestro</E>, on dit <F>notre</F>, <F>nos</F> :{" "}
          <F>notre maison</F>, <F>nos enfants</F>.
        </p>

        <div className="attention">
          <F>notre</F>, <F>votre</F> et <F>leur</F> n’ont pas de féminin :{" "}
          <F>leur fils</F>, <F>leur fille</F>. Seul le pluriel change :{" "}
          <F>nos</F>, <F>vos</F>, <F>leurs</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>«su» se dice de tres maneras</h2>

        <div className="rule">
          En español, «su» sirve para una persona, para varias y para «usted».
          En francés hay que elegir. Cuenta las personas: una sola,{" "}
          <F>son</F>, <F>sa</F>, <F>ses</F>; varias, <F>leur</F>,{" "}
          <F>leurs</F>; y para <F>vous</F>, <F>votre</F>, <F>vos</F>.
        </div>

        <OwnersTable lang="es" />

        <SesLeursExamples />

        <p>
          <F>ses</F> y <F>leurs</F> van los dos delante de un plural. La
          diferencia está en cuántas personas hay: Luis solo, <F>ses</F>; Luis
          y Ana, <F>leurs</F>. <F>votre</F> y <F>vos</F> sirven también para
          «vuestro», porque <F>vous</F> es también «vosotros». Y para
          «nuestro» se dice <F>notre</F>, <F>nos</F>: <F>notre maison</F>,{" "}
          <F>nos enfants</F>.
        </p>

        <div className="attention">
          <F>notre</F>, <F>votre</F> y <F>leur</F> no tienen femenino:{" "}
          <F>leur fils</F>, <F>leur fille</F>. Solo cambian en plural:{" "}
          <F>nos</F>, <F>vos</F>, <F>leurs</F>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le début du mot dit à qui est la chose ; la fin suit le nom, pas
            la personne qui parle : <F>mon père</F>, <F>ma mère</F>,{" "}
            <F>mes parents</F>.
          </li>
          <li>
            Devant une voyelle, on dit <F>mon</F>, <F>ton</F>, <F>son</F>, même
            pour un nom féminin : <F>mon amie</F>.
          </li>
          <li>
            <F>son</F>, <F>sa</F>, <F>ses</F> ne disent pas si la chose est à
            un homme ou à une femme, comme <E>su</E>.
          </li>
          <li>
            Pour plusieurs personnes, on dit <F>leur</F>, <F>leurs</F> ; pour{" "}
            <F>vous</F>, <F>votre</F>, <F>vos</F>.
          </li>
          <li>
            Le pluriel de <F>notre</F>, <F>votre</F> et <F>leur</F> est{" "}
            <F>nos</F>, <F>vos</F>, <F>leurs</F>, pour les deux genres.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El principio de la palabra dice de quién es la cosa; el final va
            con el nombre, no con quien habla: <F>mon père</F>, <F>ma mère</F>,{" "}
            <F>mes parents</F>.
          </li>
          <li>
            Delante de vocal se dice <F>mon</F>, <F>ton</F>, <F>son</F>, también
            con un nombre femenino: <F>mon amie</F>.
          </li>
          <li>
            <F>son</F>, <F>sa</F>, <F>ses</F> no dicen si la cosa es de un
            hombre o de una mujer, igual que «su».
          </li>
          <li>
            Para varias personas se dice <F>leur</F>, <F>leurs</F>; para{" "}
            <F>vous</F>, <F>votre</F>, <F>vos</F>.
          </li>
          <li>
            El plural de <F>notre</F>, <F>votre</F> y <F>leur</F> es{" "}
            <F>nos</F>, <F>vos</F>, <F>leurs</F>, para los dos géneros.
          </li>
        </ul>
      </div>
    </article>
  );
}
