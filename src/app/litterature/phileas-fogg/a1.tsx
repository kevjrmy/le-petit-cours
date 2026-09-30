import { Quiz } from "./quiz";

/* A1 (#85, #92): explained in Spanish, the A2 body's text in French with the
   course's own Spanish under each sentence or speech. The French is copied
   from `a2.tsx`, cuts included; only the line breaks are ours. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          Jules Verne ·{" "}
          <em lang="fr">Le Tour du monde en quatre-vingts jours</em> · 1873 ·
          capítulo I (fragmentos)
        </p>

        <p>
          Londres, 1872. Phileas Fogg es un inglés rico que hace lo mismo todos
          los días, a la misma hora. Esta mañana ha despedido a su criado y
          espera a uno nuevo: un francés, Passepartout. Debajo de cada línea en
          francés tienes la traducción; los corchetes […] marcan lo que se ha
          cortado.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">Phileas Fogg était membre du Reform-Club, et voilà tout.</span>
            <span lang="es">Phileas Fogg era socio del Reform-Club, y nada más.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">[…] On ne connaissait à Phileas Fogg ni femme ni enfants, […] ni parents ni amis […].</span>
            <span lang="es">[…] No se le conocía a Phileas Fogg ni mujer ni hijos, […] ni familia ni amigos […].</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Phileas Fogg vivait seul dans sa maison de Saville-row, où personne ne pénétrait.</span>
            <span lang="es">Phileas Fogg vivía solo en su casa de Saville-row, donde no entraba nadie.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">[…] Un seul domestique suffisait à le servir.</span>
            <span lang="es">[…] Le bastaba un solo criado para servirle.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Déjeunant, dînant au club à des heures chronométriquement déterminées, dans la même salle, à la même table, […] il ne rentrait chez lui que pour se coucher, à minuit précis […].</span>
            <span lang="es">Comía y cenaba en el club a horas fijas, medidas con reloj, en la misma sala, en la misma mesa, […] y solo volvía a su casa para acostarse, a medianoche en punto […].</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Sur vingt-quatre heures, il en passait dix à son domicile […].</span>
            <span lang="es">De las veinticuatro horas del día, pasaba diez en su casa […].</span>
          </p>
          <p className="bilingue">
            <span lang="fr">[…] « Vous êtes Français et vous vous nommez John ? lui demanda Phileas Fogg.</span>
            <span lang="es">[…] «¿Es usted francés y se llama John?», le preguntó Phileas Fogg.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Jean, n’en déplaise à monsieur, répondit le nouveau venu, Jean Passepartout […]. Mais voilà cinq ans que j’ai quitté la France et que […] je suis valet de chambre en Angleterre. […]</span>
            <span lang="es">«Jean, si al señor no le molesta», contestó el recién llegado, «Jean Passepartout […]. Pero hace cinco años que dejé Francia y que […] soy ayuda de cámara en Inglaterra. […]».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Passepartout me convient, répondit le gentleman. Vous m’êtes recommandé. J’ai de bons renseignements sur votre compte. Vous connaissez mes conditions ?</span>
            <span lang="es">«Passepartout me va bien», contestó el caballero. «Me lo han recomendado. Tengo buenos informes sobre usted. ¿Conoce usted mis condiciones?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Oui, monsieur.</span>
            <span lang="es">«Sí, señor».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Bien. Quelle heure avez-vous ?</span>
            <span lang="es">«Bien. ¿Qué hora lleva usted?».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Onze heures vingt-deux, répondit Passepartout, en tirant des profondeurs de son gousset une énorme montre d’argent.</span>
            <span lang="es">«Las once y veintidós», contestó Passepartout, sacando del fondo de su bolsillo un enorme reloj de plata.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Vous retardez, dit Mr. Fogg.</span>
            <span lang="es">«Va usted atrasado», dijo el señor Fogg.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Que monsieur me pardonne, mais c’est impossible.</span>
            <span lang="es">«Que el señor me perdone, pero es imposible».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Vous retardez de quatre minutes. N’importe. Il suffit de constater l’écart. Donc, à partir de ce moment, onze heures vingt-neuf du matin, ce mercredi 2 octobre 1872, vous êtes à mon service. »</span>
            <span lang="es">«Va usted cuatro minutos atrasado. No importa. Basta con saber la diferencia. Así que, a partir de este momento, las once y veintinueve de la mañana de este miércoles 2 de octubre de 1872, está usted a mi servicio».</span>
          </p>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">demanda</span>,{" "}
            <span className="fr" lang="fr">répondit</span>: un tiempo solo
            para leer.
          </p>
          <p>
            Es el pasado de los libros, como <em>preguntó</em> y{" "}
            <em>contestó</em>. Hablando se dice{" "}
            <span className="fr" lang="fr">il a demandé</span>,{" "}
            <span className="fr" lang="fr">il a répondu</span>. Lo vas a leer a
            menudo; no lo vas a escribir.
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
                <th scope="row" className="fr" lang="fr">un domestique</th>
                <td>un criado: una persona pagada para el trabajo de la casa</td>
                <td className="fr" lang="fr">
                  Un seul domestique suffisait à le servir.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">les parents</th>
                <td>
                  los padres, y también toda la familia: tíos, primos, abuelos.
                  En el texto, la familia
                </td>
                <td className="fr" lang="fr">Il n’a ni parents ni amis.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">déjeuner</th>
                <td>
                  comer a mediodía, no desayunar. Desayunar es{" "}
                  <span className="fr" lang="fr">prendre le petit déjeuner</span>
                </td>
                <td className="fr" lang="fr">Il déjeune au club.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">dîner</th>
                <td>cenar, la comida de la noche</td>
                <td className="fr" lang="fr">Il dîne à la même table.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">se coucher</th>
                <td>acostarse, meterse en la cama</td>
                <td className="fr" lang="fr">
                  Il rentre chez lui pour se coucher.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">minuit</th>
                <td>medianoche, las doce de la noche</td>
                <td className="fr" lang="fr">Il se couche à minuit précis.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">une montre</th>
                <td>
                  un reloj que se lleva encima;{" "}
                  <span className="fr" lang="fr">d’argent</span>: de plata
                </td>
                <td className="fr" lang="fr">
                  Passepartout a une énorme montre d’argent.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">retarder</th>
                <td>atrasar: un reloj que marca una hora que ya ha pasado</td>
                <td className="fr" lang="fr">Vous retardez de quatre minutes.</td>
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
