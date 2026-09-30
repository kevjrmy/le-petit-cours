import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-transports";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          Los medios de transporte:{" "}
          <span className="fr" lang="fr">
            les moyens de transport
          </span>
        </h2>

        <div className="rule">
          Aprende cada nombre con su artículo. Cuando el nombre empieza por
          vocal,{" "}
          <span className="fr" lang="fr">
            l’
          </span>{" "}
          esconde el género: lo marco con (f.) o (m.). Aquí solo dos nombres
          llevan la marca:{" "}
          <span className="fr" lang="fr">
            l’avion
          </span>{" "}
          (m.) y{" "}
          <span className="fr" lang="fr">
            l’arrêt
          </span>{" "}
          (m.). Para decir qué coges:{" "}
          <span className="fr" lang="fr">
            Je prends le bus.
          </span>{" "}
          (cojo el autobús).
        </div>

        <div className="table-wrap">
          <table>
            <caption>Once medios de transporte, con su artículo</caption>
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
                  la voiture
                </th>
                <td>el coche</td>
                <td className="fr" lang="fr">
                  Ma voiture est petite.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le bus
                </th>
                <td>el autobús</td>
                <td className="fr" lang="fr">
                  Le bus est grand.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le car
                </th>
                <td>el autocar</td>
                <td className="fr" lang="fr">
                  Le car va à Lyon.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le métro
                </th>
                <td>el metro</td>
                <td className="fr" lang="fr">
                  Je prends le métro.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le tramway
                </th>
                <td>el tranvía</td>
                <td className="fr" lang="fr">
                  Le tramway est nouveau.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le train
                </th>
                <td>el tren</td>
                <td className="fr" lang="fr">
                  Le train est rapide.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le vélo
                </th>
                <td>la bicicleta</td>
                <td className="fr" lang="fr">
                  Le vélo est dans le jardin.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la moto
                </th>
                <td>la moto</td>
                <td className="fr" lang="fr">
                  La moto est devant la maison.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’avion (m.)
                </th>
                <td>el avión</td>
                <td className="fr" lang="fr">
                  L’avion est très grand.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le bateau
                </th>
                <td>el barco</td>
                <td className="fr" lang="fr">
                  Le bateau est petit.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le taxi
                </th>
                <td>el taxi</td>
                <td className="fr" lang="fr">
                  Le taxi est devant la maison.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example" lang="fr">
          Le train est rapide.
          <br />
          Ma voiture est devant la maison.
        </div>

        <div className="attention">
          <span className="fr" lang="fr">
            le car
          </span>{" "}
          es el autocar, el que va de una ciudad a otra o de excursión. No es el
          coche: el coche es{" "}
          <span className="fr" lang="fr">
            la voiture
          </span>
          .{" "}
          <span className="fr" lang="fr">
            Le car est grand
          </span>{" "}
          (el autocar es grande).
        </div>
      </section>

      <section lang="es">
        <h2>
          Cómo viajas:{" "}
          <span className="fr" lang="fr">
            en
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            à
          </span>
        </h2>

        <div className="rule">
          Con{" "}
          <span className="fr" lang="fr">
            en
          </span>{" "}
          estás dentro:{" "}
          <span className="fr" lang="fr">
            en voiture
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en bus
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en métro
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en train
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en‿avion
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en taxi
          </span>
          . Con{" "}
          <span className="fr" lang="fr">
            à
          </span>{" "}
          estás sobre tus pies o sentado a horcajadas:{" "}
          <span className="fr" lang="fr">
            à pied
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            à vélo
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            à moto
          </span>
          . Ejemplo:{" "}
          <span className="fr" lang="fr">
            Je vais au travail en bus.
          </span>{" "}
          (voy al trabajo en autobús). La{" "}
          <span className="fr" lang="fr">
            n
          </span>{" "}
          de{" "}
          <span className="fr" lang="fr">
            en
          </span>{" "}
          suena delante de una vocal:{" "}
          <span className="fr" lang="fr">
            en‿avion
          </span>
          . Es un enlace (
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          ).
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Nueve maneras de viajar, con «<span lang="fr">en</span>» o «
              <span lang="fr">à</span>»
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
                  en voiture
                </th>
                <td>en coche</td>
                <td className="fr" lang="fr">
                  Je vais au travail en voiture.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  en bus
                </th>
                <td>en autobús</td>
                <td className="fr" lang="fr">
                  Je vais au travail en bus.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  en métro
                </th>
                <td>en metro</td>
                <td className="fr" lang="fr">
                  Je vais au travail en métro.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  en train
                </th>
                <td>en tren</td>
                <td className="fr" lang="fr">
                  Je vais à Lyon en train.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  en‿avion
                </th>
                <td>en avión</td>
                <td className="fr" lang="fr">
                  Je vais à Paris en‿avion.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  en taxi
                </th>
                <td>en taxi</td>
                <td className="fr" lang="fr">
                  Elle va au travail en taxi.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  à pied
                </th>
                <td>a pie</td>
                <td className="fr" lang="fr">
                  Je vais au travail à pied.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  à vélo
                </th>
                <td>en bicicleta</td>
                <td className="fr" lang="fr">
                  Elle va au travail à vélo.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  à moto
                </th>
                <td>en moto</td>
                <td className="fr" lang="fr">
                  Il va au travail à moto.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example" lang="fr">
          Je vais au travail en bus.
          <br />
          Mon père va à Lyon en train.
        </div>

        <p>
          Con{" "}
          <span className="fr" lang="fr">
            prendre
          </span>{" "}
          (coger) no hay preposición:{" "}
          <span className="fr" lang="fr">
            Je prends le métro.
          </span>{" "}
          (cojo el metro),{" "}
          <span className="fr" lang="fr">
            Il prend le train.
          </span>{" "}
          (coge el tren). Compara:{" "}
          <span className="fr" lang="fr">
            Je vais au travail en métro
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            Je prends le métro
          </span>{" "}
          dicen casi lo mismo. Más sobre{" "}
          <span className="fr" lang="fr">
            au
          </span>{" "}
          en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="exception">
          en la calle oyes mucho{" "}
          <span className="fr" lang="fr">
            en vélo
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            en moto
          </span>
          . Aprende{" "}
          <span className="fr" lang="fr">
            à
          </span>{" "}
          y no te sorprendas si oyes{" "}
          <span className="fr" lang="fr">
            en
          </span>
          .{" "}
          <span className="fr" lang="fr">
            à pied
          </span>{" "}
          no cambia nunca.
        </div>
      </section>

      <section lang="es">
        <h2>
          Las palabras de la estación:{" "}
          <span className="fr" lang="fr">
            la gare
          </span>
        </h2>

        <div className="rule">
          Estas seis palabras se usan cada día en el tren, el metro y el
          autobús. Tres de ellas se confunden con facilidad:{" "}
          <span className="fr" lang="fr">
            la gare
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            la station
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            l’arrêt
          </span>
          . Míralas en los recuadros de abajo.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Seis palabras de la estación y de la parada, con una frase
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
                  la gare
                </th>
                <td>la estación de tren</td>
                <td className="fr" lang="fr">
                  Le train est à la gare.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la station
                </th>
                <td>la estación de metro (o de tranvía)</td>
                <td className="fr" lang="fr">
                  La station de métro est à côté de la maison.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’arrêt (m.)
                </th>
                <td>la parada</td>
                <td className="fr" lang="fr">
                  L’arrêt de bus est devant la gare.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le quai
                </th>
                <td>el andén</td>
                <td className="fr" lang="fr">
                  Le train est sur le quai.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le billet
                </th>
                <td>el billete</td>
                <td>
                  <span className="fr" lang="fr">
                    Un billet pour Lyon, s’il vous plaît.
                  </span>{" "}
                  (Un billete para Lyon, por favor.)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le ticket
                </th>
                <td>el billete de metro o de autobús</td>
                <td className="fr" lang="fr">
                  J’ai un ticket de métro.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          En español «estación» sirve para todo. En francés hay dos palabras:{" "}
          <span className="fr" lang="fr">
            la gare
          </span>{" "}
          es la estación de tren y{" "}
          <span className="fr" lang="fr">
            la station
          </span>{" "}
          es la de metro o de tranvía. Un tren para en{" "}
          <span className="fr" lang="fr">
            la gare
          </span>
          ; un metro para en{" "}
          <span className="fr" lang="fr">
            la station
          </span>
          .
        </div>

        <div className="attention">
          <span className="fr" lang="fr">
            l’arrêt
          </span>{" "}
          es la parada:{" "}
          <span className="fr" lang="fr">
            l’arrêt de bus
          </span>
          . No es el arresto de la policía.{" "}
          <span className="fr" lang="fr">
            le billet
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            le ticket
          </span>{" "}
          <span className="fr" lang="fr">
            le billet
          </span>{" "}
          es el billete de tren o de avión;{" "}
          <span className="fr" lang="fr">
            le ticket
          </span>
          , el del metro o del autobús. Son dos palabras, no una.
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Aprende cada medio con su artículo:{" "}
            <span className="fr" lang="fr">
              la voiture
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              le train
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              l’avion
            </span>{" "}
            (m.).
          </li>
          <li>
            <span className="fr" lang="fr">
              le car
            </span>{" "}
            es el autocar; el coche es{" "}
            <span className="fr" lang="fr">
              la voiture
            </span>
            .
          </li>
          <li>
            <span className="fr" lang="fr">
              en
            </span>{" "}
            si estás dentro (
            <span className="fr" lang="fr">
              en voiture
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              en train
            </span>
            );{" "}
            <span className="fr" lang="fr">
              à
            </span>{" "}
            a pie o a horcajadas (
            <span className="fr" lang="fr">
              à pied
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              à vélo
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              à moto
            </span>
            ). Se oye{" "}
            <span className="fr" lang="fr">
              en vélo
            </span>
            , pero aprende{" "}
            <span className="fr" lang="fr">
              à vélo
            </span>
            .
          </li>
          <li>
            Con{" "}
            <span className="fr" lang="fr">
              prendre
            </span>{" "}
            no hay preposición:{" "}
            <span className="fr" lang="fr">
              Je prends le métro.
            </span>
          </li>
          <li>
            <span className="fr" lang="fr">
              la gare
            </span>{" "}
            es de trenes,{" "}
            <span className="fr" lang="fr">
              la station
            </span>{" "}
            de metro,{" "}
            <span className="fr" lang="fr">
              l’arrêt
            </span>{" "}
            de autobús: la parada, no el arresto.
          </li>
        </ul>
      </div>
    </article>
  );
}
