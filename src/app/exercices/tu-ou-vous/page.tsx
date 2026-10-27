import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { TuOuVousDrill } from "./drill";

const PATH = "/exercices/tu-ou-vous";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne existe en espagnol et en
   français (#85, #102), la langue de l'interface en montre une. Le français
   enseigné reste en français avec `lang="fr"`. Le plateau compte les
   situations lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Choisissez quoi dire" es="Elige qué decir" />
        </h2>

        <p data-ui="fr">
          Chaque situation dit à qui vous parlez et à quel moment de la journée.
          Choisissez la formule qui convient : <span className="fr">tu</span> ou{" "}
          <span className="fr">vous</span>, <span className="fr">bonjour</span>{" "}
          ou <span className="fr">bonsoir</span>,{" "}
          <span className="fr">merci</span> et sa réponse, et le bon mot pour
          s’excuser. Il n’y a qu’une bonne réponse à chaque fois. Les règles sont
          dans <Link href="/astuces/tu-ou-vous">Tu ou vous ?</Link>.
        </p>
        <p data-ui="es" lang="es">
          Cada situación describe con quién hablas y en qué momento del día. Elige
          la fórmula francesa que encaja: <span lang="fr">tu</span> o{" "}
          <span lang="fr">vous</span>, <span lang="fr">bonjour</span> o{" "}
          <span lang="fr">bonsoir</span>, <span lang="fr">merci</span> y su
          respuesta, y la palabra justa para pedir perdón. Solo hay una
          respuesta adecuada en cada caso. Las reglas están en{" "}
          <Link lang="fr" href="/astuces/tu-ou-vous">
            Tu ou vous ?
          </Link>
          .
        </p>

        <TuOuVousDrill />
      </section>
    </article>
  );
}
