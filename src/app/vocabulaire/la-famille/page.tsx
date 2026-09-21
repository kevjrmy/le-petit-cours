import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-famille";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Les personnes de la famille</h2>

        <div className="rule">
          Presque tous les noms de la famille vont par deux, un masculin et un
          féminin. Le pluriel mélangé prend la forme masculine :{" "}
          <span className="fr">mes parents</span>,{" "}
          <span className="fr">mes grands-parents</span>,{" "}
          <span className="fr">mes cousins</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les noms de la famille, au masculin et au féminin</caption>
            <thead>
              <tr>
                <th scope="col">Masculin</th>
                <th scope="col">Féminin</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  le père
                </th>
                <td className="fr">la mère</td>
                <td className="fr">Mon père travaille à Lyon.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le fils
                </th>
                <td className="fr">la fille</td>
                <td className="fr">Ils ont deux fils et une fille.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le frère
                </th>
                <td className="fr">la sœur</td>
                <td className="fr">Ma sœur habite à Madrid.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le grand-père
                </th>
                <td className="fr">la grand-mère</td>
                <td className="fr">Je déjeune chez ma grand-mère.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’oncle
                </th>
                <td className="fr">la tante</td>
                <td className="fr">Mon oncle vient dimanche.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le cousin
                </th>
                <td className="fr">la cousine</td>
                <td className="fr">J’ai quatre cousines.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le neveu
                </th>
                <td className="fr">la nièce</td>
                <td className="fr">Mon neveu a huit ans.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le mari
                </th>
                <td className="fr">la femme</td>
                <td className="fr">Sa femme s’appelle Claire.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr">la fille</span> a deux sens : l’enfant de
          quelqu’un, et une personne jeune de sexe féminin. Ce qui distingue les
          deux, c’est le mot qui précède.{" "}
          <span className="fr">ma fille</span> est mon enfant ;{" "}
          <span className="fr">une fille</span> dans une phrase comme{" "}
          <span className="fr">une fille attend devant la porte</span> est
          quelqu’un qu’on ne connaît pas. <span className="fr">la femme</span>{" "}
          fonctionne pareil : <span className="fr">sa femme</span> est son
          épouse, <span className="fr">une femme</span> est une personne
          adulte.
        </div>
      </section>

      <section>
        <h2>Dire à qui ils sont</h2>

        <div className="rule">
          Pour relier deux personnes, le français emploie{" "}
          <span className="fr">de</span> :{" "}
          <span className="fr">le frère de Marie</span>,{" "}
          <span className="fr">la mère de mon ami</span>. L’ordre est toujours
          le même : d’abord la personne dont on parle, ensuite celle à qui elle
          est liée.
        </div>

        <div className="example">
          C’est la sœur <strong>de</strong> Paul.
          <br />
          Voici la voiture <strong>de</strong> mes parents.
          <br />
          Le fils <strong>du</strong> voisin a quinze ans.
        </div>

        <p>
          <span className="fr">de</span> se colle à l’article qui suit :{" "}
          <span className="fr">de + le</span> donne{" "}
          <span className="fr">du</span>, et{" "}
          <span className="fr">de + les</span> donne{" "}
          <span className="fr">des</span>. Devant une voyelle,{" "}
          <span className="fr">de</span> devient{" "}
          <span className="fr">d’</span> : <span className="fr">la fille d’Anne</span>.
        </p>

        <div className="attention">
          <span className="fr">mon</span>, <span className="fr">ton</span>,{" "}
          <span className="fr">son</span> reviennent devant un nom féminin qui
          commence par une voyelle. On écrit{" "}
          <span className="fr">mon amie</span> et{" "}
          <span className="fr">son école</span>, jamais{" "}
          <span className="fr">ma amie</span>. Le nom reste féminin : c’est{" "}
          <span className="fr">mon amie est espagnole</span>. Les formes
          complètes sont sur la leçon des déterminants possessifs.
        </div>
      </section>

      <section>
        <h2>La famille qui arrive après</h2>

        <div className="rule">
          <span className="fr">beau-</span> et{" "}
          <span className="fr">belle-</span> servent deux fois : pour la
          famille de votre mari ou de votre femme, et pour la personne qui vit
          avec votre père ou votre mère.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les noms en « beau » et « belle », et ce qu’ils désignent
            </caption>
            <thead>
              <tr>
                <th scope="col">Le nom</th>
                <th scope="col">Qui c’est</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  le beau-père
                </th>
                <td>
                  le père de votre mari ou de votre femme, ou le compagnon de
                  votre mère
                </td>
                <td className="fr">Mon beau-père est très gentil.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la belle-mère
                </th>
                <td>
                  la mère de votre mari ou de votre femme, ou la compagne de
                  votre père
                </td>
                <td className="fr">Nous dînons chez ma belle-mère.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le beau-frère
                </th>
                <td>
                  le frère de votre mari ou de votre femme, ou le mari de votre
                  sœur
                </td>
                <td className="fr">Mon beau-frère habite au Portugal.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  la belle-sœur
                </th>
                <td>
                  la sœur de votre mari ou de votre femme, ou la femme de votre
                  frère
                </td>
                <td className="fr">Ma belle-sœur est médecin.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  le demi-frère
                </th>
                <td>un frère avec qui vous avez un seul parent commun</td>
                <td className="fr">J’ai un demi-frère plus jeune.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          <span className="fr">beau-père</span> et{" "}
          <span className="fr">belle-mère</span> sont ambigus, et le français
          n’a pas d’autre mot. Quand la phrase doit être claire, on précise :{" "}
          <span className="fr">le père de mon mari</span>, ou{" "}
          <span className="fr">le compagnon de ma mère</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr">les parents</span>, ce sont deux personnes :
            le père et la mère.
          </p>
          <p>
            Pour les oncles, les cousins et les grands-parents, on ne dit pas{" "}
            <span className="fr">les parents</span>. On dit{" "}
            <span className="fr">la famille</span>, ou{" "}
            <span className="fr">les proches</span> :{" "}
            <span className="fr">toute la famille était là</span>,{" "}
            <span className="fr">j’ai de la famille en France</span>.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Les noms de la famille vont par deux, et le pluriel mélangé prend le
            masculin : <span className="fr">mes parents</span>,{" "}
            <span className="fr">mes cousins</span>.
          </li>
          <li>
            <span className="fr">la fille</span> et{" "}
            <span className="fr">la femme</span> ont deux sens ; le mot qui
            précède les sépare.
          </li>
          <li>
            On relie deux personnes avec <span className="fr">de</span>, qui
            donne <span className="fr">du</span> devant{" "}
            <span className="fr">le</span> et{" "}
            <span className="fr">d’</span> devant une voyelle.
          </li>
          <li>
            <span className="fr">mon</span> remplace{" "}
            <span className="fr">ma</span> devant un nom féminin qui commence
            par une voyelle.
          </li>
          <li>
            <span className="fr">beau-</span> et{" "}
            <span className="fr">belle-</span> désignent la famille du mari ou
            de la femme, ou le nouveau couple d’un parent, et se précisent avec{" "}
            <span className="fr">de</span> quand c’est ambigu.
          </li>
        </ul>
      </div>
    </article>
  );
}
