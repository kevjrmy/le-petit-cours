import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-recette-des-croissants";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La recette</h2>

        <p>
          Voici la recette du croissant au beurre, celle des boulangeries de
          Paris.
        </p>

        <p>Pour douze croissants.</p>

        <div className="example">
          <ul>
            <li>500 g de farine</li>
            <li>250 ml de lait froid</li>
            <li>250 g de beurre froid</li>
            <li>60 g de sucre</li>
            <li>10 g de sel</li>
            <li>20 g de levure fraîche de boulanger</li>
            <li>un œuf, pour dorer</li>
          </ul>
        </div>

        <div className="example">
          <ol>
            <li>
              Mélanger la farine, le sucre, le sel, la levure et le lait dans un
              saladier.
            </li>
            <li>Pétrir la pâte cinq minutes. Elle doit rester souple.</li>
            <li>
              Couvrir le saladier et laisser reposer la pâte deux heures au
              réfrigérateur.
            </li>
            <li>
              Étaler la pâte au rouleau. Poser le beurre froid au centre et
              refermer la pâte dessus.
            </li>
            <li>
              Étaler de nouveau, puis plier la pâte en trois. Remettre au froid
              trente minutes.
            </li>
            <li>
              Recommencer deux fois : étaler, plier en trois, laisser reposer au
              froid.
            </li>
            <li>
              Étaler la pâte en un grand rectangle et couper des triangles au
              couteau.
            </li>
            <li>
              Rouler chaque triangle, de la base vers la pointe, et poser les
              croissants sur une plaque.
            </li>
            <li>
              Laisser pousser deux heures à température ambiante. Les croissants
              doublent de volume.
            </li>
            <li>Dorer au pinceau avec l’œuf battu.</li>
            <li>Cuire vingt minutes dans un four à 190 °C.</li>
          </ol>
        </div>

        <div className="attention">
          Une recette française s’écrit à l’infinitif :{" "}
          <span className="fr">mélanger</span>,{" "}
          <span className="fr">étaler</span>, <span className="fr">cuire</span>.
          Ce n’est pas un ordre donné à quelqu’un, c’est la liste des gestes.
          Certains livres emploient l’impératif,{" "}
          <span className="fr">mélangez</span>,{" "}
          <span className="fr">étalez</span>, et cela veut dire exactement la
          même chose.
        </div>
      </section>

      <section>
        <h2>Les mots de la recette</h2>

        <div className="table-wrap">
          <table>
            <caption>
              Les ingrédients, avec l’article qu’il faut apprendre avec eux
            </caption>
            <thead>
              <tr>
                <th scope="col">L’ingrédient</th>
                <th scope="col">Ce que c’est</th>
                <th scope="col">Dans la recette</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  la farine
                </th>
                <td>la poudre blanche qu’on tire du blé</td>
                <td className="fr">500 g de farine</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la levure
                </th>
                <td>ce qui fait gonfler la pâte et la rend légère</td>
                <td className="fr">20 g de levure fraîche</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le beurre
                </th>
                <td>la matière grasse jaune qu’on fait avec le lait</td>
                <td className="fr">250 g de beurre froid</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le lait
                </th>
                <td>la boisson blanche que donne la vache</td>
                <td className="fr">250 ml de lait froid</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le sucre
                </th>
                <td>ce qu’on met dans le café pour qu’il soit doux</td>
                <td className="fr">60 g de sucre</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le sel
                </th>
                <td>la poudre blanche qui vient de la mer et relève le goût</td>
                <td className="fr">10 g de sel</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la pâte
                </th>
                <td>
                  le mélange de farine et de liquide, avant la cuisson
                </td>
                <td className="fr">Pétrir la pâte cinq minutes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un œuf
                </th>
                <td>ce que pond la poule ; celui-ci sert à dorer</td>
                <td className="fr">un œuf, pour dorer</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les objets que la recette demande</caption>
            <thead>
              <tr>
                <th scope="col">L’ustensile</th>
                <th scope="col">À quoi il sert</th>
                <th scope="col">Dans la recette</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  un saladier
                </th>
                <td>un grand bol, pour mélanger</td>
                <td className="fr">Mélanger dans un saladier.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un rouleau à pâtisserie
                </th>
                <td>un cylindre de bois, pour aplatir la pâte</td>
                <td className="fr">Étaler la pâte au rouleau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un couteau
                </th>
                <td>l’outil qui coupe</td>
                <td className="fr">Couper des triangles au couteau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une plaque
                </th>
                <td>la tôle plate qu’on glisse dans le four</td>
                <td className="fr">Poser les croissants sur une plaque.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un pinceau
                </th>
                <td>une petite brosse ; ici, pour passer l’œuf</td>
                <td className="fr">Dorer au pinceau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un four
                </th>
                <td>l’appareil chaud où l’on fait cuire</td>
                <td className="fr">Cuire dans un four à 190 °C.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un réfrigérateur
                </th>
                <td>l’appareil froid où l’on garde les aliments</td>
                <td className="fr">Laisser reposer au réfrigérateur.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les gestes, dans l’ordre où la recette les demande
            </caption>
            <thead>
              <tr>
                <th scope="col">Le verbe</th>
                <th scope="col">Ce qu’on fait</th>
                <th scope="col">Dans la recette</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  mélanger
                </th>
                <td>mettre plusieurs choses ensemble</td>
                <td className="fr">Mélanger la farine et le lait.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  pétrir
                </th>
                <td>travailler la pâte avec les mains</td>
                <td className="fr">Pétrir la pâte cinq minutes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  laisser reposer
                </th>
                <td>ne plus y toucher pendant un moment</td>
                <td className="fr">Laisser reposer deux heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  étaler
                </th>
                <td>aplatir la pâte pour qu’elle devienne large et fine</td>
                <td className="fr">Étaler la pâte au rouleau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  plier
                </th>
                <td>rabattre une partie sur l’autre</td>
                <td className="fr">Plier la pâte en trois.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  couper
                </th>
                <td>séparer avec un couteau</td>
                <td className="fr">Couper des triangles.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  rouler
                </th>
                <td>enrouler sur soi-même, du large vers la pointe</td>
                <td className="fr">Rouler chaque triangle.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  laisser pousser
                </th>
                <td>attendre que la pâte gonfle toute seule</td>
                <td className="fr">Laisser pousser deux heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  dorer
                </th>
                <td>passer de l’œuf dessus, pour la couleur</td>
                <td className="fr">Dorer au pinceau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  cuire
                </th>
                <td>laisser dans le four jusqu’à ce que ce soit prêt</td>
                <td className="fr">Cuire vingt minutes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Dire les quantités</h2>

        <div className="rule">
          Devant un ingrédient qu’on ne compte pas, on emploie{" "}
          <span className="fr">du</span>, <span className="fr">de la</span> ou{" "}
          <span className="fr">de l’</span> :{" "}
          <span className="fr">du beurre</span>,{" "}
          <span className="fr">de la farine</span>,{" "}
          <span className="fr">de l’eau</span>. La règle entière, au-delà de la
          cuisine, est dans{" "}
          <Link href="/grammaire/les-articles-partitifs">
            Les articles partitifs
          </Link>
          .
        </div>

        <div className="attention">
          On ne dit jamais <span className="fr">un beurre</span> ni{" "}
          <span className="fr">une farine</span>. Ces choses-là ne se comptent
          pas : on en prend une quantité, on n’en prend pas un.
        </div>

        <div className="exception">
          ce qui se compte garde <span className="fr">un</span> et{" "}
          <span className="fr">une</span> :{" "}
          <span className="fr">un œuf</span>,{" "}
          <span className="fr">deux œufs</span>,{" "}
          <span className="fr">un croissant</span>,{" "}
          <span className="fr">un saladier</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Après une quantité, l’ingrédient arrive toujours avec « de »
            </caption>
            <thead>
              <tr>
                <th scope="col">La quantité</th>
                <th scope="col">La phrase entière</th>
                <th scope="col">Ce qu’elle mesure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  500 g
                </th>
                <td className="fr">500 g de farine</td>
                <td>le poids</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  250 ml
                </th>
                <td className="fr">250 ml de lait</td>
                <td>le volume d’un liquide</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une cuillère à soupe
                </th>
                <td className="fr">une cuillère à soupe de sucre</td>
                <td>une petite quantité, sans balance</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une pincée
                </th>
                <td className="fr">une pincée de sel</td>
                <td>ce qui tient entre deux doigts</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un peu
                </th>
                <td className="fr">un peu de lait</td>
                <td>une quantité qu’on ne précise pas</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  beaucoup
                </th>
                <td className="fr">beaucoup de beurre</td>
                <td>une grande quantité</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dès qu’une quantité est dite, <span className="fr">du</span> et{" "}
            <span className="fr">de la</span> disparaissent.
          </p>
          <p>
            On prend <span className="fr">du beurre</span>, mais{" "}
            <span className="fr">250 g de beurre</span>. On boit{" "}
            <span className="fr">du lait</span>, mais{" "}
            <span className="fr">un verre de lait</span>. La quantité occupe la
            place, et il ne reste que <span className="fr">de</span>.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Une recette s’écrit à l’infinitif :{" "}
            <span className="fr">mélanger</span>,{" "}
            <span className="fr">étaler</span>,{" "}
            <span className="fr">cuire</span>.
          </li>
          <li>
            Un ingrédient s’apprend avec son article :{" "}
            <span className="fr">la farine</span>,{" "}
            <span className="fr">le beurre</span>,{" "}
            <span className="fr">la levure</span>.
          </li>
          <li>
            Devant ce qui ne se compte pas :{" "}
            <span className="fr">du beurre</span>,{" "}
            <span className="fr">de la farine</span>. Jamais{" "}
            <span className="fr">un beurre</span>.
          </li>
          <li>
            Après une quantité, toujours <span className="fr">de</span> :{" "}
            <span className="fr">500 g de farine</span>,{" "}
            <span className="fr">une pincée de sel</span>.
          </li>
          <li>
            Les gestes de la pâte : <span className="fr">pétrir</span>,{" "}
            <span className="fr">étaler</span>,{" "}
            <span className="fr">plier</span>,{" "}
            <span className="fr">rouler</span>,{" "}
            <span className="fr">dorer</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
