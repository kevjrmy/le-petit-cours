import Link from "next/link";
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
        <h2>Une faute par phrase</h2>

        <p>
          Chaque phrase contient un homophone mal écrit : deux mots qui se
          prononcent de la même façon et ne s’écrivent pas pareil. Les paires
          changent avec le niveau ; le test de remplacement, lui, ne change pas,
          et il est dans{" "}
          <Link href="/orthographe/les-homophones">Les homophones</Link>.
        </p>

        <TrouveLaFauteDrill />
      </section>
    </article>
  );
}
