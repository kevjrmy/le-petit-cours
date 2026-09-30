import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { QuelJourSommesNousDrill } from "./drill";

const PATH = "/exercices/quel-jour-sommes-nous";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : consigne en espagnol, français en
   français avec `lang="fr"` (`AGENTS.md` §1, #85). Le plateau compte les
   phrases lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Completa la fecha</h2>

        <p>
          En cada frase falta una palabra, o no falta ninguna: a veces la
          respuesta correcta es <span lang="fr">∅</span> (nada). Fíjate en tres
          cosas: <span lang="fr">au printemps</span> pero{" "}
          <span lang="fr">en</span> con las demás estaciones y con los meses;
          en una fecha no hay «de» ni «un» (el día 1 es{" "}
          <span lang="fr">premier</span>); y <span lang="fr">lundi</span> es
          este lunes, mientras que <span lang="fr">le lundi</span> es todos los
          lunes. Cuando la frase tiene una pista en español, léela. Las reglas
          están en{" "}
          <Link lang="fr" href="/vocabulaire/les-jours-et-les-mois">
            Les jours et les mois
          </Link>
          .
        </p>

        <QuelJourSommesNousDrill />
      </section>
    </article>
  );
}
