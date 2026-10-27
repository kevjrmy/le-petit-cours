import Link from "next/link";
import { T } from "@/components/lang/T";
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
        <h2>
          <T fr="Un texte, pas des phrases" es="Un texto, no frases sueltas" />
        </h2>

        <p data-ui="fr">
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
        <p data-ui="es" lang="es">
          El artículo no se elige en una frase aislada:{" "}
          <span className="fr" lang="fr">un chien</span> pasa a ser{" "}
          <span className="fr" lang="fr">le chien</span> en la línea siguiente
          porque ya se ha hablado de él. Lee todo antes de empezar. Las tres
          series están en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          ,{" "}
          <Link href="/grammaire/les-articles-indefinis" lang="fr">
            Les articles indéfinis
          </Link>{" "}
          y{" "}
          <Link href="/grammaire/les-articles-partitifs" lang="fr">
            Les articles partitifs
          </Link>
          .
        </p>

        <LeUnOuDuDrill />
      </section>
    </article>
  );
}
