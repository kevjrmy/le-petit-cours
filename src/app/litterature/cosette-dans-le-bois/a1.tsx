import { Quiz } from "./quiz";

/* The A1 body (#85, #92): explained in Spanish, the A2 extract in French with
   the course's own Spanish beside each speech. The French is a2.tsx's, cuts
   included; only the Spanish is new. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          Victor Hugo · <em lang="fr">Les Misérables</em> · 1862 · segunda
          parte, libro tercero,{" "}
          <span lang="fr">« Cosette côte à côte dans l’ombre avec l’inconnu »</span>{" "}
          (fragmentos)
        </p>

        <p>
          Es de noche, en un bosque cerca de Montfermeil. Cosette, una niña,
          vuelve sola con un cubo de agua muy pesado, y un hombre que no conoce
          camina detrás de ella. Lee primero el francés y mira el español solo
          si te pierdes; los corchetes […] marcan las partes cortadas.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">— Mon enfant, c’est bien lourd pour vous ce que vous portez là.</span>
            <span lang="es">«Hija mía, eso que lleva ahí pesa mucho para usted».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Cosette leva la tête et répondit :</span>
            <span lang="es">Cosette levantó la cabeza y contestó:</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Oui, monsieur.</span>
            <span lang="es">«Sí, señor».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Donnez, reprit l’homme, je vais vous le porter.</span>
            <span lang="es">«Démelo», siguió el hombre, «yo se lo llevo».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Cosette lâcha le seau. L’homme se mit à cheminer près d’elle.</span>
            <span lang="es">Cosette soltó el cubo. El hombre se puso a caminar a su lado.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Petite, quel âge as-tu ?</span>
            <span lang="es">«Pequeña, ¿cuántos años tienes?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Huit ans, monsieur.</span>
            <span lang="es">«Ocho años, señor».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Et viens-tu de loin comme cela ?</span>
            <span lang="es">«¿Y vienes de tan lejos?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— De la source qui est dans le bois.</span>
            <span lang="es">«Del manantial que está en el bosque».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Et est-ce loin où tu vas ?</span>
            <span lang="es">«¿Y está lejos adonde vas?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— À un bon quart d’heure d’ici.</span>
            <span lang="es">«A un buen cuarto de hora de aquí».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">L’homme resta un moment sans parler, puis il dit brusquement :</span>
            <span lang="es">El hombre se quedó un momento sin hablar, y luego dijo de repente:</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Tu n’as donc pas de mère ?</span>
            <span lang="es">«¿Entonces no tienes madre?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Je ne sais pas, répondit l’enfant.</span>
            <span lang="es">«No lo sé», contestó la niña.</span>
          </p>
          <p>[…]</p>
          <p className="bilingue">
            <span lang="fr">— Je ne crois pas. Les autres en ont. Moi, je n’en ai pas.</span>
            <span lang="es">«Creo que no. Los demás la tienen. Yo no la tengo».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Et après un silence, elle reprit :</span>
            <span lang="es">Y después de un silencio, siguió:</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Je crois que je n’en ai jamais eu.</span>
            <span lang="es">«Creo que nunca la he tenido».</span>
          </p>
          <p>[…]</p>
          <p className="bilingue">
            <span lang="fr">— Comment t’appelles-tu ?</span>
            <span lang="es">«¿Cómo te llamas?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Cosette.</span>
            <span lang="es">«Cosette».</span>
          </p>
          <p>[…]</p>
          <p className="bilingue">
            <span lang="fr">— Petite, où demeures-tu ?</span>
            <span lang="es">«Pequeña, ¿dónde vives?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— À Montfermeil, si vous connaissez.</span>
            <span lang="es">«En Montfermeil, si lo conoce usted».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est là que nous allons ?</span>
            <span lang="es">«¿Es allí adonde vamos?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Oui, monsieur.</span>
            <span lang="es">«Sí, señor».</span>
          </p>
          <p>[…]</p>
          <p className="bilingue">
            <span lang="fr">— Qui est-ce donc qui t’a envoyée à cette heure chercher de l’eau dans le bois ?</span>
            <span lang="es">«¿Y quién te ha mandado a estas horas a buscar agua al bosque?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est madame Thénardier.</span>
            <span lang="es">«La señora Thénardier».</span>
          </p>
          <p>[…]</p>
          <p className="bilingue">
            <span lang="fr">— Qu’est-ce qu’elle fait ta madame Thénardier ?</span>
            <span lang="es">«¿Y qué hace esa señora Thénardier tuya?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est ma bourgeoise, dit l’enfant. Elle tient l’auberge.</span>
            <span lang="es">«Es mi patrona», dijo la niña. «Lleva la posada».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— L’auberge ? dit l’homme. Eh bien, je vais aller y loger cette nuit. Conduis-moi.</span>
            <span lang="es">«¿La posada?», dijo el hombre. «Pues voy a dormir allí esta noche. Llévame».</span>
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">leva</span>,{" "}
            <span className="fr" lang="fr">répondit</span>,{" "}
            <span className="fr" lang="fr">lâcha</span>,{" "}
            <span className="fr" lang="fr">dit</span>: un tiempo solo para
            leer.
          </p>
          <p>
            Es el pasado de los libros, como <em>levantó</em>,{" "}
            <em>contestó</em>, <em>soltó</em>, <em>dijo</em>. Hablando se dice{" "}
            <span className="fr" lang="fr">elle a répondu</span>. Lo vas a leer
            a menudo; no lo vas a escribir.
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>Las palabras que necesitas para leer el texto</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">le seau</th>
                <td>el cubo, para llevar agua</td>
                <td className="fr" lang="fr">Cosette porte un seau d’eau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">lourd</th>
                <td>pesado</td>
                <td className="fr" lang="fr">Le seau est très lourd.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">lâcher</th>
                <td>soltar, dejar de tener en la mano</td>
                <td className="fr" lang="fr">Cosette lâcha le seau.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la source</th>
                <td>el manantial, el sitio donde el agua sale de la tierra</td>
                <td className="fr" lang="fr">Elle va chercher de l’eau à la source.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le bois</th>
                <td>
                  aquí, el bosque: un sitio con muchos árboles. También es la
                  madera
                </td>
                <td className="fr" lang="fr">La source est dans le bois.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">demeurer</th>
                <td>
                  vivir en un sitio; palabra antigua, hoy se dice{" "}
                  <span className="fr" lang="fr">habiter</span>
                </td>
                <td className="fr" lang="fr">Où demeures-tu ?</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">l’auberge</th>
                <td>
                  la posada: una casa donde se come y se duerme pagando
                </td>
                <td className="fr" lang="fr">Elle tient l’auberge.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ma bourgeoise</th>
                <td>
                  no es <em>mi burguesa</em>: es mi patrona, la mujer para la
                  que trabajo. Palabra antigua; hoy se dice{" "}
                  <span className="fr" lang="fr">ma patronne</span>
                </td>
                <td className="fr" lang="fr">C’est ma bourgeoise, dit l’enfant.</td>
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
