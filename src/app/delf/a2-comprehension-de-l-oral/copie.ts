import { verifierCopie } from "@/components/delf/copie-data";

/**
 * L'épreuve de compréhension de l'oral : les textes à lire à voix haute, les
 * questions, le barème (#82).
 *
 * **Le format est celui de l'examen, sauf le partage des points.** Quatre
 * exercices, quatorze documents courts de la vie de tous les jours, chacun
 * entendu deux fois, des questions à choix, 25 points en tout :
 * c'est la forme publique de l'épreuve. Le partage 6 + 6 + 6 + 7 est celui de
 * ce cours, faute d'une source publiée qu'on puisse citer exercice par
 * exercice. Tous les textes sont écrits ici (§9b).
 *
 * **Une personne lit, il n'y a pas d'enregistrement.** Le cours n'a pas encore
 * de voix, comme `dictees` qui l'attend ; en cours particulier, la voix de
 * l'enseignant est d'ailleurs un meilleur document qu'une voix de synthèse. Les
 * textes sont donc écrits pour être lus : phrases courtes, heures et prix en
 * lettres là où la lecture pourrait hésiter.
 */

export interface TexteALire {
  numero: number;
  exercice: number;
  /** Où l'on est, pour la personne qui lit. Jamais montré au candidat. */
  cadre: string;
  /** Une ligne par réplique. Une ligne qui commence par « — » est dite par
   *  une autre voix que la précédente. */
  lignes: string[];
}

export const TEXTES: TexteALire[] = [
  /* Exercice 1 — des annonces. */
  {
    numero: 1,
    exercice: 1,
    cadre: "Une annonce dans une gare.",
    lignes: [
      "Mesdames et messieurs, le train à destination de Tours, prévu à quatorze heures dix, partira avec un retard d’environ vingt minutes. Attention : il partira de la voie trois, et non de la voie cinq. Nous vous prions de nous excuser pour ce retard.",
    ],
  },
  {
    numero: 2,
    exercice: 1,
    cadre: "Une annonce dans un supermarché.",
    lignes: [
      "Chers clients, notre magasin fermera exceptionnellement à dix-neuf heures ce soir, parce que nous comptons toute la marchandise pour l’inventaire. Demain dimanche, nous vous accueillons comme d’habitude, de neuf heures à midi et demi.",
    ],
  },
  {
    numero: 3,
    exercice: 1,
    cadre: "Un message à l’entrée d’une piscine.",
    lignes: [
      "La piscine municipale informe ses usagers que le grand bassin sera fermé du lundi trois au vendredi sept, pour nettoyage. Le petit bassin reste ouvert aux horaires habituels. Les cours d’aquagym sont annulés pendant toute la semaine.",
    ],
  },
  {
    numero: 4,
    exercice: 1,
    cadre: "La météo à la radio.",
    lignes: [
      "Et maintenant, la météo de demain. Le matin, du brouillard sur toute la région, avec des températures autour de cinq degrés. L’après-midi, le soleil revient et il fera jusqu’à quatorze degrés. Attention : la pluie arrive le soir, par l’ouest.",
    ],
  },

  /* Exercice 2 — des messages sur un répondeur. */
  {
    numero: 5,
    exercice: 2,
    cadre: "Un message sur votre répondeur.",
    lignes: [
      "Bonjour, ici le cabinet du docteur Martin. Votre rendez-vous de jeudi à dix heures est annulé : le docteur est absent cette semaine. Nous pouvons vous proposer vendredi à onze heures, ou lundi à quinze heures. Rappelez-nous au zéro quatre, soixante-douze, dix-huit, trente, cinquante-cinq. Merci, au revoir.",
    ],
  },
  {
    numero: 6,
    exercice: 2,
    cadre: "Un message sur votre répondeur.",
    lignes: [
      "Salut, c’est Julie ! Je t’appelle pour samedi. Finalement, on ne va pas au cinéma : il n’y a plus de places. Je propose un pique-nique au parc, près du lac. Toi, tu apportes les boissons, et moi je m’occupe des sandwichs. On se retrouve à midi devant l’entrée du parc. Bisous !",
    ],
  },
  {
    numero: 7,
    exercice: 2,
    cadre: "Un message sur votre répondeur.",
    lignes: [
      "Bonjour, ici la librairie Page Blanche. Le livre que vous avez commandé est arrivé. Vous pouvez venir le chercher du mardi au samedi, de dix heures à dix-neuf heures. Nous le gardons pour vous pendant quinze jours. Bonne journée !",
    ],
  },

  /* Exercice 3 — des conversations. */
  {
    numero: 8,
    exercice: 3,
    cadre: "À la réception d’un hôtel. Une cliente, puis la réceptionniste.",
    lignes: [
      "— Bonjour madame, je voudrais une chambre pour deux nuits, s’il vous plaît.",
      "— Pour une personne ?",
      "— Non, pour deux. Je suis avec mon mari.",
      "— J’ai une chambre avec vue sur la mer à quatre-vingt-dix euros, ou une chambre côté rue à soixante-dix euros.",
      "— Nous prenons la chambre côté rue. Le petit déjeuner est compris ?",
      "— Non, il coûte huit euros par personne. Il est servi de sept heures à dix heures.",
    ],
  },
  {
    numero: 9,
    exercice: 3,
    cadre: "Au bureau, entre deux collègues.",
    lignes: [
      "— Tu viens déjeuner avec nous à la cantine ?",
      "— Non merci, pas aujourd’hui. J’ai une réunion à une heure et je dois encore préparer mes documents.",
      "— Tu veux qu’on te rapporte quelque chose ?",
      "— Oui, c’est gentil. Un sandwich au poulet et une bouteille d’eau, s’il te plaît.",
      "— Pas de problème. À tout à l’heure !",
    ],
  },
  {
    numero: 10,
    exercice: 3,
    cadre: "Dans la rue. Une passante demande son chemin.",
    lignes: [
      "— Pardon monsieur, la poste, c’est loin d’ici ?",
      "— Non, c’est à cinq minutes à pied. Vous allez tout droit jusqu’à la place du marché, puis vous tournez à gauche. La poste est en face de la banque.",
      "— Merci. Elle est ouverte le samedi après-midi ?",
      "— Ah non. Le samedi, elle ferme à midi.",
    ],
  },

  /* Exercice 4 — quatre conversations, quatre situations. */
  {
    numero: 11,
    exercice: 4,
    cadre: "Deux amis devant un cinéma.",
    lignes: [
      "— Désolé, désolé ! Le bus n’est pas passé, j’ai dû venir à pied.",
      "— Ce n’est pas grave. Le film n’a pas encore commencé.",
    ],
  },
  {
    numero: 12,
    exercice: 4,
    cadre: "Deux amies au téléphone.",
    lignes: [
      "— Samedi, je fais une fête pour mon anniversaire. Tu viens ?",
      "— Oh, c’est dommage : samedi, je ne peux pas. Je pars chez mes parents pour le week-end.",
    ],
  },
  {
    numero: 13,
    exercice: 4,
    cadre: "Dans un magasin, un client et une vendeuse.",
    lignes: [
      "— Bonjour. J’ai acheté ce grille-pain hier, et il ne marche pas.",
      "— Vous avez gardé le ticket de caisse ?",
      "— Oui, le voici.",
    ],
  },
  {
    numero: 14,
    exercice: 4,
    cadre: "Deux amis dans la rue.",
    lignes: [
      "— Alors, tu as eu ton permis de conduire ? Bravo !",
      "— Merci ! Du premier coup, en plus.",
    ],
  },
];

/** Les situations de l'exercice 4. Deux ne correspondent à aucun dialogue. */
export const SITUATIONS = [
  "Demander un prix",
  "Refuser une invitation",
  "S’excuser d’être en retard",
  "Prendre un rendez-vous",
  "Féliciter quelqu’un",
  "Se plaindre d’un achat",
];

const LETTRES = ["A", "B", "C", "D", "E", "F"];

export const COPIE = verifierCopie({
  exercices: [
    { numero: 1, points: 6 },
    { numero: 2, points: 6 },
    { numero: 3, points: 6 },
    { numero: 4, points: 7 },
  ],
  questions: [
    {
      id: "1",
      exercice: 1,
      groupe: "1",
      enonce: "Document 1. Le train pour Tours partira :",
      parties: [
        {
          options: [
            "à 14 h 10, voie 5",
            "vers 14 h 30, voie 3",
            "vers 14 h 30, voie 5",
          ],
          reponse: 1,
          points: 1.5,
        },
      ],
      pourquoi:
        "Vingt minutes de retard sur 14 h 10, et « voie trois, et non voie cinq ».",
    },
    {
      id: "2",
      exercice: 1,
      groupe: "1",
      enonce: "Document 2. Ce soir, le magasin ferme plus tôt :",
      parties: [
        {
          options: [
            "parce qu’on est dimanche",
            "pour des travaux",
            "pour l’inventaire",
          ],
          reponse: 2,
          points: 1.5,
        },
      ],
      pourquoi:
        "« nous comptons toute la marchandise pour l’inventaire ». Dimanche, c’est demain.",
    },
    {
      id: "3",
      exercice: 1,
      groupe: "1",
      enonce: "Document 3. Cette semaine-là, on peut :",
      parties: [
        {
          options: [
            "nager dans le petit bassin",
            "suivre le cours d’aquagym",
            "nager dans le grand bassin",
          ],
          reponse: 0,
          points: 1.5,
        },
      ],
      pourquoi: "« Le petit bassin reste ouvert aux horaires habituels. »",
    },
    {
      id: "4",
      exercice: 1,
      groupe: "1",
      enonce: "Document 4. Demain après-midi, il fera :",
      parties: [
        {
          options: ["du brouillard", "du soleil", "de la pluie"],
          reponse: 1,
          points: 1.5,
        },
      ],
      pourquoi: "Le brouillard, c’est le matin, et la pluie arrive le soir.",
    },

    {
      id: "5a",
      exercice: 2,
      groupe: "2",
      enonce: "Document 5. Le rendez-vous de jeudi :",
      parties: [
        {
          options: ["est avancé", "est annulé", "est à onze heures"],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi: "« Votre rendez-vous de jeudi à dix heures est annulé. »",
    },
    {
      id: "5b",
      exercice: 2,
      groupe: "2",
      enonce: "Document 5. Le cabinet propose :",
      parties: [
        {
          options: [
            "jeudi à quinze heures",
            "vendredi à onze heures",
            "lundi à dix heures",
          ],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi: "« vendredi à onze heures, ou lundi à quinze heures ».",
    },
    {
      id: "6a",
      exercice: 2,
      groupe: "2",
      enonce: "Document 6. Samedi, Julie propose :",
      parties: [
        {
          options: [
            "d’aller au cinéma",
            "de pique-niquer",
            "d’aller au restaurant",
          ],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi:
        "Le cinéma est complet : « Je propose un pique-nique au parc ».",
    },
    {
      id: "6b",
      exercice: 2,
      groupe: "2",
      enonce: "Document 6. Vous devez apporter :",
      parties: [
        {
          options: ["des sandwichs", "des boissons", "un gâteau"],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi:
        "« Toi, tu apportes les boissons, et moi je m’occupe des sandwichs. »",
    },
    {
      id: "7a",
      exercice: 2,
      groupe: "2",
      enonce: "Document 7. Qui vous appelle ?",
      parties: [
        {
          options: ["une bibliothèque", "une librairie", "un bureau de poste"],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi:
        "Une librairie vend des livres, et c’est là qu’on en commande un. Une bibliothèque en prête.",
    },
    {
      id: "7b",
      exercice: 2,
      groupe: "2",
      enonce: "Document 7. On vous garde le livre :",
      parties: [
        {
          options: ["deux jours", "une semaine", "quinze jours"],
          reponse: 2,
          points: 1,
        },
      ],
      pourquoi: "« Nous le gardons pour vous pendant quinze jours. »",
    },

    {
      id: "8a",
      exercice: 3,
      groupe: "3",
      enonce: "Document 8. La cliente prend une chambre à :",
      parties: [
        {
          options: [
            "soixante-dix euros",
            "quatre-vingt-dix euros",
            "huit euros",
          ],
          reponse: 0,
          points: 1,
        },
      ],
      pourquoi: "Elle prend la chambre côté rue, à soixante-dix euros.",
    },
    {
      id: "8b",
      exercice: 3,
      groupe: "3",
      enonce: "Document 8. Le petit déjeuner :",
      parties: [
        {
          options: [
            "est compris dans le prix",
            "coûte huit euros par personne",
            "est servi jusqu’à midi",
          ],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi: "« Non, il coûte huit euros par personne. »",
    },
    {
      id: "9a",
      exercice: 3,
      groupe: "3",
      enonce: "Document 9. Il ne va pas à la cantine parce qu’il :",
      parties: [
        {
          options: ["n’a pas faim", "doit préparer ses documents", "est malade"],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi:
        "« J’ai une réunion à une heure et je dois encore préparer mes documents. »",
    },
    {
      id: "9b",
      exercice: 3,
      groupe: "3",
      enonce: "Document 9. Il demande qu’on lui rapporte :",
      parties: [
        {
          options: ["un sandwich et de l’eau", "une salade", "un café"],
          reponse: 0,
          points: 1,
        },
      ],
      pourquoi: "« Un sandwich au poulet et une bouteille d’eau. »",
    },
    {
      id: "10a",
      exercice: 3,
      groupe: "3",
      enonce: "Document 10. La poste est :",
      parties: [
        {
          options: [
            "à côté du marché",
            "à côté de la banque",
            "en face de la banque",
          ],
          reponse: 2,
          points: 1,
        },
      ],
      pourquoi:
        "« La poste est en face de la banque. » À côté, c’est tout près ; en face, c’est de l’autre côté de la rue.",
    },
    {
      id: "10b",
      exercice: 3,
      groupe: "3",
      enonce: "Document 10. Le samedi, la poste :",
      parties: [
        {
          options: [
            "ferme à midi",
            "est fermée toute la journée",
            "ouvre seulement l’après-midi",
          ],
          reponse: 0,
          points: 1,
        },
      ],
      pourquoi: "« Le samedi, elle ferme à midi. »",
    },

    /* Exercice 4 — la dernière vaut un point, comme souvent à l'examen. */
    ...(
      [
        [
          11,
          2,
          2,
          "On s’excuse d’un retard : « Désolé ! Le bus n’est pas passé ».",
        ],
        [
          12,
          1,
          2,
          "« samedi, je ne peux pas » : on refuse une invitation à une fête.",
        ],
        [
          13,
          5,
          2,
          "Un grille-pain qui ne marche pas : on se plaint d’un achat.",
        ],
        [14, 4, 1, "« Bravo ! » : on félicite quelqu’un qui a eu son permis."],
      ] as const
    ).map(([numero, reponse, points, pourquoi]) => ({
      id: String(numero),
      exercice: 4,
      groupe: "4",
      enonce: `Document ${numero}. Quelle est la situation ?`,
      parties: [{ options: LETTRES, reponse, points }],
      pourquoi,
    })),
  ],
});
