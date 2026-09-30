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

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
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

        <div className="table-wrap">
          <table>
            <caption>Los siete días de la semana, con una frase</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              {JOURS.map(([fr, es, ex]) => (
                <tr key={fr}>
                  <th scope="row" className="fr" lang="fr">
                    {fr}
                  </th>
                  <td>{es}</td>
                  <td className="fr" lang="fr">
                    {ex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      <section lang="es">
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

        <div className="table-wrap">
          <table>
            <caption>Los doce meses del año, con una frase</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              {MOIS.map(([fr, es, ex]) => (
                <tr key={fr}>
                  <th scope="row" className="fr" lang="fr">
                    {fr}
                  </th>
                  <td>{es}</td>
                  <td className="fr" lang="fr">
                    {ex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Las cuatro estaciones y cómo decir «en…»</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">«En…»</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              {SAISONS.map(([fr, es, en, ex]) => (
                <tr key={fr}>
                  <th scope="row" className="fr" lang="fr">
                    {fr}
                  </th>
                  <td>{es}</td>
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

        <div className="attention">
          <Fr>août</Fr> no se pronuncia como se escribe: suena como la{" "}
          <strong>u</strong> española de <em>uno</em> (algunos dicen «ut»), y
          la <Fr>a</Fr> no se oye. Es el único mes con
          acento circunflejo.
        </div>
      </section>

      <section lang="es">
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
          <Fr>le deux mai</Fr>, <Fr>le trois mai</Fr>. Nunca «le un mai».
        </div>

        <div className="table-wrap">
          <table>
            <caption>Preguntar y dar la fecha</caption>
            <thead>
              <tr>
                <th scope="col">Pregunta</th>
                <th scope="col">Se pregunta…</th>
                <th scope="col">Respuesta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  Quel jour sommes-nous ?
                </th>
                <td>¿Qué día es hoy? (más formal)</td>
                <td className="fr" lang="fr">
                  Nous sommes le 3 mars.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  On est le combien ?
                </th>
                <td>¿A cuántos estamos? (muy frecuente)</td>
                <td className="fr" lang="fr">
                  On est le 3 mars.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  C’est quand, ton anniversaire ?
                </th>
                <td>¿Cuándo es tu cumpleaños?</td>
                <td className="fr" lang="fr">
                  C’est le 14 juillet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="resume" lang="es">
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
