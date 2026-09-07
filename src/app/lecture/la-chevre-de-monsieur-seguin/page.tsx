import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/la-chevre-de-monsieur-seguin";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Alphonse Daudet · <em>Lettres de mon moulin</em> · 1869 · « La chèvre
          de monsieur Seguin » (extraits)
        </p>

        <p>
          M. Seguin habite en Provence. Il achète des chèvres, et il les perd
          toutes.
        </p>

        <div className="example">
          <p>M. Seguin n’avait jamais eu de bonheur avec ses chèvres.</p>
          <p>
            Il les perdait toutes de la même façon : un beau matin, elles
            cassaient leur corde, s’en allaient dans la montagne, et là-haut le
            loup les mangeait. Ni les caresses de leur maître, ni la peur du
            loup, rien ne les retenait. C’était, paraît-il, des chèvres
            indépendantes, voulant à tout prix le grand air et la liberté.
          </p>
          <p>
            Le brave M. Seguin, qui ne comprenait rien au caractère de ses
            bêtes, était consterné. Il disait :
          </p>
          <p>
            — C’est fini ; les chèvres s’ennuient chez moi, je n’en garderai pas
            une.
          </p>
        </div>

        <p>
          M. Seguin achète quand même une septième chèvre, toute jeune :
          Blanquette. Un matin, elle regarde la montagne, et elle aussi veut
          partir.
        </p>

        <div className="example">
          <p>
            — Ah ! mon Dieu !… Elle aussi ! cria M. Seguin stupéfait, et du coup
            il laissa tomber son écuelle ; puis, s’asseyant dans l’herbe à côté
            de sa chèvre :
          </p>
          <p>— Comment Blanquette, tu veux me quitter !</p>
          <p>Et Blanquette répondit :</p>
          <p>— Oui, monsieur Seguin.</p>
          <p>— Est-ce que l’herbe te manque ici ?</p>
          <p>— Oh ! non ! monsieur Seguin.</p>
          <p>
            — Tu es peut-être attachée de trop court ; veux-tu que j’allonge la
            corde !
          </p>
          <p>— Ce n’est pas la peine, monsieur Seguin.</p>
          <p>— Alors, qu’est-ce qu’il te faut ! qu’est-ce que tu veux ?</p>
          <p>— Je veux aller dans la montagne, monsieur Seguin.</p>
        </div>

        <div className="attention">
          Dans les livres, on écrit <span className="fr">il cria</span>,{" "}
          <span className="fr">elle répondit</span> là où on dit{" "}
          <span className="fr">il a crié</span>,{" "}
          <span className="fr">elle a répondu</span>. C’est le passé simple :
          vous le lirez souvent, vous ne l’écrirez jamais.
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
                  avoir du bonheur avec
                </th>
                <td>avoir de la chance avec, réussir avec</td>
                <td className="fr">
                  Il n’a jamais eu de bonheur avec ses chèvres : il les a toutes
                  perdues.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une corde
                </th>
                <td>un long fil très solide, qui attache une bête</td>
                <td className="fr">La chèvre casse sa corde et part.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le loup
                </th>
                <td>
                  un animal sauvage, gris, qui vit dans la montagne et mange les
                  autres bêtes
                </td>
                <td className="fr">Là-haut, le loup les mangeait.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  retenir
                </th>
                <td>garder près de soi, empêcher de partir</td>
                <td className="fr">Rien ne les retenait.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  consterné
                </th>
                <td>très triste et très surpris</td>
                <td className="fr">M. Seguin était consterné.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  s’ennuyer
                </th>
                <td>trouver le temps long, ne pas s’amuser</td>
                <td className="fr">Les chèvres s’ennuient chez moi.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  une écuelle
                </th>
                <td>une assiette creuse, pour un animal</td>
                <td className="fr">Il laissa tomber son écuelle.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ce n’est pas la peine
                </th>
                <td>ce n’est pas nécessaire</td>
                <td className="fr">
                  — Veux-tu que j’allonge la corde ? — Ce n’est pas la peine.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Sept questions. Répondez sans relire, puis retournez au texte pour
          celles qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
