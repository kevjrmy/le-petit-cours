import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/choisir-un-cadeau";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
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

      <section>
        <h2>Les étapes</h2>

        <p>
          L’échange suit presque toujours le même ordre, et chaque étape appelle
          une phrase que vous seul pouvez produire.
        </p>

        <ol>
          <li>Dire pour qui est le cadeau, et à peu près ce que vous voulez mettre.</li>
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
            le livre est un cadeau et qu’elle le garde. Dans une boutique,
            c’est le mot juste pour expliquer ce que vous cherchez :{" "}
            <span className="fr">c’est pour offrir</span>.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir l’échange du début à la fin. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <ul className="mots">
          <li>un cadeau</li>
          <li>c’est pour offrir</li>
          <li>la vitrine</li>
          <li>le rayon</li>
          <li>vous pouvez me montrer</li>
          <li>celui-ci</li>
          <li>celui-là</li>
          <li>celle-là</li>
          <li>ceux-là</li>
          <li>une écharpe</li>
          <li>un portefeuille</li>
          <li>un carnet</li>
          <li>des boucles d’oreilles</li>
          <li>la couleur</li>
          <li>la taille</li>
          <li>combien ça coûte</li>
          <li>moins cher</li>
          <li>plus joli</li>
          <li>ça me plaît</li>
          <li>je préfère</li>
          <li>un paquet cadeau</li>
          <li>par carte</li>
        </ul>
      </section>
    </article>
  );
}
