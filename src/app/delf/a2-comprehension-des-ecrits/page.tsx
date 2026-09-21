import { Corrige } from "@/components/delf/Corrige";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

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
 * **Toute la page est statique sauf le bouton du corrigé** (`AGENTS.md` §4).
 * Les champs sont des `input` et des `textarea` non contrôlés : ils gardent ce
 * qu'on tape sans JavaScript, et ils sont toujours remplis quand le corrigé
 * s'ouvre en dessous.
 */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>L’épreuve</h2>

        <p className="epreuve">
          <span>25 points</span>
          <span>30 minutes</span>
          <span>4 exercices</span>
        </p>

        <p>
          Répondez aux questions en cochant la bonne réponse, ou en écrivant
          l’information demandée. Vous pouvez écrire directement dans la page.
          Rien n’est corrigé automatiquement : les corrections sont en bas, et
          elles ne s’affichent que si vous les demandez.
        </p>

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

          <div className="table-wrap">
            <table>
              <caption>
                Pour chaque phrase, écrivez la lettre du panneau qui correspond
              </caption>
              <thead>
                <tr>
                  <th scope="col">Phrase</th>
                  <th scope="col">Lettre</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Ici, il faut monter à pied.",
                  "Ce jour-là, il ne faut pas venir acheter du pain.",
                  "Il faut en prendre trois pour payer moins cher.",
                  "Il faut se couvrir la tête pour entrer.",
                  "On ne peut pas laisser sa voiture ici toute la journée.",
                ].map((phrase, index) => (
                  <tr key={index}>
                    <th scope="row">
                      {index + 1}. {phrase}
                    </th>
                    <td>
                      <input
                        type="text"
                        className="reponse reponse-court"
                        maxLength={1}
                        aria-label={`Lettre pour la phrase ${index + 1}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="exercice">
          <h3>
            Exercice 2 <span className="points">6 points</span>
          </h3>

          <p>
            Voici six titres de journal. Écrivez le numéro de chaque titre dans
            la rubrique qui lui correspond.
          </p>

          <ol className="questions">
            <li>Le maire de Lyon annonce sa candidature pour le mois de mars</li>
            <li>
              Une équipe de Toulouse découvre une nouvelle espèce de poisson
            </li>
            <li>Le prix du pain augmente de quatre centimes</li>
            <li>Trois cents bénévoles nettoient les berges de la Loire</li>
            <li>Le festival de Cannes ouvrira le 12 mai</li>
            <li>Les Bleues gagnent enfin contre la Norvège</li>
          </ol>

          <div className="table-wrap">
            <table>
              <caption>Une rubrique par titre, un titre par rubrique</caption>
              <thead>
                <tr>
                  {["Politique", "Culture", "Société", "Sciences", "Sports", "Économie"].map(
                    (rubrique) => (
                      <th scope="col" key={rubrique}>
                        {rubrique}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {["Politique", "Culture", "Société", "Sciences", "Sports", "Économie"].map(
                    (rubrique) => (
                      <td key={rubrique}>
                        <input
                          type="text"
                          className="reponse reponse-court"
                          maxLength={1}
                          aria-label={`Numéro du titre pour la rubrique ${rubrique}`}
                        />
                      </td>
                    ),
                  )}
                </tr>
              </tbody>
            </table>
          </div>
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
              vingt-huit euros par mois. Maintenant je viens au marché deux fois
              par semaine, au lieu d’une. » Le matin, les bus sont pleins : la
              mairie compte quarante pour cent de voyageurs en plus depuis
              janvier.
            </p>
            <p>
              Tout le monde n’est pas content. « Gratuit, cela veut dire payé
              par les impôts*, » dit Karim Benali, qui tient un garage dans la
              zone commerciale. « Moi, mes clients viennent en voiture. » Le
              commerçant craint* aussi pour les places de stationnement, que la
              ville veut réduire.
            </p>
            <p>
              Le maire, lui, défend son projet : « Un bus vide coûte plus cher
              qu’un bus plein. Nous perdons les recettes* des tickets, mais nous
              économisons sur les machines et sur le contrôle. » La mairie
              annonce une cinquième ligne pour septembre, vers le lycée.
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

          <ol className="questions">
            <li>
              <span className="enonce">
                <span>Ce texte vient :</span>
                <span className="points">0,5 point</span>
              </span>
              <ul className="choix">
                {["d’un journal", "d’un guide touristique", "d’une publicité"].map(
                  (choix) => (
                    <li key={choix}>
                      <label>
                        <input type="radio" name="ex3q1" />
                        <span>{choix}</span>
                      </label>
                    </li>
                  ),
                )}
              </ul>
            </li>
            <li>
              <span className="enonce">
                <span>Les bus de Sainte-Colombe sont gratuits depuis :</span>
                <span className="points">1 point</span>
              </span>
              <ul className="choix">
                {["le mois de janvier", "le mois de mai", "le mois de septembre"].map(
                  (choix) => (
                    <li key={choix}>
                      <label>
                        <input type="radio" name="ex3q2" />
                        <span>{choix}</span>
                      </label>
                    </li>
                  ),
                )}
              </ul>
            </li>
          </ol>

          <p>
            Vrai ou faux ? Cochez la case, puis justifiez votre réponse en
            citant une phrase du texte. <span className="points">7,5 points</span>
          </p>

          <ol className="questions">
            {[
              "Sainte-Colombe est une grande ville.",
              "Madame Prévot vient plus souvent au marché qu’avant.",
              "Karim Benali travaille dans le centre-ville.",
              "La ville va supprimer une ligne de bus.",
              "D’autres villes s’intéressent à ce que fait Sainte-Colombe.",
            ].map((phrase, index) => (
              <li key={index}>
                <span className="enonce">
                  <span>{phrase}</span>
                  <span className="points">1,5 point</span>
                </span>
                <ul className="choix">
                  <li>
                    <label>
                      <input type="radio" name={`ex3vf${index}`} />
                      <span>Vrai</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name={`ex3vf${index}`} />
                      <span>Faux</span>
                    </label>
                  </li>
                </ul>
                <input
                  type="text"
                  className="reponse"
                  aria-label={`Justification pour la phrase ${index + 1}`}
                  placeholder="Justification"
                />
              </li>
            ))}
          </ol>
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
              Vous êtes inscrit au Gym Club de la Vallée depuis l’an dernier, et
              nous vous remercions de votre fidélité.
            </p>
            <p>
              Pour continuer l’an prochain, merci de renvoyer votre dossier
              avant le 30 juin. Après cette date, nous ne pouvons plus garder
              votre place : la liste d’attente compte déjà soixante personnes.
            </p>
            <p>
              Le dossier comprend la fiche d’inscription et un certificat
              médical de moins de trois mois. Le paiement se fait en une fois ou
              en trois fois, à votre choix.
            </p>
            <p>
              Nouveauté : les adhérents inscrits avant le 15 juin entrent
              gratuitement au cours d’aquagym du mercredi soir.
            </p>
            <p>Pour toute question, répondez simplement à ce message.</p>
            <p>Le secrétariat</p>
          </div>

          <ol className="questions">
            <li>
              <span className="enonce">
                <span>Ce message vient :</span>
                <span className="points">1 point</span>
              </span>
              <ul className="choix">
                {["d’un ami", "d’un club de sport", "d’un magasin de vêtements"].map(
                  (choix) => (
                    <li key={choix}>
                      <label>
                        <input type="radio" name="ex4q1" />
                        <span>{choix}</span>
                      </label>
                    </li>
                  ),
                )}
              </ul>
            </li>
            <li>
              <span className="enonce">
                <span>Ce message sert à :</span>
                <span className="points">1 point</span>
              </span>
              <ul className="choix">
                {[
                  "inviter à une fête",
                  "demander de refaire son inscription",
                  "annoncer la fermeture du club",
                ].map((choix) => (
                  <li key={choix}>
                    <label>
                      <input type="radio" name="ex4q2" />
                      <span>{choix}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="enonce">
                <span>
                  Que faut-il envoyer avec la fiche d’inscription ?
                </span>
                <span className="points">1,5 point</span>
              </span>
              <input
                type="text"
                className="reponse"
                aria-label="Ce qu’il faut envoyer avec la fiche d’inscription"
              />
            </li>
            <li>
              <span className="enonce">
                <span>
                  Tous les adhérents entrent gratuitement au cours d’aquagym.
                </span>
                <span className="points">1,5 point</span>
              </span>
              <ul className="choix">
                <li>
                  <label>
                    <input type="radio" name="ex4q4" />
                    <span>Vrai</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="ex4q4" />
                    <span>Faux</span>
                  </label>
                </li>
              </ul>
              <input
                type="text"
                className="reponse"
                aria-label="Justification pour l’aquagym"
                placeholder="Justification"
              />
            </li>
          </ol>
        </div>
      </section>

      <section>
        <h2>Les corrections</h2>

        <p>
          Faites l’épreuve entière avant d’ouvrir cette partie. Un corrigé lu
          d’avance ne dit plus rien de ce que vous savez faire.
        </p>

        <Corrige>
          <h3>Exercice 1 · 5 points</h3>
          <p>Un point par bonne lettre.</p>
          <ol>
            <li>A — l’ascenseur est en panne, donc on monte à pied.</li>
            <li>B — la boulangerie est fermée le lundi.</li>
            <li>D — deux pulls achetés, le troisième offert.</li>
            <li>E — le bonnet est obligatoire à la piscine.</li>
            <li>H — le stationnement est réservé aux livraisons.</li>
          </ol>

          <h3>Exercice 2 · 6 points</h3>
          <p>Un point par rubrique.</p>
          <ol>
            <li>Politique : titre 1</li>
            <li>Culture : titre 5</li>
            <li>Société : titre 4</li>
            <li>Sciences : titre 2</li>
            <li>Sports : titre 6</li>
            <li>Économie : titre 3</li>
          </ol>

          <h3>Exercice 3 · 9 points</h3>
          <ol>
            <li>D’un journal. <em>(0,5 point)</em></li>
            <li>Le mois de janvier. <em>(1 point)</em></li>
          </ol>
          <p>
            Vrai ou faux, 1,5 point par ligne : 0,5 pour la case, 1 pour la
            justification. Une case juste sans justification ne vaut que 0,5.
          </p>
          <ol>
            <li>
              Faux — « Cette petite ville de huit mille habitants ».
            </li>
            <li>
              Vrai — « je viens au marché deux fois par semaine, au lieu d’une ».
            </li>
            <li>
              Faux — « qui tient un garage dans la zone commerciale ».
            </li>
            <li>
              Faux — « La mairie annonce une cinquième ligne pour septembre ».
            </li>
            <li>
              Vrai — « Deux autres villes ont déjà demandé les chiffres ».
            </li>
          </ol>

          <h3>Exercice 4 · 5 points</h3>
          <ol>
            <li>D’un club de sport. <em>(1 point)</em></li>
            <li>Demander de refaire son inscription. <em>(1 point)</em></li>
            <li>
              Un certificat médical de moins de trois mois. <em>(1,5 point)</em>
            </li>
            <li>
              Faux — « les adhérents inscrits avant le 15 juin entrent
              gratuitement ». <em>(1,5 point)</em>
            </li>
          </ol>

          <h3>Votre note</h3>
          <p>
            Additionnez : 5 + 6 + 9 + 5 font 25. À l’examen, cette épreuve
            compte pour un quart de la note, et il faut au moins 5 points sur
            25 dans chacune des quatre épreuves.
          </p>
        </Corrige>
      </section>
    </article>
  );
}
