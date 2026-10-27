import type { Metadata } from "next";
import { InstallApp } from "@/components/install/InstallApp";

export const metadata: Metadata = {
  title: "Installer l’application",
  description: "Le Petit Cours sur l’écran d’accueil de votre téléphone, sans boutique d’applications.",
};

/* Server Component: only the install control is client (#101). It follows the
   interface language like every page (#102); `/instalar` is the same page in
   Spanish whatever the interface says, a link to send. The two change
   together. No tick, no level: it is not a lesson. */
export default function InstallerPage() {
  return (
    <article className="prose">
      <h1 data-ui="fr">Installer l&rsquo;application</h1>
      <h1 data-ui="es" lang="es">
        Instalar la aplicación
      </h1>

      <p data-ui="fr">
        Le Petit Cours s&rsquo;installe comme une application : une icône sur
        l&rsquo;écran d&rsquo;accueil, une fenêtre à lui, sans la barre du
        navigateur. Rien à télécharger dans une boutique, et c&rsquo;est
        gratuit.
      </p>
      <p data-ui="es" lang="es">
        <span lang="fr">Le Petit Cours</span> se instala como una aplicación:
        un icono en la pantalla de inicio, una ventana propia, sin la barra del
        navegador. No hay que descargar nada de una tienda, y es gratis.
      </p>

      <div data-ui="fr">
        <InstallApp lang="fr" />
      </div>
      <div data-ui="es" lang="es">
        <InstallApp lang="es" />
      </div>
    </article>
  );
}
