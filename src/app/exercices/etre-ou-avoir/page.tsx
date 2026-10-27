import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { EtreOuAvoirDrill } from "./drill";

const PATH = "/exercices/etre-ou-avoir";

export const metadata = lessonMetadata(PATH);

/* Server Component : le titre, la consigne et les liens restent rendus sur le
   serveur, seul le plateau est client (`.claude/agents/exercise-author.md`). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Classez les verbes" es="Clasifica los verbos" />
        </h2>

        <p data-ui="fr">
          Au passé composé, une petite famille de verbes se conjugue avec{" "}
          <span className="fr">être</span> : ceux qui disent un déplacement ou
          un changement d’état, et tous les verbes pronominaux. Tous les autres
          prennent <span className="fr">avoir</span>. La règle est dans{" "}
          <Link href="/grammaire/le-passe-compose">Le passé composé</Link>.
        </p>
        <p data-ui="es" lang="es">
          En <span className="fr" lang="fr">passé composé</span>, una pequeña familia de verbos se conjuga con{" "}
          <span className="fr" lang="fr">être</span>: los que expresan un
          desplazamiento o un cambio de estado, y todos los verbos
          pronominales. Todos los demás llevan{" "}
          <span className="fr" lang="fr">avoir</span>. La regla está en{" "}
          <Link href="/grammaire/le-passe-compose" lang="fr">Le passé composé</Link>.
        </p>

        <EtreOuAvoirDrill />
      </section>
    </article>
  );
}
