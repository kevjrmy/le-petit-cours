import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { LeLaOuUnDrill } from "./drill";

const PATH = "/exercices/le-la-ou-un";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : la consigne existe en espagnol et en
   français (#85, #102), la langue de l'interface en montre une. Le français
   enseigné reste en français avec `lang="fr"`, et l'espagnol dans la version
   française porte `lang="es"`. Le plateau compte les phrases lui-même, la
   consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>
          <T fr="Choisissez l’article" es="Elige el artículo" />
        </h2>

        <p data-ui="fr">
          Dans chaque phrase, il manque un article. Regardez deux choses.
          D’abord : parle-t-on de quelque chose qu’on connaît déjà (
          <span className="fr">le, la, l’, les</span>) ou de quelque chose de
          nouveau (<span className="fr">un, une, des</span>) ? Ensuite : le nom
          est-il masculin ou féminin, singulier ou pluriel, et commence-t-il par
          une voyelle ? Attention : <span className="fr">des</span> ne peut pas
          disparaître, comme en espagnol. Les règles sont dans{" "}
          <Link href="/grammaire/les-articles-definis">Les articles définis</Link>{" "}
          et dans{" "}
          <Link href="/grammaire/les-articles-indefinis">
            Les articles indéfinis
          </Link>
          . Les noms sont dans{" "}
          <Link href="/vocabulaire/la-maison">La maison</Link> et{" "}
          <Link href="/vocabulaire/les-transports">Les transports</Link>.
        </p>
        <p data-ui="es" lang="es">
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
