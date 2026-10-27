import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-verbes-en-er";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

/* A Spanish gloss in brackets: in the French body it is marked as Spanish. */
function Gloss({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <> ({lang === "fr" ? <span lang="es">{children}</span> : children})</>;
}

const PARLER = [
  { subject: "je", written: "parle", heard: "«parl»", example: "Je parle français." },
  { subject: "tu", written: "parles", heard: "«parl»", example: "Tu parles vite." },
  { subject: "il, elle", written: "parle", heard: "«parl»", example: "Elle parle avec Paul." },
  { subject: "nous", written: "parlons", heard: "«parlon»", example: "Nous parlons ensemble." },
  { subject: "vous", written: "parlez", heard: "«parlé»", example: "Vous parlez trop bas." },
  { subject: "ils, elles", written: "parlent", heard: "«parl»", example: "Ils parlent beaucoup." },
];

const OTHERS = [
  { verb: "habiter", gloss: "vivir" },
  { verb: "travailler", gloss: "trabajar" },
  { verb: "aimer", gloss: "querer, gustar" },
  { verb: "regarder", gloss: "mirar" },
  { verb: "écouter", gloss: "escuchar" },
  { verb: "manger", gloss: "comer" },
];

function ParlerTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr ? "Le présent de « " : "El presente de «"}
          <span className="fr" lang="fr">parler</span>
          {fr ? " » (" : "» ("}
          <span lang={fr ? "es" : undefined}>hablar</span>
          {fr ? ") : ce qu’on écrit et ce qu’on entend" : "): lo que se escribe y lo que se oye"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Sujet" : "Sujeto"}</th>
            <th scope="col">{fr ? "On écrit" : "Se escribe"}</th>
            <th scope="col">{fr ? "On entend" : "Se oye"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {PARLER.map((row) => (
            <tr key={row.subject}>
              <th scope="row" className="fr" lang="fr">{row.subject}</th>
              <td className="fr" lang="fr">{row.written}</td>
              <td>{row.heard}</td>
              <td className="fr" lang="fr">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OthersList({ lang }: { lang: Lang }) {
  return (
    <>
      {OTHERS.map((item, i) => (
        <span key={item.verb}>
          <span className="fr" lang="fr">{item.verb}</span>
          <Gloss lang={lang}>{item.gloss}</Gloss>
          {i < OTHERS.length - 2 ? ", " : ""}
          {i === OTHERS.length - 2 ? (lang === "fr" ? " et " : " y ") : ""}
        </span>
      ))}
    </>
  );
}

function Subjects() {
  return (
    <div className="example" lang="fr">
      Je parle français.
      <br />
      Tu travailles à Lyon.
      <br />
      Elle aime la musique.
    </div>
  );
}

function Elision() {
  return (
    <div className="example" lang="fr">
      J’habite à Madrid.
      <br />
      J’écoute la radio.
      <br />
      J’aime le café.
    </div>
  );
}

function Liaisons() {
  return (
    <div className="example" lang="fr">
      Nous‿habitons ici. Vous‿aimez le thé ?
      <br />
      Ils‿habitent à Nantes. Elles‿écoutent la radio.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Quatre formes se prononcent pareil</h2>

        <div className="rule">
          En espagnol, chaque personne sonne différemment :{" "}
          <em lang="es">hablo</em>, <em lang="es">hablas</em>,{" "}
          <em lang="es">habla</em>, <em lang="es">hablan</em>. En français, avec
          les verbes en <span className="fr">-er</span>, quatre formes se
          prononcent pareil. Les terminaisons <span className="fr">-e</span>,{" "}
          <span className="fr">-es</span>, <span className="fr">-e</span>,{" "}
          <span className="fr">-ent</span> s’écrivent, mais ne se prononcent
          pas. On entend seulement <span className="fr">nous</span> et{" "}
          <span className="fr">vous</span>.
        </div>

        <ParlerTable lang="fr" />

        <p>
          Dans <span className="fr">parlons</span>, le <em>n</em> ne se
          prononce pas comme en espagnol : <span className="fr">-on</span> est
          une voyelle nasale, et l’air passe aussi par le nez.
        </p>

        <p>
          C’est la même chose pour <OthersList lang="fr" />. On enlève{" "}
          <span className="fr">-er</span> et on ajoute les mêmes terminaisons.
          La fiche complète d’un verbe est dans{" "}
          <Link href="/conjugaison/parler" lang="fr">
            Conjuguer parler
          </Link>
          .
        </p>

        <div className="attention">
          <span className="fr">ils parlent</span> ne se lit pas «&nbsp;
          <span className="fr">parlènt</span>&nbsp;». Le <span className="fr">-ent</span>{" "}
          du pluriel est muet, comme le <em>s</em> de{" "}
          <span className="fr">tu parles</span>. Dans une phrase parlée, «&nbsp;
          <span className="fr">il parle</span>&nbsp;» et «&nbsp;
          <span className="fr">ils parlent</span>&nbsp;» se disent pareil.
        </div>

        <div className="exception">
          Avec <span className="fr">manger</span>, on écrit{" "}
          <span className="fr">nous mangeons</span>, avec un <em>e</em> muet. Ce{" "}
          <em>e</em> garde au <em>g</em> le même son que le{" "}
          <span className="fr">j</span> de <span className="fr">je</span>. C’est
          pareil pour <span className="fr">voyager</span>
          <Gloss lang="fr">viajar</Gloss>. Voyez{" "}
          <Link href="/conjugaison/manger" lang="fr">
            Conjuguer manger
          </Link>
          .
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Cuatro formas suenan igual</h2>

        <div className="rule">
          En español cada persona suena distinta: <em>hablo</em>,{" "}
          <em>hablas</em>, <em>habla</em>, <em>hablan</em>. En francés, con
          los verbos en <span className="fr" lang="fr">-er</span>, cuatro
          formas suenan igual. Las terminaciones{" "}
          <span className="fr" lang="fr">-e</span>,{" "}
          <span className="fr" lang="fr">-es</span>,{" "}
          <span className="fr" lang="fr">-e</span>,{" "}
          <span className="fr" lang="fr">-ent</span> se escriben, pero no se
          pronuncian. Solo se oyen{" "}
          <span className="fr" lang="fr">nous</span> y{" "}
          <span className="fr" lang="fr">vous</span>.
        </div>

        <ParlerTable lang="es" />

        <p>
          En <span className="fr" lang="fr">parlons</span> la <em>n</em> no se pronuncia como en español: <span className="fr" lang="fr">-on</span> es una vocal nasal, y el aire sale también por la nariz.
        </p>

        <p>
          Lo mismo vale para <OthersList lang="es" />. Quitas{" "}
          <span className="fr" lang="fr">-er</span> y añades las mismas
          terminaciones. La ficha completa de un verbo está en{" "}
          <Link href="/conjugaison/parler" lang="fr">
            Conjuguer parler
          </Link>
          .
        </p>

        <div className="attention">
          <span className="fr" lang="fr">ils parlent</span> no se lee «<span className="fr" lang="fr">parlènt</span>».
          La <span className="fr" lang="fr">-ent</span> del plural es muda, como
          la <em>s</em> de <span className="fr" lang="fr">tu parles</span>. En
          una frase hablada, «<span className="fr" lang="fr">il parle</span>» e «<span className="fr" lang="fr">ils parlent</span>» suenan igual.
        </div>

        <div className="exception">
          Con <span className="fr" lang="fr">manger</span> se escribe{" "}
          <span className="fr" lang="fr">nous mangeons</span>, con una{" "}
          <em>e</em> que no suena, para que la <em>g</em> siga sonando como la <span className="fr" lang="fr">j</span> de <span className="fr" lang="fr">je</span>. Lo
          mismo pasa con{" "}
          <span className="fr" lang="fr">voyager</span> (viajar). Está en{" "}
          <Link href="/conjugaison/manger" lang="fr">
            Conjuguer manger
          </Link>
          .
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Le sujet est obligatoire, et <span className="fr">je</span> devient{" "}
          <span className="fr">j’</span>
        </h2>

        <div className="rule">
          En espagnol, on dit <em lang="es">hablo francés</em> sans «&nbsp;<span lang="es">yo</span>&nbsp;» :
          la terminaison dit qui parle. En français, non. Comme quatre formes
          se prononcent pareil, on dit toujours le sujet. On écrit{" "}
          <span className="fr">je parle français</span>, jamais «&nbsp;
          <s className="fr">parle français</s>&nbsp;».
        </div>

        <p>
          Faux : <s className="fr">Parle français.</s> Correct :
        </p>

        <Subjects />

        <p>
          Devant une voyelle ou un h muet, <span className="fr">je</span>{" "}
          devient <span className="fr">j’</span>, avec une apostrophe, comme{" "}
          <span className="fr">le</span> devient <span className="fr">l’</span>{" "}
          dans{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          . Seul <span className="fr">je</span> change ; les autres sujets ne
          bougent pas.
        </p>

        <Elision />

        <p>
          Avec <span className="fr">nous</span>, <span className="fr">vous</span>,{" "}
          <span className="fr">ils</span> et <span className="fr">elles</span>,
          la liaison s’entend devant une voyelle : le <em>s</em> se colle au
          verbe et sonne comme un <em>s</em> sonore, comme celui de{" "}
          <em lang="es">mismo</em> ou de <em lang="es">desde</em> : un
          bourdonnement. On écrit comme toujours. La liaison est expliquée
          dans{" "}
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          .
        </p>

        <Liaisons />

        <p>
          Ici, la liaison aide : dans <span className="fr">il habite</span>, le{" "}
          <em>l</em> de <span className="fr">il</span> s’entend toujours et
          s’unit à la voyelle ; dans <span className="fr">ils‿habitent</span>,
          un <em>s</em> sonore s’ajoute : c’est la liaison. Le pluriel
          s’entend, même si <span className="fr">-ent</span> est muet.
        </p>

        <div className="exception">
          Devant une consonne, il n’y a pas de liaison, et{" "}
          <span className="fr">il parle</span> et{" "}
          <span className="fr">ils parlent</span> sonnent pareil. Seul le
          contexte dit s’il y en a un ou plusieurs.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El sujeto es obligatorio, y <span className="fr" lang="fr">je</span>{" "}
          pasa a <span className="fr" lang="fr">j’</span>
        </h2>

        <div className="rule">
          En español dices <em>hablo francés</em> sin «yo»: la terminación ya
          dice quién habla. En francés no. Como cuatro formas suenan igual, el
          sujeto se dice siempre. Escribes{" "}
          <span className="fr" lang="fr">je parle français</span>, nunca
          «<s className="fr" lang="fr">parle français</s>».
        </div>

        <p>
          Mal: <s className="fr" lang="fr">Parle français.</s> Bien:
        </p>

        <Subjects />

        <p>
          Delante de una vocal o de una h muda,{" "}
          <span className="fr" lang="fr">je</span> se convierte en{" "}
          <span className="fr" lang="fr">j’</span>, con apóstrofo, igual que{" "}
          <span className="fr" lang="fr">le</span> pasa a{" "}
          <span className="fr" lang="fr">l’</span> en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          . Solo cambia <span className="fr" lang="fr">je</span>; los demás
          sujetos no se tocan.
        </p>

        <Elision />

        <p>
          Con <span className="fr" lang="fr">nous</span>,{" "}
          <span className="fr" lang="fr">vous</span>,{" "}
          <span className="fr" lang="fr">ils</span> y{" "}
          <span className="fr" lang="fr">elles</span>, delante de vocal suena la
          liaison: la <em>s</em> se pega al verbo y suena como una{" "}
          <em>s</em> sonora, como la de <em>mismo</em> o <em>desde</em>: un zumbido.
          Se escribe igual que siempre. La liaison está explicada en{" "}
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          .
        </p>

        <Liaisons />

        <p>
          Aquí la liaison sí ayuda: en{" "}
          <span className="fr" lang="fr">il habite</span> la <em>l</em> de{" "}
          <span className="fr" lang="fr">il</span> siempre suena y se une a la
          vocal; en <span className="fr" lang="fr">ils‿habitent</span> aparece
          además una <em>s</em> sonora: eso es la liaison. El plural se oye, aunque{" "}
          <span className="fr" lang="fr">-ent</span> no suene.
        </p>

        <div className="exception">
          Delante de consonante no hay liaison, y entonces{" "}
          <span className="fr" lang="fr">il parle</span> e{" "}
          <span className="fr" lang="fr">ils parlent</span> suenan idéntico.
          Solo el contexto dice si es uno o varios.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            On enlève <span className="fr">-er</span> et on ajoute{" "}
            <span className="fr">-e</span>, <span className="fr">-es</span>,{" "}
            <span className="fr">-e</span>, <span className="fr">-ons</span>,{" "}
            <span className="fr">-ez</span>, <span className="fr">-ent</span>.
          </li>
          <li>
            <span className="fr">-e</span>, <span className="fr">-es</span> et{" "}
            <span className="fr">-ent</span> s’écrivent et ne s’entendent pas :{" "}
            <span className="fr">je parle</span> et{" "}
            <span className="fr">ils parlent</span> se disent pareil.
          </li>
          <li>
            On entend seulement <span className="fr">nous parlons</span> et{" "}
            <span className="fr">vous parlez</span>.
          </li>
          <li>
            Le sujet est obligatoire : <span className="fr">je parle</span>,
            jamais «&nbsp;<s className="fr">parle</s>&nbsp;».
          </li>
          <li>
            <span className="fr">je</span> devient <span className="fr">j’</span>{" "}
            devant une voyelle ou un h muet : <span className="fr">j’habite</span>.
            Avec <span className="fr">ils‿habitent</span>, on entend la liaison.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Quitas <span className="fr" lang="fr">-er</span> y añades{" "}
            <span className="fr" lang="fr">-e</span>,{" "}
            <span className="fr" lang="fr">-es</span>,{" "}
            <span className="fr" lang="fr">-e</span>,{" "}
            <span className="fr" lang="fr">-ons</span>,{" "}
            <span className="fr" lang="fr">-ez</span>,{" "}
            <span className="fr" lang="fr">-ent</span>.
          </li>
          <li>
            <span className="fr" lang="fr">-e</span>,{" "}
            <span className="fr" lang="fr">-es</span> y{" "}
            <span className="fr" lang="fr">-ent</span> se escriben y no suenan:{" "}
            <span className="fr" lang="fr">je parle</span>,{" "}
            <span className="fr" lang="fr">ils parlent</span> suenan igual.
          </li>
          <li>
            Solo se oyen <span className="fr" lang="fr">nous parlons</span> y{" "}
            <span className="fr" lang="fr">vous parlez</span>.
          </li>
          <li>
            El sujeto es obligatorio: <span className="fr" lang="fr">je parle</span>,
            nunca «<s className="fr" lang="fr">parle</s>».
          </li>
          <li>
            <span className="fr" lang="fr">je</span> pasa a{" "}
            <span className="fr" lang="fr">j’</span> delante de vocal o h muda:{" "}
            <span className="fr" lang="fr">j’habite</span>. Con{" "}
            <span className="fr" lang="fr">ils‿habitent</span> se oye la liaison.
          </li>
        </ul>
      </div>
    </article>
  );
}
