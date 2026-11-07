import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { VacancesDrill } from "./drill";

const PATH = "/exercices/raconter-ses-vacances";

export const metadata = lessonMetadata(PATH);

/* Server Component : la consigne reste rendue sur le serveur, seul le plateau
   est client. Elle ne compte pas les trous : le compteur du plateau le dit
   (`AGENTS.md` §9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Une semaine de vacances" es="Una semana de vacaciones" />
        </h2>

        <p data-ui="fr">
          Pour raconter ses vacances, il faut deux temps : l’imparfait pour le
          décor et les habitudes, le passé composé pour ce qui est arrivé. Lisez
          tout le récit, puis choisissez dans chaque trou. Le récit mêle deux
          questions : le bon temps, et le mot juste (<span className="fr">en
          vacances</span>, <span className="fr">rendre visite à</span> ou{" "}
          <span className="fr">visiter</span>…). La règle est dans{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait">
            Passé composé ou imparfait ?
          </Link>
          , les mots dans{" "}
          <Link href="/vocabulaire/les-vacances">Les vacances</Link>.
        </p>
        <p data-ui="es" lang="es">
          Para contar las vacaciones hacen falta dos tiempos: el imperfecto para
          el decorado y las costumbres, el <span className="fr" lang="fr">passé
          composé</span> para lo que ocurrió. Lee todo el relato y elige en cada
          hueco. El relato mezcla dos preguntas: el tiempo correcto y la palabra
          exacta (<span className="fr" lang="fr">en vacances</span>,{" "}
          <span className="fr" lang="fr">rendre visite à</span> o{" "}
          <span className="fr" lang="fr">visiter</span>…). La regla está en{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait" lang="fr">
            Passé composé ou imparfait ?
          </Link>
          , las palabras en{" "}
          <Link href="/vocabulaire/les-vacances" lang="fr">
            Les vacances
          </Link>
          .
        </p>

        <VacancesDrill />
      </section>
    </article>
  );
}
