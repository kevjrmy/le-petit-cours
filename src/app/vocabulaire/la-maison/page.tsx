import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-maison";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          Las habitaciones:{" "}
          <span className="fr" lang="fr">
            les pièces
          </span>
        </h2>

        <div className="rule">
          Aprende cada nombre con su artículo, porque el artículo dice el
          género. Cuando el nombre empieza por vocal,{" "}
          <span className="fr" lang="fr">
            l’
          </span>{" "}
          esconde el género: lo marco con (f.). Para decir qué hay en tu casa:{" "}
          <span className="fr" lang="fr">
            Dans mon appartement, il y a…
          </span>{" "}
          (en mi piso hay…). Para decir «en mi casa»:{" "}
          <span className="fr" lang="fr">
            chez moi
          </span>
          .
        </div>

        <div className="table-wrap">
          <table>
            <caption>Diez habitaciones de la casa, con su artículo</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la cuisine
                </th>
                <td>la cocina</td>
                <td className="fr" lang="fr">
                  Je mange dans la cuisine.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la salle de bains
                </th>
                <td>el cuarto de baño</td>
                <td className="fr" lang="fr">
                  La salle de bains est petite.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  les toilettes
                </th>
                <td>el aseo, el váter</td>
                <td className="fr" lang="fr">
                  Les toilettes sont à gauche.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la chambre
                </th>
                <td>el dormitorio</td>
                <td className="fr" lang="fr">
                  Ma chambre est au deuxième étage.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le salon
                </th>
                <td>el salón</td>
                <td className="fr" lang="fr">
                  Le salon est grand.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la salle à manger
                </th>
                <td>el comedor</td>
                <td className="fr" lang="fr">
                  Nous dînons dans la salle à manger.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’entrée (f.)
                </th>
                <td>el recibidor</td>
                <td className="fr" lang="fr">
                  Mon manteau est dans l’entrée.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le couloir
                </th>
                <td>el pasillo</td>
                <td className="fr" lang="fr">
                  Le couloir est long.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le balcon
                </th>
                <td>el balcón</td>
                <td className="fr" lang="fr">
                  J’ai un balcon avec deux chaises.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le jardin
                </th>
                <td>el jardín</td>
                <td className="fr" lang="fr">
                  Il y a un jardin derrière la maison.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example" lang="fr">
          Chez moi, il y a une cuisine, un salon et deux chambres.
          <br />
          Dans mon appartement, il y a un petit balcon.
        </div>

        <p>
          <span className="fr" lang="fr">
            une pièce
          </span>{" "}
          es cualquier habitación de la casa:{" "}
          <span className="fr" lang="fr">
            L’appartement a quatre pièces
          </span>
          . Los artículos están en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>{" "}
          y{" "}
          <Link href="/grammaire/les-articles-indefinis" lang="fr">
            Les articles indéfinis
          </Link>
          .
        </p>

        <div className="attention">
          En español, «baño» sirve para todo. En francés hay dos palabras:{" "}
          <span className="fr" lang="fr">
            la salle de bains
          </span>{" "}
          es donde te duchas, y{" "}
          <span className="fr" lang="fr">
            les toilettes
          </span>{" "}
          es donde está el váter.{" "}
          <span className="fr" lang="fr">
            les toilettes
          </span>{" "}
          va siempre en plural:{" "}
          <span className="fr" lang="fr">
            Où sont les toilettes ?
          </span>
        </div>
      </section>

      <section lang="es">
        <h2>
          Los muebles:{" "}
          <span className="fr" lang="fr">
            les meubles
          </span>
        </h2>

        <div className="rule">
          Aquí hay muebles y también algunos objetos de la casa. Con un solo
          objeto usas{" "}
          <span className="fr" lang="fr">
            un
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            une
          </span>
          ; con varios,{" "}
          <span className="fr" lang="fr">
            des
          </span>
          . El plural se oye en el artículo, casi nunca en el nombre (
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          ).
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Diez muebles y objetos de la casa, con su artículo
            </caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le lit
                </th>
                <td>la cama</td>
                <td className="fr" lang="fr">
                  Le lit est dans la chambre.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la table
                </th>
                <td>la mesa</td>
                <td className="fr" lang="fr">
                  Il y a une table et quatre chaises.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la chaise
                </th>
                <td>la silla</td>
                <td className="fr" lang="fr">
                  La chaise est devant la fenêtre.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le canapé
                </th>
                <td>el sofá</td>
                <td className="fr" lang="fr">
                  Le canapé est bleu.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’armoire (f.)
                </th>
                <td>el armario</td>
                <td className="fr" lang="fr">
                  Mes vêtements sont dans l’armoire.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’étagère (f.)
                </th>
                <td>la estantería</td>
                <td className="fr" lang="fr">
                  Les livres sont sur l’étagère.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le frigo
                </th>
                <td>el frigorífico (la nevera)</td>
                <td className="fr" lang="fr">
                  Il y a du lait dans le frigo.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le placard
                </th>
                <td>el armario (de cocina o empotrado)</td>
                <td className="fr" lang="fr">
                  Les assiettes sont dans le placard.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la lampe
                </th>
                <td>la lámpara</td>
                <td className="fr" lang="fr">
                  La lampe est sur la table.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le fauteuil
                </th>
                <td>el sillón</td>
                <td className="fr" lang="fr">
                  Le fauteuil est à côté du canapé.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example" lang="fr">
          Dans la chambre, il y a un lit, une armoire et des étagères.
          <br />
          Dans le salon, il y a un canapé et deux lampes.
        </div>

        <p>
          <span className="fr" lang="fr">
            le frigo
          </span>{" "}
          es la palabra de todos los días para{" "}
          <span className="fr" lang="fr">
            le réfrigérateur
          </span>
          .
        </p>
      </section>

      <section lang="es">
        <h2>
          Cinco palabras que te engañan:{" "}
          <span className="fr" lang="fr">
            les faux amis
          </span>
        </h2>

        <div className="rule">
          Estas palabras se parecen a una palabra española, pero significan otra
          cosa. Aprende la palabra francesa con su frase.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Cinco falsos amigos de la casa, con una frase</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la chambre
                </th>
                <td>
                  el dormitorio (no la cámara: eso es{" "}
                  <span className="fr" lang="fr">
                    un appareil photo
                  </span>
                  )
                </td>
                <td className="fr" lang="fr">
                  Il dort dans sa chambre.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le bureau
                </th>
                <td>
                  el escritorio, el despacho o la oficina: las dos cosas, la
                  mesa y la habitación
                </td>
                <td className="fr" lang="fr">
                  Le bureau de ma mère est au premier étage.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la cave
                </th>
                <td>
                  el sótano o la bodega (no la cueva: eso es{" "}
                  <span className="fr" lang="fr">
                    une grotte
                  </span>
                  )
                </td>
                <td className="fr" lang="fr">
                  Le vin est dans la cave.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le sol
                </th>
                <td>
                  el suelo (no el sol: eso es{" "}
                  <span className="fr" lang="fr">
                    le soleil
                  </span>
                  )
                </td>
                <td className="fr" lang="fr">
                  Le sol de la cuisine est froid.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la cuisinière
                </th>
                <td>
                  en una casa, la cocina o el fogón; y también la cocinera
                </td>
                <td className="fr" lang="fr">
                  La cuisinière est à côté du frigo.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Aprende cada nombre con su artículo:{" "}
            <span className="fr" lang="fr">
              la cuisine
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              le salon
            </span>
            .
          </li>
          <li>
            Para decir qué hay:{" "}
            <span className="fr" lang="fr">
              Dans mon appartement, il y a…
            </span>{" "}
            (en mi piso hay…) y{" "}
            <span className="fr" lang="fr">
              chez moi
            </span>{" "}
            (en mi casa).
          </li>
          <li>
            <span className="fr" lang="fr">
              la salle de bains
            </span>{" "}
            es para ducharse;{" "}
            <span className="fr" lang="fr">
              les toilettes
            </span>{" "}
            va en plural.
          </li>
          <li>
            <span className="fr" lang="fr">
              la chambre
            </span>{" "}
            es el dormitorio, no la cámara;{" "}
            <span className="fr" lang="fr">
              le sol
            </span>{" "}
            es el suelo, no el sol.
          </li>
          <li>
            <span className="fr" lang="fr">
              le bureau
            </span>{" "}
            es el escritorio y también la oficina;{" "}
            <span className="fr" lang="fr">
              la cave
            </span>{" "}
            es el sótano, no la cueva;{" "}
            <span className="fr" lang="fr">
              la cuisinière
            </span>{" "}
            es la cocina de gas y también la cocinera.
          </li>
        </ul>
      </div>
    </article>
  );
}
