import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/cosette-dans-le-bois";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Victor Hugo · <em>Les Misérables</em> · 1862 · deuxième partie, livre
          troisième, « Cosette côte à côte dans l’ombre avec l’inconnu »
          (extraits)
        </p>

        <p>
          C’est la nuit, dans un bois, près de Montfermeil. Cosette a huit ans
          et elle porte un seau d’eau trop lourd pour elle. Un homme qu’elle ne
          connaît pas marche derrière elle. Les crochets […] marquent les
          passages coupés.
        </p>

        <div className="example">
          <p>— Mon enfant, c’est bien lourd pour vous ce que vous portez là.</p>
          <p>Cosette leva la tête et répondit :</p>
          <p>— Oui, monsieur.</p>
          <p>— Donnez, reprit l’homme, je vais vous le porter.</p>
          <p>
            Cosette lâcha le seau. L’homme se mit à cheminer près d’elle.
          </p>
          <p>— Petite, quel âge as-tu ?</p>
          <p>— Huit ans, monsieur.</p>
          <p>— Et viens-tu de loin comme cela ?</p>
          <p>— De la source qui est dans le bois.</p>
          <p>— Et est-ce loin où tu vas ?</p>
          <p>— À un bon quart d’heure d’ici.</p>
          <p>
            L’homme resta un moment sans parler, puis il dit brusquement :
          </p>
          <p>— Tu n’as donc pas de mère ?</p>
          <p>— Je ne sais pas, répondit l’enfant.</p>
          <p>[…]</p>
          <p>— Je ne crois pas. Les autres en ont. Moi, je n’en ai pas.</p>
          <p>Et après un silence, elle reprit :</p>
          <p>— Je crois que je n’en ai jamais eu.</p>
          <p>[…]</p>
          <p>— Comment t’appelles-tu ?</p>
          <p>— Cosette.</p>
          <p>[…]</p>
          <p>— Petite, où demeures-tu ?</p>
          <p>— À Montfermeil, si vous connaissez.</p>
          <p>— C’est là que nous allons ?</p>
          <p>— Oui, monsieur.</p>
          <p>[…]</p>
          <p>
            — Qui est-ce donc qui t’a envoyée à cette heure chercher de l’eau
            dans le bois ?
          </p>
          <p>— C’est madame Thénardier.</p>
          <p>[…]</p>
          <p>— Qu’est-ce qu’elle fait ta madame Thénardier ?</p>
          <p>— C’est ma bourgeoise, dit l’enfant. Elle tient l’auberge.</p>
          <p>
            — L’auberge ? dit l’homme. Eh bien, je vais aller y loger cette
            nuit. Conduis-moi.
          </p>
        </div>

        <div className="attention">
          L’homme commence par <span className="fr">vous</span> :{" "}
          <span className="fr">c’est bien lourd pour vous</span>. Trois lignes
          plus loin il passe à <span className="fr">tu</span> :{" "}
          <span className="fr">quel âge as-tu ?</span>. Il ne devient pas
          impoli : il parle à une enfant, et le{" "}
          <span className="fr">tu</span> le rapproche d’elle.
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
                <th scope="row" className="fr">un seau</th>
                <td>un récipient avec une anse, pour porter de l’eau</td>
                <td className="fr">Cosette lâcha le seau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">lourd</th>
                <td>difficile à porter, qui pèse beaucoup</td>
                <td className="fr">C’est bien lourd pour vous.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">lâcher</th>
                <td>ouvrir la main, ne plus tenir</td>
                <td className="fr">Elle lâche le seau et il tombe.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une source</th>
                <td>l’endroit où l’eau sort de la terre</td>
                <td className="fr">De la source qui est dans le bois.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">cheminer</th>
                <td>marcher, avancer lentement</td>
                <td className="fr">L’homme se mit à cheminer près d’elle.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">demeurer</th>
                <td>habiter</td>
                <td className="fr">Petite, où demeures-tu ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">une auberge</th>
                <td>une maison où on peut manger et dormir en payant</td>
                <td className="fr">Elle tient l’auberge.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">ma bourgeoise</th>
                <td>
                  la patronne, la femme pour qui je travaille. Le mot est vieux ;
                  aujourd’hui on dit <span className="fr">ma patronne</span>
                </td>
                <td className="fr">C’est ma bourgeoise, dit l’enfant.</td>
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
