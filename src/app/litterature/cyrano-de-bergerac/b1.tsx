import { Quiz } from "./quiz";

/* The work's B1 page: the whole of acte I, scène première, where the A2 page
   quotes it with cuts. The text is Fasquelle's 1926 edition, « texte validé »
   on Wikisource (Livre:Rostand - Cyrano de Bergerac.djvu, pages 4 to 8), from
   the first stage direction to the one that closes the scene. A verse shared
   between two voices is split into their speeches, and a verse running on
   inside one speech keeps its line break; the words, the stage directions and
   the punctuation are the edition's. */
export function B1() {
  return (
    <>
      <section>
        <h2>Le texte</h2>

        <p>
          Edmond Rostand · <em>Cyrano de Bergerac</em> · 1897 · acte I, scène
          première, en entier · texte de l’édition Fasquelle de 1926
        </p>

        <p>
          Paris, 1640. La salle de l’hôtel de Bourgogne, un théâtre. On doit y
          jouer <em>La Clorise</em>, une pièce de Balthazar Baro, mais elle n’a
          pas commencé et le public arrive. Cyrano n’est pas encore là : la
          première scène appartient à la foule. Chaque groupe a son affaire, et
          les répliques des uns coupent celles des autres.
        </p>

        <p>
          Parmi ces désordres, un garde prend une bouquetière par la taille et
          lui réclame un baiser ; elle se dégage et le repousse. Rostand mêle
          ses répliques à celles des joueurs et du bourgeois, comme un désordre
          de plus dans une scène de foule écrite pour faire rire.
        </p>

        <div className="example">
          <p>
            <em>
              (On entend derrière la porte un tumulte de voix, puis un cavalier
              entre brusquement.)
            </em>
          </p>
          <p>
            <strong>Le portier</strong>, <em>le poursuivant</em> — Holà ! vos
            quinze sols !
          </p>
          <p>
            <strong>Le cavalier</strong> — J’entre gratis !
          </p>
          <p>
            <strong>Le portier</strong> — Pourquoi ?
          </p>
          <p>
            <strong>Le cavalier</strong> — Je suis chevau-léger de la maison du
            Roi !
          </p>
          <p>
            <strong>Le portier</strong>, <em>à un autre cavalier qui vient
            d’entrer</em> — Vous ?
          </p>
          <p>
            <strong>Deuxième cavalier</strong> — Je ne paye pas !
          </p>
          <p>
            <strong>Le portier</strong> — Mais…
          </p>
          <p>
            <strong>Deuxième cavalier</strong> — Je suis mousquetaire.
          </p>
          <p>
            <strong>Premier cavalier</strong>, <em>au deuxième</em> — On ne
            commence qu’à deux heures. Le parterre
            <br />
            Est vide. Exerçons-nous au fleuret.
          </p>
          <p>
            <em>(Ils font des armes avec des fleurets qu’ils ont apportés.)</em>
          </p>
          <p>
            <strong>Un laquais</strong>, <em>entrant</em> — Pst… Flanquin…
          </p>
          <p>
            <strong>Un autre</strong>, <em>déjà arrivé</em> — Champagne ?…
          </p>
          <p>
            <strong>Le premier</strong>, <em>lui montrant des jeux qu’il sort de
            son pourpoint</em> — Cartes. Dés. <em>(Il s’assied par terre.)</em>{" "}
            Jouons.
          </p>
          <p>
            <strong>Le deuxième</strong>, <em>même jeu</em> — Oui, mon coquin.
          </p>
          <p>
            <strong>Premier laquais</strong>, <em>tirant de sa poche un bout de
            chandelle qu’il allume et colle par terre</em> — J’ai soustrait à
            mon maître un peu de luminaire.
          </p>
          <p>
            <strong>Un garde</strong>, <em>à une bouquetière qui s’avance</em> —
            C’est gentil de venir avant que l’on n’éclaire !…{" "}
            <em>(Il lui prend la taille.)</em>
          </p>
          <p>
            <strong>Un des bretteurs</strong>, <em>recevant un coup de
            fleuret</em> — Touche !
          </p>
          <p>
            <strong>Un des joueurs</strong> — Trèfle !
          </p>
          <p>
            <strong>Le garde</strong>, <em>poursuivant la fille</em> — Un
            baiser !
          </p>
          <p>
            <strong>La bouquetière</strong>, <em>se dégageant</em> — On voit !…
          </p>
          <p>
            <strong>Le garde</strong>, <em>l’entraînant dans les coins
            sombres</em> — Pas de danger !
          </p>
          <p>
            <strong>Un homme</strong>, <em>s’asseyant par terre avec d’autres
            porteurs de provisions de bouche</em> — Lorsqu’on vient en avance,
            on est bien pour manger.
          </p>
          <p>
            <strong>Un bourgeois</strong>, <em>conduisant son fils</em> —
            Plaçons-nous là, mon fils.
          </p>
          <p>
            <strong>Un joueur</strong> — Brelan d’as !
          </p>
          <p>
            <strong>Un homme</strong>, <em>tirant une bouteille de sous son
            manteau et s’asseyant aussi</em> — Un ivrogne
            <br />
            Doit boire son bourgogne… <em>(Il boit.)</em> à l’hôtel de
            Bourgogne !
          </p>
          <p>
            <strong>Le bourgeois</strong>, <em>à son fils</em> — Ne se
            croirait-on pas en quelque mauvais lieu ?{" "}
            <em>(Il montre l’ivrogne du bout de sa canne.)</em> Buveurs…{" "}
            <em>(En rompant, un des cavaliers le bouscule.)</em> Bretteurs !{" "}
            <em>(Il tombe au milieu des joueurs.)</em> Joueurs !
          </p>
          <p>
            <strong>Le garde</strong>, <em>derrière lui, lutinant toujours la
            femme</em> — Un baiser !
          </p>
          <p>
            <strong>Le bourgeois</strong>, <em>éloignant vivement son fils</em>{" "}
            — Jour de Dieu !
            <br />
            — Et penser que c’est dans une salle pareille
            <br />
            Qu’on joua du Rotrou, mon fils !
          </p>
          <p>
            <strong>Le jeune homme</strong> — Et du Corneille !
          </p>
          <p>
            <strong>Une bande de pages</strong>, <em>se tenant par la main,
            entre en farandole et chante</em> — Tra la la la la la la la la la la
            lère…
          </p>
          <p>
            <strong>Le portier</strong>, <em>sévèrement aux pages</em> — Les
            pages, pas de farce !…
          </p>
          <p>
            <strong>Premier page</strong>, <em>avec une dignité blessée</em> —
            Oh ! Monsieur ! ce soupçon !…{" "}
            <em>
              (Vivement, au deuxième, dès que le portier a tourné le dos.)
            </em>{" "}
            As-tu de la ficelle ?
          </p>
          <p>
            <strong>Le deuxième</strong> — Avec un hameçon.
          </p>
          <p>
            <strong>Premier page</strong> — On pourra de là-haut pêcher quelque
            perruque.
          </p>
          <p>
            <strong>Un tire-laine</strong>, <em>groupant autour de lui plusieurs
            hommes de mauvaise mine</em> — Or ça, jeunes escrocs, venez qu’on
            vous éduque :
            <br />
            Puis donc que vous volez pour la première fois…
          </p>
          <p>
            <strong>Deuxième page</strong>, <em>criant à d’autres pages déjà
            placés aux galeries supérieures</em> — Hep ! Avez-vous des
            sarbacanes ?
          </p>
          <p>
            <strong>Troisième page</strong>, <em>d’en haut</em> — Et des pois !{" "}
            <em>(Il souffle et les crible de pois.)</em>
          </p>
          <p>
            <strong>Le jeune homme</strong>, <em>à son père</em> — Que va-t-on
            nous jouer ?
          </p>
          <p>
            <strong>Le bourgeois</strong> — <em>Clorise</em>.
          </p>
          <p>
            <strong>Le jeune homme</strong> — De qui est-ce ?
          </p>
          <p>
            <strong>Le bourgeois</strong> — De monsieur Balthazar Baro. C’est
            une pièce !… <em>(Il remonte au bras de son fils.)</em>
          </p>
          <p>
            <strong>Le tire-laine</strong>, <em>à ses acolytes</em> — … La
            dentelle surtout des canons, coupez-la !
          </p>
          <p>
            <strong>Un spectateur</strong>, <em>à un autre, lui montrant une
            encoignure élevée</em> — Tenez, à la première du <em>Cid</em>,
            j’étais là !
          </p>
          <p>
            <strong>Le tire-laine</strong>, <em>faisant avec ses doigts le geste
            de subtiliser</em> — Les montres…
          </p>
          <p>
            <strong>Le bourgeois</strong>, <em>redescendant, à son fils</em> —
            Vous verrez des acteurs très illustres…
          </p>
          <p>
            <strong>Le tire-laine</strong>, <em>faisant le geste de tirer par
            petites secousses furtives</em> — Les mouchoirs…
          </p>
          <p>
            <strong>Le bourgeois</strong> — Montfleury…
          </p>
          <p>
            <strong>Quelqu’un</strong>, <em>criant de la galerie supérieure</em>{" "}
            — Allumez donc les lustres !
          </p>
          <p>
            <strong>Le bourgeois</strong> — … Bellerose, l’Epy, la Beaupré,
            Jodelet !
          </p>
          <p>
            <strong>Un page</strong>, <em>au parterre</em> — Ah ! voici la
            distributrice !…
          </p>
          <p>
            <strong>La distributrice</strong>, <em>paraissant derrière le
            buffet</em> — Oranges, lait,
            <br />
            Eau de framboise, aigre de cèdre… <em>(Brouhaha à la porte.)</em>
          </p>
          <p>
            <strong>Une voix de fausset</strong> — Place, brutes !
          </p>
          <p>
            <strong>Un laquais</strong>, <em>s’étonnant</em> — Les marquis !… au
            parterre ?…
          </p>
          <p>
            <strong>Un autre laquais</strong> — Oh ! pour quelques minutes.
          </p>
          <p>
            <em>(Entre une bande de petits marquis.)</em>
          </p>
          <p>
            <strong>Un marquis</strong>, <em>voyant la salle à moitié vide</em>{" "}
            — Hé quoi ! Nous arrivons ainsi que les drapiers,
            <br />
            Sans déranger les gens ? sans marcher sur les pieds ?
            <br />
            Ah ! fi ! fi ! fi !{" "}
            <em>
              (Il se trouve devant d’autres gentilshommes entrés peu avant.)
            </em>{" "}
            Cuigy ! Brissaille ! <em>(Grandes embrassades.)</em>
          </p>
          <p>
            <strong>Cuigy</strong> — Des fidèles !…
            <br />
            Mais oui, nous arrivons devant que les chandelles…
          </p>
          <p>
            <strong>Le marquis</strong> — Ah ! ne m’en parlez pas ! Je suis dans
            une humeur…
          </p>
          <p>
            <strong>Un autre</strong> — Console-toi, marquis, car voici
            l’allumeur !
          </p>
          <p>
            <strong>La salle</strong>, <em>saluant l’entrée de l’allumeur</em> —
            Ah !…
          </p>
          <p>
            <em>
              (On se groupe autour des lustres qu’il allume. Quelques personnes
              ont pris place aux galeries. Lignière entre au parterre, donnant
              le bras à Christian de Neuvillette. Lignière, un peu débraillé,
              figure d’ivrogne distingué. Christian, vêtu élégamment, mais d’une
              façon un peu démodée, paraît préoccupé et regarde les loges.)
            </em>
          </p>
        </div>

        <div className="attention">
          La pièce est écrite en vers de douze syllabes, et un vers se partage
          souvent entre plusieurs voix : « Vous ? », « Je ne paye pas ! »,
          « Mais… », « Je suis mousquetaire. » forment une seule ligne. Deux
          formes datent de l’époque : « on joua » est un passé simple, qu’on
          dirait aujourd’hui « on a joué », et « puis donc que » s’écrit
          aujourd’hui « puisque ».
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
                <th scope="row" className="fr">un portier</th>
                <td>la personne qui garde l’entrée et fait payer</td>
                <td className="fr">Le portier crie : vos quinze sols !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">le parterre</th>
                <td>le bas de la salle, où le public reste debout</td>
                <td className="fr">Avant la pièce, le parterre est encore vide.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un fleuret</th>
                <td>une épée fine, pour s’exercer</td>
                <td className="fr">Exerçons-nous au fleuret.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un bretteur</th>
                <td>un homme qui aime se battre à l’épée</td>
                <td className="fr">Un des bretteurs reçoit un coup.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un laquais</th>
                <td>
                  un domestique. Ici, deux d’entre eux s’appellent Flanquin et
                  Champagne
                </td>
                <td className="fr">Les deux laquais jouent aux cartes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">soustraire</th>
                <td>ici : prendre sans demander</td>
                <td className="fr">
                  J’ai soustrait à mon maître un peu de luminaire.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">une bouquetière</th>
                <td>une jeune femme qui vend des fleurs</td>
                <td className="fr">Une bouquetière s’avance dans la salle.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un mauvais lieu</th>
                <td>un endroit mal fréquenté, où une famille honnête ne va pas</td>
                <td className="fr">Ne se croirait-on pas en quelque mauvais lieu ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un tire-laine</th>
                <td>un voleur qui prend ce que les gens portent sur eux</td>
                <td className="fr">Le tire-laine montre comment voler une montre.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un hameçon</th>
                <td>le petit crochet au bout d’une ligne, pour pêcher</td>
                <td className="fr">As-tu de la ficelle ? Avec un hameçon.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une sarbacane</th>
                <td>un tube dans lequel on souffle pour lancer un petit objet</td>
                <td className="fr">Il souffle dans sa sarbacane et lance des pois.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">les canons</th>
                <td>
                  ici : les ornements de dentelle que les hommes portaient sous
                  le genou
                </td>
                <td className="fr">Coupez la dentelle des canons !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un drapier</th>
                <td>un marchand de tissu, donc un bourgeois et non un noble</td>
                <td className="fr">Nous arrivons ainsi que les drapiers.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un lustre</th>
                <td>
                  un grand support de chandelles, suspendu au plafond, qui
                  éclaire la salle
                </td>
                <td className="fr">Allumez donc les lustres !</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Répondez sans relire, puis retournez au texte pour celles qui vous
          manquent. Plusieurs questions portent sur deux répliques éloignées
          l’une de l’autre : cherchez qui parle, et à qui.
        </p>

        <Quiz />
      </section>
    </>
  );
}
