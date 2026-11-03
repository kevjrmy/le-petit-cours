import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Faute } from "../_exercice/Faute";
import { Trous } from "../_exercice/Trous";
import { AIRE, APOSTROPHE, FINS, FRANCAIS, LETTRE, PHRASES, TEXTE } from "./exercice";

const PATH = "/atelier/la-sorciere-du-placard-aux-balais";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : le résumé d'un conte de Pierre Gripari. L'élève
   corrige d'abord sa copie lui-même, cinq formes par trou, le corrigé caché
   dessous ; puis un petit plateau par faute, chacun sous une explication de
   deux ou trois phrases ; et « En résumé ». Elle tutoie l'élève qui la lit.

   **Anonyme** (`AGENTS.md` §9b) : rien ne dit qui a écrit le texte. Le conte
   n'est pas dans le domaine public (Gripari est mort en 1990) : la page ne
   cite de lui que la formule de la sorcière, que la copie cite aussi.

   **Ce qui a changé depuis le 13 octobre** : -é ou -er est juste partout, et
   la page commence par le dire. Deux fautes sont nouvelles : le pluriel de
   l'imparfait (« ils était ») et la lettre muette de « dit » et « écrit ».
   avait ou était et a ou à restent dans les trous, sans plateau : leurs
   trucs ont déjà eu le leur. Viennent ensuite les phrases calquées sur
   l'espagnol, puis trois parties courtes : les phrases collées, le -aire de
   « notaire », et l'apostrophe de « d'acheter ».

   Le corrigé garde les temps de la copie, tout au plus-que-parfait. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Corrige ton texte</h2>

        <p>
          D’abord, bravo : cette fois, tous tes <span className="fr">-é</span>{" "}
          et tous tes <span className="fr">-er</span> sont justes (
          <span className="fr">trouvé</span>,{" "}
          <span className="fr">demandé</span>,{" "}
          <span className="fr">acheter</span>,{" "}
          <span className="fr">penser</span>). La dernière fois, il y en
          avait onze de faux !
        </p>

        <p>
          Voici ton texte. Presque tout est déjà corrigé, sauf vingt-deux
          endroits. Pour chaque trou, cinq formes : celle que tu avais écrite,
          la bonne, et trois pièges. À toi de trouver la bonne.
        </p>

        <Trous
          texte={TEXTE}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />

        <p>
          Quand tu as fini, ouvre le corrigé : tout ce qui a changé dans ton
          texte est en gras.
        </p>

        <Corrige>
          <Copie>
            <p>La sorcière du placard aux balais</p>
            <p>
              (J’ai juste <strong>écrit</strong> « il » parce que l’histoire
              ne <strong>dit</strong> pas son nom.)
            </p>
            <p>
              Il <strong>était</strong> une fois un homme qui avait trouvé
              500 €. Alors il avait <strong>décidé d’acheter</strong> une
              maison. Il y avait juste une maison <strong>à</strong> 500 €.
            </p>
            <p>
              Le <strong>notaire</strong> n’arrêtait pas de rire, mais il ne
              disait pas pourquoi. Quand il <strong>était</strong> arrivé, il{" "}
              <strong>voulait rendre visite à</strong> ses{" "}
              <strong>voisins</strong>, mais ils <strong>étaient</strong>{" "}
              bizarres : ils <strong>disaient</strong> qu’il{" "}
              <strong>n’avait pas de chance</strong>. Alors il avait demandé au
              notaire pourquoi ils <strong>étaient</strong> tous{" "}
              <strong>bizarres</strong> quand ils{" "}
              <strong>parlaient</strong> de la maison. Le{" "}
              <strong>notaire</strong> avait <strong>dit</strong> que c’était{" "}
              <strong>parce qu’il</strong> y avait une sorcière dans le
              placard aux balais, et que si tu <strong>disais</strong> «{" "}
              <strong>Sorcière</strong>, sorcière, <strong>prends</strong>{" "}
              garde à ton derrière ! », pendant la nuit elle{" "}
              <strong>sortirait</strong> et elle te{" "}
              <strong>mangerait</strong>.
            </p>
            <p>
              Le lendemain, il ne pouvait pas <strong>arrêter</strong> de
              penser <strong>à</strong> la chanson. Mais la nuit de{" "}
              <strong>Noël</strong>, il <strong>était</strong> revenu un peu
              fou, et il avait dit la chanson sans faire exprès.
            </p>
          </Copie>
        </Corrige>
      </section>

      <section>
        <h2>2. -ais, -ait ou -aient ?</h2>

        <p>
          Dans ton texte : <s className="fr">il voulais</s>,{" "}
          <s className="fr">ils etait</s>,{" "}
          <s className="fr">si tu disait</s>.{" "}
          <span className="fr">disais</span>,{" "}
          <span className="fr">disait</span> et{" "}
          <span className="fr">disaient</span> se disent pareil : l’oreille ne
          t’aide pas. Alors regarde qui fait l’action.
        </p>

        <div className="rule">
          <span className="fr">je</span>, <span className="fr">tu</span> :{" "}
          <span className="fr">-ais</span> · <span className="fr">il</span>,{" "}
          <span className="fr">elle</span> : <span className="fr">-ait</span> ·{" "}
          <span className="fr">ils</span>, <span className="fr">elles</span> :{" "}
          <span className="fr">-aient</span>
        </div>

        <div className="example">
          tu <strong>disais</strong> · il <strong>disait</strong> · ils{" "}
          <strong>disaient</strong>
        </div>

        <p>
          Avec <span className="fr">tu</span>, c’est toujours un{" "}
          <span className="fr">s</span>, même au présent :{" "}
          <span className="fr">tu prends</span>,{" "}
          <span className="fr">tu dis</span>. Et quand ils sont plusieurs, les
          autres mots prennent un <span className="fr">s</span> aussi :{" "}
          <span className="fr">ses voisins</span>,{" "}
          <span className="fr">tous bizarres</span>.
        </p>

        <Choix
          items={FINS}
          consigne="Choisis la bonne forme. Regarde d’abord qui fait l’action."
          nom="-ais, -ait ou -aient"
        />
      </section>

      <section>
        <h2>3. dit, écrit : la lettre muette</h2>

        <p>
          Dans ton texte : <s className="fr">j’ai juste écris</s>,{" "}
          <s className="fr">le notaire avait dis</s>. Mais à la dernière
          ligne, tu as écrit <span className="fr">il avait dit</span> : c’est
          juste ! La dernière lettre ne s’entend pas. Pour l’entendre, dis le
          mot au féminin.
        </p>

        <div className="rule">
          <span className="fr">une lettre écrite</span>, donc{" "}
          <span className="fr">écrit</span> · <span className="fr">une chose
          prise</span>, donc <span className="fr">pris</span>. Tu entends{" "}
          <span className="fr">t</span> ? Écris <span className="fr">t</span>.
          Tu entends <span className="fr">z</span> ? Écris{" "}
          <span className="fr">s</span>.
        </div>

        <p>
          Au présent, c’est la règle de la partie 2 :{" "}
          <span className="fr">je dis</span>, <span className="fr">tu dis</span>
          , mais <span className="fr">il dit</span>,{" "}
          <span className="fr">l’histoire dit</span>.
        </p>

        <Choix
          items={LETTRE}
          consigne="Choisis la bonne forme. Dans ta tête, dis le mot au féminin."
          nom="la lettre muette"
        />
      </section>

      <section>
        <h2>4. Comme on dit</h2>

        <p>
          Ces phrases de ton texte se comprennent, mais en français on les dit
          autrement. Quand on parle deux langues, l’une se glisse parfois dans
          l’autre : ici, c’est l’espagnol (<i lang="es">había una vez</i>,{" "}
          <i lang="es">visitar a alguien</i>, <i lang="es">mala suerte</i>).
        </p>

        <div className="example">
          Il était une fois · rendre visite à ses voisins · il n’a pas de
          chance · c’était parce que…
        </div>

        <Choix
          items={FRANCAIS}
          consigne="Choisis la façon de le dire."
          nom="comme on dit"
        />
      </section>

      <section>
        <h2>5. Où finit la phrase ?</h2>

        <p>
          Dans ton texte : <s className="fr">acheter une maison il y avait</s>.
          Ce sont deux phrases collées. Une idée, une phrase : quand une
          nouvelle idée commence, mets un point et une majuscule.
        </p>

        <Faute
          items={PHRASES}
          consigne="Chaque ligne cache deux phrases. Clique sur le mot qui commence la deuxième."
          nom="où finit la phrase"
        />
      </section>

      <section>
        <h2>6. Les métiers en -aire</h2>

        <p>
          Dans ton texte : <s className="fr">le notair</s>. Un métier qui
          finit par le son « ère » s’écrit <span className="fr">-aire</span>,
          avec un <span className="fr">e</span> :{" "}
          <span className="fr">notaire</span>,{" "}
          <span className="fr">libraire</span>,{" "}
          <span className="fr">vétérinaire</span>.
        </p>

        <div className="exception">
          le féminin d’un métier en <span className="fr">-er</span> :{" "}
          <span className="fr">un boulanger</span>,{" "}
          <span className="fr">une boulangère</span> ·{" "}
          <span className="fr">un sorcier</span>,{" "}
          <span className="fr">une sorcière</span>.
        </div>

        <Choix
          items={AIRE}
          consigne="Choisis la bonne forme."
          nom="les métiers en -aire"
        />
      </section>

      <section>
        <h2>7. de ou d’ ?</h2>

        <p>
          Dans ton texte : <s className="fr">décidé de acheter</s>. Devant une
          voyelle, <span className="fr">de</span> devient{" "}
          <span className="fr">d’</span>, comme{" "}
          <span className="fr">que</span> devient{" "}
          <span className="fr">qu’</span>. Et ça, tu le fais déjà très bien :{" "}
          <span className="fr">qu’il</span>,{" "}
          <span className="fr">c’était</span>,{" "}
          <span className="fr">l’histoire</span>.
        </p>

        <Choix
          items={APOSTROPHE}
          consigne="Choisis la bonne forme. Regarde la première lettre du mot qui suit."
          nom="de ou d’"
        />
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <strong>-ais, -ait ou -aient ?</strong> Regarde qui fait l’action :{" "}
            <span className="fr">je</span>, <span className="fr">tu</span>{" "}
            <span className="fr">-ais</span> ; <span className="fr">il</span>,{" "}
            <span className="fr">elle</span> <span className="fr">-ait</span> ;{" "}
            <span className="fr">ils</span>, <span className="fr">elles</span>{" "}
            <span className="fr">-aient</span>.
          </li>
          <li>
            <strong>dit ou dis ?</strong> Dis le mot au féminin :{" "}
            <span className="fr">écrite</span>, <span className="fr">dite</span>{" "}
            donnent un <span className="fr">t</span> ;{" "}
            <span className="fr">prise</span>, <span className="fr">mise</span>{" "}
            donnent un <span className="fr">s</span>.
          </li>
          <li>
            <strong>Comme on dit :</strong>{" "}
            <span className="fr">il était une fois</span>,{" "}
            <span className="fr">rendre visite à quelqu’un</span>,{" "}
            <span className="fr">il n’a pas de chance</span>,{" "}
            <span className="fr">c’est parce que</span>.
          </li>
          <li>
            <strong>Une idée, une phrase.</strong> Une nouvelle idée
            commence ? Un point, puis une majuscule.
          </li>
          <li>
            <strong>Un métier en « ère » :</strong>{" "}
            <span className="fr">-aire</span> (
            <span className="fr">notaire</span>), sauf un féminin (
            <span className="fr">boulangère</span>,{" "}
            <span className="fr">sorcière</span>).
          </li>
          <li>
            <strong>Devant une voyelle :</strong>{" "}
            <span className="fr">d’acheter</span>,{" "}
            <span className="fr">qu’il</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
