import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { JAimeLeCafeDrill } from "./drill";

const PATH = "/exercices/j-aime-le-cafe";

export const metadata = lessonMetadata(PATH);

/* Server Component, page A1 : consigne en espagnol, français en `lang="fr"`
   (#85). Le plateau compte les phrases, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Gustos, pedidos y comida</h2>

        <p>
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
