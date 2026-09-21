import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/c-est-ce-sont";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Nommer une chose, présenter une personne</h2>

        <div className="rule">
          Pour dire ce qu’est une chose, ou qui est une personne, la phrase
          commence par <strong>c’est</strong>. Le nom qui suit garde le petit
          mot placé devant lui : <span className="fr">un</span>,{" "}
          <span className="fr">une</span>, <span className="fr">le</span>,{" "}
          <span className="fr">ma</span>.
        </div>

        <div className="example">
          <strong>C’est</strong> un stylo. · <strong>C’est</strong> la gare. ·{" "}
          <strong>C’est</strong> ma sœur. · <strong>C’est</strong> Paul.
        </div>

        <p>
          <span className="fr">c’est</span> s’écrit toujours avec une
          apostrophe. <span className="fr">ce</span> perd son{" "}
          <span className="fr">e</span> devant le verbe{" "}
          <span className="fr">est</span>, et la forme{" "}
          <span className="fr">ce est</span> n’existe pas.
        </p>

        <p>
          La même phrase répond aux deux questions qu’on pose le plus souvent
          en arrivant quelque part.
        </p>

        <div className="example">
          Qu’est-ce que c’est ? – <strong>C’est</strong> une clé.
          <br />
          Qui est-ce ? – <strong>C’est</strong> mon voisin.
        </div>

        <div className="attention">
          <span className="fr">c’est</span> ne change pas selon le genre du nom
          qui suit. On écrit <span className="fr">c’est un livre</span> et{" "}
          <span className="fr">c’est une table</span> : le mot qui bouge est
          celui du nom, jamais <span className="fr">c’est</span>.
        </div>
      </section>

      <section>
        <h2>Au pluriel, et quand la réponse est non</h2>

        <div className="rule">
          Devant un nom au pluriel, on écrit <strong>ce sont</strong>. Pour dire
          le contraire, la négation entoure le verbe :{" "}
          <strong>ce n’est pas</strong>, <strong>ce ne sont pas</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Les quatre formes de la phrase qui présente quelque chose
            </caption>
            <thead>
              <tr>
                <th scope="col">Le nom qui suit</th>
                <th scope="col">On dit oui</th>
                <th scope="col">On dit non</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">un seul</th>
                <td className="fr">C’est une clé.</td>
                <td className="fr">Ce n’est pas une clé.</td>
              </tr>
              <tr>
                <th scope="row">plusieurs</th>
                <td className="fr">Ce sont des clés.</td>
                <td className="fr">Ce ne sont pas des clés.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Le verbe est <span className="fr">être</span>, et il s’accorde avec ce
          qui suit : un nom au singulier appelle{" "}
          <span className="fr">est</span>, un nom au pluriel appelle{" "}
          <span className="fr">sont</span>.
        </p>

        <div className="attention">
          à l’oral, on entend très souvent{" "}
          <span className="fr">c’est des clés</span>. À l’écrit, le pluriel
          demande <span className="fr">ce sont des clés</span>.
        </div>
      </section>

      <section>
        <h2>« c’est » ou « il est » ?</h2>

        <div className="rule">
          Ce qui vient après décide. S’il y a un petit mot devant le nom
          (<span className="fr">un</span>, <span className="fr">une</span>,{" "}
          <span className="fr">mon</span>, <span className="fr">le</span>), la
          phrase commence par <strong>c’est</strong>. S’il n’y en a pas, on dit{" "}
          <strong>il est</strong> ou <strong>elle est</strong>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Ce qui suit le verbe décide de la forme à écrire</caption>
            <thead>
              <tr>
                <th scope="col">La forme</th>
                <th scope="col">Ce qui suit</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  c’est
                </th>
                <td>un petit mot, puis un nom</td>
                <td className="fr">C’est un médecin. C’est ma voisine.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il est / elle est
                </th>
                <td>un métier, sans rien devant</td>
                <td className="fr">Il est médecin. Elle est étudiante.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il est / elle est
                </th>
                <td>un adjectif, accordé avec la personne</td>
                <td className="fr">Il est grand. Elle est grande.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  c’est
                </th>
                <td>un adjectif, pour dire ce qu’on en pense</td>
                <td className="fr">C’est bon. C’est difficile.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          on ne dit pas <span className="fr">il est un médecin</span>. Dès qu’un
          petit mot arrive devant le nom, la phrase commence par{" "}
          <span className="fr">c’est</span>.
        </div>

        <div className="exception">
          après <span className="fr">c’est</span>, l’adjectif ne s’accorde
          jamais. On écrit <span className="fr">c’est bon</span> même en parlant
          d’une tarte, parce que l’adjectif ne décrit pas la tarte : il dit ce
          qu’on pense. Pour décrire la tarte elle-même, on dit{" "}
          <span className="fr">elle est bonne</span>.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">c’est</span> sert à nommer une chose et à
            présenter une personne, et s’écrit toujours avec une apostrophe.
          </li>
          <li>
            Devant un nom au pluriel, on écrit{" "}
            <span className="fr">ce sont</span>, jamais{" "}
            <span className="fr">c’est</span>.
          </li>
          <li>
            La négation entoure le verbe :{" "}
            <span className="fr">ce n’est pas</span>,{" "}
            <span className="fr">ce ne sont pas</span>.
          </li>
          <li>
            Un petit mot devant le nom appelle{" "}
            <span className="fr">c’est</span> ; un métier ou un adjectif
            accordé appelle <span className="fr">il est</span> ou{" "}
            <span className="fr">elle est</span>.
          </li>
          <li>
            Après <span className="fr">c’est</span>, l’adjectif reste au
            masculin : <span className="fr">c’est bon</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
