import Link from "next/link";
import { T } from "@/components/lang/T";
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
        <h2>
          <T fr="Le lien entre deux idées" es="El vínculo entre dos ideas" />
        </h2>

        <p data-ui="fr">
          Un connecteur ne se choisit pas dans une phrase isolée. Il dit le lien
          entre deux idées : la suite, la cause, la conséquence ou une
          opposition. Voici un autre épisode de l’Odyssée, Ulysse et les
          Sirènes. Lisez tout le récit avant de commencer. Les douze
          connecteurs sont dans{" "}
          <Link href="/grammaire/les-connecteurs">Les connecteurs</Link>.
        </p>
        <p data-ui="es" lang="es">
          Un conector no se elige en una frase aislada. Expresa el vínculo entre
          dos ideas: la continuación, la causa, la consecuencia o una
          oposición. Aquí tienes otro episodio de la Odisea, Ulises y las
          Sirenas. Lee todo el relato antes de empezar. Los doce conectores
          están en{" "}
          <Link href="/grammaire/les-connecteurs" lang="fr">
            Les connecteurs
          </Link>
          .
        </p>

        <ConnecteursDrill />
      </section>
    </article>
  );
}
