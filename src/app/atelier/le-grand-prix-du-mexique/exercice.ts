import type { ChoixItem } from "../_exercice/Choix";
import type { Morceau } from "../_exercice/Trous";

/*
 * Les plateaux de la page, dans l'ordre où elle les joue : le texte à trous,
 * puis un petit plateau par faute. Chaque phrase est faite des mots et des
 * faits de la course, le Grand Prix de Mexico du 1er novembre 2026
 * (Verstappen 1er, Hamilton 2e, Antonelli 3e et champion du monde à 20 ans,
 * Leclerc 4e ; vérifié sur formula1.com). Un fait que la course ne dit pas
 * n'entre pas dans un item : les phrases inventées restent générales.
 *
 * Vérification (trous, phrases complétées, côtés) :
 *
 *   node --experimental-strip-types --input-type=module -e "
 *   import * as X from './src/app/atelier/le-grand-prix-du-mexique/exercice.ts'
 *   const trous = X.TEXTE.flat().filter(m => typeof m !== 'string')
 *   trous.forEach((t, i) => { const o = [t.juste, t.copie, ...t.pieges]; console.log('TROU.' + (i + 1), o.join(' | ')); if (new Set(o).size !== 5) console.log('  !! pas cinq formes') })
 *   console.log('  ', trous.length, 'trous')
 *   for (const set of ['ACCORD', 'DOUBLES', 'A', 'MOTS', 'SIGNES']) { let g = 0; X[set].forEach((it, i) => { console.log(set + '.' + (i + 1), (it.avant + it.bonne + it.apres).replace(/\\s+/g, ' ')); if (!it.options.includes(it.bonne)) console.log('  !! bonne absente'); if (it.options[0] === it.bonne) g++ }); console.log('  ', g, 'a gauche sur', X[set].length) }"
 */

/**
 * Le texte rendu, corrigé partout sauf à seize endroits : les trous. Chaque
 * trou propose **cinq formes** : la juste, celle que la copie portait, et
 * trois pièges. **Aucun piège n'est une seconde réponse juste** (`AGENTS.md`
 * §9) : « le pilote le plus jeune à gagner » se dit aussi, et n'est pas
 * proposé ; « 4e » est la forme juste, « quatrième » en lettres ne l'est pas
 * moins et n'est pas proposé non plus.
 *
 * **Ce qui se défend reste tel quel**, sans trou : « le Grand Prix de la
 * Formule 1 au Mexique », « un accident important des deux Ferrari », « pour
 * moi personnellement » (dit partout à l'oral). Seule l'orthographe de
 * « personnellement » est un trou. Les corrections sans trou : les virgules.
 *
 * Le vainqueur est nommé par son nom seul : son prénom est sur la liste des
 * hooks locaux (`.private/blocklist`), qui refuseraient le commit.
 */
export const TEXTE: Morceau[][] = [
  [
    "Hier, Verstappen a gagné le ",
    { juste: "Grand Prix", copie: "grand prix", pieges: ["Gran Prix", "grand pris", "Grand Prit"] },
    " de la Formule 1 au Mexique, une course ",
    {
      juste: "passionnante",
      copie: "passionante",
      pieges: ["pasionante", "passionnant", "passionantte"],
    },
    ", avec un accident important des deux Ferrari au ",
    { juste: "début", copie: "debut", pieges: ["débout", "dèbut", "débu"] },
    " de la course, qui, pour moi ",
    {
      juste: "personnellement",
      copie: "personellement",
      pieges: ["personnelement", "personnallement", "personelement"],
    },
    ", ",
    {
      juste: "était la faute de",
      copie: "était à cause de",
      pieges: ["était à la faute de", "était dû de", "était la faute par"],
    },
    " Hamilton.",
  ],
  [
    "Mais toute l’attention a été ",
    { juste: "captée", copie: "remporté", pieges: ["capté", "remportée", "captés"] },
    " par Kimi Antonelli, qui est ",
    {
      juste: "officiellement",
      copie: "officielment",
      pieges: ["officiellment", "oficiellement", "officielement"],
    },
    " ",
    { juste: "devenu", copie: "devenue", pieges: ["devenus", "devenues", "devenut"] },
    " ",
    {
      juste: "le plus jeune pilote à gagner",
      copie: "le conducteur le plus jeune a gagné",
      pieges: [
        "le plus jeune pilote a gagné",
        "le plus jeune conducteur à gagner",
        "le plus jeune pilote de gagner",
      ],
    },
    " ",
    {
      juste: "le titre de champion du monde",
      copie: "le WDC",
      pieges: [
        "le titre du champion du monde",
        "le titre de champion de monde",
        "la titre de champion du monde",
      ],
    },
    ", ",
    {
      juste: "à seulement",
      copie: "avec seulement",
      pieges: ["en seulement", "de seulement", "a seulement"],
    },
    " 20 ans.",
  ],
  [
    "Le podium a été complété par Lewis Hamilton, et la ",
    { juste: "4e", copie: "4ème", pieges: ["4è", "4me", "4éme"] },
    " place ",
    {
      juste: "est revenue à",
      copie: "pour",
      pieges: ["est revenu à", "a revenu à", "est revenue pour"],
    },
    " mon ",
    { juste: "2e", copie: "2ème", pieges: ["2è", "2me", "2éme"] },
    " ",
    { juste: "pilote", copie: "pilot", pieges: ["pilotte", "pilotes", "pilott"] },
    " préféré, Charles ",
    { juste: "Leclerc", copie: "leclerc", pieges: ["LeClerc", "Le Clerc", "Leclère"] },
    ".",
  ],
];

/* Partie 2 : avec être (est, a été), le mot qui suit s'accorde avec le sujet.
   Les deux fautes de la copie, le « complété » qu'elle a juste, puis trois
   phrases de la course. */
export const ACCORD: ChoixItem[] = [
  {
    avant: "Toute l’attention a été ",
    apres: " par Kimi Antonelli.",
    options: ["capté", "captée"],
    bonne: "captée",
    pourquoi: "L’attention, c’est « elle » : captée, avec un e.",
  },
  {
    avant: "Kimi Antonelli est ",
    apres: " champion du monde.",
    options: ["devenu", "devenue"],
    bonne: "devenu",
    pourquoi: "Antonelli, c’est « il » : devenu, sans e.",
  },
  {
    avant: "Le podium a été ",
    apres: " par Lewis Hamilton.",
    options: ["complétée", "complété"],
    bonne: "complété",
    pourquoi: "Le podium, c’est « il » : complété. Tu l’avais écrit juste !",
  },
  {
    avant: "La quatrième place est ",
    apres: " à Charles Leclerc.",
    options: ["revenue", "revenu"],
    bonne: "revenue",
    pourquoi: "La place, c’est « elle » : revenue, avec un e.",
  },
  {
    avant: "La course a été ",
    apres: " par Verstappen.",
    options: ["gagné", "gagnée"],
    bonne: "gagnée",
    pourquoi: "La course, c’est « elle » : gagnée, avec un e.",
  },
  {
    avant: "Les pilotes sont ",
    apres: " au stand.",
    options: ["rentrés", "rentré"],
    bonne: "rentrés",
    pourquoi: "Les pilotes, c’est « ils » : rentrés, avec un s.",
  },
];

/* Partie 3 : une consonne en espagnol, souvent deux en français. Les trois
   mots de la copie, puis trois autres du même genre. « ataquer » est une
   faute d'une copie précédente. L'espagnol est dans la prose de la page, où
   il porte son lang="es" ; une explication de plateau est du texte nu. */
export const DOUBLES: ChoixItem[] = [
  {
    avant: "une course ",
    apres: "",
    options: ["passionante", "passionnante"],
    bonne: "passionnante",
    pourquoi: "Comme passion : deux s et deux n.",
  },
  {
    avant: "pour moi ",
    apres: "",
    options: ["personnellement", "personellement"],
    bonne: "personnellement",
    pourquoi: "personnel a deux n, et personnellement les garde.",
  },
  {
    avant: "Il est ",
    apres: " devenu champion.",
    options: ["officielment", "officiellement"],
    bonne: "officiellement",
    pourquoi: "officielle a deux l, et officiellement les garde.",
  },
  {
    avant: "C’est un pilote ",
    apres: ".",
    options: ["professionnel", "profesionnel"],
    bonne: "professionnel",
    pourquoi: "Comme profession : deux s et deux n.",
  },
  {
    avant: "Ferrari est une écurie ",
    apres: ".",
    options: ["italiene", "italienne"],
    bonne: "italienne",
    pourquoi: "italien, italienne : au féminin, le n double.",
  },
  {
    avant: "Un bon pilote sait ",
    apres: " au bon moment.",
    options: ["attaquer", "ataquer"],
    bonne: "attaquer",
    pourquoi: "attaquer prend deux t.",
  },
];

/* Partie 4 : le plus jeune, le premier, le seul, le dernier, le prochain :
   à + verbe. Les items inventés ne disent aucun fait de course. */
export const A: ChoixItem[] = [
  {
    avant: "Antonelli est le plus jeune pilote ",
    apres: " le titre.",
    options: ["à gagner", "a gagné"],
    bonne: "à gagner",
    pourquoi: "le plus jeune, puis à + verbe : à gagner.",
  },
  {
    avant: "Verstappen a été le premier ",
    apres: " la ligne d’arrivée.",
    options: ["de passer", "à passer"],
    bonne: "à passer",
    pourquoi: "le premier, puis à + verbe : à passer.",
  },
  {
    avant: "Qui sera le prochain ",
    apres: " au Mexique ?",
    options: ["à gagner", "en gagner"],
    bonne: "à gagner",
    pourquoi: "le prochain, puis à + verbe : à gagner.",
  },
  {
    avant: "Le dernier ",
    apres: " ferme la porte.",
    options: ["en partir", "à partir"],
    bonne: "à partir",
    pourquoi: "le dernier, puis à + verbe : à partir.",
  },
];

/* Partie 5 : les mots de la copie qui viennent de l'espagnol ou de
   l'anglais. L'espagnol est dans la prose de la page, où il porte son
   lang="es" ; une explication de plateau est du texte nu. */
export const MOTS: ChoixItem[] = [
  {
    avant: "le plus jeune ",
    apres: " de Formule 1",
    options: ["conducteur", "pilote"],
    bonne: "pilote",
    pourquoi: "En course, on dit pilote. Un conducteur conduit une voiture dans la rue, ou un bus.",
  },
  {
    avant: "Il a gagné ",
    apres: ".",
    options: ["le titre de champion du monde", "le WDC"],
    bonne: "le titre de champion du monde",
    pourquoi: "WDC est un sigle anglais. En français : le titre de champion du monde.",
  },
  {
    avant: "Il est champion du monde ",
    apres: " 20 ans.",
    options: ["avec seulement", "à seulement"],
    bonne: "à seulement",
    pourquoi: "L’âge se dit avec à : à 20 ans.",
  },
  {
    avant: "Toute l’attention a été ",
    apres: " par Antonelli.",
    options: ["captée", "remportée"],
    bonne: "captée",
    pourquoi: "On remporte une course ou un titre. L’attention, elle, est captée.",
  },
  {
    avant: "mon deuxième ",
    apres: " préféré",
    options: ["pilot", "pilote"],
    bonne: "pilote",
    pourquoi: "En français, pilote prend un e.",
  },
];

/* Partie 6 : l'abréviation des nombres en -ième, et la majuscule des noms
   propres. */
export const SIGNES: ChoixItem[] = [
  {
    avant: "la ",
    apres: " place",
    options: ["4ème", "4e"],
    bonne: "4e",
    pourquoi: "Après le chiffre, juste un e : 4e.",
  },
  {
    avant: "mon ",
    apres: " pilote préféré",
    options: ["2e", "2ème"],
    bonne: "2e",
    pourquoi: "Après le chiffre, juste un e : 2e.",
  },
  {
    avant: "Charles ",
    apres: "",
    options: ["leclerc", "Leclerc"],
    bonne: "Leclerc",
    pourquoi: "Un nom de famille prend une majuscule.",
  },
  {
    avant: "le ",
    apres: " du Mexique",
    options: ["Grand Prix", "grand prix"],
    bonne: "Grand Prix",
    pourquoi: "Le nom d’une course prend des majuscules : le Grand Prix du Mexique.",
  },
];
