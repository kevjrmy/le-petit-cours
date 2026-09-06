import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-homophones";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Un test, pas une leçon par mot</h2>

        <div className="rule">
          Deux mots se prononcent pareil et s’écrivent autrement. Pour choisir,
          on ne devine pas : on <strong>remplace</strong> le mot par sa forme à
          un autre temps. Si la phrase tient debout, c’est le verbe ; sinon,
          c’est l’autre mot.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Le remplacement qui décide, paire par paire</caption>
            <thead>
              <tr>
                <th scope="col">Paire</th>
                <th scope="col">Remplacez par</th>
                <th scope="col">Si ça marche</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  a / à
                </th>
                <td className="fr">avait</td>
                <td className="fr">a (verbe avoir)</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  et / est
                </th>
                <td className="fr">était</td>
                <td className="fr">est (verbe être)</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  on / ont
                </th>
                <td className="fr">avaient</td>
                <td className="fr">ont (verbe avoir)</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  son / sont
                </th>
                <td className="fr">étaient</td>
                <td className="fr">sont (verbe être)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          Il <strong>a</strong> faim → Il <strong>avait</strong> faim. ✓ verbe
          <br />
          Il va <strong>à</strong> Paris → Il va <strong>avait</strong> Paris. ✗
          préposition
        </div>
      </section>

      <section>
        <h2>Les quatre paires, une par une</h2>

        <h3>a / à</h3>
        <p>
          <span className="fr">a</span> est le verbe{" "}
          <span className="fr">avoir</span>. <span className="fr">à</span>, avec
          son accent, est une préposition : elle indique le lieu, l’heure, le
          destinataire.
        </p>
        <div className="example">
          Elle <strong>a</strong> deux enfants. · Nous partons{" "}
          <strong>à</strong> midi. · Il pense <strong>à</strong> son travail.
        </div>

        <h3>et / est</h3>
        <p>
          <span className="fr">et</span> ajoute quelque chose ; il relie deux
          mots. <span className="fr">est</span> est le verbe{" "}
          <span className="fr">être</span>.
        </p>
        <div className="example">
          Paul <strong>et</strong> Marie. · Le café <strong>est</strong> chaud. ·
          Il <strong>est</strong> tard <strong>et</strong> je suis fatigué.
        </div>

        <h3>on / ont</h3>
        <p>
          <span className="fr">on</span> est un sujet : il remplace{" "}
          <span className="fr">nous</span> ou <span className="fr">les gens</span>
          . <span className="fr">ont</span> est le verbe{" "}
          <span className="fr">avoir</span> au pluriel.
        </p>
        <div className="example">
          <strong>On</strong> mange à huit heures. · Ils <strong>ont</strong>{" "}
          répondu. · <strong>On</strong> dit qu’ils <strong>ont</strong>{" "}
          déménagé.
        </div>

        <h3>son / sont</h3>
        <p>
          <span className="fr">son</span> dit à qui la chose appartient ; on peut
          le remplacer par <span className="fr">mon</span>.{" "}
          <span className="fr">sont</span> est le verbe{" "}
          <span className="fr">être</span> au pluriel.
        </p>
        <div className="example">
          <strong>Son</strong> frère travaille ici. · Les enfants{" "}
          <strong>sont</strong> partis. · <strong>Son</strong> sac et{" "}
          <strong>son</strong> manteau <strong>sont</strong> sur la table.
        </div>
      </section>

      <section>
        <h2>ou / où : le cas à part</h2>

        <div className="rule">
          Ici, aucun des deux n’est un verbe, donc le test du remplacement
          change : <span className="fr">ou</span> peut se remplacer par{" "}
          <span className="fr">ou bien</span>.{" "}
          <span className="fr">où</span>, avec son accent, parle toujours d’un{" "}
          <strong>lieu</strong> ou d’un <strong>moment</strong>.
        </div>

        <div className="example">
          Du thé <strong>ou</strong> du café ? → du thé{" "}
          <strong>ou bien</strong> du café ? ✓
          <br />
          <strong>Où</strong> est la gare ? · Le jour <strong>où</strong> je
          suis arrivé.
        </div>

        <div className="astuce">
          <p className="astuce-hook">L’accent penche vers le lieu</p>
          <p>
            <span className="fr">à</span>, <span className="fr">où</span> : les
            deux mots accentués de cette page indiquent un endroit ou un moment,
            jamais une action. Le moyen le plus sûr reste le remplacement, mais
            quand vous hésitez une seconde de trop, l’accent est un bon indice.
          </p>
        </div>

        <div className="attention">
          ces tests marchent parce que l’un des deux mots est un verbe, qu’on
          compare à un autre temps du même verbe. Ils ne disent rien des paires
          où aucun des deux n’en est un — <span className="fr">ces / ses</span>,{" "}
          <span className="fr">mais / mes</span>,{" "}
          <span className="fr">ce / se</span> demandent un autre raisonnement.
        </div>
      </section>
    </article>
  );
}
