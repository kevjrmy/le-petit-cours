import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Faute } from "../_exercice/Faute";
import { Trous } from "../_exercice/Trous";
import { TEXTE, TRUC_1, TRUC_2, TRUC_3, DEFI } from "./exercice";

const PATH = "/atelier/la-paire-de-chaussures";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : une séance entière, dans l'ordre où elle se fait.

   **Anonyme, et c'est la condition** (`AGENTS.md` §9b) : rien ici ne dit qui
   a écrit le texte, quel âge, ni où.

   **Elle tutoie**, contre la voix du cours : c'est la page d'une séance
   particulière, lue à côté de celui qui l'a écrite.

   Trois trucs pour trois fautes qui ne s'entendent pas : -é ou -er (déjà vu,
   il revient), -ait ou -ais, a ou à. Le pluriel et les tournures venues de
   l'espagnol restent visibles dans le corrigé et se traitent à l'oral.

   **Le corrigé garde les temps de la copie** : il ne change « avait acheter »
   qu'en « avait achetées », parce que le premier truc s'exerce justement sur
   ces formes. Un mot manque dans la dernière phrase de la copie ; le corrigé
   laisse le trou et la page pose la question.

   Le corrigé est caché (`Corrige`) et vient après les trous : l'élève cherche
   d'abord ses fautes à voix haute, puis en corrige douze lui-même. Montré
   plus tôt, il donnerait les douze réponses. */
export default function Page() {
  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <section>
        <h2>1. Lis ton texte</h2>

        <p>
          Voici ton texte, recopié exactement comme tu l’as écrit. Lis-le à
          voix haute. À l’oral, tout va bien : on suit l’histoire du début à
          la fin, et elle est drôle. Les fautes ne s’entendent pas, elles se
          voient seulement. C’est pour ça qu’elles sont difficiles à trouver.
        </p>

        <Copie>
          <p>La paire de chaussure</p>
          <p>
            Il etait une fois une paire de chaussure qui étaient marrié. La
            dame s’appelait Tina et l’homme, Nicolas. Ils vivaients dans une
            boite enroules par du papier, ils voulaient y être pour toujour
            jusca un jour qu’une dame les sortis de leur boite et les essèyat,
            elle lui venait parfait alors elle les avait acheter. Mais le
            probleme était que quand la dame marchait les chaussure etaient
            separer car quand un etait a l’avant l’autre etait a l’arrière. Un
            jour Nicola decide que chaque pas que la dame fait il ira dir
            bonjour a Tina. Le prochain jour la dame allait se promener avec
            ses nouvelle chausure mais comme Nicolas allait vers le coter pour
            dir bonjour a Tina, la dame n’arretais pas de tomber et l’autre
            jour s’était Tina qui le fesait alors la dame etait aller au
            docteur et il avait dit que peut etre il fallait lui couper les
            pieds mais la dame avait ecouter les chausure parler et elle avait
            compris qu’ils etaint marrier alors elle demanda a la femme de
            menage de laver les chaussure et de prendre soin des chaussure
            meme si elle les allait pas mettre alors la femme de menage avait
            penser qu’elle allait voler les chaussure. Mais quand elle les
            portais elle aretais pas de tomber. alors elle les avait donner a
            sa nièce comme sa nièce etait presque tout le jour assise elle ne
            tombais pas. mais elle trouvais Tina de plus a plus, alors Nicolas
            voulais faire un neut avec les lacèt comme ça ils etaint toujour
            ensemble.
          </p>
        </Copie>
      </section>

      <section>
        <h2>2. La chasse aux fautes</h2>

        <p>
          Relis ton texte en silence, cette fois avec les yeux d’un détective.
          Trouve au moins cinq fautes et dis-les à voix haute.
        </p>
      </section>

      <section>
        <h2>3. Corrige tes fautes</h2>

        <p>
          Voici ton texte une deuxième fois. Presque tout est déjà corrigé,
          sauf douze endroits. Pour chaque trou, quatre formes : celle que tu
          avais écrite, la bonne, et deux pièges. À toi de trouver la bonne.
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
            <p>
              La paire de <strong>chaussures</strong>
            </p>
            <p>
              Il <strong>était</strong> une fois une paire de{" "}
              <strong>chaussures</strong> qui étaient{" "}
              <strong>mariées</strong>. La dame s’appelait Tina et l’homme,
              Nicolas. Ils <strong>vivaient</strong> dans une{" "}
              <strong>boîte</strong>, <strong>enroulés dans</strong> du
              papier ; ils voulaient y <strong>rester</strong> pour{" "}
              <strong>toujours</strong>, <strong>jusqu’au jour où</strong> une
              dame les <strong>sortit</strong> de leur <strong>boîte</strong>{" "}
              et les <strong>essaya</strong>.{" "}
              <strong>Elles lui allaient parfaitement</strong>, alors elle les
              avait <strong>achetées</strong>. Mais le{" "}
              <strong>problème</strong> était que, quand la dame marchait, les{" "}
              <strong>chaussures étaient séparées</strong>, car quand{" "}
              <strong>l’un était à</strong> l’avant, l’autre{" "}
              <strong>était à</strong> l’arrière. Un jour,{" "}
              <strong>Nicolas décida qu’à</strong> chaque pas que la dame{" "}
              <strong>ferait</strong>, il <strong>irait dire</strong> bonjour{" "}
              <strong>à</strong> Tina. <strong>Le lendemain</strong>, la dame{" "}
              <strong>alla</strong> se promener avec ses{" "}
              <strong>nouvelles chaussures</strong>, mais comme Nicolas allait
              vers le <strong>côté</strong> pour <strong>dire</strong> bonjour{" "}
              <strong>à</strong> Tina, la dame <strong>n’arrêtait</strong> pas
              de tomber. Et <strong>le jour d’après</strong>,{" "}
              <strong>c’était</strong> Tina qui le <strong>faisait</strong>.
              Alors la dame <strong>était allée chez le</strong> docteur, et
              il avait dit que <strong>peut-être</strong> il fallait lui
              couper les pieds. Mais la dame avait <strong>écouté</strong> les{" "}
              <strong>chaussures</strong> parler et elle avait compris qu’ils{" "}
              <strong>étaient mariés</strong>. Alors elle demanda{" "}
              <strong>à</strong> la femme de <strong>ménage</strong> de laver
              les <strong>chaussures</strong> et de prendre soin des{" "}
              <strong>chaussures</strong>, <strong>même</strong> si elle{" "}
              <strong>n’allait pas les</strong> mettre. Alors la femme de{" "}
              <strong>ménage</strong> avait <strong>pensé</strong> qu’elle
              allait voler les <strong>chaussures</strong>. Mais quand elle
              les <strong>portait</strong>, elle <strong>n’arrêtait</strong>{" "}
              pas de tomber. Alors elle les avait <strong>données à</strong>{" "}
              sa nièce. Comme sa nièce <strong>était</strong> presque{" "}
              <strong>toute la journée</strong> assise, elle ne{" "}
              <strong>tombait</strong> pas. Mais elle{" "}
              <strong>trouvait</strong> Tina de plus <strong>en</strong> plus{" "}
              <strong>(…)</strong>, alors Nicolas <strong>voulait</strong>{" "}
              faire un <strong>nœud</strong> avec les{" "}
              <strong>lacets</strong> : comme ça, ils{" "}
              <strong>seraient toujours</strong> ensemble.
            </p>
          </Copie>

          <p>
            Dans la dernière phrase, il manque un mot après{" "}
            <span className="fr">de plus en plus</span>. Lequel voulais-tu
            écrire ?
          </p>

          <p>
            Beaucoup de gras, encore ! Mais d’abord, une bonne nouvelle. La
            dernière fois, tu écrivais <s className="fr">il avait dis</s> et{" "}
            <s className="fr">il avait aller</s>. Aujourd’hui, tu écris{" "}
            <span className="fr">il avait dit</span>, et tu mets{" "}
            <span className="fr">était</span> devant{" "}
            <span className="fr">aller</span>. Deux trucs sur trois sont
            restés.
          </p>

          <p>
            Maintenant, regarde bien : trois fautes reviennent plus que les
            autres. La première, tu la connais déjà :{" "}
            <s className="fr">avait acheter</s>,{" "}
            <s className="fr">avait penser</s>,{" "}
            <s className="fr">avait donner</s>. La deuxième :{" "}
            <s className="fr">elle tombais</s>,{" "}
            <s className="fr">Nicolas voulais</s>. La troisième :{" "}
            <s className="fr">bonjour a Tina</s>,{" "}
            <s className="fr">a sa nièce</s>. Aujourd’hui, on règle ces
            trois-là.
          </p>
        </Corrige>
      </section>

      <section>
        <h2>4. Premier truc, le retour : -é ou -er ?</h2>

        <p>
          Tu connais déjà ce truc. Il revient parce que la faute revient :
          sept fois dans ton texte. <span className="fr">acheté</span> et{" "}
          <span className="fr">acheter</span> se disent pareil. Pour savoir
          lequel écrire, remplace le verbe par{" "}
          <span className="fr">vendre</span>. Lui, il ne se dit pas pareil.
        </p>

        <div className="rule">
          Tu dis <span className="fr">vendu</span> ? Écris{" "}
          <span className="fr">-é</span>. Tu dis{" "}
          <span className="fr">vendre</span> ? Écris{" "}
          <span className="fr">-er</span>.
        </div>

        <div className="example">
          la dame avait <strong>écouté</strong> (la dame avait vendu) · elle
          demanda de <strong>laver</strong> les chaussures (de vendre)
        </div>

        <p>
          Le truc marche aussi après <span className="fr">était</span> :{" "}
          <span className="fr">les chaussures étaient séparées</span>, comme{" "}
          <span className="fr">les chaussures étaient vendues</span>. Tu
          entends <span className="fr">vendu</span>, donc{" "}
          <span className="fr">-é</span>.
        </p>

        <div className="attention">
          après <span className="fr">était</span>, le{" "}
          <span className="fr">-é</span> s’accorde avec le sujet :{" "}
          <span className="fr">la dame était allée</span>,{" "}
          <span className="fr">les chaussures étaient séparées</span>.
        </div>

        <Choix
          items={TRUC_1}
          consigne="Choisis la bonne forme. Dans ta tête, essaie avec vendre. Attention, il y a un piège."
          nom="premier truc"
        />
      </section>

      <section>
        <h2>5. Deuxième truc : -ait ou -ais ?</h2>

        <p>
          Dans ton texte : <s className="fr">elle tombais</s>,{" "}
          <s className="fr">Nicolas voulais</s>,{" "}
          <s className="fr">ils etaint</s>. Pourtant{" "}
          <span className="fr">tombais</span>,{" "}
          <span className="fr">tombait</span> et{" "}
          <span className="fr">tombaient</span> se disent pareil. Pour
          choisir, regarde qui fait l’action. Ton histoire parle de Tina, de
          Nicolas et de la dame, jamais de toi.
        </p>

        <div className="rule">
          <span className="fr">-ais</span>, c’est pour{" "}
          <span className="fr">je</span> et <span className="fr">tu</span>.
          Pour <span className="fr">il</span>,{" "}
          <span className="fr">elle</span>, <span className="fr">ils</span> ou{" "}
          <span className="fr">elles</span>, dis le début de la phrase avec{" "}
          <span className="fr">est</span> ou <span className="fr">sont</span>.
          Tu dis <span className="fr">est</span> ? Écris{" "}
          <span className="fr">-ait</span>. Tu dis{" "}
          <span className="fr">sont</span> ? Écris{" "}
          <span className="fr">-aient</span>.
        </div>

        <div className="example">
          elle ne <strong>tombait</strong> pas (elle est) · ils{" "}
          <strong>vivaient</strong> dans une boîte (ils sont)
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            « est » finit par t, « sont » finit par nt.
          </p>
          <p>
            <span className="fr">-ait</span> finit par{" "}
            <span className="fr">t</span>, comme{" "}
            <span className="fr">est</span>.{" "}
            <span className="fr">-aient</span> finit par{" "}
            <span className="fr">nt</span>, comme{" "}
            <span className="fr">sont</span>, et rien après. Dans{" "}
            <span className="fr">-aient</span>, n’oublie pas le{" "}
            <span className="fr">e</span> :{" "}
            <span className="fr">ils étaient</span>, pas{" "}
            <s className="fr">ils étaint</s>.
          </p>
        </div>

        <Choix
          items={TRUC_2}
          consigne="Choisis la bonne forme. Regarde qui fait l’action. Attention, il y a un piège."
          nom="deuxième truc"
        />
      </section>

      <section>
        <h2>6. Troisième truc : a ou à ?</h2>

        <p>
          Dans ton texte : <s className="fr">bonjour a Tina</s>,{" "}
          <s className="fr">a l’avant</s>, <s className="fr">a sa nièce</s>.{" "}
          <span className="fr">a</span> et <span className="fr">à</span> se
          disent pareil, mais ce sont deux mots.{" "}
          <span className="fr">a</span>, c’est le verbe{" "}
          <span className="fr">avoir</span>, comme dans{" "}
          <span className="fr">elle a</span>. Et tu connais déjà son passé :{" "}
          <span className="fr">avait</span>.
        </p>

        <div className="rule">
          Dis <span className="fr">avait</span> à la place. Ça marche ? Écris{" "}
          <span className="fr">a</span>. Ça ne veut plus rien dire ? Écris{" "}
          <span className="fr">à</span>.
        </div>

        <div className="example">
          la dame <strong>a</strong> compris (la dame avait compris) · bonjour{" "}
          <strong>à</strong> Tina (<s className="fr">bonjour avait Tina</s>)
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dans ton texte, un « a » tout seul est presque toujours « à ».
          </p>
          <p>
            Tu racontes avec <span className="fr">avait</span> : il ne reste
            donc presque pas de <span className="fr">a</span> sans accent.
            Mais dans une histoire au passé composé, il y en a beaucoup :{" "}
            <span className="fr">elle a donné</span>,{" "}
            <span className="fr">elle a compris</span>. Le test avec{" "}
            <span className="fr">avait</span> marche dans les deux cas.
          </p>
        </div>

        <Choix
          items={TRUC_3}
          consigne="a ou à ? Dis d’abord la phrase avec « avait »."
          nom="troisième truc"
        />
      </section>

      <section>
        <h2>7. Le défi</h2>

        <p>
          Les trois trucs, tous mélangés. Cette fois, personne ne te dit où
          est la faute : c’est exactement ce que tu fais quand tu relis ta
          copie. Une seule faute par phrase.
        </p>

        <Faute
          items={DEFI}
          consigne="Clique sur le mot qui ne va pas."
          nom="le défi"
        />
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Les fautes de ton texte ne s’entendent pas. Chaque truc les fait
            entendre avec un autre mot.
          </li>
          <li>
            <strong>-é ou -er ?</strong> Essaie avec{" "}
            <span className="fr">vendre</span> : tu dis{" "}
            <span className="fr">vendu</span>, écris{" "}
            <span className="fr">-é</span> ; tu dis{" "}
            <span className="fr">vendre</span>, écris{" "}
            <span className="fr">-er</span>.
          </li>
          <li>
            <strong>-ait ou -ais ?</strong>{" "}
            <span className="fr">-ais</span>, c’est pour{" "}
            <span className="fr">je</span> et <span className="fr">tu</span>.
            Pour les autres, dis <span className="fr">est</span> ou{" "}
            <span className="fr">sont</span> :{" "}
            <span className="fr">est</span> donne{" "}
            <span className="fr">-ait</span>,{" "}
            <span className="fr">sont</span> donne{" "}
            <span className="fr">-aient</span>.
          </li>
          <li>
            <strong>a ou à ?</strong> Dis <span className="fr">avait</span> à
            la place : ça marche, écris <span className="fr">a</span> ; ça ne
            veut rien dire, écris <span className="fr">à</span>.
          </li>
          <li>
            Quand tu relis ta copie, passe trois fois : une fois pour les{" "}
            <span className="fr">-é</span>, une fois pour les{" "}
            <span className="fr">-ait</span>, une fois pour les{" "}
            <span className="fr">a</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
