import Link from "next/link";
import { T } from "@/components/lang/T";
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
        <h2>
          <T
            fr="Relire, c’est aussi savoir s’arrêter"
            es="Releer también es saber parar"
          />
        </h2>

        <p data-ui="fr">
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
        <p data-ui="es" lang="es">
          Las palabras que hay que vigilar son siempre las mismas:{" "}
          <span className="fr" lang="fr">la</span>,{" "}
          <span className="fr" lang="fr">l’a</span>,{" "}
          <span className="fr" lang="fr">là</span>,{" "}
          <span className="fr" lang="fr">des</span>,{" "}
          <span className="fr" lang="fr">dès</span>,{" "}
          <span className="fr" lang="fr">du</span>,{" "}
          <span className="fr" lang="fr">dû</span>. A veces están bien, y
          señalarlas entonces también es una falta. Las tres pruebas están en{" "}
          <Link href="/orthographe/les-homophones-de-l-article" lang="fr">
            Les homophones de l’article
          </Link>
          .
        </p>

        <RelisezLeParagrapheDrill />
      </section>
    </article>
  );
}
