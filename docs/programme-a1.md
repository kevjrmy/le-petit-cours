# The A1 programme

What A1 has to cover before it joins `CHOOSABLE_LEVELS`, and what of it the course already has.
**`src/data/navigation.ts` is the truth about what exists** — count there, not here. This file is
the syllabus and the gap, and it goes stale the moment a page lands, so treat a line below as a
claim to re-check rather than as a record.

Why A1 is written the way it is, and what it was decided against, is `docs/decisions.md` #72;
why a page written at one rung is listed at every rung above it is #76.

## The source

**There is no official DELF A1 grammar programme.** No regulatory text publishes a list of points,
and the exam tests communication rather than grammar — there is no conjugation exercise in it. What
France Éducation international distributes instead is the *Inventaire linguistique des contenus clés
des niveaux du CECRL* (CIEP / Eaquals, 2015), whose **Annexe E** gives one page per level:
fonctions, grammaire, socio-culturel, thèmes de vocabulaire. Every list below is that page.

<https://www.eaquals.org/wp-content/uploads/Inventaire_ONLINE_full.pdf>

**The finish line is the FONCTIONS list, not the GRAMMAIRE list** (#15, #72). The exam asks someone
to fill in a form, write a postcard and hold a directed interview. So A1 is covered when the
twenty-four functions are covered — which puts the weight on `conversation` and `vocabulaire`, not
on `grammaire`, and suits a reader who arrives with the Romance verb system already in their head.

## What the audience changes

A1 French for a native Spanish speaker is not a standard A1. Thousands of words are transparent, the
verb system is familiar, and the gender of a noun is usually a good guess. What is actually missing
at A1 is **the sound, the written form and the false friends** — which is why `orthographe` and
`prononciation` carry more of A1 here than a published syllabus would suggest, and why the articles
and the plural can be short pages rather than chapters.

`prononciation` is still blocked on §12.2 — it is data-driven by §7, and no page can exist until
that shape is decided. It is the A1 blocker worth clearing first.

## FONCTIONS — the twenty-four, and the gate

Marked **·** where a page covers the function **at A1**; otherwise the right-hand column names the
A2 page an A1 twin would be written beside, where one exists. Nine of the twenty-four are marked,
two of them only in part.

| # | Fonction | Page |
|---|---|---|
| 1 | Aborder quelqu'un et demander quelque chose | **·** `conv-faire-des-achats` |
| 2 | Faire connaissance avec quelqu'un | **·** `conv-se-presenter` |
| 3 | Se présenter / s'informer sur l'identité / présenter quelqu'un | **·** `conv-se-presenter` |
| 4 | Saluer / prendre congé / remercier / s'excuser | **·** `conv-se-presenter`, sauf *s'excuser* |
| 5 | Demander de répéter, d'épeler, d'expliquer, de parler plus lentement | **·** `conv-se-presenter` |
| 6 | Demander et donner des informations personnelles | **·** `conv-se-presenter` |
| 7 | Prendre un rendez-vous (confirmer / reporter / annuler) | `conv-rendez-vous-medecin` |
| 8 | Féliciter / souhaiter / faire des compliments | — |
| 9 | Inviter, offrir : refuser, accepter, remercier | — |
| 10 | Informations sur des habitudes quotidiennes, un emploi du temps | `trad-une-journee` |
| 11 | Demander, donner des nouvelles de quelqu'un | — |
| 12 | Parler de ses goûts | — |
| 13 | Parler de ses projets | `gram-futur-proche` |
| 14 | S'informer sur les lieux / décrire et caractériser des lieux | `conv-decrire-sa-ville`, `conv-parler-espagne` |
| 15 | S'informer sur les personnes / décrire et caractériser des personnes | — |
| 16 | S'informer sur les choses / décrire et caractériser des choses | — |
| 17 | Demander / indiquer des instructions, un itinéraire | `conv-demander-son-chemin` |
| 18 | Demander des renseignements, des informations | — |
| 19 | Compter ; l'heure, les horaires, les prix, la date | **·** `voc-nombres` ; `voc-heure`, `voc-jours-et-date` restent A2 |
| 20 | Exprimer des quantités et des mesures | **·** `conv-faire-des-achats`, sauf les mesures |
| 21 | Faire des achats, des transactions simples, obtenir un service | **·** `conv-faire-des-achats` |
| 22 | Parler des modes de transport et savoir les utiliser | — |
| 23 | Faire une réservation (au restaurant) | `conv-au-restaurant` |
| 24 | Commander (au restaurant) | `conv-au-restaurant` |

**`conversation` is the chapter this list is really about**, and each level gets its own scene
(#72). The #68 shape does not reach down here: a reading shares seven hundred words, a role-play
shares a title, and #57 makes the page its steps and its word cloud — both of which change
completely between an A1 who greets, asks and thanks and an A2 who reschedules and explains a
symptom. The six that exist keep their ticks untouched.

## GRAMMAIRE — the thirty-five points

Marked **·** where a page already exists at some level; none is written at A1. A page listed at A2
is listed at B1 and B2 too (#76), so this gap is A1's alone.

*Verbes* — le présent (réguliers + usuels) **·** *(the fourteen `conjugaison` sheets, now `ANY`)* ·
le présent progressif (être en train de) · le futur proche **·** · le passé composé avec avoir et
avec être, quelques verbes **·** · le passé récent (je viens de) · les verbes modaux + infinitif ·
l'impératif (quelques verbes) · le conditionnel de politesse (je voudrais, j'aimerais) · les verbes
pronominaux · il faut / il ne faut pas + infinitif · les structures avec l'infinitif (pour).

*Question et négation* — qui est-ce ? / qu'est-ce que c'est ? · le questionnement (S+V, est-ce que,
interrogatif + S + V) · les interrogatifs (qui, où, quand, quel, combien, comment, pourquoi) · la
négation, `ne… pas / jamais` **·** *(`gram-negation`, written at A2's exponents)*.

*Le nom et son groupe* — le masculin et le féminin · le singulier et le pluriel · les articles
définis et indéfinis · les partitifs · les expressions de quantité · les adjectifs, place et accord ·
les adjectifs possessifs et démonstratifs **·** *(`orth-determinants-possessifs`, `ANY`)*.

*Adverbes et prépositions* — les adverbes de quantité (un peu de, beaucoup de, pas de) · d'intensité
(très, trop) · de lieu (ici, là) · de temps (maintenant, bientôt, demain) · les prépositions de lieu
(à, au, de, chez, dans) **·** *(`astuce-a-en-au-aux`, partly)* · les prépositions de temps (à 7h, en
2015) · les indicateurs de temps (dans, depuis, il y a).

*Le reste de la phrase* — les pronoms personnels sujets et toniques · il y a · c'est, ce sont, voici,
voilà · l'opposition (mais) · la conséquence (et, alors) · les articulateurs (et, ou).

### The six whose floor is A2

`l'imparfait`, `l'alternance passé composé / imparfait`, `les pronoms COD et COI`, `la comparaison
et le superlatif`, `les pronoms EN et Y`, `les pronoms relatifs`. They appear at A2 in the inventory
and nowhere below it, so **there is no A1 twin to write for any of them** — which is the only thing
a level decides here. They are listed at B1 and B2 like every other A2 page (#76): a B1 who never
sees the imparfait is being filtered away from the course rather than towards it.

### Why a shared point is still two pages

A1 and A2 both list *le présent*, *le futur proche*, *le passé composé*, *les modaux*, *l'impératif*,
*je voudrais* and *les pronominaux*. They differ by **exponent**, not by topic — A1's negation is
`ne… pas / jamais`, A2's is `ne… plus / rien / personne`. The inventory is spiral in Bruner's sense,
and the condition of a spiral is that revisiting brings *new material*. So a topic on both lists
earns a second, simpler page. **Never widen an A2 page's tag down to A1** — that hands an A1 learner
the A2 explanation, which is the one direction #76 leaves closed. Widening *upward* is free and
already done: the A2 pages are listed at B1 and B2, and their ticks did not move.

## THÈMES DE VOCABULAIRE — sixteen

Written **at A1**: les nombres *(`voc-nombres`, l'état civil reste à écrire)* · la famille et les
relations sociales *(`voc-famille`)*.

Written at A2, so an A1 twin is still owed: la date, les jours, les mois, les saisons, les fêtes
*(`voc-jours-et-date`)* · le monde du travail, la vie professionnelle, le métier *(`voc-travail`)* ·
l'alimentation, la cuisine *(`voc-recette-croissants`)*.

Missing entirely: les pays et les nationalités · les activités quotidiennes · les loisirs et les
sports · les moyens de transport · les vacances et les voyages · le logement, ameublement et
équipement · les lieux dans la ville, commerces et services · les vêtements et les accessoires · la
météo · les poids, les mesures, les quantités · les objets personnels et quotidiens.

**The false friends live here** (§1): a Spanish speaker reads most of this list for free, so an A1
vocabulary page earns its place by the words that betray them — `robe`, `sol`, `carte`, `rester`,
`quitter`, `large`, `long` — not by the ones they can guess.

## SOCIO-CULTUREL — four, none covered

Les salutations (bonjour, bonsoir) · les formules sociales, tutoiement et vouvoiement · les formules
pour inviter, remercier, s'excuser · les rituels de la lettre amicale et du courriel.

`tutoiement / vouvoiement` is the one a Spanish speaker gets wrong from transfer rather than from
ignorance — *usted* and *vous* do not divide the same way — so it is an `astuces` page, not a note
inside another.

## The chapters, and what A1 costs each

| Chapter | A1 shape |
|---|---|
| `conjugaison` | done — the fourteen sheets are `ANY` since #72 and carry le présent already |
| `orthographe` | done — all four are `ANY`; accents and homophones are A1's entry point |
| `grammaire` | ~13 new pages; `négation`, `passé composé`, `futur proche` get an A1 twin, not a tag |
| `vocabulaire` | ~11 new themes; the four A2 pages get an A1 twin where the theme repeats |
| `conversation` | ~3 new scenes; the six A2 ones are untouched and keep their ticks |
| `astuces` | the socio-culturel four, plus what `mistake-triage` turns up |
| `traduction` | new A1 source texts |
| `lecture` | new A1 texts; none of the nine is reusable — a text has a floor |
| `dictees`, `jeux`, `prononciation`, `culture` | blocked on §12.2 before level is the question |

Close to **thirty new pages** still, and about ten existing pages that want a simpler twin rather
than a wider tag. The count moves slowly: four landed on 2026-09-21 and took nine functions with
them, because a role-play answers several at once while a grammar page answers none.

## Order of work

1. **Clear `prononciation`** (§12.2) — the decision is what its data file *is*: minimal pairs,
   grapheme→son correspondences, or a sound inventory. It carries more of A1 for this audience than
   for any other, and §7 means no page can exist until the shape is chosen.
2. **`conversation` and `vocabulaire` first**, because the gate is the FONCTIONS list.
3. **`grammaire` behind them**, as the support the functions need — not as the spine.
4. **Nothing in the app changes when A1 is done.** It is already choosable (#74), and since #77 the
   interface makes no claim about how finished a level is — the « en cours » badge and
   `COURSE_LEVELS` are gone. The twenty-fourth function closes a line in this file and nothing else,
   which is the point: completeness is #15's, and it is editorial.
