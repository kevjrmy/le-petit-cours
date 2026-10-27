/**
 * The interface language, French or Spanish (#102).
 *
 * **One value, on `<html data-lang>`**, set before the first paint by the head
 * script in `layout.tsx` (`LANG_SCRIPT` below): the learner's saved choice,
 * else the device's languages, else French. Every page prerenders **both**
 * languages and `globals.css` hides the one not chosen (`[data-ui]`), so a
 * Spanish visitor never sees the French flash past, and no page goes dynamic
 * (AGENTS.md §8).
 *
 * The choice is kept in `localStorage` (`lang`), the third key beside the theme
 * and the sidebar (#24), because it too must be right before paint. Signed in,
 * the account's `lang` (#91) wins and is copied there, so the next load on this
 * device is right before the account has even loaded.
 *
 * **`html lang` stays `fr`**: the French taught is inherited from it (§5). A
 * Spanish block says so itself, `lang="es"` on its element.
 */

export type Lang = "fr" | "es";

export const LANGS: Lang[] = ["fr", "es"];

const KEY = "lang";

/**
 * The pre-paint script, a plain string for `dangerouslySetInnerHTML`. It reads
 * the saved choice, else walks `navigator.languages` and takes the first that
 * is French or Spanish; English-then-Spanish reads as Spanish. Nothing found
 * is French. Kept here, beside the code that writes the same key, so the two
 * cannot disagree on its name or its values.
 */
export const LANG_SCRIPT = `try{var l=localStorage.getItem("${KEY}");if(l!=="fr"&&l!=="es"){l="fr";var n=navigator.languages||[navigator.language||""];for(var i=0;i<n.length;i++){var p=String(n[i]).slice(0,2).toLowerCase();if(p==="fr"||p==="es"){l=p;break}}}d.setAttribute("data-lang",l)}catch(e){}`;

const listeners = new Set<() => void>();

/** Browser-only: the language the page is showing. */
export function currentLang(): Lang {
  return document.documentElement.getAttribute("data-lang") === "es" ? "es" : "fr";
}

/**
 * Shows the interface in `lang` and remembers it on this device. The account's
 * copy is the caller's to write (`saveLang`), so signed out this is the whole
 * job.
 */
export function applyLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* Private window or storage blocked: the page still switches, for now. */
  }
  if (document.documentElement.getAttribute("data-lang") === lang) return;
  document.documentElement.setAttribute("data-lang", lang);
  for (const listener of listeners) listener();
}

export function subscribeLang(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
