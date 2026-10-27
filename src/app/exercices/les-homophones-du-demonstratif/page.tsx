import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { HomophonesDemonstratifDrill } from "./drill";

const PATH = "/exercices/les-homophones-du-demonstratif";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et les liens restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T
            fr="Huit mots, quatre prononciations"
            es="Ocho palabras, cuatro pronunciaciones"
          />
        </h2>

        <p data-ui="fr">
          Rien ici ne s’entend : les paires sont identiques à l’oreille, et
          c’est ce qui entoure le mot qui décide. Un nom juste après appelle{" "}
          <span className="fr">ce</span>, <span className="fr">ces</span>,{" "}
          <span className="fr">sa</span> ou <span className="fr">ses</span> ; un
          participe passé appelle <span className="fr">s’est</span>. Les quatre
          tests sont dans{" "}
          <Link href="/orthographe/les-homophones-du-demonstratif">
            Les homophones du démonstratif
          </Link>
          .
        </p>
        <p data-ui="es" lang="es">
          Aquí nada se oye: las parejas suenan idénticas, y lo que decide es lo
          que rodea a la palabra. Un sustantivo justo después pide{" "}
          <span className="fr" lang="fr">ce</span>,{" "}
          <span className="fr" lang="fr">ces</span>,{" "}
          <span className="fr" lang="fr">sa</span> o{" "}
          <span className="fr" lang="fr">ses</span>; un participio pasado pide{" "}
          <span className="fr" lang="fr">s’est</span>. Las cuatro pruebas están
          en{" "}
          <Link href="/orthographe/les-homophones-du-demonstratif" lang="fr">
            Les homophones du démonstratif
          </Link>
          .
        </p>

        <HomophonesDemonstratifDrill />
      </section>
    </article>
  );
}
