import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { RelisezLeParagrapheDrill } from "./drill";

const PATH = "/exercices/relisez-le-paragraphe";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et les liens restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Relire, c’est aussi savoir s’arrêter</h2>

        <p>
          Les mots à surveiller sont toujours les mêmes :{" "}
          <span className="fr">la</span>, <span className="fr">l’a</span>,{" "}
          <span className="fr">là</span>, <span className="fr">des</span>,{" "}
          <span className="fr">dès</span>, <span className="fr">du</span>,{" "}
          <span className="fr">dû</span>. Ils sont parfois justes, et les
          signaler alors est une faute aussi. Les trois tests sont dans{" "}
          <Link href="/orthographe/les-homophones-de-l-article">
            Les homophones de l’article
          </Link>
          .
        </p>

        <RelisezLeParagrapheDrill />
      </section>
    </article>
  );
}
