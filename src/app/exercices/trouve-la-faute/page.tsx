import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { TrouveLaFauteDrill } from "./drill";

const PATH = "/exercices/trouve-la-faute";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Une faute par phrase" es="Una falta por frase" />
        </h2>

        <p data-ui="fr">
          Chaque phrase contient un homophone mal écrit : deux mots qui se
          prononcent de la même façon et ne s’écrivent pas pareil. Les paires
          changent avec le niveau ; le test de remplacement, lui, ne change pas,
          et il est dans{" "}
          <Link href="/orthographe/les-homophones">Les homophones</Link>.
        </p>
        <p data-ui="es" lang="es">
          Cada frase contiene un homófono mal escrito: dos palabras que suenan
          igual y no se escriben igual. Las parejas cambian con el nivel; la
          prueba de sustitución, en cambio, no cambia, y está en{" "}
          <Link href="/orthographe/les-homophones" lang="fr">Les homophones</Link>.
        </p>

        <TrouveLaFauteDrill />
      </section>
    </article>
  );
}
