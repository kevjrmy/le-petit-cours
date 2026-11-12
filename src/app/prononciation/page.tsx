import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ListenTool } from "./tool";

const PATH = "/prononciation";

export const metadata = lessonMetadata(PATH);

/* Server Component : seul l'outil est client. Ce n'est ni une leçon ni un
   exercice (#94) : rien à retenir, rien à corriger, donc ni « En résumé », ni
   score, ni coche. Chaque bloc de prose est doublé en espagnol (#102), et
   `globals.css` cache celui qui n'est pas la langue de l'interface. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <p data-ui="fr">
          Écrivez en français, puis écoutez : la voix de votre appareil lit
          tout, fautes comprises. Un mot comme <span className="fr">fils</span>,{" "}
          <span className="fr">plus</span> ou <span className="fr">est</span>{" "}
          se lit de deux façons : écrivez-le dans une phrase.
        </p>
        <p data-ui="es" lang="es">
          Escribe en francés y escucha: la voz de tu dispositivo lo lee todo,
          faltas incluidas. Una palabra como{" "}
          <span className="fr" lang="fr">
            fils
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            plus
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            est
          </span>{" "}
          se lee de dos maneras: escríbela en una frase.
        </p>

        <ListenTool />
      </section>
    </article>
  );
}
