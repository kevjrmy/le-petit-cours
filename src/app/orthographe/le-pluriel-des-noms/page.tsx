import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { RelatedLinks } from "@/components/lesson/RelatedLinks";

const PATH = "/orthographe/le-pluriel-des-noms";

export const metadata = lessonMetadata(PATH);

/* Heritage track: written in French, for a reader who already speaks it and
   needs the spelling rather than the language (docs/decisions.md #16). */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La règle générale</h2>
        <p>
          Au pluriel, le nom prend un <strong>-s</strong>. On ne l&rsquo;entend
          pas : c&rsquo;est le déterminant qui s&rsquo;entend, et c&rsquo;est lui
          qui vous dit qu&rsquo;il faut l&rsquo;écrire.
        </p>

        <div className="example">
          un chat → des chats · une porte → des portes · le livre → les livres
        </div>

        <div className="rule">
          Les noms déjà terminés par <strong>-s</strong>, <strong>-x</strong> ou{" "}
          <strong>-z</strong> ne changent pas.
        </div>

        <div className="example">
          un pays → des pays · une voix → des voix · un nez → des nez
        </div>
      </section>

      <section>
        <h2>Les pluriels en -x</h2>
        <p>
          Deux familles de noms font leur pluriel en <strong>-x</strong> et non
          en <strong>-s</strong>.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Terminaisons qui font leur pluriel en -x</caption>
            <thead>
              <tr>
                <th scope="col">Terminaison</th>
                <th scope="col">Pluriel</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">-au, -eau, -eu</th>
                <td>-x</td>
                <td>un bateau → des bateaux</td>
              </tr>
              <tr>
                <th scope="row">-al</th>
                <td>-aux</td>
                <td>un cheval → des chevaux</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          <strong>pneu</strong> et <strong>bleu</strong> prennent un{" "}
          <strong>-s</strong> : des pneus, des bleus. Et sept noms en{" "}
          <strong>-al</strong> font leur pluriel en <strong>-als</strong> :{" "}
          bal, carnaval, festival, chacal, récital, régal, cérémonial.
        </div>

        <div className="attention">
          une règle raccourcie est une règle fausse. « Les noms en -al font -aux »
          se dit vite, mais il faut dire les exceptions dans la même phrase,
          sinon vous apprendrez « des carnavaux ».
        </div>
      </section>

      <RelatedLinks path={PATH} />
    </article>
  );
}
