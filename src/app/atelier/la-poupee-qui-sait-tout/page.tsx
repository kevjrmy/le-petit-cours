import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Corrige } from "../_texte/Corrige";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Faute } from "../_exercice/Faute";
import { Trous } from "../_exercice/Trous";
import { TEXTE, TRUC_1, TRUC_2, TRUC_3, DEFI } from "./exercice";

const PATH = "/atelier/la-poupee-qui-sait-tout";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : une séance entière, dans l'ordre où elle se fait.

   **Anonyme, et c'est la condition** (`AGENTS.md` §9b) : rien ici ne dit qui
   a écrit le texte, quel âge, ni où. Les noms sont ceux des personnages du
   conte résumé.

   **Elle tutoie**, contre la voix du cours : c'est la page d'une séance
   particulière, lue à côté de celui qui l'a écrite.

   Trois trucs pour trois fautes qui ne s'entendent pas. Deux reviennent
   parce que la faute revient : avait ou était (« hier, il… »), a ou à
   (« avait »). Le troisième est nouveau : le s du pluriel (« cheval »).
   -é ou -er n'a pas de section cette fois : le truc est connu et commence à
   tenir, il revient dans les trous et dans le défi. -ait ou -ais est acquis,
   et la page le dit.

   **Le corrigé garde les temps de la copie** : « avait demandé », mais aussi
   « elle a commencé » et « ils sont arrivés ». Le deuxième truc s'exerce
   justement sur ces « a ». La dernière phrase ne dit pas clairement qui
   achète le vélo ; la page pose la question.

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
          voix haute. À l’oral, tout va bien : on suit l’histoire de
          Scoubidou du début à la fin, et il ne manque rien. Les fautes ne
          s’entendent pas, elles se voient seulement. C’est pour ça qu’elles
          sont difficiles à trouver.
        </p>

        <Copie>
          <p>Scoubidou la poupé qui sait tout</p>
          <p>
            Il etait une fois une poupé appellé scoubidou, mais elle etait pas
            une poupé normale sinon elle avait des pouvoir elle pouvait
            marcher et parler et aussit elle pouvait savoir le passer le
            future et elle pouvait savoir les secret des autre. Elle vivait
            dans une famille avec un pere et un fils, le pere s’apelait Saïr
            et le fils Bachir. Un jour Bachir avait demander a son père s’il
            pouvait avoir un velo mait le père avait dit qu’il n’avait pas
            assait d’argent alors Bachir avait demandé a Scoubidou si elle
            pouvait faire que Sair acheterais un velo a Bachir. Le lendemain
            le pere avait aller faire les cours mais dans chaque épicerie ils
            disait qu’il voulait un velo aulieur de la nourriture. alors il
            avait aller au docteur et le docteur il savait tout de suite
            qu’il avait un fils qui voulait un vélo et qui avait une poupé.
            Alors le père lui avait dit a la poupé qu’elle devait partir de la
            maison mais la poupé lui avait dit qu’elle voulait des lunettes
            avec des lentille en bois pour pouvoir utiliser ses pouvoir car
            elle pouvait juste les utiliser si elle avait les yeux couvère.
            Quand elle avait partit sur un bateaux, quand le capitaine avait
            arriver il lui avait demandé pour quois elle etait la bas, elle
            lui avait dit qu’elle voulait travailler pour lui. Il lui avait
            dit qu’il donerait 5 euros par jour si elle disais la méteo du
            prochain jour. Un jour le capitain avait ordoné au cuisinier de
            lui jeter les lunettes a la mer comme sa ilne devait pas pailler a
            la poupé.
          </p>
          <p>
            Comme la poupé ne s’avait pas la meteo elle l’avait dit au hasard
            et le lendemain il etait entrain pleuvoir et Scoubidou avait dit
            qu’il allait être soleillé le capitaine lui avait jeter a la mer
            et tout a coup elle a rentrer dans le éstomac d’un requin. Elle
            avait sentit avoir toucher quelque chose c’etait la texture de
            bois, c’etait ses lunettes ! Elle les avait mis et elle a comencé
            a sauter dans le ventre du requin, il avait dit d’arreter mait
            elle aretait pas jusqua qu’elle avait dit qu’elle voulait qu’il
            lui ramene au bord. Le requin avait dis ok car il voulait pas
            qu’elle continue. Tout a coup Scoubidou avait trouver un autre
            objet, c’etait une perle precieuse surement tu pouvait acheter 6
            velos avec. Quand ils sont arriver la poupé avait aller direct
            chez Bachir et il lui ont acheter le velo.
          </p>
          <p>Fin</p>
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
              Scoubidou, la <strong>poupée</strong> qui sait tout
            </p>
            <p>
              Il <strong>était</strong> une fois une <strong>poupée</strong>{" "}
              <strong>appelée Scoubidou</strong>. Mais elle{" "}
              <strong>n’était</strong> pas une <strong>poupée</strong> normale{" "}
              <strong>:</strong> elle avait des <strong>pouvoirs</strong>.
              Elle pouvait marcher et parler, et <strong>aussi</strong> elle
              pouvait <strong>connaître</strong> le{" "}
              <strong>passé et le futur</strong>, et elle pouvait savoir les{" "}
              <strong>secrets</strong> des <strong>autres</strong>. Elle
              vivait dans une famille avec un <strong>père</strong> et un
              fils : le <strong>père s’appelait Saïd</strong> et le fils,
              Bachir.
            </p>
            <p>
              Un jour, Bachir avait <strong>demandé à</strong> son père s’il
              pouvait avoir un <strong>vélo</strong>, <strong>mais</strong> le
              père avait dit qu’il n’avait pas <strong>assez</strong>{" "}
              d’argent. Alors Bachir avait demandé <strong>à</strong>{" "}
              Scoubidou si elle pouvait faire que{" "}
              <strong>Saïd achète</strong> un <strong>vélo à</strong> Bachir.
              Le lendemain, le <strong>père était allé</strong> faire les{" "}
              <strong>courses</strong>, mais dans chaque épicerie,{" "}
              <strong>il</strong> disait qu’il voulait un{" "}
              <strong>vélo au lieu</strong> de la nourriture. Alors il{" "}
              <strong>était allé chez le</strong> docteur, et le docteur{" "}
              <strong>avait compris</strong> tout de suite qu’il avait un fils
              qui voulait un vélo et qui avait une <strong>poupée</strong>.
            </p>
            <p>
              Alors le père <strong>avait dit à</strong> la{" "}
              <strong>poupée</strong> qu’elle devait partir de la maison, mais
              la <strong>poupée</strong> lui avait dit qu’elle voulait des
              lunettes avec des <strong>verres</strong> en bois pour pouvoir
              utiliser ses <strong>pouvoirs</strong>, car elle pouvait juste
              les utiliser si elle avait les yeux <strong>couverts</strong>.{" "}
              <strong>Elle était partie</strong> sur un{" "}
              <strong>bateau</strong>. Quand le capitaine{" "}
              <strong>était arrivé</strong>, il lui avait demandé{" "}
              <strong>pourquoi</strong> elle <strong>était là</strong>,{" "}
              <strong>et</strong> elle lui avait dit qu’elle voulait
              travailler pour lui. Il lui avait dit qu’il{" "}
              <strong>lui donnerait</strong> 5 euros par jour si elle{" "}
              <strong>disait</strong> la <strong>météo</strong> du{" "}
              <strong>lendemain</strong>. Un jour, le{" "}
              <strong>capitaine</strong> avait <strong>ordonné</strong> au
              cuisinier de jeter <strong>ses</strong> lunettes{" "}
              <strong>à</strong> la mer : comme <strong>ça</strong>, il{" "}
              <strong>n’aurait pas à payer</strong> la{" "}
              <strong>poupée</strong>.
            </p>
            <p>
              Comme la <strong>poupée</strong> ne <strong>savait</strong> pas
              la <strong>météo</strong>, elle l’avait <strong>dite</strong> au
              hasard. Le lendemain, il <strong>était en train de</strong>{" "}
              pleuvoir, et Scoubidou avait dit qu’il allait{" "}
              <strong>faire soleil</strong>. Le capitaine{" "}
              <strong>l’avait jetée à</strong> la mer, et tout{" "}
              <strong>à</strong> coup elle <strong>est entrée</strong> dans{" "}
              <strong>l’estomac</strong> d’un requin. Elle avait{" "}
              <strong>senti qu’elle touchait</strong> quelque chose :{" "}
              <strong>ça avait</strong> la texture <strong>du</strong> bois.{" "}
              <strong>C’étaient</strong> ses lunettes ! Elle les avait{" "}
              <strong>mises</strong> et elle a <strong>commencé à</strong>{" "}
              sauter dans le ventre du requin. Il <strong>lui</strong> avait
              dit <strong>d’arrêter</strong>, <strong>mais</strong> elle{" "}
              <strong>n’arrêtait</strong> pas,{" "}
              <strong>jusqu’à ce qu’elle dise</strong> qu’elle voulait qu’il{" "}
              <strong>la ramène</strong> au bord. Le requin avait{" "}
              <strong>dit oui</strong>, car il <strong>ne</strong> voulait pas
              qu’elle continue. Tout <strong>à</strong> coup, Scoubidou avait{" "}
              <strong>trouvé</strong> un autre objet :{" "}
              <strong>c’était</strong> une perle <strong>précieuse</strong>.{" "}
              <strong>Sûrement</strong>, tu <strong>pouvais</strong> acheter
              six <strong>vélos</strong> avec. Quand ils sont{" "}
              <strong>arrivés</strong>, la{" "}
              <strong>poupée était allée directement</strong> chez Bachir, et{" "}
              <strong>ils</strong> lui ont <strong>acheté</strong> le{" "}
              <strong>vélo</strong>.
            </p>
            <p>Fin</p>
          </Copie>

          <p>
            Dans la dernière phrase, tu écris{" "}
            <span className="fr">ils lui ont acheté le vélo</span>. Qui achète
            le vélo, et pour qui ?
          </p>

          <p>
            Beaucoup de gras, encore ! Mais d’abord, une bonne nouvelle. La
            dernière fois, tu écrivais <s className="fr">elle tombais</s> et{" "}
            <s className="fr">Nicolas voulais</s>. Aujourd’hui, tu écris{" "}
            <span className="fr">elle pouvait</span>,{" "}
            <span className="fr">elle vivait</span>,{" "}
            <span className="fr">il voulait</span>. Le truc avec{" "}
            <span className="fr">est</span> et{" "}
            <span className="fr">sont</span> est resté. Il est même resté un
            peu trop : <s className="fr">mait</s>,{" "}
            <s className="fr">assait</s>. <span className="fr">mais</span> et{" "}
            <span className="fr">assez</span> ne sont pas des verbes, ils ne
            changent jamais.
          </p>

          <p>
            Et <span className="fr">-é</span> ou{" "}
            <span className="fr">-er</span> ? Le truc avec{" "}
            <span className="fr">vendre</span> commence à marcher :{" "}
            <span className="fr">avait demandé</span>,{" "}
            <span className="fr">a commencé</span>. Il reste à le faire à
            chaque fois. Tu vas le retrouver dans le défi.
          </p>

          <p>
            Un mot à retenir : <span className="fr">une poupée</span>. Il
            finit par <span className="fr">-ée</span>, comme{" "}
            <span className="fr">une idée</span> et{" "}
            <span className="fr">une journée</span>.
          </p>

          <p>
            Maintenant, regarde bien : trois fautes reviennent plus que les
            autres. La première : <s className="fr">avait aller</s>,{" "}
            <s className="fr">avait partit</s>,{" "}
            <s className="fr">avait arriver</s>. La deuxième :{" "}
            <s className="fr">a son père</s>, <s className="fr">a la mer</s>,{" "}
            <s className="fr">tout a coup</s>. La troisième :{" "}
            <s className="fr">des pouvoir</s>,{" "}
            <s className="fr">les secret des autre</s>. Pour les deux
            premières, tu as déjà le truc. La troisième est nouvelle.
          </p>
        </Corrige>
      </section>

      <section>
        <h2>4. Premier truc, le retour : avait ou était ?</h2>

        <p>
          Dans ton texte : <s className="fr">le père avait aller</s>,{" "}
          <s className="fr">elle avait partit</s>,{" "}
          <s className="fr">le capitaine avait arriver</s>. Pourtant, à
          l’oral, tu ne dirais jamais{" "}
          <s className="fr">hier, il a allé faire les courses</s>. Tu dis{" "}
          <span className="fr">hier, il est allé faire les courses</span>.
          Ton oreille connaît déjà la réponse : il suffit de lui poser la
          question.
        </p>

        <div className="rule">
          Dis la phrase en commençant par{" "}
          <span className="fr">hier, il…</span> ou{" "}
          <span className="fr">hier, elle…</span> Tu entends{" "}
          <span className="fr">est</span> ? Écris{" "}
          <span className="fr">était</span>. Tu entends{" "}
          <span className="fr">a</span> ? Écris{" "}
          <span className="fr">avait</span>.
        </div>

        <div className="example">
          le père <strong>était</strong> allé (hier, il est allé) · le docteur{" "}
          <strong>avait</strong> compris (hier, il a compris)
        </div>

        <p>
          Dans <s className="fr">avait aller</s>, il y avait deux fautes. La
          deuxième, tu la connais : avec <span className="fr">vendre</span>,
          tu dis <span className="fr">il était vendu</span>, donc{" "}
          <span className="fr">allé</span>, avec{" "}
          <span className="fr">-é</span>.
        </p>

        <div className="attention">
          Après <span className="fr">était</span>, le mot s’accorde avec le
          sujet : <span className="fr">la poupée était allée</span>,{" "}
          <span className="fr">elle était partie</span>.
        </div>

        <Choix
          items={TRUC_1}
          consigne="avait ou était ? Dis d’abord la phrase avec « hier, il… » ou « hier, elle… ». Attention, il y a un piège."
          nom="premier truc"
        />
      </section>

      <section>
        <h2>5. Deuxième truc, le retour : a ou à ?</h2>

        <p>
          Dans ton texte, il n’y a pas un seul{" "}
          <span className="fr">à</span> : <s className="fr">a son père</s>,{" "}
          <s className="fr">a la mer</s>, <s className="fr">tout a coup</s>.{" "}
          <span className="fr">a</span> et <span className="fr">à</span> se
          disent pareil, mais ce sont deux mots.{" "}
          <span className="fr">a</span>, c’est le verbe{" "}
          <span className="fr">avoir</span>, comme dans{" "}
          <span className="fr">elle a</span>. Et son passé, tu l’écris très
          bien : <span className="fr">avait</span>.
        </p>

        <div className="rule">
          Dis <span className="fr">avait</span> à la place. Ça marche ? Écris{" "}
          <span className="fr">a</span>. Ça ne veut plus rien dire ? Écris{" "}
          <span className="fr">à</span>.
        </div>

        <div className="example">
          elle <strong>a</strong> commencé (elle avait commencé) · jeter les
          lunettes <strong>à</strong> la mer (
          <s className="fr">les lunettes avait la mer</s>)
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Dans la même phrase, il peut y avoir les deux.
          </p>
          <p>
            <span className="fr">elle a commencé à sauter</span> : le premier
            marche avec <span className="fr">avait</span> (
            <span className="fr">elle avait commencé</span>), le deuxième non
            (<s className="fr">commencé avait sauter</s>). Fais le test pour
            chaque <span className="fr">a</span>, un par un.
          </p>
        </div>

        <Choix
          items={TRUC_2}
          consigne="a ou à ? Dis d’abord la phrase avec « avait »."
          nom="deuxième truc"
        />
      </section>

      <section>
        <h2>6. Troisième truc : le s du pluriel</h2>

        <p>
          Dans ton texte : <s className="fr">des pouvoir</s>,{" "}
          <s className="fr">les secret des autre</s>,{" "}
          <s className="fr">des lentille</s>.{" "}
          <span className="fr">pouvoir</span> et{" "}
          <span className="fr">pouvoirs</span> se disent pareil : le{" "}
          <span className="fr">s</span> du pluriel ne s’entend pas. Pour
          l’entendre, remplace le nom par <span className="fr">cheval</span>.
          Lui, il change : <span className="fr">un cheval</span>,{" "}
          <span className="fr">des chevaux</span>.
        </p>

        <div className="rule">
          Tu dis <span className="fr">chevaux</span> ? Il y en a plusieurs :
          mets un <span className="fr">s</span>. Tu dis{" "}
          <span className="fr">cheval</span> ? Pas de{" "}
          <span className="fr">s</span>.
        </div>

        <div className="example">
          elle avait des <strong>pouvoirs</strong> (elle avait des chevaux) ·
          elle était partie sur un <strong>bateau</strong> (sur un cheval)
        </div>

        <div className="astuce">
          <p className="astuce-hook">Le petit mot devant te prévient.</p>
          <p>
            <span className="fr">les</span>, <span className="fr">des</span>,{" "}
            <span className="fr">ses</span>, <span className="fr">six</span> :
            il y en a plusieurs. <span className="fr">un</span>,{" "}
            <span className="fr">une</span>, <span className="fr">le</span>,{" "}
            <span className="fr">la</span> : il n’y en a qu’un. Tu l’as très
            bien fait pour <span className="fr">ses lunettes</span> et pour{" "}
            <span className="fr">5 euros</span>.
          </p>
        </div>

        <div className="exception">
          Les noms en <span className="fr">-eau</span> prennent un{" "}
          <span className="fr">x</span> à la place du{" "}
          <span className="fr">s</span> : <span className="fr">un bateau</span>
          , <span className="fr">des bateaux</span>.
        </div>

        <Choix
          items={TRUC_3}
          consigne="Choisis la bonne forme. Dans ta tête, essaie avec cheval. Attention, il y a un piège."
          nom="troisième truc"
        />
      </section>

      <section>
        <h2>7. Le défi</h2>

        <p>
          Les trois trucs, tous mélangés, et celui avec{" "}
          <span className="fr">vendre</span> en plus. Cette fois, personne ne
          te dit où est la faute : c’est exactement ce que tu fais quand tu
          relis ta copie. Une seule faute par phrase.
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
            <strong>avait ou était ?</strong> Dis la phrase avec{" "}
            <span className="fr">hier, il…</span> :{" "}
            <span className="fr">il est</span> donne{" "}
            <span className="fr">était</span>,{" "}
            <span className="fr">il a</span> donne{" "}
            <span className="fr">avait</span>.
          </li>
          <li>
            <strong>a ou à ?</strong> Dis <span className="fr">avait</span> à
            la place : ça marche, écris <span className="fr">a</span> ; ça ne
            veut rien dire, écris <span className="fr">à</span>.
          </li>
          <li>
            <strong>Un s ou pas ?</strong> Essaie avec{" "}
            <span className="fr">cheval</span> : tu dis{" "}
            <span className="fr">chevaux</span>, mets un{" "}
            <span className="fr">s</span> ; tu dis{" "}
            <span className="fr">cheval</span>, n’en mets pas.
          </li>
          <li>
            Quand tu relis ta copie, passe une fois par truc. Et garde un
            passage pour <span className="fr">vendre</span> :{" "}
            <span className="fr">-é</span> ou <span className="fr">-er</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
