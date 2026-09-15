import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/l-invitation-au-voyage";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Charles Baudelaire · <em>Les Fleurs du mal</em> · 1857 ·
          « L’Invitation au voyage » · texte complet
        </p>

        <p>
          Un homme parle à la femme qu’il aime et lui propose de partir. Il ne
          dit jamais où : seulement que le pays lui ressemble. Trois strophes,
          et entre elles deux vers qui reviennent identiques. Ces deux vers sont
          la phrase la plus connue de la poésie française ; si vous ne lisez que
          cela, lisez-les.
        </p>

        <div className="example">
          <p>
            Mon enfant, ma sœur,
            <br />
            Songe à la douceur
            <br />
            D’aller là-bas vivre ensemble !
            <br />
            Aimer à loisir,
            <br />
            Aimer et mourir
            <br />
            Au pays qui te ressemble !
            <br />
            Les soleils mouillés
            <br />
            De ces ciels brouillés
            <br />
            Pour mon esprit ont les charmes
            <br />
            Si mystérieux
            <br />
            De tes traîtres yeux,
            <br />
            Brillant à travers leurs larmes.
          </p>
          <p>
            Là, tout n’est qu’ordre et beauté,
            <br />
            Luxe, calme et volupté.
          </p>
          <p>
            Des meubles luisants,
            <br />
            Polis par les ans,
            <br />
            Décoreraient notre chambre ;
            <br />
            Les plus rares fleurs
            <br />
            Mêlant leurs odeurs
            <br />
            Aux vagues senteurs de l’ambre,
            <br />
            Les riches plafonds,
            <br />
            Les miroirs profonds,
            <br />
            La splendeur orientale,
            <br />
            Tout y parlerait
            <br />À l’âme en secret
            <br />
            Sa douce langue natale.
          </p>
          <p>
            Là, tout n’est qu’ordre et beauté,
            <br />
            Luxe, calme et volupté.
          </p>
          <p>
            Vois sur ces canaux
            <br />
            Dormir ces vaisseaux
            <br />
            Dont l’humeur est vagabonde ;
            <br />
            C’est pour assouvir
            <br />
            Ton moindre désir
            <br />
            Qu’ils viennent du bout du monde.
            <br />— Les soleils couchants
            <br />
            Revêtent les champs,
            <br />
            Les canaux, la ville entière,
            <br />
            D’hyacinthe et d’or ;
            <br />
            Le monde s’endort
            <br />
            Dans une chaude lumière.
          </p>
          <p>
            Là, tout n’est qu’ordre et beauté,
            <br />
            Luxe, calme et volupté.
          </p>
        </div>

        <div className="attention">
          Deux verbes de la deuxième strophe ne sont ni au présent ni au passé :{" "}
          <span className="fr">décoreraient</span>,{" "}
          <span className="fr">parlerait</span>. C’est le conditionnel, et il
          change tout le poème : la chambre n’existe pas. Elle existerait, si
          elle partait avec lui.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Le refrain revient trois fois sans changer un mot, et c’est le seul
            endroit du poème où le lieu est décrit.
          </p>
          <p>
            Partout ailleurs, Baudelaire nomme des choses : des meubles, des
            fleurs, des plafonds, des bateaux. Dans le refrain, plus aucun
            objet, seulement ce qu’on ressent. C’est pour cela qu’on le retient
            et qu’on l’a mis sur des affiches de voyage pendant cent ans, en
            oubliant que le pays du poème n’est nulle part.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Les mots qui bloquent la lecture, définis en français
            </caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  ma sœur
                </th>
                <td>
                  ici, ce n’est pas la famille : c’est un mot tendre pour la
                  femme aimée
                </td>
                <td className="fr">Mon enfant, ma sœur, songe à la douceur…</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  songer à
                </th>
                <td>penser à, imaginer</td>
                <td className="fr">Songe à la douceur d’aller là-bas.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  à loisir
                </th>
                <td>sans se presser, autant qu’on veut</td>
                <td className="fr">Ils voudraient aimer à loisir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  brouillé
                </th>
                <td>ici : couvert de nuages, qu’on ne voit pas bien</td>
                <td className="fr">Le soleil passe mal dans ces ciels brouillés.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  traître
                </th>
                <td>qui trompe, en qui on ne peut pas avoir confiance</td>
                <td className="fr">
                  Il aime ses traîtres yeux sans leur faire confiance.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une larme
                </th>
                <td>l’eau qui coule des yeux quand on pleure</td>
                <td className="fr">Ses yeux brillent à travers leurs larmes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  luisant
                </th>
                <td>qui brille doucement</td>
                <td className="fr">Des meubles luisants décoreraient la chambre.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  poli par les ans
                </th>
                <td>rendu lisse et brillant par le temps qui passe</td>
                <td className="fr">Ce bois est poli par les ans.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une senteur
                </th>
                <td>une odeur, en général agréable</td>
                <td className="fr">Les fleurs mêlent leurs odeurs aux senteurs de l’ambre.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un plafond
                </th>
                <td>le haut d’une pièce, au-dessus de la tête</td>
                <td className="fr">Les riches plafonds et les miroirs profonds.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’âme
                </th>
                <td>ce qu’il y a de plus intérieur dans une personne</td>
                <td className="fr">Tout parlerait à l’âme en secret.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  natal
                </th>
                <td>de l’endroit où l’on est né</td>
                <td className="fr">
                  Sa langue natale est celle qu’elle a entendue enfant.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un canal
                </th>
                <td>une voie d’eau creusée par les hommes, dans une ville</td>
                <td className="fr">Les bateaux dorment sur les canaux.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un vaisseau
                </th>
                <td>ici : un grand bateau</td>
                <td className="fr">Ces vaisseaux viennent du bout du monde.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  assouvir
                </th>
                <td>satisfaire complètement un désir, une faim</td>
                <td className="fr">Ils viennent pour assouvir son moindre désir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  moindre
                </th>
                <td>le plus petit</td>
                <td className="fr">Son moindre désir suffit à les faire venir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la volupté
                </th>
                <td>un plaisir doux, lent, qui prend tout le corps</td>
                <td className="fr">Luxe, calme et volupté.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Le même texte à deux niveaux : choisissez le vôtre sous ce
          paragraphe. Répondez sans relire, puis retournez au poème pour celles
          qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
