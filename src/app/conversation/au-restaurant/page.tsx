import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/au-restaurant";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "une table pour deux",
  "réserver",
  "la carte",
  "le menu",
  "la formule",
  "le plat du jour",
  "une entrée",
  "un plat",
  "un dessert",
  "qu’est-ce qu’il y a dans",
  "je vais prendre",
  "sans viande",
  "je suis allergique à",
  "à point",
  "saignant",
  "une carafe d’eau",
  "un verre de vin",
  "c’est froid",
  "l’addition",
  "le service est compris",
  "par carte",
  "séparément",
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
          Vous dînez au restaurant avec quelqu’un. Quelqu’un d’autre joue le
          serveur : il accueille, il explique la carte, il prend la commande, il
          apporte l’addition. Vous, vous devez obtenir une table, comprendre ce
          qu’on vous propose, commander ce que vous voulez vraiment manger et
          partir sans avoir payé de travers.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Cenas en un restaurante con alguien. Otra persona hace de camarero:
          recibe, explica la carta, toma nota del pedido y trae la cuenta. Tú
          tienes que conseguir una mesa, entender lo que te proponen, pedir lo
          que de verdad quieres comer e irte habiendo pagado lo que toca.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          Un repas au restaurant suit presque toujours le même ordre, et chaque
          étape appelle une phrase que vous seul pouvez produire.
        </p>

        <ol>
          <li>Demander une table, et dire combien vous êtes.</li>
          <li>Faire expliquer ce que vous ne comprenez pas sur la carte.</li>
          <li>Commander dans l’ordre : entrée, plat, boisson.</li>
          <li>Dire ce que vous ne mangez pas, ou signaler un problème.</li>
          <li>Demander l’addition, et dire comment vous payez.</li>
        </ol>

        <div className="attention">
          <span className="fr">la carte</span> et{" "}
          <span className="fr">le menu</span> ne désignent pas la même chose.{" "}
          <span className="fr">la carte</span> est la liste de tous les plats,
          avec un prix par plat. <span className="fr">le menu</span> est un
          ensemble à prix fixe, souvent une entrée, un plat et un dessert. Si
          vous demandez <span className="fr">le menu</span> en voulant la liste,
          on vous proposera une formule.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Une carafe d’eau ne se paie pas. Il faut simplement la demander.
          </p>
          <p>
            Dans un restaurant en France, l’eau du robinet est servie
            gratuitement sur demande :{" "}
            <span className="fr">une carafe d’eau, s’il vous plaît</span>. Si
            vous dites seulement <span className="fr">de l’eau</span>, on vous
            apportera une bouteille, et elle sera sur l’addition.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          Una comida en un restaurante sigue casi siempre el mismo orden, y cada
          etapa pide una frase que solo tú puedes producir.
        </p>
        <ol>
          <li>Pedir una mesa y decir cuántos sois.</li>
          <li>Hacer que te expliquen lo que no entiendes de la carta.</li>
          <li>Pedir por orden: entrante, plato, bebida.</li>
          <li>Decir lo que no comes o avisar de un problema.</li>
          <li>Pedir la cuenta y decir cómo pagas.</li>
        </ol>
        <div className="attention">
          <span className="fr" lang="fr">
            la carte
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            le menu
          </span>{" "}
          no son lo mismo.{" "}
          <span className="fr" lang="fr">
            la carte
          </span>{" "}
          es la lista de todos los platos, con un precio por plato.{" "}
          <span className="fr" lang="fr">
            le menu
          </span>{" "}
          es un conjunto a precio fijo, a menudo un entrante, un plato y un
          postre. Si pides{" "}
          <span className="fr" lang="fr">
            le menu
          </span>{" "}
          queriendo la lista, te propondrán una{" "}
          <span className="fr" lang="fr">formule</span>: un menú cerrado.
        </div>
        <div className="astuce">
          <p className="astuce-hook">
            Una jarra de agua no se paga. Solo hay que pedirla.
          </p>
          <p>
            En un restaurante de Francia, el agua del grifo se sirve gratis si
            la pides:{" "}
            <span className="fr" lang="fr">
              une carafe d’eau, s’il vous plaît
            </span>
            . Si dices solo{" "}
            <span className="fr" lang="fr">
              de l’eau
            </span>
            , te traerán una botella, y saldrá en la cuenta.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir le repas du début à la fin. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para llevar la comida de principio a fin. Coge lo que te
          sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
