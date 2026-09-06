import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-pronoms-cod-coi";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le COD : le verbe va droit au complément</h2>

        <div className="rule">
          Le complément d’objet <strong>direct</strong> suit le verbe sans
          préposition. Pour ne pas répéter le mot, on le remplace par{" "}
          <span className="fr">le</span>, <span className="fr">la</span>,{" "}
          <span className="fr">les</span> — et le pronom se place{" "}
          <strong>devant le verbe</strong>.
        </div>

        <div className="example">
          Je regarde <strong>la télévision</strong>. → Je{" "}
          <strong>la</strong> regarde.
          <br />
          Tu connais <strong>mes parents</strong> ? → Tu{" "}
          <strong>les</strong> connais ?
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les pronoms compléments d’objet direct</caption>
            <thead>
              <tr>
                <th scope="col">Il remplace</th>
                <th scope="col">Pronom</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">moi</th>
                <td className="fr">me</td>
                <td className="fr">Il me voit.</td>
              </tr>
              <tr>
                <th scope="row">toi</th>
                <td className="fr">te</td>
                <td className="fr">Je te comprends.</td>
              </tr>
              <tr>
                <th scope="row">un nom masculin</th>
                <td className="fr">le</td>
                <td className="fr">Ce livre ? Je le lis.</td>
              </tr>
              <tr>
                <th scope="row">un nom féminin</th>
                <td className="fr">la</td>
                <td className="fr">Cette robe ? Je la prends.</td>
              </tr>
              <tr>
                <th scope="row">un pluriel</th>
                <td className="fr">les</td>
                <td className="fr">Les clés ? Je les cherche.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          devant une voyelle, <span className="fr">me</span>,{" "}
          <span className="fr">te</span>, <span className="fr">le</span> et{" "}
          <span className="fr">la</span> perdent leur voyelle :{" "}
          <span className="fr">Je l’écoute</span>,{" "}
          <span className="fr">Il m’attend</span>.
        </div>
      </section>

      <section>
        <h2>Le COI : le verbe passe par « à »</h2>

        <div className="rule">
          Le complément d’objet <strong>indirect</strong> est relié au verbe par
          la préposition <span className="fr">à</span>. Quand il désigne une
          personne, on le remplace par <span className="fr">lui</span> au
          singulier et <span className="fr">leur</span> au pluriel — sans
          distinguer le masculin du féminin.
        </div>

        <div className="example">
          Je téléphone <strong>à ma sœur</strong>. → Je{" "}
          <strong>lui</strong> téléphone.
          <br />
          Il parle <strong>à ses collègues</strong>. → Il{" "}
          <strong>leur</strong> parle.
        </div>

        <div className="table-wrap">
          <table>
            <caption>COD et COI : les formes qui changent</caption>
            <thead>
              <tr>
                <th scope="col">Personne</th>
                <th scope="col">COD</th>
                <th scope="col">COI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">3ᵉ personne du singulier</th>
                <td className="fr">le / la</td>
                <td className="fr">lui</td>
              </tr>
              <tr>
                <th scope="row">3ᵉ personne du pluriel</th>
                <td className="fr">les</td>
                <td className="fr">leur</td>
              </tr>
              <tr>
                <th scope="row">les autres</th>
                <td className="fr">me, te, nous, vous</td>
                <td className="fr">me, te, nous, vous</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">Posez la question au verbe</p>
          <p>
            <strong>Qui ?</strong> ou <strong>quoi ?</strong> sans préposition →
            c’est un COD. <strong>À qui ?</strong> → c’est un COI. Le piège est
            que les deux langues ne construisent pas les mêmes verbes de la même
            façon : on dit <span className="fr">téléphoner à quelqu’un</span>{" "}
            mais <span className="fr">appeler quelqu’un</span>. Apprenez la
            préposition avec le verbe, comme une seule et même chose.
          </p>
        </div>
      </section>

      <section>
        <h2>Où placer le pronom</h2>

        <div className="rule">
          Le pronom se place <strong>devant le verbe conjugué</strong>. Au passé
          composé, il passe donc devant l’auxiliaire ; à la forme négative,{" "}
          <span className="fr">ne</span> se met avant lui.
        </div>

        <div className="table-wrap">
          <table>
            <caption>La place du pronom selon la forme de la phrase</caption>
            <thead>
              <tr>
                <th scope="col">Forme</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">présent</th>
                <td className="fr">Je les invite.</td>
              </tr>
              <tr>
                <th scope="row">passé composé</th>
                <td className="fr">Je les ai invités.</td>
              </tr>
              <tr>
                <th scope="row">négation</th>
                <td className="fr">Je ne les invite pas.</td>
              </tr>
              <tr>
                <th scope="row">deux verbes</th>
                <td className="fr">Je vais les inviter.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          quand un COD est placé avant le verbe, le participe passé s’accorde
          avec lui : <span className="fr">Je les ai invit<strong>és</strong></span>{" "}
          · <span className="fr">Cette lettre, je l’ai écrit<strong>e</strong></span>.
          L’accord ne s’entend pas toujours, mais il s’écrit.
        </div>

        <div className="exception">
          l’impératif affirmatif. Là, le pronom passe{" "}
          <strong>après</strong> le verbe, avec un trait d’union, et{" "}
          <span className="fr">me</span> devient{" "}
          <span className="fr">moi</span> : <span className="fr">Regarde-la !</span>{" "}
          · <span className="fr">Téléphone-moi !</span> À la forme négative, il
          reprend sa place habituelle : <span className="fr">Ne la regarde pas.</span>
        </div>
      </section>
    </article>
  );
}
