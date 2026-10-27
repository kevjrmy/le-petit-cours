import type { Level } from "@/data/navigation";
import { etapesOf, type Parcours } from "@/data/parcours";
import type { Lang } from "@/lib/account";

/**
 * The words the account screens share, in both their languages (#91, #102):
 * the onboarding and `/compte` say the same things about the same choices, so
 * they say them from here. A component's own sentences stay in the component.
 *
 * **The Spanish names the Spanish interface uses** — recorrido, Lo siguiente,
 * Índice — now that the whole chrome speaks Spanish (#102). A lesson's title
 * is the one name that stays French in Spanish text, marked `lang="fr"`.
 */

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

/** A parcours's name and blurb, in the interface's language (its `es` twin). */
export function parcoursWords(parcours: Parcours, lang: Lang): { title: string; blurb: string } {
  return lang === "es" ? parcours.es : { title: parcours.title, blurb: parcours.blurb };
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
    noParcoursName: "Aucun parcours",
    allName: "Tout",
    noParcours: "Vous choisissez vos leçons vous-même, sans « La suite ».",
    allLevels: "Toutes les leçons, rangées par niveau.",
    unavailable: "L’enregistrement n’a pas abouti. Vérifiez votre connexion et réessayez.",
    noSession: "Votre session a expiré. Reconnectez-vous pour enregistrer.",
    saving: "Enregistrement…",
    save: "Enregistrer",
    change: "Changer",
    signOut: "Se déconnecter",
  },
  es: {
    noParcoursName: "Ningún recorrido",
    allName: "Todo",
    noParcours: "Eliges tú las lecciones, sin «Lo siguiente».",
    allLevels: "Todas las lecciones, ordenadas por nivel.",
    unavailable: "No se ha podido guardar. Comprueba tu conexión y vuelve a intentarlo.",
    noSession: "Tu sesión ha caducado. Vuelve a iniciar sesión para guardar.",
    saving: "Guardando…",
    save: "Guardar",
    change: "Cambiar",
    signOut: "Cerrar sesión",
  },
} satisfies Record<Lang, Record<string, string>>;
