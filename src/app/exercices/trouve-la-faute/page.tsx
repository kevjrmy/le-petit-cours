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
        <h2>Dix phrases, dix fautes</h2>

        <p>
          Les cinq paires se prononcent de la même façon et ne s’écrivent pas
          pareil : <span className="fr">a / à</span>,{" "}
          <span className="fr">et / est</span>,{" "}
          <span className="fr">on / ont</span>,{" "}
          <span className="fr">son / sont</span>,{" "}
          <span className="fr">ou / où</span>. Le test de remplacement est dans{" "}
          <Link href="/orthographe/les-homophones">Les homophones</Link>.
        </p>

        <TrouveLaFauteDrill />
      </section>
    </article>
  );
}
