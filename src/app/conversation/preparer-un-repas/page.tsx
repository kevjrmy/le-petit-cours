import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/preparer-un-repas";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
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

      <section>
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
          un frigo se décrit surtout à la forme négative, et la négation change
          l’article : <span className="fr">il n’y a plus de lait</span>,{" "}
          <span className="fr">il ne reste plus de beurre</span>. Jamais{" "}
          <span className="fr">plus du lait</span>. Le raccourci est dans{" "}
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

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la conversation du frigo jusqu’à la liste. Prenez ce qui
          vous sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>faire les courses</li>
          <li>la liste</li>
          <li>il faut</li>
          <li>il reste</li>
          <li>il n’y a plus de</li>
          <li>du pain</li>
          <li>du fromage</li>
          <li>de la farine</li>
          <li>de l’huile</li>
          <li>des œufs</li>
          <li>des tomates</li>
          <li>un kilo</li>
          <li>une douzaine</li>
          <li>un paquet</li>
          <li>une bouteille</li>
          <li>assez de</li>
          <li>trop de</li>
          <li>une entrée</li>
          <li>un plat</li>
          <li>un dessert</li>
          <li>je ne mange pas de</li>
          <li>le marché</li>
          <li>le supermarché</li>
          <li>ça suffit</li>
        </ul>
      </section>
    </article>
  );
}
