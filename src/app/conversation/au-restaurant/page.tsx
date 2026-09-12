import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/au-restaurant";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
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

      <section>
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

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir le repas du début à la fin. Prenez ce qui vous sert,
          laissez le reste.
        </p>

        <ul className="mots">
          <li>une table pour deux</li>
          <li>réserver</li>
          <li>la carte</li>
          <li>le menu</li>
          <li>la formule</li>
          <li>le plat du jour</li>
          <li>une entrée</li>
          <li>un plat</li>
          <li>un dessert</li>
          <li>qu’est-ce qu’il y a dans</li>
          <li>je vais prendre</li>
          <li>sans viande</li>
          <li>je suis allergique à</li>
          <li>à point</li>
          <li>saignant</li>
          <li>une carafe d’eau</li>
          <li>un verre de vin</li>
          <li>c’est froid</li>
          <li>l’addition</li>
          <li>le service est compris</li>
          <li>par carte</li>
          <li>séparément</li>
        </ul>
      </section>
    </article>
  );
}
