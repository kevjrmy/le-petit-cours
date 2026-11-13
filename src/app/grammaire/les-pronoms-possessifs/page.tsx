import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-pronoms-possessifs";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. An A2 page: no gloss on the French, and
   no Spanish printed as the cause of a mistake (§1) — the wrong form is struck
   through instead (#93). */

type Lang = "fr" | "es";

/* French inside explanation prose, in either body. */
function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

/* A form wrong as written (#93). */
function Wrong({ children }: { children: ReactNode }) {
  return (
    <s className="fr" lang="fr">
      {children}
    </s>
  );
}

const AFTER_A = [
  { subject: "je", form: "moi", example: "Ce parapluie est à moi." },
  { subject: "tu", form: "toi", example: "C’est à toi, ce sac ?" },
  { subject: "il / elle", form: "lui / elle", example: "Le vélo est à lui, la moto est à elle." },
  { subject: "nous", form: "nous", example: "Ces chaises sont à nous." },
  { subject: "vous", form: "vous", example: "Monsieur, ce billet est à vous ?" },
  { subject: "ils / elles", form: "eux / elles", example: "Le jardin est à eux." },
];

const PRONOUNS = [
  { owner: "je", one: "le mien · la mienne", many: "les miens · les miennes", example: "Ton vélo est rouge, le mien est bleu." },
  { owner: "tu", one: "le tien · la tienne", many: "les tiens · les tiennes", example: "J’ai mes clés. Tu as les tiennes ?" },
  { owner: "il / elle", one: "le sien · la sienne", many: "les siens · les siennes", example: "Je cherche mon sac, et Paul cherche le sien." },
  { owner: "nous", one: "le nôtre · la nôtre", many: "les nôtres", example: "Leur maison est grande, la nôtre est petite." },
  { owner: "vous", one: "le vôtre · la vôtre", many: "les vôtres", example: "Mon train part à huit heures. Et le vôtre ?" },
  { owner: "ils / elles", one: "le leur · la leur", many: "les leurs", example: "Nos enfants jouent avec les leurs." },
];

function AfterATable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Après « à », on dit moi, toi, lui, elle, nous, vous, eux, elles"
            : "Después de «à» se dice moi, toi, lui, elle, nous, vous, eux, elles"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "La personne" : "La persona"}</th>
            <th scope="col">{fr ? "Après « à »" : "Después de «à»"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {AFTER_A.map((row) => (
            <tr key={row.subject}>
              <th scope="row" className="fr" lang="fr">
                {row.subject}
              </th>
              <td className="fr" lang="fr">
                {row.form}
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

function PronounsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "La forme suit la chose possédée, comme « mon, ma, mes »"
            : "La forma va con la cosa poseída, como «mon, ma, mes»"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "La personne" : "La persona"}</th>
            <th scope="col">{fr ? "Une chose" : "Una cosa"}</th>
            <th scope="col">{fr ? "Plusieurs choses" : "Varias cosas"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {PRONOUNS.map((row) => (
            <tr key={row.owner}>
              <th scope="row" className="fr" lang="fr">
                {row.owner}
              </th>
              <td className="fr" lang="fr">
                {row.one}
              </td>
              <td className="fr" lang="fr">
                {row.many}
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

function WhoseExamples() {
  return (
    <div className="example" lang="fr">
      À qui sont ces clés ? – Elles sont <strong>à moi</strong>.
      <br />
      C’est son livre <strong>à elle</strong>, pas son livre{" "}
      <strong>à lui</strong>.
    </div>
  );
}

function MineExamples() {
  return (
    <div className="example" lang="fr">
      C’est ton parapluie ? – Non, ce n’est pas <strong>le mien</strong>.{" "}
      <strong>Le mien</strong> est noir.
      <br />
      Ma valise est lourde. Et <strong>la tienne</strong> ?
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>À qui est-ce ? C’est à moi</h2>

        <div className="rule">
          Pour dire à qui est une chose, on utilise <strong>être à</strong> et
          la personne : <F>c’est à moi</F>, <F>c’est à Paul</F>. Après{" "}
          <F>à</F>, <F>je</F> devient <F>moi</F>, <F>tu</F> devient{" "}
          <F>toi</F>, <F>ils</F> devient <F>eux</F>.
        </div>

        <AfterATable lang="fr" />

        <WhoseExamples />

        <p>
          Ici, il faut dire qui : <F>à lui</F> pour un homme, <F>à elle</F> pour
          une femme. C’est utile, parce que <F>son</F> et <F>sa</F> ne le disent
          pas (<Link href="/grammaire/les-determinants-possessifs">Les déterminants possessifs</Link>). Pour
          être clair, on les ajoute après le nom : <F>son livre à elle</F>.
        </p>

        <div className="attention">
          <F>mien</F>, <F>tien</F>, <F>sien</F> ne s’emploient pas seuls après{" "}
          <F>c’est</F> : on ne dit pas <Wrong>c’est mien</Wrong>. On dit{" "}
          <F>c’est à moi</F>, ou <F>c’est le mien</F>. De la même façon, on ne
          dit pas <Wrong>un ami mien</Wrong>, mais <F>un de mes amis</F> ou{" "}
          <F>un ami à moi</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          ¿De quién es?{" "}
          <span className="fr" lang="fr">
            C’est à moi
          </span>
        </h2>

        <div className="rule">
          Para decir de quién es una cosa, se usa <strong lang="fr">être à</strong>{" "}
          y la persona: <F>c’est à moi</F>, <F>c’est à Paul</F>. Después de{" "}
          <F>à</F>, <F>je</F> pasa a <F>moi</F>, <F>tu</F> a <F>toi</F>,{" "}
          <F>ils</F> a <F>eux</F>.
        </div>

        <AfterATable lang="es" />

        <WhoseExamples />

        <p>
          Aquí hay que decir quién: <F>à lui</F> para un hombre, <F>à elle</F>{" "}
          para una mujer. Es útil, porque <F>son</F> y <F>sa</F> no lo dicen (
          <Link href="/grammaire/les-determinants-possessifs" lang="fr">
            Les déterminants possessifs
          </Link>
          ). Para que quede claro, se añaden detrás del nombre:{" "}
          <F>son livre à elle</F>.
        </p>

        <div className="attention">
          <F>mien</F>, <F>tien</F>, <F>sien</F> no se usan solos después de{" "}
          <F>c’est</F>: no se dice <Wrong>c’est mien</Wrong>. Se dice{" "}
          <F>c’est à moi</F>, o <F>c’est le mien</F>. Del mismo modo, no se dice{" "}
          <Wrong>un ami mien</Wrong>, sino <F>un de mes amis</F> o{" "}
          <F>un ami à moi</F>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>le mien, la mienne : ne pas répéter le nom</h2>

        <div className="rule">
          Pour ne pas répéter <F>mon</F> et le nom, on dit <F>le mien</F>,{" "}
          <F>la mienne</F>… Comme pour <F>mon</F>, <F>ma</F>, <F>mes</F>, le
          féminin et le pluriel suivent la chose, jamais la personne. Le petit mot devant change avec
          elle : <F>le</F>, <F>la</F>, <F>les</F>.
        </div>

        <PronounsTable lang="fr" />

        <MineExamples />

        <p>
          Un homme dit <F>la mienne</F> pour sa valise, parce que{" "}
          <F>valise</F> est féminin. Et <F>le nôtre</F>, <F>le vôtre</F>{" "}
          prennent un accent circonflexe, que <F>notre</F> et <F>votre</F>{" "}
          n’ont pas : <F>notre maison</F>, mais <F>la nôtre</F>. Ce{" "}
          <F>ô</F> se dit comme dans <F>hôtel</F> ou <F>drôle</F>.
        </p>

        <div className="attention">
          Après <F>à</F> et <F>de</F>, les petits mots <F>le</F> et{" "}
          <F>les</F> se collent : <F>au mien</F>, <F>du mien</F>,{" "}
          <F>aux leurs</F>, <F>des miens</F>. On dit{" "}
          <F>je pense à mon fils, et toi au tien ?</F>, jamais{" "}
          <Wrong>à le tien</Wrong>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <span className="fr" lang="fr">
            le mien, la mienne
          </span>
          : no repetir el nombre
        </h2>

        <div className="rule">
          Para no repetir <F>mon</F> y el nombre, se dice <F>le mien</F>,{" "}
          <F>la mienne</F>… Como con <F>mon</F>, <F>ma</F>, <F>mes</F>, el
          femenino y el plural van con la cosa, nunca con la persona. La palabra pequeña de delante
          cambia con ella: <F>le</F>, <F>la</F>, <F>les</F>.
        </div>

        <PronounsTable lang="es" />

        <MineExamples />

        <p>
          Un hombre dice <F>la mienne</F> para su maleta, porque <F>valise</F>{" "}
          es femenino. Y <F>le nôtre</F>, <F>le vôtre</F> llevan acento
          circunflejo, que <F>notre</F> y <F>votre</F> no tienen:{" "}
          <F>notre maison</F>, pero <F>la nôtre</F>. Esa <F>ô</F> suena como
          en <F>hôtel</F> o <F>drôle</F>.
        </p>

        <div className="attention">
          Después de <F>à</F> y <F>de</F>, las palabras <F>le</F> y{" "}
          <F>les</F> se unen a ellas: <F>au mien</F>, <F>du mien</F>,{" "}
          <F>aux leurs</F>, <F>des miens</F>. Se dice{" "}
          <F>je pense à mon fils, et toi au tien ?</F>, nunca{" "}
          <Wrong>à le tien</Wrong>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Pour dire à qui est une chose : <F>être à</F> et <F>moi</F>,{" "}
            <F>toi</F>, <F>lui</F>, <F>elle</F>, <F>nous</F>, <F>vous</F>,{" "}
            <F>eux</F>, <F>elles</F>.
          </li>
          <li>
            <F>à lui</F> et <F>à elle</F> disent si la chose est à un homme ou
            à une femme ; <F>son</F> et <F>sa</F> ne le disent pas.
          </li>
          <li>
            <F>mien</F> ne s’emploie pas seul : <F>c’est à moi</F> ou{" "}
            <F>c’est le mien</F>.
          </li>
          <li>
            <F>le mien</F>, <F>la mienne</F>, <F>les miens</F>,{" "}
            <F>les miennes</F> remplacent <F>mon</F> et le nom ; le féminin et
            le pluriel suivent la chose.
          </li>
          <li>
            <F>le nôtre</F> et <F>le vôtre</F> prennent un accent ;{" "}
            <F>notre</F> et <F>votre</F> n’en ont pas.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Para decir de quién es una cosa: <F>être à</F> y <F>moi</F>,{" "}
            <F>toi</F>, <F>lui</F>, <F>elle</F>, <F>nous</F>, <F>vous</F>,{" "}
            <F>eux</F>, <F>elles</F>.
          </li>
          <li>
            <F>à lui</F> y <F>à elle</F> dicen si la cosa es de un hombre o de
            una mujer; <F>son</F> y <F>sa</F> no lo dicen.
          </li>
          <li>
            <F>mien</F> no se usa solo: <F>c’est à moi</F> o{" "}
            <F>c’est le mien</F>.
          </li>
          <li>
            <F>le mien</F>, <F>la mienne</F>, <F>les miens</F>,{" "}
            <F>les miennes</F> sustituyen a <F>mon</F> y el nombre; el femenino
            y el plural van con la cosa.
          </li>
          <li>
            <F>le nôtre</F> y <F>le vôtre</F> llevan acento; <F>notre</F> y{" "}
            <F>votre</F> no.
          </li>
        </ul>
      </div>
    </article>
  );
}
