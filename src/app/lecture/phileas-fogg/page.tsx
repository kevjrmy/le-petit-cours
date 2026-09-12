import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/phileas-fogg";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Jules Verne · <em>Le Tour du monde en quatre-vingts jours</em> · 1873
          · chapitre I (extraits)
        </p>

        <p>
          Londres, 1872. Phileas Fogg est riche, il ne parle presque pas, et sa
          vie ne change jamais. Les crochets […] marquent les passages coupés.
        </p>

        <div className="example">
          <p>Phileas Fogg était membre du Reform-Club, et voilà tout.</p>
          <p>
            […] On ne connaissait à Phileas Fogg ni femme ni enfants, […] ni
            parents ni amis […]. Phileas Fogg vivait seul dans sa maison de
            Saville-row, où personne ne pénétrait. […] Un seul domestique
            suffisait à le servir. Déjeunant, dînant au club à des heures
            chronométriquement déterminées, dans la même salle, à la même table,
            […] il ne rentrait chez lui que pour se coucher, à minuit précis
            […]. Sur vingt-quatre heures, il en passait dix à son domicile
            […].
          </p>
        </div>

        <p>
          Ce matin-là, il a renvoyé son domestique et il en attend un autre.
        </p>

        <div className="example">
          <p>
            Ce jour-là même, 2 octobre, Phileas Fogg avait donné son congé à
            James Forster, — ce garçon s’étant rendu coupable de lui avoir
            apporté pour sa barbe de l’eau à quatre-vingt-quatre degrés
            Fahrenheit au lieu de quatre-vingt-six, — et il attendait son
            successeur, qui devait se présenter entre onze heures et onze heures
            et demie.
          </p>
          <p>
            […] « Vous êtes Français et vous vous nommez John ? lui demanda
            Phileas Fogg.
          </p>
          <p>
            — Jean, n’en déplaise à monsieur, répondit le nouveau venu, Jean
            Passepartout […]. Mais voilà cinq ans que j’ai quitté la France et
            que […] je suis valet de chambre en Angleterre. […]
          </p>
          <p>
            — Passepartout me convient, répondit le gentleman. Vous m’êtes
            recommandé. J’ai de bons renseignements sur votre compte. Vous
            connaissez mes conditions ?
          </p>
          <p>— Oui, monsieur.</p>
          <p>— Bien. Quelle heure avez-vous ?</p>
          <p>
            — Onze heures vingt-deux, répondit Passepartout, en tirant des
            profondeurs de son gousset une énorme montre d’argent.
          </p>
          <p>— Vous retardez, dit Mr. Fogg.</p>
          <p>— Que monsieur me pardonne, mais c’est impossible.</p>
          <p>
            — Vous retardez de quatre minutes. N’importe. Il suffit de constater
            l’écart. Donc, à partir de ce moment, onze heures vingt-neuf du
            matin, ce mercredi 2 octobre 1872, vous êtes à mon service. »
          </p>
        </div>

        <div className="attention">
          Une montre qui <span className="fr">retarde</span> donne une heure
          trop tôt ; une montre qui <span className="fr">avance</span> donne une
          heure trop tard. Passepartout dit onze heures vingt-deux quand il est
          onze heures vingt-six.
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
                <th scope="row" className="fr">un domestique</th>
                <td>une personne payée pour faire le travail de la maison</td>
                <td className="fr">Un seul domestique suffisait à le servir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">donner son congé à quelqu’un</th>
                <td>le renvoyer, lui dire qu’il ne travaille plus ici</td>
                <td className="fr">
                  Il avait donné son congé à James Forster.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">un successeur</th>
                <td>la personne qui vient après, à la même place</td>
                <td className="fr">Il attendait son successeur.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">retarder</th>
                <td>pour une montre : marquer une heure trop tôt</td>
                <td className="fr">Vous retardez de quatre minutes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">un gousset</th>
                <td>une petite poche, pour la montre</td>
                <td className="fr">
                  Il tire sa montre des profondeurs de son gousset.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">l’écart</th>
                <td>la différence entre deux mesures</td>
                <td className="fr">Il suffit de constater l’écart.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">se nommer</th>
                <td>s’appeler</td>
                <td className="fr">Vous vous nommez John ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr">n’importe</th>
                <td>ce n’est pas grave, cela ne change rien</td>
                <td className="fr">
                  Vous retardez de quatre minutes. N’importe.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Avez-vous compris ?</h2>

        <p>
          Le même texte à deux niveaux : choisissez le vôtre sous ce
          paragraphe. Répondez sans relire, puis retournez au texte pour celles
          qui vous manquent.
        </p>

        <Quiz />
      </section>
    </article>
  );
}
