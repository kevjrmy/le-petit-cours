import type { Metadata } from "next";
import { InstallApp } from "@/components/install/InstallApp";

export const metadata: Metadata = {
  title: "Instalar la aplicación",
  description: "Le Petit Cours en la pantalla de inicio de tu móvil, sin tienda de aplicaciones.",
};

/* `/installer` in Spanish (#101), the one page outside the account screens
   (#91) written in Spanish from its title down — so `lang="es"` sits on the
   article here, where an A1 page keeps it off because its title stays French.
   The course's name stays French, marked `lang="fr"`. Since #102 `/installer`
   follows the interface language, so this one is the link to send someone in
   Spanish; the two change together. */
export default function InstalarPage() {
  return (
    <article className="prose" lang="es">
      <h1>Instalar la aplicación</h1>

      <p>
        <span lang="fr">Le Petit Cours</span> se instala como una aplicación:
        un icono en la pantalla de inicio, una ventana propia, sin la barra del
        navegador. No hay que descargar nada de una tienda, y es gratis.
      </p>

      <InstallApp lang="es" />
    </article>
  );
}
