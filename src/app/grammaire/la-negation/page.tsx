import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/la-negation";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Deux mots autour du verbe</h2>

        <div className="rule">
          La négation française s’écrit en <strong>deux morceaux</strong>.{" "}
          <span className="fr">ne</span> se met avant le verbe conjugué,{" "}
          <span className="fr">pas</span> se met après. Le verbe est pris entre
          les deux.
        </div>

        <div className="example">
          Je parle. → Je <strong>ne</strong> parle <strong>pas</strong>.
          <br />
          Elle travaille le dimanche. → Elle <strong>ne</strong> travaille{" "}
          <strong>pas</strong> le dimanche.
          <br />
          Ils sont français. → Ils <strong>ne</strong> sont{" "}
          <strong>pas</strong> français.
        </div>

        <p>
          Devant une voyelle ou un <span className="fr">h</span> muet,{" "}
          <span className="fr">ne</span> devient{" "}
          <span className="fr">n’</span>.
        </p>

        <div className="example">
          Je <strong>n’</strong>aime pas le café. · Il <strong>n’</strong>habite
          pas ici. · On <strong>n’</strong>a pas le temps.
        </div>

        <div className="attention">
          au passé composé, les deux morceaux encadrent{" "}
          <strong>l’auxiliaire</strong>, pas le participe :{" "}
          <span className="fr">je n’ai pas mangé</span>,{" "}
          <span className="fr">elle n’est pas venue</span>. Le participe reste
          en dehors, après <span className="fr">pas</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            À l’oral, le <span className="fr">ne</span> disparaît. À l’écrit,
            jamais.
          </p>
          <p>
            On entend tous les jours{" "}
            <span className="fr">je sais pas</span>,{" "}
            <span className="fr">c’est pas grave</span>. C’est du français
            courant et vous pouvez le dire. Mais une phrase écrite sans{" "}
            <span className="fr">ne</span> est une phrase fausse : dans une
            lettre, un message professionnel ou un examen, les deux morceaux
            sont obligatoires.
          </p>
        </div>
      </section>

      <section>
        <h2>Après la négation, l’article change</h2>

        <div className="rule">
          <span className="fr">un</span>, <span className="fr">une</span>,{" "}
          <span className="fr">des</span>, <span className="fr">du</span>,{" "}
          <span className="fr">de la</span> deviennent{" "}
          <strong>
            <span className="fr">de</span>
          </strong>{" "}
          après une négation, quel que soit le genre et le nombre du nom.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Ce que l’article devient quand la phrase passe au négatif
            </caption>
            <thead>
              <tr>
                <th scope="col">Phrase affirmative</th>
                <th scope="col">Phrase négative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  J’ai un vélo.
                </th>
                <td className="fr">Je n’ai pas de vélo.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Elle a une voiture.
                </th>
                <td className="fr">Elle n’a pas de voiture.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Nous avons des enfants.
                </th>
                <td className="fr">Nous n’avons pas d’enfants.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  Il boit du thé.
                </th>
                <td className="fr">Il ne boit pas de thé.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Devant une voyelle, <span className="fr">de</span> s’élide à son tour
          et donne <span className="fr">d’</span> :{" "}
          <span className="fr">il n’y a pas d’eau dans le verre</span>.
        </p>

        <div className="exception">
          l’article défini ne bouge pas.{" "}
          <span className="fr">le</span>, <span className="fr">la</span>,{" "}
          <span className="fr">les</span> restent tels quels :{" "}
          <span className="fr">je n’aime pas le café</span>, jamais{" "}
          <span className="fr">je n’aime pas de café</span>. Et après le verbe{" "}
          <span className="fr">être</span>, rien ne change non plus :{" "}
          <span className="fr">ce n’est pas un problème</span>.
        </div>
      </section>

      <section>
        <h2>Quand « pas » cède sa place</h2>

        <p>
          <span className="fr">ne</span> reste toujours devant le verbe, mais le
          deuxième morceau peut changer pour préciser le sens de la négation.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Les quatre négations qui remplacent « pas », et ce qu’elles disent
              de plus
            </caption>
            <thead>
              <tr>
                <th scope="col">Négation</th>
                <th scope="col">Sens</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  ne … plus
                </th>
                <td>c’était vrai avant, c’est fini</td>
                <td className="fr">Je ne fume plus.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ne … jamais
                </th>
                <td>zéro fois, aucune fois</td>
                <td className="fr">Il ne ment jamais.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ne … rien
                </th>
                <td>aucune chose</td>
                <td className="fr">Elle ne voit rien.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ne … personne
                </th>
                <td>aucune personne</td>
                <td className="fr">Nous ne connaissons personne.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          ces mots remplacent <span className="fr">pas</span>, ils ne
          s’ajoutent pas à lui. On dit{" "}
          <span className="fr">je ne fume plus</span>, jamais{" "}
          <span className="fr">je ne fume pas plus</span>.
        </div>

        <div className="exception">
          au passé composé, <span className="fr">personne</span> se place après
          le participe, alors que les trois autres restent devant :{" "}
          <span className="fr">je n’ai rien vu</span> mais{" "}
          <span className="fr">je n’ai vu personne</span>.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">ne</span> avant le verbe conjugué,{" "}
            <span className="fr">pas</span> après : le verbe est entre les deux.
          </li>
          <li>
            Devant une voyelle, <span className="fr">ne</span> devient{" "}
            <span className="fr">n’</span>.
          </li>
          <li>
            Au passé composé, les deux morceaux encadrent l’auxiliaire ; le
            participe reste après.
          </li>
          <li>
            <span className="fr">un</span>, <span className="fr">une</span>,{" "}
            <span className="fr">des</span>, <span className="fr">du</span>,{" "}
            <span className="fr">de la</span> deviennent{" "}
            <span className="fr">de</span>. L’article défini, lui, ne change
            pas.
          </li>
          <li>
            <span className="fr">plus</span>,{" "}
            <span className="fr">jamais</span>, <span className="fr">rien</span>
            , <span className="fr">personne</span> prennent la place de{" "}
            <span className="fr">pas</span> et ne s’ajoutent jamais à lui.
          </li>
        </ul>
      </div>
    </article>
  );
}
