import { Quiz } from "./quiz";

/* A1 (#85, #92): the first stanza and the refrain, one verse line per pair,
   the French exactly as a2.tsx quotes it; the Spanish is the course's own. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          Charles Baudelaire · <em lang="fr">Les Fleurs du mal</em> · 1857 ·{" "}
          <em lang="fr">L’Invitation au voyage</em> · la primera estrofa y el
          estribillo
        </p>

        <p>
          Es el principio del poema. Un hombre habla a la mujer que ama y le
          propone irse con él a vivir a otro país. No dice nunca dónde está ese
          país: solo que se parece a ella. Debajo de cada verso en francés
          tienes la traducción: lee primero el francés, y baja al español solo
          si te pierdes.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">Mon enfant, ma sœur,</span>
            <span lang="es">Niña mía, hermana mía,</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Songe à la douceur</span>
            <span lang="es">¡piensa en la dulzura</span>
          </p>
          <p className="bilingue">
            <span lang="fr">D’aller là-bas vivre ensemble !</span>
            <span lang="es">de irnos allí a vivir juntos!</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Aimer à loisir,</span>
            <span lang="es">¡Amar sin prisa,</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Aimer et mourir</span>
            <span lang="es">amar y morir</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Au pays qui te ressemble !</span>
            <span lang="es">en el país que se parece a ti!</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Les soleils mouillés</span>
            <span lang="es">Los soles mojados</span>
          </p>
          <p className="bilingue">
            <span lang="fr">De ces ciels brouillés</span>
            <span lang="es">de esos cielos nublados</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Pour mon esprit ont les charmes</span>
            <span lang="es">tienen para mi espíritu los encantos</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Si mystérieux</span>
            <span lang="es">tan misteriosos</span>
          </p>
          <p className="bilingue">
            <span lang="fr">De tes traîtres yeux,</span>
            <span lang="es">de tus ojos traidores,</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Brillant à travers leurs larmes.</span>
            <span lang="es">que brillan a través de sus lágrimas.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Là, tout n’est qu’ordre et beauté,</span>
            <span lang="es">Allí todo es orden y belleza,</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Luxe, calme et volupté.</span>
            <span lang="es">lujo, calma y placer.</span>
          </p>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">mon enfant</span> y{" "}
          <span className="fr" lang="fr">ma sœur</span> no hablan de la familia:
          son palabras cariñosas para la mujer que ama. Los dos últimos versos
          son el estribillo; en el poema aparecen tres veces, sin cambiar una
          palabra.
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>Las palabras que necesitas para leer el poema</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">songer à</th>
                <td>
                  pensar en, imaginar. Parece <em>soñar</em>, pero no lo es:
                  soñar es <span className="fr" lang="fr">rêver</span>
                </td>
                <td className="fr" lang="fr">Je songe à mes vacances.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la douceur</th>
                <td>la dulzura, lo suave y agradable</td>
                <td className="fr" lang="fr">J’aime la douceur du soir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ensemble</th>
                <td>juntos</td>
                <td className="fr" lang="fr">Nous vivons ensemble.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">à loisir</th>
                <td>sin prisa, todo lo que quieras</td>
                <td className="fr" lang="fr">Ici, on peut lire à loisir.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ressembler à</th>
                <td>parecerse a</td>
                <td className="fr" lang="fr">Elle ressemble à sa mère.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">mouillé</th>
                <td>mojado; en el poema, un sol que sale después de la lluvia</td>
                <td className="fr" lang="fr">Mon manteau est mouillé.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">une larme</th>
                <td>una lágrima</td>
                <td className="fr" lang="fr">Elle a des larmes dans les yeux.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la volupté</th>
                <td>un placer intenso, de los sentidos</td>
                <td className="fr" lang="fr">Luxe, calme et volupté.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section lang="es">
        <h2>¿Lo has entendido?</h2>

        <p>
          Contesta sin volver a leer. Después, vuelve al poema para las
          preguntas que has fallado.
        </p>

        <Quiz />
      </section>
    </>
  );
}
