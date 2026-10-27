import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-singulier-et-le-pluriel";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the A1 Spanish gloss are written once, below, and shared. */

type Lang = "fr" | "es";

/* A Spanish gloss in brackets: in the French body it is marked as Spanish. */
function Gloss({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <> ({lang === "fr" ? <span lang="es">{children}</span> : children})</>;
}

const PLURALS: {
  head: ReactNode | { fr: string; es: string };
  plural: ReactNode | { fr: string; es: string };
  example: string;
  gloss: string;
}[] = [
  {
    head: { fr: "presque tout", es: "casi todo" },
    plural: <span className="fr" lang="fr">+ -s</span>,
    example: "la maison, les maisons",
    gloss: "la casa, las casas",
  },
  {
    head: (
      <>
        <span className="fr" lang="fr">-s</span>,{" "}
        <span className="fr" lang="fr">-x</span>,{" "}
        <span className="fr" lang="fr">-z</span>
      </>
    ),
    plural: { fr: "ne change pas", es: "no cambia" },
    example: "le bus, les bus ; le prix, les prix ; le nez, les nez",
    gloss: "el autobús, los autobuses ; el precio, los precios ; la nariz, las narices",
  },
  {
    head: <span className="fr" lang="fr">-eau</span>,
    plural: <span className="fr" lang="fr">-eaux</span>,
    example: "le bateau, les bateaux",
    gloss: "el barco, los barcos",
  },
  {
    head: <span className="fr" lang="fr">-al</span>,
    plural: <span className="fr" lang="fr">-aux</span>,
    example: "le journal, les journaux",
    gloss: "el periódico, los periódicos",
  },
];

const LIAISONS = [
  {
    next: { fr: "commence par une voyelle", es: "empieza por vocal" },
    s: true,
    example: "les‿amis, des‿enfants",
    gloss: "los amigos, unos niños",
  },
  {
    next: { fr: "commence par un h muet", es: "empieza por h muda" },
    s: true,
    example: "les‿hôtels",
    gloss: "los hoteles",
  },
  {
    next: { fr: "commence par une consonne", es: "empieza por consonante" },
    s: false,
    example: "les garçons, des livres",
    gloss: "los chicos, unos libros",
  },
];

function pick(cell: ReactNode | { fr: string; es: string }, lang: Lang): ReactNode {
  if (cell && typeof cell === "object" && "fr" in cell && "es" in cell) {
    return (cell as { fr: string; es: string })[lang];
  }
  return cell as ReactNode;
}

function PluralsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Quatre façons de former le pluriel d’un nom"
            : "Cuatro maneras de formar el plural de un nombre"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Le nom finit par" : "El nombre acaba en"}</th>
            <th scope="col">{fr ? "Le pluriel" : "El plural"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {PLURALS.map((row, i) => (
            <tr key={i}>
              <th scope="row">{pick(row.head, lang)}</th>
              <td>{pick(row.plural, lang)}</td>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LiaisonsTable({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Devant une voyelle, on lie ; devant une consonne, non"
            : "Delante de vocal se enlaza y delante de consonante no"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Le mot suivant" : "La palabra siguiente"}</th>
            <th scope="col">
              {fr ? "Le " : "La "}
              <em>s</em>
            </th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
          </tr>
        </thead>
        <tbody>
          {LIAISONS.map((row) => (
            <tr key={row.example}>
              <th scope="row">{row.next[lang]}</th>
              <td>
                {row.s
                  ? fr
                    ? "s’entend"
                    : "suena"
                  : fr
                    ? "ne s’entend pas"
                    : "no suena"}
              </td>
              <td className="fr" lang="fr">{row.example}</td>
              <td lang={fr ? "es" : undefined}>{row.gloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pairs() {
  return (
    <div className="example" lang="fr">
      Le chat dort. / Les chats dorment.
      <br />
      Une maison. / Des maisons.
    </div>
  );
}

function Readers() {
  return (
    <div className="example" lang="fr">
      Les garçons lisent des livres.
      <br />
      Les‿enfants lisent des‿histoires.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Le pluriel s’écrit, mais on ne l’entend presque pas</h2>

        <div className="rule">
          En espagnol, on entend le pluriel : <em lang="es">casa</em>,{" "}
          <em lang="es">casas</em>. En français, presque jamais.{" "}
          <span className="fr">le chat</span> et{" "}
          <span className="fr">les chats</span> se disent de la même façon dans
          le nom : le <em>s</em> final ne se prononce pas. Le pluriel s’entend
          dans l’article. Alors, écoutez toujours le petit mot :{" "}
          <span className="fr">le</span> ou <span className="fr">les</span>,{" "}
          <span className="fr">un</span> ou <span className="fr">des</span>.
        </div>

        <Pairs />

        <p>
          Les verbes de l’exemple : <span className="fr">dort</span>
          <Gloss lang="fr">duerme</Gloss>, <span className="fr">dorment</span>
          <Gloss lang="fr">duermen</Gloss>.
        </p>

        <p>
          À l’écrit, le pluriel est presque toujours le nom avec un <em>s</em>{" "}
          muet à la fin. Quatre cas vous servent déjà.
        </p>

        <PluralsTable lang="fr" />

        <div className="attention">
          <span className="fr">-al</span> est le seul cas où le nom lui-même
          change de son. <span className="fr">journal</span> finit par
          &laquo;&nbsp;al&nbsp;&raquo; et <span className="fr">journaux</span>{" "}
          finit par &laquo;&nbsp;o&nbsp;&raquo;. C’est pareil pour{" "}
          <span className="fr">un cheval</span>
          <Gloss lang="fr">un caballo</Gloss> et{" "}
          <span className="fr">des chevaux</span>. Dans les autres cas, le{" "}
          <em>s</em> et le <em>x</em> sont muets.
        </div>

        <div className="exception">
          Au pluriel de <span className="fr">-eau</span>, le <em>x</em> est
          aussi muet : <span className="fr">un gâteau</span>
          <Gloss lang="fr">un pastel</Gloss> et{" "}
          <span className="fr">des gâteaux</span> se terminent par le même son.
          Seul l’article change, comme dans <span className="fr">le chat</span>{" "}
          et <span className="fr">les chats</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El plural se escribe, pero casi nunca se oye</h2>

        <div className="rule">
          En español oyes el plural: <em>casa</em>, <em>casas</em>. En francés,
          casi nunca. <span className="fr" lang="fr">le chat</span> (el gato) y <span className="fr" lang="fr">les chats</span> se dicen igual en el
          nombre: la <em>s</em> final no suena. El plural se oye en el
          artículo. Por eso, escucha siempre la palabra pequeña: <span className="fr" lang="fr">le</span>
          o <span className="fr" lang="fr">les</span>, <span className="fr" lang="fr">un</span> o <span className="fr" lang="fr">des</span>.
        </div>

        <Pairs />

        <p>
          Los verbos del ejemplo:{" "}
          <span className="fr" lang="fr">dort</span> (duerme),{" "}
          <span className="fr" lang="fr">dorment</span> (duermen).
        </p>

        <p>
          Al escribir, el plural casi siempre es el nombre con una{" "}
          <em>s</em> muda al final. Hay cuatro casos que te sirven ya.
        </p>

        <PluralsTable lang="es" />

        <div className="attention">
          <span className="fr" lang="fr">-al</span> es el único caso en que el propio nombre cambia de sonido.{" "}
          <span className="fr" lang="fr">journal</span> acaba en «al» y <span className="fr" lang="fr">journaux</span> acaba en «o». Lo mismo con{" "}
          <span className="fr" lang="fr">un cheval</span> (un caballo) y{" "}
          <span className="fr" lang="fr">des chevaux</span>. En los demás casos, la <em>s</em> y
          la <em>x</em> son mudas.
        </div>

        <div className="exception">
          En el plural de <span className="fr" lang="fr">-eau</span>, la <em>x</em> también es muda:{" "}
          <span className="fr" lang="fr">un gâteau</span> (un pastel) y{" "}
          <span className="fr" lang="fr">des gâteaux</span> suenan igual al final. Solo cambia
          el artículo, como en <span className="fr" lang="fr">le chat</span> y <span className="fr" lang="fr">les chats</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Devant une voyelle, <span className="fr">les</span> et{" "}
          <span className="fr">des</span> se lient : la{" "}
          <span className="fr">liaison</span>
        </h2>

        <div className="rule">
          Devant une voyelle ou un h muet, le <em>s</em> de{" "}
          <span className="fr">les</span> et de <span className="fr">des</span>{" "}
          se prononce. C’est le <em>z</em> français de{" "}
          <span className="fr">zéro</span> : un <em>s</em> qui bourdonne comme
          une abeille. Ce n’est pas le <em lang="es">z</em> espagnol. Il se colle
          au mot suivant, comme si c’était un seul mot. On appelle cela la{" "}
          <strong>liaison</strong>, et ce cours la marque avec ‿.
        </div>

        <LiaisonsTable lang="fr" />

        <p>
          L’écriture ne change jamais : on écrit toujours{" "}
          <span className="fr">les amis</span>,{" "}
          <span className="fr">des amis</span>, comme{" "}
          <span className="fr">les garçons</span>. La liaison s’entend
          seulement. Ainsi, le pluriel s’entend de nouveau :{" "}
          <span className="fr">un ami</span> et{" "}
          <span className="fr">des‿amis</span> ont le même nom, mais on entend
          le <em>z</em> seulement dans le second.
        </p>

        <Readers />

        <p>
          <span className="fr">lisent</span> veut dire{" "}
          <span lang="es">« leen »</span> et{" "}
          <span className="fr">des histoires</span> veut dire{" "}
          <span lang="es">« unas historias »</span> ou{" "}
          <span lang="es">« unos cuentos »</span>.
        </p>

        <div className="exception">
          Devant quelques mots avec un h, il n’y a pas de liaison, comme il
          n’y a pas d’apostrophe : <span className="fr">les héros</span>
          <Gloss lang="fr">los héroes</Gloss>,{" "}
          <span className="fr">les haricots</span>
          <Gloss lang="fr">las judías</Gloss>. C’est le même h que dans{" "}
          <span className="fr">le héros</span>, vu dans{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          . On les apprend un par un.
        </div>

        <p>
          Pour <span className="fr">un</span>, <span className="fr">une</span> et{" "}
          <span className="fr">des</span>, voyez{" "}
          <Link href="/grammaire/les-articles-indefinis" lang="fr">
            Les articles indéfinis
          </Link>
          .
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Delante de vocal, <span className="fr" lang="fr">les</span> y <span className="fr" lang="fr">des</span> se enlazan: la{" "}
          <span className="fr" lang="fr">liaison</span>
        </h2>

        <div className="rule">
          Delante de una vocal o de una h muda, la <em>s</em> de{" "}
          <span className="fr" lang="fr">les</span> y de <span className="fr" lang="fr">des</span> sí suena. Es la <em>z</em> francesa de <span className="fr" lang="fr">zéro</span>: una <em>s</em> que zumba como una abeja. No es la <em>z</em> española. Se pega a la palabra siguiente, como si
          fueran una sola palabra. Se llama <strong lang="fr">liaison</strong>{" "}
          y en este curso se marca con ‿.
        </div>

        <LiaisonsTable lang="es" />

        <p>
          La escritura no cambia nunca: se escribe siempre <span className="fr" lang="fr">les amis</span>, <span className="fr" lang="fr">des amis</span>, igual que{" "}
          <span className="fr" lang="fr">les garçons</span>. La liaison solo se oye. Y así el plural vuelve a oírse:{" "}
          <span className="fr" lang="fr">un ami</span> y <span className="fr" lang="fr">des‿amis</span> tienen el mismo nombre, pero solo en el segundo se oye la <em>z</em>.
        </p>

        <Readers />

        <p>
          <span className="fr" lang="fr">lisent</span> es «leen» y{" "}
          <span className="fr" lang="fr">des histoires</span> son «unas historias» o «unos cuentos».
        </p>

        <div className="exception">
          Delante de unas pocas palabras con h no hay liaison, igual que no
          hay apóstrofo: <span className="fr" lang="fr">les héros</span> (los héroes), <span className="fr" lang="fr">les haricots</span> (las
          judías). Es la misma h de <span className="fr" lang="fr">le héros</span> en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          . Se aprenden una por una.
        </div>

        <p>
          Sobre <span className="fr" lang="fr">un</span>, <span className="fr" lang="fr">une</span> y <span className="fr" lang="fr">des</span>, mira{" "}
          <Link href="/grammaire/les-articles-indefinis" lang="fr">
            Les articles indéfinis
          </Link>
          .
        </p>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le pluriel ne s’entend presque pas dans le nom : écoutez l’article,{" "}
            <span className="fr">le</span> ou <span className="fr">les</span>,{" "}
            <span className="fr">un</span> ou <span className="fr">des</span>.
          </li>
          <li>
            À l’écrit, on ajoute un <em>s</em> muet :{" "}
            <span className="fr">la maison</span>,{" "}
            <span className="fr">les maisons</span>.
          </li>
          <li>
            <span className="fr">-s</span>, <span className="fr">-x</span> et{" "}
            <span className="fr">-z</span> ne changent pas ;{" "}
            <span className="fr">-eau</span> donne{" "}
            <span className="fr">-eaux</span> ; <span className="fr">-al</span>{" "}
            donne <span className="fr">-aux</span>, et là le nom lui-même change
            de son.
          </li>
          <li>
            Devant une voyelle ou un h muet, le <em>s</em> de{" "}
            <span className="fr">les</span> et de <span className="fr">des</span>{" "}
            s’entend : <span className="fr">les‿amis</span>. Devant une
            consonne, non : <span className="fr">les garçons</span>.
          </li>
          <li>
            Devant quelques mots avec un h, il n’y a pas de liaison :{" "}
            <span className="fr">les héros</span>. L’écriture ne change jamais.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El plural casi no se oye en el nombre: escucha el artículo,{" "}
            <span className="fr" lang="fr">le</span> o <span className="fr" lang="fr">les</span>, <span className="fr" lang="fr">un</span> o <span className="fr" lang="fr">des</span>.
          </li>
          <li>
            Al escribir, se añade una <em>s</em> muda:{" "}
            <span className="fr" lang="fr">la maison</span>, <span className="fr" lang="fr">les maisons</span>.
          </li>
          <li>
            <span className="fr" lang="fr">-s</span>, <span className="fr" lang="fr">-x</span> y <span className="fr" lang="fr">-z</span> no cambian; <span className="fr" lang="fr">-eau</span> da <span className="fr" lang="fr">-eaux</span>; <span className="fr" lang="fr">-al</span>{" "}
            da <span className="fr" lang="fr">-aux</span>, y ahí el propio nombre cambia de sonido.
          </li>
          <li>
            Delante de vocal o h muda, la <em>s</em> de <span className="fr" lang="fr">les</span> y <span className="fr" lang="fr">des</span> suena:{" "}
            <span className="fr" lang="fr">les‿amis</span>. Delante de consonante, no: <span className="fr" lang="fr">les garçons</span>.
          </li>
          <li>
            Delante de unas pocas palabras con h no hay liaison:{" "}
            <span className="fr" lang="fr">les héros</span>. La escritura no
            cambia nunca.
          </li>
        </ul>
      </div>
    </article>
  );
}
