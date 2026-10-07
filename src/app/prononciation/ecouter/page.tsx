import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ListenTool } from "./tool";

const PATH = "/prononciation/ecouter";

export const metadata = lessonMetadata(PATH);

/* Server Component : seul l'outil est client. Ce n'est ni une leçon ni un
   exercice (#94) : rien à retenir, rien à corriger, donc ni « En résumé », ni
   score, ni coche. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <p>
          Écrivez un mot ou une phrase en français, puis écoutez. La voix est
          celle de votre appareil : elle lit ce qui est écrit, fautes comprises.
        </p>

        <ListenTool />

        <div className="attention">
          Un mot seul peut se lire de deux façons :{" "}
          <span className="fr">fils</span>, <span className="fr">plus</span>,{" "}
          <span className="fr">est</span>. Écrivez-le dans une phrase : la voix
          choisit mieux.
        </div>
      </section>
    </article>
  );
}
