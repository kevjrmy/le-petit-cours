/**
 * Les références de la séance « Le barrage de la Rance ».
 *
 * La source n'est pas un article de journal : c'est la page d'EDF, qui
 * exploite l'usine. L'élève la lit chez EDF, par le lien ; la page n'en garde
 * que de courtes citations (`AGENTS.md` §9b ; le texte complet reste dans
 * `.private/2026-11-11/`). Le titre d'Ouest-France est cité pour l'autre
 * point de vue, sans plus.
 *
 * Les illustrations sont libres, locales, et chacune porte son crédit dans sa
 * propre entrée (`AGENTS.md` §9). Elles illustrent : aucune ne donne une
 * réponse à la place du texte.
 */

export const SOURCE = {
  titre: "Produire de l’électricité",
  auteur: "EDF",
  site: "edf.fr, page de l’usine marémotrice de la Rance",
  url: "https://www.edf.fr/usine-maremotrice-rance/produire-de-lelectricite",
} as const;

/** L'autre point de vue, cité par son titre seulement. */
export const AUTRE_SOURCE = {
  titre:
    "« Désastre écologique en cours » : en Bretagne, associations et élus pressent l’État d’agir sur le barrage de la Rance",
  journal: "Ouest-France",
  url: "https://www.ouest-france.fr/bretagne/dinard-35800/barrage-de-la-rance/desastre-ecologique-en-cours-en-bretagne-associations-et-elus-pressent-letat-dagir-sur-le-barrage-de-la-rance-3f86da00-9d47-11f1-a8ad-3219df531147",
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
  licence: string;
  licenceUrl?: string;
  /** La page Wikimedia Commons du fichier, qui fait foi pour la licence. */
  page: string;
}

const DIR = "/atelier/le-barrage-de-la-rance";

export const ILLUSTRATIONS = {
  vueAerienne: {
    src: `${DIR}/vue-aerienne.jpg`,
    width: 1000,
    height: 624,
    alt: "Une photo prise d’avion : un long barrage traverse un large bras de mer bleu, entre deux côtes couvertes de maisons et de champs ; la mer s’ouvre au fond.",
    legende:
      "Le barrage ferme l’estuaire de la Rance, entre Dinard (à gauche) et Saint-Malo (à droite). Il sert aussi de pont.",
    oeuvre: "Le barrage de la Rance vu d’avion, 2007",
    auteur: "Tswgb",
    licence: "Domaine public",
    page: "https://commons.wikimedia.org/wiki/File:Barrage_de_la_Rance.jpg",
  },
  chantier: {
    src: `${DIR}/chantier-1963.jpg`,
    width: 1000,
    height: 992,
    alt: "Une photo en noir et blanc : de hauts murs de béton sortent de l’eau, avec des grues au-dessus.",
    legende:
      "Le chantier en 1963. Pour construire l’usine au sec, on a d’abord fermé l’estuaire avec de grands murs provisoires.",
    oeuvre: "Le barrage de la Rance en construction, 1963",
    auteur: "François Malo-Renault",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Barrage_de_La_Rance_en_constrution_(1963).jpg",
  },
  schema: {
    src: `${DIR}/schema.png`,
    width: 1000,
    height: 684,
    alt: "Un schéma en quatre cases autour d’un dessin du barrage : la marée monte, on ouvre les vannes et on remplit le bassin, on les ferme, la marée descend, on les rouvre et on vide le bassin.",
    legende:
      "Le cycle de l’usine. Une turbine tourne quand l’eau passe de la mer au bassin, et aussi quand elle repart du bassin vers la mer.",
    oeuvre: "Schéma du fonctionnement général de l’usine marémotrice, 2019",
    auteur: "EmilieNguyen",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Sch%C3%A9ma_du_fonctionnement_g%C3%A9n%C3%A9ral_de_l%27usine_mar%C3%A9motrice.png",
  },
  barrage: {
    src: `${DIR}/barrage.jpg`,
    width: 1000,
    height: 666,
    alt: "Une photo : une route à quatre voies passe sur le barrage, avec des voitures, des barrières rouges et blanches et un bâtiment vitré ; l’eau de chaque côté.",
    legende:
      "La route sur le barrage, entre Dinard et Saint-Malo. L’usine est dessous, sous l’eau.",
    oeuvre: "Le barrage de la Rance, 2016",
    auteur: "Sw271149",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Rance_Tidal_Power_Station.jpg",
  },
} satisfies Record<string, Illustration>;
