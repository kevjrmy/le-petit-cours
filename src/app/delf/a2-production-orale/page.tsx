import { Corrige } from "@/components/delf/Corrige";
import { Grille, type GroupeCriteres } from "@/components/delf/Grille";
import { Tirage } from "@/components/delf/Tirage";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/delf/a2-production-orale";

export const metadata = lessonMetadata(PATH);

/**
 * L'épreuve de production orale du DELF A2, au format officiel (#78).
 *
 * Trois parties, six à huit minutes, dix minutes de préparation pour les deux
 * dernières. Les sujets sont écrits pour ce cours.
 *
 * **Cette page a besoin d'une deuxième personne, comme `conversation`** (#54).
 * Elle ne peut rien corriger : ce qu'elle donne, c'est la forme de l'épreuve,
 * les sujets à tirer, le temps, et la grille que l'examinateur remplit en
 * écoutant (#82). Elle ne donne **pas** de dialogue modèle (#57) — produire son
 * tour est exactement ce qui est noté.
 *
 * Les points de la grille suivent le barème publié : 4, 5 et 6 pour les trois
 * parties, puis 3 + 4 + 3 pour la langue sur l'ensemble. Les mots de chaque
 * ligne sont écrits pour ce cours (§9b).
 */
const MONOLOGUES = [
  "Parlez d’un voyage que vous avez fait.",
  "Décrivez votre logement.",
  "Parlez d’une personne que vous admirez.",
  "Qu’est-ce que vous faites pour rester en forme ?",
  "Racontez une journée de travail ordinaire.",
  "Quel est votre plat préféré, et pourquoi ?",
];

const SITUATIONS = [
  "Vous achetez un cadeau dans un magasin. Vous hésitez entre deux objets et vous demandez conseil au vendeur.",
  "Vous arrivez à l’hôtel et votre chambre ne correspond pas à votre réservation. Vous l’expliquez à la réception.",
  "Vous voulez vous inscrire à un cours de sport. Vous demandez les horaires, le prix et ce qu’il faut apporter.",
  "Un ami vous propose un film que vous avez déjà vu. Vous refusez et vous proposez autre chose.",
];

const GRILLE: GroupeCriteres[] = [
  {
    titre: "Partie 1 · l’entretien",
    total: 4,
    criteres: [
      {
        titre: "Se présenter",
        detail:
          "Saluer, dire qui l’on est, parler de soi et de ce qu’on fait, en phrases et avec un détail en plus.",
        max: 3,
      },
      {
        titre: "Répondre aux questions",
        detail:
          "Comprendre une question simple, y répondre, et faire répéter quand on n’a pas compris.",
        max: 1,
      },
    ],
  },
  {
    titre: "Partie 2 · le monologue",
    total: 5,
    criteres: [
      {
        titre: "Présenter le sujet",
        detail:
          "Parler du sujet tiré pendant environ deux minutes, avec des faits et au moins un avis.",
        max: 3,
      },
      {
        titre: "Relier ses idées",
        detail:
          "Les idées se suivent : d’abord, ensuite, mais, parce que, à la fin.",
        max: 2,
      },
    ],
  },
  {
    titre: "Partie 3 · l’interaction",
    total: 6,
    criteres: [
      {
        titre: "Obtenir ce qu’on demande",
        detail:
          "Poser les questions, donner les informations, accepter ou refuser, et arriver au bout de la situation.",
        max: 4,
      },
      {
        titre: "La politesse",
        detail:
          "Saluer, remercier, s’excuser, prendre congé, et vouvoyer quand la situation le demande.",
        max: 2,
      },
    ],
  },
  {
    titre: "La langue, sur toute l’épreuve",
    total: 10,
    criteres: [
      {
        titre: "Les mots",
        detail:
          "Le vocabulaire des sujets courants : la famille, le travail, le logement, les achats, les loisirs.",
        max: 3,
      },
      {
        titre: "La grammaire",
        detail:
          "Présent, passé composé, futur proche, accords courants : les formes simples sont correctes.",
        max: 4,
      },
      {
        titre: "La prononciation",
        detail:
          "On comprend sans effort, même avec un accent. Faire répéter de temps en temps ne coûte presque rien.",
        max: 3,
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
          <span>6 à 8 minutes</span>
          <span>3 parties</span>
          <span>Préparation : 10 minutes</span>
        </p>

        <p>
          Cette épreuve se passe avec quelqu’un en face de vous. Demandez à une
          autre personne de jouer l’examinateur : elle lit les consignes,
          chronomètre, et pose les questions de la troisième partie. Les dix
          minutes de préparation servent aux parties 2 et 3 ; la première ne se
          prépare pas. Tirez les deux sujets avant de commencer à préparer.
        </p>

        <div className="exercice">
          <h3>
            Partie 1 · Entretien dirigé{" "}
            <span className="points">1 à 2 minutes</span>
          </h3>

          <p>
            Sans préparation. L’examinateur vous pose des questions simples sur
            vous. Répondez par des phrases, jamais par un mot seul.
          </p>

          <ol className="questions">
            <li>Comment vous appelez-vous ? Pouvez-vous l’épeler ?</li>
            <li>Où habitez-vous, et depuis combien de temps ?</li>
            <li>Que faites-vous dans la vie ?</li>
            <li>Parlez-moi de votre famille.</li>
            <li>Qu’est-ce que vous aimez faire le week-end ?</li>
            <li>Pourquoi apprenez-vous le français ?</li>
          </ol>
        </div>

        <div className="exercice">
          <h3>
            Partie 2 · Monologue suivi <span className="points">2 minutes</span>
          </h3>

          <p>
            Vous tirez un sujet et vous parlez seul, sans que l’examinateur vous
            interrompe. Tirez-en un au hasard et préparez-le.
          </p>

          <Tirage sujets={MONOLOGUES} />

          <p>
            Notes de préparation. Des mots, pas des phrases : un texte écrit à
            l’avance s’entend, et il tombe à la première question.
          </p>

          <textarea
            className="redaction"
            aria-label="Vos notes pour le monologue"
            placeholder="où · quand · avec qui · ce que j’ai aimé…"
          />
        </div>

        <div className="exercice">
          <h3>
            Partie 3 · Exercice en interaction{" "}
            <span className="points">3 à 4 minutes</span>
          </h3>

          <p>
            Vous jouez une situation avec l’examinateur. Vous devez obtenir
            quelque chose de lui, ou vous mettre d’accord. Tirez un sujet.
          </p>

          <Tirage sujets={SITUATIONS} />

          <div className="attention">
            l’examinateur n’est pas là pour vous aider. Il attend que{" "}
            <strong>vous</strong> posiez les questions, que vous demandiez de
            répéter si vous n’avez pas compris, et que vous relanciez quand le
            silence s’installe. Un candidat qui attend qu’on lui parle perd des
            points qui sont faciles à avoir.
          </div>
        </div>
      </section>

      <section>
        <h2>Les corrections</h2>

        <p>
          Passez les trois parties avant d’ouvrir cette partie. Il n’y a pas de
          réponse à comparer : ce qui suit est ce que l’examinateur écoute, et
          vous pouvez le lire à deux, tout de suite après.
        </p>

        <Corrige>
          <h3>La grille</h3>
          <p>
            À remplir par la personne qui a joué l’examinateur, pendant
            l’épreuve ou juste après. Une ligne par partie, puis trois lignes
            sur la langue qui comptent pour l’ensemble.
          </p>
          <Grille groupes={GRILLE} />

          <div className="attention">
            ne rendez pas la copie parfaite au prix du silence. Un candidat qui
            parle beaucoup en faisant des fautes courantes est mieux noté qu’un
            candidat qui dit trois phrases justes en deux minutes. L’épreuve
            mesure ce que vous savez faire, pas ce que vous savez éviter.
          </div>

          <h3>Votre note</h3>
          <p>
            L’épreuve vaut 25 points en tout, et il en faut au moins 5. Faites
            remplir la grille par la personne qui a joué l’examinateur : elle a
            entendu ce que vous ne pouvez pas entendre vous-même.
          </p>
        </Corrige>
      </section>
    </article>
  );
}
