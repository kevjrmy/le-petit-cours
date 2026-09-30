import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { LeLaOuUnDrill } from "./drill";

const PATH = "/exercices/le-la-ou-un";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne est en espagnol, le
   français reste en français avec `lang="fr"` (`AGENTS.md` §1, #85). Le
   plateau compte les phrases lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Elige el artículo</h2>

        <p>
          En cada frase falta un artículo. Fíjate en dos cosas: si hablas de
          algo que ya se conoce (<span lang="fr">le, la, l’, les</span>) o de
          algo nuevo (<span lang="fr">un, une, des</span>), y cómo es el
          nombre: masculino o femenino, singular o plural, y si empieza por
          vocal. Recuerda que <span lang="fr">des</span> no se puede omitir,
          como sí haces en español. Las reglas están en{" "}
          <Link lang="fr" href="/grammaire/les-articles-definis">Les articles définis</Link>{" "}
          y en{" "}
          <Link lang="fr" href="/grammaire/les-articles-indefinis">
            Les articles indéfinis
          </Link>
          ; los nombres, en{" "}
          <Link lang="fr" href="/vocabulaire/la-maison">La maison</Link> y{" "}
          <Link lang="fr" href="/vocabulaire/les-transports">Les transports</Link>.
        </p>

        <LeLaOuUnDrill />
      </section>
    </article>
  );
}
