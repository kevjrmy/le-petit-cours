import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-famille";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the Spanish glosses are written once, below, and shared; captions, heads
   and the explaining cells are written in each language. In the French body a
   Spanish piece says lang="es". */

type Ui = "fr" | "es";

/* A Spanish gloss: in the French body it needs its own lang. */
function Es({ ui, children }: { ui: Ui; children: ReactNode }) {
  return ui === "fr" ? <span lang="es">{children}</span> : <>{children}</>;
}

const FAMILY: [string, string, string, string][] = [
  ["le père", "la mère", "el padre, la madre", "Mon père travaille à Lyon."],
  ["le fils", "la fille", "el hijo, la hija", "Ils ont deux fils et une fille."],
  ["le frère", "la sœur", "el hermano, la hermana", "Ma sœur habite à Madrid."],
  ["le grand-père", "la grand-mère", "el abuelo, la abuela", "Je déjeune chez ma grand-mère."],
  ["l’oncle (m.)", "la tante", "el tío, la tía", "Mon oncle vient dimanche."],
  ["le cousin", "la cousine", "el primo, la prima", "J’ai quatre cousines."],
  ["le neveu", "la nièce", "el sobrino, la sobrina", "Mon neveu a huit ans."],
  ["le mari", "la femme", "el marido, la mujer (la esposa)", "Sa femme s’appelle Claire."],
];

function FamilyTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Les noms de la famille, au masculin et au féminin"
            : "Los nombres de la familia, en masculino y en femenino"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Masculin" : "Masculino"}</th>
            <th scope="col">{ui === "fr" ? "Féminin" : "Femenino"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "En español"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {FAMILY.map(([m, f, es, ex]) => (
            <tr key={m}>
              <th scope="row" className="fr" lang="fr">
                {m}
              </th>
              <td className="fr" lang="fr">
                {f}
              </td>
              <td lang={ui === "fr" ? "es" : undefined}>{es}</td>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* The verbs of the examples: French word and its Spanish gloss. */
const VERBS: [string, string][] = [
  ["travaille", "trabaja"],
  ["ont", "tienen"],
  ["habite", "vive"],
  ["déjeune", "almuerzo"],
  ["vient", "viene"],
  ["s’appelle", "se llama"],
  ["dimanche", "domingo"],
];

function VerbList({ ui }: { ui: Ui }) {
  return (
    <>
      {VERBS.map(([word, gloss], i) => (
        <span key={word}>
          {i > 0 ? ", " : ""}
          <span className="fr" lang="fr">
            {word}
          </span>{" "}
          (<Es ui={ui}>{gloss}</Es>)
        </span>
      ))}
    </>
  );
}

const SameExample = () => (
  <div className="example" lang="fr">
    C’est la sœur <strong>de</strong> Paul.
    <br />
    Voici la voiture <strong>de</strong> mes parents.
    <br />
    Le fils <strong>du</strong> voisin a quinze ans.
    <br />
    La voiture <strong>des</strong> voisins est bleue.
  </div>
);

/* A line of the beau-/belle- table: the word, who it is (per language), the
   example with its one-word gloss. */
const BEAU: {
  word: string;
  who: Record<Ui, ReactNode>;
  ex: string;
  gloss?: [string, string];
}[] = [
  {
    word: "le beau-père",
    who: {
      fr: (
        <>
          <span lang="es">el suegro</span> : le père de votre mari ou de votre femme ; ou{" "}
          <span lang="es">el padrastro</span> : le compagnon de votre mère
        </>
      ),
      es: "el suegro (el padre de tu marido o de tu mujer) o el padrastro (la pareja de tu madre)",
    },
    ex: "Mon beau-père est très gentil.",
    gloss: ["gentil", "amable"],
  },
  {
    word: "la belle-mère",
    who: {
      fr: (
        <>
          <span lang="es">la suegra</span> : la mère de votre mari ou de votre femme ; ou{" "}
          <span lang="es">la madrastra</span> : la compagne de votre père
        </>
      ),
      es: "la suegra (la madre de tu marido o de tu mujer) o la madrastra (la pareja de tu padre)",
    },
    ex: "Nous dînons chez ma belle-mère.",
    gloss: ["dînons", "cenamos"],
  },
  {
    word: "le beau-frère",
    who: {
      fr: (
        <>
          <span lang="es">el cuñado</span> : le frère de votre mari ou de votre femme, ou le mari de
          votre sœur
        </>
      ),
      es: "el cuñado (el hermano de tu marido o de tu mujer, o el marido de tu hermana)",
    },
    ex: "Mon beau-frère habite au Portugal.",
  },
  {
    word: "la belle-sœur",
    who: {
      fr: (
        <>
          <span lang="es">la cuñada</span> : la sœur de votre mari ou de votre femme, ou la femme
          de votre frère
        </>
      ),
      es: "la cuñada (la hermana de tu marido o de tu mujer, o la mujer de tu hermano)",
    },
    ex: "Ma belle-sœur est médecin.",
    gloss: ["médecin", "médico"],
  },
  {
    word: "le demi-frère",
    who: {
      fr: (
        <>
          <span lang="es">el medio hermano</span> : un frère avec un seul parent en commun, le père
          ou la mère
        </>
      ),
      es: "el medio hermano: un hermano con quien solo compartes padre o madre",
    },
    ex: "J’ai un demi-frère plus jeune.",
    gloss: ["plus jeune", "más joven"],
  },
];

function BeauTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr" ? (
            <>
              Les noms avec <span className="fr">beau</span> et <span className="fr">belle</span>, et
              les personnes désignées
            </>
          ) : (
            <>
              Los nombres con <span className="fr" lang="fr">beau</span> y{" "}
              <span className="fr" lang="fr">belle</span>, y a quién designan
            </>
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Le mot" : "La palabra"}</th>
            <th scope="col">{ui === "fr" ? "Qui c’est" : "Quién es"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {BEAU.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td>{row.who[ui]}</td>
              {row.gloss ? (
                <td>
                  <span className="fr" lang="fr">
                    {row.ex}
                  </span>{" "}
                  (
                  <span className="fr" lang="fr">
                    {row.gloss[0]}
                  </span>
                  : <Es ui={ui}>{row.gloss[1]}</Es>)
                </td>
              ) : (
                <td className="fr" lang="fr">
                  {row.ex}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Les personnes de la famille</h2>

        <div className="rule">
          Presque tous les noms de la famille vont par paires : un masculin et un féminin. Comme en
          espagnol, le pluriel mixte prend la forme masculine :{" "}
          <span className="fr">mes cousins</span> (<span lang="es">mis primos</span>),{" "}
          <span className="fr">mes voisins</span> (<span lang="es">mis vecinos</span>). Quand{" "}
          <span className="fr">l’</span> cache le genre, j’ajoute (m.).
        </div>

        <FamilyTable ui="fr" />

        <p>
          Les verbes des exemples : <VerbList ui="fr" />. Et <span className="fr">a … ans</span>{" "}
          veut dire <span lang="es">« tiene … años »</span>. Et{" "}
          <span className="fr">chez ma grand-mère</span> veut dire{" "}
          <span lang="es">« en casa de mi abuela »</span>.
        </p>

        <div className="attention">
          <span className="fr">la fille</span> a deux sens : <span lang="es">la hija</span> et{" "}
          <span lang="es">la chica</span>. <span className="fr">la femme</span> aussi :{" "}
          <span lang="es">la esposa</span> et <span lang="es">la mujer</span>. Le mot placé devant
          décide. <span className="fr">ma fille</span> est <span lang="es">mi hija</span>{" "}
          ; <span className="fr">une fille attend devant la porte</span> (
          <span lang="es">una chica espera delante de la puerta</span>) parle d’une personne
          inconnue. Pareil : <span className="fr">sa femme</span> est{" "}
          <span lang="es">su esposa</span>, <span className="fr">une femme</span> est une femme
          adulte quelconque.
        </div>

        <div className="exception">
          En espagnol, <span lang="es">« mis hermanos »</span> et{" "}
          <span lang="es">« mis hijos »</span> comprennent garçons et filles. En français,{" "}
          <span className="fr">mes fils</span> sont seulement des garçons : pour tous les enfants,
          on dit <span className="fr">mes enfants</span>, et pour les frères et les sœurs,{" "}
          <span className="fr">mes frères et sœurs</span>. Pareil pour les oncles :{" "}
          <span className="fr">mon oncle et ma tante</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Las personas de la familia:{" "}
          <span className="fr" lang="fr">
            les personnes de la famille
          </span>
        </h2>

        <div className="rule">
          Casi todos los nombres de la familia van por parejas, un masculino y
          un femenino. Como en español, el plural mixto usa la forma masculina:{" "}
          <span className="fr" lang="fr">mes cousins</span> (mis primos),{" "}
          <span className="fr" lang="fr">mes voisins</span> (mis vecinos).
          Cuando <span className="fr" lang="fr">l’</span> esconde el
          género, lo marco con (m.).
        </div>

        <FamilyTable ui="es" />

        <p>
          Los verbos de los ejemplos: <VerbList ui="es" />. Y{" "}
          <span className="fr" lang="fr">a … ans</span> es «tiene … años». Y{" "}
          <span className="fr" lang="fr">chez ma grand-mère</span> es «en casa
          de mi abuela».
        </p>

        <div className="attention">
          <span className="fr" lang="fr">la fille</span> tiene dos sentidos: la
          hija y la chica. <span className="fr" lang="fr">la femme</span>
          también: la esposa y la mujer. Lo que decide es la palabra que va
          delante. <span className="fr" lang="fr">ma fille</span> es mi hija;{" "}
          <span className="fr" lang="fr">une fille attend devant la porte</span>{" "}
          (una chica espera delante de la puerta) es una persona que no
          conoces. Igual: <span className="fr" lang="fr">sa femme</span> es su
          esposa, <span className="fr" lang="fr">une femme</span> es una mujer
          adulta.
        </div>

        <div className="exception">
          En español, «mis hermanos» y «mis hijos» incluyen chicos y chicas. En
          francés, <span className="fr" lang="fr">mes fils</span> son solo
          chicos: para todos los hijos se dice{" "}
          <span className="fr" lang="fr">mes enfants</span>, y para los
          hermanos <span className="fr" lang="fr">mes frères et sœurs</span>.
          Lo mismo con los tíos:{" "}
          <span className="fr" lang="fr">mon oncle et ma tante</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Dire de qui c’est : <span className="fr">de</span></h2>

        <div className="rule">
          Pour unir deux personnes, le français utilise <span className="fr">de</span>, comme
          l’espagnol : <span className="fr">le frère de Marie</span> (
          <span lang="es">el hermano de Marie</span>), <span className="fr">la mère de mon ami</span>{" "}
          (<span lang="es">la madre de mi amigo</span>). L’ordre est toujours le même : d’abord le
          mot de la famille, puis le nom de l’autre personne.
        </div>

        <SameExample />

        <p>
          <span className="fr">voici</span> est <span lang="es">« aquí está »</span>,{" "}
          <span className="fr">la voiture</span> est <span lang="es">el coche</span> et{" "}
          <span className="fr">le voisin</span> est <span lang="es">el vecino</span>. Comme{" "}
          <span lang="es">« del »</span> en espagnol, <span className="fr">de</span> se joint à
          l’article suivant : <span className="fr">de + le</span> donne{" "}
          <span className="fr">du</span>, et <span className="fr">de + les</span> donne{" "}
          <span className="fr">des</span>. Devant une voyelle, <span className="fr">de</span> devient{" "}
          <span className="fr">d’</span> : <span className="fr">la fille d’Anne</span>. Voyez{" "}
          <Link href="/grammaire/les-articles-definis">Les articles définis</Link>.
        </p>

        <div className="attention">
          <span className="fr">mon</span>, <span className="fr">ton</span> et{" "}
          <span className="fr">son</span> s’emploient devant un nom féminin, si ce nom commence par
          une voyelle. On écrit <span className="fr">mon amie</span> et{" "}
          <span className="fr">son école</span>, jamais <s className="fr">ma amie</s>. Le nom reste
          féminin : <span className="fr">mon amie est espagnole</span> (
          <span lang="es">mi amiga es española</span>). Les formes complètes sont dans{" "}
          <Link href="/orthographe/les-determinants-possessifs">Les déterminants possessifs</Link>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Decir de quién es:{" "}
          <span className="fr" lang="fr">de</span>
        </h2>

        <div className="rule">
          Para unir dos personas, el francés usa{" "}
          <span className="fr" lang="fr">de</span>, como el español:{" "}
          <span className="fr" lang="fr">le frère de Marie</span> (el hermano de
          Marie), <span className="fr" lang="fr">la mère de mon ami</span> (la
          madre de mi amigo). El orden es siempre el mismo: primero la persona
          de la que hablas, después aquella con quien está unida.
        </div>

        <SameExample />

        <p>
          <span className="fr" lang="fr">voici</span> es «aquí está»,{" "}
          <span className="fr" lang="fr">la voiture</span> es el coche y{" "}
          <span className="fr" lang="fr">le voisin</span> es el vecino. Como
          «del» en español, <span className="fr" lang="fr">de</span> se une al
          artículo que sigue: <span className="fr" lang="fr">de + le</span>{" "}
          da <span className="fr" lang="fr">du</span>, y{" "}
          <span className="fr" lang="fr">de + les</span> da{" "}
          <span className="fr" lang="fr">des</span>. Delante de vocal,{" "}
          <span className="fr" lang="fr">de</span> pasa a{" "}
          <span className="fr" lang="fr">d’</span>:{" "}
          <span className="fr" lang="fr">la fille d’Anne</span>. Mira{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="attention">
          <span className="fr" lang="fr">mon</span>,{" "}
          <span className="fr" lang="fr">ton</span> y{" "}
          <span className="fr" lang="fr">son</span> se usan delante de un nombre
          femenino que empieza por vocal. Se escribe{" "}
          <span className="fr" lang="fr">mon amie</span> y{" "}
          <span className="fr" lang="fr">son école</span>, nunca{" "}
          <s className="fr" lang="fr">ma amie</s>. El nombre sigue siendo
          femenino: <span className="fr" lang="fr">mon amie est espagnole</span>{" "}
          (mi amiga es española). Las formas completas están en{" "}
          <Link href="/orthographe/les-determinants-possessifs" lang="fr">
            Les déterminants possessifs
          </Link>
          .
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          La famille par alliance : <span className="fr">beau-</span> et{" "}
          <span className="fr">belle-</span>
        </h2>

        <div className="rule">
          <span className="fr">beau-</span> et <span className="fr">belle-</span> servent à deux
          choses : la famille de votre mari ou de votre femme (<span lang="es">suegro</span>,{" "}
          <span lang="es">cuñado</span>) et le nouveau partenaire de votre père ou de votre mère (
          <span lang="es">padrastro</span>, <span lang="es">madrastra</span>). En français, il y a un
          seul mot pour les deux.
        </div>

        <BeauTable ui="fr" />

        <div className="exception">
          <span className="fr">beau-père</span> et <span className="fr">belle-mère</span> sont
          ambigus, et le français n’a pas d’autre mot. Pour être clair, on précise :{" "}
          <span className="fr">le père de mon mari</span> (<span lang="es">el padre de mi marido</span>)
          ou <span className="fr">le compagnon de ma mère</span> (
          <span lang="es">la pareja de mi madre</span>).
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr">mes parents</span> sont, par défaut, votre père et votre mère.
          </p>
          <p>
            <span className="fr">Mes parents habitent à Lyon</span> (
            <span lang="es">mis padres viven en Lyon</span>). Pour la famille en général, on dit{" "}
            <span className="fr">la famille</span> :{" "}
            <span className="fr">J’ai de la famille en France</span> (
            <span lang="es">tengo familia en Francia</span>). Un <span className="fr">parent</span>,
            au singulier, peut aussi être un membre de la famille (<span lang="es">pariente</span>),
            mais c’est rare au début.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          La familia política:{" "}
          <span className="fr" lang="fr">beau-</span> y{" "}
          <span className="fr" lang="fr">belle-</span>
        </h2>

        <div className="rule">
          <span className="fr" lang="fr">beau-</span> y{" "}
          <span className="fr" lang="fr">belle-</span> sirven para dos cosas: la
          familia de tu marido o de tu mujer (suegro, cuñado) y la pareja de tu
          padre o de tu madre (padrastro, madrastra). En francés hay una sola
          palabra para las dos.
        </div>

        <BeauTable ui="es" />

        <div className="exception">
          <span className="fr" lang="fr">beau-père</span> y{" "}
          <span className="fr" lang="fr">belle-mère</span> son ambiguos, y el
          francés no tiene otra palabra. Para ser claro, se precisa:{" "}
          <span className="fr" lang="fr">le père de mon mari</span> (el padre de
          mi marido) o <span className="fr" lang="fr">le compagnon de ma mère</span>{" "}
          (la pareja de mi madre).
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">mes parents</span> son, por defecto,
            tu padre y tu madre.
          </p>
          <p>
            <span className="fr" lang="fr">Mes parents habitent à Lyon</span>{" "}
            (mis padres viven en Lyon). Para la familia en general se dice{" "}
            <span className="fr" lang="fr">la famille</span>:{" "}
            <span className="fr" lang="fr">J’ai de la famille en France</span>{" "}
            (tengo familia en Francia). Un{" "}
            <span className="fr" lang="fr">parent</span>, en singular, también
            puede ser un pariente, pero es raro al principio.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Les noms de la famille vont par paires, et le pluriel mixte prend le masculin :{" "}
            <span className="fr">mes cousins</span>, <span className="fr">mes voisins</span>.
          </li>
          <li>
            <span className="fr">la fille</span> et <span className="fr">la femme</span> ont deux
            sens ; le mot placé devant les sépare.
          </li>
          <li>
            On unit avec <span className="fr">de</span> : <span className="fr">du</span>{" "}
            devant <span className="fr">le</span>, <span className="fr">d’</span> devant une
            voyelle.
          </li>
          <li>
            <span className="fr">mon</span> remplace <span className="fr">ma</span> devant un
            féminin commençant par une voyelle.
          </li>
          <li>
            <span className="fr">beau-</span> et <span className="fr">belle-</span> servent pour la
            famille du mari ou de la femme, et aussi pour le nouveau partenaire d’un parent.
          </li>
          <li>
            <span className="fr">les parents</span> sont le père et la mère ; la famille en général
            est <span className="fr">la famille</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Los nombres de la familia van por parejas, y el plural mixto usa el
            masculino: <span className="fr" lang="fr">mes cousins</span>,{" "}
            <span className="fr" lang="fr">mes voisins</span>.
          </li>
          <li>
            <span className="fr" lang="fr">la fille</span> y{" "}
            <span className="fr" lang="fr">la femme</span> tienen dos sentidos;
            la palabra de delante los separa.
          </li>
          <li>
            Se une con <span className="fr" lang="fr">de</span>, que da{" "}
            <span className="fr" lang="fr">du</span> delante de{" "}
            <span className="fr" lang="fr">le</span> y{" "}
            <span className="fr" lang="fr">d’</span> delante de vocal.
          </li>
          <li>
            <span className="fr" lang="fr">mon</span> sustituye a{" "}
            <span className="fr" lang="fr">ma</span> delante de un femenino que
            empieza por vocal.
          </li>
          <li>
            <span className="fr" lang="fr">beau-</span> y{" "}
            <span className="fr" lang="fr">belle-</span> valen para suegros y
            cuñados, y también para padrastros.
          </li>
          <li>
            <span className="fr" lang="fr">les parents</span> son los padres;
            la familia en general es <span className="fr" lang="fr">la famille</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
