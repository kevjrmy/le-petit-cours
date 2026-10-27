/**
 * « Tu ou vous ? » : quatorze situations, à l'A1 (`docs/levels/a1.md`).
 *
 * **Un seul lot, pas de `sets`** : la page est écrite à l'A1 (`AGENTS.md` §7).
 * Le lot est exporté sous `BANKS`, clé `A1`, pour l'audit `nav-wiring`.
 *
 * La situation est de l'explication, donc en espagnol et en français (#85,
 * #102) ; les formules proposées sont du français. Les mots français d'une
 * explication espagnole sont entre `*astérisques*`, l'espagnol d'une explication
 * française entre `~tildes~` : le plateau leur donne leur `lang`.
 *
 * **Chaque situation n'a qu'une réponse défendable**, et c'est la situation qui
 * le garantit, jamais le hasard du tirage : on n'y met pas deux formules qu'un
 * Français accepterait (*pardon* et *excusez-moi* pour demander son chemin ;
 * *de rien* et *je vous en prie* à un inconnu âgé ; *bonjour* avec un ami). Le
 * choix se fait entre des formules de la page `astuces/tu-ou-vous`, et d'elle
 * seule. Une formule fausse est toujours une formule juste ailleurs : le piège
 * est le contexte, pas l'orthographe.
 *
 * Le lot et l'ordre des choix sont mélangés à chaque partie par le plateau
 * (`shuffle()`), qui est donc chargé sans rendu serveur (`drill.tsx`).
 *
 * Vérification, à relancer après toute modification. Elle imprime les
 * situations avec leur réponse (à relire : un choix qui en cache une deuxième
 * se voit en lisant) et compte ce qu'elle a contrôlé.
 *
node --experimental-strip-types --input-type=module -e "
const { BANKS } = await import('./src/app/exercices/tu-ou-vous/data.ts')
const bad = []; let n = 0; const ids = new Set(); const answers = new Set()
for (const [level, items] of Object.entries(BANKS)) items.forEach((it, i) => {
  n++
  ids.add(it.id); answers.add(it.answer)
  if (it.options.filter(o => o === it.answer).length !== 1) bad.push(it.id + ': réponse absente ou en double')
  if (new Set(it.options).size !== it.options.length) bad.push(it.id + ': choix en double')
  if (it.options.length < 2 || it.options.length > 3) bad.push(it.id + ': nombre de choix')
  if ([it.situation, it.because].some(b => b.es.split('*').length % 2 === 0 || b.fr.split('~').length % 2 === 0)) bad.push(it.id + ': astérisque impair')
  if ([it.situation, it.because].some(b => b.es.length < 30 || b.fr.length < 30)) bad.push(it.id + ': texte trop court')
  console.log(String(i + 1).padStart(2), it.situation.es, '=>', it.answer, ' | ', it.options.join(' / '))
})
if (ids.size !== n) bad.push('id en double')
console.log('items vérifiés:', n, '; ids uniques:', ids.size, '; réponses distinctes:', answers.size)
console.log('problèmes:', bad.length ? bad : 'aucun')"
 */

import type { Bi } from "../bilingue";

export interface SituationItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** La scène, dans les deux langues. L’espagnol marque son français entre
   *  `*astérisques*`, le français son espagnol entre `~tildes~`. */
  situation: Bi;
  /** Français : les formules proposées, dont `answer`, exactement une fois. */
  options: string[];
  answer: string;
  /** Pourquoi cette formule et pas les autres, dans les deux langues. */
  because: Bi;
}

export const ITEMS: SituationItem[] = [
  {
    id: "boulangerie",
    situation: {
      es: "Son las 10 de la mañana y entras en una panadería. La panadera te mira.",
      fr: "Il est 10 heures du matin et vous entrez dans une boulangerie. La boulangère vous regarde.",
    },
    options: ["Bonjour, madame.", "Salut, madame.", "Bonne nuit, madame."],
    answer: "Bonjour, madame.",
    because: {
      es: "Al entrar en una tienda se saluda siempre, y de día es *bonjour*. *Salut* es solo para quien tuteas; *bonne nuit* se dice a quien se va a dormir.",
      fr: "Quand on entre dans un magasin, on salue toujours, et de jour on dit « bonjour ». « Salut » est seulement pour quelqu’un qu’on tutoie ; « bonne nuit » se dit à quelqu’un qui va dormir.",
    },
  },
  {
    id: "restaurant",
    situation: {
      es: "Son las 8 de la tarde. Llegas a un restaurante y saludas a la camarera, a quien no conoces.",
      fr: "Il est 8 heures du soir. Vous arrivez dans un restaurant et vous saluez la serveuse, que vous ne connaissez pas.",
    },
    options: ["Bonsoir, madame.", "Bonne nuit, madame.", "Salut, madame."],
    answer: "Bonsoir, madame.",
    because: {
      es: "Al caer la tarde y de noche, el saludo es *bonsoir*. *Bonne nuit* no es un saludo, y *salut* no se dice a una desconocida.",
      fr: "Le soir et la nuit, on dit « bonsoir ». « Bonne nuit » n’est pas une façon de saluer, et « salut » ne se dit pas à une inconnue.",
    },
  },
  {
    id: "copine",
    situation: {
      es: "Es mediodía y ves a tu amiga Léa por la calle. La conoces desde hace años.",
      fr: "Il est midi et vous voyez votre amie Léa dans la rue. Vous la connaissez depuis des années.",
    },
    options: ["Salut, Léa !", "Bonne nuit, Léa !", "Je vous en prie, Léa."],
    answer: "Salut, Léa !",
    because: {
      es: "Con un amigo, *salut* sirve para saludar y para despedirse. *Bonne nuit* es para quien se va a dormir, y *je vous en prie* responde a un *merci*.",
      fr: "Avec un ami, « salut » sert à dire bonjour et au revoir. « Bonne nuit » est pour quelqu’un qui va dormir, et « je vous en prie » répond à « merci ».",
    },
  },
  {
    id: "boulangere",
    situation: {
      es: "Quieres pan y le hablas a la panadera, a quien no conoces.",
      fr: "Vous voulez du pain et vous parlez à la boulangère, que vous ne connaissez pas.",
    },
    options: ["Vous avez du pain ?", "Tu as du pain ?"],
    answer: "Vous avez du pain ?",
    because: {
      es: "Con una desconocida o una vendedora se dice *vous*. *Tu as du pain ?* es lo que le dirías a un amigo.",
      fr: "À une inconnue ou à une vendeuse, on dit « vous ». « Tu as du pain ? » est ce que vous diriez à un ami.",
    },
  },
  {
    id: "frere",
    situation: {
      es: "Hablas con tu hermano pequeño, que tiene 8 años, y le preguntas si habla francés.",
      fr: "Vous parlez à votre petit frère, qui a 8 ans, et vous lui demandez s’il parle français.",
    },
    options: ["Tu parles français ?", "Vous parlez français ?"],
    answer: "Tu parles français ?",
    because: {
      es: "A un familiar y a un niño se les dice *tu*. *Vous* sería raro, casi una broma.",
      fr: "À un membre de la famille et à un enfant, on dit « tu ». « Vous » serait bizarre, presque une blague.",
    },
  },
  {
    id: "amis",
    situation: {
      es: "Hablas con dos amigos a la vez, dos personas que tuteas, y les preguntas si vienen mañana.",
      fr: "Vous parlez à deux amis en même temps, deux personnes que vous tutoyez, et vous demandez s’ils viennent demain.",
    },
    options: ["Vous venez demain ?", "Tu viens demain ?"],
    answer: "Vous venez demain ?",
    because: {
      es: "*Vous* es también el plural: a varias personas se les dice *vous*, aunque sean amigas. No existe una tercera palabra para *vosotros*.",
      fr: "« Vous » est aussi le pluriel : à plusieurs personnes, on dit « vous », même si ce sont des amis. Il n’existe pas de troisième mot pour ~vosotros~.",
    },
  },
  {
    id: "sortie-boutique",
    situation: {
      es: "Son las 11 de la mañana. Acabas de pagar en una tienda y sales: das las gracias y te despides de la dependienta.",
      fr: "Il est 11 heures du matin. Vous venez de payer dans un magasin et vous sortez : vous remerciez la vendeuse et vous lui dites au revoir.",
    },
    options: [
      "Merci, bonne journée !",
      "Merci, bonne soirée !",
      "Merci, bonne nuit !",
    ],
    answer: "Merci, bonne journée !",
    because: {
      es: "De día, al despedirte, se dice *bonne journée*. *Bonne soirée* es para la tarde-noche, y *bonne nuit* solo para quien se va a dormir.",
      fr: "De jour, pour dire au revoir, on dit « bonne journée ». « Bonne soirée » est pour la fin de l’après-midi et le soir, et « bonne nuit » seulement pour quelqu’un qui va dormir.",
    },
  },
  {
    id: "coucher",
    situation: {
      es: "Es tarde. Tu sobrino de 5 años se va a la cama, y tú le dices que duerma bien.",
      fr: "Il est tard. Votre neveu de 5 ans va au lit, et vous lui dites de bien dormir.",
    },
    options: ["Bonne nuit !", "Bonjour !", "Bonne journée !"],
    answer: "Bonne nuit !",
    because: {
      es: "*Bonne nuit* se dice a quien se va a dormir. *Bonjour* es un saludo, no una despedida, y *bonne journée* es para el día.",
      fr: "« Bonne nuit » se dit à quelqu’un qui va dormir. « Bonjour » sert à saluer, pas à dire au revoir, et « bonne journée » est pour le jour.",
    },
  },
  {
    id: "porte",
    situation: {
      es: "Le abres la puerta a un señor mayor que no conoces. Te dice « Merci, monsieur. » y tú le respondes con la fórmula más cortés.",
      fr: "Vous ouvrez la porte à un monsieur âgé que vous ne connaissez pas. Il dit « Merci, monsieur. » et vous répondez avec la formule la plus polie.",
    },
    options: ["Je vous en prie.", "Salut.", "Désolé."],
    answer: "Je vous en prie.",
    because: {
      es: "Con *vous* se responde a *merci* con *je vous en prie*, más cortés que *de rien*. *Salut* no se dice a un desconocido, y *désolé* es para lamentar algo.",
      fr: "Avec « vous », on répond à « merci » par « je vous en prie », plus poli que « de rien ». « Salut » ne se dit pas à un inconnu, et « désolé » sert à dire qu’on regrette quelque chose.",
    },
  },
  {
    id: "de-rien",
    situation: {
      es: "Le prestas un bolígrafo a tu amigo Hugo, que te dice « Merci ! ». Le respondes como entre amigos.",
      fr: "Vous prêtez un stylo à votre ami Hugo, qui vous dit « Merci ! ». Vous répondez comme entre amis.",
    },
    options: ["De rien.", "Je vous en prie.", "Bonsoir."],
    answer: "De rien.",
    because: {
      es: "Entre amigos, a *merci* se responde *de rien*. *Je vous en prie* es más formal y se usa con *vous*.",
      fr: "Entre amis, on répond à « merci » par « de rien ». « Je vous en prie » est plus formel et s’emploie avec « vous ».",
    },
  },
  {
    id: "pas-entendu",
    situation: {
      es: "El vendedor te dice el precio, pero hay ruido y no lo has oído. Le pides que lo repita.",
      fr: "Le vendeur vous dit le prix, mais il y a du bruit et vous n’avez pas entendu. Vous lui demandez de répéter.",
    },
    options: ["Pardon ? Vous pouvez répéter ?", "De rien ? Vous pouvez répéter ?", "Bonjour ? Vous pouvez répéter ?"],
    answer: "Pardon ? Vous pouvez répéter ?",
    because: {
      es: "*Pardon ?* es lo que se dice cuando no has oído. *De rien* responde a un *merci*, y *bonjour* ya se dijo al entrar.",
      fr: "« Pardon ? » se dit quand on n’a pas entendu. « De rien » répond à un « merci », et « bonjour » a déjà été dit en entrant.",
    },
  },
  {
    id: "gare",
    situation: {
      es: "Vas por la calle y paras a una desconocida para preguntarle dónde está la estación.",
      fr: "Vous marchez dans la rue et vous arrêtez une inconnue pour lui demander où est la gare.",
    },
    options: [
      "Excusez-moi, où est la gare ?",
      "Salut, où est la gare ?",
      "Désolé, où est la gare ?",
    ],
    answer: "Excusez-moi, où est la gare ?",
    because: {
      es: "Para llamar la atención de un desconocido, o para molestar un poco, se dice *excusez-moi*. *Salut* es para los amigos, y *désolé* es lamentar algo.",
      fr: "Pour attirer l’attention d’un inconnu, ou pour le déranger un peu, on dit « excusez-moi ». « Salut » est pour les amis, et « désolé » sert à dire qu’on regrette quelque chose.",
    },
  },
  {
    id: "retard",
    situation: {
      es: "Eres una chica y llegas 20 minutos tarde a la clase de tu profesor. Lo lamentas de verdad.",
      fr: "Vous êtes une femme et vous arrivez avec 20 minutes de retard au cours de votre professeur. Vous êtes vraiment désolée.",
    },
    options: [
      "Désolée, je suis en retard.",
      "Désolé, je suis en retard.",
      "Salut, je suis en retard.",
    ],
    answer: "Désolée, je suis en retard.",
    because: {
      es: "*Désolé* se usa para lamentar de verdad y concuerda con quien habla: una mujer dice *désolée*. *Salut* no se dice a un profesor.",
      fr: "« Désolé » sert à dire qu’on regrette vraiment, et il s’accorde avec la personne qui parle : une femme dit « désolée ». « Salut » ne se dit pas à un professeur.",
    },
  },
  {
    id: "medecin",
    situation: {
      es: "Son las 3 de la tarde. Sales de la consulta de la médica, a quien acabas de conocer, y le dices adiós.",
      fr: "Il est 3 heures de l’après-midi. Vous sortez du cabinet d’une femme médecin, que vous venez de rencontrer, et vous lui dites au revoir.",
    },
    options: ["Au revoir, madame.", "Bonjour, madame.", "Salut, madame."],
    answer: "Au revoir, madame.",
    because: {
      es: "*Au revoir* es el adiós que vale con cualquiera. *Bonjour* es para llegar, y *salut* no se dice a una desconocida.",
      fr: "« Au revoir » est le mot qui va avec tout le monde. « Bonjour » est pour arriver, et « salut » ne se dit pas à une inconnue.",
    },
  },
];

export const BANKS: Record<string, SituationItem[]> = { A1: ITEMS };

export function bankFor(): SituationItem[] {
  return BANKS.A1;
}
