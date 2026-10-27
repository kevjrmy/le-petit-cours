import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { JAimeLeCafeDrill } from "./drill";

const PATH = "/exercices/j-aime-le-cafe";

export const metadata = lessonMetadata(PATH);

/* Server Component, page A1 : la consigne existe en espagnol et en français
   (#85, #102), la langue de l'interface en montre une. Le français enseigné
   reste en français avec `lang="fr"`. Le plateau compte les phrases, la
   consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Goûts, commandes et repas" es="Gustos, pedidos y comida" />
        </h2>

        <p data-ui="fr">
          Dans chaque phrase, il manque l’article. Regardez le verbe avant de
          choisir : avec{" "}
          <span className="fr">aimer, adorer, détester, préférer</span>, on
          parle de quelque chose en général et on met l’article défini (
          <span className="fr">le, la, l’, les</span>), même à la forme
          négative. Avec <span className="fr">je voudrais</span> et{" "}
          <span className="fr">je mange</span>, d’autres règles s’appliquent.
          Tout est dans{" "}
          <Link href="/grammaire/parler-de-ses-gouts">Parler de ses goûts</Link>.
        </p>
        <p data-ui="es" lang="es">
          En cada frase falta el artículo. Mira el verbo antes de elegir: con{" "}
          <span lang="fr">aimer, adorer, détester, préférer</span> hablas de
          algo en general y va el definido (<span lang="fr">le, la, l’, les</span>
          ), también en la negación. Con <span lang="fr">je voudrais</span> y{" "}
          <span lang="fr">je mange</span> se aplican otras reglas. Todo está en{" "}
          <Link lang="fr" href="/grammaire/parler-de-ses-gouts">
            Parler de ses goûts
          </Link>
          .
        </p>

        <JAimeLeCafeDrill />
      </section>
    </article>
  );
}
