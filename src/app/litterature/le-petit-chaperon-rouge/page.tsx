import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/litterature/le-petit-chaperon-rouge";

export const metadata = lessonMetadata(PATH);

/* The chapter's A1 page (#72, #85): explained in Spanish, the text in French
   with the course's own Spanish under each line (#92). The text is Féron's
   1902 edition, « texte validé » on Wikisource, where the speeches run on in
   one paragraph separated by dashes. Here each sentence or speech takes its
   own line; the words, the dashes and the punctuation are the edition's. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>El texto</h2>

        <p>
          Charles Perrault · <em lang="fr">Histoires ou contes du temps passé</em> ·
          1697 · el final del cuento · texto de la edición de 1902
        </p>

        <p>
          Ya conoces la historia: el lobo se ha comido a la abuela y espera en
          su cama. Caperucita llega con una{" "}
          <span className="fr" lang="fr">galette</span> y un tarro de
          mantequilla. Debajo de cada línea en francés tienes la traducción:
          lee primero el francés, y baja al español solo si te pierdes.
        </p>

        <div className="example">
          <p className="bilingue">
            <span lang="fr">Le Loup, la voyant entrer, lui dit en se cachant dans le lit, sous la couverture : Mets la galette et le petit pot de beurre sur la huche, et viens te coucher avec moi.</span>
            <span lang="es">El lobo, al verla entrar, le dice escondiéndose en la cama, debajo de la manta: «Pon la torta y el tarrito de mantequilla sobre el arcón, y ven a acostarte conmigo».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Le petit Chaperon rouge se déshabille, et va se mettre dans le lit, où elle fut bien étonnée de voir comment sa mère-grand était faite en son déshabillé.</span>
            <span lang="es">Caperucita se desviste y se mete en la cama, donde se queda muy sorprendida al ver cómo es su abuela en camisón.</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Elle lui dit : Ma mère-grand, que vous avez de grands bras !</span>
            <span lang="es">Le dice: «Abuela, ¡qué brazos tan grandes tienes!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est pour mieux t’embrasser, ma fille !</span>
            <span lang="es">«¡Son para abrazarte mejor, niña mía!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Ma mère-grand, que vous avez de grandes jambes !</span>
            <span lang="es">«Abuela, ¡qué piernas tan grandes tienes!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est pour mieux courir, mon enfant !</span>
            <span lang="es">«¡Son para correr mejor, niña!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Ma mère-grand, que vous avez de grandes oreilles !</span>
            <span lang="es">«Abuela, ¡qué orejas tan grandes tienes!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est pour mieux écouter, mon enfant !</span>
            <span lang="es">«¡Son para oírte mejor, niña!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Ma mère-grand, que vous avez de grands yeux !</span>
            <span lang="es">«Abuela, ¡qué ojos tan grandes tienes!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est pour mieux te voir, mon enfant !</span>
            <span lang="es">«¡Son para verte mejor, niña!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— Ma mère-grand, que vous avez de grandes dents !</span>
            <span lang="es">«Abuela, ¡qué dientes tan grandes tienes!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">— C’est pour te manger !</span>
            <span lang="es">«¡Son para comerte!».</span>
          </p>
          <p className="bilingue">
            <span lang="fr">Et, en disant ces mots, ce méchant Loup se jeta sur le petit Chaperon rouge, et la mangea.</span>
            <span lang="es">Y, diciendo estas palabras, el lobo malvado se lanzó sobre Caperucita y se la comió.</span>
          </p>
        </div>

        <div className="attention">
          en Perrault no hay cazador. El cuento termina con el lobo, y no con
          Caperucita salvada: esa versión es la de los hermanos Grimm, más de
          cien años después.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">fut</span>,{" "}
            <span className="fr" lang="fr">se jeta</span>,{" "}
            <span className="fr" lang="fr">mangea</span>: un tiempo solo para
            leer.
          </p>
          <p>
            Es el pasado de los libros, como <em>fue</em>, <em>se lanzó</em>,{" "}
            <em>se comió</em>. Hablando se dice{" "}
            <span className="fr" lang="fr">il l’a mangée</span>. Lo vas a leer
            a menudo; no lo vas a escribir.
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras del texto</h2>

        <div className="table-wrap">
          <table>
            <caption>El cuerpo en el diálogo, del singular al plural</caption>
            <thead>
              <tr>
                <th scope="col">Singular</th>
                <th scope="col">Plural</th>
                <th scope="col">En español</th>
                <th scope="col">En el texto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">le bras</th>
                <td className="fr" lang="fr">les bras</td>
                <td>el brazo</td>
                <td className="fr" lang="fr">que vous avez de grands bras !</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la jambe</th>
                <td className="fr" lang="fr">les jambes</td>
                <td>la pierna</td>
                <td className="fr" lang="fr">que vous avez de grandes jambes !</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">l’oreille</th>
                <td className="fr" lang="fr">les oreilles</td>
                <td>la oreja</td>
                <td className="fr" lang="fr">que vous avez de grandes oreilles !</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">l’œil</th>
                <td className="fr" lang="fr">les yeux</td>
                <td>el ojo</td>
                <td className="fr" lang="fr">que vous avez de grands yeux !</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la dent</th>
                <td className="fr" lang="fr">les dents</td>
                <td>el diente</td>
                <td className="fr" lang="fr">que vous avez de grandes dents !</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          <span className="fr" lang="fr">grand</span> cambia con el nombre:{" "}
          <span className="fr" lang="fr">grands bras</span>,{" "}
          <span className="fr" lang="fr">grands yeux</span> (masculino),{" "}
          <span className="fr" lang="fr">grandes jambes</span>,{" "}
          <span className="fr" lang="fr">grandes dents</span> (femenino). Y{" "}
          <span className="fr" lang="fr">la dent</span> es femenino, aunque{" "}
          <em>el diente</em> no lo es.
        </div>

        <div className="exception">
          <span className="fr" lang="fr">l’œil</span> hace el plural{" "}
          <span className="fr" lang="fr">les yeux</span>: otra palabra, no una{" "}
          <span className="fr" lang="fr">-s</span>. Y{" "}
          <span className="fr" lang="fr">le bras</span> ya termina en{" "}
          <span className="fr" lang="fr">-s</span>: en plural no cambia.
        </div>

        <p>
          Caperucita dice <span className="fr" lang="fr">vous</span> a su
          abuela: <span className="fr" lang="fr">que vous avez</span>. El lobo,
          que hace de abuela, le dice <span className="fr" lang="fr">tu</span>{" "}
          a la niña: <span className="fr" lang="fr">t’embrasser</span>,{" "}
          <span className="fr" lang="fr">te voir</span>.{" "}
          <span className="fr" lang="fr">vous</span> es para respetar a una
          persona mayor; <span className="fr" lang="fr">tu</span>, para un niño.
          La traducción dice <em>tienes</em>, como el cuento en español: allí
          no se nota la diferencia.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Las otras palabras que necesitas para leer el texto</caption>
            <thead>
              <tr>
                <th scope="col">Palabra</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">la mère-grand</th>
                <td>
                  la abuela; palabra antigua, hoy se dice{" "}
                  <span className="fr" lang="fr">la grand-mère</span>
                </td>
                <td className="fr" lang="fr">
                  Le petit Chaperon rouge va chez sa mère-grand.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la galette</th>
                <td>una torta redonda y plana</td>
                <td className="fr" lang="fr">
                  Elle apporte une galette et un pot de beurre.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la huche</th>
                <td>el arcón donde se guarda el pan; palabra antigua</td>
                <td className="fr" lang="fr">Mets la galette sur la huche.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">la couverture</th>
                <td>la manta de la cama</td>
                <td className="fr" lang="fr">
                  Le Loup est sous la couverture.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">se coucher</th>
                <td>acostarse, meterse en la cama</td>
                <td className="fr" lang="fr">Viens te coucher avec moi.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">embrasser</th>
                <td>
                  en el texto, <em>abrazar</em> (viene de{" "}
                  <span className="fr" lang="fr">bras</span>); hoy, dar un
                  beso. Para abrazar hoy se dice{" "}
                  <span className="fr" lang="fr">serrer dans ses bras</span>
                </td>
                <td className="fr" lang="fr">
                  Elle embrasse sa grand-mère sur la joue.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">mieux</th>
                <td>mejor, con un verbo</td>
                <td className="fr" lang="fr">C’est pour mieux écouter.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">méchant</th>
                <td>malo, que hace daño</td>
                <td className="fr" lang="fr">Le Loup est méchant.</td>
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
    </article>
  );
}
