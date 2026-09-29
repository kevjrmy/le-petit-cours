import type { ReactNode } from "react";
import styles from "./Corrige.module.css";

/**
 * Le corrigé, caché jusqu'à ce qu'on le demande. L'élève cherche d'abord ses
 * fautes dans sa copie ; le corrigé affiché d'emblée se lirait sans chercher.
 *
 * `<details>` plutôt qu'un état React : le bouton s'ouvre sans JavaScript, la
 * page reste un composant serveur (`AGENTS.md` §4), et le clavier et les
 * lecteurs d'écran savent déjà s'en servir.
 */
export function Corrige({ children }: { children: ReactNode }) {
  return (
    <details className={styles.corrige}>
      <summary className={`button button-primary ${styles.toggle}`}>
        <span className={styles.closed}>Voir le corrigé</span>
        <span className={styles.open}>Cacher le corrigé</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
