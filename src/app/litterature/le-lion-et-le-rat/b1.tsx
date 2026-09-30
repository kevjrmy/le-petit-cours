import { Quiz } from "./quiz";

/*
 * Text: La Fontaine, « Fables », Paris, Bernardin-Béchet, 1874, Livre II,
 * fables XI and XII, pp. 84–86 of the scan, « texte validé » on Wikisource:
 * https://fr.wikisource.org/wiki/Fables_de_La_Fontaine_(éd._1874)/Le_Lion_et_le_Rat
 * https://fr.wikisource.org/wiki/Fables_de_La_Fontaine_(éd._1874)/La_Colombe_et_la_Fourmi
 * The edition's spelling is kept, « fourmis » with an s included; its two
 * footnote markers are left out.
 */

export function B1() {
  return (
    <>
      <section>
        <h2>Le texte</h2>

        <p>
          Jean de La Fontaine · <em>Fables</em> · 1668 · Livre II, fables 11 et
          12 · textes complets
        </p>

        <p>
          La première fable commence par une vérité et promet deux histoires
          pour la prouver. La Fontaine tient parole : la fable qui suit est la
          seconde preuve. Les deux se lisent d’un seul trait, comme il les a
          placées dans son livre.
        </p>

        <h3>Le Lion et le Rat</h3>

        <div className="example">
          <p>
            Il faut, autant qu’on peut, obliger tout le monde :<br />
            On a souvent besoin d’un plus petit que soi.
            <br />
            De cette vérité deux fables feront foi ;<br />
            Tant la chose en preuves abonde.
          </p>
          <p>
            Entre les pattes d’un lion
            <br />
            Un rat sortit de terre assez à l’étourdie.
            <br />
            Le roi des animaux, en cette occasion,
            <br />
            Montra ce qu’il était, et lui donna la vie.
            <br />
            Ce bienfait ne fut pas perdu.
            <br />
            Quelqu’un aurait-il jamais cru
            <br />
            Qu’un lion d’un rat eût affaire ?
          </p>
          <p>
            Cependant il advint qu’au sortir des forêts
            <br />
            Ce lion fut pris dans des rets,
            <br />
            Dont ses rugissements ne le purent défaire.
            <br />
            Sire rat accourut, et fit tant par ses dents
            <br />
            Qu’une maille rongée emporta tout l’ouvrage.
          </p>
          <p>
            Patience et longueur de temps
            <br />
            Font plus que force ni que rage.
          </p>
        </div>

        <h3>La Colombe et la Fourmi</h3>

        <div className="example">
          <p>L’autre exemple est tiré d’animaux plus petits.</p>
          <p>
            Le long d’un clair ruisseau buvait une colombe,
            <br />
            Quand sur l’eau se penchant une fourmis y tombe ;<br />
            Et dans cet océan on eût vu la fourmis
            <br />
            S’efforcer, mais en vain, de regagner la rive.
            <br />
            La colombe aussitôt usa de charité :<br />
            Un brin d’herbe dans l’eau par elle étant jeté,
            <br />
            Ce fut un promontoire où la fourmis arrive.
            <br />
            Elle se sauve. Et là-dessus
            <br />
            Passe un certain croquant qui marchait les pieds nus :<br />
            Ce croquant, par hasard, avait une arbalète.
            <br />
            Dès qu’il voit l’oiseau de Vénus,
            <br />
            Il le croit en son pot, et déjà lui fait fête.
            <br />
            Tandis qu’à le tuer mon villageois s’apprête,
            <br />
            La fourmi le pique au talon.
            <br />
            Le vilain retourne la tête :<br />
            La colombe l’entend, part, et tire de long.
            <br />
            Le souper du croquant avec elle s’envole :<br />
            Point de pigeon pour une obole.
          </p>
        </div>

        <div className="attention">
          les deux fables ne sont pas racontées au même temps. La première est au
          passé simple : <span className="fr">sortit</span>,{" "}
          <span className="fr">montra</span>,{" "}
          <span className="fr">accourut</span>. La seconde commence au passé, avec{" "}
          <span className="fr">buvait</span>, puis presque tout passe au
          présent : <span className="fr">tombe</span>,{" "}
          <span className="fr">arrive</span>,{" "}
          <span className="fr">voit</span>,{" "}
          <span className="fr">pique</span>,{" "}
          <span className="fr">s’envole</span>. Ce présent au milieu d’un récit
          passé accélère l’action : on la voit se dérouler sous ses yeux.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Les deux histoires sont construites sur le même modèle.
          </p>
          <p>
            Un grand animal épargne ou sauve un plus petit, puis le petit le
            sauve à son tour. La seconde fable n’a pas de morale à elle : elle
            finit sur une plaisanterie, le repas perdu du croquant. Sa leçon est
            celle que la première annonçait tout en haut.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots du texte</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Les mots anciens ou rares des deux fables, définis en français
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
                  obliger
                </th>
                <td>rendre service, faire du bien à quelqu’un</td>
                <td className="fr">
                  Il faut obliger tout le monde, autant qu’on peut.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  à l’étourdie
                </th>
                <td>sans faire attention, sans réfléchir</td>
                <td className="fr">Le rat sort de terre à l’étourdie.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un bienfait
                </th>
                <td>une bonne action, un service rendu</td>
                <td className="fr">Ce bienfait ne fut pas perdu.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  avoir affaire de
                </th>
                <td>avoir besoin de quelqu’un ou de quelque chose (tour ancien)</td>
                <td className="fr">
                  Personne ne croyait qu’un lion eût affaire d’un rat.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  des rets
                </th>
                <td>des filets pour capturer les animaux (mot ancien)</td>
                <td className="fr">Le lion fut pris dans des rets.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Sire
                </th>
                <td>le titre qu’on donne à un roi quand on lui parle</td>
                <td className="fr">Sire rat accourut.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une maille
                </th>
                <td>une boucle du filet, entre deux nœuds</td>
                <td className="fr">Une seule maille rongée suffit.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’ouvrage
                </th>
                <td>le travail fait, et ici le filet lui-même</td>
                <td className="fr">Une maille rongée emporta tout l’ouvrage.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  on eût vu
                </th>
                <td>on aurait vu (forme ancienne et littéraire)</td>
                <td className="fr">On eût vu la fourmi lutter contre l’eau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un promontoire
                </th>
                <td>une pointe de terre haute qui avance dans la mer</td>
                <td className="fr">Le phare est bâti sur un promontoire.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  user de charité
                </th>
                <td>faire preuve de bonté envers quelqu’un en danger</td>
                <td className="fr">La colombe usa de charité.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un croquant
                </th>
                <td>un paysan pauvre, un homme de rien (mot ancien et méprisant)</td>
                <td className="fr">Un croquant passait, les pieds nus.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un vilain
                </th>
                <td>autrefois, un paysan ; ici, le même croquant</td>
                <td className="fr">Le vilain retourne la tête.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’oiseau de Vénus
                </th>
                <td>la colombe, oiseau de Vénus, la déesse de l’amour</td>
                <td className="fr">Il voit l’oiseau de Vénus au bord de l’eau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  croire quelque chose en son pot
                </th>
                <td>voir déjà cuit dans sa marmite ce qu’on n’a pas encore pris</td>
                <td className="fr">Il voit le pigeon et le croit en son pot.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tirer de long
                </th>
                <td>s’enfuir au loin, sans s’arrêter</td>
                <td className="fr">La colombe part et tire de long.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une obole
                </th>
                <td>une pièce de monnaie de très peu de valeur</td>
                <td className="fr">Il n’a pas donné une obole.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          <span className="fr">fourmis</span>, avec un s, est une liberté de
          poète : devant une voyelle, La Fontaine ajoute un s pour éviter la
          rencontre de deux voyelles, comme dans{" "}
          <span className="fr">une fourmis y tombe</span>. Devant une consonne,
          il écrit <span className="fr">la fourmi le pique au talon</span>. Au
          singulier, on écrit toujours <span className="fr">une fourmi</span>.
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Les questions portent sur chaque fable et sur ce qui les relie.
          Répondez sans relire, puis retournez au texte pour celles qui vous
          manquent.
        </p>

        <Quiz />
      </section>
    </>
  );
}
