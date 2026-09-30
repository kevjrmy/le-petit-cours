/**
 * « Tu ou vous ? » : quatorze situations, à l'A1 (`docs/levels/a1.md`).
 *
 * **Un seul lot, pas de `sets`** : la page est écrite à l'A1 (`AGENTS.md` §7).
 * Le lot est exporté sous `BANKS`, clé `A1`, pour l'audit `nav-wiring`.
 *
 * La situation est de l'explication, donc en espagnol (#85) ; les formules
 * proposées sont du français. Les mots français d'une correction sont entre
 * `*astérisques*` : le plateau leur donne `lang="fr"`.
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
  if (it.because.split('*').length % 2 === 0) bad.push(it.id + ': astérisque impair')
  if (it.situation.length < 30 || it.because.length < 30) bad.push(it.id + ': texte trop court')
  console.log(String(i + 1).padStart(2), it.situation, '=>', it.answer, ' | ', it.options.join(' / '))
})
if (ids.size !== n) bad.push('id en double')
console.log('items vérifiés:', n, '; ids uniques:', ids.size, '; réponses distinctes:', answers.size)
console.log('problèmes:', bad.length ? bad : 'aucun')"
 */

export interface SituationItem {
  /** Permanent within this file: the key React renders by. */
  id: string;
  /** Espagnol : la scène. Jamais de français ici sans `*astérisques*`. */
  situation: string;
  /** Français : les formules proposées, dont `answer`, exactement une fois. */
  options: string[];
  answer: string;
  /** Espagnol : pourquoi cette formule et pas les autres. */
  because: string;
}

export const ITEMS: SituationItem[] = [
  {
    id: "boulangerie",
    situation:
      "Son las 10 de la mañana y entras en una panadería. La panadera te mira.",
    options: ["Bonjour, madame.", "Salut, madame.", "Bonne nuit, madame."],
    answer: "Bonjour, madame.",
    because:
      "Al entrar en una tienda se saluda siempre, y de día es *bonjour*. *Salut* es solo para quien tuteas; *bonne nuit* se dice a quien se va a dormir.",
  },
  {
    id: "restaurant",
    situation:
      "Son las 8 de la tarde. Llegas a un restaurante y saludas a la camarera, a quien no conoces.",
    options: ["Bonsoir, madame.", "Bonne nuit, madame.", "Salut, madame."],
    answer: "Bonsoir, madame.",
    because:
      "Al caer la tarde y de noche, el saludo es *bonsoir*. *Bonne nuit* no es un saludo, y *salut* no se dice a una desconocida.",
  },
  {
    id: "copine",
    situation:
      "Es mediodía y ves a tu amiga Léa por la calle. La conoces desde hace años.",
    options: ["Salut, Léa !", "Bonne nuit, Léa !", "Je vous en prie, Léa."],
    answer: "Salut, Léa !",
    because:
      "Con un amigo, *salut* sirve para saludar y para despedirse. *Bonne nuit* es para quien se va a dormir, y *je vous en prie* responde a un *merci*.",
  },
  {
    id: "boulangere",
    situation:
      "Quieres pan y le hablas a la panadera, a quien no conoces.",
    options: ["Vous avez du pain ?", "Tu as du pain ?"],
    answer: "Vous avez du pain ?",
    because:
      "Con una desconocida o una vendedora se dice *vous*. *Tu as du pain ?* es lo que le dirías a un amigo.",
  },
  {
    id: "frere",
    situation:
      "Hablas con tu hermano pequeño, que tiene 8 años, y le preguntas si habla francés.",
    options: ["Tu parles français ?", "Vous parlez français ?"],
    answer: "Tu parles français ?",
    because:
      "A un familiar y a un niño se les dice *tu*. *Vous* sería raro, casi una broma.",
  },
  {
    id: "amis",
    situation:
      "Hablas con dos amigos a la vez, dos personas que tuteas, y les preguntas si vienen mañana.",
    options: ["Vous venez demain ?", "Tu viens demain ?"],
    answer: "Vous venez demain ?",
    because:
      "*Vous* es también el plural: a varias personas se les dice *vous*, aunque sean amigas. No existe una tercera palabra para *vosotros*.",
  },
  {
    id: "sortie-boutique",
    situation:
      "Son las 11 de la mañana. Acabas de pagar en una tienda y sales: das las gracias y te despides de la dependienta.",
    options: [
      "Merci, bonne journée !",
      "Merci, bonne soirée !",
      "Merci, bonne nuit !",
    ],
    answer: "Merci, bonne journée !",
    because:
      "De día, al despedirte, se dice *bonne journée*. *Bonne soirée* es para la tarde-noche, y *bonne nuit* solo para quien se va a dormir.",
  },
  {
    id: "coucher",
    situation:
      "Es tarde. Tu sobrino de 5 años se va a la cama, y tú le dices que duerma bien.",
    options: ["Bonne nuit !", "Bonjour !", "Bonne journée !"],
    answer: "Bonne nuit !",
    because:
      "*Bonne nuit* se dice a quien se va a dormir. *Bonjour* es un saludo, no una despedida, y *bonne journée* es para el día.",
  },
  {
    id: "porte",
    situation:
      "Le abres la puerta a un señor mayor que no conoces. Te dice « Merci, monsieur. » y tú le respondes con la fórmula más cortés.",
    options: ["Je vous en prie.", "Salut.", "Désolé."],
    answer: "Je vous en prie.",
    because:
      "Con *vous* se responde a *merci* con *je vous en prie*, más cortés que *de rien*. *Salut* no se dice a un desconocido, y *désolé* es para lamentar algo.",
  },
  {
    id: "de-rien",
    situation:
      "Le prestas un bolígrafo a tu amigo Hugo, que te dice « Merci ! ». Le respondes como entre amigos.",
    options: ["De rien.", "Je vous en prie.", "Bonsoir."],
    answer: "De rien.",
    because:
      "Entre amigos, a *merci* se responde *de rien*. *Je vous en prie* es más formal y se usa con *vous*.",
  },
  {
    id: "pas-entendu",
    situation:
      "El vendedor te dice el precio, pero hay ruido y no lo has oído. Le pides que lo repita.",
    options: ["Pardon ? Vous pouvez répéter ?", "De rien ? Vous pouvez répéter ?", "Bonjour ? Vous pouvez répéter ?"],
    answer: "Pardon ? Vous pouvez répéter ?",
    because:
      "*Pardon ?* es lo que se dice cuando no has oído. *De rien* responde a un *merci*, y *bonjour* ya se dijo al entrar.",
  },
  {
    id: "gare",
    situation:
      "Vas por la calle y paras a una desconocida para preguntarle dónde está la estación.",
    options: [
      "Excusez-moi, où est la gare ?",
      "Salut, où est la gare ?",
      "Désolé, où est la gare ?",
    ],
    answer: "Excusez-moi, où est la gare ?",
    because:
      "Para llamar la atención de un desconocido, o para molestar un poco, se dice *excusez-moi*. *Salut* es para los amigos, y *désolé* es lamentar algo.",
  },
  {
    id: "retard",
    situation:
      "Eres una chica y llegas 20 minutos tarde a la clase de tu profesor. Lo lamentas de verdad.",
    options: [
      "Désolée, je suis en retard.",
      "Désolé, je suis en retard.",
      "Salut, je suis en retard.",
    ],
    answer: "Désolée, je suis en retard.",
    because:
      "*Désolé* se usa para lamentar de verdad y concuerda con quien habla: una mujer dice *désolée*. *Salut* no se dice a un profesor.",
  },
  {
    id: "medecin",
    situation:
      "Son las 3 de la tarde. Sales de la consulta de la médica, a quien acabas de conocer, y le dices adiós.",
    options: ["Au revoir, madame.", "Bonjour, madame.", "Salut, madame."],
    answer: "Au revoir, madame.",
    because:
      "*Au revoir* es el adiós que vale con cualquiera. *Bonjour* es para llegar, y *salut* no se dice a una desconocida.",
  },
];

export const BANKS: Record<string, SituationItem[]> = { A1: ITEMS };

export function bankFor(): SituationItem[] {
  return BANKS.A1;
}
