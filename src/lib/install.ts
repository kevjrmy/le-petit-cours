/**
 * The browser's offer to install the app, held for `/installer` (#101).
 *
 * Chrome fires `beforeinstallprompt` **once per page load**, as soon as the
 * site qualifies — usually on whatever page the visitor landed on, long before
 * they navigate to `/installer`. A listener in that page's leaf would miss it.
 * So this module listens at import, and **the shell imports it**: the event is
 * kept here and the page reads it whenever it mounts.
 *
 * **No `preventDefault()`.** It would take away the browser's own install
 * offer on every page of the site; the page adds a button, it does not
 * replace the browser's menu.
 *
 * Safari fires none of this, on any device: an iPhone gets instructions.
 */

type InstallOutcome = "accepted" | "dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: InstallOutcome }>;
}

let offer: BeforeInstallPromptEvent | null = null;
let installedNow = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    offer = event as BeforeInstallPromptEvent;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    offer = null;
    installedNow = true;
    emit();
  });
}

export function subscribeInstall(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Whether the browser has offered an install that has not been used yet. */
export function hasInstallOffer() {
  return offer !== null;
}

/** Whether the app was installed during this page load. */
export function wasInstalledNow() {
  return installedNow;
}

/**
 * Shows the browser's install dialog. An offer is good for one dialog, so it
 * is spent whatever the answer; Chrome may offer again later, and the event
 * listener above will catch it.
 */
export async function promptInstall(): Promise<InstallOutcome | null> {
  const current = offer;
  if (!current) return null;
  offer = null;
  emit();
  await current.prompt();
  const { outcome } = await current.userChoice;
  return outcome;
}

export type InstallPlatform = "standalone" | "ios" | "other";

/**
 * Where the page is being read. Browser-only: call it from an effect, a
 * handler or a `useSyncExternalStore` snapshot, never during the server render.
 *
 * An iPad on iPadOS 13+ says it is a Mac; a touch screen is what gives it away.
 */
export function installPlatform(): InstallPlatform {
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return "standalone";

  const ua = navigator.userAgent;
  const ios =
    /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  return ios ? "ios" : "other";
}
