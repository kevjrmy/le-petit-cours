import { Quiz } from "./quiz";

/* The A1 body (#85, #92): explained in Spanish, the A2 extract in French with
   the course's own Spanish beside each speech. The French is a2.tsx's, cuts
   included; only the Spanish is new. */

function Text() {
  return (
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
  );
}

function Words({ lang }: { lang: "fr" | "es" }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les mots dont vous avez besoin pour lire le texte"
            : "Las palabras que necesitas para leer el texto"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Mot" : "Palabra"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="fr" lang="fr">le seau</th>
            <td lang="es">el cubo, para llevar agua</td>
            <td className="fr" lang="fr">Cosette porte un seau d’eau.</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">lourd</th>
            <td lang="es">pesado</td>
            <td className="fr" lang="fr">Le seau est très lourd.</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">lâcher</th>
            <td lang="es">soltar, dejar de tener en la mano</td>
            <td className="fr" lang="fr">Cosette lâcha le seau.</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">la source</th>
            <td lang="es">el manantial, el sitio donde el agua sale de la tierra</td>
            <td className="fr" lang="fr">Elle va chercher de l’eau à la source.</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">le bois</th>
            <td lang="es">
              aquí, el bosque: un sitio con muchos árboles. También es la
              madera
            </td>
            <td className="fr" lang="fr">La source est dans le bois.</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">demeurer</th>
            <td lang="es">
              vivir en un sitio; palabra antigua, hoy se dice{" "}
              <span className="fr" lang="fr">habiter</span>
            </td>
            <td className="fr" lang="fr">Où demeures-tu ?</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">l’auberge</th>
            <td lang="es">
              la posada: una casa donde se come y se duerme pagando
            </td>
            <td className="fr" lang="fr">Elle tient l’auberge.</td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">ma bourgeoise</th>
            <td lang="es">
              no es <em>mi burguesa</em>: es mi patrona, la mujer para la
              que trabajo. Palabra antigua; hoy se dice{" "}
              <span className="fr" lang="fr">ma patronne</span>
            </td>
            <td className="fr" lang="fr">C’est ma bourgeoise, dit l’enfant.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function A1() {
  return (
    <>
      <section data-ui="fr">
        <h2>Le texte</h2>

        <p>
          Victor Hugo · <em>Les Misérables</em> · 1862 · deuxième partie, livre troisième, « Cosette côte à côte dans l’ombre avec l’inconnu » (extraits)
        </p>

        <p>
          Il fait nuit, dans un bois près de Montfermeil. Cosette, une petite fille, rentre seule avec un seau d’eau très lourd, et un homme qu’elle ne connaît pas marche derrière elle. Lisez d’abord le français et regardez l’espagnol seulement si vous ne comprenez pas ; les crochets […] marquent les parties coupées.
        </p>

        <Text />

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr">leva</span>, <span className="fr">répondit</span>, <span className="fr">lâcha</span>, <span className="fr">dit</span> : un temps seulement pour lire.
          </p>
          <p>
            C’est le passé des livres, comme <em lang="es">levantó</em>, <em lang="es">contestó</em>, <em lang="es">soltó</em>, <em lang="es">dijo</em> en espagnol. Quand on parle, on dit <span className="fr">elle a répondu</span>. Vous allez le lire souvent ; vous n’allez pas l’écrire.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
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

        <Text />

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

      <section data-ui="fr">
        <h2>Les mots du texte</h2>

        <Words lang="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras del texto</h2>

        <Words lang="es" />
      </section>

      <section data-ui="fr">
        <h2>Avez-vous compris ?</h2>

        <p>
          Répondez sans relire. Ensuite, retournez au texte pour les questions que vous avez ratées.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>¿Lo has entendido?</h2>

        <p>
          Contesta sin volver a leer. Después, vuelve al texto para las
          preguntas que has fallado.
        </p>
      </section>

      <Quiz />
    </>
  );
}
