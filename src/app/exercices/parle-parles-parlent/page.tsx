import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ParleParlesParlentDrill } from "./drill";

const PATH = "/exercices/parle-parles-parlent";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne existe en espagnol et en
   français (#85, #102), la langue de l'interface en montre une. Le français
   enseigné reste en français avec `lang="fr"`. Le plateau compte les phrases
   lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Écrivez la terminaison" es="Escribe la terminación" />
        </h2>

        <p data-ui="fr">
          Avec les verbes en <span className="fr">-er</span>, la terminaison
          change selon le sujet, mais on ne l’entend presque pas :{" "}
          <span className="fr">je parle</span>,{" "}
          <span className="fr">tu parles</span> et{" "}
          <span className="fr">ils parlent</span> sonnent pareil. Il faut donc
          regarder le sujet écrit. Dans chaque phrase, nous vous donnons le sujet
          et le verbe ; choisissez ce qui manque. Parfois, ce qui manque est{" "}
          <span className="fr">je</span> ou <span className="fr">j’</span>. Les
          règles sont dans{" "}
          <Link href="/grammaire/les-verbes-en-er">Les verbes en -er</Link>.
        </p>
        <p data-ui="es" lang="es">
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
