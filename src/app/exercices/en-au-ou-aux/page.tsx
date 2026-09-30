import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { EnAuOuAuxDrill } from "./drill";

const PATH = "/exercices/en-au-ou-aux";

export const metadata = lessonMetadata(PATH);

/* Server Component. Page écrite à l'A1 : consigne en espagnol, français en
   français avec `lang="fr"` (`AGENTS.md` §1, #85). Le plateau compte les
   phrases lui-même, la consigne ne les compte pas (§9). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Países y nacionalidades</h2>

        <p>
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
