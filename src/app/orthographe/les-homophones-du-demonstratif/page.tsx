import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/orthographe/les-homophones-du-demonstratif";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

function F({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function Head({ cells }: { cells: string[] }) {
  return (
    <thead>
      <tr>
        {cells.map((cell) => (
          <th key={cell} scope="col">
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function CeSeTable({ lang, caption }: { lang: Lang; caption: string }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <Head
          cells={
            lang === "fr"
              ? ["Le mot", "Sa place", "Le test", "Exemple"]
              : ["La palabra", "Su lugar", "El test", "Ejemplo"]
          }
        />
        <tbody>
          <tr>
            <th scope="row" className="fr" lang="fr">
              ce
            </th>
            <td>{lang === "fr" ? "devant un nom" : "delante de un nombre"}</td>
            <td>
              {lang === "fr" ? "remplacez par " : "sustituye por "}
              <F>le</F>
            </td>
            <td className="fr" lang="fr">
              ce train part tôt
            </td>
          </tr>
          <tr>
            <th scope="row" className="fr" lang="fr">
              se
            </th>
            <td>{lang === "fr" ? "devant un verbe" : "delante de un verbo"}</td>
            <td>
              {lang === "fr" ? (
                <>
                  mettez la phrase à <F>je</F> : <F>me</F>
                </>
              ) : (
                <>
                  pon la frase en <F>je</F>: <F>me</F>
                </>
              )}
            </td>
            <td className="fr" lang="fr">
              il se lève tôt
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CeSeExample({ lang }: { lang: Lang }) {
  const l =
    lang === "fr"
      ? ["verbe pronominal", "déterminant"]
      : ["verbo pronominal", "determinante"];
  return (
    <div className="example" lang="fr">
      il <strong>se</strong> lave → je <strong>me</strong> lave ✓{" "}
      <span lang={lang}>{l[0]}</span>
      <br />
      <strong>ce</strong> matin → <strong>le</strong> matin ✓ <span lang={lang}>{l[1]}</span>
    </div>
  );
}

function CesSesExample() {
  return (
    <div className="example" lang="fr">
      <strong>Ces</strong> chaussures sont neuves. →{" "}
      <strong>Ces chaussures-là</strong> sont neuves. ✓
      <br />
      Il a perdu <strong>ses</strong> chaussures. → Il a perdu{" "}
      <strong>les siennes</strong>. ✓
    </div>
  );
}

const WORDS = [
  { word: "c’est", swap: "cela est", example: "C’est loin d’ici." },
  { word: "s’est", swap: "je me suis", example: "Il s’est levé à six heures." },
  { word: "ça", swap: "cela", example: "Ça ne marche plus." },
  { word: "sa", swap: "ma", example: "Sa voiture est en panne." },
];

function WordsTable({ lang, caption }: { lang: Lang; caption: string }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <Head
          cells={
            lang === "fr"
              ? ["Le mot", "Remplacez par", "Exemple"]
              : ["La palabra", "Sustituye por", "Ejemplo"]
          }
        />
        <tbody>
          {WORDS.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td className="fr" lang="fr">
                {row.swap}
              </td>
              <td className="fr" lang="fr">
                {row.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CEstExample() {
  return (
    <div className="example" lang="fr">
      Il <strong>s’est</strong> trompé de train. → Je <strong>me suis</strong>{" "}
      trompé de train. ✓
      <br />
      <strong>C’est</strong> encore loin. → <strong>Cela est</strong> encore
      loin. ✓
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>ce ou se : ce qui suit décide</h2>

        <p>
          Huit mots, quatre prononciations : les paires ci-dessous ne se
          distinguent qu’à l’écrit. Et le test qui sépare{" "}
          <Link href="/orthographe/les-homophones">les autres homophones</Link>,
          remplacer le mot par le même verbe à un autre temps, ne sert à rien
          ici : aucun des deux mots n’est un verbe.
        </p>

        <div className="rule">
          <F>ce</F> montre, et se place devant un nom. <F>se</F> appartient au
          verbe, et se place devant lui. Le mot qui suit suffit donc à décider.
        </div>

        <CeSeTable lang="fr" caption="Deux mots, deux places, deux remplacements" />

        <CeSeExample lang="fr" />

        <div className="attention">
          <F>ce</F> se place aussi devant <F>qui</F>, <F>que</F> et le verbe{" "}
          <F>être</F> conjugué : <F>ce que je veux</F>, <F>ce sera long</F>,{" "}
          <F>ce sont mes clés</F>. <F>se</F> n’y apparaît jamais : il lui faut
          un verbe dont il est le pronom, et <F>être</F> n’en est pas un.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>ce</F> o <F>se</F>: lo que sigue decide
        </h2>

        <p>
          Ocho palabras, cuatro pronunciaciones: las parejas de abajo solo se
          distinguen por escrito. Y el test que separa{" "}
          <Link href="/orthographe/les-homophones">los otros homófonos</Link>,
          sustituir la palabra por el mismo verbo en otro tiempo, aquí no sirve:
          ninguna de las dos palabras es un verbo.
        </p>

        <div className="rule">
          <F>ce</F> señala, y va delante de un nombre. <F>se</F> pertenece al
          verbo, y va delante de él. Por tanto, la palabra que sigue basta para
          decidir.
        </div>

        <CeSeTable lang="es" caption="Dos palabras, dos lugares, dos sustituciones" />

        <CeSeExample lang="es" />

        <div className="attention">
          <F>ce</F> va también delante de <F>qui</F>, <F>que</F> y del verbo{" "}
          <F>être</F> conjugado: <F>ce que je veux</F>, <F>ce sera long</F>,{" "}
          <F>ce sont mes clés</F>. <F>se</F> no aparece nunca ahí: necesita un
          verbo del que sea el pronombre, y <F>être</F> no lo es.
        </div>
      </section>

      <section data-ui="fr">
        <h2>ces ou ses : montrer, ou dire à qui</h2>

        <div className="rule">
          <F>ces</F> montre les objets ; <F>ses</F> dit à qui ils appartiennent.
          Les deux sont au pluriel, les deux se placent devant le même nom, et
          rien dans la prononciation ne les sépare. Le test est d’ajouter{" "}
          <strong>-là</strong> après le nom : si la phrase tient, c’est{" "}
          <F>ces</F>.
        </div>

        <CesSesExample />

        <p>
          Le second test est le plus sûr quand le premier hésite : remplacez par{" "}
          <F>les siens</F> ou <F>les siennes</F>. Si la phrase garde son sens, le
          mot dit un possesseur, et il s’écrit <F>ses</F>. Les formes complètes
          du possessif sont dans{" "}
          <Link href="/orthographe/les-determinants-possessifs">
            Les déterminants possessifs
          </Link>
          .
        </p>

        <div className="attention">
          Les deux phrases peuvent être justes toutes les deux.{" "}
          <F>Il range ces livres</F> et <F>Il range ses livres</F> se disent, se
          lisent et ne veulent pas dire la même chose. Ce n’est pas le test qui
          tranche, c’est vous : écrivez <F>ces</F> si vous montrez, <F>ses</F> si
          vous dites à qui ils sont.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>ces</F> o <F>ses</F>: señalar, o decir de quién
        </h2>

        <div className="rule">
          <F>ces</F> señala los objetos; <F>ses</F> dice a quién pertenecen. Los
          dos están en plural, los dos van delante del mismo nombre, y nada en
          la pronunciación los separa. El test es añadir <strong>-là</strong>{" "}
          después del nombre: si la frase se sostiene, es <F>ces</F>.
        </div>

        <CesSesExample />

        <p>
          El segundo test es el más seguro cuando el primero duda: sustituye por{" "}
          <F>les siens</F> o <F>les siennes</F>. Si la frase conserva su sentido,
          la palabra indica un poseedor y se escribe <F>ses</F>. Las formas
          completas del posesivo están en{" "}
          <Link href="/orthographe/les-determinants-possessifs" lang="fr">
            Les déterminants possessifs
          </Link>
          .
        </p>

        <div className="attention">
          Las dos frases pueden ser correctas. <F>Il range ces livres</F> e{" "}
          <F>Il range ses livres</F> se dicen, se leen y no significan lo mismo.
          No lo decide el test, lo decides tú: escribe <F>ces</F> si señalas,{" "}
          <F>ses</F> si dices de quién son.
        </div>
      </section>

      <section data-ui="fr">
        <h2>c’est, s’est, ça, sa</h2>

        <div className="rule">
          Les deux dernières paires suivent la même logique que la première :{" "}
          <F>c’</F> et <F>ça</F> sont du côté de <F>cela</F>, <F>s’</F> et{" "}
          <F>sa</F> du côté de la personne. Chacune a son remplacement.
        </div>

        <WordsTable lang="fr" caption="Le mot par lequel remplacer, et ce qu’il prouve" />

        <p>
          <F>s’est</F> ne voyage jamais seul : il est suivi d’un participe passé,
          parce qu’il appartient à un verbe pronominal au passé composé.{" "}
          <F>c’est</F>, lui, est suivi d’un nom ou d’un adjectif.
        </p>

        <CEstExample />

        <div className="attention">
          <F>ça</F> ne prend pas d’accent sur le <F>a</F>. La forme <F>çà</F>{" "}
          existe, mais seulement dans l’expression <F>çà et là</F>, que vous
          n’aurez sans doute jamais à écrire. La cédille, elle, est obligatoire :{" "}
          <F>ca</F> se lirait <F>ka</F>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Une seule question pour les quatre paires : ce qui suit est-il un
            verbe ?
          </p>
          <p>
            <F>se</F> et <F>s’est</F> vivent avec un verbe et pas sans lui.{" "}
            <F>ce</F>, <F>ces</F>, <F>sa</F> et <F>ses</F> vivent avec un nom.
            Regardez le mot d’après avant de choisir la lettre du début.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          <F>c’est, s’est, ça, sa</F>
        </h2>

        <div className="rule">
          Las dos últimas parejas siguen la misma lógica que la primera:{" "}
          <F>c’</F> y <F>ça</F> están del lado de <F>cela</F>, <F>s’</F> y{" "}
          <F>sa</F> del lado de la persona. Cada una tiene su sustitución.
        </div>

        <WordsTable lang="es" caption="La palabra por la que sustituir, y lo que demuestra" />

        <p>
          <F>s’est</F> nunca viaja solo: va seguido de un participio, porque
          pertenece a un verbo pronominal en passé composé. <F>c’est</F>, en
          cambio, va seguido de un nombre o de un adjetivo.
        </p>

        <CEstExample />

        <div className="attention">
          <F>ça</F> no lleva acento sobre la <F>a</F>. La forma <F>çà</F> existe,
          pero solo en la expresión <F>çà et là</F>, que probablemente nunca
          tendrás que escribir. La cedilla, en cambio, es obligatoria:{" "}
          <F>ca</F> se leería <F>ka</F>.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Una sola pregunta para las cuatro parejas: ¿lo que sigue es un
            verbo?
          </p>
          <p>
            <F>se</F> y <F>s’est</F> viven con un verbo y no sin él. <F>ce</F>,{" "}
            <F>ces</F>, <F>sa</F> y <F>ses</F> viven con un nombre. Mira la
            palabra siguiente antes de elegir la letra del principio.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <F>ce</F> précède un nom et se remplace par <F>le</F> ; <F>se</F>{" "}
            précède un verbe et devient <F>me</F> à la première personne.
          </li>
          <li>
            <F>ces</F> accepte <F>-là</F> après le nom ; <F>ses</F> se remplace
            par <F>les siens</F>.
          </li>
          <li>
            Quand les deux tiennent, c’est le sens qui décide : montrer, ou dire
            à qui.
          </li>
          <li>
            <F>c’est</F> vaut <F>cela est</F> ; <F>s’est</F> se met à la première
            personne et donne <F>je me suis</F>, toujours devant un participe
            passé.
          </li>
          <li>
            <F>ça</F> vaut <F>cela</F> et porte une cédille, jamais un accent ;{" "}
            <F>sa</F> se remplace par <F>ma</F>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <F>ce</F> va delante de un nombre y se sustituye por <F>le</F>;{" "}
            <F>se</F> va delante de un verbo y se convierte en <F>me</F> en
            primera persona.
          </li>
          <li>
            <F>ces</F> admite <F>-là</F> después del nombre; <F>ses</F> se
            sustituye por <F>les siens</F>.
          </li>
          <li>
            Cuando valen las dos, decide el sentido: señalar, o decir de quién.
          </li>
          <li>
            <F>c’est</F> equivale a <F>cela est</F>; <F>s’est</F> se pone en
            primera persona y da <F>je me suis</F>, siempre delante de un
            participio.
          </li>
          <li>
            <F>ça</F> equivale a <F>cela</F> y lleva cedilla, nunca acento;{" "}
            <F>sa</F> se sustituye por <F>ma</F>.
          </li>
        </ul>
      </div>
    </article>
  );
}
