import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/preparer-un-repas";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102): CSS shows the
   interface's. The words to say are French, written once and shared. */
const WORDS = [
  "faire les courses",
  "la liste",
  "il faut",
  "il reste",
  "il n’y a plus de",
  "du pain",
  "du fromage",
  "de la farine",
  "de l’huile",
  "des œufs",
  "des tomates",
  "un kilo",
  "une douzaine",
  "un paquet",
  "une bouteille",
  "assez de",
  "trop de",
  "une entrée",
  "un plat",
  "un dessert",
  "je ne mange pas de",
  "le marché",
  "le supermarché",
  "ça suffit",
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
          Vous recevez des amis et vous préparez le repas à deux. Quelqu’un
          d’autre joue celui qui cuisine avec vous : il propose, il compte, il
          ouvre le frigo, il tient la liste. Vous, vous devez décider ce qu’on
          mange, dire ce qu’il faut acheter et en quelle quantité, et repartir
          avec une liste utilisable.
        </p>

        <Situations />
      </section>

      <section data-ui="es" lang="es">
        <h2>La situación</h2>
        <p>
          Recibes a unos amigos y preparáis la comida entre dos. Otra persona
          hace de quien cocina contigo: propone, cuenta, abre la nevera, lleva
          la lista. Tú tienes que decidir qué se come, decir qué hay que comprar
          y en qué cantidad, y salir con una lista que sirva.
        </p>
        <Situations />
      </section>

      <section data-ui="fr">
        <h2>Les étapes</h2>

        <p>
          La conversation suit presque toujours le même ordre, et chaque étape
          appelle une phrase que vous seul pouvez produire.
        </p>

        <ol>
          <li>Dire combien vous serez, et ce que chacun ne mange pas.</li>
          <li>Proposer un plat, et dire ce qu’il faut pour le faire.</li>
          <li>Faire l’inventaire : ce qu’il y a déjà, ce qui manque.</li>
          <li>Fixer les quantités, chose par chose.</li>
          <li>Se partager les courses et dire qui achète quoi.</li>
        </ol>

        <div className="attention">
          Un frigo se décrit surtout à la forme négative, et la négation change
          l’article : <span className="fr">il n’y a plus de lait</span>,{" "}
          <span className="fr">il ne reste plus de beurre</span>. Jamais{" "}
          <s className="fr">plus du lait</s>. Le raccourci est dans{" "}
          <Link href="/astuces/pas-de">pas de ou pas un ?</Link>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Tant qu’on ne compte pas, c’est <strong>du</strong> ; dès qu’on
            compte, c’est un nombre.
          </p>
          <p>
            <span className="fr">il faut de la farine</span> et{" "}
            <span className="fr">il faut trois œufs</span> se disent dans la
            même phrase sans se contredire : la farine ne se compte pas, les
            œufs oui. Et dès qu’une quantité est donnée, il ne reste que{" "}
            <span className="fr">de</span> :{" "}
            <span className="fr">un kilo de tomates</span>,{" "}
            <span className="fr">une bouteille d’huile</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las etapas</h2>
        <p>
          La conversación sigue casi siempre el mismo orden, y cada etapa pide
          una frase que solo tú puedes producir.
        </p>
        <ol>
          <li>Decir cuántos seréis y lo que no come cada uno.</li>
          <li>Proponer un plato y decir qué hace falta para hacerlo.</li>
          <li>Hacer el inventario: lo que ya hay, lo que falta.</li>
          <li>Fijar las cantidades, cosa por cosa.</li>
          <li>Repartir la compra y decir quién compra qué.</li>
        </ol>
        <div className="attention">
          Una nevera se describe sobre todo en forma negativa, y la negación
          cambia el artículo:{" "}
          <span className="fr" lang="fr">
            il n’y a plus de lait
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            il ne reste plus de beurre
          </span>
          . Nunca{" "}
          <s className="fr" lang="fr">
            plus du lait
          </s>
          . El atajo está en{" "}
          <Link href="/astuces/pas-de" lang="fr">
            pas de ou pas un ?
          </Link>
        </div>
        <div className="astuce">
          <p className="astuce-hook">
            Mientras no se cuenta, es <strong lang="fr">du</strong>; en cuanto
            se cuenta, es un número.
          </p>
          <p>
            <span className="fr" lang="fr">
              il faut de la farine
            </span>{" "}
            e{" "}
            <span className="fr" lang="fr">
              il faut trois œufs
            </span>{" "}
            se dicen en la misma frase sin contradecirse: la harina no se
            cuenta, los huevos sí. Y en cuanto se da una cantidad, solo queda{" "}
            <span className="fr" lang="fr">
              de
            </span>
            :{" "}
            <span className="fr" lang="fr">
              un kilo de tomates
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              une bouteille d’huile
            </span>
            .
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation du frigo jusqu’à la liste. Prenez ce qui
          vous sert, laissez le reste.
        </p>

        <Mots />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras para decirlo</h2>
        <p>
          Lo necesario para llevar la conversación de la nevera a la lista. Coge
          lo que te sirva y deja el resto.
        </p>
        <Mots />
      </section>
    </article>
  );
}
