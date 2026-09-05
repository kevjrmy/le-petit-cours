import { PageHeader } from "@/components/lesson/PageHeader";
import { RelatedLinks } from "@/components/lesson/RelatedLinks";

const PATH = "/vocabulaire/les-nombres";

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <div lang="es">
        <section>
          <h2>De cero a veinte</h2>
          <p>
            Los veinte primeros hay que aprenderlos de memoria: no siguen ninguna
            regla. A partir de <span className="fr" lang="fr">dix-sept</span> ya
            se ve la suma.
          </p>

          <div className="example" lang="fr">
            zéro · un · deux · trois · quatre · cinq · six · sept · huit · neuf ·
            dix
            <br />
            onze · douze · treize · quatorze · quinze · seize · dix-sept ·
            dix-huit · dix-neuf · vingt
          </div>
        </section>

        <section>
          <h2>Las decenas</h2>
          <p>
            Hasta sesenta todo es regular. Después, el francés cuenta de veinte en
            veinte, y ahí es donde tropieza todo el mundo.
          </p>

          <div className="table-wrap">
            <table>
              <caption lang="es">De 60 a 90, y cómo se forma cada uno</caption>
              <thead>
                <tr>
                  <th scope="col">Número</th>
                  <th scope="col" lang="fr">Français</th>
                  <th scope="col">Se lee como</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">60</th>
                  <td className="fr" lang="fr">soixante</td>
                  <td>sesenta</td>
                </tr>
                <tr>
                  <th scope="row">70</th>
                  <td className="fr" lang="fr">soixante-dix</td>
                  <td>60 + 10</td>
                </tr>
                <tr>
                  <th scope="row">80</th>
                  <td className="fr" lang="fr">quatre-vingts</td>
                  <td>4 × 20</td>
                </tr>
                <tr>
                  <th scope="row">90</th>
                  <td className="fr" lang="fr">quatre-vingt-dix</td>
                  <td>4 × 20 + 10</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="astuce">
            <p className="astuce-hook" lang="es">
              71 es «60 + 11», no «70 + 1»
            </p>
            <p>
              <span className="fr" lang="fr">soixante et onze</span>, y luego{" "}
              <span className="fr" lang="fr">soixante-douze</span>,{" "}
              <span className="fr" lang="fr">soixante-treize</span>… hasta{" "}
              <span className="fr" lang="fr">soixante-dix-neuf</span>. Lo mismo a
              partir de 80:{" "}
              <span className="fr" lang="fr">quatre-vingt-onze</span> es 91.
            </p>
          </div>

          <div className="attention">
            <span className="fr" lang="fr">quatre-vingts</span> lleva{" "}
            <strong>-s</strong> cuando va solo, pero lo pierde en cuanto le sigue
            otro número: <span className="fr" lang="fr">quatre-vingt-un</span>,{" "}
            <span className="fr" lang="fr">quatre-vingt-deux</span>.
          </div>
        </section>
      </div>

      <RelatedLinks path={PATH} />
    </article>
  );
}
