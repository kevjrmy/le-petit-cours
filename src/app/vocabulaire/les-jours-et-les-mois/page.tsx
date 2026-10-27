import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-jours-et-les-mois";

export const metadata = lessonMetadata(PATH);

const JOURS: [string, string, string][] = [
  ["lundi", "lunes", "Lundi, je vais chez le médecin."],
  ["mardi", "martes", "Mardi, j’ai un rendez-vous."],
  ["mercredi", "miércoles", "Mercredi, je vais au cinéma."],
  ["jeudi", "jueves", "Jeudi, je vais chez Paul."],
  ["vendredi", "viernes", "Vendredi, je dîne chez ma sœur."],
  ["samedi", "sábado", "Samedi, je vais à la plage."],
  ["dimanche", "domingo", "Dimanche, je visite Paris."],
];

const MOIS: [string, string, string][] = [
  ["janvier", "enero", "Il fait froid en janvier."],
  ["février", "febrero", "Février est un mois court."],
  ["mars", "marzo", "Mon anniversaire est en mars."],
  ["avril", "abril", "En avril, il pleut souvent."],
  ["mai", "mayo", "Mai est un joli mois."],
  ["juin", "junio", "En juin, les jours sont longs."],
  ["juillet", "julio", "Nous partons en juillet."],
  ["août", "agosto", "En août, la ville est vide."],
  ["septembre", "septiembre", "Le cours commence en septembre."],
  ["octobre", "octubre", "En octobre, il fait doux."],
  ["novembre", "noviembre", "En novembre, il fait gris."],
  ["décembre", "diciembre", "Noël est en décembre."],
];

const SAISONS: [string, string, string, string][] = [
  ["le printemps", "la primavera", "au printemps", "Au printemps, il y a des fleurs."],
  ["l’été (m.)", "el verano", "en été", "En été, je vais à la plage."],
  ["l’automne (m.)", "el otoño", "en automne", "En automne, il pleut."],
  ["l’hiver (m.)", "el invierno", "en hiver", "En hiver, il fait nuit tôt."],
];

/* Two bodies, French and Spanish (#102). The French taught and the Spanish
   gloss columns are written once and shared. */

type Ui = "fr" | "es";

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

/* In the French body, lang is inherited. */
function F({ children }: { children: React.ReactNode }) {
  return <span className="fr">{children}</span>;
}

function WordTable({ ui, caption, rows }: { ui: Ui; caption: string; rows: [string, string, string][] }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Mot" : "Palabra"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "En español"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([fr, es, ex]) => (
            <tr key={fr}>
              <th scope="row" className="fr" lang="fr">
                {fr}
              </th>
              <td lang={ui === "fr" ? "es" : undefined}>{es}</td>
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

function SeasonsTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr" ? "Les quatre saisons et comment dire « en… »" : "Las cuatro estaciones y cómo decir «en…»"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Mot" : "Palabra"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "En español"}</th>
            <th scope="col">{ui === "fr" ? "« En… »" : "«En…»"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {SAISONS.map(([fr, es, en, ex]) => (
            <tr key={fr}>
              <th scope="row" className="fr" lang="fr">
                {fr}
              </th>
              <td lang={ui === "fr" ? "es" : undefined}>{es}</td>
              <td className="fr" lang="fr">
                {en}
              </td>
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

const DATE_QUESTIONS: [string, string, string, string][] = [
  ["Quel jour sommes-nous ?", "¿Qué día es hoy?", "más formal", "Nous sommes le 3 mars."],
  ["On est le combien ?", "¿A cuántos estamos?", "muy frecuente", "On est le 3 mars."],
  ["C’est quand, ton anniversaire ?", "¿Cuándo es tu cumpleaños?", "", "C’est le 14 juillet."],
];

const NOTES_FR: Record<string, string> = { "más formal": "plus formel", "muy frecuente": "très fréquent" };

function DateTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{ui === "fr" ? "Demander et donner la date" : "Preguntar y dar la fecha"}</caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Question" : "Pregunta"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "Se pregunta…"}</th>
            <th scope="col">{ui === "fr" ? "Réponse" : "Respuesta"}</th>
          </tr>
        </thead>
        <tbody>
          {DATE_QUESTIONS.map(([q, es, note, a]) => (
            <tr key={q}>
              <th scope="row" className="fr" lang="fr">
                {q}
              </th>
              <td>
                {ui === "fr" ? <span lang="es">{es}</span> : es}
                {note ? (ui === "fr" ? " (" + NOTES_FR[note] + ")" : " (" + note + ")") : ""}
              </td>
              <td className="fr" lang="fr">
                {a}
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
        <h2>Les jours de la semaine</h2>

        <div className="rule">
          Bonne nouvelle : comme en espagnol, les jours s’écrivent avec une{" "}
          <strong>minuscule</strong>. Ils sont tous masculins. La semaine commence par{" "}
          <F>lundi</F>.
        </div>

        <WordTable ui="fr" caption="Les sept jours de la semaine, avec une phrase" rows={JOURS} />

        <div className="example">
          Lundi, je vais chez le médecin.
          <br />
          Le lundi, je fais du sport.
        </div>

        <div className="attention">
          En espagnol, <span lang="es">« el lunes »</span> veut dire une seule fois et{" "}
          <span lang="es">« los lunes »</span>, chaque semaine. En français, c’est pareil, mais
          avec l’article au singulier. Sans article, <F>lundi</F> est <strong>ce lundi</strong>,
          une seule fois (<span lang="es">el lunes</span>). Avec l’article, <F>le lundi</F> est{" "}
          <strong>tous les lundis</strong>, une habitude (<span lang="es">los lunes</span>). Les
          phrases ci-dessus le montrent : <F>Lundi, je vais…</F> (lundi prochain) et{" "}
          <F>Le lundi, je fais…</F> (chaque lundi).
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Los días de la semana:{" "}
          <span className="fr" lang="fr">
            les jours
          </span>
        </h2>

        <div className="rule">
          Buenas noticias: como en español, los días se escriben con{" "}
          <strong>minúscula</strong>. Todos son masculinos. La semana empieza
          en <Fr>lundi</Fr>.
        </div>

        <WordTable ui="es" caption="Los siete días de la semana, con una frase" rows={JOURS} />

        <div className="example" lang="fr">
          Lundi, je vais chez le médecin.
          <br />
          Le lundi, je fais du sport.
        </div>

        <div className="attention">
          En español, «el lunes» es una vez y «los lunes» es cada semana. En francés
          es igual, pero con artículo en singular. Sin artículo,{" "}
          <Fr>lundi</Fr> es <strong>este lunes</strong>, una sola vez (el
          lunes). Con artículo, <Fr>le lundi</Fr> es{" "}
          <strong>todos los lunes</strong>, una costumbre (los lunes). La frase
          de arriba lo muestra: <Fr>Lundi, je vais…</Fr> (el lunes que viene) y{" "}
          <Fr>Le lundi, je fais…</Fr> (cada lunes).
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mois et les saisons</h2>

        <div className="rule">
          Les mois s’écrivent aussi avec une minuscule et sont masculins. Pour dire{" "}
          <span lang="es">« en marzo »</span>, utilisez <F>en</F> + le mois : <F>en mars</F>. Avec
          les saisons, on dit <F>en</F> pour l’été, l’automne et l’hiver, mais <F>au</F> pour le
          printemps : <F>au printemps</F>.
        </div>

        <WordTable ui="fr" caption="Les douze mois de l’année, avec une phrase" rows={MOIS} />

        <SeasonsTable ui="fr" />

        <div className="attention">
          <F>août</F> ne se prononce pas comme il s’écrit : il sonne comme le <strong>u</strong>{" "}
          espagnol de <em lang="es">uno</em> (certains disent « ut »), et le <F>a</F> ne s’entend
          pas. C’est le seul mois avec un accent circonflexe.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Los meses y las estaciones:{" "}
          <span className="fr" lang="fr">
            les mois et les saisons
          </span>
        </h2>

        <div className="rule">
          Los meses también van en minúscula y son masculinos. Para decir «en
          marzo», usa <Fr>en</Fr> + el mes: <Fr>en mars</Fr>. Con las
          estaciones, <Fr>en</Fr> para el verano, el otoño y el invierno, pero{" "}
          <Fr>au</Fr> para la primavera: <Fr>au printemps</Fr>.
        </div>

        <WordTable ui="es" caption="Los doce meses del año, con una frase" rows={MOIS} />

        <SeasonsTable ui="es" />

        <div className="attention">
          <Fr>août</Fr> no se pronuncia como se escribe: suena como la{" "}
          <strong>u</strong> española de <em>uno</em> (algunos dicen «ut»), y
          la <Fr>a</Fr> no se oye. Es el único mes con
          acento circunflejo.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Dire la date</h2>

        <div className="rule">
          Une date française, c’est <F>le</F> + nombre + mois. En espagnol, vous dites{" "}
          <span lang="es">« 3 de marzo »</span> ; en français, <strong>il n’y a pas de « de »</strong>{" "}
          : <F>le 3 mars</F>. Les nombres sont dans{" "}
          <Link href="/vocabulaire/les-nombres">Les nombres</Link>.
        </div>

        <div className="example">
          Nous sommes le 3 mars.
          <br />
          On est le 25 décembre.
          <br />
          Nous sommes mercredi 30 septembre.
        </div>

        <p>
          Avec le jour de la semaine, <F>le</F> disparaît : <F>Nous sommes mercredi 30 septembre</F>.
        </p>

        <div className="exception">
          Le premier jour du mois se dit <F>le premier</F> : <F>le 1er mai</F> (<F>le premier mai</F>). Les
          autres jours utilisent le nombre normal : <F>le deux mai</F>, <F>le trois mai</F>. On ne
          dit pas <s className="fr">le un mai</s>.
        </div>

        <DateTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Decir la fecha:{" "}
          <span className="fr" lang="fr">
            la date
          </span>
        </h2>

        <div className="rule">
          Una fecha francesa es <Fr>le</Fr> + número + mes. En español dices «3
          de marzo»; en francés <strong>no hay «de»</strong>: <Fr>le 3 mars</Fr>.
          Los números están en{" "}
          <Link href="/vocabulaire/les-nombres" lang="fr">
            Les nombres
          </Link>
          .
        </div>

        <div className="example" lang="fr">
          Nous sommes le 3 mars.
          <br />
          On est le 25 décembre.
          <br />
          Nous sommes mercredi 30 septembre.
        </div>

        <p>
          Con el día de la semana, <Fr>le</Fr> desaparece: <Fr>Nous sommes
          mercredi 30 septembre</Fr>.
        </p>

        <div className="exception">
          El día 1 se dice <Fr>le premier</Fr>: <Fr>le 1er mai</Fr> (
          <Fr>le premier mai</Fr>). Los demás días usan el número normal:{" "}
          <Fr>le deux mai</Fr>, <Fr>le trois mai</Fr>. Nunca{" "}
          <s className="fr" lang="fr">
            le un mai
          </s>
          .
        </div>

        <DateTable ui="es" />
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Les jours et les mois s’écrivent avec une minuscule et sont masculins :{" "}
            <F>lundi</F>, <F>mars</F>.
          </li>
          <li>
            <F>lundi</F> est ce lundi ; <F>le lundi</F> est tous les lundis.
          </li>
          <li>
            « En… » : <F>en mars</F>, <F>en été</F>, mais <F>au printemps</F>.
          </li>
          <li>
            La date, c’est <F>le</F> + nombre + mois, sans « de » : <F>le 3 mars</F>.
          </li>
          <li>
            Seul le premier jour est un ordinal : <F>le premier mai</F>. On demande{" "}
            <F>On est le combien ?</F> ou <F>C’est quand, ton anniversaire ?</F>
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Días y meses van en minúscula y son masculinos:{" "}
            <Fr>lundi</Fr>, <Fr>mars</Fr>.
          </li>
          <li>
            <Fr>lundi</Fr> es este lunes; <Fr>le lundi</Fr> es todos los lunes.
          </li>
          <li>
            «En…»: <Fr>en mars</Fr>, <Fr>en été</Fr>, pero <Fr>au printemps</Fr>.
          </li>
          <li>
            La fecha es <Fr>le</Fr> + número + mes, sin «de»:{" "}
            <Fr>le 3 mars</Fr>.
          </li>
          <li>
            Solo el primer día es ordinal: <Fr>le premier mai</Fr>. Se pregunta{" "}
            <Fr>On est le combien ?</Fr> o{" "}
            <Fr>C’est quand, ton anniversaire ?</Fr>
          </li>
        </ul>
      </div>
    </article>
  );
}
