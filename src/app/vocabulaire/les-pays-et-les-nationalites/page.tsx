import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-pays-et-les-nationalites";

export const metadata = lessonMetadata(PATH);

function Fr({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>
          Los países: <Fr>les pays</Fr>
        </h2>

        <div className="rule">
          Aprende cada país con su artículo, porque el artículo dice el género.
          Un país que acaba en <Fr>-e</Fr> es femenino: <Fr>en</Fr> para estar,{" "}
          <Fr>de</Fr> (o <Fr>d’</Fr>) para venir. Los demás son masculinos:{" "}
          <Fr>au</Fr> y <Fr>du</Fr>, pero si empiezan por vocal también{" "}
          <Fr>en</Fr> y <Fr>d’</Fr> (<Fr>en Équateur</Fr>). Si el nombre es
          plural: <Fr>aux</Fr> y <Fr>des</Fr>. Con una ciudad, siempre{" "}
          <Fr>à</Fr> y <Fr>de</Fr>. Todos los casos están en{" "}
          <Link href="/astuces/a-en-au-aux" lang="fr">
            À, en, au, aux
          </Link>
          .
        </div>

        <div className="table-wrap">
          <table>
            <caption>Quince países, con su artículo y una frase</caption>
            <thead>
              <tr>
                <th scope="col">País</th>
                <th scope="col">En español</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Espagne (f.)
                </th>
                <td>España</td>
                <td className="fr" lang="fr">
                  Je viens d’Espagne.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la France
                </th>
                <td>Francia</td>
                <td className="fr" lang="fr">
                  J’habite en France.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Portugal
                </th>
                <td>Portugal</td>
                <td className="fr" lang="fr">
                  Elle habite au Portugal.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Italie (f.)
                </th>
                <td>Italia</td>
                <td className="fr" lang="fr">
                  Nous venons d’Italie.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Allemagne (f.)
                </th>
                <td>Alemania</td>
                <td className="fr" lang="fr">
                  Il vient d’Allemagne.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Royaume-Uni
                </th>
                <td>el Reino Unido</td>
                <td className="fr" lang="fr">
                  Je viens du Royaume-Uni.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  les États-Unis (m. pl.)
                </th>
                <td>Estados Unidos</td>
                <td className="fr" lang="fr">
                  J’habite aux États-Unis.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Mexique
                </th>
                <td>México</td>
                <td className="fr" lang="fr">
                  J’habite au Mexique.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Colombie
                </th>
                <td>Colombia</td>
                <td className="fr" lang="fr">
                  Je viens de Colombie.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Argentine (f.)
                </th>
                <td>Argentina</td>
                <td className="fr" lang="fr">
                  Elle vient d’Argentine.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Pérou
                </th>
                <td>Perú</td>
                <td className="fr" lang="fr">
                  Ils habitent au Pérou.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Chili
                </th>
                <td>Chile</td>
                <td className="fr" lang="fr">
                  Je viens du Chili.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Équateur (m.)
                </th>
                <td>Ecuador</td>
                <td className="fr" lang="fr">
                  J’habite en Équateur.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Maroc
                </th>
                <td>Marruecos</td>
                <td className="fr" lang="fr">
                  Il vient du Maroc.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Chine
                </th>
                <td>China</td>
                <td className="fr" lang="fr">
                  Elle habite en Chine.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example" lang="fr">
          J’habite à Madrid, en Espagne.
          <br />
          Il vient de Lima, au Pérou.
          <br />
          Elle habite à Mexico, au Mexique.
        </div>

        <div className="exception">
          <Fr>le Mexique</Fr> acaba en <Fr>-e</Fr>, pero es masculino:{" "}
          <Fr>au Mexique</Fr>, <Fr>du Mexique</Fr>. Pasa lo mismo con{" "}
          <Fr>le Cambodge</Fr> y <Fr>le Mozambique</Fr>. Cuidado con la
          escritura: <Fr>Mexique</Fr> lleva x, no j.
        </div>
      </section>

      <section lang="es">
        <h2>
          Las nacionalidades: <Fr>les nationalités</Fr>
        </h2>

        <div className="rule">
          La nacionalidad es un adjetivo y concuerda contigo: un hombre dice{" "}
          <Fr>Je suis espagnol</Fr>, una mujer dice <Fr>Je suis espagnole</Fr>.
          Casi siempre se añade una <Fr>-e</Fr> al masculino. Si el masculino ya
          acaba en <Fr>-e</Fr>, no cambia: <Fr>belge</Fr>, <Fr>suisse</Fr>,{" "}
          <Fr>russe</Fr>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Quince países y su nacionalidad, en masculino y en femenino
            </caption>
            <thead>
              <tr>
                <th scope="col">País</th>
                <th scope="col">Masculino</th>
                <th scope="col">Femenino</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Espagne
                </th>
                <td className="fr" lang="fr">
                  espagnol
                </td>
                <td className="fr" lang="fr">
                  espagnole
                </td>
                <td className="fr" lang="fr">
                  Elle est espagnole.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la France
                </th>
                <td className="fr" lang="fr">
                  français
                </td>
                <td className="fr" lang="fr">
                  française
                </td>
                <td className="fr" lang="fr">
                  Il est français.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Italie
                </th>
                <td className="fr" lang="fr">
                  italien
                </td>
                <td className="fr" lang="fr">
                  italienne
                </td>
                <td className="fr" lang="fr">
                  Elle est italienne.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Portugal
                </th>
                <td className="fr" lang="fr">
                  portugais
                </td>
                <td className="fr" lang="fr">
                  portugaise
                </td>
                <td className="fr" lang="fr">
                  Il est portugais.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Allemagne
                </th>
                <td className="fr" lang="fr">
                  allemand
                </td>
                <td className="fr" lang="fr">
                  allemande
                </td>
                <td className="fr" lang="fr">
                  Elle est allemande.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Angleterre
                </th>
                <td className="fr" lang="fr">
                  anglais
                </td>
                <td className="fr" lang="fr">
                  anglaise
                </td>
                <td className="fr" lang="fr">
                  Il est anglais.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Mexique
                </th>
                <td className="fr" lang="fr">
                  mexicain
                </td>
                <td className="fr" lang="fr">
                  mexicaine
                </td>
                <td className="fr" lang="fr">
                  Elle est mexicaine.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Colombie
                </th>
                <td className="fr" lang="fr">
                  colombien
                </td>
                <td className="fr" lang="fr">
                  colombienne
                </td>
                <td className="fr" lang="fr">
                  Il est colombien.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  l’Argentine
                </th>
                <td className="fr" lang="fr">
                  argentin
                </td>
                <td className="fr" lang="fr">
                  argentine
                </td>
                <td className="fr" lang="fr">
                  Elle est argentine.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  le Maroc
                </th>
                <td className="fr" lang="fr">
                  marocain
                </td>
                <td className="fr" lang="fr">
                  marocaine
                </td>
                <td className="fr" lang="fr">
                  Il est marocain.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Chine
                </th>
                <td className="fr" lang="fr">
                  chinois
                </td>
                <td className="fr" lang="fr">
                  chinoise
                </td>
                <td className="fr" lang="fr">
                  Elle est chinoise.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  les États-Unis
                </th>
                <td className="fr" lang="fr">
                  américain
                </td>
                <td className="fr" lang="fr">
                  américaine
                </td>
                <td className="fr" lang="fr">
                  Elle est américaine.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Belgique
                </th>
                <td className="fr" lang="fr">
                  belge
                </td>
                <td className="fr" lang="fr">
                  belge
                </td>
                <td className="fr" lang="fr">
                  Il est belge.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Suisse
                </th>
                <td className="fr" lang="fr">
                  suisse
                </td>
                <td className="fr" lang="fr">
                  suisse
                </td>
                <td className="fr" lang="fr">
                  Elle est suisse.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">
                  la Russie
                </th>
                <td className="fr" lang="fr">
                  russe
                </td>
                <td className="fr" lang="fr">
                  russe
                </td>
                <td className="fr" lang="fr">
                  Il est russe.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example" lang="fr">
          Je suis espagnol. Ma mère est française.
          <br />
          Mon amie est italienne et mon ami est portugais.
        </div>

        <div className="attention">
          En femenino se oye la consonante final, que en masculino es muda:{" "}
          <Fr>français</Fr> termina casi en «é», pero <Fr>française</Fr> termina
          en una s sonora, como la s de «mismo» (un zumbido). <Fr>italien</Fr>{" "}
          termina en vocal nasal (la n no suena); <Fr>italienne</Fr> termina en
          «-ièn», con la n bien pronunciada. Con <Fr>espagnol</Fr> no cambia el
          sonido, solo la escritura.
        </div>
      </section>

      <section lang="es">
        <h2>
          Presentarte: <Fr>je suis, je viens de, j’habite</Fr>
        </h2>

        <div className="rule">
          Un adjetivo de nacionalidad se escribe con minúscula:{" "}
          <Fr>Il est français</Fr>. Un sustantivo que nombra a una persona lleva
          mayúscula: <Fr>un Français</Fr>, <Fr>une Espagnole</Fr>. Las lenguas
          van con minúscula: <Fr>le français</Fr>, <Fr>l’espagnol</Fr>.
        </div>

        <div className="example" lang="fr">
          Tu viens d’où ? Je viens d’Espagne.
          <br />
          Tu habites où ? J’habite à Lyon, en France.
          <br />
          C’est un Français, il habite à Lyon.
          <br />
          Je parle français et espagnol.
        </div>

        <div className="attention">
          En español, «español» va con minúscula tanto en «es español» como en
          «un español». En francés cambia: el adjetivo va en minúscula (
          <Fr>Il est espagnol</Fr>) y el sustantivo en mayúscula (
          <Fr>C’est un Espagnol</Fr>). Y ojo con dos nacionalidades:{" "}
          <Fr>anglais</Fr> es de Inglaterra (para el Reino Unido se dice{" "}
          <Fr>britannique</Fr>), y <Fr>américain</Fr> es de Estados Unidos. Un
          colombiano dice <Fr>Je suis colombien</Fr>, nunca <Fr>américain</Fr>.
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            País en <Fr>-e</Fr>: <Fr>en France</Fr>, <Fr>d’Espagne</Fr>. Los
            demás: <Fr>au Portugal</Fr>, <Fr>du Maroc</Fr>; plural:{" "}
            <Fr>aux États-Unis</Fr>.
          </li>
          <li>
            Ciudad: siempre <Fr>à</Fr>, como en <Fr>J’habite à Madrid</Fr>.
            Excepción: <Fr>le Mexique</Fr> es masculino.
          </li>
          <li>
            La nacionalidad concuerda: <Fr>espagnol</Fr> y <Fr>espagnole</Fr>.
            Si ya acaba en <Fr>-e</Fr>, no cambia: <Fr>belge</Fr>.
          </li>
          <li>
            El femenino cambia el sonido: <Fr>français</Fr> y <Fr>française</Fr>
            ; <Fr>italien</Fr> y <Fr>italienne</Fr>.
          </li>
          <li>
            Minúscula para el adjetivo (<Fr>il est français</Fr>) y para la
            lengua; mayúscula para la persona (<Fr>un Français</Fr>).
          </li>
        </ul>
      </div>
    </article>
  );
}
