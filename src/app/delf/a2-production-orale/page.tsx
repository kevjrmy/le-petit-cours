import { Corrige } from "@/components/delf/Corrige";
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
 * les sujets à tirer, et ce que l'examinateur écoute. Elle ne donne **pas** de
 * dialogue modèle (#57) — produire son tour est exactement ce qui est noté.
 */
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
          prépare pas.
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
            Partie 2 · Monologue suivi{" "}
            <span className="points">2 minutes</span>
          </h3>

          <p>
            Vous tirez un sujet et vous parlez seul, sans que l’examinateur vous
            interrompe. Tirez-en un au hasard et préparez-le.
          </p>

          <ul className="documents">
            <li>
              <span>Parlez d’un voyage que vous avez fait.</span>
              <span className="lettre">1</span>
            </li>
            <li>
              <span>Décrivez votre logement.</span>
              <span className="lettre">2</span>
            </li>
            <li>
              <span>Parlez d’une personne que vous admirez.</span>
              <span className="lettre">3</span>
            </li>
            <li>
              <span>Qu’est-ce que vous faites pour rester en forme ?</span>
              <span className="lettre">4</span>
            </li>
            <li>
              <span>Racontez une journée de travail ordinaire.</span>
              <span className="lettre">5</span>
            </li>
            <li>
              <span>Quel est votre plat préféré, et pourquoi ?</span>
              <span className="lettre">6</span>
            </li>
          </ul>

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

          <ul className="documents">
            <li>
              <span>
                Vous achetez un cadeau dans un magasin. Vous hésitez entre deux
                objets et vous demandez conseil au vendeur.
              </span>
              <span className="lettre">1</span>
            </li>
            <li>
              <span>
                Vous arrivez à l’hôtel et votre chambre ne correspond pas à
                votre réservation. Vous l’expliquez à la réception.
              </span>
              <span className="lettre">2</span>
            </li>
            <li>
              <span>
                Vous voulez vous inscrire à un cours de sport. Vous demandez les
                horaires, le prix et ce qu’il faut apporter.
              </span>
              <span className="lettre">3</span>
            </li>
            <li>
              <span>
                Un ami vous propose un film que vous avez déjà vu. Vous refusez
                et vous proposez autre chose.
              </span>
              <span className="lettre">4</span>
            </li>
          </ul>

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
          <h3>Ce que l’examinateur écoute</h3>
          <p>
            Une grille par partie, puis quatre points sur la langue qui comptent
            pour l’ensemble de l’épreuve.
          </p>
          <ol>
            <li>
              <strong>Partie 1.</strong> Vous répondez par des phrases, vous
              donnez un détail sans qu’on vous le demande, et vous savez épeler
              votre nom.
            </li>
            <li>
              <strong>Partie 2.</strong> Vous parlez deux minutes sans vous
              arrêter, vous enchaînez vos idées, et vous donnez au moins une
              opinion, pas seulement des faits.
            </li>
            <li>
              <strong>Partie 3.</strong> Vous posez des questions, vous obtenez
              ce que la situation demande, et vous réagissez à ce qu’on vous
              répond au lieu de dérouler ce que vous aviez préparé.
            </li>
          </ol>

          <h3>La langue, sur l’ensemble</h3>
          <ol>
            <li>
              Vous avez le vocabulaire des sujets courants : la famille, le
              travail, le logement, les achats, les loisirs.
            </li>
            <li>
              Les formes simples sont correctes : le présent, le passé composé,
              le futur proche, les accords courants.
            </li>
            <li>
              On vous comprend sans effort, même avec un accent. L’accent ne
              coûte aucun point.
            </li>
            <li>
              Vous vous reprenez quand vous vous trompez, au lieu de vous
              arrêter. Se corriger à voix haute rapporte des points ; le silence
              n’en rapporte aucun.
            </li>
          </ol>

          <div className="attention">
            ne rendez pas la copie parfaite au prix du silence. Un candidat qui
            parle beaucoup en faisant des fautes courantes est mieux noté qu’un
            candidat qui dit trois phrases justes en deux minutes. L’épreuve
            mesure ce que vous savez faire, pas ce que vous savez éviter.
          </div>

          <h3>Votre note</h3>
          <p>
            L’épreuve vaut 25 points en tout, et il en faut au moins 5. Faites
            noter les trois parties par la personne qui a joué l’examinateur :
            elle a entendu ce que vous ne pouvez pas entendre vous-même.
          </p>
        </Corrige>
      </section>
    </article>
  );
}
