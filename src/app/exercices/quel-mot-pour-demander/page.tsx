import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { QuelMotDrill } from "./drill";

const PATH = "/exercices/quel-mot-pour-demander";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne existe en espagnol et en
   français (#85, #102), la langue de l'interface en montre une. Le français
   enseigné reste en français avec `lang="fr"`. Le plateau compte les
   questions lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T
            fr="Choisissez le mot pour demander"
            es="Elige la palabra para preguntar"
          />
        </h2>

        <p data-ui="fr">
          Dans chaque question, il manque un mot. Lisez la réponse, sous la
          question : elle vous dit ce qu’on demande (une personne, un lieu, un
          moment, une quantité, une cause…). Si la réponse est{" "}
          <span className="fr">oui</span> ou <span className="fr">non</span>, la
          question commence par <span className="fr">est-ce que</span>. Devant
          un nom, regardez s’il est masculin ou féminin, singulier ou pluriel,
          pour choisir entre{" "}
          <span className="fr">quel, quelle, quels, quelles</span>. Les règles
          sont dans{" "}
          <Link href="/grammaire/poser-une-question">Poser une question</Link>.
        </p>
        <p data-ui="es" lang="es">
          En cada pregunta falta una palabra. Lee la respuesta que aparece
          debajo: te dice qué se pregunta (una persona, un lugar, un momento,
          una cantidad, una causa…). Si la respuesta es{" "}
          <span lang="fr">oui</span> o <span lang="fr">non</span>, la pregunta
          empieza con <span lang="fr">est-ce que</span>. Delante de un nombre,
          fíjate en si es masculino o femenino, singular o plural, para elegir
          entre <span lang="fr">quel, quelle, quels, quelles</span>. Las
          reglas están en{" "}
          <Link lang="fr" href="/grammaire/poser-une-question">
            Poser une question
          </Link>
          .
        </p>

        <QuelMotDrill />
      </section>
    </article>
  );
}
