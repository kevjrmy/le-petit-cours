import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-famille";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          Las personas de la familia:{" "}
          <span className="fr" lang="fr">
            les personnes de la famille
          </span>
        </h2>

        <div className="rule">
          Casi todos los nombres de la familia van por parejas, un masculino y
          un femenino. Como en español, el plural mixto usa la forma masculina:{" "}
          <span className="fr" lang="fr">mes cousins</span> (mis primos),{" "}
          <span className="fr" lang="fr">mes voisins</span> (mis vecinos).
          Cuando <span className="fr" lang="fr">l’</span> esconde el
          género, lo marco con (m.).
        </div>

        <div className="table-wrap">
          <table>
            <caption>Los nombres de la familia, en masculino y en femenino</caption>
            <thead>
              <tr>
                <th scope="col">Masculino</th>
                <th scope="col">Femenino</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">le père</th>
                <td className="fr" lang="fr">la mère</td>
                <td>el padre, la madre</td>
                <td className="fr" lang="fr">Mon père travaille à Lyon.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le fils</th>
                <td className="fr" lang="fr">la fille</td>
                <td>el hijo, la hija</td>
                <td className="fr" lang="fr">Ils ont deux fils et une fille.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le frère</th>
                <td className="fr" lang="fr">la sœur</td>
                <td>el hermano, la hermana</td>
                <td className="fr" lang="fr">Ma sœur habite à Madrid.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le grand-père</th>
                <td className="fr" lang="fr">la grand-mère</td>
                <td>el abuelo, la abuela</td>
                <td className="fr" lang="fr">Je déjeune chez ma grand-mère.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">l’oncle (m.)</th>
                <td className="fr" lang="fr">la tante</td>
                <td>el tío, la tía</td>
                <td className="fr" lang="fr">Mon oncle vient dimanche.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le cousin</th>
                <td className="fr" lang="fr">la cousine</td>
                <td>el primo, la prima</td>
                <td className="fr" lang="fr">J’ai quatre cousines.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le neveu</th>
                <td className="fr" lang="fr">la nièce</td>
                <td>el sobrino, la sobrina</td>
                <td className="fr" lang="fr">Mon neveu a huit ans.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le mari</th>
                <td className="fr" lang="fr">la femme</td>
                <td>el marido, la mujer (la esposa)</td>
                <td className="fr" lang="fr">Sa femme s’appelle Claire.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Los verbos de los ejemplos:{" "}
          <span className="fr" lang="fr">travaille</span> (trabaja),{" "}
          <span className="fr" lang="fr">ont</span> (tienen),{" "}
          <span className="fr" lang="fr">habite</span> (vive),{" "}
          <span className="fr" lang="fr">déjeune</span> (almuerzo),{" "}
          <span className="fr" lang="fr">vient</span> (viene),{" "}
          <span className="fr" lang="fr">s’appelle</span> (se llama),{" "}
          <span className="fr" lang="fr">dimanche</span> (domingo). Y{" "}
          <span className="fr" lang="fr">a … ans</span> es «tiene … años». Y{" "}
          <span className="fr" lang="fr">chez ma grand-mère</span> es «en casa
          de mi abuela».
        </p>

        <div className="attention">
          <span className="fr" lang="fr">la fille</span> tiene dos sentidos: la
          hija y la chica. <span className="fr" lang="fr">la femme</span>
          también: la esposa y la mujer. Lo que decide es la palabra que va
          delante. <span className="fr" lang="fr">ma fille</span> es mi hija;{" "}
          <span className="fr" lang="fr">une fille attend devant la porte</span>{" "}
          (una chica espera delante de la puerta) es una persona que no
          conoces. Igual: <span className="fr" lang="fr">sa femme</span> es su
          esposa, <span className="fr" lang="fr">une femme</span> es una mujer
          adulta.
        </div>

        <div className="exception">
          en español, «mis hermanos» y «mis hijos» incluyen chicos y chicas. En
          francés, <span className="fr" lang="fr">mes fils</span> son solo
          chicos: para todos los hijos se dice{" "}
          <span className="fr" lang="fr">mes enfants</span>, y para los
          hermanos <span className="fr" lang="fr">mes frères et sœurs</span>.
          Lo mismo con los tíos:{" "}
          <span className="fr" lang="fr">mon oncle et ma tante</span>.
        </div>
      </section>

      <section lang="es">
        <h2>
          Decir de quién es:{" "}
          <span className="fr" lang="fr">de</span>
        </h2>

        <div className="rule">
          Para unir dos personas, el francés usa{" "}
          <span className="fr" lang="fr">de</span>, como el español:{" "}
          <span className="fr" lang="fr">le frère de Marie</span> (el hermano de
          Marie), <span className="fr" lang="fr">la mère de mon ami</span> (la
          madre de mi amigo). El orden es siempre el mismo: primero la persona
          de la que hablas, después aquella con quien está unida.
        </div>

        <div className="example" lang="fr">
          C’est la sœur <strong>de</strong> Paul.
          <br />
          Voici la voiture <strong>de</strong> mes parents.
          <br />
          Le fils <strong>du</strong> voisin a quinze ans.
          <br />
          La voiture <strong>des</strong> voisins est bleue.
        </div>

        <p>
          <span className="fr" lang="fr">voici</span> es «aquí está»,{" "}
          <span className="fr" lang="fr">la voiture</span> es el coche y{" "}
          <span className="fr" lang="fr">le voisin</span> es el vecino. Como
          «del» en español, <span className="fr" lang="fr">de</span> se une al
          artículo que sigue: <span className="fr" lang="fr">de + le</span>{" "}
          da <span className="fr" lang="fr">du</span>, y{" "}
          <span className="fr" lang="fr">de + les</span> da{" "}
          <span className="fr" lang="fr">des</span>. Delante de vocal,{" "}
          <span className="fr" lang="fr">de</span> pasa a{" "}
          <span className="fr" lang="fr">d’</span>:{" "}
          <span className="fr" lang="fr">la fille d’Anne</span>. Mira{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="attention">
          <span className="fr" lang="fr">mon</span>,{" "}
          <span className="fr" lang="fr">ton</span> y{" "}
          <span className="fr" lang="fr">son</span> se usan delante de un nombre
          femenino que empieza por vocal. Se escribe{" "}
          <span className="fr" lang="fr">mon amie</span> y{" "}
          <span className="fr" lang="fr">son école</span>, nunca{" "}
          <span className="fr" lang="fr">ma amie</span>. El nombre sigue siendo
          femenino: <span className="fr" lang="fr">mon amie est espagnole</span>{" "}
          (mi amiga es española). Las formas completas están en{" "}
          <Link href="/orthographe/les-determinants-possessifs" lang="fr">
            Les déterminants possessifs
          </Link>
          .
        </div>
      </section>

      <section lang="es">
        <h2>
          La familia política:{" "}
          <span className="fr" lang="fr">beau-</span> y{" "}
          <span className="fr" lang="fr">belle-</span>
        </h2>

        <div className="rule">
          <span className="fr" lang="fr">beau-</span> y{" "}
          <span className="fr" lang="fr">belle-</span> sirven para dos cosas: la
          familia de tu marido o de tu mujer (suegro, cuñado) y la pareja de tu
          padre o de tu madre (padrastro, madrastra). En francés hay una sola
          palabra para las dos.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Los nombres con <span className="fr" lang="fr">beau</span> y{" "}
              <span className="fr" lang="fr">belle</span>, y a quién designan
            </caption>
            <thead>
              <tr>
                <th scope="col">La palabra</th>
                <th scope="col">Quién es</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">le beau-père</th>
                <td>
                  el suegro (el padre de tu marido o de tu mujer) o el padrastro
                  (la pareja de tu madre)
                </td>
                <td>
                  <span className="fr" lang="fr">Mon beau-père est très gentil.</span>{" "}
                  (<span className="fr" lang="fr">gentil</span>: amable)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la belle-mère</th>
                <td>
                  la suegra (la madre de tu marido o de tu mujer) o la madrastra
                  (la pareja de tu padre)
                </td>
                <td>
                  <span className="fr" lang="fr">Nous dînons chez ma belle-mère.</span>{" "}
                  (<span className="fr" lang="fr">dînons</span>: cenamos)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le beau-frère</th>
                <td>
                  el cuñado (el hermano de tu marido o de tu mujer, o el marido
                  de tu hermana)
                </td>
                <td className="fr" lang="fr">Mon beau-frère habite au Portugal.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la belle-sœur</th>
                <td>
                  la cuñada (la hermana de tu marido o de tu mujer, o la mujer
                  de tu hermano)
                </td>
                <td>
                  <span className="fr" lang="fr">Ma belle-sœur est médecin.</span>{" "}
                  (<span className="fr" lang="fr">médecin</span>: médico)
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">le demi-frère</th>
                <td>
                  el medio hermano: un hermano con quien solo compartes padre o
                  madre
                </td>
                <td>
                  <span className="fr" lang="fr">J’ai un demi-frère plus jeune.</span>{" "}
                  (<span className="fr" lang="fr">plus jeune</span>: más joven)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          <span className="fr" lang="fr">beau-père</span> y{" "}
          <span className="fr" lang="fr">belle-mère</span> son ambiguos, y el
          francés no tiene otra palabra. Para ser claro, se precisa:{" "}
          <span className="fr" lang="fr">le père de mon mari</span> (el padre de
          mi marido) o <span className="fr" lang="fr">le compagnon de ma mère</span>{" "}
          (la pareja de mi madre).
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">mes parents</span> son, por defecto,
            tu padre y tu madre.
          </p>
          <p>
            <span className="fr" lang="fr">Mes parents habitent à Lyon</span>{" "}
            (mis padres viven en Lyon). Para la familia en general se dice{" "}
            <span className="fr" lang="fr">la famille</span>:{" "}
            <span className="fr" lang="fr">J’ai de la famille en France</span>{" "}
            (tengo familia en Francia). Un{" "}
            <span className="fr" lang="fr">parent</span>, en singular, también
            puede ser un pariente, pero es raro al principio.
          </p>
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Los nombres de la familia van por parejas, y el plural mixto usa el
            masculino: <span className="fr" lang="fr">mes cousins</span>,{" "}
            <span className="fr" lang="fr">mes voisins</span>.
          </li>
          <li>
            <span className="fr" lang="fr">la fille</span> y{" "}
            <span className="fr" lang="fr">la femme</span> tienen dos sentidos;
            la palabra de delante los separa.
          </li>
          <li>
            Se une con <span className="fr" lang="fr">de</span>, que da{" "}
            <span className="fr" lang="fr">du</span> delante de{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">d’</span> delante de vocal.
          </li>
          <li>
            <span className="fr" lang="fr">mon</span> sustituye a{" "}
            <span className="fr" lang="fr">ma</span> delante de un femenino que
            empieza por vocal.
          </li>
          <li>
            <span className="fr" lang="fr">beau-</span> y{" "}
            <span className="fr" lang="fr">belle-</span> valen para suegros y
            cuñados, y también para padrastros.
          </li>
          <li>
            <span className="fr" lang="fr">les parents</span> son los padres;
            la familia en general es <span className="fr" lang="fr">la famille</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
