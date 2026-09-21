import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/ce-qui-ce-que-ce-dont";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La chose qu’on ne nomme pas</h2>

        <div className="rule">
          Quand ce qu’on reprend n’a pas de nom, parce que c’est une idée, une
          phrase entière ou quelque chose qu’on ignore, le pronom n’est ni{" "}
          <span className="fr">celui</span> ni <span className="fr">celle</span>{" "}
          : c’est <strong>ce</strong>. Derrière lui,{" "}
          <strong>qui</strong> quand il est le sujet du verbe qui suit,{" "}
          <strong>que</strong> quand il en est le complément.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Ce qui vient juste après décide de la forme</caption>
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
                  ce qui
                </th>
                <td>un verbe, tout de suite</td>
                <td className="fr">Je ne sais pas ce qui s’est passé.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ce que
                </th>
                <td>un sujet, puis un verbe</td>
                <td className="fr">Je ne comprends pas ce que tu dis.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Le test tient en un coup d’œil : regardez le mot juste après. Un verbe
          ? Il lui manque un sujet, et la forme est{" "}
          <span className="fr">ce qui</span>. Un sujet ? Le verbe a déjà le sien,
          et la forme est <span className="fr">ce que</span>.
        </p>

        <div className="example">
          Dis-moi <strong>ce qui</strong> ne va pas. · Fais{" "}
          <strong>ce que</strong> tu veux.
          <br />
          Elle a compris <strong>ce qui</strong> m’inquiétait, et{" "}
          <strong>ce que</strong> j’attendais d’elle.
        </div>

        <div className="attention">
          <span className="fr">ce que</span> s’élide devant une voyelle et
          devient <span className="fr">ce qu’</span> :{" "}
          <span className="fr">ce qu’il dit</span>,{" "}
          <span className="fr">ce qu’elle veut</span>.{" "}
          <span className="fr">ce qui</span> ne s’élide jamais : on écrit{" "}
          <span className="fr">ce qui est arrivé</span>, jamais{" "}
          <span className="fr">ce qu’est arrivé</span>. L’apostrophe est donc le
          signe qu’un sujet suit.
        </div>

        <p>
          Après <span className="fr">tout</span>, les deux formes ne changent
          pas : <span className="fr">tout ce qui brille</span>,{" "}
          <span className="fr">tout ce que je sais</span>.
        </p>

        <p>
          Quand la chose reprise a un nom, le pronom redevient{" "}
          <span className="fr">celui</span> ou <span className="fr">celle</span>
          , expliqué dans{" "}
          <Link href="/grammaire/les-pronoms-demonstratifs">
            Les pronoms démonstratifs
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>ce dont : quand le verbe réclame « de »</h2>

        <div className="rule">
          Certains verbes ne se construisent pas directement : on parle{" "}
          <span className="fr">de</span> quelque chose, on a besoin{" "}
          <span className="fr">de</span> quelque chose, on se souvient{" "}
          <span className="fr">de</span> quelque chose. Quand ce complément n’a
          pas de nom, la forme est <strong>ce dont</strong>.
        </div>

        <div className="example">
          C’est exactement <strong>ce dont</strong> j’ai besoin.
          <br />
          Je n’ai pas compris <strong>ce dont</strong> tu parles.
          <br />
          <strong>Ce dont</strong> elle se souvient le mieux, c’est le bruit de
          la mer.
        </div>

        <p>
          Le choix ne dépend pas du sens de la phrase mais du verbe. Posez-vous
          la question avec le verbe seul : on dit quelque chose, donc{" "}
          <span className="fr">ce que je dis</span> ; on parle de quelque chose,
          donc <span className="fr">ce dont je parle</span>.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Le verbe décide, pas la chose dont on parle</caption>
            <thead>
              <tr>
                <th scope="col">Le verbe</th>
                <th scope="col">Sa construction</th>
                <th scope="col">La forme</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  dire
                </th>
                <td className="fr">dire quelque chose</td>
                <td className="fr">ce que je dis</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  parler
                </th>
                <td className="fr">parler de quelque chose</td>
                <td className="fr">ce dont je parle</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  avoir besoin
                </th>
                <td className="fr">avoir besoin de quelque chose</td>
                <td className="fr">ce dont j’ai besoin</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  attendre
                </th>
                <td className="fr">attendre quelque chose</td>
                <td className="fr">ce que j’attends</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          quelques verbes réclament <span className="fr">à</span> plutôt que{" "}
          <span className="fr">de</span>, et la forme devient alors{" "}
          <span className="fr">ce à quoi</span> :{" "}
          <span className="fr">ce à quoi je pense</span>,{" "}
          <span className="fr">ce à quoi il s’attendait</span>. Elle est rare et
          se retient avec les deux verbes qui la demandent,{" "}
          <span className="fr">penser à</span> et{" "}
          <span className="fr">s’attendre à</span>, plutôt que comme une règle.
        </div>
      </section>

      <section>
        <h2>Ce qui compte, c’est…</h2>

        <div className="rule">
          Ces trois formes servent aussi à mettre un mot en avant. La phrase
          s’ouvre par <strong>ce qui</strong>, <strong>ce que</strong> ou{" "}
          <strong>ce dont</strong>, et se referme par{" "}
          <strong>c’est</strong>, qui annonce enfin l’élément important.
        </div>

        <div className="example">
          <strong>Ce qui</strong> compte, <strong>c’est</strong> d’essayer.
          <br />
          <strong>Ce que</strong> je veux, <strong>c’est</strong> une réponse
          claire.
          <br />
          <strong>Ce dont</strong> j’ai peur, <strong>c’est</strong> de me
          tromper devant tout le monde.
        </div>

        <p>
          C’est la façon la plus simple d’insister à l’écrit sans changer
          l’ordre des mots partout. La virgule marque la pause de la voix, et
          c’est elle qui fait entendre l’insistance.
        </p>

        <div className="attention">
          devant un nom au pluriel, la reprise s’écrit{" "}
          <span className="fr">ce sont</span> :{" "}
          <span className="fr">ce qui me manque, ce sont les vacances</span>. La
          règle est la même que dans{" "}
          <Link href="/grammaire/c-est-ce-sont">C’est, ce sont</Link>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Deux morceaux, et le second commence toujours par{" "}
            <strong>c’est</strong>.
          </p>
          <p>
            Si vous ouvrez par <span className="fr">ce qui</span> ou{" "}
            <span className="fr">ce que</span>, la phrase n’est pas finie tant
            que <span className="fr">c’est</span> n’est pas arrivé. Une phrase
            comme <span className="fr">ce que je veux une réponse</span> n’a pas
            de milieu : c’est le signe qu’il manque la reprise.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Sans nom à reprendre, le pronom est{" "}
            <span className="fr">ce</span> et non{" "}
            <span className="fr">celui</span>.
          </li>
          <li>
            <span className="fr">ce qui</span> est suivi d’un verbe,{" "}
            <span className="fr">ce que</span> d’un sujet puis d’un verbe. Seul{" "}
            <span className="fr">ce que</span> s’élide.
          </li>
          <li>
            <span className="fr">ce dont</span> s’emploie quand le verbe se
            construit avec <span className="fr">de</span> : parler de, avoir
            besoin de, se souvenir de.
          </li>
          <li>
            Pour insister, on ouvre par{" "}
            <span className="fr">ce qui</span>,{" "}
            <span className="fr">ce que</span> ou{" "}
            <span className="fr">ce dont</span>, et on reprend par{" "}
            <span className="fr">c’est</span>.
          </li>
          <li>
            Devant un nom au pluriel, la reprise s’écrit{" "}
            <span className="fr">ce sont</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
