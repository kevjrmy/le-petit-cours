import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/choisir-un-cadeau";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "un cadeau",
  "c’est pour offrir",
  "la vitrine",
  "le rayon",
  "vous pouvez me montrer",
  "celui-ci",
  "celui-là",
  "celle-là",
  "ceux-là",
  "une écharpe",
  "un portefeuille",
  "un carnet",
  "des boucles d’oreilles",
  "la couleur",
  "la taille",
  "combien ça coûte",
  "moins cher",
  "plus joli",
  "ça me plaît",
  "je préfère",
  "un paquet cadeau",
  "par carte",
];

function Mots() {
  return (
    <ul className="mots">
      {WORDS.map((w) => (
        <li key={w} lang="fr">
          {w}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>La situation</h2>

        <p>
          Vous entrez dans une boutique pour acheter un cadeau. Quelqu’un
          d’autre joue le vendeur : il montre, il compare, il annonce les prix,
          il emballe. Vous, vous devez dire pour qui c’est, faire sortir deux ou
          trois objets, les comparer à voix haute et repartir avec celui que
          vous avez choisi.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Entras en una tienda para comprar un regalo. Otra persona hace de
          dependiente: enseña, compara, dice los precios, envuelve. Tú tienes
          que decir para quién es, hacer que saque dos o tres objetos,
          compararlos en voz alta y salir con el que has elegido.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          L’échange suit presque toujours le même ordre, et chaque étape appelle
          une phrase que vous seul pouvez produire.
        </p>

        <ol>
          <li>
            Dire pour qui est le cadeau, et à peu près ce que vous voulez
            mettre.
          </li>
          <li>Faire sortir deux ou trois objets, en les montrant.</li>
          <li>Comparer deux objets, et dire ce qui les sépare.</li>
          <li>Choisir, et dire pourquoi celui-là plutôt que l’autre.</li>
          <li>Demander un paquet cadeau, puis payer.</li>
        </ol>

        <div className="attention">
          <span className="fr">celui-là</span> ne peut reprendre qu’un nom déjà
          dit. Tant que personne n’a prononcé le mot, gardez le nom avec vous :{" "}
          <span className="fr">cette écharpe-là</span>,{" "}
          <span className="fr">ce carnet-là</span>. Dès que le vendeur a nommé
          l’objet, le nom disparaît et il ne reste que{" "}
          <span className="fr">celui-là</span> ou{" "}
          <span className="fr">celle-là</span>, au bon genre.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>offrir</strong> veut dire donner en cadeau.
          </p>
          <p>
            Le verbe ne parle ni d’un prix ni d’une proposition commerciale :{" "}
            <span className="fr">j’offre un livre à ma sœur</span> veut dire que
            le livre est un cadeau et qu’elle le garde. Dans une boutique, c’est
            le mot juste pour expliquer ce que vous cherchez :{" "}
            <span className="fr">c’est pour offrir</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          El intercambio sigue casi siempre el mismo orden, y cada etapa pide
          una frase que solo tú puedes producir.
        </p>
        <ol>
          <li>
            Decir para quién es el regalo y más o menos cuánto quieres gastar.
          </li>
          <li>Hacer que saque dos o tres objetos, señalándolos.</li>
          <li>Comparar dos objetos y decir qué los distingue.</li>
          <li>Elegir, y decir por qué ese y no el otro.</li>
          <li>Pedir que te lo envuelvan para regalo y luego pagar.</li>
        </ol>
        <div className="attention">
          <span className="fr" lang="fr">
            celui-là
          </span>{" "}
          solo puede retomar un nombre ya dicho. Mientras nadie haya pronunciado
          la palabra, quédate con el nombre:{" "}
          <span className="fr" lang="fr">
            cette écharpe-là
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            ce carnet-là
          </span>
          . En cuanto el dependiente ha nombrado el objeto, el nombre desaparece
          y solo queda{" "}
          <span className="fr" lang="fr">
            celui-là
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            celle-là
          </span>
          , con el género correcto.
        </div>
        <div className="astuce">
          <p className="astuce-hook">
            <strong lang="fr">offrir</strong> significa dar como regalo.
          </p>
          <p>
            El verbo no habla de un precio ni de una oferta comercial:{" "}
            <span className="fr" lang="fr">
              j’offre un livre à ma sœur
            </span>{" "}
            quiere decir que el libro es un regalo y que ella se lo queda. En
            una tienda es la palabra justa para explicar lo que buscas:{" "}
            <span className="fr" lang="fr">
              c’est pour offrir
            </span>
            .
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir l’échange du début à la fin. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para llevar el intercambio de principio a fin. Coge lo
          que te sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
