import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ParleParlesParlentDrill } from "./drill";

const PATH = "/exercices/parle-parles-parlent";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne est en espagnol, le
   français reste en français avec `lang="fr"` (`AGENTS.md` §1, #85). Le
   plateau compte les phrases lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Escribe la terminación</h2>

        <p>
          Con los verbos en <span lang="fr">-er</span>, la terminación cambia
          según el sujeto, pero casi no se oye:{" "}
          <span lang="fr">je parle</span>, <span lang="fr">tu parles</span> e{" "}
          <span lang="fr">ils parlent</span> suenan igual. Por eso hay que
          fijarse en el sujeto escrito. En cada frase te damos el sujeto y el
          verbo; elige lo que falta. A veces lo que falta es{" "}
          <span lang="fr">je</span> o <span lang="fr">j’</span>. Las reglas
          están en{" "}
          <Link lang="fr" href="/grammaire/les-verbes-en-er">
            Les verbes en -er
          </Link>
          .
        </p>

        <ParleParlesParlentDrill />
      </section>
    </article>
  );
}
