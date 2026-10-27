import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/ulysse-et-le-cyclope";

export const metadata = lessonMetadata(PATH);

/* Two bodies around one French text (#102). The récit, the words and their
   French definitions are what is read: written once, shown in both. */

const WORDS = [
  {
    word: "une grotte",
    definition: "un grand trou dans un rocher, où l’on peut entrer",
    example: "Nous avons visité une grotte au bord de la mer.",
  },
  {
    word: "un troupeau",
    definition: "un groupe d’animaux qui vivent ensemble",
    example: "Un troupeau de vaches traverse la route.",
  },
  {
    word: "bouger",
    definition: "changer de place, ou changer une chose de place",
    example: "Cette table est trop lourde, je ne peux pas la bouger.",
  },
  {
    word: "une ruse",
    definition:
      "une idée intelligente pour faire croire une chose fausse à quelqu’un",
    example: "Le renard est connu pour ses ruses.",
  },
  {
    word: "un pieu",
    definition: "un long morceau de bois, pointu au bout",
    example: "Il plante un pieu dans la terre.",
  },
  {
    word: "crier",
    definition: "parler ou appeler très fort",
    example: "Ne criez pas, le bébé dort.",
  },
  {
    word: "aveugle",
    definition: "qui ne peut pas voir",
    example: "Son grand-père est aveugle depuis dix ans.",
  },
  {
    word: "se cacher",
    definition: "se mettre à un endroit où personne ne vous voit",
    example: "Le chat se cache sous le lit.",
  },
  {
    word: "punir",
    definition: "faire payer une faute à quelqu’un",
    example: "Ses parents le punissent : pas de téléphone ce soir.",
  },
];

function Recit() {
  return (
    <div className="example recit">
      <p>
        La guerre de Troie est finie. Ulysse veut rentrer chez lui, sur l’île
        d’Ithaque, mais le voyage est long. Un jour, il arrive sur l’île des
        Cyclopes avec douze hommes. D’abord, ils entrent dans une grande grotte.
        Il y a du fromage et du lait : ils mangent et ils attendent.
      </p>
      <p>
        Le soir, le maître de la grotte rentre avec son troupeau de moutons.
        C’est Polyphème, un géant qui a un seul œil. Il ferme la grotte avec un
        énorme rocher et il mange deux hommes. Pendant la nuit, Ulysse veut le
        tuer. Pourtant, il ne fait rien, parce que les hommes ne peuvent pas
        bouger le rocher. Sans le géant, ils restent enfermés.
      </p>
      <p>
        Ulysse prépare une ruse. Il donne du vin au géant et il lui dit : « Je
        m’appelle Personne. » Comme le vin est très fort, Polyphème s’endort.
        Ensuite, les hommes mettent un grand pieu dans le feu, puis ils brûlent
        l’œil du géant. Polyphème crie. Les autres Cyclopes arrivent devant la
        grotte et demandent : « Qui te fait mal ? » Il répond : « Personne ! »
        Ils pensent que tout va bien, donc ils repartent.
      </p>
      <p>
        Le matin, Polyphème est aveugle. Il doit ouvrir la grotte pour ses
        moutons. Il ne peut plus voir. Par contre, il peut toucher : il passe la
        main sur le dos de chaque mouton qui sort. C’est pour ça que les hommes
        se cachent sous le ventre des moutons. Enfin, ils courent jusqu’à leur
        bateau.
      </p>
      <p>
        Sur le bateau, Ulysse est libre. Même s’il est encore en danger, il crie
        son vrai nom : « Je suis Ulysse ! » Polyphème demande à son père, le
        dieu Poséidon, de punir Ulysse. Le voyage d’Ulysse va durer dix ans.
      </p>
    </div>
  );
}

function Words({ lang }: { lang: "fr" | "es" }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Neuf mots du récit, dans l’ordre où ils apparaissent"
            : "Nueve palabras del relato, en el orden en que aparecen"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Mot" : "Palabra"}</th>
            <th scope="col">{fr ? "Définition" : "Definición"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {WORDS.map((w) => (
            <tr key={w.word}>
              <th scope="row" className="fr" lang="fr">
                {w.word}
              </th>
              <td lang="fr">{w.definition}</td>
              <td className="fr" lang="fr">
                {w.example}
              </td>
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
        <h2>Le récit</h2>

        <p>
          Récit écrit pour ce cours · D’après l’Odyssée d’Homère, chant IX ·
          Ulysse et le Cyclope
        </p>

        <p>
          L’Odyssée est un poème grec très ancien. Il raconte le retour
          d’Ulysse, roi d’Ithaque, après la guerre de Troie. Cet épisode est
          l’un des plus connus. Ulysse gagne grâce à son intelligence, et il
          fait aussi une erreur.
        </p>

        <Recit />
      </section>

      <section data-ui="es" lang="es">
        <h2>El relato</h2>

        <p>
          Relato escrito para este curso · Basado en la{" "}
          <span className="fr" lang="fr">Odyssée</span> de Homero, canto IX ·{" "}
          <span className="fr" lang="fr">Ulysse et le Cyclope</span>
        </p>

        <p>
          La Odisea es un poema griego muy antiguo. Cuenta el regreso de
          Ulises, rey de Ítaca, después de la guerra de Troya. Este episodio es
          uno de los más conocidos. Ulises gana gracias a su inteligencia, y
          también comete un error.
        </p>

        <div lang="fr">
          <Recit />
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots du texte</h2>

        <Words lang="fr" />

        <div className="astuce">
          <p className="astuce-hook">
            Douze connecteurs se cachent dans le récit.
          </p>
          <p>
            Relisez le texte et cherchez-les : chacun y est une seule fois. Pour
            chaque connecteur, demandez-vous ce qu’il annonce : la suite, la
            cause, la conséquence ou une opposition. La liste complète est dans{" "}
            <Link href="/grammaire/les-connecteurs">Les connecteurs</Link>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras del texto</h2>

        <Words lang="es" />

        <div className="astuce">
          <p className="astuce-hook">
            Doce conectores se esconden en el relato.
          </p>
          <p>
            Vuelve a leer el texto y búscalos: cada uno aparece una sola vez.
            Para cada conector, pregúntate qué anuncia: lo que sigue, la causa,
            la consecuencia o una oposición. La lista completa está en{" "}
            <Link href="/grammaire/les-connecteurs" lang="fr">Les connecteurs</Link>.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Avez-vous compris ?</h2>

        <p>
          Répondez sans relire le récit. Retournez ensuite au texte pour les
          questions qui vous manquent.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>¿Has entendido?</h2>

        <p>
          Responde sin releer el relato. Vuelve después al texto para las
          preguntas que te falten.
        </p>
      </section>

      <Quiz />
    </article>
  );
}
