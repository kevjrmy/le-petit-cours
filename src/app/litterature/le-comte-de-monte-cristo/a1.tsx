import { Quiz } from "./quiz";

/* The A1 body (#85, #92): explained in Spanish, the Morrel–Dantès exchange
   in French with the course's own Spanish under each speech. The French is
   the A2 body's, checked against the Wikisource scan; not re-edited. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          Alexandre Dumas · <em lang="fr">Le Comte de Monte-Cristo</em> · 1844
          · capítulo I, <span lang="fr">« Marseille. L’arrivée »</span> · el
          diálogo entre Morrel y Dantès
        </p>

        <p>
          Marsella, 1815. Un barco, <em lang="fr">le Pharaon</em>, vuelve de
          un largo viaje. Lo dirige un joven marinero, Edmond Dantès. El dueño
          del barco, el señor Morrel, no puede esperar: sube a una barca y va
          a su encuentro. Lee primero el francés, y baja al español solo si te
          pierdes.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">— Ah ! c’est vous, Dantès ! cria l’homme à la barque ; qu’est-il donc arrivé, et pourquoi cet air de tristesse répandu sur tout votre bord ?</span>
            <span lang="es">—¡Ah, es usted, Dantès! —gritó el hombre de la barca—. ¿Qué ha pasado, y por qué está tan triste todo su barco?</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Un grand malheur, monsieur Morrel ! répondit le jeune homme, un grand malheur, pour moi surtout : à la hauteur de Civita-Vecchia, nous avons perdu ce brave capitaine Leclère.</span>
            <span lang="es">—¡Una gran desgracia, señor Morrel! —respondió el joven—. Una gran desgracia, sobre todo para mí: a la altura de Civitavecchia, hemos perdido al buen capitán Leclère.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Et le chargement ? demanda vivement l’armateur.</span>
            <span lang="es">—¿Y la carga? —preguntó con viveza el armador.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Il est arrivé à bon port, monsieur Morrel, et je crois que vous serez content sous ce rapport ; mais ce pauvre capitaine Leclère…</span>
            <span lang="es">—Ha llegado sin problemas, señor Morrel, y creo que en eso estará usted contento; pero el pobre capitán Leclère…</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Que lui est-il donc arrivé ? demanda l’armateur d’un air visiblement soulagé ; que lui est-il donc arrivé, à ce brave capitaine ?</span>
            <span lang="es">—Pero ¿qué le ha pasado? —preguntó el armador, que parecía aliviado—. ¿Qué le ha pasado a ese buen capitán?</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Il est mort.</span>
            <span lang="es">—Ha muerto.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Tombé à la mer ?</span>
            <span lang="es">—¿Se ha caído al mar?</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Non, monsieur ; mort d’une fièvre cérébrale, au milieu d’horribles souffrances.</span>
            <span lang="es">—No, señor; ha muerto de una fiebre cerebral, entre dolores horribles.</span>
          </p>
        </div>

        <div className="attention">
          Dantès cuenta en <span className="fr" lang="fr">passé composé</span>,
          como nuestro <em>ha pasado</em>, <em>ha muerto</em>. Pero el francés
          tiene dos auxiliares:{" "}
          <span className="fr" lang="fr">nous avons perdu</span> con{" "}
          <span className="fr" lang="fr">avoir</span>, y{" "}
          <span className="fr" lang="fr">il est arrivé</span>,{" "}
          <span className="fr" lang="fr">il est mort</span> con{" "}
          <span className="fr" lang="fr">être</span>. No se dice
          «<span className="fr" lang="fr">il a mort</span>».
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>Las palabras que necesitas para leer el diálogo</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">la barque</th>
                <td>
                  una barca pequeña. Cuidado: no es un barco grande; el barco
                  grande es <span className="fr" lang="fr">le bateau</span>
                </td>
                <td className="fr" lang="fr">
                  Morrel va vers le bateau dans une barque.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">un armateur</th>
                <td>el armador: la persona a quien pertenece el barco. Aquí, Morrel</td>
                <td className="fr" lang="fr">L’armateur attend son bateau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le bord</th>
                <td>
                  el barco y la gente que va en él;{" "}
                  <span className="fr" lang="fr">à bord</span>, en el barco
                </td>
                <td className="fr" lang="fr">Morrel monte à bord.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">brave</th>
                <td>
                  delante del nombre, bueno, honrado. Cuidado: no quiere decir{" "}
                  <em>bravo</em> (feroz)
                </td>
                <td className="fr" lang="fr">C’est un brave capitaine.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">un malheur</th>
                <td>una desgracia, una cosa muy triste</td>
                <td className="fr" lang="fr">Un grand malheur est arrivé.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le chargement</th>
                <td>la carga: lo que lleva el barco para vender</td>
                <td className="fr" lang="fr">Le bateau porte un gros chargement.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">à bon port</th>
                <td>sin problemas, hasta el final del viaje</td>
                <td className="fr" lang="fr">Tout est arrivé à bon port.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">soulagé</th>
                <td>aliviado: tranquilo, porque el miedo se va</td>
                <td className="fr" lang="fr">Morrel est soulagé.</td>
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
