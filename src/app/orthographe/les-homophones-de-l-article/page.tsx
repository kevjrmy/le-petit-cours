import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-homophones-de-l-article";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>la, l’a, là : trois mots pour un son</h2>

        <p>
          Trois façons d’écrire la même syllabe. La première appartient au nom
          ou au verbe qu’elle accompagne, la deuxième est le verbe{" "}
          <span className="fr">avoir</span>, la troisième est un adverbe. Chacune
          a son remplacement.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Le remplacement qui décide, mot par mot</caption>
            <thead>
              <tr>
                <th scope="col">Le mot</th>
                <th scope="col">Ce que c’est</th>
                <th scope="col">Remplacez par</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  la
                </th>
                <td>un article, ou un pronom devant le verbe</td>
                <td className="fr">les</td>
                <td className="fr">la maison · je la vois</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  l’a
                </th>
                <td>le verbe avoir, avec un pronom collé</td>
                <td className="fr">l’avait</td>
                <td className="fr">il l’a vue</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  là
                </th>
                <td>un adverbe : l’endroit</td>
                <td className="fr">ici</td>
                <td className="fr">pose-le là</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example">
          je <strong>la</strong> vois → je <strong>les</strong> vois ✓ pronom
          <br />
          il <strong>l’a</strong> vue → il <strong>l’avait</strong> vue ✓ verbe
          <br />
          pose-le <strong>là</strong> → pose-le <strong>ici</strong> ✓ adverbe
        </div>

        <div className="attention">
          <span className="fr">l’a</span> est toujours suivi d’un participe
          passé, parce que c’est un passé composé auquel il manque le sujet :{" "}
          <span className="fr">il l’a pris</span>,{" "}
          <span className="fr">elle l’a compris</span>. Si aucun participe ne
          suit, ce n’est pas <span className="fr">l’a</span>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            L’accent de <strong>là</strong> se retrouve dans tous ses composés.
          </p>
          <p>
            <span className="fr">voilà</span>,{" "}
            <span className="fr">là-bas</span>,{" "}
            <span className="fr">ce jour-là</span>,{" "}
            <span className="fr">celui-là</span> portent le même{" "}
            <span className="fr">à</span> accentué, et pour la même raison : ils
            montrent un endroit ou un moment. Les formes en{" "}
            <span className="fr">-là</span> collées au nom sont dans{" "}
            <Link href="/grammaire/les-determinants-demonstratifs">
              Les déterminants démonstratifs
            </Link>
            .
          </p>
        </div>
      </section>

      <section>
        <h2>des ou dès : l’accent change le mot</h2>

        <div className="rule">
          <span className="fr">des</span> est un article : il annonce un nom au
          pluriel. <span className="fr">dès</span>, avec son accent grave, est
          une préposition de temps et signifie{" "}
          <span className="fr">à partir de</span>.
        </div>

        <div className="example">
          <strong>Des</strong> enfants jouent dans la cour.
          <br />
          <strong>Dès</strong> huit heures, le magasin est ouvert. →{" "}
          <strong>À partir de</strong> huit heures. ✓
        </div>

        <p>
          C’est le raisonnement de <span className="fr">ou / où</span> dans{" "}
          <Link href="/orthographe/les-homophones">Les homophones</Link> :
          l’accent penche du côté du repère, ici un repère dans le temps. Sans
          accent, le mot est un article, et il faut un nom pluriel derrière lui.
        </p>

        <div className="attention">
          <span className="fr">dès</span> se place devant un moment, jamais
          devant une durée : on écrit{" "}
          <span className="fr">dès demain</span>,{" "}
          <span className="fr">dès son arrivée</span>, mais{" "}
          <span className="fr">pendant deux heures</span>. Un moment répond à{" "}
          <span className="fr">quand ?</span>, une durée à{" "}
          <span className="fr">combien de temps ?</span>
        </div>
      </section>

      <section>
        <h2>du ou dû : l’accent du participe</h2>

        <div className="rule">
          <span className="fr">du</span> est un article.{" "}
          <span className="fr">dû</span> est le participe passé du verbe{" "}
          <span className="fr">devoir</span>, et son accent circonflexe n’est là
          que pour le distinguer de l’autre.
        </div>

        <div className="example">
          Je bois <strong>du</strong> café.
          <br />
          Il a <strong>dû</strong> partir plus tôt. → Il a{" "}
          <strong>pu</strong> partir plus tôt. ✓ participe
        </div>

        <p>
          Le test est le même que pour tous les participes : remplacez le mot
          par un autre participe passé. Si la phrase tient, l’accent est
          nécessaire.
        </p>

        <div className="attention">
          l’accent ne survit qu’au masculin singulier. Dès que le participe
          s’accorde, il le perd : <span className="fr">dû</span>, mais{" "}
          <span className="fr">due</span>, <span className="fr">dus</span>,{" "}
          <span className="fr">dues</span>. C’est la preuve que l’accent
          distingue et ne prononce rien.
        </div>

        <div className="exception">
          le nom <span className="fr">le dû</span> existe, au sens de ce qu’on
          doit à quelqu’un : <span className="fr">réclamer son dû</span>. Il est
          rare, et il garde l’accent.
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">la</span> se remplace par{" "}
            <span className="fr">les</span>, <span className="fr">l’a</span> par{" "}
            <span className="fr">l’avait</span>, <span className="fr">là</span>{" "}
            par <span className="fr">ici</span>.
          </li>
          <li>
            <span className="fr">l’a</span> est toujours suivi d’un participe
            passé.
          </li>
          <li>
            <span className="fr">dès</span> vaut{" "}
            <span className="fr">à partir de</span> ;{" "}
            <span className="fr">des</span> annonce un nom pluriel.
          </li>
          <li>
            <span className="fr">dû</span> est le participe de{" "}
            <span className="fr">devoir</span> et se remplace par un autre
            participe.
          </li>
          <li>
            L’accent de <span className="fr">dû</span> disparaît dès l’accord :{" "}
            <span className="fr">due</span>, <span className="fr">dus</span>,{" "}
            <span className="fr">dues</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
