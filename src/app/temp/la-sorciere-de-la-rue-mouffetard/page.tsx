import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Choix } from "../_exercice/Choix";
import { Faute } from "../_exercice/Faute";
import { Ecrire } from "../_exercice/Ecrire";
import { ITEMS, FAUTES, ECRITURES } from "./exercice";

const PATH = "/temp/la-sorciere-de-la-rue-mouffetard";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un texte rendu cette semaine, sa correction, et ce qui
   s'y répète. Elle ne se coche pas et repartira à la remise à zéro.

   **Le texte est publié anonyme, et c'est la condition.** Rien sur cette page
   ne dit qui l'a écrit, quel âge il a, où il est scolarisé : le dépôt est
   public (`AGENTS.md` §9b) et ce qui n'est pas anonyme n'y entre pas. Nadia,
   Bachir et Saïd sont les personnages du conte, pas des personnes.

   **La première section est recopiée sans rien corriger**, ponctuation et
   ratures comprises : elle n'existe que pour être comparée à la deuxième. Si
   on la « répare » discrètement, la page ne montre plus rien.

   La correction est volontairement minimale. On garde les phrases, leur ordre
   et le temps du récit ; on ne réécrit pas mieux, on écrit juste. La dernière
   phrase est la seule qu'on ne pouvait pas corriger seul, et la page le dit
   plutôt que de trancher à la place de son auteur.

   Huit régularités, huit lignes dans le tableau, huit items dans le premier
   exercice (`AGENTS.md` §9) : si une ligne bouge, les trois comptes bougent
   ensemble.

   **Trois exercices, et ils ne demandent pas la même chose** : reconnaître la
   bonne forme entre deux, voir la faute dans une phrase qui n'en signale
   aucune, puis écrire la forme soi-même. C'est l'ordre de la difficulté pour
   quelqu'un qui parle la langue et ne l'écrit pas. Les données des trois sont
   dans `exercice.ts`, à côté.

   Chaque plateau est une feuille cliente dans une page serveur (§4) : la page
   reste prérendue, seuls les plateaux s'hydratent. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Recopié tel quel, sans rien changer. Lisez-le à voix haute d’abord :
          beaucoup d’erreurs de cette page ne s’entendent pas, et c’est
          justement ce qui les rend difficiles.
        </p>

        <Copie>
          <p>
            Les personage de cette histoire son : la sorcière, Nadia, le pere
            Saïd et Bachir.
          </p>
          <p>
            Cette histoire comence avec une sorciere qui voulait etre jeune
            mais pour ça il fallait mangér une fille que son prenom comence par
            N. Elle conaisait une jeune fille appeler Nadia, alors un jour la
            sorcière rencontra Nadia et lui dit si elle peut lui ramener de la
            sauce tomate de chez elle, elle dit oui et elle partait chercher la
            sauce tomate. Quand elle voulait rentrer chez elle elle aller
            repartir direct mais son pere lui avait demander ou elle partait.
            Nadia lui avait dit que elle allait lui ramener de la sauce tomate
            a la vielle dame mais son pere lui dit que si elle veut de la sauce
            tomate elle devrais le chercher elle meme. Le jour d’apprèt la
            sorcière lui demanda ou était la sauce tomate et Nadia lui avait
            dit que elle devait la chercher elle meme alors la sorcier allait
            la sauce chez Nadia mais elle voulait que Nadia aille deliverer la
            sauce tomate chez elle mais le pere avait dis quelle alait pas
            faire ça, alors tout les jours la sorciere alait dans une episerie
            diferent pour vendre de la nouriture a Nadia mais c’était jamais
            telle que Nadia voulait. Alors elle s’avait transforme dant tout
            les episerie et finalement elle captura Nadia mais la sorciere ne
            savait pas que Nadia avait un petit frere qui s’avait rendu compte
            que Nadia était toujours pas a la maison alors qu’il était tard,
            son petit frere avait pris sa guitare et il avait parti chercher sa
            soeur.
          </p>
          <p>
            Quand il était dehors il avait fermer les yeux et il avait dit quil
            etait un chanteur aveugle, et la sorciere lui dit de chanter et il
            comence a chanter une chanson pour trouver dans quelle episerie
            était Nadia. Après Nadia repond alors son frere suit ou était
            Nadia. La sorciere detestes la chanson, elle la detestes autan que
            le frere bat la sorciere domant sa soeur.
          </p>
        </Copie>
      </section>

      <section>
        <h2>Le texte corrigé</h2>

        <p>
          Les mêmes phrases, dans le même ordre : rien n’a été réécrit pour
          faire plus joli. Ce qui change est en gras.
        </p>

        <Copie>
          <p>
            Les <strong>personnages</strong> de cette histoire{" "}
            <strong>sont</strong> : la sorcière, Nadia, le{" "}
            <strong>père</strong> Saïd et Bachir.
          </p>
          <p>
            Cette histoire <strong>commence</strong> avec une{" "}
            <strong>sorcière</strong> qui voulait <strong>être</strong> jeune,
            mais pour ça il fallait <strong>manger</strong> une fille{" "}
            <strong>dont le</strong> prénom <strong>commence</strong> par N.
            Elle <strong>connaissait</strong> une jeune fille{" "}
            <strong>appelée</strong> Nadia. Alors, un jour, la sorcière
            rencontra Nadia et lui <strong>demanda</strong> si elle{" "}
            <strong>pouvait</strong> lui ramener de la sauce tomate de chez
            elle. Elle dit oui et elle <strong>partit</strong> chercher la
            sauce tomate. Quand elle <strong>voulut</strong> rentrer chez elle,
            elle <strong>allait</strong> repartir{" "}
            <strong>tout de suite</strong>, mais son <strong>père</strong> lui
            avait <strong>demandé</strong> où elle{" "}
            <strong>allait</strong>. Nadia lui avait dit{" "}
            <strong>qu’elle</strong> allait lui ramener de la sauce tomate à la{" "}
            <strong>vieille</strong> dame, mais son <strong>père</strong> lui
            dit que si elle <strong>voulait</strong> de la sauce tomate, elle{" "}
            <strong>devrait la</strong> chercher elle-
            <strong>même</strong>. Le jour <strong>d’après</strong>, la
            sorcière lui demanda où était la sauce tomate, et Nadia lui avait
            dit <strong>qu’elle</strong> devait la chercher elle-
            <strong>même</strong>. Alors la <strong>sorcière</strong>{" "}
            <strong>allait chercher</strong> la sauce chez Nadia, mais elle
            voulait que Nadia aille <strong>livrer</strong> la sauce tomate
            chez elle, mais le <strong>père</strong> avait{" "}
            <strong>dit qu’elle n’allait</strong> pas faire ça. Alors,{" "}
            <strong>tous</strong> les jours, la sorcière{" "}
            <strong>allait</strong> dans une <strong>épicerie différente</strong>{" "}
            pour vendre de la <strong>nourriture</strong> à Nadia, mais{" "}
            <strong>ce n’était</strong> jamais <strong>celle</strong> que Nadia
            voulait. Alors elle <strong>s’était transformée dans toutes les
            épiceries</strong> et finalement elle captura Nadia. Mais la
            sorcière ne savait pas que Nadia avait un petit{" "}
            <strong>frère</strong> qui <strong>s’était</strong> rendu compte
            que Nadia <strong>n’était</strong> toujours pas à la maison alors
            qu’il était tard. Son petit <strong>frère</strong> avait pris sa
            guitare et il <strong>était</strong> parti chercher sa{" "}
            <strong>sœur</strong>.
          </p>
          <p>
            Quand il était dehors, il avait <strong>fermé</strong> les yeux et
            il avait dit <strong>qu’il était</strong> un chanteur aveugle. Et
            la <strong>sorcière</strong> lui dit de chanter, et il{" "}
            <strong>commença</strong> à chanter une chanson pour trouver dans
            quelle <strong>épicerie</strong> était Nadia. Après, Nadia{" "}
            <strong>répondit</strong>, alors son <strong>frère sut</strong> où
            était Nadia. La sorcière <strong>détestait</strong> la chanson ;
            elle la <strong>détestait tellement que</strong> le frère{" "}
            <strong>battit</strong> la sorcière{" "}
            <strong>en réclamant</strong> sa <strong>sœur</strong>.
          </p>
        </Copie>

        <div className="attention">
          la toute dernière phrase est la seule que la correction ne règle pas.{" "}
          <span className="fr">
            « elle la déteste autan que le frere bat la sorciere »
          </span>{" "}
          n’explique pas ce qui se passe : est-ce qu’il la bat parce qu’elle
          déteste la chanson, ou pendant qu’elle la déteste ? À reprendre
          ensemble, à l’oral, avant de la réécrire.
        </div>
      </section>

      <section>
        <h2>Ce qui revient</h2>

        <p>
          Les erreurs isolées ne servent à rien. Celles-ci reviennent plusieurs
          fois chacune, et c’est pour ça qu’elles valent une règle.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les huit régularités du texte</caption>
            <thead>
              <tr>
                <th scope="col">La règle</th>
                <th scope="col">Dans le texte</th>
                <th scope="col">On écrit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Le participe passé après « avoir »</th>
                <td className="fr">
                  avait demander · avait fermer · appeler · avait dis
                </td>
                <td className="fr">
                  avait demandé · avait fermé · appelée · avait dit
                </td>
              </tr>
              <tr>
                <th scope="row">L’auxiliaire « être »</th>
                <td className="fr">
                  il avait parti · s’avait rendu compte · s’avait transforme
                </td>
                <td className="fr">
                  il était parti · s’était rendu compte · s’était transformée
                </td>
              </tr>
              <tr>
                <th scope="row">Le « ne » de la négation</th>
                <td className="fr">
                  c’était jamais · était toujours pas · alait pas
                </td>
                <td className="fr">
                  ce n’était jamais · n’était toujours pas · n’allait pas
                </td>
              </tr>
              <tr>
                <th scope="row">Le temps du verbe</th>
                <td className="fr">
                  elle aller repartir · elle devrais · detestes
                </td>
                <td className="fr">
                  elle allait repartir · elle devrait · détestait
                </td>
              </tr>
              <tr>
                <th scope="row">L’accord</th>
                <td className="fr">
                  les personage · une episerie diferent · tout les jours
                </td>
                <td className="fr">
                  les personnages · une épicerie différente · tous les jours
                </td>
              </tr>
              <tr>
                <th scope="row">L’orthographe du mot</th>
                <td className="fr">
                  comence · conaisait · nouriture · personage · episerie
                </td>
                <td className="fr">
                  commence · connaissait · nourriture · personnage · épicerie
                </td>
              </tr>
              <tr>
                <th scope="row">L’élision</th>
                <td className="fr">que elle · quil</td>
                <td className="fr">qu’elle · qu’il</td>
              </tr>
              <tr>
                <th scope="row">Les accents et le « œ »</th>
                <td className="fr">
                  etre · prenom · pere · frere · meme · a la maison · soeur
                </td>
                <td className="fr">
                  être · prénom · père · frère · même · à la maison · sœur
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rule">
          Les deux premières lignes sont la même question posée deux fois : ce
          qui est devant le verbe décide de ce qu’on écrit derrière.{" "}
          <span className="fr">avoir</span> demande un participe en{" "}
          <span className="fr">-é</span> ;{" "}
          <span className="fr">être</span> en demande un aussi, mais lui
          s’accorde avec le sujet.
        </div>

        <div className="astuce">
          <p className="astuce-hook">Une relecture par ligne du tableau.</p>
          <p>
            Huit règles en une seule relecture, personne n’y arrive. Relisez le
            texte huit fois si besoin, en ne cherchant qu’une chose à chaque
            fois : d’abord tous les <span className="fr">avoir</span> et{" "}
            <span className="fr">être</span>, puis tous les{" "}
            <span className="fr">pas</span> et{" "}
            <span className="fr">jamais</span>, puis les accents. Une passe, une
            faute.
          </p>
        </div>
      </section>

      <section>
        <h2>Laquelle des deux ?</h2>

        <p>
          Huit phrases, une par ligne du tableau, toutes tirées du texte. La
          bonne forme est là, à côté de celle qui a été écrite. Rien n’est
          enregistré : le score s’affiche, et il s’efface dès qu’on recommence.
        </p>

        <Choix items={ITEMS} />
      </section>

      <section>
        <h2>Trouvez la faute</h2>

        <p>
          Plus difficile, et c’est le vrai exercice : ici rien n’est signalé. La
          phrase arrive entière, comme elle a été rendue, et il faut voir lequel
          des mots ne va pas. C’est ce qui manque quand on relit sa copie et
          qu’elle paraît finie.
        </p>

        <Faute items={FAUTES} />
      </section>

      <section>
        <h2>Écrivez la forme</h2>

        <p>
          Le dernier, et le seul où l’on ne choisit pas. Reconnaître la bonne
          forme et savoir l’écrire sont deux choses différentes, et c’est la
          deuxième qui manque. Les accents comptent, la rangée sous le champ
          donne ceux que le clavier espagnol refuse.
        </p>

        <Ecrire items={ECRITURES} />
      </section>
    </article>
  );
}
