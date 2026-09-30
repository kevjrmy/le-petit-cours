import { Quiz } from "./quiz";

/*
 * The text: « Combray », I, first three paragraphs, uncut, from the Gallimard
 * (NRF) edition, 1946 reprint, as transcribed and validated on Wikisource:
 * https://fr.wikisource.org/wiki/Livre:Proust_-_Du_c%C3%B4t%C3%A9_de_chez_Swann.djvu
 * (pages 7 to 9 of the scan). Proust died in 1922: public domain.
 * The edition's punctuation is kept, its dashes included.
 */
export function B1() {
  return (
    <>
      <section>
        <h2>Le texte</h2>

        <p>
          Marcel Proust · <em>Du côté de chez Swann</em> · 1913 · « Combray »,
          les trois premiers paragraphes, sans coupure
        </p>

        <p>
          C’est le début d’un roman en sept volumes, et c’est une prose
          difficile, même pour un lecteur français : des phrases très longues,
          coupées par des points-virgules, et des images à chaque ligne. Rien
          ne se passe vraiment. Un homme se souvient des nuits où il se
          réveillait sans savoir quelle heure il était.
        </p>

        <div className="astuce">
          Lisez d’abord sans vous arrêter, pour suivre seulement le fil : il
          s’endort, il se réveille, il écoute, il se rendort. Découpez ensuite
          chaque longue phrase aux points-virgules : chaque morceau est une
          petite phrase simple. La phrase courte en tête de chaque bloc
          ci-dessous dit ce qui s’y passe.
        </div>

        <p>
          Il s’endort en lisant, se réveille, croit être le sujet de son livre,
          puis retrouve le noir et entend les trains.
        </p>

        <div className="example">
          <p>
            Longtemps, je me suis couché de bonne heure. Parfois, à peine ma
            bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le
            temps de me dire : « Je m’endors. » Et, une demi-heure après, la
            pensée qu’il était temps de chercher le sommeil m’éveillait ; je
            voulais poser le volume que je croyais avoir encore dans les mains
            et souffler ma lumière ; je n’avais pas cessé en dormant de faire
            des réflexions sur ce que je venais de lire, mais ces réflexions
            avaient pris un tour un peu particulier ; il me semblait que j’étais
            moi-même ce dont parlait l’ouvrage : une église, un quatuor, la
            rivalité de François I<sup>er</sup> et de Charles-Quint. Cette
            croyance survivait pendant quelques secondes à mon réveil ; elle ne
            choquait pas ma raison, mais pesait comme des écailles sur mes yeux
            et les empêchait de se rendre compte que le bougeoir n’était pas
            allumé. Puis elle commençait à me devenir inintelligible, comme
            après la métempsycose les pensées d’une existence antérieure ; le
            sujet du livre se détachait de moi, j’étais libre de m’y appliquer
            ou non ; aussitôt je recouvrais la vue et j’étais bien étonné de
            trouver autour de moi une obscurité, douce et reposante pour mes
            yeux, mais peut-être plus encore pour mon esprit, à qui elle
            apparaissait comme une chose sans cause, incompréhensible, comme une
            chose vraiment obscure. Je me demandais quelle heure il pouvait
            être ; j’entendais le sifflement des trains qui, plus ou moins
            éloigné, comme le chant d’un oiseau dans une forêt, relevant les
            distances, me décrivait l’étendue de la campagne déserte où le
            voyageur se hâte vers la station prochaine ; et le petit chemin
            qu’il suit va être gravé dans son souvenir par l’excitation qu’il
            doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie
            récente et aux adieux sous la lampe étrangère qui le suivent encore
            dans le silence de la nuit, à la douceur prochaine du retour.
          </p>
        </div>

        <p>
          Il regarde l’heure, presque minuit, et il imagine un malade seul dans
          un hôtel, à la même heure.
        </p>

        <div className="example">
          <p>
            J’appuyais tendrement mes joues contre les belles joues de
            l’oreiller qui, pleines et fraîches, sont comme les joues de notre
            enfance. Je frottais une allumette pour regarder ma montre. Bientôt
            minuit. C’est l’instant où le malade qui a été obligé de partir en
            voyage et a dû coucher dans un hôtel inconnu, réveillé par une
            crise, se réjouit en apercevant sous la porte une raie de jour. Quel
            bonheur ! c’est déjà le matin ! Dans un moment les domestiques
            seront levés, il pourra sonner, on viendra lui porter secours.
            L’espérance d’être soulagé lui donne du courage pour souffrir.
            Justement il a cru entendre des pas ; les pas se rapprochent, puis
            s’éloignent. Et la raie de jour qui était sous sa porte a disparu.
            C’est minuit ; on vient d’éteindre le gaz ; le dernier domestique
            est parti et il faudra rester toute la nuit à souffrir sans remède.
          </p>
        </div>

        <p>
          Il se rendort, et le sommeil le ramène à une peur de quand il était
          tout petit.
        </p>

        <div className="example">
          <p>
            Je me rendormais, et parfois je n’avais plus que de courts réveils
            d’un instant, le temps d’entendre les craquements organiques des
            boiseries, d’ouvrir les yeux pour fixer le kaléidoscope de
            l’obscurité, de goûter grâce à une lueur momentanée de conscience le
            sommeil où étaient plongés les meubles, la chambre, le tout dont je
            n’étais qu’une petite partie et à l’insensibilité duquel je
            retournais vite m’unir. Ou bien en dormant j’avais rejoint sans
            effort un âge à jamais révolu de ma vie primitive, retrouvé telle de
            mes terreurs enfantines comme celle que mon grand-oncle me tirât
            par mes boucles et qu’avait dissipée le jour — date pour moi d’une
            ère nouvelle — où on les avait coupées. J’avais oublié cet événement
            pendant mon sommeil, j’en retrouvais le souvenir aussitôt que
            j’avais réussi à m’éveiller pour échapper aux mains de mon
            grand-oncle, mais par mesure de précaution j’entourais complètement
            ma tête de mon oreiller avant de retourner dans le monde des rêves.
          </p>
        </div>

        <div className="attention">
          <span className="fr">la terreur que mon grand-oncle me tirât</span>{" "}
          est un subjonctif imparfait, un temps qu’on ne trouve plus que dans
          les livres. À l’oral, on dit{" "}
          <span className="fr">la peur que mon grand-oncle me tire</span>. Le
          reste du texte est surtout à l’imparfait, sauf l’histoire du malade,
          racontée au présent.
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>Les mots qui bloquent la lecture, définis en français</caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">de bonne heure</th>
                <td>tôt</td>
                <td className="fr">Je me suis couché de bonne heure.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">à peine</th>
                <td>juste après, tout de suite après</td>
                <td className="fr">À peine ma bougie éteinte, je dormais.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un volume, un ouvrage</th>
                <td>un livre</td>
                <td className="fr">Je voulais poser le volume.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un bougeoir</th>
                <td>l’objet qui tient la bougie</td>
                <td className="fr">Le bougeoir n’était pas allumé.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">la métempsycose</th>
                <td>l’idée qu’après la mort, l’âme revit dans un autre corps</td>
                <td className="fr">Il croit à la métempsycose.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">recouvrer la vue</th>
                <td>voir de nouveau, après ne plus avoir vu</td>
                <td className="fr">Aussitôt je recouvrais la vue.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">l’obscurité</th>
                <td>le noir, l’absence de lumière</td>
                <td className="fr">Il y avait autour de moi une obscurité douce.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un sifflement</th>
                <td>le son aigu et long d’un train ou d’un oiseau</td>
                <td className="fr">J’entendais le sifflement des trains.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">se hâter</th>
                <td>se dépêcher, aller vite</td>
                <td className="fr">Le voyageur se hâte vers la gare.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une raie de jour</th>
                <td>une ligne fine de lumière</td>
                <td className="fr">Il voit une raie de jour sous la porte.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">soulager</th>
                <td>rendre une douleur moins forte</td>
                <td className="fr">L’espérance d’être soulagé lui donne du courage.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">les boiseries</th>
                <td>le bois qui couvre les murs d’une pièce</td>
                <td className="fr">La nuit, les boiseries craquent.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">révolu</th>
                <td>terminé, qui ne reviendra pas</td>
                <td className="fr">C’est une époque révolue.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">des boucles</th>
                <td>des cheveux qui forment des ronds</td>
                <td className="fr">L’enfant avait de longues boucles.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">dissiper</th>
                <td>faire disparaître</td>
                <td className="fr">Le jour a dissipé sa peur.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Les questions portent sur la façon dont le texte est écrit : un verbe
          qui avoue une erreur, une comparaison, un mot à deux sens, une image.
          La réponse est toujours dans le texte.
        </p>

        <Quiz />
      </section>
    </>
  );
}
