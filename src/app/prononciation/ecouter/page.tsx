import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ListenTool } from "./tool";

const PATH = "/prononciation/ecouter";

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
          Écrivez un mot ou une phrase en français, puis écoutez. La voix est
          celle de votre appareil : elle lit ce qui est écrit, fautes comprises.
        </p>
        <p data-ui="es" lang="es">
          Escribe una palabra o una frase en francés y escúchala. La voz es la
          de tu dispositivo: lee lo que está escrito, con las faltas incluidas.
        </p>

        <ListenTool />

        <div className="attention" data-ui="fr">
          Un mot seul peut se lire de deux façons :{" "}
          <span className="fr">fils</span>, <span className="fr">plus</span>,{" "}
          <span className="fr">est</span>. Écrivez-le dans une phrase : la voix
          choisit mieux.
        </div>
        {/* `lang="es"` on the box: its label reads « Recuerda » (`:lang(es)`). */}
        <div className="attention" data-ui="es" lang="es">
          Una palabra sola puede leerse de dos maneras:{" "}
          <span className="fr" lang="fr">
            fils
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            plus
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            est
          </span>
          . Escríbela dentro de una frase: la voz elige mejor.
        </div>
      </section>
    </article>
  );
}
