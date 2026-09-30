import type { ReactNode } from "react";
import type { Level } from "@/data/navigation";
import { etapesOf, type Parcours } from "@/data/parcours";
import type { Lang } from "@/lib/account";

/**
 * The words the account screens share, in both their languages (#91): the
 * onboarding and `/compte` say the same things about the same choices, so they
 * say them from here. A component's own sentences stay in the component.
 *
 * **Names stay French in Spanish text** — parcours, levels, « La suite » —
 * because that is what the rest of the site calls them (#90). The account
 * menu's rows are the exception: « Mi progresión », « Cuenta » (#91).
 */

/** French inside Spanish text: a name the site uses everywhere. */
export function Fr({ children }: { children: ReactNode }) {
  return <span lang="fr">{children}</span>;
}

/** What each level is for, in the learner's own terms rather than in CEFR's. */
export const LEVEL_BLURB: Record<Lang, Record<Level, string>> = {
  fr: {
    A1: "Les premiers pas. Expliqué en espagnol, enseigné en français.",
    A2: "Le quotidien, raconter au passé, parler de ses projets.",
    B1: "Raconter en détail, imaginer, lire de près.",
    B2: "",
  },
  es: {
    A1: "Los primeros pasos. Explicado en español, enseñado en francés.",
    A2: "La vida diaria, contar en pasado, hablar de tus planes.",
    B1: "Contar con detalle, imaginar, leer de cerca.",
    B2: "",
  },
};

/** The parcours blurbs in Spanish, by id; a missing one falls back to French. */
const PARCOURS_ES: Record<string, string> = {
  a1: "Empiezas. Presentarte, hablar de los tuyos, contar y comprar.",
  a2: "Te defiendes. La vida diaria, contar en pasado, hablar de tus planes.",
  b1: "Sigues una conversación. Contar con detalle, imaginar, leer de cerca.",
  "ecrire-le-francais":
    "Ya lo hablas. Escribir lo que sabes decir: acentos, homófonos, terminaciones.",
};

/** A parcours's blurb, and the `lang` to mark it with when it stayed French. */
export function parcoursBlurb(parcours: Parcours, lang: Lang): { text: string; lang?: string } {
  const es = lang === "es" ? PARCOURS_ES[parcours.id] : undefined;
  if (es) return { text: es };
  return { text: parcours.blurb, lang: lang === "es" ? "fr" : undefined };
}

/** « 38 leçons en 9 étapes » — what choosing the path signs up for. */
export function parcoursSize(parcours: Parcours, lang: Lang): string {
  const lessons = etapesOf(parcours).reduce((sum, etape) => sum + etape.steps.length, 0);
  const etapes = parcours.etapes.length;
  return lang === "es"
    ? `${lessons} lecciones en ${etapes} etapa${etapes === 1 ? "" : "s"}`
    : `${lessons} leçons en ${etapes} étape${etapes === 1 ? "" : "s"}`;
}

export const WORDS = {
  fr: {
    noParcours: "Vous choisissez vos leçons vous-même, sans « La suite ».",
    allLevels: "Toutes les leçons, rangées par niveau.",
    unavailable: "L’enregistrement n’a pas abouti. Vérifiez votre connexion et réessayez.",
    noSession: "Votre session a expiré. Reconnectez-vous pour enregistrer.",
    saving: "Enregistrement…",
    save: "Enregistrer",
    change: "Changer",
    signOut: "Se déconnecter",
  },
  es: {
    noParcours: "Eliges tú las lecciones, sin « La suite ».",
    allLevels: "Todas las lecciones, ordenadas por nivel.",
    unavailable: "No se ha podido guardar. Comprueba tu conexión y vuelve a intentarlo.",
    noSession: "Tu sesión ha caducado. Vuelve a iniciar sesión para guardar.",
    saving: "Guardando…",
    save: "Guardar",
    change: "Cambiar",
    signOut: "Cerrar sesión",
  },
} satisfies Record<Lang, Record<string, string>>;
