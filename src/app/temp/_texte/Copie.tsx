import type { ReactNode } from "react";
import styles from "./Copie.module.css";

/**
 * Une copie : le texte rendu par l'apprenant, et sa correction juste en dessous
 * (#80).
 *
 * **Les deux blocs d'une page d'atelier passent par ici, et c'est le point.**
 * Le texte fautif et le texte corrigé sont le même texte : les lire l'un après
 * l'autre ne marche que s'ils ont exactement la même taille, le même
 * interlignage et la même largeur de ligne. Donner au premier un traitement
 * « pièce à conviction » et au second un traitement « modèle » casserait la
 * seule chose que la page fait.
 *
 * **`.example` en dessous, jamais à la place.** Le fond, la bordure et la
 * serif viennent du motif partagé (`globals.css`) : une copie est un bloc de
 * français cité, comme les exemples du cours, et redéclarer sa couleur ici
 * serait la couleur en dur que le §5 interdit. Ce module n'ajoute que ce qui
 * change — du corps, de l'air entre les lignes, et un vrai blanc entre les
 * paragraphes.
 *
 * **Pas dans `globals.css`, et pas sur `/design`.** `.example` sert tout le
 * cours ; l'élargir pour deux pages qui seront effacées lundi changerait la
 * taille de chaque exemple de chaque leçon. Ce bloc vit sous `temp/` avec le
 * reste de l'atelier et s'en va avec lui.
 */
export function Copie({ children }: { children: ReactNode }) {
  return <div className={`example ${styles.copie}`}>{children}</div>;
}
