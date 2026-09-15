import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { LesTerminaisonsDrill } from "./drill";

const PATH = "/exercices/les-terminaisons";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre et les liens restent rendus sur le serveur, seul
   le plateau est client (`.claude/agents/exercise-author.md`).

   Pas de section d'introduction ici, et c'est voulu : la consigne tient en une
   ligne, elle est dans le plateau, et le tableau se lit tout seul. La leçon qui
   explique ces terminaisons est dans « Pour aller plus loin », que la coquille
   dessine à partir du manifeste (#49). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <LesTerminaisonsDrill />
      </section>
    </article>
  );
}
