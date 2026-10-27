import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/c-est-ce-sont";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the A1 Spanish gloss are written once, below, and shared. */

type Lang = "fr" | "es";

/* A Spanish gloss in brackets: in the French body it is marked as Spanish. */
function Gloss({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <> ({lang === "fr" ? <span lang="es">{children}</span> : children})</>;
}

const FOUR = [
  {
    noun: { fr: "un seul", es: "uno solo" },
    yes: "C’est une clé.",
    no: "Ce n’est pas une clé.",
  },
  {
    noun: { fr: "plusieurs", es: "varios" },
    yes: "Ce sont des clés.",
    no: "Ce ne sont pas des clés.",
  },
];

const CHOICES = [
  {
    form: "c’est",
    follows: { fr: "un petit mot et un nom", es: "una palabra pequeña y un nombre" },
    example: "C’est un médecin. C’est ma voisine.",
    gloss: "Es un médico. Es mi vecina.",
  },
  {
    form: "il est / elle est",
    follows: { fr: "une profession, sans rien devant", es: "una profesión, sin nada delante" },
    example: "Il est médecin. Elle est étudiante.",
    gloss: "Es médico. Es estudiante.",
  },
  {
    form: "il est / elle est",
    follows: {
      fr: "un adjectif accordé avec la personne",
      es: "un adjetivo que concuerda con la persona",
    },
    example: "Il est grand. Elle est grande.",
    gloss: "Es alto. Es alta.",
  },
  {
    form: "c’est",
    follows: { fr: "un adjectif, pour donner une opinion", es: "un adjetivo, para dar una opinión" },
    example: "C’est bon. C’est difficile.",
    gloss: "Está bien / es bueno. Es difícil.",
  },
  {
    form: "ils sont / elles sont",
    follows: { fr: "le pluriel d’une profession", es: "el plural de una profesión" },
    example: "Ils sont médecins. Elles sont étudiantes.",
    gloss: "Son médicos. Son estudiantes.",
  },
];

function FourTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les quatre formes de la phrase de présentation"
            : "Las cuatro formas de la frase que presenta algo"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Le nom suivant" : "El nombre que sigue"}</th>
            <th scope="col">{fr ? "On dit oui" : "Se dice que sí"}</th>
            <th scope="col">{fr ? "On dit non" : "Se dice que no"}</th>
          </tr>
        </thead>
        <tbody>
          {FOUR.map((row) => (
            <tr key={row.yes}>
              <th scope="row">{row.noun[lang]}</th>
              <td className="fr" lang="fr">{row.yes}</td>
              <td className="fr" lang="fr">{row.no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChoicesTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Le mot suivant décide de la forme à écrire"
            : "Lo que sigue al verbo decide la forma que se escribe"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "La forme" : "La forma"}</th>
            <th scope="col">{fr ? "Le mot suivant" : "Lo que sigue"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {CHOICES.map((row, i) => (
            <tr key={i}>
              <th scope="row" className="fr" lang="fr">{row.form}</th>
              <td>{row.follows[lang]}</td>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Things() {
  return (
    <div className="example" lang="fr">
      <strong>C’est</strong> un stylo. · <strong>C’est</strong> la gare. ·{" "}
      <strong>C’est</strong> ma sœur. · <strong>C’est</strong> Paul.
    </div>
  );
}

function Questions() {
  return (
    <div className="example" lang="fr">
      Qu’est-ce que c’est ? – <strong>C’est</strong> une clé.
      <br />
      Qui est-ce ? – <strong>C’est</strong> mon voisin.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>
          Nommer une chose, présenter une personne avec{" "}
          <span className="fr">c’est</span>
        </h2>

        <div className="rule">
          Pour nommer une chose ou présenter une personne, la phrase commence
          par <strong>c’est</strong>. C’est le <span lang="es">es</span> de
          l’espagnol. Le nom suivant garde son petit mot (l’article) :{" "}
          <span className="fr">un</span>, <span className="fr">une</span>,{" "}
          <span className="fr">le</span>, <span className="fr">ma</span>.
        </div>

        <Things />

        <p>
          Cela veut dire <span lang="es">« un bolígrafo »</span>,{" "}
          <span lang="es">« la estación »</span>,{" "}
          <span lang="es">« mi hermana »</span> et « Paul ». En espagnol, on
          peut ne pas dire le sujet : <em lang="es">es un libro</em>. En français,
          non : <span className="fr">c’est un livre</span>.{" "}
          <s className="fr">est un livre</s> n’existe pas.
        </p>

        <p>
          <span className="fr">c’est</span> s’écrit toujours avec une
          apostrophe : <span className="fr">ce</span> perd son <em>e</em> devant{" "}
          <span className="fr">est</span>, et <s className="fr">ce est</s>{" "}
          n’existe pas.
        </p>

        <p>La même phrase répond à deux questions très courantes.</p>

        <Questions />

        <p>
          En espagnol :{" "}
          <span lang="es">«¿Qué es esto? – Es una llave.» «¿Quién es? – Es mi
          vecino.»</span>
        </p>

        <div className="attention">
          <span className="fr">c’est</span> ne change pas avec le genre du nom.
          On écrit <span className="fr">c’est un livre</span>
          <Gloss lang="fr">es un libro</Gloss> et{" "}
          <span className="fr">c’est une table</span>
          <Gloss lang="fr">es una mesa</Gloss> : seul l’article change, jamais{" "}
          <span className="fr">c’est</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Nombrar una cosa, presentar a una persona con{" "}
          <span className="fr" lang="fr">c’est</span>
        </h2>

        <div className="rule">
          Para decir qué es una cosa o quién es una persona, la frase empieza
          por <strong lang="fr">c’est</strong>. Es el «es» del español. El
          nombre que sigue conserva su palabra pequeña (el artículo):{" "}
          <span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">le</span>,{" "}
          <span className="fr" lang="fr">ma</span>.
        </div>

        <Things />

        <p>
          Es «un bolígrafo», «la estación», «mi hermana» y «Paul». En español
          puedes callar el sujeto: <em>es un libro</em>. En francés no:{" "}
          <span className="fr" lang="fr">c’est un livre</span>.{" "}
          <s className="fr" lang="fr">est un livre</s> no existe.
        </p>

        <p>
          <span className="fr" lang="fr">c’est</span> se escribe siempre con
          apóstrofo: <span className="fr" lang="fr">ce</span> pierde la{" "}
          <em>e</em> delante de <span className="fr" lang="fr">est</span>, y{" "}
          <s className="fr" lang="fr">ce est</s> no existe.
        </p>

        <p>
          La misma frase responde a las dos preguntas que más se hacen al
          llegar a un sitio.
        </p>

        <Questions />

        <p>
          «¿Qué es esto? – Es una llave.» «¿Quién es? – Es mi vecino.»
        </p>

        <div className="attention">
          <span className="fr" lang="fr">c’est</span> no cambia con el género
          del nombre. Se escribe{" "}
          <span className="fr" lang="fr">c’est un livre</span> (es un libro) y{" "}
          <span className="fr" lang="fr">c’est une table</span> (es una mesa):
          la palabra que cambia es la del nombre, nunca{" "}
          <span className="fr" lang="fr">c’est</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Au pluriel, et quand la réponse est non :{" "}
          <span className="fr">ce sont</span>
        </h2>

        <div className="rule">
          Devant un nom au pluriel, on écrit <strong>ce sont</strong>. C’est le{" "}
          <span lang="es">son</span> de l’espagnol. Pour dire le contraire, la
          négation entoure le verbe : <strong>ce n’est pas</strong>,{" "}
          <strong>ce ne sont pas</strong>.
        </div>

        <FourTable lang="fr" />

        <p>
          En espagnol : <span lang="es">«es una llave», «no es una llave», «son
          llaves» y «no son llaves»</span>. Le verbe est{" "}
          <span className="fr">être</span>
          <Gloss lang="fr">ser</Gloss>, et il s’accorde avec le nom suivant : un
          nom au singulier demande <span className="fr">est</span>, un nom au
          pluriel demande <span className="fr">sont</span>.
        </p>

        <div className="attention">
          À l’oral, on entend souvent <span className="fr">c’est des clés</span> ;
          dans un texte soigné, on écrit{" "}
          <span className="fr">ce sont des clés</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          En plural, y cuando la respuesta es no:{" "}
          <span className="fr" lang="fr">ce sont</span>
        </h2>

        <div className="rule">
          Delante de un nombre en plural se escribe{" "}
          <strong lang="fr">ce sont</strong>. Es el «son» del español. Para
          decir lo contrario, la negación rodea al verbo:{" "}
          <strong lang="fr">ce n’est pas</strong>,{" "}
          <strong lang="fr">ce ne sont pas</strong>.
        </div>

        <FourTable lang="es" />

        <p>
          En español: «es una llave», «no es una llave», «son llaves» y «no son
          llaves». El verbo es <span className="fr" lang="fr">être</span> (ser) y
          concuerda con lo que sigue: un nombre en singular pide{" "}
          <span className="fr" lang="fr">est</span>, un nombre en plural pide{" "}
          <span className="fr" lang="fr">sont</span>.
        </p>

        <div className="attention">
          En la conversación se oye mucho{" "}
          <span className="fr" lang="fr">c’est des clés</span>; en un texto
          cuidado se escribe{" "}
          <span className="fr" lang="fr">ce sont des clés</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          <span className="fr">c’est</span> ou <span className="fr">il est</span> ?
        </h2>

        <div className="rule">
          Le mot suivant décide. Trois cas. Un nom avec son article (
          <span className="fr">un</span>, <span className="fr">une</span>,{" "}
          <span className="fr">mon</span>, <span className="fr">le</span>) :{" "}
          <strong>c’est</strong>. Une profession seule, ou un adjectif pour une
          personne ou une chose déjà nommée : <strong>il est</strong> ou{" "}
          <strong>elle est</strong>. Un nom propre ou une opinion sur la
          situation : <strong>c’est</strong>.
        </div>

        <ChoicesTable lang="fr" />

        <div className="attention">
          En espagnol, on dit <span lang="es">« es médico »</span> et aussi{" "}
          <span lang="es">« es un médico »</span>. En français, la phrase change
          de forme : sans petit mot, on dit{" "}
          <span className="fr">il est médecin</span> ; avec un article,{" "}
          <span className="fr">c’est un médecin</span>.{" "}
          <s className="fr">il est un médecin</s> n’existe pas, et{" "}
          <s className="fr">c’est médecin</s> non plus.
        </div>

        <div className="exception">
          Après <span className="fr">c’est</span>, l’adjectif ne s’accorde
          jamais. On écrit <span className="fr">c’est bon</span> même pour
          parler d’une tarte, parce que l’adjectif ne décrit pas la tarte : il
          donne votre opinion. Pour décrire la tarte elle-même, on dit{" "}
          <span className="fr">elle est bonne</span>
          <Gloss lang="fr">la tarta está buena</Gloss>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          ¿<span className="fr" lang="fr">c’est</span> o{" "}
          <span className="fr" lang="fr">il est</span>?
        </h2>

        <div className="rule">
          Lo que viene después decide. Tres casos. Un nombre con su artículo
          (<span className="fr" lang="fr">un</span>,{" "}
          <span className="fr" lang="fr">une</span>,{" "}
          <span className="fr" lang="fr">mon</span>,{" "}
          <span className="fr" lang="fr">le</span>): <strong lang="fr">c’est</strong>.
          Una profesión sola, o un adjetivo que describe a una persona o cosa
          ya nombrada: <strong lang="fr">il est</strong> o{" "}
          <strong lang="fr">elle est</strong>. Un nombre propio o una opinión
          sobre la situación: <strong lang="fr">c’est</strong>.
        </div>

        <ChoicesTable lang="es" />

        <div className="attention">
          En español dices «es médico» y también «es un médico». En francés la
          frase cambia de forma: sin palabra pequeña, se dice{" "}
          <span className="fr" lang="fr">il est médecin</span>; con ella,{" "}
          <span className="fr" lang="fr">c’est un médecin</span>.{" "}
          <s className="fr" lang="fr">il est un médecin</s> no existe, y
          tampoco <s className="fr" lang="fr">c’est médecin</s>.
        </div>

        <div className="exception">
          Después de <span className="fr" lang="fr">c’est</span>, el adjetivo
          no concuerda nunca. Se escribe{" "}
          <span className="fr" lang="fr">c’est bon</span> incluso hablando de
          una tarta, porque el adjetivo no describe la tarta: da tu opinión.
          Para describir la tarta misma, se dice{" "}
          <span className="fr" lang="fr">elle est bonne</span> (la tarta está
          buena).
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">c’est</span> sert à nommer une chose et à
            présenter une personne, et il s’écrit toujours avec une apostrophe.
          </li>
          <li>
            Devant un nom au pluriel, à l’écrit, on utilise{" "}
            <span className="fr">ce sont</span> et non{" "}
            <span className="fr">c’est</span>.
          </li>
          <li>
            La négation entoure le verbe :{" "}
            <span className="fr">ce n’est pas</span>,{" "}
            <span className="fr">ce ne sont pas</span>.
          </li>
          <li>
            Un article devant le nom, un nom propre ou une opinion demandent{" "}
            <span className="fr">c’est</span> ; une profession seule ou un
            adjectif pour décrire quelqu’un demandent{" "}
            <span className="fr">il est</span> ou{" "}
            <span className="fr">elle est</span>.
          </li>
          <li>
            Après <span className="fr">c’est</span>, l’adjectif reste au
            masculin : <span className="fr">c’est bon</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">c’est</span> sirve para nombrar una
            cosa y presentar a una persona, y se escribe siempre con apóstrofo.
          </li>
          <li>
            Delante de un nombre en plural, al escribir, se usa{" "}
            <span className="fr" lang="fr">ce sont</span> y no{" "}
            <span className="fr" lang="fr">c’est</span>.
          </li>
          <li>
            La negación rodea al verbo:{" "}
            <span className="fr" lang="fr">ce n’est pas</span>,{" "}
            <span className="fr" lang="fr">ce ne sont pas</span>.
          </li>
          <li>
            Un artículo delante del nombre, un nombre propio o una opinión
            piden <span className="fr" lang="fr">c’est</span>; una profesión
            sola o un adjetivo que describe a alguien piden{" "}
            <span className="fr" lang="fr">il est</span> o{" "}
            <span className="fr" lang="fr">elle est</span>.
          </li>
          <li>
            Después de <span className="fr" lang="fr">c’est</span>, el
            adjetivo se queda en masculino:{" "}
            <span className="fr" lang="fr">c’est bon</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
