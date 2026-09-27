import { Chrono } from "@/components/delf/Chrono";
import { Corrige } from "@/components/delf/Corrige";
import { Grille, type GroupeCriteres } from "@/components/delf/Grille";
import { Redaction } from "@/components/delf/Redaction";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/delf/a2-production-ecrite";

export const metadata = lessonMetadata(PATH);

/**
 * L'épreuve de production écrite du DELF A2, au format officiel (#78).
 *
 * Deux exercices, 13 et 12 points, quarante-cinq minutes : raconter un
 * événement, puis répondre à une lettre amicale. Les deux sujets sont écrits
 * pour ce cours.
 *
 * **Le corrigé d'une production n'est pas une réponse, c'est une grille.** Un
 * texte de soixante mots a des centaines de versions justes, alors le bloc du
 * bas donne la grille à cliquer par la personne qui corrige (#82), dans l'ordre
 * où l'examinateur regarde, puis un exemple de texte qui vaudrait tous les
 * points — présenté comme un exemple et non comme *la* réponse (#54).
 *
 * Les points de chaque ligne suivent le barème publié (1 + 4 + 2 + 2 + 2,5 +
 * 1,5 et 1 + 1 + 4 + 2 + 2,5 + 1,5) ; les mots de chaque ligne sont écrits pour
 * ce cours (§9b).
 */
const GRILLE: GroupeCriteres[] = [
  {
    titre: "Exercice 1 · le journal",
    total: 13,
    criteres: [
      {
        titre: "La consigne",
        detail:
          "Le texte raconte un week-end dans une ville inconnue, et il fait au moins 60 mots.",
        max: 1,
      },
      {
        titre: "Raconter et décrire",
        detail:
          "On suit ce qui s’est passé, dans l’ordre, avec des détails : où, quand, avec qui, ce qu’on a vu.",
        max: 4,
      },
      {
        titre: "Dire ce qu’on en pense",
        detail:
          "Ce qui a plu et ce qui a déplu, avec une raison au moins une fois.",
        max: 2,
      },
      {
        titre: "Les mots",
        detail: "Les mots du sujet, employés juste et écrits juste.",
        max: 2,
      },
      {
        titre: "La grammaire",
        detail:
          "Passé composé et imparfait, accords, articles : les formes courantes sont correctes.",
        max: 2.5,
      },
      {
        titre: "L’enchaînement",
        detail:
          "Les phrases sont reliées : d’abord, ensuite, mais, parce que, le soir.",
        max: 1.5,
      },
    ],
  },
  {
    titre: "Exercice 2 · la réponse à Claire",
    total: 12,
    criteres: [
      {
        titre: "La consigne",
        detail:
          "C’est bien une réponse à Claire, et elle fait au moins 60 mots.",
        max: 1,
      },
      {
        titre: "Le ton d’une lettre à une amie",
        detail:
          "Une formule pour commencer, une pour finir, et le tutoiement tenu du début à la fin.",
        max: 1,
      },
      {
        titre: "Les quatre choses demandées",
        detail:
          "Remercier, refuser, expliquer pourquoi, proposer autre chose. Il en manque une et ce critère tombe.",
        max: 4,
      },
      {
        titre: "Les mots",
        detail:
          "Les mots de l’invitation et de l’excuse, employés juste et écrits juste.",
        max: 2,
      },
      {
        titre: "La grammaire",
        detail:
          "Présent, passé composé, futur proche, accords : les formes courantes sont correctes.",
        max: 2.5,
      },
      {
        titre: "L’enchaînement",
        detail: "Les idées sont reliées : mais, parce que, alors, est-ce que.",
        max: 1.5,
      },
    ],
  },
];
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>L’épreuve</h2>

        <p className="epreuve">
          <span>25 points</span>
          <span>45 minutes</span>
          <span>2 exercices</span>
        </p>

        <p>
          Deux textes courts à écrire, directement dans la page. Le nombre de
          mots s’affiche sous chaque texte : la longueur demandée fait partie de
          la consigne, et c’est le point le plus facile à perdre.
        </p>

        <Chrono minutes={45} libelle="Temps de l’épreuve" />

        <div className="exercice">
          <h3>
            Exercice 1 <span className="points">13 points</span>
          </h3>

          <p>
            Vous avez passé le week-end dernier dans une ville que vous ne
            connaissiez pas. Vous racontez ce week-end dans votre journal
            personnel : ce que vous avez fait, ce que vous avez aimé, ce qui
            vous a déplu. <strong>Écrivez un texte de 60 à 80 mots.</strong>
          </p>

          <Redaction
            min={60}
            max={80}
            libelle="Votre journal personnel, 60 à 80 mots"
            placeholder="Samedi matin…"
          />
        </div>

        <div className="exercice">
          <h3>
            Exercice 2 <span className="points">12 points</span>
          </h3>

          <p>Vous recevez ce message d’une amie.</p>

          <div className="document">
            <p className="entete">
              <strong>De :</strong> claire.mercier@courriel.fr
              <br />
              <strong>Objet :</strong> Samedi 14 ?
            </p>
            <p>Coucou,</p>
            <p>
              Je fête mes trente ans le samedi 14, chez moi, à partir de vingt
              heures. On sera une quinzaine, il y aura à manger, et tu connais
              déjà la moitié des gens.
            </p>
            <p>
              Dis-moi vite si tu viens, parce que je dois commander le repas
              lundi.
            </p>
            <p>Bises, Claire</p>
          </div>

          <p>
            Vous répondez à Claire. Vous la remerciez, vous lui dites que vous
            ne pouvez pas venir, vous expliquez pourquoi, et vous lui proposez
            autre chose. <strong>Écrivez un texte de 60 à 80 mots.</strong>
          </p>

          <Redaction
            min={60}
            max={80}
            libelle="Votre réponse à Claire, 60 à 80 mots"
            placeholder="Chère Claire,"
          />
        </div>
      </section>

      <section>
        <h2>Les corrections</h2>

        <p>
          Écrivez vos deux textes en entier avant d’ouvrir cette partie. Un
          modèle lu d’avance devient le texte que vous recopiez, et ce n’est pas
          ce qui est noté.
        </p>

        <Corrige>
          <h3>La grille</h3>
          <p>
            À remplir par la personne qui corrige, texte sous les yeux. Dans cet
            ordre : les premiers points sont les plus faciles à avoir et les
            plus faciles à perdre. Un texte sans faute qui oublie une des quatre
            choses de l’exercice 2 est moins bien noté qu’un texte maladroit qui
            les fait toutes.
          </p>
          <Grille groupes={GRILLE} />

          <h3>Exercice 1 · un exemple à 13 points</h3>
          <p>
            Un exemple parmi des centaines. Le vôtre est juste s’il fait ce que
            fait celui-ci, pas s’il lui ressemble.
          </p>
          <div className="example">
            Samedi matin, je suis arrivée à Nantes en train. J’ai laissé mes
            affaires à l’hôtel et je suis allée directement au château. Il
            faisait froid mais le soleil brillait. L’après-midi, j’ai visité le
            musée, qui était gratuit ce jour-là. Le soir, j’ai mangé une crêpe
            dans une petite rue près du port. Dimanche, il a plu toute la
            journée et les musées étaient fermés. C’est dommage, mais je vais
            revenir au printemps.
          </div>
          <p>
            Soixante-douze mots. Le passé composé raconte, l’imparfait décrit,
            et la dernière phrase donne l’avis que la consigne demande.
          </p>

          <h3>Exercice 2 · un exemple à 12 points</h3>
          <div className="example">
            Chère Claire,
            <br />
            Merci beaucoup pour ton invitation, ça me touche vraiment.
            Malheureusement je ne peux pas venir samedi 14 : je travaille tout
            le week-end, parce qu’une collègue est malade et que je la remplace.
            Je suis désolée, j’aurais vraiment aimé être là pour tes trente ans.
            Est-ce que tu es libre le week-end suivant ? Je t’invite au
            restaurant, tous les deux, et on fête ça tranquillement.
            <br />
            Réponds-moi vite. Bises,
          </div>
          <p>
            Les quatre actes sont là, dans l’ordre :{" "}
            <span className="fr">merci beaucoup</span> remercie,{" "}
            <span className="fr">je ne peux pas venir</span> refuse,{" "}
            <span className="fr">parce que</span> explique,{" "}
            <span className="fr">est-ce que tu es libre</span> propose. Sans le
            quatrième, cette copie perd des points même sans une seule faute.
          </p>

          <h3>Votre note</h3>
          <p>
            13 et 12 font 25, et la grille fait l’addition. Comptez large sur la
            consigne et sévère sur la longueur : c’est ce que fait le
            correcteur. Il faut au moins 5 points sur 25 dans chaque épreuve.
          </p>
        </Corrige>
      </section>
    </article>
  );
}
