import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { QuelMotDrill } from "./drill";

const PATH = "/exercices/quel-mot-pour-demander";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne est en espagnol, le
   français reste en français avec `lang="fr"` (`AGENTS.md` §1, #85). Le
   plateau compte les questions lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Elige la palabra para preguntar</h2>

        <p>
          En cada pregunta falta una palabra. Lee la respuesta que aparece
          debajo: te dice qué se pregunta (una persona, un lugar, un momento,
          una cantidad, una causa…). Si la respuesta es{" "}
          <span lang="fr">oui</span> o <span lang="fr">non</span>, la pregunta
          empieza con <span lang="fr">est-ce que</span>. Delante de un nombre,
          fíjate en si es masculino o femenino, singular o plural, para elegir
          entre <span lang="fr">quel, quelle, quels, quelles</span>. Las
          reglas están en{" "}
          <Link lang="fr" href="/grammaire/poser-une-question">
            Poser une question
          </Link>
          .
        </p>

        <QuelMotDrill />
      </section>
    </article>
  );
}
