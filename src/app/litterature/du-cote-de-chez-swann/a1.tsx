import { Quiz } from "./quiz";

/* The A1 body (#85, #92): explained in Spanish, the opening lines in French
   with the course's own Spanish beside each one. The French is the A2
   body's, cut only where the edition puts a full stop or a semicolon. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          Marcel Proust · <em lang="fr">Du côté de chez Swann</em> · 1913 ·{" "}
          <em lang="fr">Combray</em>, las primeras líneas
        </p>

        <p>
          Es el principio de una novela de más de tres mil páginas: antes no
          hay nada. Un hombre recuerda sus noches de niño. Leía en la cama, se
          dormía sin darse cuenta y se despertaba media hora después. Lee
          primero el francés, y baja al español solo si te pierdes.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">Longtemps, je me suis couché de bonne heure.</span>
            <span lang="es">Durante mucho tiempo, me he acostado temprano.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire : « Je m’endors. »</span>
            <span lang="es">A veces, nada más apagar mi vela, se me cerraban los ojos tan deprisa que no tenía tiempo de decirme: «Me duermo».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait ;</span>
            <span lang="es">Y, media hora después, me despertaba la idea de que ya era hora de buscar el sueño;</span>
          </p>
          <p className="bilingue">
            <span lang="fr">je voulais poser le volume que je croyais avoir encore dans les mains et souffler ma lumière […].</span>
            <span lang="es">quería dejar el volumen que creía tener todavía en las manos y apagar mi luz de un soplo […].</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Il me semblait que j’étais moi-même ce dont parlait l’ouvrage : une église, un quatuor, la rivalité de François I<sup>er</sup> et de Charles-Quint. […]</span>
            <span lang="es">Me parecía que yo mismo era aquello de lo que hablaba el libro: una iglesia, un cuarteto, la rivalidad entre Francisco I y Carlos V. […]</span>
          </p>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">je me suis couché</span> mira todos
          esos años de lejos, como un bloque. Después,{" "}
          <span className="fr" lang="fr">se fermaient</span>,{" "}
          <span className="fr" lang="fr">m’éveillait</span>,{" "}
          <span className="fr" lang="fr">je voulais</span> cuentan lo que pasaba
          cada noche. Es el mismo imperfecto que en español:{" "}
          <em>se cerraban</em>, <em>me despertaba</em>, <em>quería</em>.
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>La cama, la vela, el libro y el sueño</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">de bonne heure</th>
                <td>
                  temprano. No quiere decir{" "}
                  <em>a buena hora</em>
                </td>
                <td className="fr" lang="fr">Je me suis couché de bonne heure.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">se coucher</th>
                <td>acostarse, meterse en la cama</td>
                <td className="fr" lang="fr">Le soir, je me couche à dix heures.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la bougie</th>
                <td>la vela, de cera, que da luz al arder</td>
                <td className="fr" lang="fr">Il lit à la lumière d’une bougie.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">éteindre</th>
                <td>
                  apagar; <span className="fr" lang="fr">éteinte</span>,
                  apagada
                </td>
                <td className="fr" lang="fr">J’éteins la bougie et je dors.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">s’endormir</th>
                <td>dormirse, empezar a dormir</td>
                <td className="fr" lang="fr">Il s’endort avec un livre dans les mains.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le sommeil</th>
                <td>
                  el sueño, las ganas de dormir o el hecho de dormir. Lo que
                  se ve dormido es otra palabra:{" "}
                  <span className="fr" lang="fr">le rêve</span>
                </td>
                <td className="fr" lang="fr">Il était temps de chercher le sommeil.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le volume</th>
                <td>
                  un libro. Más abajo,{" "}
                  <span className="fr" lang="fr">l’ouvrage</span> quiere decir
                  lo mismo
                </td>
                <td className="fr" lang="fr">Je voulais poser le volume.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">souffler</th>
                <td>soplar; para una vela, apagarla soplando</td>
                <td className="fr" lang="fr">Il souffle sa bougie.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section lang="es">
        <h2>¿Lo has entendido?</h2>

        <p>
          Las preguntas hablan de lo que pasa de verdad: la cama, la vela, el
          libro y el sueño.
        </p>

        <Quiz />
      </section>
    </>
  );
}
