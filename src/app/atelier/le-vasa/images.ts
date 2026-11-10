/**
 * Les références de la séance « Le Vasa ».
 *
 * L'article n'est pas dans le dépôt : il appartient à Ouest-France, et l'élève
 * le lit chez eux, par le lien. La page n'en recopie rien (`AGENTS.md` §9b ;
 * le texte complet reste dans `.private/2026-11-11/`).
 *
 * Les illustrations sont libres, locales, et chacune porte son crédit dans sa
 * propre entrée, pour que l'image et le crédit ne se séparent jamais
 * (`AGENTS.md` §9). Elles illustrent : aucune ne donne une réponse à la place
 * du texte. Les deux photos de 1961 sont dans le domaine public en Suède
 * (photographies simples d'avant 1969).
 */

export const ARTICLE = {
  titre:
    "Le Vasa, une redoutable machine de guerre devenue vaisseau fantôme après un naufrage express",
  auteur: "Olivier Renault",
  journal: "Ouest-France",
  date: "2020-08-23",
  url: "https://www.ouest-france.fr/medias/ouest-france/recit-le-vasa-une-redoutable-machine-de-guerre-devenue-vaisseau-fantome-apres-un-naufrage-express-6945566",
} as const;

export interface Illustration {
  /** Chemin absolu sous `public/`. */
  src: string;
  width: number;
  height: number;
  /** Ce que montre l'image, pour qui ne la voit pas. */
  alt: string;
  /** Ce que l'élève lit sous l'image. */
  legende: string;
  /** L'œuvre et sa date, telles qu'on les cite. */
  oeuvre: string;
  auteur: string;
  /** Le musée ou l'institution qui la conserve. */
  source?: string;
  licence: string;
  licenceUrl?: string;
  /** La page Wikimedia Commons du fichier, qui fait foi pour la licence. */
  page: string;
}

const DIR = "/atelier/le-vasa";

/* Dans l'ordre de l'article. */
export const ILLUSTRATIONS = {
  roi: {
    src: `${DIR}/roi.jpg`,
    width: 804,
    height: 1000,
    alt: "Un portrait peint : un homme roux, avec une barbe et une moustache, un grand col de dentelle blanche et une écharpe bleue brodée de couronnes dorées.",
    legende:
      "Gustave II Adolphe, le roi de Suède qui a fait construire le Vasa. En 1628, il fait la guerre en Pologne et attend son navire avec impatience.",
    oeuvre: "Portrait de Gustave II Adolphe, roi de Suède, 1633",
    auteur: "Anonyme",
    source: "Rijksmuseum, Amsterdam",
    licence: "Domaine public",
    page: "https://commons.wikimedia.org/wiki/File:Portrait_of_Gustav_II_Adolf_(1594%E2%80%931632),_King_of_Sweden_(by_Michiel_Jansz._van_Mierevelt).jpg",
  },
  poupe: {
    src: `${DIR}/poupe.jpg`,
    width: 1000,
    height: 750,
    alt: "La maquette d’un grand voilier : l’arrière du bateau est couvert de petites statues peintes en rouge, bleu et or.",
    legende:
      "L’arrière du Vasa, sur une maquette du musée. Les sculptures sont peintes avec les couleurs que les chercheurs croient être celles de 1628 : une vraie œuvre d’art !",
    oeuvre: "La poupe de la maquette du Vasa au 1/10, photographiée en 2008",
    auteur: "Peter Isotalo",
    source: "Musée Vasa, Stockholm",
    licence: "CC BY 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0",
    page: "https://commons.wikimedia.org/wiki/File:Vasa_stern_color_model.jpg",
  },
  lion: {
    src: `${DIR}/lion.jpg`,
    width: 750,
    height: 1000,
    alt: "Une grande sculpture en bois : un lion dressé, la gueule ouverte, qui tient un blason entre ses pattes, devant un rideau rouge.",
    legende:
      "La figure de proue du Vasa : un lion sculpté dans le bois. Au musée, on peut en voir une copie.",
    oeuvre: "Copie de la figure de proue du Vasa, photographiée en 2007",
    auteur: "Wolfgang Sauber",
    source: "Musée Vasa, Stockholm",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    page: "https://commons.wikimedia.org/wiki/File:Vasa_-_Galionsfigur_Rekonstruktion.jpg",
  },
  renflouement: {
    src: `${DIR}/renflouement.jpg`,
    width: 1000,
    height: 663,
    alt: "Une vieille photo en couleurs : deux poteaux de bois sombres sortent d’une eau bleue et calme.",
    legende:
      "Le 24 avril 1961, à 9 h 03 : les premiers morceaux du Vasa sortent de l’eau, après 333 ans au fond.",
    oeuvre: "Le Vasa sort de l’eau, 24 avril 1961, 9 h 03",
    auteur: "Musée Vasa",
    licence: "Domaine public",
    page: "https://commons.wikimedia.org/wiki/File:Vasa_24_april_1961_kl_903.jpg",
  },
  coque: {
    src: `${DIR}/coque.jpg`,
    width: 1000,
    height: 730,
    alt: "Une photo en noir et blanc : la coque d’un grand bateau en bois, abîmée et sans mâts, flotte contre un quai ; des ouvriers travaillent sur le pont.",
    legende:
      "La même année, la coque du Vasa enfin remontée. Des ouvriers travaillent déjà à bord.",
    oeuvre: "Le Vasa, 1961",
    auteur: "SAS Scandinavian Airlines",
    licence: "Domaine public",
    page: "https://commons.wikimedia.org/wiki/File:Vasa_(1961).jpg",
  },
  musee: {
    src: `${DIR}/musee.jpg`,
    width: 1000,
    height: 666,
    alt: "Une photo : le pont d’un grand navire en bois sombre, avec ses mâts et ses cordages, dans un immense hall de musée.",
    legende:
      "Le Vasa aujourd’hui, au musée de Stockholm. Il est fait à 98 % de ses pièces d’origine.",
    oeuvre: "Le Vasa au musée, photographié en 2014",
    auteur: "Jorge Láscar",
    source: "Musée Vasa, Stockholm",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File:Vasa_-_A_fully_intact_17th_century_war_ship_that_was_salvaged_(24489442299).jpg",
  },
} satisfies Record<string, Illustration>;
