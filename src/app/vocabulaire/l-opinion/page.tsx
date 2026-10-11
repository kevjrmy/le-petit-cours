import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/l-opinion";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Dire ce qu’on pense</h2>

        <div className="rule">
          Un avis commence par une petite formule. Après{" "}
          <span className="fr">que</span>, la phrase reste une phrase normale :{" "}
          <span className="fr">je pense que c’est cher</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Quatre formules, et ce que chacune dit de votre avis
            </caption>
            <thead>
              <tr>
                <th scope="col">Formule</th>
                <th scope="col">Quand l’employer</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  à mon avis
                </th>
                <td>au début de la phrase, pour annoncer votre idée</td>
                <td className="fr">À mon avis, le train est plus pratique.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  je pense que
                </th>
                <td>pour donner une idée, sur tous les sujets</td>
                <td className="fr">Je pense que c’est une bonne idée.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  je trouve que
                </th>
                <td>pour juger une chose que vous avez vue, lue ou goûtée</td>
                <td className="fr">Je trouve que ce film est trop long.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  je crois que
                </th>
                <td>quand vous n’êtes pas tout à fait sûr</td>
                <td className="fr">Je crois que le musée est fermé le lundi.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Vous connaissez <span className="fr">trouver</span> pour un objet
          perdu : <span className="fr">j’ai trouvé mes clés</span>. Avec{" "}
          <span className="fr">que</span>, le verbe donne un avis.
        </p>

        <div className="attention">
          On dit <span className="fr">à mon avis</span>. On ne dit pas{" "}
          <s className="fr">dans mon opinion</s>. Le mot{" "}
          <span className="fr">opinion</span> existe, mais pas dans cette
          formule.
        </div>

        <p>
          Pour dire le contraire, gardez{" "}
          <span className="fr">je pense que</span> et mettez la négation dans la
          suite de la phrase. C’est la forme la plus simple.
        </p>

        <div className="example">
          Je pense que ce <strong>n’</strong>est <strong>pas</strong> une bonne
          idée. · Je trouve que ce restaurant <strong>n’</strong>est{" "}
          <strong>pas</strong> cher.
        </div>
      </section>

      <section>
        <h2>Répondre à l’avis de l’autre</h2>

        <div className="rule">
          <span className="fr">d’accord</span> va avec le verbe{" "}
          <span className="fr">être</span>.{" "}
          <span className="fr">raison</span> et{" "}
          <span className="fr">tort</span> vont avec le verbe{" "}
          <span className="fr">avoir</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              Six réponses à l’avis de quelqu’un, du oui au non
            </caption>
            <thead>
              <tr>
                <th scope="col">Réponse</th>
                <th scope="col">Ce qu’elle veut dire</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  je suis d’accord
                </th>
                <td>vous pensez la même chose</td>
                <td className="fr">
                  Je suis d’accord avec toi : c’est trop cher.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu as raison
                </th>
                <td>ce que l’autre dit est juste</td>
                <td className="fr">Tu as raison, il faut réserver.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  c’est vrai, mais…
                </th>
                <td>vous acceptez une partie, puis vous ajoutez votre idée</td>
                <td className="fr">
                  C’est vrai, mais le train coûte plus cher.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  ça dépend
                </th>
                <td>la réponse change avec la situation</td>
                <td className="fr">Ça dépend du prix.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  je ne suis pas d’accord
                </th>
                <td>vous pensez autre chose</td>
                <td className="fr">
                  Je ne suis pas d’accord : le bus est plus rapide.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  tu as tort
                </th>
                <td>ce que l’autre dit est faux</td>
                <td className="fr">
                  Tu as tort : le musée est ouvert le dimanche.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <span className="fr">ça dépend</span> garde toujours son{" "}
          <span className="fr">ça</span>. On dit{" "}
          <span className="fr">ça dépend du prix</span>, on ne dit pas{" "}
          <s className="fr">dépend du prix</s>.
        </p>

        <div className="attention">
          <span className="fr">discuter</span>, c’est parler ensemble d’un
          sujet, calmement :{" "}
          <span className="fr">on a discuté du film pendant une heure</span>.
          Quand deux personnes se fâchent, elles{" "}
          <span className="fr">se disputent</span>. Une{" "}
          <span className="fr">discussion</span> entre amis est donc un bon
          moment.
        </div>
      </section>

      <section>
        <h2>Aller plus loin qu’une phrase</h2>

        <p>
          Un avis seul est court. Pour le développer, on donne une raison, puis
          un exemple. Les mots de la raison,{" "}
          <span className="fr">parce que</span> et{" "}
          <span className="fr">donc</span>, sont dans{" "}
          <Link href="/grammaire/les-connecteurs">Les connecteurs</Link>. En
          voici cinq autres.
        </p>

        <div className="table-wrap">
          <table>
            <caption>
              Cinq mots pour développer un avis, puis le fermer
            </caption>
            <thead>
              <tr>
                <th scope="col">Mot</th>
                <th scope="col">Ce qu’il annonce</th>
                <th scope="col">Exemple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  par exemple
                </th>
                <td>un cas précis</td>
                <td className="fr">
                  Le train est pratique. Par exemple, je peux lire pendant le
                  voyage.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  en plus
                </th>
                <td>une deuxième raison</td>
                <td className="fr">C’est loin. En plus, il n’y a pas de bus.</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  surtout
                </th>
                <td>la raison la plus importante</td>
                <td className="fr">
                  J’aime cette ville, surtout pour ses marchés.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  en général
                </th>
                <td>une chose vraie presque toujours</td>
                <td className="fr">
                  En général, je préfère voyager en train.
                </td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  bref
                </th>
                <td>la fin de l’avis, en quelques mots, à l’oral</td>
                <td className="fr">Bref, je préfère le train.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Voici un avis complet : l’idée, une raison, un exemple, la fin.</p>

        <div className="example">
          <strong>À mon avis</strong>, la vie est plus agréable dans une petite
          ville, parce que tout est près. <strong>Par exemple</strong>, je vais
          au travail à pied. <strong>En plus</strong>, les appartements sont
          moins chers. <strong>C’est vrai</strong>, il y a moins de cinémas et
          de concerts, <strong>mais</strong> je préfère le calme.{" "}
          <strong>Bref</strong>, je ne veux pas habiter dans une grande ville.
        </div>

        <div className="astuce">
          <p className="astuce-hook">Pourquoi ? Par exemple ?</p>
          <p>
            Quand vous ne savez pas comment continuer, posez-vous ces deux
            questions. Chaque réponse vous donne une phrase de plus.
          </p>
        </div>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            Un avis commence par <span className="fr">à mon avis</span>,{" "}
            <span className="fr">je pense que</span>,{" "}
            <span className="fr">je trouve que</span> ou{" "}
            <span className="fr">je crois que</span>.
          </li>
          <li>
            On ne dit pas <s className="fr">dans mon opinion</s>, et la négation
            se place après <span className="fr">que</span>.
          </li>
          <li>
            <span className="fr">être d’accord</span>, mais{" "}
            <span className="fr">avoir raison</span> et{" "}
            <span className="fr">avoir tort</span> ;{" "}
            <span className="fr">ça dépend</span> garde son{" "}
            <span className="fr">ça</span>.
          </li>
          <li>
            <span className="fr">discuter</span>, c’est parler ensemble ;{" "}
            <span className="fr">se disputer</span>, c’est se fâcher.
          </li>
          <li>
            <span className="fr">par exemple</span>,{" "}
            <span className="fr">en plus</span>,{" "}
            <span className="fr">surtout</span> et{" "}
            <span className="fr">en général</span> développent un avis ;{" "}
            <span className="fr">bref</span> le ferme.
          </li>
        </ul>
      </div>
    </article>
  );
}
