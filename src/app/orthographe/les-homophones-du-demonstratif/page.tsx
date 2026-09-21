import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-homophones-du-demonstratif";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>ce ou se : ce qui suit décide</h2>

        <p>
          Huit mots, quatre prononciations : les paires ci-dessous ne se
          distinguent qu’à l’écrit. Et le test qui sépare{" "}
          <Link href="/orthographe/les-homophones">les autres homophones</Link>,
          remplacer le mot par le même verbe à un autre temps, ne sert à rien
          ici : aucun des deux mots n’est un verbe.
        </p>

        <div className="rule">
          <span className="fr">ce</span> montre, et se place devant un nom.{" "}
          <span className="fr">se</span> appartient au verbe, et se place devant
          lui. Le mot qui suit suffit donc à décider.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Deux mots, deux places, deux remplacements</caption>
            <thead>
              <tr>
                <th scope="col">Le mot</th>
                <th scope="col">Sa place</th>
                <th scope="col">Le test</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  ce
                </th>
                <td>devant un nom</td>
                <td>
                  remplacez par <span className="fr">le</span>
                </td>
                <td className="fr">ce train part tôt</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  se
                </th>
                <td>devant un verbe</td>
                <td>
                  mettez la phrase à <span className="fr">je</span> :{" "}
                  <span className="fr">me</span>
                </td>
                <td className="fr">il se lève tôt</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          il <strong>se</strong> lave → je <strong>me</strong> lave ✓ verbe
          pronominal
          <br />
          <strong>ce</strong> matin → <strong>le</strong> matin ✓ déterminant
        </div>

        <div className="attention">
          <span className="fr">ce</span> se place aussi devant{" "}
          <span className="fr">qui</span>, <span className="fr">que</span> et le
          verbe <span className="fr">être</span> conjugué :{" "}
          <span className="fr">ce que je veux</span>,{" "}
          <span className="fr">ce sera long</span>,{" "}
          <span className="fr">ce sont mes clés</span>.{" "}
          <span className="fr">se</span> n’y apparaît jamais : il lui faut un
          verbe dont il est le pronom, et <span className="fr">être</span> n’en
          est pas un.
        </div>
      </section>

      <section>
        <h2>ces ou ses : montrer, ou dire à qui</h2>

        <div className="rule">
          <span className="fr">ces</span> montre les objets ;{" "}
          <span className="fr">ses</span> dit à qui ils appartiennent. Les deux
          sont au pluriel, les deux se placent devant le même nom, et rien dans
          la prononciation ne les sépare. Le test est d’ajouter{" "}
          <strong>-là</strong> après le nom : si la phrase tient, c’est{" "}
          <span className="fr">ces</span>.
        </div>

        <div className="example">
          <strong>Ces</strong> chaussures sont neuves. →{" "}
          <strong>Ces chaussures-là</strong> sont neuves. ✓
          <br />
          Il a perdu <strong>ses</strong> chaussures. → Il a perdu{" "}
          <strong>les siennes</strong>. ✓
        </div>

        <p>
          Le second test est le plus sûr quand le premier hésite : remplacez par{" "}
          <span className="fr">les siens</span> ou{" "}
          <span className="fr">les siennes</span>. Si la phrase garde son sens,
          le mot dit un possesseur, et il s’écrit{" "}
          <span className="fr">ses</span>. Les formes complètes du possessif
          sont dans{" "}
          <Link href="/orthographe/les-determinants-possessifs">
            Les déterminants possessifs
          </Link>
          .
        </p>

        <div className="attention">
          les deux phrases peuvent être justes toutes les deux.{" "}
          <span className="fr">Il range ces livres</span> et{" "}
          <span className="fr">Il range ses livres</span> se disent, se lisent
          et ne veulent pas dire la même chose. Ce n’est pas le test qui
          tranche, c’est vous : écrivez{" "}
          <span className="fr">ces</span> si vous montrez,{" "}
          <span className="fr">ses</span> si vous dites à qui ils sont.
        </div>
      </section>

      <section>
        <h2>c’est, s’est, ça, sa</h2>

        <div className="rule">
          Les deux dernières paires suivent la même logique que la première :{" "}
          <span className="fr">c’</span> et <span className="fr">ça</span> sont
          du côté de <span className="fr">cela</span>,{" "}
          <span className="fr">s’</span> et <span className="fr">sa</span> du
          côté de la personne. Chacune a son remplacement.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Le mot par lequel remplacer, et ce qu’il prouve</caption>
            <thead>
              <tr>
                <th scope="col">Le mot</th>
                <th scope="col">Remplacez par</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  c’est
                </th>
                <td className="fr">cela est</td>
                <td className="fr">C’est loin d’ici.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  s’est
                </th>
                <td className="fr">je me suis</td>
                <td className="fr">Il s’est levé à six heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ça
                </th>
                <td className="fr">cela</td>
                <td className="fr">Ça ne marche plus.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  sa
                </th>
                <td className="fr">ma</td>
                <td className="fr">Sa voiture est en panne.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <span className="fr">s’est</span> ne voyage jamais seul : il est
          suivi d’un participe passé, parce qu’il appartient à un verbe
          pronominal au passé composé.{" "}
          <span className="fr">c’est</span>, lui, est suivi d’un nom ou d’un
          adjectif.
        </p>

        <div className="example">
          Il <strong>s’est</strong> trompé de train. → Je{" "}
          <strong>me suis</strong> trompé de train. ✓
          <br />
          <strong>C’est</strong> encore loin. → <strong>Cela est</strong> encore
          loin. ✓
        </div>

        <div className="attention">
          <span className="fr">ça</span> ne prend pas d’accent sur le{" "}
          <span className="fr">a</span>. La forme{" "}
          <span className="fr">çà</span> existe, mais seulement dans
          l’expression <span className="fr">çà et là</span>, que vous n’aurez
          sans doute jamais à écrire. La cédille, elle, est obligatoire :{" "}
          <span className="fr">ca</span> se lirait{" "}
          <span className="fr">ka</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Une seule question pour les quatre paires : ce qui suit est-il un
            verbe ?
          </p>
          <p>
            <span className="fr">se</span> et <span className="fr">s’est</span>{" "}
            vivent avec un verbe et pas sans lui.{" "}
            <span className="fr">ce</span>, <span className="fr">ces</span>,{" "}
            <span className="fr">sa</span> et <span className="fr">ses</span>{" "}
            vivent avec un nom. Regardez le mot d’après avant de choisir la
            lettre du début.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">ce</span> précède un nom et se remplace par{" "}
            <span className="fr">le</span> ; <span className="fr">se</span>{" "}
            précède un verbe et devient <span className="fr">me</span> à la
            première personne.
          </li>
          <li>
            <span className="fr">ces</span> accepte{" "}
            <span className="fr">-là</span> après le nom ;{" "}
            <span className="fr">ses</span> se remplace par{" "}
            <span className="fr">les siens</span>.
          </li>
          <li>
            Quand les deux tiennent, c’est le sens qui décide : montrer, ou dire
            à qui.
          </li>
          <li>
            <span className="fr">c’est</span> vaut{" "}
            <span className="fr">cela est</span> ;{" "}
            <span className="fr">s’est</span> se met à la première personne et
            donne <span className="fr">je me suis</span>, toujours devant un
            participe passé.
          </li>
          <li>
            <span className="fr">ça</span> vaut <span className="fr">cela</span>{" "}
            et porte une cédille, jamais un accent ;{" "}
            <span className="fr">sa</span> se remplace par{" "}
            <span className="fr">ma</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
