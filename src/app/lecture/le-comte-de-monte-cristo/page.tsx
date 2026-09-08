import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/le-comte-de-monte-cristo";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Alexandre Dumas · <em>Le Comte de Monte-Cristo</em> · 1844 · chapitre
          premier, « Marseille. L’arrivée » (extraits)
        </p>

        <p>
          Un bateau rentre à Marseille après un long voyage. Le jeune marin qui
          dirige la manœuvre s’appelle Edmond Dantès. Le propriétaire du bateau,
          monsieur Morrel, est si pressé de savoir qu’il monte dans une barque
          et va au-devant du navire. Les crochets […] marquent les passages
          coupés.
        </p>

        <div className="example">
          <p>
            Le 24 février 1815, la vigie de Notre-Dame de la Garde signala le
            trois-mâts le Pharaon, venant de Smyrne, Trieste et Naples.
          </p>
          <p>[…]</p>
          <p>
            C’était un jeune homme de dix-huit à vingt ans, grand, svelte, avec
            de beaux yeux noirs et des cheveux d’ébène ; il y avait dans toute
            sa personne cet air calme et de résolution particulier aux hommes
            habitués depuis leur enfance à lutter avec le danger.
          </p>
        </div>

        <p>Morrel arrive à côté du bateau et appelle le jeune marin.</p>

        <div className="example">
          <p>
            — Ah ! c’est vous, Dantès ! cria l’homme à la barque ; qu’est-il
            donc arrivé, et pourquoi cet air de tristesse répandu sur tout votre
            bord ?
          </p>
          <p>
            — Un grand malheur, monsieur Morrel ! répondit le jeune homme, un
            grand malheur, pour moi surtout : à la hauteur de Civita-Vecchia,
            nous avons perdu ce brave capitaine Leclère.
          </p>
          <p>— Et le chargement ? demanda vivement l’armateur.</p>
          <p>
            — Il est arrivé à bon port, monsieur Morrel, et je crois que vous
            serez content sous ce rapport ; mais ce pauvre capitaine Leclère…
          </p>
          <p>
            — Que lui est-il donc arrivé ? demanda l’armateur d’un air
            visiblement soulagé ; que lui est-il donc arrivé, à ce brave
            capitaine ?
          </p>
          <p>— Il est mort.</p>
          <p>— Tombé à la mer ?</p>
          <p>
            — Non, monsieur ; mort d’une fièvre cérébrale, au milieu d’horribles
            souffrances.
          </p>
        </div>

        <p>
          Morrel monte à bord. Danglars, le comptable du bateau, vient à sa
          rencontre, et les deux hommes parlent de Dantès pendant que celui-ci
          cherche la place du navire dans le port.
        </p>

        <div className="example">
          <p>
            — Mais, dit l’armateur, […] il me semble qu’il n’y a pas besoin
            d’être si vieux marin que vous le dites, Danglars, pour connaître
            son métier, et voici notre ami Edmond qui fait le sien, ce me
            semble, en homme qui n’a besoin de demander des conseils à personne.
          </p>
          <p>
            — Oui, dit Danglars en jetant sur Dantès un regard oblique où brilla
            un éclair de haine, oui, c’est jeune, et cela ne doute de rien.
          </p>
        </div>

        <div className="attention">
          Dantès raconte au passé composé, et les deux auxiliaires sont là, à
          trois lignes l’un de l’autre :{" "}
          <span className="fr">nous avons perdu ce brave capitaine</span> avec{" "}
          <span className="fr">avoir</span>, puis{" "}
          <span className="fr">il est arrivé</span> et{" "}
          <span className="fr">il est mort</span> avec{" "}
          <span className="fr">être</span>. Arriver et mourir se conjuguent avec{" "}
          <span className="fr">être</span> : on ne dit pas{" "}
          <span className="fr">il a mort</span>.
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
                  une vigie
                </th>
                <td>la personne qui surveille la mer d’un point haut</td>
                <td className="fr">La vigie a vu le bateau arriver.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un trois-mâts
                </th>
                <td>un grand bateau à voiles qui porte trois mâts</td>
                <td className="fr">Le Pharaon est un trois-mâts.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un armateur
                </th>
                <td>
                  la personne à qui le bateau appartient. Ici, monsieur Morrel
                </td>
                <td className="fr">L’armateur attend son navire au port.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le chargement
                </th>
                <td>
                  les marchandises que le bateau transporte et qui se vendent
                </td>
                <td className="fr">Le chargement vient de Naples.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  à bon port
                </th>
                <td>jusqu’à l’arrivée, sans accident</td>
                <td className="fr">Tout est arrivé à bon port.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un malheur
                </th>
                <td>une chose très triste qui arrive à quelqu’un</td>
                <td className="fr">Un grand malheur, monsieur Morrel !</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  soulagé
                </th>
                <td>content, parce que la peur qu’on avait s’en va</td>
                <td className="fr">Il pose sa question d’un air soulagé.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une fièvre
                </th>
                <td>une maladie qui rend le corps très chaud</td>
                <td className="fr">Le capitaine est mort d’une fièvre.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un comptable
                </th>
                <td>la personne qui s’occupe de l’argent d’une maison</td>
                <td className="fr">Danglars est le comptable du bateau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  un regard oblique
                </th>
                <td>un regard de côté, qu’on cache à celui qu’on regarde</td>
                <td className="fr">
                  Il le regarde d’un regard oblique et ne dit rien.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la haine
                </th>
                <td>le sentiment contraire de l’amour</td>
                <td className="fr">
                  Dans ses yeux passe un éclair de haine.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  cela ne doute de rien
                </th>
                <td>
                  il est trop sûr de lui. Danglars parle de Dantès en disant{" "}
                  <span className="fr">cela</span>, et c’est déjà une insulte
                </td>
                <td className="fr">C’est jeune, et cela ne doute de rien.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Sept questions. Les deux dernières ne sont pas dans les mots :
          personne ne dit ce qu’il pense, et le texte le montre autrement.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
