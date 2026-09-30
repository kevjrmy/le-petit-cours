import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/faire-des-achats";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>La situación</h2>

        <p>
          Entras en una panadería o llegas a un puesto del mercado. Otra persona
          hace de vendedor: saluda, te sirve, te ofrece algo más y te dice el
          precio. Tú tienes que pedir lo que quieres con la cantidad justa,
          entender el precio y pagar.
        </p>

        <Situations />
      </section>

      <section lang="es">
        <h2>Los pasos</h2>

        <p>
          Una compra sigue siempre el mismo orden y es breve. Bastan cinco
          frases.
        </p>

        <ol>
          <li>Saluda al entrar y espera tu turno.</li>
          <li>Pide lo que quieres, con la cantidad.</li>
          <li>Pregunta el precio y pide que lo repitan si hace falta.</li>
          <li>Añade algo más o di que eso es todo.</li>
          <li>Paga y despídete al salir.</li>
        </ol>

        <div className="attention">
          No se compra con{" "}
          <span className="fr" lang="fr">
            je veux
          </span>
          :{" "}
          <span className="fr" lang="fr">
            je veux une baguette
          </span>{" "}
          suena como una orden. La forma educada es{" "}
          <span className="fr" lang="fr">
            je voudrais
          </span>
          , y se usa en todas partes, en una tienda igual que en un restaurante.
          Después de una cantidad, el nombre va con{" "}
          <span className="fr" lang="fr">
            de
          </span>{" "}
          y sin artículo:{" "}
          <span className="fr" lang="fr">
            un kilo de pommes
          </span>
          , no{" "}
          <span className="fr" lang="fr">
            un kilo des pommes
          </span>
          .
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            En Francia se dice{" "}
            <span className="fr" lang="fr">
              bonjour
            </span>{" "}
            antes de pedir.
          </p>
          <p>
            Entrar en un comercio pequeño y pedir sin saludar sienta mal, aunque
            la frase sea perfecta. Primero va{" "}
            <span className="fr" lang="fr">
              bonjour
            </span>
            , y al salir{" "}
            <span className="fr" lang="fr">
              au revoir
            </span>
            , incluso si no has comprado nada.
          </p>
        </div>
      </section>

      <section lang="es">
        <h2>Las palabras para decirlo</h2>

        <p>
          Lo necesario para comprar y pagar. Coge lo que te sirva y deja el
          resto.
        </p>

        <ul className="mots">
          <li>
            <span className="fr" lang="fr">
              bonjour
            </span>{" "}
            (hola)
          </li>
          <li>
            <span className="fr" lang="fr">
              je voudrais
            </span>{" "}
            (quisiera)
          </li>
          <li>
            <span className="fr" lang="fr">
              s’il vous plaît
            </span>{" "}
            (por favor)
          </li>
          <li>
            <span className="fr" lang="fr">
              une baguette
            </span>{" "}
            (una barra de pan)
          </li>
          <li>
            <span className="fr" lang="fr">
              un croissant
            </span>{" "}
            (un cruasán)
          </li>
          <li>
            <span className="fr" lang="fr">
              un kilo de
            </span>{" "}
            (un kilo de)
          </li>
          <li>
            <span className="fr" lang="fr">
              une tranche de
            </span>{" "}
            (una loncha, una rebanada de)
          </li>
          <li>
            <span className="fr" lang="fr">
              un morceau de
            </span>{" "}
            (un trozo de)
          </li>
          <li>
            <span className="fr" lang="fr">
              une bouteille de
            </span>{" "}
            (una botella de)
          </li>
          <li>
            <span className="fr" lang="fr">
              six œufs
            </span>{" "}
            (seis huevos)
          </li>
          <li>
            <span className="fr" lang="fr">
              celui-ci
            </span>{" "}
            (este, de aquí)
          </li>
          <li>
            <span className="fr" lang="fr">
              le grand
            </span>{" "}
            (el grande)
          </li>
          <li>
            <span className="fr" lang="fr">
              le petit
            </span>{" "}
            (el pequeño)
          </li>
          <li>
            <span className="fr" lang="fr">
              autre chose
            </span>{" "}
            (algo más)
          </li>
          <li>
            <span className="fr" lang="fr">
              c’est tout
            </span>{" "}
            (eso es todo)
          </li>
          <li>
            <span className="fr" lang="fr">
              ça fait combien ?
            </span>{" "}
            (¿cuánto es?)
          </li>
          <li>
            <span className="fr" lang="fr">
              c’est combien ?
            </span>{" "}
            (¿cuánto cuesta?)
          </li>
          <li>
            <span className="fr" lang="fr">
              vous pouvez répéter ?
            </span>{" "}
            (¿puede repetir?)
          </li>
          <li>
            <span className="fr" lang="fr">
              je peux payer par carte ?
            </span>{" "}
            (¿puedo pagar con tarjeta?)
          </li>
          <li>
            <span className="fr" lang="fr">
              en espèces
            </span>{" "}
            (en efectivo)
          </li>
          <li>
            <span className="fr" lang="fr">
              la monnaie
            </span>{" "}
            (el cambio, las monedas)
          </li>
          <li>
            <span className="fr" lang="fr">
              un sac
            </span>{" "}
            (una bolsa)
          </li>
          <li>
            <span className="fr" lang="fr">
              merci
            </span>{" "}
            (gracias)
          </li>
          <li>
            <span className="fr" lang="fr">
              au revoir
            </span>{" "}
            (adiós)
          </li>
        </ul>
      </section>
    </article>
  );
}
