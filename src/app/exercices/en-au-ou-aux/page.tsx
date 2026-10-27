import Link from "next/link";
import { T } from "@/components/lang/T";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { EnAuOuAuxDrill } from "./drill";

const PATH = "/exercices/en-au-ou-aux";

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
          <T fr="Pays et nationalités" es="Países y nacionalidades" />
        </h2>

        <p data-ui="fr">
          Il y a deux sortes de phrases. Dans les premières, il manque la
          préposition d’un pays ou d’une ville : <span className="fr">en, au, aux, à</span>{" "}
          pour dire où vous habitez, <span className="fr">d’, de, du, des</span>{" "}
          pour dire d’où vous venez. Dans les autres, choisissez la nationalité
          qui s’accorde avec la personne qui parle : <span className="fr">il</span>{" "}
          demande le masculin, <span className="fr">elle</span> le féminin. Les
          règles et les pays sont dans{" "}
          <Link href="/vocabulaire/les-pays-et-les-nationalites">
            Les pays et les nationalités
          </Link>
          .
        </p>
        <p data-ui="es" lang="es">
          Hay dos tipos de frases. En las primeras falta la preposición que va
          con un país o una ciudad: <span lang="fr">en, au, aux, à</span> para
          decir dónde vives, <span lang="fr">d’, de, du, des</span> para decir de
          dónde vienes. En las otras, elige la nacionalidad que concuerda con
          quien habla: <span lang="fr">il</span> pide el masculino,{" "}
          <span lang="fr">elle</span> el femenino. Las reglas y los países están
          en{" "}
          <Link lang="fr" href="/vocabulaire/les-pays-et-les-nationalites">
            Les pays et les nationalités
          </Link>
          .
        </p>

        <EnAuOuAuxDrill />
      </section>
    </article>
  );
}
