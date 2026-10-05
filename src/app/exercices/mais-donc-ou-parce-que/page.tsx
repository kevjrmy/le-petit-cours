import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ConnecteursDrill } from "./drill";

const PATH = "/exercices/mais-donc-ou-parce-que";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et le lien restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`).

   La consigne ne compte pas les trous : le compteur du plateau le dit déjà
   (`AGENTS.md` §9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le lien entre deux idées</h2>

        <p>
          Un connecteur ne se choisit pas dans une phrase isolée. Il dit le lien
          entre deux idées : la suite, la cause, la conséquence ou une
          opposition. Voici un autre épisode de l’Odyssée, Ulysse et les
          Sirènes. Lisez tout le récit avant de commencer. Les douze
          connecteurs sont dans{" "}
          <Link href="/grammaire/les-connecteurs">Les connecteurs</Link>.
        </p>

        <ConnecteursDrill />
      </section>
    </article>
  );
}
