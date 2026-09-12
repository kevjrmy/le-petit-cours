import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/musique/la-vie-en-rose";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Une expression, puis une chanson</h2>

        <p>
          Paroles d’Édith Piaf, musique de Louiguy, 1945. Piaf l’enregistre
          l’année suivante, et c’est devenu la chanson française la plus connue
          hors de France.
        </p>

        <div className="rule">
          Le titre vient d’une expression qui existait avant la chanson :{" "}
          <span className="fr">voir la vie en rose</span>, c’est voir la vie du
          bon côté, être heureux au point que tout paraît beau.
        </div>

        <div className="attention">
          en français, la couleur du bonheur est le{" "}
          <span className="fr">rose</span>, jamais le rouge.{" "}
          <span className="fr">voir la vie en rouge</span> ne veut rien dire. La
          couleur des idées noires, elle, est bien le noir :{" "}
          <span className="fr">broyer du noir</span>, c’est être triste.
        </div>

        <p>
          L’expression s’emploie encore aujourd’hui, souvent au négatif pour
          dire qu’on est lucide : <span className="fr">je ne vois pas la vie en
          rose</span>, ou <span className="fr">il voit tout en rose</span> pour
          dire de quelqu’un qu’il est un peu naïf.
        </p>
      </section>

      <section>
        <h2>Le refrain, mot à mot</h2>

        <p>
          Trois vers suffisent à montrer pourquoi cette chanson se retient : il
          n’y a pas un mot rare dedans.
        </p>

        <div className="example">
          <p>
            Quand il me prend dans ses bras,
            <br />
            Il me parle tout bas,
            <br />
            Je vois la vie en rose.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les trois expressions du refrain, définies</caption>
            <thead>
              <tr>
                <th scope="col">Expression</th>
                <th scope="col">Définition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  prendre dans ses bras
                </th>
                <td>serrer quelqu’un contre soi</td>
                <td className="fr">
                  Elle a pris son fils dans ses bras avant de partir.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tout bas
                </th>
                <td>très doucement, presque sans voix</td>
                <td className="fr">Il a répondu tout bas, pour ne pas réveiller le bébé.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  voir la vie en rose
                </th>
                <td>trouver que tout est beau, être heureux</td>
                <td className="fr">Depuis qu’elle a ce travail, elle voit la vie en rose.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rule">
          <span className="fr">il me prend</span>,{" "}
          <span className="fr">il me parle</span> : le pronom se place{" "}
          <strong>avant</strong> le verbe, et jamais après. C’est la règle
          générale en français, et le refrain la donne deux fois de suite.
        </div>
      </section>

      <section>
        <h2>« C’est lui pour moi » : les pronoms toniques</h2>

        <p>
          Plus loin, la chanson dit{" "}
          <span className="fr">c’est lui pour moi, moi pour lui</span>. Ce{" "}
          <span className="fr">moi</span> n’est pas le même mot que le{" "}
          <span className="fr">me</span> du refrain : après une préposition, le
          français emploie une autre série de pronoms.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              La forme qu’un pronom prend après pour, avec, chez, sans
            </caption>
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col">Après une préposition</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  je
                </th>
                <td className="fr">moi</td>
                <td className="fr">C’est pour moi.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu
                </th>
                <td className="fr">toi</td>
                <td className="fr">Je viens avec toi.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  il / elle
                </th>
                <td className="fr">lui / elle</td>
                <td className="fr">Nous dînons chez lui.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  nous / vous
                </th>
                <td className="fr">nous / vous</td>
                <td className="fr">Il est parti sans nous.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ils / elles
                </th>
                <td className="fr">eux / elles</td>
                <td className="fr">Elle travaille pour eux.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          on dit <span className="fr">pour moi</span>, jamais{" "}
          <span className="fr">pour je</span>. Deux formes seulement se
          ressemblent d’une colonne à l’autre,{" "}
          <span className="fr">nous</span> et <span className="fr">vous</span> ;
          toutes les autres changent, et{" "}
          <span className="fr">eux</span> n’existe que dans cette colonne.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">voir la vie en rose</span> veut dire trouver
            que tout est beau ; la chanson est née de l’expression, pas
            l’inverse.
          </li>
          <li>
            La couleur du bonheur est le rose, celle de la tristesse le noir.
          </li>
          <li>
            Le refrain ne contient aucun mot rare : c’est ce qui le rend
            chantable au bout de trois écoutes.
          </li>
          <li>
            <span className="fr">me</span>, <span className="fr">te</span>,{" "}
            <span className="fr">le</span> se placent avant le verbe.
          </li>
          <li>
            Après <span className="fr">pour</span>,{" "}
            <span className="fr">avec</span>, <span className="fr">chez</span>,{" "}
            <span className="fr">sans</span>, on emploie{" "}
            <span className="fr">moi</span>, <span className="fr">toi</span>,{" "}
            <span className="fr">lui</span>, <span className="fr">eux</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
