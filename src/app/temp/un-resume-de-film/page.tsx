import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Copie } from "../_texte/Copie";
import { Choix } from "../_exercice/Choix";
import { Faute } from "../_exercice/Faute";
import { Ecrire } from "../_exercice/Ecrire";
import { ITEMS, FAUTES, ECRITURES } from "./exercice";

const PATH = "/temp/un-resume-de-film";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80) : un texte rendu cette semaine, sa correction, et ce qui
   s'y répète. Elle ne se coche pas et repartira à la remise à zéro.

   **Le texte est publié anonyme, et c'est la condition.** Rien ici ne dit qui
   l'a écrit ni d'où il vient : le dépôt est public (`AGENTS.md` §9b). Ray, Ira
   Edelstein et Fester sont les personnages du film résumé, pas des personnes.

   **La première section est recopiée sans rien corriger.** Elle n'existe que
   pour être comparée à la deuxième ; la réparer discrètement viderait la page.

   Le vrai sujet de ce texte-ci n'est pas l'orthographe, c'est la troisième
   section : `le` ou `lui` devant le verbe. Le texte contient les deux cas, et
   l'un des deux y est correct, ce qui est la seule façon honnête de montrer
   que la règle n'est pas « toujours le ». **Les trois exercices reprennent ce
   cas**, chacun à sa troisième question, pour la même raison.

   Six régularités, six lignes dans le tableau, six items par exercice
   (`AGENTS.md` §9).

   **Trois exercices, trois gestes** : reconnaître entre deux formes, voir la
   faute dans une phrase qui n'en signale aucune, écrire la forme soi-même.
   Chaque plateau est une feuille cliente dans une page serveur (§4) : la page
   reste prérendue. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le texte</h2>

        <p>
          Recopié tel quel, sans rien changer. Le récit tient en trois phrases
          et il est déjà au passé simple, ce qui n’est pas rien : c’est le temps
          du résumé écrit.
        </p>

        <Copie>
          <p>
            l’histoire comence en nous presentant le personage principale Ray,
            qui est un paparazzi qui regrette son status photo reporter.
          </p>
          <p>
            Pendan une seance paparazzi d’une Bar-mitzvah d’un tel Ira
            Edelstein, il eu de memoire de sa jeunesse aux college où on lui
            disait qu’il avait du grand potentiel, puis il retourna a la realité
            quand un homme nomé Fester lui poussa.
          </p>
          <p>
            après, en partant, on lui ataca en lui tapant a la et lui volant la
            camera.
          </p>
        </Copie>
      </section>

      <section>
        <h2>Le texte corrigé</h2>

        <p>
          Les mêmes phrases, dans le même ordre, au même temps. Ce qui change
          est en gras.
        </p>

        <Copie>
          <p>
            <strong>L’</strong>histoire <strong>commence</strong> en nous{" "}
            <strong>présentant</strong> le <strong>personnage principal</strong>
            , Ray, qui est un paparazzi <strong>et</strong> qui regrette son{" "}
            <strong>statut de photoreporter</strong>.
          </p>
          <p>
            <strong>Pendant</strong> une <strong>séance</strong>{" "}
            <strong>de</strong> paparazzi <strong>à</strong> une{" "}
            <strong>bar-mitsva</strong>, celle{" "}
            <strong>d’un certain</strong> Ira Edelstein, il{" "}
            <strong>eut un souvenir</strong> de sa jeunesse{" "}
            <strong>au collège</strong>, où on lui disait qu’il avait{" "}
            <strong>un</strong> grand <strong>potentiel</strong>. Puis il
            retourna <strong>à</strong> la <strong>réalité</strong> quand un
            homme <strong>nommé</strong> Fester <strong>le</strong> poussa.
          </p>
          <p>
            <strong>Après</strong>, en partant, on{" "}
            <strong>l’attaqua</strong>, en <strong>le frappant à la tête</strong>{" "}
            et en lui volant <strong>sa caméra</strong>.
          </p>
        </Copie>

        <div className="attention">
          la dernière phrase s’arrête au milieu :{" "}
          <span className="fr">« en lui tapant a la »</span> attend un mot qui
          n’a jamais été écrit. C’est une phrase qu’il faut finir, pas une
          phrase qu’il faut corriger.
        </div>
      </section>

      <section>
        <h2>Ce qui revient</h2>

        <div className="rule">
          <span className="fr">le</span>, <span className="fr">la</span>,{" "}
          <span className="fr">l’</span> remplacent un nom qui suit le verbe
          sans préposition : on pousse <em>quelqu’un</em>, donc{" "}
          <span className="fr">on le pousse</span>.{" "}
          <span className="fr">lui</span> remplace un nom introduit par{" "}
          <span className="fr">à</span> : on vole quelque chose{" "}
          <span className="fr">à</span> quelqu’un, donc{" "}
          <span className="fr">on lui vole sa caméra</span>. Le verbe décide, et
          l’espagnol ne le décide pas de la même façon.
        </div>

        <div className="example">
          Fester <strong>le</strong> poussa. On <strong>l’</strong>attaqua. On{" "}
          <strong>le</strong> frappa.
          <br />
          On <strong>lui</strong> vola sa caméra. On <strong>lui</strong>{" "}
          disait qu’il avait un grand potentiel.
        </div>

        <p>
          Les deux dernières sont déjà correctes dans le texte. C’est la preuve
          que la règle est sue : ce qui manque, c’est de la vérifier verbe par
          verbe plutôt que de choisir à l’oreille.
        </p>

        <div className="table-wrap">
          <table>
            <caption>Les six régularités du texte</caption>
            <thead>
              <tr>
                <th scope="col">La règle</th>
                <th scope="col">Dans le texte</th>
                <th scope="col">On écrit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">« le » ou « lui » ?</th>
                <td className="fr">lui poussa · on lui ataca</td>
                <td className="fr">le poussa · on l’attaqua</td>
              </tr>
              <tr>
                <th scope="row">L’accord de l’adjectif</th>
                <td className="fr">le personage principale</td>
                <td className="fr">le personnage principal</td>
              </tr>
              <tr>
                <th scope="row">Le mot juste</th>
                <td className="fr">
                  son status photo reporter · il eu de memoire · du grand
                  potentiel
                </td>
                <td className="fr">
                  son statut de photoreporter · il eut un souvenir · un grand
                  potentiel
                </td>
              </tr>
              <tr>
                <th scope="row">Les accents</th>
                <td className="fr">
                  presentant · memoire · college · realité · camera · apres ·
                  seance
                </td>
                <td className="fr">
                  présentant · mémoire · collège · réalité · caméra · après ·
                  séance
                </td>
              </tr>
              <tr>
                <th scope="row">Les consonnes doubles</th>
                <td className="fr">comence · personage · nomé</td>
                <td className="fr">commence · personnage · nommé</td>
              </tr>
              <tr>
                <th scope="row">La phrase finie</th>
                <td className="fr">Pendan · en lui tapant a la</td>
                <td className="fr">Pendant · en le frappant à la tête</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Posez la question au verbe, pas à la phrase.
          </p>
          <p>
            Devant chaque pronom, demandez :{" "}
            <span className="fr">pousser quelqu’un</span> ou{" "}
            <span className="fr">pousser à quelqu’un</span> ? S’il n’y a pas de{" "}
            <span className="fr">à</span>, c’est{" "}
            <span className="fr">le</span> ou <span className="fr">la</span>.
            S’il y en a un, c’est <span className="fr">lui</span>. Trois verbes
            de ce texte répondent sans <span className="fr">à</span> :{" "}
            <span className="fr">pousser</span>,{" "}
            <span className="fr">attaquer</span>,{" "}
            <span className="fr">frapper</span>.
          </p>
        </div>
      </section>

      <section>
        <h2>Laquelle des deux ?</h2>

        <p>
          Six phrases, une par ligne du tableau. La troisième est déjà juste
          dans votre texte : elle est là exprès, parce qu’un exercice où{" "}
          <span className="fr">lui</span> est toujours faux apprendrait une
          règle fausse.
        </p>

        <Choix items={ITEMS} />
      </section>

      <section>
        <h2>Trouvez la faute</h2>

        <p>
          Ici rien n’est signalé : la phrase arrive entière et il faut voir
          lequel des mots ne va pas. Les troisième et quatrième phrases se
          répondent, <span className="fr">le</span> dans l’une,{" "}
          <span className="fr">lui</span> dans l’autre, et c’est le verbe qui
          tranche à chaque fois.
        </p>

        <Faute items={FAUTES} />
      </section>

      <section>
        <h2>Écrivez la forme</h2>

        <p>
          Le seul où l’on ne choisit pas. Ce texte perd surtout des accents, et
          un accent ne se reconnaît pas, il s’écrit. La rangée sous le champ
          donne ceux que le clavier espagnol refuse.
        </p>

        <Ecrire items={ECRITURES} />
      </section>
    </article>
  );
}
