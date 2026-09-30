import { Quiz } from "./quiz";

/* A1 (#85, #92): explained in Spanish, the scene's opening in French with the
   course's own Spanish under each speech. The French is the A2 body's, word
   for word; the passage stops where the A2 body's first cut does. */
export function A1() {
  return (
    <>
      <section lang="es">
        <h2>El texto</h2>

        <p>
          Edmond Rostand · <em lang="fr">Cyrano de Bergerac</em> · 1897 · acto
          I, escena primera (el principio)
        </p>

        <p>
          París, 1640. Estamos en el <span lang="fr">Hôtel de Bourgogne</span>, un teatro. La obra
          todavía no ha empezado: el público va llegando y, en la puerta, un
          portero cobra la entrada. Cyrano aún no está. Debajo de cada línea en
          francés tienes la traducción: lee primero el francés, y baja al
          español solo si te pierdes.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr"><strong>Le portier</strong>, <em>le poursuivant</em> — Holà ! vos quinze sols !</span>
            <span lang="es"><strong>El portero</strong>, <em>persiguiéndolo</em>: ¡Eh, usted! ¡Sus quince sueldos!</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le cavalier</strong> — J’entre gratis !</span>
            <span lang="es"><strong>El caballero</strong>: ¡Yo entro gratis!</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le portier</strong> — Pourquoi ?</span>
            <span lang="es"><strong>El portero</strong>: ¿Por qué?</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le cavalier</strong> — Je suis chevau-léger de la maison du Roi !</span>
            <span lang="es"><strong>El caballero</strong>: ¡Soy de la caballería ligera de la casa del rey!</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le portier</strong>, <em>à un autre cavalier qui vient d’entrer</em> — Vous ?</span>
            <span lang="es"><strong>El portero</strong>, <em>a otro caballero que acaba de entrar</em>: ¿Y usted?</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Deuxième cavalier</strong> — Je ne paye pas !</span>
            <span lang="es"><strong>Segundo caballero</strong>: ¡Yo no pago!</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le portier</strong> — Mais…</span>
            <span lang="es"><strong>El portero</strong>: Pero…</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Deuxième cavalier</strong> — Je suis mousquetaire.</span>
            <span lang="es"><strong>Segundo caballero</strong>: Soy mosquetero.</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Premier cavalier</strong>, <em>au deuxième</em> — On ne commence qu’à deux heures. Le parterre est vide. Exerçons-nous au fleuret.</span>
            <span lang="es"><strong>Primer caballero</strong>, <em>al segundo</em>: No empiezan hasta las dos. El patio está vacío. Practiquemos con el florete.</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><em>(Ils font des armes avec des fleurets qu’ils ont apportés.)</em></span>
            <span lang="es"><em>(Practican esgrima con los floretes que han traído.)</em></span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Un laquais</strong>, <em>entrant</em> — Pst… Flanquin…</span>
            <span lang="es"><strong>Un lacayo</strong>, <em>entrando</em>: Pst… Flanquin…</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Un autre</strong>, <em>déjà arrivé</em> — Champagne ?…</span>
            <span lang="es"><strong>Otro</strong>, <em>que ya ha llegado</em>: ¿Champagne?…</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le premier</strong>, <em>lui montrant des jeux qu’il sort de son pourpoint</em> — Cartes. Dés. <em>(Il s’assied par terre.)</em> Jouons.</span>
            <span lang="es"><strong>El primero</strong>, <em>enseñándole los juegos que saca de su jubón</em>: Cartas. Dados. <em>(Se sienta en el suelo.)</em> Juguemos.</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Le deuxième</strong> — Oui, mon coquin.</span>
            <span lang="es"><strong>El segundo</strong>: Sí, bribón.</span>
          </p>
          <p className="bilingue">
            <span lang="fr"><strong>Premier laquais</strong>, <em>tirant de sa poche un bout de chandelle qu’il allume et colle par terre</em> — J’ai soustrait à mon maître un peu de luminaire.</span>
            <span lang="es"><strong>Primer lacayo</strong>, <em>sacando del bolsillo un cabo de vela que enciende y pega en el suelo</em>: Le he quitado a mi amo un poco de luz.</span>
          </p>
        </div>

        <div className="attention">
          en el teatro, el nombre en negrita dice quién habla. Lo que va en
          cursiva dice lo que hace: no se lee en voz alta. <span lang="fr">Flanquin</span> y{" "}
          <span lang="fr">Champagne</span>
          son los nombres de los dos lacayos.
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>Las palabras que necesitas para seguir la escena</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">le portier</th>
                <td>el portero: vigila la puerta y cobra la entrada</td>
                <td className="fr" lang="fr">Le portier demande quinze sols.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">quinze sols</th>
                <td>
                  el precio de la entrada; el <span className="fr" lang="fr">sol</span>{" "}
                  es una moneda antigua
                </td>
                <td className="fr" lang="fr">L’entrée coûte quinze sols.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">payer</th>
                <td>pagar</td>
                <td className="fr" lang="fr">Je ne paye pas !</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">un mousquetaire</th>
                <td>un mosquetero, un soldado del rey</td>
                <td className="fr" lang="fr">Je suis mousquetaire.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le parterre</th>
                <td>
                  aquí no es un jardín con flores: es la parte baja de la sala,
                  donde el público está de pie (el patio)
                </td>
                <td className="fr" lang="fr">Le parterre est vide.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">un fleuret</th>
                <td>un florete, una espada fina para practicar</td>
                <td className="fr" lang="fr">Exerçons-nous au fleuret.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">un laquais</th>
                <td>un lacayo, un criado</td>
                <td className="fr" lang="fr">Les laquais jouent aux cartes.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">par terre</th>
                <td>en el suelo</td>
                <td className="fr" lang="fr">Il s’assied par terre.</td>
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
