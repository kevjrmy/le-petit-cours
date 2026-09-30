import { Quiz } from "./quiz";

/* The A1 body (#85, #92): explained in Spanish, the prologue in Hugo's
   French with the course's own Spanish beside each line, translated from
   the French (#60). The French lines are the A2 body's, word for word. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          William Shakespeare · <em lang="fr">Roméo et Juliette</em> · hacia
          1595 · traducido al francés por François-Victor Hugo, 1868 · el
          prólogo
        </p>

        <p>
          Shakespeare no escribió en francés: el texto que lees es la
          traducción de François-Victor Hugo, hijo de Victor Hugo. Antes de la
          obra, un actor sale delante del telón y cuenta toda la historia: en
          Verona, dos familias, los Capuleto y los Montesco, se odian. Un chico
          y una chica de esas dos familias se enamoran, y su muerte termina con
          el odio.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">Deux familles, égales en noblesse,</span>
            <span lang="es">Dos familias, iguales en nobleza,</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Dans la belle Vérone, où nous plaçons notre scène,</span>
            <span lang="es">en la bella Verona, donde situamos nuestra escena,</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Sont entraînées par d’anciennes rancunes à des rixes nouvelles</span>
            <span lang="es">son arrastradas por viejos rencores a nuevas peleas</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Où le sang des citoyens souille les mains des citoyens.</span>
            <span lang="es">donde la sangre de los ciudadanos mancha las manos de los ciudadanos.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Des entrailles prédestinées de ces deux ennemies</span>
            <span lang="es">De las entrañas predestinadas de estas dos enemigas</span>
          </p>
          <p className="bilingue">
            <span lang="fr">A pris naissance, sous des étoiles contraires, un couple d’amoureux</span>
            <span lang="es">ha nacido, bajo estrellas contrarias, una pareja de enamorados</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Dont la ruine néfaste et lamentable</span>
            <span lang="es">cuya ruina funesta y lamentable</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Doit ensevelir dans leur tombe l’animosité de leurs parents.</span>
            <span lang="es">debe enterrar en su tumba el odio de sus padres.</span>
          </p>
        </div>

        <div className="attention">
          en las líneas 5 y 6, el sujeto llega al final. En orden normal:{" "}
          <span className="fr" lang="fr">
            un couple d’amoureux a pris naissance
          </span>{" "}
          (una pareja de enamorados ha nacido). Es un orden de poesía; hablando,
          el sujeto va delante del verbo.
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>Las palabras que necesitas para leer el prólogo</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">la rancune</th>
                <td>el rencor, un enfado antiguo que se guarda mucho tiempo</td>
                <td className="fr" lang="fr">
                  Les deux familles gardent une vieille rancune.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la rixe</th>
                <td>la pelea, la riña en la calle</td>
                <td className="fr" lang="fr">La rixe commence sur la place.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le sang</th>
                <td>
                  la sangre; en francés es masculino:{" "}
                  <span className="fr" lang="fr">le sang</span>
                </td>
                <td className="fr" lang="fr">Il a du sang sur les mains.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">souiller</th>
                <td>manchar, ensuciar</td>
                <td className="fr" lang="fr">Le sang souille ses mains.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">un amoureux</th>
                <td>
                  un enamorado; <span className="fr" lang="fr">une amoureuse</span>,
                  una enamorada
                </td>
                <td className="fr" lang="fr">Roméo et Juliette sont amoureux.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ensevelir</th>
                <td>enterrar, poner bajo tierra</td>
                <td className="fr" lang="fr">On ensevelit les morts.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la tombe</th>
                <td>la tumba</td>
                <td className="fr" lang="fr">
                  Les deux amoureux sont dans la même tombe.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">les parents</th>
                <td>
                  el padre y la madre, no los <em>parientes</em>. Los parientes
                  son <span className="fr" lang="fr">la famille</span>
                </td>
                <td className="fr" lang="fr">
                  Les parents de Juliette sont des Capulets.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section lang="es">
        <h2>¿Lo has entendido?</h2>

        <p>
          Contesta sin volver a leer. Después, vuelve al texto para las
          preguntas que has fallado.
        </p>

        <Quiz />
      </section>
    </>
  );
}
