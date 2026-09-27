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
 * Elle ne corrige rien et n'a pas de corrigé (#82) : ce qu'elle donne, c'est
 * la forme de l'épreuve et les sujets à tirer. La personne qui fait passer
 * l'épreuve note, et elle n'a pas besoin de la page pour ça. Elle ne donne
 * **pas** de dialogue modèle (#57) — produire son tour est exactement ce qui
 * est noté.
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
    </article>
  );
}
