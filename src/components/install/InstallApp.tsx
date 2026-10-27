"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import {
  hasInstallOffer,
  installPlatform,
  promptInstall,
  subscribeInstall,
  wasInstalledNow,
} from "@/lib/install";
import styles from "./InstallApp.module.css";

type Lang = "fr" | "es";

/* The platform never changes while the page is open, so there is nothing to
   subscribe to; the store is how it is read without touching `window` during
   the render (AGENTS.md §4). The server and the first client render agree on
   "pending", then the client draws its answer. */
const noSubscription = () => () => {};

/**
 * The install control behind `/installer` and `/instalar` (#101): one button
 * where the browser offers an install, the share sheet's steps on iOS, the
 * browser menu's steps everywhere else.
 */
export function InstallApp({ lang }: { lang: Lang }) {
  const platform = useSyncExternalStore(noSubscription, installPlatform, () => "pending");
  const canPrompt = useSyncExternalStore(subscribeInstall, hasInstallOffer, () => false);
  const installed = useSyncExternalStore(subscribeInstall, wasInstalledNow, () => false);
  const [outcome, setOutcome] = useState<"accepted" | "dismissed" | null>(null);
  const t = COPY[lang];

  async function install() {
    setOutcome(await promptInstall());
  }

  return (
    /* Polite: Chrome's offer can arrive after the first tap on the page, and
       the button replacing the instructions should be said, not just shown. */
    <div className={styles.install} aria-live="polite">
      {platform === "pending" ? null : installed ? (
        <p>{t.installed}</p>
      ) : platform === "standalone" ? (
        <p>{t.standalone}</p>
      ) : platform === "ios" ? (
        /* Safari has no install event, on any device, and neither does any
           other browser on iOS: the only way is the share sheet. Chrome and
           Edge on iOS 16.4+ have it too, at the top of the screen rather than
           the bottom, so the steps name the button and not where it sits. */
        <>
          <p>{t.iosIntro}</p>
          <ol>
            {t.iosSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      ) : canPrompt ? (
        <p>
          <button type="button" className="button button-primary" onClick={install}>
            {t.button}
          </button>
        </p>
      ) : outcome === "accepted" ? (
        <p>{t.installing}</p>
      ) : (
        /* No offer: Firefox, Samsung Internet, a desktop browser, Chrome
           before the first tap on the page (it waits for one), or Chrome after
           a « non ». Every one of them installs from its own menu. */
        <>
          <p>{outcome === "dismissed" ? t.menuDismissed : t.menuIntro}</p>
          <ol>
            {t.menuSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p>{t.mac}</p>
        </>
      )}
    </div>
  );
}

/* The three marks the steps point at, drawn the way the systems draw them so
   they can be recognised whatever language the phone is set to. */
function ShareGlyph() {
  return (
    <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12M8 7l4-4 4 4" />
      <path d="M8 10H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2" />
    </svg>
  );
}

function AddGlyph() {
  return (
    <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function MenuGlyph() {
  return (
    <svg className={`${styles.glyph} ${styles.filled}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

interface Copy {
  installed: ReactNode;
  standalone: ReactNode;
  button: string;
  installing: string;
  iosIntro: string;
  iosSteps: ReactNode[];
  menuIntro: string;
  menuDismissed: string;
  menuSteps: ReactNode[];
  mac: ReactNode;
}

/* The labels in bold are the ones the system prints in that language — the
   French page names a French phone's buttons, the Spanish page a Spanish
   (Spain) phone's. The course's name stays French in the Spanish text (#91). */
const NAME_FR = <span lang="fr">Le Petit Cours</span>;

const COPY: Record<Lang, Copy> = {
  fr: {
    installed: <>C&rsquo;est fait : Le Petit Cours est sur votre écran d&rsquo;accueil.</>,
    standalone: <>Vous lisez déjà Le Petit Cours dans l&rsquo;application installée.</>,
    button: "Installer l’application",
    installing: "Installation en cours…",
    iosIntro: "Sur iPhone et iPad, l’installation se fait en trois gestes :",
    iosSteps: [
      <>
        Touchez le bouton <strong>Partager</strong> <ShareGlyph />. Dans Safari, s&rsquo;il
        n&rsquo;est pas visible, il est dans le menu <strong>···</strong>.
      </>,
      <>
        Choisissez <strong>Sur l&rsquo;écran d&rsquo;accueil</strong> <AddGlyph />. Faites
        défiler la liste si vous ne le voyez pas.
      </>,
      <>
        Touchez <strong>Ajouter</strong>. L&rsquo;icône du Petit Cours apparaît sur
        l&rsquo;écran d&rsquo;accueil.
      </>,
    ],
    menuIntro: "Votre navigateur installe l’application depuis son menu :",
    menuDismissed:
      "Installation annulée. Vous pouvez la faire plus tard depuis le menu du navigateur :",
    menuSteps: [
      <>
        Ouvrez le menu du navigateur <MenuGlyph />, en haut à droite.
      </>,
      <>
        Choisissez <strong>Installer l&rsquo;application</strong> ou{" "}
        <strong>Ajouter à l&rsquo;écran d&rsquo;accueil</strong>.
      </>,
    ],
    mac: (
      <>
        Sur un Mac, dans Safari : menu <strong>Fichier</strong>, puis{" "}
        <strong>Ajouter au Dock</strong>.
      </>
    ),
  },
  es: {
    installed: <>Listo: {NAME_FR} ya está en tu pantalla de inicio.</>,
    standalone: <>Ya estás usando {NAME_FR} en la aplicación instalada.</>,
    button: "Instalar la aplicación",
    installing: "Instalando…",
    iosIntro: "En iPhone y iPad se instala en tres pasos:",
    iosSteps: [
      <>
        Toca el botón <strong>Compartir</strong> <ShareGlyph />. En Safari, si no lo ves,
        está en el menú <strong>···</strong>.
      </>,
      <>
        Elige <strong>Añadir a pantalla de inicio</strong> <AddGlyph />. Desliza la lista si
        no lo encuentras.
      </>,
      <>
        Toca <strong>Añadir</strong>. El icono de {NAME_FR} aparece en tu pantalla de inicio.
      </>,
    ],
    menuIntro: "Tu navegador instala la aplicación desde su menú:",
    menuDismissed:
      "Instalación cancelada. Puedes hacerla más tarde desde el menú del navegador:",
    menuSteps: [
      <>
        Abre el menú del navegador <MenuGlyph />, arriba a la derecha.
      </>,
      <>
        Elige <strong>Instalar aplicación</strong> o{" "}
        <strong>Añadir a pantalla de inicio</strong>.
      </>,
    ],
    mac: (
      <>
        En un Mac, en Safari: menú <strong>Archivo</strong> y luego{" "}
        <strong>Añadir al Dock</strong>.
      </>
    ),
  },
};
