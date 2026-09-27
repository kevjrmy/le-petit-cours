import { Chrono } from "@/components/delf/Chrono";
import { Copie, Correction, Questions } from "@/components/delf/Copie";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { COPIE } from "./copie";

const PATH = "/delf/a2-comprehension-des-ecrits";

export const metadata = lessonMetadata(PATH);

/**
 * Une épreuve entière de compréhension des écrits, au format du DELF A2.
 *
 * **Le format est repris, les documents sont écrits pour ce cours** (#78).
 * Quatre exercices, 5 + 6 + 9 + 5 points, trente minutes : c'est la forme
 * publique de l'examen, et c'est un fait. Les panneaux, les titres, l'article
 * et le courriel ci-dessous n'existent nulle part ailleurs.
 *
 * **Tout se coche, et tout se corrige d'un coup, à la fin** (#82). Les
 * questions et leur barème sont dans `copie.ts` ; la page garde les documents,
 * rendus par le serveur, et pose `<Questions>` là où chaque exercice les
 * attend. `<Copie>` tient les réponses autour de l'épreuve entière, parce que la
 * note du bas doit voir les quatre exercices (`AGENTS.md` §4).
 */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <Copie copie={COPIE}>
        <section>
          <h2>L’épreuve</h2>

          <p className="epreuve">
            <span>25 points</span>
            <span>30 minutes</span>
            <span>4 exercices</span>
          </p>

          <p>
            Pour chaque question, cliquez sur la bonne réponse. Recliquez-la
            pour l’effacer. Rien n’est corrigé pendant que vous répondez : à la
            fin, « Corriger ma copie » donne votre note sur 25.
          </p>

          <Chrono minutes={30} libelle="Temps de l’épreuve" />

          <div className="exercice">
            <h3>
              Exercice 1 <span className="points">5 points</span>
            </h3>

            <p>
              Vous marchez dans une ville française et vous lisez ces panneaux.
            </p>

            <ul className="documents">
              <li>
                <span>Ascenseur en panne — prenez l’escalier</span>
                <span className="lettre">A</span>
              </li>
              <li>
                <span>Boulangerie — fermée le lundi</span>
                <span className="lettre">B</span>
              </li>
              <li>
                <span>Pelouse interdite aux chiens</span>
                <span className="lettre">C</span>
              </li>
              <li>
                <span>Soldes — deux pulls achetés, le troisième offert</span>
                <span className="lettre">D</span>
              </li>
              <li>
                <span>Piscine — bonnet obligatoire</span>
                <span className="lettre">E</span>
              </li>
              <li>
                <span>Salle d’attente — éteignez votre téléphone</span>
                <span className="lettre">F</span>
              </li>
              <li>
                <span>Marché tous les samedis matin, place de la Mairie</span>
                <span className="lettre">G</span>
              </li>
              <li>
                <span>Stationnement réservé aux livraisons</span>
                <span className="lettre">H</span>
              </li>
            </ul>

            <p>Pour chaque phrase, choisissez la lettre du panneau.</p>

            <Questions groupe="1" />
          </div>

          <div className="exercice">
            <h3>
              Exercice 2 <span className="points">6 points</span>
            </h3>

            <p>
              Voici six titres de journal. Pour chaque titre, choisissez sa
              rubrique. Chaque rubrique sert une fois.
            </p>

            <Questions groupe="2" />
          </div>

          <div className="exercice">
            <h3>
              Exercice 3 <span className="points">9 points</span>
            </h3>

            <p>Lisez ce texte, puis répondez aux questions.</p>

            <div className="document">
              <h4>À Sainte-Colombe, le bus ne coûte plus rien</h4>
              <p>
                Depuis le mois de janvier, les quatre lignes de bus de
                Sainte-Colombe sont gratuites. Cette petite ville de huit mille
                habitants, au bord de la Loire, est la première du département à
                faire ce choix.
              </p>
              <p>
                Au terminus, madame Prévot attend la ligne 2. « Avant, je payais
                vingt-huit euros par mois. Maintenant je viens au marché deux
                fois par semaine, au lieu d’une. » Le matin, les bus sont pleins
                : la mairie compte quarante pour cent de voyageurs en plus
                depuis janvier.
              </p>
              <p>
                Tout le monde n’est pas content. « Gratuit, cela veut dire payé
                par les impôts*, » dit Karim Benali, qui tient un garage dans la
                zone commerciale. « Moi, mes clients viennent en voiture. » Le
                commerçant craint* aussi pour les places de stationnement, que
                la ville veut réduire.
              </p>
              <p>
                Le maire, lui, défend son projet : « Un bus vide coûte plus cher
                qu’un bus plein. Nous perdons les recettes* des tickets, mais
                nous économisons sur les machines et sur le contrôle. » La
                mairie annonce une cinquième ligne pour septembre, vers le
                lycée.
              </p>
              <p>
                Le département regarde l’expérience de près. Deux autres villes
                ont déjà demandé les chiffres.
              </p>
              <p className="notes">
                *les impôts : l’argent que chacun donne à l’État · *craindre :
                avoir peur de · *les recettes : l’argent que l’on gagne
              </p>
            </div>

            <Questions groupe="3-qcm" />

            <p>
              Vrai ou faux ? Choisissez, puis choisissez la phrase du texte qui
              le montre. <span className="points">7,5 points</span>
            </p>

            <Questions groupe="3-vf" />
          </div>

          <div className="exercice">
            <h3>
              Exercice 4 <span className="points">5 points</span>
            </h3>

            <p>Vous recevez ce message. Répondez aux questions.</p>

            <div className="document">
              <p className="entete">
                <strong>De :</strong> secretariat@gymclubdelavallee.fr
                <br />
                <strong>Objet :</strong> Votre inscription pour la saison
                prochaine
              </p>
              <p>Bonjour,</p>
              <p>
                Vous êtes inscrit au Gym Club de la Vallée depuis l’an dernier,
                et nous vous remercions de votre fidélité.
              </p>
              <p>
                Pour continuer l’an prochain, merci de renvoyer votre dossier
                avant le 30 juin. Après cette date, nous ne pouvons plus garder
                votre place : la liste d’attente compte déjà soixante personnes.
              </p>
              <p>
                Le dossier comprend la fiche d’inscription et un certificat
                médical de moins de trois mois. Le paiement se fait en une fois
                ou en trois fois, à votre choix.
              </p>
              <p>
                Nouveauté : les adhérents inscrits avant le 15 juin entrent
                gratuitement au cours d’aquagym du mercredi soir.
              </p>
              <p>Pour toute question, répondez simplement à ce message.</p>
              <p>Le secrétariat</p>
            </div>

            <Questions groupe="4" />
          </div>
        </section>

        <section>
          <h2>Les corrections</h2>

          <p>
            Répondez à tout avant de corriger. Une question laissée blanche vaut
            zéro, comme à l’examen : mieux vaut une réponse au hasard que pas de
            réponse.
          </p>

          <Correction>
            <p>
              À l’examen, cette épreuve compte pour un quart de la note : il
              faut 50 points sur 100 en tout, et au moins 5 sur 25 dans chacune
              des quatre épreuves.
            </p>
          </Correction>
        </section>
      </Copie>
    </article>
  );
}
