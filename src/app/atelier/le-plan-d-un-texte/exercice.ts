import type { Bloc } from "../_exercice/Ordre";
import type { PartieItem } from "../_exercice/Partie";

/**
 * Trois plateaux, du plus facile au plus difficile, comme la séance a été
 * demandée : trois morceaux du Clasico de l'élève, neuf phrases à ranger,
 * puis six morceaux d'une fable.
 *
 * **Le premier texte est la copie de la page `le-clasico`, corrigée**, coupée
 * en trois : sa première phrase devient l'introduction, seule dans son
 * paragraphe. Rien n'y est ajouté.
 *
 * **Chaque morceau et chaque phrase porte son indice** (`AGENTS.md` §9) : une
 * minute, « en conclusion », « à mon avis », « Ce lion », « Cependant ». Aucune
 * phrase de `PHRASES` ne peut aller dans deux parties : le score, une fois
 * donné en tête, n'y est pas, parce qu'un bilan peut le redire.
 *
 * **Les faits du Clasico sont vérifiés** (25 octobre 2026, 10e journée de
 * Liga ; Raphinha sur corner à la 61e minute ; première défaite du Barça en
 * Liga cette saison).
 *
 * La fable est celle de `/litterature/le-lion-et-le-rat`, même édition (La
 * Fontaine, *Fables*, 1668, Livre II, fable 11 ; texte de l'éd. 1874 sur
 * Wikisource), vers pour vers, découpée en six.
 *
 * Nommé comme ses voisins, jamais `SETS` ni `BANKS` : la page est sans niveau.
 */

export const CLASICO: Bloc[] = [
  {
    texte:
      "Barcelone a perdu hier contre le Real Madrid lors du Clasico joué au Camp Nou.",
    partie: "L’introduction",
    indice: "Qui, quand, où et le résultat : c’est par là qu’on commence.",
  },
  {
    texte:
      "L’équipe blanche a mis le premier but grâce à une erreur de Gerard Martín et un coup de chance de Mbappé, à la 41e minute. En seconde mi-temps, Barcelone a égalisé grâce à Raphinha, mais à la 87e minute, Mbappé a mis le deuxième pour Madrid, grâce à une belle course de Camavinga.",
    partie: "Le développement",
    indice: "Des minutes, dans l’ordre du match : ce sont les faits.",
  },
  {
    texte:
      "En conclusion, Barcelone a joué un beau match, avec plein d’occasions, mais n’a pas su les utiliser, alors que le Real a profité des erreurs défensives de Barcelone, et a remporté la victoire.",
    partie: "La conclusion",
    indice: "« En conclusion », puis ton avis : « un beau match ».",
  },
];

/** Aucun morceau n'est déjà à sa place. */
export const CLASICO_AFFICHAGE = [2, 0, 1];

export const PARTIES = ["l’introduction", "le développement", "la conclusion"];

/**
 * Neuf phrases sur le même Clasico, trois par partie, dans un ordre qui n'est
 * pas celui du texte ; la bonne partie change d'une phrase à l'autre.
 */
export const PHRASES: PartieItem[] = [
  {
    phrase: "À la 41e minute, Mbappé a ouvert le score après une erreur de Gerard Martín.",
    bonne: "le développement",
    pourquoi: "Une minute et ce qui s’est passé : c’est un fait, il va dans le développement.",
  },
  {
    phrase: "Dimanche, le Barça recevait le Real Madrid au Camp Nou.",
    bonne: "l’introduction",
    pourquoi: "Quand, qui, où : c’est ce que le lecteur doit savoir d’abord.",
  },
  {
    phrase: "À mon avis, le Barça méritait au moins le match nul.",
    bonne: "la conclusion",
    pourquoi: "« À mon avis » : c’est ton opinion, elle attend la fin.",
  },
  {
    phrase: "Voici le compte rendu du Clasico entre le Barça et le Real Madrid.",
    bonne: "l’introduction",
    pourquoi: "La phrase annonce de quoi le texte va parler : c’est la toute première.",
  },
  {
    phrase: "Pour conclure, le Real a été plus efficace devant le but.",
    bonne: "la conclusion",
    pourquoi: "« Pour conclure », et un bilan de tout le match : c’est la fin.",
  },
  {
    phrase: "À la 61e minute, Raphinha a égalisé sur un corner.",
    bonne: "le développement",
    pourquoi: "Une minute, un buteur : un fait, au milieu du texte.",
  },
  {
    phrase: "C’est la première défaite du Barça en Liga cette saison, et elle fait mal.",
    bonne: "la conclusion",
    pourquoi: "On regarde le match de loin, et « elle fait mal » est un avis : c’est un bilan.",
  },
  {
    phrase: "Le match comptait pour la 10e journée de Liga.",
    bonne: "l’introduction",
    pourquoi: "C’est le cadre du match, avant que l’action commence.",
  },
  {
    phrase: "À la 87e minute, Camavinga a fait la passe décisive à Mbappé.",
    bonne: "le développement",
    pourquoi: "La 87e minute vient après la 61e : un fait, à sa place dans l’ordre du match.",
  },
];

export const FABLE: Bloc[] = [
  {
    texte:
      "Il faut, autant qu’on peut, obliger tout le monde :\nOn a souvent besoin d’un plus petit que soi.\nDe cette vérité deux fables feront foi ;\nTant la chose en preuves abonde.",
    partie: "L’introduction : la morale, annoncée",
    indice: "« deux fables feront foi » : le futur annonce l’histoire qui vient.",
  },
  {
    texte: "Entre les pattes d’un lion\nUn rat sortit de terre assez à l’étourdie.",
    partie: "Le développement : les personnages et le lieu",
    indice: "« un lion », « un rat » : les personnages arrivent, avec un article indéfini.",
  },
  {
    texte:
      "Le roi des animaux, en cette occasion,\nMontra ce qu’il était, et lui donna la vie.\nCe bienfait ne fut pas perdu.\nQuelqu’un aurait-il jamais cru\nQu’un lion d’un rat eût affaire ?",
    partie: "Le développement : le premier fait",
    indice: "« Le roi des animaux », c’est le lion déjà nommé, et « lui », le rat : ce morceau vient après eux.",
  },
  {
    texte:
      "Cependant il advint qu’au sortir des forêts\nCe lion fut pris dans des rets,\nDont ses rugissements ne le purent défaire.",
    partie: "Le développement : le deuxième fait",
    indice: "« Cependant », « Ce lion » : l’histoire continue avec un lion qu’on connaît déjà.",
  },
  {
    texte: "Sire rat accourut, et fit tant par ses dents\nQu’une maille rongée emporta tout l’ouvrage.",
    partie: "Le développement : le troisième fait",
    indice: "Le rat ronge une maille des rets : il faut que le lion y soit déjà pris.",
  },
  {
    texte: "Patience et longueur de temps\nFont plus que force ni que rage.",
    partie: "La conclusion : la morale, encore",
    indice: "Plus d’histoire, une vérité pour tout le monde : c’est la fin.",
  },
];

/** Aucun morceau n'est déjà à sa place. */
export const FABLE_AFFICHAGE = [4, 2, 5, 0, 3, 1];
