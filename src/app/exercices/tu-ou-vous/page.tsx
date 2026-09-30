import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { TuOuVousDrill } from "./drill";

const PATH = "/exercices/tu-ou-vous";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne est en espagnol, le
   français reste en français avec `lang="fr"` (`AGENTS.md` §1, #85). Le
   plateau compte les situations lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Elige qué decir</h2>

        <p>
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
