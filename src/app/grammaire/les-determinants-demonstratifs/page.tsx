import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-determinants-demonstratifs";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Quatre formes, décidées par le nom</h2>

        <div className="rule">
          Le déterminant démonstratif se met devant un nom pour le montrer. Il
          s’accorde en genre et en nombre avec ce nom, et il remplace l’article :
          on dit <span className="fr">le livre</span> ou{" "}
          <span className="fr">ce livre</span>, jamais les deux ensemble.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Les quatre formes, et le nom qui décide de chacune</caption>
            <thead>
              <tr>
                <th scope="col">Le nom</th>
                <th scope="col">La forme</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin, devant une consonne</th>
                <td className="fr">ce</td>
                <td className="fr">Ce train part à huit heures.</td>
              </tr>
              <tr>
                <th scope="row">
                  masculin, devant une voyelle ou un{" "}
                  <span className="fr">h</span> muet
                </th>
                <td className="fr">cet</td>
                <td className="fr">Cet homme attend depuis une heure.</td>
              </tr>
              <tr>
                <th scope="row">féminin</th>
                <td className="fr">cette</td>
                <td className="fr">Cette rue monte beaucoup.</td>
              </tr>
              <tr>
                <th scope="row">pluriel, masculin ou féminin</th>
                <td className="fr">ces</td>
                <td className="fr">Ces photos sont anciennes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Une seule forme au pluriel, pour les deux genres :{" "}
          <span className="fr">ces trains</span> et{" "}
          <span className="fr">ces rues</span>. C’est au singulier que le genre
          se voit.
        </p>

        <div className="attention">
          <span className="fr">cet</span> et <span className="fr">cette</span>{" "}
          se prononcent exactement pareil. L’oreille ne sépare rien, le genre du
          nom décide seul : on écrit{" "}
          <span className="fr">cet appartement</span> parce que{" "}
          <span className="fr">appartement</span> est masculin, et{" "}
          <span className="fr">cette école</span> parce que{" "}
          <span className="fr">école</span> est féminin.{" "}
          <span className="fr">cet</span> ne se met jamais devant un nom
          féminin.
        </div>

        <div className="exception">
          devant un <span className="fr">h</span> aspiré, le heurt entre les
          deux voyelles n’a pas lieu et la forme courte revient :{" "}
          <span className="fr">ce héros</span>,{" "}
          <span className="fr">ce hasard</span>,{" "}
          <span className="fr">ce haricot</span>. Ces mots sont peu nombreux et
          s’apprennent un par un, comme pour l’article :{" "}
          <span className="fr">le héros</span> et non{" "}
          <span className="fr">l’héros</span>.
        </div>
      </section>

      <section>
        <h2>Montrer ce qui est près, montrer ce qui est loin</h2>

        <div className="rule">
          Une seule série de formes sert pour tout ce qu’on montre, près ou
          loin. Quand il faut vraiment séparer deux choses, on ajoute{" "}
          <strong>-ci</strong> ou <strong>-là</strong> après le nom :{" "}
          <span className="fr">-ci</span> pour ce qui est près,{" "}
          <span className="fr">-là</span> pour ce qui est plus loin.
        </div>

        <div className="example">
          Je prends <strong>ce pull-ci</strong>, pas{" "}
          <strong>ce pull-là</strong>.
          <br />
          <strong>Cette place-ci</strong> est libre,{" "}
          <strong>cette place-là</strong> est réservée.
        </div>

        <p>
          En français, la distance n’est pas obligatoire : un seul mot montre, et{" "}
          <span className="fr">-ci</span> et <span className="fr">-là</span> ne
          servent qu’à opposer deux choses dans la même phrase. Dites{" "}
          <span className="fr">ce pull</span> quand il n’y en a qu’un à montrer.
        </p>

        <div className="attention">
          le trait d’union est obligatoire, et il se place{" "}
          <strong>après le nom</strong>, pas après le déterminant. On écrit{" "}
          <span className="fr">ce livre-là</span> ; la forme{" "}
          <span className="fr">ce-là livre</span> n’existe pas.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dans la langue de tous les jours, <strong>-là</strong> sert presque
            toujours seul.
          </p>
          <p>
            <span className="fr">donne-moi ce stylo-là</span> s’entend partout,
            y compris pour un objet posé juste devant celui qui parle.{" "}
            <span className="fr">-ci</span>, lui, n’apparaît guère que dans une
            comparaison. Si vous hésitez et que vous ne comparez rien, écrivez{" "}
            <span className="fr">-là</span> ou n’écrivez rien.
          </p>
        </div>
      </section>

      <section>
        <h2>Ce matin, cette semaine : le démonstratif du temps</h2>

        <div className="rule">
          Devant un nom qui dit un moment, le démonstratif désigne le moment où
          l’on parle. <span className="fr">ce matin</span>, c’est le matin
          d’aujourd’hui.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Le moment que l’expression désigne, sans rien ajouter</caption>
            <thead>
              <tr>
                <th scope="col">L’expression</th>
                <th scope="col">Le moment désigné</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  ce matin
                </th>
                <td>le matin d’aujourd’hui</td>
                <td className="fr">Ce matin, j’ai raté le bus.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ce soir
                </th>
                <td>le soir d’aujourd’hui</td>
                <td className="fr">Ce soir, on mange dehors.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  cette semaine
                </th>
                <td>la semaine où l’on est</td>
                <td className="fr">Cette semaine, je travaille beaucoup.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  cette année
                </th>
                <td>l’année où l’on est</td>
                <td className="fr">Cette année, elle apprend le français.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Pour parler d’un moment du passé ou de l’avenir déjà nommé, on
          ajoute <span className="fr">-là</span> :{" "}
          <span className="fr">ce jour-là</span>,{" "}
          <span className="fr">cette année-là</span>,{" "}
          <span className="fr">à ce moment-là</span>. C’est la forme du récit,
          et elle revient dans presque toutes les histoires racontées à
          l’imparfait et au passé composé.
        </p>

        <div className="example">
          <strong>Ce jour-là</strong>, il pleuvait et personne n’est venu.
          <br />
          Nous habitions à Séville : <strong>cette année-là</strong>, nous
          n’avions pas de voiture.
        </div>

        <div className="attention">
          sans <span className="fr">-là</span>, l’expression parle du présent.{" "}
          <span className="fr">ce matin</span> est le matin d’aujourd’hui,{" "}
          <span className="fr">ce matin-là</span> est un matin de l’histoire
          qu’on raconte. Le petit mot change l’époque de la phrase entière.
        </div>

        <div className="exception">
          <span className="fr">ce jour</span> ne se dit pas pour aujourd’hui.
          Pour le jour où l’on parle, le mot est{" "}
          <span className="fr">aujourd’hui</span> ;{" "}
          <span className="fr">ce jour-là</span>, avec{" "}
          <span className="fr">-là</span>, existe et désigne un autre jour.
        </div>

        <p>
          Ces formes racontent : elles vont avec les temps du passé, expliqués
          dans{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait">
            Passé composé ou imparfait ?
          </Link>
          .
        </p>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Quatre formes, choisies par le nom :{" "}
            <span className="fr">ce</span>, <span className="fr">cet</span>,{" "}
            <span className="fr">cette</span>, <span className="fr">ces</span>.
          </li>
          <li>
            <span className="fr">cet</span> est masculin et sert devant une
            voyelle ; <span className="fr">cette</span> est féminin. Les deux se
            prononcent pareil, et seul le genre du nom décide.
          </li>
          <li>
            Le démonstratif remplace l’article : jamais{" "}
            <span className="fr">le</span> et <span className="fr">ce</span>{" "}
            ensemble.
          </li>
          <li>
            <span className="fr">-ci</span> et <span className="fr">-là</span>{" "}
            s’ajoutent après le nom, avec un trait d’union, et seulement pour
            opposer deux choses.
          </li>
          <li>
            Devant un nom de temps, le démonstratif désigne le moment présent ;
            avec <span className="fr">-là</span>, il désigne un moment de
            l’histoire racontée.
          </li>
        </ul>
      </div>
    </article>
  );
}
