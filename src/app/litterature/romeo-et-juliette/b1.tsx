import { Quiz } from "./quiz";

/*
 * Quoted from Shakespeare, « Œuvres complètes »,
 * traduction François-Victor Hugo, Pagnerre, 1868, tome VII, « Roméo et Juliette », pp. 239 and 243-246
 * (djvu pages 243 and 247-250), as transcribed and validated on fr.wikisource:
 * https://fr.wikisource.org/wiki/Roméo_et_Juliette_(trad._Hugo)
 *
 * The whole prologue, then act I, scene 1 from the entrance of Abraham to the
 * end of the Prince's sentence, uncut. The scene's opening exchange between
 * Samson and Grégoire is not quoted: the passage starts at an entrance. The
 * edition's punctuation is kept, including the dashes that mark the verse
 * lines of the original, and the print's spellings « siége » and « rengaîne »
 * (which Wikisource's transcription modernises; the scan wins).
 */
export function B1() {
  return (
    <>
      <section>
        <h2>Le texte</h2>

        <p>
          William Shakespeare · <em>Roméo et Juliette</em> · vers 1595 ·
          traduit de l’anglais par François-Victor Hugo (1828-1873), 1868 ·
          prologue et acte I, scène première
        </p>

        <div className="attention">
          La pièce est anglaise ; le français que vous lisez est celui de
          François-Victor Hugo, le fils de Victor Hugo, qui a traduit tout
          Shakespeare. Une traduction est le travail de quelqu’un : elle se cite
          avec son traducteur et sa date.
        </div>

        <p>
          Dans la scène, le traducteur écrit en prose, mais à partir de la
          première réplique de Tybalt, cette édition marque d’un tiret le début
          de chaque vers de l’original. Le texte suit aussi
          l’orthographe de 1868 : <span className="fr">siége</span> s’écrit
          aujourd’hui <span className="fr">siège</span>.
        </p>

        <p>
          Avant la première scène, le Chœur, un acteur seul, s’adresse au
          public.
        </p>

        <div className="example">
          <p>Deux familles, égales en noblesse,</p>
          <p>Dans la belle Vérone, où nous plaçons notre scène,</p>
          <p>
            Sont entraînées par d’anciennes rancunes à des rixes nouvelles
          </p>
          <p>Où le sang des citoyens souille les mains des citoyens.</p>
          <p>Des entrailles prédestinées de ces deux ennemies</p>
          <p>
            A pris naissance, sous des étoiles contraires, un couple d’amoureux
          </p>
          <p>Dont la ruine néfaste et lamentable</p>
          <p>
            Doit ensevelir dans leur tombe l’animosité de leurs parents.
          </p>
          <p>Les terribles péripéties de leur fatal amour</p>
          <p>Et les effets de la rage obstinée de ces familles</p>
          <p>Que peut seule apaiser la mort de leurs enfants,</p>
          <p>Vont en deux heures être exposés sur notre scène.</p>
          <p>Si vous daignez nous écouter patiemment,</p>
          <p>Notre zèle s’efforcera de corriger notre insuffisance.</p>
        </div>

        <p>
          Une place publique, à Vérone. Samson et Grégoire servent les
          Capulets ; ils se promènent armés et parlent de se battre. Deux
          serviteurs des Montagues arrivent.
        </p>

        <div className="example">
          <p>
            <em>Entrent Abraham et Balthazar.</em>
          </p>
          <p>
            <strong>Samson</strong>. Voici mon épée nue ; cherche-leur
            querelle ; je serai derrière toi.
          </p>
          <p>
            <strong>Grégoire</strong>. Oui, tu te tiendras derrière pour mieux
            déguerpir.
          </p>
          <p>
            <strong>Samson</strong>. Ne crains rien de moi.
          </p>
          <p>
            <strong>Grégoire</strong>. De toi ? Non, morbleu.
          </p>
          <p>
            <strong>Samson</strong>. Mettons la loi de notre côté et
            laissons-les commencer.
          </p>
          <p>
            <strong>Grégoire</strong>. Je vais froncer le sourcil en passant
            près d’eux, et qu’ils le prennent comme ils le voudront.
          </p>
          <p>
            <strong>Samson</strong>. C’est-à-dire comme ils l’oseront. Je vais
            mordre mon pouce en les regardant, et ce sera une disgrâce pour eux,
            s’ils le supportent.
          </p>
          <p>
            <strong>Abraham</strong>, <em>à Samson</em>. Est-ce à notre
            intention que vous mordez votre pouce, monsieur ?
          </p>
          <p>
            <strong>Samson</strong>. Je mords mon pouce, monsieur.
          </p>
          <p>
            <strong>Abraham</strong>. Est-ce à notre intention que vous mordez
            votre pouce, monsieur ?
          </p>
          <p>
            <strong>Samson</strong>, <em>bas, à Grégoire</em>. La loi est-elle
            de notre côté, si je dis oui ?
          </p>
          <p>
            <strong>Grégoire</strong>, <em>bas, à Samson</em>. Non.
          </p>
          <p>
            <strong>Samson</strong>, <em>haut, à Abraham</em>. Non, monsieur,
            ce n’est pas à votre intention que je mords mon pouce, monsieur ;
            mais je mords mon pouce, monsieur.
          </p>
          <p>
            <strong>Grégoire</strong>, <em>à Abraham</em>. Cherchez-vous une
            querelle, monsieur ?
          </p>
          <p>
            <strong>Abraham</strong>. Une querelle, monsieur ? Non, monsieur !
          </p>
          <p>
            <strong>Samson</strong>. Si vous en cherchez une, monsieur, je suis
            votre homme. Je sers un maître aussi bon que le vôtre.
          </p>
          <p>
            <strong>Abraham</strong>. Mais pas meilleur.
          </p>
          <p>
            <strong>Samson</strong>. Soit, monsieur.
          </p>
          <p>
            <em>
              Entre au fond du théâtre Benvolio, puis, à distance, derrière lui,
              Tybalt.
            </em>
          </p>
          <p>
            <strong>Grégoire</strong>, <em>à Samson</em>. Dis meilleur ! Voici
            un parent de notre maître.
          </p>
          <p>
            <strong>Samson</strong>, <em>à Abraham</em>. Si fait, monsieur,
            meilleur !
          </p>
          <p>
            <strong>Abraham</strong>. Vous en avez menti.
          </p>
          <p>
            <strong>Samson</strong>. Dégainez, si vous êtes hommes !{" "}
            <em>Tous se mettent en garde.</em> Grégoire, souviens-toi de ta
            maîtresse botte !
          </p>
          <p>
            <strong>Benvolio</strong>, <em>s’avançant, la rapière au poing</em>.
            Séparez-vous, imbéciles ! rengainez vos épées ; vous ne savez pas ce
            que vous faites.
          </p>
          <p>
            <em>Il rabat les armes des valets.</em>
          </p>
          <p>
            <strong>Tybalt</strong>,{" "}
            <em>s’élançant, l’épée nue, derrière Benvolio</em>. — Quoi !
            l’épée à la main, parmi ces marauds sans cœur ! — Tourne-toi,
            Benvolio, et fais face à ta mort.
          </p>
          <p>
            <strong>Benvolio</strong>, <em>à Tybalt</em>. — Je ne veux ici que
            maintenir la paix ; rengaîne ton épée, — ou emploie-la, comme moi,
            à séparer ces hommes.
          </p>
          <p>
            <strong>Tybalt</strong>. — Quoi, l’épée à la main, tu parles de
            paix ! Ce mot, je le hais, — comme je hais l’enfer, tous les
            Montagues et toi. — À toi, lâche !
          </p>
          <p>
            <em>
              Tous se battent. D’autres partisans des deux maisons arrivent et
              se joignent à la mêlée. Alors arrivent des citoyens armés de
              bâtons.
            </em>
          </p>
          <p>
            <strong>Premier citoyen</strong>. — À l’œuvre les bâtons, les
            piques, les pertuisanes ! Frappez ! Écrasez-les ! — À bas les
            Montagues ! à bas les Capulets !
          </p>
          <p>
            <em>Entrent Capulet, en robe de chambre, et lady Capulet.</em>
          </p>
          <p>
            <strong>Capulet</strong>. — Quel est ce bruit ?… Holà ! qu’on me
            donne ma grande épée.
          </p>
          <p>
            <strong>Lady Capulet</strong>. — Non ! une béquille ! une béquille
            !… Pourquoi demander une épée ?
          </p>
          <p>
            <strong>Capulet</strong>. — Mon épée, dis-je ! le vieux Montague
            arrive — et brandit sa rapière en me narguant !
          </p>
          <p>
            <em>Entrent Montague, l’épée à la main, et lady Montague.</em>
          </p>
          <p>
            <strong>Montague</strong>. — À toi, misérable Capulet !… Ne me
            retenez pas ! lâchez-moi.
          </p>
          <p>
            <strong>Lady Montague</strong>, <em>le retenant</em>. — Tu ne
            feras pas un seul pas vers ton ennemi.
          </p>
          <p>
            <em>Entre le prince, avec sa suite.</em>
          </p>
          <p>
            <strong>Le Prince</strong>. — Sujets rebelles, ennemis de la paix !
            — profanateurs qui souillez cet acier par un fratricide !… — Est-ce
            qu’on ne m’entend pas ?… Holà ! vous tous, hommes ou brutes, — qui
            éteignez la flamme de votre rage pernicieuse — dans les flots de
            pourpre échappés de vos veines, — sous peine de torture, obéissez !
            Que vos mains sanglantes — jettent à terre ces épées trempées dans
            le crime, — et écoutez la sentence de votre prince irrité !
          </p>
          <p>
            <em>Tous les combattants s’arrêtent.</em>
          </p>
          <p>
            — Trois querelles civiles, nées d’une parole en l’air, ont déjà
            troublé le repos de nos rues, — par ta faute, vieux Capulet, et par
            la tienne, Montague ; — trois fois les anciens de Vérone, —
            dépouillant le vêtement grave qui leur sied, — ont dû saisir de
            leurs vieilles mains leurs vieilles pertuisanes, — gangrenées par la
            rouille, pour séparer vos haines gangrenées. — Si jamais vous
            troublez encore nos rues, — votre vie payera le dommage fait à la
            paix. — Pour cette fois, que tous se retirent. — Vous, Capulet,
            venez avec moi ; — et vous, Montague, vous vous rendrez cette
            après-midi, — pour connaître notre décision ultérieure sur cette
            affaire, — au vieux château de Villafranca, siége ordinaire de
            notre justice. — Encore une fois, sous peine de mort, que tous se
            séparent !
          </p>
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
                <th scope="row" className="fr">une rancune</th>
                <td>une colère ancienne que l’on garde longtemps</td>
                <td className="fr">
                  D’anciennes rancunes séparent les deux familles.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">déguerpir</th>
                <td>partir très vite, s’enfuir</td>
                <td className="fr">Tu te tiendras derrière pour mieux déguerpir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une disgrâce</th>
                <td>
                  attention, faux ami : ce n’est pas un malheur, c’est une honte,
                  la perte de l’estime des autres
                </td>
                <td className="fr">
                  Ce sera une disgrâce pour eux, s’ils le supportent.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">mordre son pouce</th>
                <td>
                  un geste d’insulte, au temps de Shakespeare. Aujourd’hui on ne
                  le fait plus
                </td>
                <td className="fr">Je vais mordre mon pouce en les regardant.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">dégainer, rengainer</th>
                <td>sortir son épée ; la remettre dans son fourreau</td>
                <td className="fr">Dégainez, si vous êtes hommes !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un maraud</th>
                <td>un mot ancien et méprisant pour un homme de rien, un vaurien</td>
                <td className="fr">Parmi ces marauds sans cœur !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une béquille</th>
                <td>
                  un bâton sur lequel on s’appuie quand on marche mal, à cause
                  de l’âge ou d’une blessure
                </td>
                <td className="fr">Non ! une béquille ! Pourquoi demander une épée ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">narguer</th>
                <td>provoquer quelqu’un avec un air moqueur</td>
                <td className="fr">Il brandit sa rapière en me narguant.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une sentence</th>
                <td>la décision d’un juge, ici celle du prince</td>
                <td className="fr">Écoutez la sentence de votre prince irrité !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une parole en l’air</th>
                <td>une phrase dite sans réfléchir, qui ne devrait pas compter</td>
                <td className="fr">Trois querelles sont nées d’une parole en l’air.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Les questions suivent le texte dans l’ordre : le Chœur, la
          provocation dans la rue, puis les maîtres et le prince. Plusieurs
          demandent ce qu’une phrase veut dire au-delà de ses mots.
        </p>

        <Quiz />
      </section>
    </>
  );
}
