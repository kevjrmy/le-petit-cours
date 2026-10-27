import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { QuelJourSommesNousDrill } from "./drill";

const PATH = "/exercices/quel-jour-sommes-nous";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne existe en espagnol et en
   français (#85, #102), la langue de l'interface en montre une. Le français
   enseigné reste en français avec `lang="fr"`. Le plateau compte les phrases
   lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Complétez la date" es="Completa la fecha" />
        </h2>

        <p data-ui="fr">
          Dans chaque phrase, il manque un mot, ou il n’en manque aucun : parfois
          la bonne réponse est <span className="fr">∅</span> (rien). Regardez
          trois choses : <span className="fr">au printemps</span> mais{" "}
          <span className="fr">en</span> avec les autres saisons et avec les
          mois ; dans une date, il n’y a ni « de » ni « un » (le jour 1 se dit{" "}
          <span className="fr">premier</span>) ; et <span className="fr">lundi</span>{" "}
          veut dire ce lundi, alors que <span className="fr">le lundi</span> veut
          dire tous les lundis. Quand la phrase a un indice, lisez-le. Les règles
          sont dans{" "}
          <Link href="/vocabulaire/les-jours-et-les-mois">
            Les jours et les mois
          </Link>
          .
        </p>
        <p data-ui="es" lang="es">
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
