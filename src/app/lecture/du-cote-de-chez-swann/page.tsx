import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/du-cote-de-chez-swann";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Marcel Proust · <em>Du côté de chez Swann</em> · 1913 · « Combray »,
          les premières lignes
        </p>

        <p>
          C’est le début d’un livre de trois mille pages. Un homme se souvient
          de ses nuits d’enfant : il lisait au lit, il s’endormait sans s’en
          apercevoir, et il se réveillait une demi-heure plus tard sans savoir
          où il était.
        </p>

        <div className="example">
          <p>
            Longtemps, je me suis couché de bonne heure. Parfois, à peine ma
            bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le
            temps de me dire : « Je m’endors. » Et, une demi-heure après, la
            pensée qu’il était temps de chercher le sommeil m’éveillait ; je
            voulais poser le volume que je croyais avoir encore dans les mains
            et souffler ma lumière […]. Il me semblait que j’étais moi-même ce
            dont parlait l’ouvrage : une église, un quatuor, la rivalité de
            François I<sup>er</sup> et de Charles-Quint. […]
          </p>
          <p>
            Je me demandais quelle heure il pouvait être ; j’entendais le
            sifflement des trains qui, plus ou moins éloigné, comme le chant
            d’un oiseau dans une forêt, relevant les distances, me décrivait
            l’étendue de la campagne déserte […].
          </p>
        </div>

        <div className="attention">
          <span className="fr">Longtemps, je me suis couché de bonne heure</span>{" "}
          est au passé composé, et tout ce qui suit est à l’imparfait. Le passé
          composé pose la période entière, vue de loin et terminée. L’imparfait
          raconte ensuite ce qui se passait à l’intérieur, chaque soir.
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
                <th scope="row" className="fr">une bougie</th>
                <td>un bâton de cire qui brûle et donne de la lumière</td>
                <td className="fr">Il éteint sa bougie et il dort.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">à peine</th>
                <td>juste après, tout de suite après</td>
                <td className="fr">À peine ma bougie éteinte, je dormais.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un volume</th>
                <td>un livre. Plus loin, l’ouvrage veut dire la même chose</td>
                <td className="fr">Je voulais poser le volume.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">souffler la lumière</th>
                <td>éteindre la bougie avec la bouche</td>
                <td className="fr">Il souffle sa lumière et se rendort.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">le sommeil</th>
                <td>l’état de la personne qui dort</td>
                <td className="fr">Il était temps de chercher le sommeil.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">éveiller</th>
                <td>réveiller</td>
                <td className="fr">Cette pensée m’éveillait.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un sifflement</th>
                <td>le son aigu et long d’un train ou d’un oiseau</td>
                <td className="fr">J’entendais le sifflement des trains.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Sept questions, toutes sur ce qui se passe vraiment : une bougie, un
          livre, une demi-heure, un train.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
