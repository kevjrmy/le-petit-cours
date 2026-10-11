import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { OpinionDrill } from "./drill";

const PATH = "/exercices/d-accord-ou-pas-d-accord";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et le lien restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`).

   La consigne ne compte pas les trous : le compteur du plateau le dit déjà
   (`AGENTS.md` §9). Elle n'écrit pas non plus « être d'accord » : deux trous
   demandent ce verbe (`data.ts`). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Deux amis, deux avis</h2>

        <p>
          Une formule d’avis ne se choisit pas dans une phrase isolée. Elle dit
          ce que l’on fait de l’idée de l’autre : on l’accepte, on la refuse ou
          on lui ajoute une raison. Inès et Marc prennent un café et parlent de
          leurs courses. Chacun a son avis. Lisez tout le dialogue avant de
          commencer. Les formules sont dans{" "}
          <Link href="/vocabulaire/l-opinion">L’opinion</Link>.
        </p>

        <OpinionDrill />
      </section>
    </article>
  );
}
