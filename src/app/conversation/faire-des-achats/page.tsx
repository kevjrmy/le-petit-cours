import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/faire-des-achats";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La situation</h2>

        <p>
          Vous entrez dans une boulangerie, ou vous arrivez devant un étal au
          marché. Quelqu’un d’autre joue le vendeur : il salue, il sert, il
          propose autre chose, il annonce le prix. Vous devez demander ce que
          vous voulez avec la bonne quantité, comprendre le prix, et payer.
        </p>

        <Situations />
      </section>

      <section>
        <h2>Les étapes</h2>

        <p>
          Un achat suit toujours le même ordre, et il est court. Cinq phrases
          suffisent.
        </p>

        <ol>
          <li>Saluer en entrant, et attendre votre tour.</li>
          <li>Demander ce que vous voulez, avec la quantité.</li>
          <li>Demander le prix, et demander de répéter si besoin.</li>
          <li>Ajouter quelque chose, ou dire que c’est tout.</li>
          <li>Payer, et saluer en sortant.</li>
        </ol>

        <div className="attention">
          on n’achète pas avec <span className="fr">je veux</span>.{" "}
          <span className="fr">je veux une baguette</span> s’entend comme un
          ordre. La forme polie est{" "}
          <span className="fr">je voudrais une baguette</span>, et c’est celle
          qu’on emploie partout, dans un magasin comme au restaurant.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            En France, on dit bonjour avant de dire ce qu’on veut.
          </p>
          <p>
            Entrer dans un petit commerce et demander quelque chose sans avoir
            salué est mal reçu, même si la phrase est parfaite. Le{" "}
            <span className="fr">bonjour</span> vient en premier, et le{" "}
            <span className="fr">au revoir</span> en sortant, même si vous
            n’avez rien acheté.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi acheter et payer. Prenez ce qui vous sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>bonjour</li>
          <li>je voudrais</li>
          <li>s’il vous plaît</li>
          <li>une baguette</li>
          <li>un croissant</li>
          <li>un kilo de</li>
          <li>une tranche de</li>
          <li>un morceau de</li>
          <li>une bouteille de</li>
          <li>six œufs</li>
          <li>celui-ci</li>
          <li>le grand</li>
          <li>le petit</li>
          <li>autre chose</li>
          <li>c’est tout</li>
          <li>ça fait combien ?</li>
          <li>c’est combien ?</li>
          <li>vous pouvez répéter ?</li>
          <li>par carte</li>
          <li>en espèces</li>
          <li>la monnaie</li>
          <li>un sac</li>
          <li>merci</li>
          <li>au revoir</li>
        </ul>
      </section>
    </article>
  );
}
