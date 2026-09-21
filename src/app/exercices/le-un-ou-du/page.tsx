import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { LeUnOuDuDrill } from "./drill";

const PATH = "/exercices/le-un-ou-du";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et les liens restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`).

   La consigne ne compte pas les trous : les deux textes n'en ont pas le même
   nombre, et le compteur du plateau le dit déjà (`AGENTS.md` §9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Un texte, pas des phrases</h2>

        <p>
          L’article ne se choisit pas dans une phrase isolée :{" "}
          <span className="fr">un chien</span> devient{" "}
          <span className="fr">le chien</span> à la ligne suivante parce qu’on
          en a déjà parlé. Lisez tout avant de commencer. Les trois séries sont
          dans{" "}
          <Link href="/grammaire/les-articles-definis">
            Les articles définis
          </Link>
          ,{" "}
          <Link href="/grammaire/les-articles-indefinis">
            Les articles indéfinis
          </Link>{" "}
          et{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </p>

        <LeUnOuDuDrill />
      </section>
    </article>
  );
}
