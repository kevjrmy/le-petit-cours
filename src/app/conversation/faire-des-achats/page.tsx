import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/faire-des-achats";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French with a Spanish gloss (A1, #85),
   written once and shared. */
const Fr = ({ children }: { children: ReactNode }) => (
  <span className="fr" lang="fr">
    {children}
  </span>
);

const WORDS: { fr: string; es: string }[] = [
  { fr: "bonjour", es: "hola" },
  { fr: "je voudrais", es: "quisiera" },
  { fr: "s’il vous plaît", es: "por favor" },
  { fr: "une baguette", es: "una barra de pan" },
  { fr: "un croissant", es: "un cruasán" },
  { fr: "un kilo de", es: "un kilo de" },
  { fr: "une tranche de", es: "una loncha, una rebanada de" },
  { fr: "un morceau de", es: "un trozo de" },
  { fr: "une bouteille de", es: "una botella de" },
  { fr: "six œufs", es: "seis huevos" },
  { fr: "celui-ci", es: "este, de aquí" },
  { fr: "le grand", es: "el grande" },
  { fr: "le petit", es: "el pequeño" },
  { fr: "autre chose", es: "algo más" },
  { fr: "c’est tout", es: "eso es todo" },
  { fr: "ça fait combien ?", es: "¿cuánto es?" },
  { fr: "c’est combien ?", es: "¿cuánto cuesta?" },
  { fr: "vous pouvez répéter ?", es: "¿puede repetir?" },
  { fr: "je peux payer par carte ?", es: "¿puedo pagar con tarjeta?" },
  { fr: "en espèces", es: "en efectivo" },
  { fr: "la monnaie", es: "el cambio, las monedas" },
  { fr: "un sac", es: "una bolsa" },
  { fr: "merci", es: "gracias" },
  { fr: "au revoir", es: "adiós" },
];

function Mots() {
  return (
    <ul className="mots">
      {WORDS.map((w) => (
        <li key={w.fr}>
          <Fr>{w.fr}</Fr> (<span lang="es">{w.es}</span>)
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
          Vous entrez dans une boulangerie ou vous arrivez à un stand du marché.
          Une autre personne joue le rôle du vendeur : il vous dit bonjour, il vous
          sert, il propose autre chose et il dit le prix. Vous devez demander ce
          que vous voulez avec la bonne quantité, comprendre le prix et payer.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>

        <p>
          Entras en una panadería o llegas a un puesto del mercado. Otra persona
          hace de vendedor: saluda, te sirve, te ofrece algo más y te dice el
          precio. Tú tienes que pedir lo que quieres con la cantidad justa,
          entender el precio y pagar.
        </p>

        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Un achat suit toujours le même ordre, et il est court. Cinq phrases
          suffisent.
        </p>

        <ol>
          <li>Dites bonjour en entrant et attendez votre tour.</li>
          <li>Demandez ce que vous voulez, avec la quantité.</li>
          <li>
            Demandez le prix et demandez de répéter si c’est nécessaire.
          </li>
          <li>Ajoutez quelque chose ou dites que c’est tout.</li>
          <li>Payez et dites au revoir en sortant.</li>
        </ol>

        <div className="attention">
          Pour acheter, on ne dit pas <Fr>je veux</Fr> :{" "}
          <Fr>je veux une baguette</Fr> ressemble à un ordre. La forme polie est <Fr>je voudrais</Fr>. On
          l’utilise partout, dans un magasin comme dans un restaurant. Après une
          quantité, on met <Fr>de</Fr>, sans article :{" "}
          <Fr>un kilo de pommes</Fr>, pas{" "}
          <s className="fr">un kilo des pommes</s>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            En France, on dit <Fr>bonjour</Fr> avant de demander.
          </p>
          <p>
            Entrer dans un petit magasin et demander sans dire bonjour est mal
            vu, même si la phrase est parfaite. D’abord <Fr>bonjour</Fr>, et en
            sortant <Fr>au revoir</Fr>, même si vous n’avez rien acheté.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
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
          No se compra con <Fr>je veux</Fr>: <Fr>je veux une baguette</Fr> suena
          como una orden. La forma educada es <Fr>je voudrais</Fr>, y se usa en
          todas partes, en una tienda igual que en un restaurante. Después de
          una cantidad, el nombre va con <Fr>de</Fr> y sin artículo:{" "}
          <Fr>un kilo de pommes</Fr>, no{" "}
          <s className="fr" lang="fr">
            un kilo des pommes
          </s>
          .
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            En Francia se dice <Fr>bonjour</Fr> antes de pedir.
          </p>
          <p>
            Entrar en un comercio pequeño y pedir sin saludar sienta mal, aunque
            la frase sea perfecta. Primero va <Fr>bonjour</Fr>, y al salir{" "}
            <Fr>au revoir</Fr>, incluso si no has comprado nada.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          Ce qu’il faut pour acheter et payer. Prenez ce qui vous sert, laissez
          le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>

        <p>
          Lo necesario para comprar y pagar. Coge lo que te sirva y deja el
          resto.
        </p>

        <Mots />
      </section>
    </article>
  );
}
