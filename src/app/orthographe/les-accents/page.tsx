import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-accents";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Ce qu’un accent français fait, et ne fait pas</h2>

        <div className="rule">
          L’accent français ne dit <strong>jamais</strong> où tombe la syllabe
          forte. Il fait l’un de trois métiers : il{" "}
          <strong>change le son</strong> de la voyelle, il{" "}
          <strong>sépare deux mots</strong> qui s’écriraient pareil, ou il ne
          s’entend pas du tout.
        </div>

        <p>
          C’est pour cela qu’on ne peut pas placer un accent à l’oreille, en
          cherchant l’endroit où l’on appuie. En français, on appuie toujours
          sur la fin du mot, et cela ne s’écrit nulle part.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Les cinq signes, et les lettres sur lesquelles chacun peut se
              poser
            </caption>
            <thead>
              <tr>
                <th scope="col">Signe</th>
                <th scope="col">Son nom</th>
                <th scope="col">Sur quelles lettres</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  é
                </th>
                <td>l’accent aigu</td>
                <td>
                  sur le <span className="fr">e</span> seulement
                </td>
                <td className="fr">février</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  è à ù
                </th>
                <td>l’accent grave</td>
                <td>
                  sur <span className="fr">e</span>,{" "}
                  <span className="fr">a</span>, <span className="fr">u</span>
                </td>
                <td className="fr">père · là · où</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ê â î ô û
                </th>
                <td>l’accent circonflexe</td>
                <td>sur les cinq voyelles</td>
                <td className="fr">même · hôpital · août</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ë ï ü
                </th>
                <td>le tréma</td>
                <td>
                  sur <span className="fr">e</span>,{" "}
                  <span className="fr">i</span>, <span className="fr">u</span>
                </td>
                <td className="fr">Noël · maïs</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ç
                </th>
                <td>la cédille</td>
                <td>
                  sous le <span className="fr">c</span> seulement
                </td>
                <td className="fr">français</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Le tréma dit une seule chose : les deux voyelles se prononcent{" "}
          <strong>séparément</strong>. <span className="fr">Noël</span> se dit
          en deux temps, <span className="fr">maïs</span> aussi. Sans le tréma,
          la première voyelle serait avalée par la seconde.
        </p>

        <div className="attention">
          un accent fait partie du mot, au même titre qu’une lettre. Écrire{" "}
          <span className="fr">eleve</span> pour{" "}
          <span className="fr">élève</span> n’est pas une frappe manquée, c’est
          une faute d’orthographe. Et{" "}
          <span className="fr">ou</span> et <span className="fr">où</span> ne
          sont pas le même mot : les tests qui les séparent sont sur{" "}
          <span className="fr">Les homophones</span>.
        </div>
      </section>

      <section>
        <h2>Sur le e : é, è, ou rien du tout</h2>

        <div className="rule">
          C’est le métier le plus important, et le seul qui s’entende. Sur le{" "}
          <span className="fr">e</span>, l’accent décide de la bouche : presque
          fermée pour <span className="fr">é</span>, nettement ouverte pour{" "}
          <span className="fr">è</span> et <span className="fr">ê</span>.
        </div>

        <div className="example">
          <span className="fr">é</span> : café · école · vous avez parlé
          <br />
          <span className="fr">è ê</span> : père · après · tête · fenêtre
        </div>

        <p>
          Le son ne suffit pourtant pas à choisir, parce que le même son ouvert
          s’écrit tantôt avec un accent, tantôt sans. Trois repères suffisent, et
          ils regardent ce qui suit le <span className="fr">e</span>.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Ce qui suit le e décide de l’accent qu’il porte</caption>
            <thead>
              <tr>
                <th scope="col">Si le e est…</th>
                <th scope="col">On écrit</th>
                <th scope="col">Exemples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  en fin de mot, suivi au plus d’un e ou d’un s muet
                </th>
                <td className="fr">é</td>
                <td className="fr">le marché · l’année · il a mangé</td>
              </tr>
              <tr>
                <th scope="row">suivi d’une consonne, puis d’un e muet</th>
                <td className="fr">è</td>
                <td className="fr">le père · la mère · la règle</td>
              </tr>
              <tr>
                <th scope="row">suivi de deux consonnes, ou fermant le mot</th>
                <td>rien</td>
                <td className="fr">elle · cette · la mer · avec</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          la troisième ligne est le vrai piège.{" "}
          <span className="fr">mer</span>, <span className="fr">elle</span> et{" "}
          <span className="fr">avec</span> se prononcent avec le son ouvert,
          exactement comme <span className="fr">père</span>, et pourtant ils ne
          portent aucun accent. On n’écrit jamais{" "}
          <span className="fr">mèr</span> ni <span className="fr">èlle</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Un mot peut porter les deux, dans cet ordre.
          </p>
          <p>
            <span className="fr">l’élève</span> commence par un{" "}
            <span className="fr">é</span> fermé et finit par un{" "}
            <span className="fr">è</span> ouvert. Lisez le mot lentement et vous
            entendrez les deux bouches. C’est le meilleur mot à garder en tête
            pour vérifier que vous entendez la différence.
          </p>
        </div>
      </section>

      <section>
        <h2>La cédille</h2>

        <div className="rule">
          Le <span className="fr">c</span> se prononce comme un{" "}
          <span className="fr">s</span> devant{" "}
          <span className="fr">e</span> et <span className="fr">i</span>, et
          comme un <span className="fr">k</span> devant{" "}
          <span className="fr">a</span>, <span className="fr">o</span> et{" "}
          <span className="fr">u</span>. La cédille sert à garder le son{" "}
          <span className="fr">s</span> devant ces trois voyelles-là.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Quand le c suffit et quand il faut lui mettre une cédille
            </caption>
            <thead>
              <tr>
                <th scope="col">Devant</th>
                <th scope="col">On écrit</th>
                <th scope="col">Se prononce</th>
                <th scope="col">Exemples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  e, i
                </th>
                <td className="fr">c</td>
                <td className="fr">s</td>
                <td className="fr">le cinéma · douce</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  a, o, u
                </th>
                <td className="fr">ç</td>
                <td className="fr">s</td>
                <td className="fr">français · un garçon · il a reçu</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  a, o, u
                </th>
                <td className="fr">c</td>
                <td className="fr">k</td>
                <td className="fr">le café · l’école · écouter</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          jamais de cédille devant <span className="fr">e</span> ni{" "}
          <span className="fr">i</span>. Le <span className="fr">c</span> y est
          déjà doux, la cédille n’aurait rien à y faire : on écrit{" "}
          <span className="fr">ce</span>, <span className="fr">ci</span>,{" "}
          <span className="fr">cinéma</span>, et jamais{" "}
          <span className="fr">çe</span> ni <span className="fr">çi</span>.
        </div>

        <div className="example">
          nous commen<strong>ç</strong>ons · mais nous commen<strong>c</strong>
          ions
        </div>

        <div className="attention">
          la cédille ne se tape pas sur un clavier espagnol, et{" "}
          <span className="fr">œ</span> non plus. Ce n’est pas une raison pour
          les laisser tomber : <span className="fr">francais</span> et{" "}
          <span className="fr">soeur</span> sont des fautes. Copiez le
          caractère, ou passez le clavier en français le temps d’écrire.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            L’accent français ne marque pas la syllabe forte : il change le son,
            il sépare deux mots, ou il ne s’entend pas.
          </li>
          <li>
            Cinq signes : <span className="fr">é</span> aigu,{" "}
            <span className="fr">è à ù</span> grave,{" "}
            <span className="fr">ê â î ô û</span> circonflexe,{" "}
            <span className="fr">ë ï ü</span> tréma,{" "}
            <span className="fr">ç</span> cédille.
          </li>
          <li>
            Sur le <span className="fr">e</span>, c’est ce qui suit qui décide :{" "}
            <span className="fr">é</span> en fin de mot,{" "}
            <span className="fr">è</span> devant consonne plus{" "}
            <span className="fr">e</span> muet, rien devant deux consonnes.
          </li>
          <li>
            <span className="fr">mer</span>, <span className="fr">elle</span>,{" "}
            <span className="fr">avec</span> sonnent ouvert et ne prennent
            pourtant aucun accent.
          </li>
          <li>
            La cédille garde le son <span className="fr">s</span> devant{" "}
            <span className="fr">a</span>, <span className="fr">o</span>,{" "}
            <span className="fr">u</span>, et ne s’écrit jamais devant{" "}
            <span className="fr">e</span> ni <span className="fr">i</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
