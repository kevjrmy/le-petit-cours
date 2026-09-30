import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-singulier-et-le-pluriel";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>El plural se escribe, pero casi nunca se oye</h2>

        <div className="rule">
          En español oyes el plural: <em>casa</em>, <em>casas</em>. En francés,
          casi nunca. <span className="fr" lang="fr">le chat</span> (el gato) y <span className="fr" lang="fr">les chats</span> se dicen igual en el
          nombre: la <em>s</em> final no suena. El plural se oye en el
          artículo. Por eso, escucha siempre la palabra pequeña: <span className="fr" lang="fr">le</span>
          o <span className="fr" lang="fr">les</span>, <span className="fr" lang="fr">un</span> o <span className="fr" lang="fr">des</span>.
        </div>

        <div className="example" lang="fr">
          Le chat dort. / Les chats dorment.
          <br />
          Une maison. / Des maisons.
        </div>

        <p>
          Los verbos del ejemplo:{" "}
          <span className="fr" lang="fr">dort</span> (duerme),{" "}
          <span className="fr" lang="fr">dorment</span> (duermen).
        </p>

        <p>
          Al escribir, el plural casi siempre es el nombre con una{" "}
          <em>s</em> muda al final. Hay cuatro casos que te sirven ya.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Cuatro maneras de formar el plural de un nombre</caption>
            <thead>
              <tr>
                <th scope="col">El nombre acaba en</th>
                <th scope="col">El plural</th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">casi todo</th>
                <td><span className="fr" lang="fr">+ -s</span></td>
                <td className="fr" lang="fr">la maison, les maisons</td>
                <td>la casa, las casas</td>
              </tr>
              <tr>
                <th scope="row"><span className="fr" lang="fr">-s</span>, <span className="fr" lang="fr">-x</span>, <span className="fr" lang="fr">-z</span></th>
                <td>no cambia</td>
                <td className="fr" lang="fr">le bus, les bus ; le prix, les prix ; le nez, les nez</td>
                <td>el autobús, los autobuses ; el precio, los precios ; la nariz, las narices</td>
              </tr>
              <tr>
                <th scope="row"><span className="fr" lang="fr">-eau</span></th>
                <td><span className="fr" lang="fr">-eaux</span></td>
                <td className="fr" lang="fr">le bateau, les bateaux</td>
                <td>el barco, los barcos</td>
              </tr>
              <tr>
                <th scope="row"><span className="fr" lang="fr">-al</span></th>
                <td><span className="fr" lang="fr">-aux</span></td>
                <td className="fr" lang="fr">le journal, les journaux</td>
                <td>el periódico, los periódicos</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">-al</span> es el único caso en que el propio nombre cambia de sonido.{" "}
          <span className="fr" lang="fr">journal</span> acaba en «al» y <span className="fr" lang="fr">journaux</span> acaba en «o». Lo mismo con{" "}
          <span className="fr" lang="fr">un cheval</span> (un caballo) y<span className="fr" lang="fr">des chevaux</span>. En los demás casos, la <em>s</em> y
          la <em>x</em> son mudas.
        </div>

        <div className="exception">
          en el plural de <span className="fr" lang="fr">-eau</span>, la <em>x</em> también es muda:{" "}
          <span className="fr" lang="fr">un gâteau</span> (un pastel) y<span className="fr" lang="fr">des gâteaux</span> suenan igual al final. Solo cambia
          el artículo, como en <span className="fr" lang="fr">le chat</span> y <span className="fr" lang="fr">les chats</span>.
        </div>
      </section>

      <section lang="es">
        <h2>
          Delante de vocal, <span className="fr" lang="fr">les</span> y <span className="fr" lang="fr">des</span> se enlazan: la{" "}
          <span className="fr" lang="fr">liaison</span>
        </h2>

        <div className="rule">
          Delante de una vocal o de una h muda, la <em>s</em> de{" "}
          <span className="fr" lang="fr">les</span> y de <span className="fr" lang="fr">des</span> sí suena. Es la <em>z</em> francesa de <span className="fr" lang="fr">zéro</span>: una <em>s</em> que zumba como una abeja. No es la <em>z</em> española. Se pega a la palabra siguiente, como si
          fueran una sola palabra. Se llama <strong lang="fr">liaison</strong>{" "}
          y en este curso se marca con ‿.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Delante de vocal se enlaza y delante de consonante no
            </caption>
            <thead>
              <tr>
                <th scope="col">La palabra siguiente</th>
                <th scope="col">La <em>s</em></th>
                <th scope="col">Ejemplo</th>
                <th scope="col">En español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">empieza por vocal</th>
                <td>suena</td>
                <td className="fr" lang="fr">les‿amis, des‿enfants</td>
                <td>los amigos, unos niños</td>
              </tr>
              <tr>
                <th scope="row">empieza por h muda</th>
                <td>suena</td>
                <td className="fr" lang="fr">les‿hôtels</td>
                <td>los hoteles</td>
              </tr>
              <tr>
                <th scope="row">empieza por consonante</th>
                <td>no suena</td>
                <td className="fr" lang="fr">les garçons, des livres</td>
                <td>los chicos, unos libros</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          La escritura no cambia nunca: se escribe siempre <span className="fr" lang="fr">les amis</span>, <span className="fr" lang="fr">des amis</span>, igual que{" "}
          <span className="fr" lang="fr">les garçons</span>. La liaison solo se oye. Y así el plural vuelve a oírse:
          <span className="fr" lang="fr"> un ami</span> y <span className="fr" lang="fr">des‿amis</span> tienen el mismo nombre, pero solo en el segundo se oye la <em>z</em>.
        </p>

        <div className="example" lang="fr">
          Les garçons lisent des livres.
          <br />
          Les‿enfants lisent des‿histoires.
        </div>

        <p>
          <span className="fr" lang="fr">lisent</span> es «leen» y{" "}
          <span className="fr" lang="fr">des histoires</span> son «unas historias» o «unos cuentos».
        </p>

        <div className="exception">
          delante de unas pocas palabras con h no hay liaison, igual que no
          hay apóstrofo: <span className="fr" lang="fr">les héros</span> (los héroes), <span className="fr" lang="fr">les haricots</span> (las
          judías). Es la misma h de <span className="fr" lang="fr">le héros</span> en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          . Se aprenden una por una.
        </div>

        <p>
          Sobre <span className="fr" lang="fr">un</span>, <span className="fr" lang="fr">une</span> y <span className="fr" lang="fr">des</span>, mira{" "}
          <Link href="/grammaire/les-articles-indefinis" lang="fr">
            Les articles indéfinis
          </Link>
          .
        </p>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El plural casi no se oye en el nombre: escucha el artículo,{" "}
            <span className="fr" lang="fr">le</span> o <span className="fr" lang="fr">les</span>, <span className="fr" lang="fr">un</span> o <span className="fr" lang="fr">des</span>.
          </li>
          <li>
            Al escribir, se añade una <em>s</em> muda:{" "}
            <span className="fr" lang="fr">la maison</span>, <span className="fr" lang="fr">les maisons</span>.
          </li>
          <li>
            <span className="fr" lang="fr">-s</span>, <span className="fr" lang="fr">-x</span> y <span className="fr" lang="fr">-z</span> no cambian; <span className="fr" lang="fr">-eau</span> da <span className="fr" lang="fr">-eaux</span>; <span className="fr" lang="fr">-al</span>{" "}
            da <span className="fr" lang="fr">-aux</span>, y ahí el propio nombre cambia de sonido.
          </li>
          <li>
            Delante de vocal o h muda, la <em>s</em> de <span className="fr" lang="fr">les</span> y <span className="fr" lang="fr">des</span> suena:{" "}
            <span className="fr" lang="fr">les‿amis</span>. Delante de consonante, no: <span className="fr" lang="fr">les garçons</span>.
          </li>
          <li>
            Delante de unas pocas palabras con h no hay liaison:<span className="fr" lang="fr">les héros</span>. La escritura no
            cambia nunca.
          </li>
        </ul>
      </div>
    </article>
  );
}
