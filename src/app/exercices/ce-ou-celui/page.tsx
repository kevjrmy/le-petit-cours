import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { CeOuCeluiDrill } from "./drill";

const PATH = "/exercices/ce-ou-celui";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et les liens restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`).

   La consigne ne compte pas les phrases : les deux lots n'en ont pas forcément
   le même nombre, et le compteur du plateau le dit déjà (`AGENTS.md` §9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le déterminant ou le pronom</h2>

        <p>
          Le nom est encore là ? C’est un déterminant :{" "}
          <span className="fr">ce</span>, <span className="fr">cet</span>,{" "}
          <span className="fr">cette</span>, <span className="fr">ces</span>. Le
          nom a disparu ? C’est un pronom :{" "}
          <span className="fr">celui</span>, <span className="fr">celle</span>,{" "}
          <span className="fr">ceux</span>, <span className="fr">celles</span>.
          Les règles sont dans{" "}
          <Link href="/grammaire/les-determinants-demonstratifs">
            Les déterminants démonstratifs
          </Link>{" "}
          et{" "}
          <Link href="/grammaire/les-pronoms-demonstratifs">
            Les pronoms démonstratifs
          </Link>
          .
        </p>

        <CeOuCeluiDrill />
      </section>
    </article>
  );
}
