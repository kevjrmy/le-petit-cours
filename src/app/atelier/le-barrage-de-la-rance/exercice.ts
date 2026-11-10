import type { ChoixItem } from "../_exercice/Choix";
import type { QuizItem } from "../_exercice/Quiz";
import type { Morceau } from "../_exercice/Trous";

/*
 * Les plateaux de la page, dans l'ordre où elle les joue : le quiz sur la page
 * d'EDF, le résumé à trous, puis le plateau du truc nouveau.
 *
 * **Rien n'est copié de la page d'EDF** (`AGENTS.md` §9b) : les questions et
 * le résumé sont écrits pour la page, avec ses faits. Texte complet dans
 * `.private/2026-11-11/`.
 *
 * **Un chiffre reste dehors** : la page d'EDF donne l'usine pour « 10 % de
 * l'électricité produite en Bretagne », puis pour « 8 % de la production »
 * quelques lignes plus bas. Le quiz et le résumé n'en citent aucun ; la page
 * en fait une question à l'oral.
 *
 * Vérification (formes, phrases complétées, places, côtés) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/le-barrage-de-la-rance/exercice.ts'
 *   X.QUIZ.forEach((q, i) => { console.log('QUIZ.' + (i + 1), 'place', q.place, '| bonne en', q.reponses.indexOf(q.bonne), '|', q.question); q.fautes.forEach(f => { if (q.question.split(f.juste).length !== 2) console.log('  !! morceau absent ou double :', f.juste); console.log('   ', q.question.replace(f.juste, f.faux)) }) })
 *   const trous = X.RESUME.flat().filter(m => typeof m !== 'string')
 *   trous.forEach((t, i) => { const o = [t.juste, t.copie, ...t.pieges]; console.log('TROU.' + (i + 1), o.join(' | ')); if (new Set(o).size !== 5) console.log('  !! pas cinq formes') })
 *   console.log('  ', trous.length, 'trous')
 *   console.log(X.RESUME.map(p => p.map(m => typeof m === 'string' ? m : m.juste).join('')).join('\\n'))
 *   let g = 0; X.LIENS.forEach((it, i) => { console.log('LIENS.' + (i + 1), (it.avant + it.bonne + it.apres).replace(/\\s+/g, ' ')); if (!it.options.includes(it.bonne)) console.log('  !! bonne absente'); if (it.options[0] === it.bonne) g++ }); console.log('  ', g, 'a gauche sur', X.LIENS.length)"
 */

/**
 * Le quiz : cinq questions sur la page d'EDF, deux clics chacune. Les
 * écritures fausses portent les fautes de l'élève (l'espagnol sous le
 * français, -é ou -er, a ou à, la lettre muette, l'élision), une seule
 * chacune.
 */
export const QUIZ: QuizItem[] = [
  {
    question: "Quand est-ce que l’usine produit de l’électricité ?",
    fautes: [
      {
        juste: "produit",
        faux: "produce",
        pourquoi: "« Produce », c’est l’espagnol. En français : elle produit.",
      },
      {
        juste: "l’usine",
        faux: "la usine",
        pourquoi: "Devant une voyelle, la devient l’ : l’usine.",
      },
      {
        juste: "Quand",
        faux: "Quant",
        pourquoi: "Pour demander le moment, c’est « quand », avec un d.",
      },
    ],
    place: 1,
    reponses: [
      "Seulement la nuit",
      "Seulement quand la marée monte",
      "Quand la marée monte, et aussi quand elle descend",
      "Quand il y a du vent",
    ],
    bonne: "Quand la marée monte, et aussi quand elle descend",
    pourquoi:
      "Ses turbines « bulbes » tournent dans les deux sens. C’est ce qui rend l’usine de la Rance spéciale.",
  },
  {
    question: "Pourquoi est-ce qu’on peut prévoir sa production ?",
    fautes: [
      {
        juste: "prévoir",
        faux: "prévoire",
        pourquoi: "Les verbes en -oir n’ont pas de e : prévoir, voir, pouvoir.",
      },
      {
        juste: "on peut",
        faux: "on peux",
        pourquoi: "Avec on, comme avec il : on peut.",
      },
      {
        juste: "production",
        faux: "producion",
        pourquoi: "En français, -tion, avec un t : production, comme direction.",
      },
    ],
    place: 3,
    reponses: [
      "Elle suit le rythme des marées",
      "Elle dépend du vent",
      "EDF la choisit au hasard",
      "Elle s’arrête l’hiver",
    ],
    bonne: "Elle suit le rythme des marées",
    pourquoi:
      "La mer monte et descend deux fois par jour, à des heures qu’on connaît à l’avance. La production aussi.",
  },
  {
    question: "Qui a inauguré l’usine, et en quelle année ?",
    fautes: [
      {
        juste: "inauguré",
        faux: "inaugurer",
        pourquoi: "Après « a », c’est -é : il a inauguré.",
      },
      {
        juste: "Qui a",
        faux: "Qui à",
        pourquoi: "On peut dire « qui avait inauguré » : c’est a, sans accent.",
      },
      {
        juste: "quelle année",
        faux: "quel année",
        pourquoi: "Année est féminin : quelle année.",
      },
    ],
    place: 0,
    reponses: [
      "Napoléon, en 1806",
      "Le roi Louis XIV, en 1666",
      "Le président Macron, en 2020",
      "Le général de Gaulle, en 1966",
    ],
    bonne: "Le général de Gaulle, en 1966",
    pourquoi:
      "Le général de Gaulle a inauguré l’usine le 26 novembre 1966. Elle a donc soixante ans ce mois-ci.",
  },
  {
    question: "À combien d’habitants correspond la production de l’usine ?",
    fautes: [
      {
        juste: "d’habitants",
        faux: "de habitants",
        pourquoi: "Devant un h muet, de devient d’ : d’habitants.",
      },
      {
        juste: "habitants",
        faux: "habitans",
        pourquoi: "Habitant finit par -ant : des habitants.",
      },
      {
        juste: "correspond",
        faux: "corresponds",
        pourquoi: "Le sujet est « la production » : elle correspond, avec un d.",
      },
    ],
    place: 2,
    reponses: [
      "2 000 habitants, un village",
      "225 000 habitants, à peu près la ville de Rennes",
      "2 millions, toute la Bretagne",
      "22 500 habitants",
    ],
    bonne: "225 000 habitants, à peu près la ville de Rennes",
    pourquoi:
      "L’usine produit 500 GWh par an : autant que ce que consomment 225 000 habitants.",
  },
  {
    question: "D’où viennent les informations de ce texte ?",
    fautes: [
      {
        juste: "viennent",
        faux: "vienent",
        pourquoi: "Ils viennent, avec deux n, comme ils prennent.",
      },
      {
        juste: "D’où",
        faux: "D’ou",
        pourquoi: "Pour un lieu, « où » prend un accent grave.",
      },
      {
        juste: "informations",
        faux: "informaciones",
        pourquoi: "« Informaciones », c’est l’espagnol. En français : informations.",
      },
    ],
    place: 1,
    reponses: [
      "D’un journaliste d’Ouest-France",
      "D’un professeur de sciences",
      "De la page d’EDF, l’entreprise qui fait tourner l’usine",
      "De la mairie de Saint-Malo",
    ],
    bonne: "De la page d’EDF, l’entreprise qui fait tourner l’usine",
    pourquoi:
      "Le texte est écrit pour le cours avec les informations d’EDF, qui exploite l’usine. Ce qu’il dit est vrai, mais c’est EDF qui parle de sa propre usine.",
  },
];

/**
 * Le résumé de la page, écrit pour la séance : douze trous, cinq formes
 * chacun — la juste, la faute que l'élève fait d'habitude (`copie`), et trois
 * pièges. Ce sont ses fautes qui reviennent, déjà travaillées sur un plateau :
 * l'accord avec être, les doubles consonnes, les majuscules, le passé simple
 * à la place du passé composé, « la première à », l'espagnol sous le français.
 *
 * **Aucun piège n'est une seconde réponse juste** (`AGENTS.md` §9).
 */
export const RESUME: Morceau[][] = [
  [
    "Entre Dinard et Saint-Malo, un barrage ferme l’estuaire de la Rance. Dessous, une usine marémotrice produit de l’électricité avec la force des marées. Elle a été ",
    { juste: "construite", copie: "construit", pieges: ["construites", "construi", "contruite"] },
    " en six ans, puis ",
    { juste: "inaugurée", copie: "inauguré", pieges: ["inaugurer", "inaugurés", "innaugurée"] },
    " le 26 novembre 1966 par le général de Gaulle. C’était la première usine au monde ",
    { juste: "à produire", copie: "a produire", pieges: ["à produit", "de produire", "à produir"] },
    " de l’électricité avec les marées.",
  ],
  [
    "EDF y ",
    /* Pas « mit » : un passé simple bien formé serait une seconde réponse
       juste. « a mit » est la faute de sa copie du 5 octobre. */
    { juste: "a mis", copie: "a mit", pieges: ["a mi", "à mis", "a mise"] },
    " en service vingt-quatre turbines, ",
    { juste: "appelées", copie: "apellées", pieges: ["appelés", "appellées", "apelées"] },
    " « bulbes », qui tournent quand la marée monte et quand elle descend. Leur ",
    {
      juste: "fonctionnement",
      copie: "fonctionement",
      pieges: ["fonctionnemant", "fontionnement", "fonctionnment"],
    },
    " suit le rythme des marées : on peut donc prévoir la production. ",
    {
      juste: "Actuellement",
      copie: "Actuelement",
      pieges: ["Actualmente", "Actuellemant", "Actuellment"],
    },
    ", l’usine produit autant d’électricité que 225 000 ",
    { juste: "habitants", copie: "habitans", pieges: ["abitants", "habitant", "habitents"] },
    " en consomment, à peu près la ville de Rennes.",
  ],
  [
    "C’est une énergie renouvelable, précieuse pour l’électricité ",
    { juste: "bretonne", copie: "Bretonne", pieges: ["bretone", "Bretone", "brettone"] },
    " : la ",
    { juste: "Bretagne", copie: "bretagne", pieges: ["Bretaigne", "Bretagnie", "Brétagne"] },
    " achète à d’autres régions les deux tiers de l’électricité qu’elle consomme.",
  ],
  [
    "Mais la vase s’accumule dans l’estuaire. Pour EDF, elle n’a pas d’effet sur l’",
    {
      juste: "environnement",
      copie: "environement",
      pieges: ["envirronnement", "environnemant", "enviromment"],
    },
    " marin. Des associations et des élus ne sont pas d’accord : ils ont ",
    { juste: "demandé", copie: "demander", pieges: ["demandés", "demandait", "demandée"] },
    " à l’État d’agir.",
  ],
];

/**
 * Le truc nouveau : les mots qui organisent les idées. Six phrases sur la
 * Rance, chacune avec un seul mot qui tient la logique (ajout, conséquence,
 * opposition). La bonne forme change de côté d'un item à l'autre.
 */
export const LIENS: ChoixItem[] = [
  {
    avant: "L’usine produit quand la marée monte, ",
    apres: " quand elle descend.",
    options: ["donc", "mais aussi"],
    bonne: "mais aussi",
    pourquoi: "On ajoute une deuxième chose à la première : mais aussi.",
  },
  {
    avant: "La production suit les marées ; on peut ",
    apres: " la prévoir à l’avance.",
    options: ["donc", "pourtant"],
    bonne: "donc",
    pourquoi: "La deuxième idée est la conséquence de la première : donc.",
  },
  {
    avant: "L’énergie de la Rance est renouvelable. ",
    apres: ", la vase s’accumule dans l’estuaire.",
    options: ["Donc", "Pourtant"],
    bonne: "Pourtant",
    pourquoi: "Une bonne nouvelle, puis un problème : les deux s’opposent, pourtant.",
  },
  {
    avant: "EDF parle d’un phénomène naturel, ",
    apres: " des associations parlent de désastre.",
    options: ["alors que", "parce que"],
    bonne: "alors que",
    pourquoi: "Deux avis opposés, en même temps : alors que.",
  },
  {
    avant: "",
    apres: ", le barrage produit de l’électricité ; d’autre part, il sert de pont.",
    options: ["Par conséquent", "D’une part"],
    bonne: "D’une part",
    pourquoi: "« D’autre part » annonce la deuxième idée ; la première commence par « d’une part ».",
  },
  {
    avant: "La Bretagne produit peu d’électricité ; elle en achète ",
    apres: " à d’autres régions.",
    options: ["donc", "pourtant"],
    bonne: "donc",
    pourquoi: "Elle en produit peu, et c’est pour cela qu’elle en achète : donc.",
  },
];
