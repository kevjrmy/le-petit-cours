import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-articles-indefinis";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>un, une, des</h2>

        <div className="rule">
          L’article indéfini présente une chose nouvelle, pas encore nommée
          dans la conversation. Rien ne la distingue des autres. Trois formes :{" "}
          <span className="fr">un</span>, <span className="fr">une</span>, et{" "}
          <span className="fr">des</span> au pluriel, pour les deux genres.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les trois formes, et le nom qui décide de chacune</caption>
            <thead>
              <tr>
                <th scope="col">Le nom</th>
                <th scope="col">La forme</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin singulier</th>
                <td className="fr">un</td>
                <td className="fr">Il y a un problème.</td>
              </tr>
              <tr>
                <th scope="row">féminin singulier</th>
                <td className="fr">une</td>
                <td className="fr">J’ai une question.</td>
              </tr>
              <tr>
                <th scope="row">pluriel, les deux genres</th>
                <td className="fr">des</td>
                <td className="fr">Elle a acheté des livres.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">des</span> est obligatoire. Au pluriel, le nom ne
          reste jamais seul : on écrit{" "}
          <span className="fr">j’ai acheté des livres</span>, et la phrase{" "}
          <span className="fr">j’ai acheté livres</span> n’existe pas. C’est
          l’oubli le plus fréquent chez qui arrive d’une langue voisine, et il
          ne s’entend pas : il manque un mot, pas un son.
        </div>

        <p>
          Après une négation, <span className="fr">un</span>,{" "}
          <span className="fr">une</span> et <span className="fr">des</span>{" "}
          deviennent <span className="fr">de</span> :{" "}
          <span className="fr">je n’ai pas de voiture</span>. La règle entière,
          avec ce qu’elle épargne, est dans{" "}
          <Link href="/grammaire/la-negation">La négation</Link>.
        </p>
      </section>

      <section>
        <h2>« un » présente, « le » désigne</h2>

        <div className="rule">
          La première fois qu’une chose apparaît dans la conversation, elle
          arrive avec <span className="fr">un</span> ou{" "}
          <span className="fr">une</span>. Ensuite, tout le monde sait de quoi
          il s’agit, et elle revient avec <span className="fr">le</span> ou{" "}
          <span className="fr">la</span>.
        </div>

        <div className="example">
          Hier, j’ai vu <strong>un</strong> chien devant la porte.
          <br />
          Ce matin, <strong>le</strong> chien était encore là.
        </div>

        <p>
          Le choix ne dépend donc pas du nom mais du moment de la phrase où il
          arrive. Le même mot prend les deux articles à deux lignes d’écart, et
          c’est l’ordre du récit qui décide, jamais le sens du mot. Les formes
          de l’autre série sont dans{" "}
          <Link href="/grammaire/les-articles-definis">
            Les articles définis
          </Link>
          .
        </p>

        <div className="attention">
          après <span className="fr">c’est</span>, l’article est presque
          toujours là : <span className="fr">c’est un médecin</span>,{" "}
          <span className="fr">c’est une amie</span>. Sans article, la phrase
          change de forme et devient{" "}
          <span className="fr">il est médecin</span>, expliqué dans{" "}
          <Link href="/grammaire/c-est-ce-sont">C’est, ce sont</Link>.
        </div>
      </section>

      <section>
        <h2>un ou une ? Ce que la fin du nom indique</h2>

        <div className="rule">
          Pour choisir entre <span className="fr">un</span> et{" "}
          <span className="fr">une</span>, il faut le genre du nom. La fin du
          mot le donne dans une bonne partie des cas.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les terminaisons qui annoncent le genre du nom</caption>
            <thead>
              <tr>
                <th scope="col">La fin du mot</th>
                <th scope="col">Le genre</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  -tion, -sion
                </th>
                <td>féminin</td>
                <td className="fr">une question, une décision</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -té
                </th>
                <td>féminin</td>
                <td className="fr">une université, la santé</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -ance, -ence
                </th>
                <td>féminin</td>
                <td className="fr">une chance, la patience</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -ette
                </th>
                <td>féminin</td>
                <td className="fr">une fourchette, une baguette</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -ment
                </th>
                <td>masculin</td>
                <td className="fr">un moment, un appartement</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -eau
                </th>
                <td>masculin</td>
                <td className="fr">un bureau, un couteau</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -age
                </th>
                <td>masculin</td>
                <td className="fr">un fromage, un village</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -isme
                </th>
                <td>masculin</td>
                <td className="fr">le tourisme, un organisme</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          plusieurs lignes du tableau ont les leurs, et les plus courantes
          s’apprennent par cœur.{" "}
          <span className="fr">le silence</span>,{" "}
          <span className="fr">le côté</span> et{" "}
          <span className="fr">l’été</span> sont masculins malgré leur fin ;{" "}
          <span className="fr">l’eau</span>, <span className="fr">la peau</span>
          , <span className="fr">la page</span>,{" "}
          <span className="fr">la plage</span> et{" "}
          <span className="fr">l’image</span> sont féminins malgré la leur.
        </div>

        <div className="attention">
          le genre d’un nom français ne se devine pas à partir d’une autre
          langue, même proche. Quand la fin du mot ne dit rien, le nom
          s’apprend avec son article, et c’est pour cela qu’un dictionnaire
          écrit toujours <span className="fr">n. m.</span> ou{" "}
          <span className="fr">n. f.</span> à côté du mot.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Trois formes : <span className="fr">un</span>,{" "}
            <span className="fr">une</span>, et{" "}
            <span className="fr">des</span> au pluriel pour les deux genres.
          </li>
          <li>
            <span className="fr">des</span> ne se supprime pas : un nom pluriel
            sans article n’existe pas.
          </li>
          <li>
            La première fois, <span className="fr">un</span> ; ensuite,{" "}
            <span className="fr">le</span>. C’est l’ordre du récit qui décide.
          </li>
          <li>
            La fin du mot annonce souvent le genre :{" "}
            <span className="fr">-tion</span>,{" "}
            <span className="fr">-té</span>,{" "}
            <span className="fr">-ance</span>,{" "}
            <span className="fr">-ette</span> au féminin ;{" "}
            <span className="fr">-ment</span>,{" "}
            <span className="fr">-eau</span>,{" "}
            <span className="fr">-age</span>,{" "}
            <span className="fr">-isme</span> au masculin.
          </li>
          <li>
            Quand la fin ne dit rien, le nom s’apprend avec son article.
          </li>
        </ul>
      </div>
    </article>
  );
}
