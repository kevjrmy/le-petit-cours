import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/ces-ou-ses";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Collez « -là » au nom</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Si <strong>-là</strong> peut se coller au nom qui suit, écrivez{" "}
            <strong>ces</strong>.
          </p>
          <p>
            <span className="fr">ces</span> montre, et ce qu’on montre accepte
            toujours qu’on le montre une deuxième fois. Le possessif, lui,
            refuse : rien ne se montre dans{" "}
            <span className="fr">ses chaussures</span>, il y a seulement
            quelqu’un à qui elles sont.
          </p>
        </div>

        <div className="example">
          <strong>Ces</strong> chaussures sont neuves. →{" "}
          <strong>Ces chaussures-là</strong> sont neuves. ✓
          <br />
          Il a perdu <strong>ses</strong> chaussures. → Il a perdu{" "}
          <strong>ses chaussures-là</strong>. ✗
        </div>

        <div className="exception">
          le test dit ce qui est possible, pas ce que vous vouliez écrire.{" "}
          <span className="fr">Il range ces livres</span> et{" "}
          <span className="fr">Il range ses livres</span> passent le test toutes
          les deux, parce que les deux phrases existent. Quand c’est le cas, le
          test ne sert à rien : voyez la section suivante.
        </div>
      </section>

      <section>
        <h2>Cherchez le propriétaire</h2>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>ses</strong> a toujours quelqu’un derrière lui.
          </p>
          <p>
            Remplacez par <span className="fr">les siens</span> ou{" "}
            <span className="fr">les siennes</span>. Si la phrase garde son
            sens, il y a un possesseur, et le mot s’écrit{" "}
            <span className="fr">ses</span>. Si personne n’apparaît, c’est{" "}
            <span className="fr">ces</span>.
          </p>
        </div>

        <div className="example">
          Paul cherche <strong>ses</strong> clés. → Paul cherche{" "}
          <strong>les siennes</strong>. ✓
          <br />
          Regarde <strong>ces</strong> clés. → Regarde{" "}
          <strong>les siennes</strong>. ✗ personne ne les possède dans la
          phrase.
        </div>

        <div className="attention">
          dans une phrase où les deux tiennent, aucun test ne décide à votre
          place. C’est le sens que vous voulez donner qui choisit : montrer, ou
          dire à qui. Le reste des paires,{" "}
          <span className="fr">ce / se</span>,{" "}
          <span className="fr">c’est / s’est</span> et{" "}
          <span className="fr">ça / sa</span>, est expliqué dans{" "}
          <Link href="/orthographe/les-homophones-du-demonstratif">
            Les homophones du démonstratif
          </Link>
          .
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">-là</span> se colle au nom après{" "}
            <span className="fr">ces</span>, jamais après{" "}
            <span className="fr">ses</span>.
          </li>
          <li>
            <span className="fr">ses</span> se remplace par{" "}
            <span className="fr">les siens</span> ou{" "}
            <span className="fr">les siennes</span>.
          </li>
          <li>
            Les deux tests peuvent réussir sur la même phrase : les deux mots
            existent, et ils ne disent pas la même chose.
          </li>
          <li>
            Quand aucun test ne tranche, demandez-vous si vous montrez ou si
            vous dites à qui la chose appartient.
          </li>
        </ul>
      </div>
    </article>
  );
}
