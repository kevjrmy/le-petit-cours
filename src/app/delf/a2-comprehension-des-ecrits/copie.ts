import { verifierCopie } from "@/components/delf/copie-data";

/**
 * Les questions de l'épreuve et leur barème, 5 + 6 + 9 + 5 (#78, #82).
 *
 * **Tout se coche.** Là où le papier demande d'écrire — une lettre, un numéro,
 * une justification recopiée du texte — cette version fait choisir entre des
 * propositions, parce qu'une réponse juste tapée sur un clavier espagnol se
 * perd sur un accent (`AGENTS.md` §1) et qu'une réponse tapée ne se corrige pas
 * sans deviner. La justification d'un vrai ou faux devient donc « la phrase du
 * texte qui le montre », à choisir parmi trois phrases **toutes tirées du
 * document**, dont une seule prouve la réponse (§9 : un item à deux réponses
 * défendables est cassé).
 */
const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "H"];
const RUBRIQUES = [
  "Politique",
  "Culture",
  "Société",
  "Sciences",
  "Sports",
  "Économie",
];
const VRAI_FAUX = ["Vrai", "Faux"];
const PREUVE = "La phrase du texte qui le montre :";

export const COPIE = verifierCopie({
  exercices: [
    { numero: 1, points: 5 },
    { numero: 2, points: 6 },
    { numero: 3, points: 9 },
    { numero: 4, points: 5 },
  ],
  questions: [
    /* Exercice 1 — les panneaux. Les phrases se glissent sur les panneaux
       (`Associer`) ; la réponse est l'indice du panneau, comme une lettre. */
    ...[
      [
        "Ici, il faut monter à pied.",
        0,
        "A · l’ascenseur est en panne, donc on monte à pied.",
      ],
      [
        "Ce jour-là, il ne faut pas venir acheter du pain.",
        1,
        "B · la boulangerie est fermée le lundi.",
      ],
      [
        "Il faut en prendre trois pour payer moins cher.",
        3,
        "D · deux pulls achetés, le troisième offert.",
      ],
      [
        "Il faut se couvrir la tête pour entrer.",
        4,
        "E · le bonnet est obligatoire à la piscine.",
      ],
      [
        "On ne peut pas laisser sa voiture ici toute la journée.",
        7,
        "H · le stationnement est réservé aux livraisons.",
      ],
    ].map(([enonce, reponse, pourquoi], index) => ({
      id: `1.${index + 1}`,
      exercice: 1,
      groupe: "1",
      enonce: enonce as string,
      parties: [{ options: LETTRES, reponse: reponse as number, points: 1 }],
      pourquoi: pourquoi as string,
    })),

    /* Exercice 2 — les titres de presse. Chaque rubrique sert une fois. */
    ...[
      ["Le maire de Lyon annonce sa candidature pour le mois de mars", 0],
      ["Une équipe de Toulouse découvre une nouvelle espèce de poisson", 3],
      ["Le prix du pain augmente de quatre centimes", 5],
      ["Trois cents bénévoles nettoient les berges de la Loire", 2],
      ["Le festival de Cannes ouvrira le 12 mai", 1],
      ["Les Bleues gagnent enfin contre la Norvège", 4],
    ].map(([enonce, reponse], index) => ({
      id: `2.${index + 1}`,
      exercice: 2,
      groupe: "2",
      enonce: enonce as string,
      parties: [{ options: RUBRIQUES, reponse: reponse as number, points: 1 }],
    })),

    /* Exercice 3 — l'article sur les bus gratuits. */
    {
      id: "3.1",
      exercice: 3,
      groupe: "3-qcm",
      enonce: "Ce texte vient :",
      parties: [
        {
          options: [
            "d’un journal",
            "d’un guide touristique",
            "d’une publicité",
          ],
          reponse: 0,
          points: 0.5,
        },
      ],
      pourquoi:
        "Un titre, des témoins qu’on cite, une information du jour : c’est un article de journal.",
    },
    {
      id: "3.2",
      exercice: 3,
      groupe: "3-qcm",
      enonce: "Les bus de Sainte-Colombe sont gratuits depuis :",
      parties: [
        {
          options: [
            "le mois de janvier",
            "le mois de mai",
            "le mois de septembre",
          ],
          reponse: 0,
          points: 1,
        },
      ],
      pourquoi:
        "« Depuis le mois de janvier, les quatre lignes de bus de Sainte-Colombe sont gratuites. »",
    },
    ...(
      [
        [
          "Sainte-Colombe est une grande ville.",
          1,
          [
            "les quatre lignes de bus de Sainte-Colombe sont gratuites",
            "Cette petite ville de huit mille habitants",
            "la première du département à faire ce choix",
          ],
          1,
        ],
        [
          "Madame Prévot vient plus souvent au marché qu’avant.",
          0,
          [
            "je viens au marché deux fois par semaine, au lieu d’une",
            "Avant, je payais vingt-huit euros par mois",
            "Au terminus, madame Prévot attend la ligne 2",
          ],
          0,
        ],
        [
          "Karim Benali travaille dans le centre-ville.",
          1,
          [
            "Moi, mes clients viennent en voiture",
            "Le commerçant craint aussi pour les places de stationnement",
            "qui tient un garage dans la zone commerciale",
          ],
          2,
        ],
        [
          "La ville va supprimer une ligne de bus.",
          1,
          [
            "Nous perdons les recettes des tickets",
            "La mairie annonce une cinquième ligne pour septembre",
            "Un bus vide coûte plus cher qu’un bus plein",
          ],
          1,
        ],
        [
          "D’autres villes s’intéressent à ce que fait Sainte-Colombe.",
          0,
          [
            "la mairie compte quarante pour cent de voyageurs en plus",
            "la première du département à faire ce choix",
            "Deux autres villes ont déjà demandé les chiffres",
          ],
          2,
        ],
      ] as const
    ).map(([enonce, vraiFaux, phrases, preuve], index) => ({
      id: `3.${index + 3}`,
      exercice: 3,
      groupe: "3-vf",
      enonce,
      parties: [
        { options: VRAI_FAUX, reponse: vraiFaux, points: 0.5 },
        {
          consigne: PREUVE,
          options: phrases.map((phrase) => `« ${phrase} »`),
          reponse: preuve,
          points: 1,
        },
      ],
      pourquoi: `${VRAI_FAUX[vraiFaux]} · « ${phrases[preuve]} ».`,
    })),

    /* Exercice 4 — le courriel du club. */
    {
      id: "4.1",
      exercice: 4,
      groupe: "4",
      enonce: "Ce message vient :",
      parties: [
        {
          options: [
            "d’un ami",
            "d’un club de sport",
            "d’un magasin de vêtements",
          ],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi:
        "L’adresse est celle du Gym Club de la Vallée, et le message parle d’inscription.",
    },
    {
      id: "4.2",
      exercice: 4,
      groupe: "4",
      enonce: "Ce message sert à :",
      parties: [
        {
          options: [
            "inviter à une fête",
            "demander de refaire son inscription",
            "annoncer la fermeture du club",
          ],
          reponse: 1,
          points: 1,
        },
      ],
      pourquoi:
        "« Pour continuer l’an prochain, merci de renvoyer votre dossier avant le 30 juin. »",
    },
    {
      id: "4.3",
      exercice: 4,
      groupe: "4",
      enonce: "Que faut-il envoyer avec la fiche d’inscription ?",
      parties: [
        {
          options: [
            "une photo et une copie de sa carte d’identité",
            "un certificat médical de moins de trois mois",
            "le paiement de toute l’année en une fois",
          ],
          reponse: 1,
          points: 1.5,
        },
      ],
      pourquoi:
        "« Le dossier comprend la fiche d’inscription et un certificat médical de moins de trois mois. » Le paiement, lui, peut se faire en trois fois.",
    },
    {
      id: "4.4",
      exercice: 4,
      groupe: "4",
      enonce: "Tous les adhérents entrent gratuitement au cours d’aquagym.",
      parties: [
        { options: VRAI_FAUX, reponse: 1, points: 0.5 },
        {
          consigne: PREUVE,
          options: [
            "« merci de renvoyer votre dossier avant le 30 juin »",
            "« Le paiement se fait en une fois ou en trois fois »",
            "« les adhérents inscrits avant le 15 juin entrent gratuitement »",
          ],
          reponse: 2,
          points: 1,
        },
      ],
      pourquoi: "Faux · seulement ceux qui se sont inscrits avant le 15 juin.",
    },
  ],
});
