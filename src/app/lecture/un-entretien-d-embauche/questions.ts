import type { Question, QuestionSets } from "@/components/exercice/Comprehension";

/**
 * The questions for this text, one set per level (`docs/decisions.md` #68).
 *
 * **Data, not a component, and in its own file** so the `nav-wiring` audit can
 * import it and check its keys against the manifest's `levels`. Every import
 * here is `import type`, which type stripping erases, so plain `node` reads it.
 *
 * Same text, same vocabulary table, same tick: only the question changes (#59).
 */

/**
 * A2: the facts of the interview — why this shop, what he did in Seville, why
 * he left, the closing day, the trial period, his one question, and the futur
 * proche in the sentence that ends it.
 */
const A2: Question[] = [
  {
    question: "Pourquoi M. Morales veut-il travailler dans cette librairie ?",
    options: [
      "Parce qu’elle est près de chez lui",
      "Parce qu’elle vend des livres étrangers",
      "Parce que le salaire est intéressant",
    ],
    answer: 1,
    because:
      "« Parce que vous vendez beaucoup de livres étrangers, et que j’aime conseiller les clients. »",
  },
  {
    question: "Qu’a-t-il fait à Séville ?",
    options: [
      "Il a été vendeur pendant deux ans",
      "Il a étudié les langues",
      "Il a dirigé une librairie",
    ],
    answer: 0,
    because:
      "« J’ai travaillé deux ans comme vendeur à Séville » : vendeur, pas directeur.",
  },
  {
    question: "Pourquoi a-t-il quitté l’Espagne ?",
    options: [
      "Il a perdu son travail",
      "Sa femme a trouvé un travail en France",
      "Il voulait apprendre le français",
    ],
    answer: 1,
    because: "« Ma femme a trouvé un travail ici. Nous sommes arrivés en juin. »",
  },
  {
    question: "Quel jour la librairie est-elle fermée ?",
    options: ["Le dimanche", "Le samedi", "Le lundi"],
    answer: 2,
    because:
      "« Du mardi au samedi. Le magasin est fermé le lundi. » Le samedi, au contraire, on travaille.",
  },
  {
    question: "Combien de temps dure la période d’essai ?",
    options: ["Une semaine", "Deux mois", "Six mois"],
    answer: 1,
    because: "« Oui, deux mois. Après, le contrat devient définitif. »",
  },
  {
    question: "Quelle question M. Morales pose-t-il à la fin ?",
    options: [
      "Il demande s’il y aura une formation",
      "Il demande le montant du salaire",
      "Il demande combien de jours de congés il aura",
    ],
    answer: 0,
    because:
      "« Est-ce que je vais suivre une formation au logiciel de caisse ? » C’est sa seule question.",
  },
  {
    question:
      "« Nous allons vous donner une réponse vendredi » : à quel temps est cette phrase ?",
    options: ["Au présent", "Au futur proche", "Au passé composé"],
    answer: 1,
    because:
      "« aller » au présent suivi d’un infinitif : c’est le futur proche, celui de la conversation.",
  },
];

/**
 * B1: the same dialogue read as a genre. A reason for leaving that blames
 * nobody, a fact turned into an argument, an objection answered before anybody
 * raises it, and the formula that closes an interview without deciding it.
 * This is the one text in the chapter she will have to perform herself.
 */
const B1: Question[] = [
  {
    question:
      "« Et pourquoi êtes-vous parti ? » « Ma femme a trouvé un travail ici. » Pourquoi cette réponse est-elle habile ?",
    options: [
      "Elle donne une raison extérieure, sans rien dire de mal de l’ancien poste",
      "Elle laisse entendre qu’il a été renvoyé",
      "Elle prouve qu’il connaît déjà bien Bordeaux",
    ],
    answer: 0,
    because:
      "La question appelle souvent une critique de l’employeur précédent. Il répond par un déménagement : rien de négatif, et rien d’inventé.",
  },
  {
    question:
      "« Espagnol, français, et un peu d’anglais. Je pense que c’est un atout dans une librairie. » Que fait la seconde phrase ?",
    options: [
      "Elle corrige ce qu’il vient de dire",
      "Elle transforme un fait en argument pour le poste",
      "Elle demande une augmentation de salaire",
    ],
    answer: 1,
    because:
      "Trois langues, c’est un fait. « Un atout dans une librairie », c’est ce fait mis au service de sa candidature, et Mme Léger le reprend aussitôt : « nous avons beaucoup de touristes l’été ».",
  },
  {
    question:
      "« Le poste est à plein temps, du mardi au samedi. » « Le samedi ne me pose pas de problème. » Pourquoi dit-il cela ?",
    options: [
      "Parce qu’on vient de lui demander s’il est libre le samedi",
      "Parce qu’il préférerait ne pas travailler le samedi",
      "Parce qu’il devine l’objection et y répond avant qu’on la pose",
    ],
    answer: 2,
    because:
      "Personne ne lui a rien demandé. Le samedi est ce qui fait hésiter la plupart des candidats, et il retire la question de la table avant qu’elle arrive.",
  },
  {
    question:
      "Sa seule question porte sur la formation au logiciel de caisse. Que dit ce choix ?",
    options: [
      "Qu’il n’a jamais tenu une caisse",
      "Qu’il se projette dans le poste et pense déjà au travail",
      "Qu’il trouve le salaire trop bas pour le dire franchement",
    ],
    answer: 1,
    because:
      "Il s’occupait de la caisse à Séville : ce n’est pas de l’ignorance. Demander la formation, c’est parler de la semaine qui vient comme si elle était déjà décidée.",
  },
  {
    question:
      "« Nous allons vous donner une réponse vendredi. Merci d’être venu. » Que fait Mme Léger ?",
    options: [
      "Elle lui annonce à mots couverts qu’il est pris",
      "Elle lui demande de repasser vendredi",
      "Elle clôt l’entretien sans décider devant lui, et donne une date",
    ],
    answer: 2,
    because:
      "Ni oui ni non, et un jour. C’est la formule qui termine un entretien : la décision se prend après, et le candidat repart en sachant quand il saura.",
  },
  {
    question:
      "« Asseyez-vous, je vous en prie », « Merci à vous, madame ». Qu’ont en commun toutes les répliques de cet entretien ?",
    options: [
      "Elles passent peu à peu du « vous » au « tu »",
      "Elles sont toutes au « vous », des deux côtés",
      "Elles sont toutes des questions",
    ],
    answer: 1,
    because:
      "Personne ne tutoie personne, du bonjour au « bonne journée ». Même quand l’équipe se tutoie ensuite, un entretien se fait au « vous » du début à la fin.",
  },
  {
    question:
      "L’entretien suit un ordre annoncé : pourquoi vous, ce que vous avez fait, ce que nous proposons, ce que vous voulez savoir. Mme Léger le suit-elle ?",
    options: [
      "Oui, et sa dernière question est « Avez-vous d’autres questions ? »",
      "Non, elle commence par décrire le poste et les horaires",
      "Non, elle mélange les quatre étapes sans ordre",
    ],
    answer: 0,
    because:
      "« Pourquoi notre librairie vous intéresse-t-elle ? », puis « Parlez-moi de votre expérience », puis le poste, puis « Avez-vous d’autres questions ? ». Connaître cet ordre, c’est savoir ce qui vient.",
  },
];

export const SETS: QuestionSets = { A2, B1 };
