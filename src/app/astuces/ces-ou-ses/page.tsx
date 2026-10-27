import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/ces-ou-ses";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish (#102). The French taught is written once. */

function WhoTest({ lang }: { lang: "fr" | "es" }) {
  return (
    <div className="example" lang="fr">
      Paul cherche <strong>ses</strong> clés. → Paul cherche{" "}
      <strong>les siennes</strong>. ✓
      <br />
      Regarde <strong>ces</strong> clés. → Regarde <strong>les siennes</strong>.
      ✗{" "}
      <span lang={lang}>
        {lang === "fr"
          ? "personne ne les possède dans la phrase"
          : "nadie las posee en la frase"}
      </span>
    </div>
  );
}

function LaTest() {
  return (
    <div className="example" lang="fr">
      <strong>Ces</strong> chaussures sont neuves. →{" "}
      <strong>Ces chaussures-là</strong> sont neuves. ✓
      <br />
      Il a perdu <strong>ses</strong> chaussures. → Il a perdu{" "}
      <strong>ses chaussures-là</strong>. ✗
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
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

        <LaTest />

        <div className="exception">
          Le test dit ce qui est possible, pas ce que vous vouliez écrire.{" "}
          <span className="fr">Il range ces livres</span> et{" "}
          <span className="fr">Il range ses livres</span> passent le test toutes
          les deux : chaque phrase réussit son propre test, parce que les deux
          phrases existent. Quand c’est le cas, le test ne sert à rien : voyez
          la section suivante.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Pega «-là» al nombre</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Si <strong>-là</strong> se puede pegar al nombre que sigue, escribe{" "}
            <strong>ces</strong>.
          </p>
          <p>
            <span className="fr" lang="fr">ces</span> señala, y lo que se
            señala admite que se señale una segunda vez. El posesivo, en
            cambio, no lo admite: en{" "}
            <span className="fr" lang="fr">ses chaussures</span> no se señala
            nada, solo hay alguien a quien le pertenecen.
          </p>
        </div>

        <LaTest />

        <div className="exception">
          La prueba dice lo que es posible, no lo que querías escribir.{" "}
          <span className="fr" lang="fr">Il range ces livres</span> e{" "}
          <span className="fr" lang="fr">Il range ses livres</span> pasan la
          prueba las dos: cada frase supera su propia prueba, porque las dos
          frases existen. Cuando pasa eso, la prueba no sirve: mira la sección
          siguiente.
        </div>
      </section>

      <section data-ui="fr">
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

        <WhoTest lang="fr" />

        <div className="attention">
          Dans une phrase où les deux tiennent, aucun test ne décide à votre
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

      <section data-ui="es" lang="es">
        <h2>Busca al propietario</h2>

        <div className="astuce">
          <p className="astuce-hook">
            <strong>ses</strong> siempre tiene a alguien detrás.
          </p>
          <p>
            Sustitúyelo por <span className="fr" lang="fr">les siens</span> o{" "}
            <span className="fr" lang="fr">les siennes</span>. Si la frase
            conserva su sentido, hay un poseedor, y la palabra se escribe{" "}
            <span className="fr" lang="fr">ses</span>. Si no aparece nadie, es{" "}
            <span className="fr" lang="fr">ces</span>.
          </p>
        </div>

        <WhoTest lang="es" />

        <div className="attention">
          En una frase en la que valen las dos, ninguna prueba decide por ti.
          Elige el sentido que quieres dar: señalar, o decir de quién es. El
          resto de las parejas,{" "}
          <span className="fr" lang="fr">ce / se</span>,{" "}
          <span className="fr" lang="fr">c’est / s’est</span> y{" "}
          <span className="fr" lang="fr">ça / sa</span>, se explica en{" "}
          <Link href="/orthographe/les-homophones-du-demonstratif">
            Les homophones du démonstratif
          </Link>
          .
        </div>
      </section>

      <div className="resume" data-ui="fr">
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
            Chaque phrase peut réussir son propre test : les deux mots
            existent, et ils ne disent pas la même chose.
          </li>
          <li>
            Quand aucun test ne tranche, demandez-vous si vous montrez ou si
            vous dites à qui la chose appartient.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <span className="fr" lang="fr">-là</span> se pega al nombre después
            de <span className="fr" lang="fr">ces</span>, nunca después de{" "}
            <span className="fr" lang="fr">ses</span>.
          </li>
          <li>
            <span className="fr" lang="fr">ses</span> se sustituye por{" "}
            <span className="fr" lang="fr">les siens</span> o{" "}
            <span className="fr" lang="fr">les siennes</span>.
          </li>
          <li>
            Cada frase puede superar su propia prueba: las dos palabras
            existen y no dicen lo mismo.
          </li>
          <li>
            Cuando ninguna prueba decide, pregúntate si señalas o si dices de
            quién es la cosa.
          </li>
        </ul>
      </div>
    </article>
  );
}
