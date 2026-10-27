import type { Metadata } from "next";
import Link from "next/link";
import { InstallApp } from "@/components/install/InstallApp";

export const metadata: Metadata = {
  title: "Installer l’application",
  description: "Le Petit Cours sur l’écran d’accueil de votre téléphone, sans boutique d’applications.",
};

/* Server Component: only the install control is client (#101). The same page
   in Spanish is `/instalar`; the two link to each other and change together.
   No tick, no level: it is not a lesson. */
export default function InstallerPage() {
  return (
    <article className="prose">
      <h1>Installer l&rsquo;application</h1>

      <p>
        <Link href="/instalar" hrefLang="es" lang="es">
          Leer en español
        </Link>
      </p>

      <p>
        Le Petit Cours s&rsquo;installe comme une application : une icône sur
        l&rsquo;écran d&rsquo;accueil, une fenêtre à lui, sans la barre du
        navigateur. Rien à télécharger dans une boutique, et c&rsquo;est
        gratuit.
      </p>

      <InstallApp lang="fr" />
    </article>
  );
}
