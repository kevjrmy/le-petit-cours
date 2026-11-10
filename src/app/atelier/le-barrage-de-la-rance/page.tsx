import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Quiz } from "../_exercice/Quiz";
import { Trous } from "../_exercice/Trous";
import { LIENS, QUIZ, RESUME } from "./exercice";
import { AUTRE_SOURCE, ILLUSTRATIONS, SOURCE, type Illustration } from "./images";

const PATH = "/atelier/le-barrage-de-la-rance";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80), bâtie sur un document plutôt que sur une copie : la
   page d'EDF sur l'usine marémotrice de la Rance, qui a soixante ans ce
   mois-ci. La page donne les mots, puis un texte sur l'usine écrit pour le
   cours, avec ses images et le schéma, un quiz, une partie pour lire avec un
   œil critique (qui parle, et deux chiffres qui ne s'accordent pas), un
   résumé à trous sur ses fautes qui reviennent, un truc nouveau (les mots qui
   organisent les idées), puis le sujet de son prochain texte, argumenté.
   L'élève n'a pas à quitter le site.

   **La page d'EDF n'est pas sur la page** (`AGENTS.md` §9b). Le texte de la
   partie 2 est écrit pour le cours : les faits d'EDF, ni ses phrases ni son
   plan, et les deux chiffres qu'elle donne, chacun à sa place, pour la
   partie 4. Deux courtes citations d'EDF et le titre d'Ouest-France sont
   cités pour la discussion. Le texte complet reste dans
   `.private/2026-11-11/`.

   **Anonyme** : rien ne dit qui est l'élève. Elle le tutoie. */

function Figure({ image }: { image: Illustration }) {
  return (
    <figure className={atelier.figure}>
      {/* Une image locale à taille fixe : rien à optimiser, et `<img>` garde
          la page prérendue sans passer par le service d'images. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
      />
      <figcaption>{image.legende}</figcaption>
    </figure>
  );
}

export default function Page() {
  const images = ILLUSTRATIONS;

  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <p>
        Aujourd’hui, pas de texte à corriger : on lit un texte sur l’usine
        marémotrice de la Rance, qui a soixante ans ce mois-ci. Attention à
        sa source : ses informations viennent de la page d’EDF, l’entreprise
        qui fait tourner l’usine, pas d’un journal. Lis d’abord les mots de la
        partie 1, puis le texte en entier.
      </p>

      <section>
        <h2>1. Avant de lire : huit mots</h2>

        <Figure image={images.vueAerienne} />

        <table>
          <caption>Huit mots du texte</caption>
          <thead>
            <tr>
              <th scope="col">Le mot</th>
              <th scope="col">Ce qu’il veut dire</th>
              <th scope="col">Un exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fr">la marée montante, descendante</td>
              <td>La mer qui monte, puis qui descend, deux fois par jour.</td>
              <td className="fr">À marée descendante, l’eau repart vers la mer.</td>
            </tr>
            <tr>
              <td className="fr">un estuaire</td>
              <td>L’endroit où un fleuve arrive à la mer : l’eau douce y rencontre l’eau salée.</td>
              <td className="fr">Le barrage ferme l’estuaire de la Rance.</td>
            </tr>
            <tr>
              <td className="fr">l’estran</td>
              <td>La bande de côte sous l’eau à marée haute, à sec à marée basse.</td>
              <td className="fr">À marée basse, on marche sur l’estran.</td>
            </tr>
            <tr>
              <td className="fr">une écluse</td>
              <td>Un bassin fermé par des portes, qui fait passer les bateaux d’un niveau d’eau à l’autre.</td>
              <td className="fr">Chaque année, 15 000 bateaux passent l’écluse.</td>
            </tr>
            <tr>
              <td className="fr">une vanne</td>
              <td>Une porte qu’on ouvre ou qu’on ferme pour laisser passer l’eau.</td>
              <td className="fr">On ouvre les vannes pour remplir le bassin.</td>
            </tr>
            <tr>
              <td className="fr">le débit</td>
              <td>
                La quantité d’eau qui passe en une seconde. Attention, rien à
                voir avec <i lang="es">débito</i>, une dette.
              </td>
              <td className="fr">Dans les turbines, le débit peut atteindre 6 600 m³ par seconde.</td>
            </tr>
            <tr>
              <td className="fr">renouvelable</td>
              <td>Qui ne s’épuise pas : les marées reviennent toujours.</td>
              <td className="fr">Le vent et les marées sont des énergies renouvelables.</td>
            </tr>
            <tr>
              <td className="fr">l’envasement</td>
              <td>La vase, une boue fine, qui s’accumule au fond de l’eau.</td>
              <td className="fr">L’envasement gêne les bateaux dans l’estuaire.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>2. L’usine de la Rance</h2>

        <p>
          Ce texte est écrit pour le cours, avec les informations de la page
          d’EDF « {SOURCE.titre} ».
        </p>

        <h3>Une usine sous la mer</h3>

        <div className="example recit">
          <p>
            Entre Saint-Malo et Dinard, la Rance, un petit fleuve breton, rejoint
            la mer par un large estuaire. Depuis 1966, un barrage de 750 mètres
            le ferme. Une route passe dessus, avec jusqu’à 60 000 voitures par
            jour en été, et une écluse laisse passer environ 15 000 bateaux par
            an. Mais le plus étonnant ne se voit pas : sous l’eau, à l’intérieur
            du barrage, se cache une usine électrique longue de 390 mètres.
          </p>
        </div>

        <Figure image={images.barrage} />

        <h3>La force des marées</h3>

        <div className="example recit">
          <p>
            Ici, les marées sont parmi les plus fortes d’Europe : entre la
            marée basse et la marée haute, la mer peut monter de plus de treize
            mètres. L’usine en profite. Le barrage retient l’eau de l’estuaire
            comme dans un grand bassin. Quand on ouvre les vannes, l’eau passe
            de la mer au bassin, ou du bassin à la mer, et elle fait tourner
            vingt-quatre turbines.
          </p>
          <p>
            Ces turbines, qu’on appelle des « bulbes », ont été mises au point
            pour la Rance ; depuis, des ingénieurs du monde entier les ont
            adoptées. Leur particularité : elles tournent dans les deux
            sens. L’usine produit donc de l’électricité quand la marée monte,
            mais aussi quand elle descend. Et comme les heures des marées sont
            connues longtemps à l’avance, on sait aussi, à l’avance, ce que
            l’usine va produire. Un ordinateur pilote les vannes et les
            turbines, suivant un programme préparé par les équipes d’EDF.
          </p>
        </div>

        <Figure image={images.schema} />

        <h3>Ce qu’elle produit</h3>

        <div className="example recit">
          <p>
            Chaque année, l’usine produit environ 500 millions de
            kilowattheures : à peu près ce que consomment 225 000 habitants,
            une ville comme Rennes. D’après EDF, cela fait 10 % de l’électricité
            produite en Bretagne. C’est précieux, car la Bretagne produit peu
            d’électricité : elle achète à d’autres régions environ les deux
            tiers de ce qu’elle consomme.
          </p>
          <p>
            L’usine emploie une soixantaine de personnes, et plus de 40 000
            visiteurs viennent la découvrir chaque année, gratuitement. D’après
            un bilan de 2023 cité par EDF, elle assure 8 % de la production
            d’électricité bretonne.
          </p>
        </div>

        <h3>Soixante ans d’histoire</h3>

        <div className="example recit">
          <p>
            Les travaux ont duré six ans. Pour construire l’usine au sec, il a
            d’abord fallu fermer l’estuaire avec des murs provisoires, puis
            couler des tonnes de béton. Le 26 novembre 1966, le général de
            Gaulle a inauguré la première usine marémotrice du monde. Elle est
            longtemps restée la plus grande ; depuis 2011, une usine de Corée du
            Sud la dépasse un peu. Tous les dix ans, des spécialistes
            l’inspectent de fond en comble : en 2017, ils ont utilisé des robots
            sous-marins et un drone.
          </p>
        </div>

        <Figure image={images.chantier} />

        <h3>La vase dans l’estuaire</h3>

        <div className="example recit">
          <p>
            Le barrage a aussi un effet sur la Rance : la vase s’accumule dans
            l’estuaire, plus que la nature n’en dépose seule. C’est
            l’envasement. Pour les bateaux, les pêcheurs ou les baigneurs, c’est
            une vraie gêne.
          </p>
          <p>
            Sur ce point, les avis s’opposent. EDF s’appuie sur un comité de
            scientifiques : pour eux, la vase gêne les usages de l’estuaire,
            mais n’abîme pas le milieu marin. Ils conseillent de changer la
            façon de faire tourner l’usine, surtout pendant les tempêtes,
            plutôt que de lancer de grands travaux pour enlever la vase. En
            2020, EDF a d’ailleurs modifié le fonctionnement de l’usine pour
            rendre de la place à l’estran. Des associations et des élus de la
            région, eux, parlent d’un « désastre écologique » et demandent à
            l’État d’agir.
          </p>
        </div>
      </section>

      <section>
        <h2>3. Tu as compris ?</h2>

        <p>
          Chaque question est écrite de quatre façons, et une seule est juste.
          Trouve d’abord la bonne écriture, puis la bonne réponse. Pour avoir
          le point, il faut les deux.
        </p>

        <Quiz
          items={QUIZ}
          consigne="Choisis la question bien écrite, puis la bonne réponse."
          nom="le quiz du texte"
        />
      </section>

      <section>
        <h2>4. Lire avec un œil critique</h2>

        <p>
          Un document dit des choses vraies, mais il les dit depuis un endroit.
          Avant de croire, demande-toi qui parle. On en parle ensemble.
        </p>

        <h3>Qui parle ?</h3>

        <p>
          Sur la vase dans l’estuaire, la page d’EDF cite des experts : elle
          n’aurait « pas d’impact sur l’environnement marin mais uniquement sur
          les usages ». Ouest-France, lui, titre un article :{" "}
          <a href={AUTRE_SOURCE.url}>« Désastre écologique en cours »</a>.
        </p>

        <ul>
          <li>D’où viennent les informations du texte ? Qu’est-ce que cette entreprise a à gagner ?</li>
          <li>Que veut dire « les usages » ? Pense aux bateaux, à la pêche, à la baignade.</li>
          <li>Qui parle dans l’article d’Ouest-France ? Le journaliste, ou d’autres personnes ?</li>
        </ul>

        <h3>Deux chiffres pour une seule chose</h3>

        <p>
          Relis la partie « Ce qu’elle produit ». Sur la page d’EDF, l’usine
          représente « 10 % de l’électricité produite en Bretagne »… puis,
          quelques lignes plus bas, « 8 % de la production ».
        </p>

        <ul>
          <li>Lequel croire ? Qu’est-ce qui pourrait expliquer la différence ?</li>
          <li>Comment le vérifier ? Pourquoi est-ce important de citer ses sources quand on écrit ?</li>
        </ul>
      </section>

      <section>
        <h2>5. Le résumé à trous</h2>

        <p>
          Voici la page d’EDF résumée en quelques lignes. Il manque douze mots.
          Pour chaque trou, cinq formes : la bonne, la faute que tu fais
          souvent, et trois pièges. Tu connais déjà tous les trucs.
        </p>

        <Trous
          texte={RESUME}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />
      </section>

      <section>
        <h2>6. Organiser ses idées</h2>

        <p>
          Dans tes textes, les idées se suivent avec{" "}
          <span className="fr">et</span>, <span className="fr">et puis</span>,{" "}
          <span className="fr">mais</span>. Pour donner ton avis, il faut dire
          comment elles se tiennent : est-ce qu’on ajoute, qu’on oppose, ou
          qu’on tire une conséquence ?
        </p>

        <table>
          <caption>Les mots qui organisent les idées</caption>
          <thead>
            <tr>
              <th scope="col">Pour…</th>
              <th scope="col">Les mots</th>
              <th scope="col">Un exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ajouter</td>
              <td className="fr">d’une part… d’autre part, de plus, mais aussi</td>
              <td className="fr">D’une part, le barrage produit de l’électricité ; d’autre part, il sert de pont.</td>
            </tr>
            <tr>
              <td>opposer</td>
              <td className="fr">pourtant, alors que, cependant</td>
              <td className="fr">L’énergie est propre. Pourtant, l’estuaire s’envase.</td>
            </tr>
            <tr>
              <td>tirer une conséquence</td>
              <td className="fr">donc, c’est pourquoi</td>
              <td className="fr">La production suit les marées : on peut donc la prévoir.</td>
            </tr>
          </tbody>
        </table>

        <Choix
          items={LIENS}
          consigne="Choisis le mot qui tient la phrase. Demande-toi : on ajoute, on oppose, ou c’est une conséquence ?"
          nom="organiser ses idées"
        />
      </section>

      <section>
        <h2>7. À ton tour</h2>

        <p>
          Pour la prochaine fois, écris quinze à vingt lignes sur une feuille :{" "}
          <span className="fr">
            « Faut-il garder le barrage de la Rance comme il est ? »
          </span>
        </p>

        <ul>
          <li>Présente le barrage en deux ou trois phrases.</li>
          <li>
            <span className="fr">D’une part</span>, ce qu’il apporte ;{" "}
            <span className="fr">d’autre part</span>, les problèmes.
          </li>
          <li>
            Termine par ton avis : <span className="fr">à mon avis</span>,{" "}
            <span className="fr">je pense que</span>, et dis pourquoi.
          </li>
        </ul>

        <p>
          Avant de rendre ta feuille, relis-la une fois pour chaque truc :
          l’accord avec <span className="fr">être</span>, les doubles consonnes,
          les majuscules, et le passé composé.
        </p>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <strong>Qui parle ?</strong> Une entreprise qui présente sa propre
            usine n’est pas un journal. Compare avec une autre source.
          </li>
          <li>
            <strong>Deux chiffres différents</strong> pour une seule chose :
            cherche d’où ils viennent avant d’en citer un.
          </li>
          <li>
            <strong>Organiser ses idées :</strong>{" "}
            <span className="fr">d’une part… d’autre part</span> pour ajouter,{" "}
            <span className="fr">pourtant</span>,{" "}
            <span className="fr">alors que</span> pour opposer,{" "}
            <span className="fr">donc</span> pour une conséquence.
          </li>
          <li>
            <strong>L’accord avec être :</strong>{" "}
            <span className="fr">l’usine a été construite</span>,{" "}
            <span className="fr">inaugurée</span>.
          </li>
          <li>
            <strong>La majuscule</strong> pour le nom du lieu, pas pour
            l’adjectif : <span className="fr">la Bretagne</span>, mais{" "}
            <span className="fr">l’électricité bretonne</span>.
          </li>
        </ul>
      </div>

      <p className="credits">
        Texte écrit pour le cours d’après la page{" "}
        <a href={SOURCE.url}>{SOURCE.titre}</a>, {SOURCE.auteur},{" "}
        {SOURCE.site}. Titre cité :{" "}
        <a href={AUTRE_SOURCE.url}>{AUTRE_SOURCE.titre}</a>,{" "}
        <i>{AUTRE_SOURCE.journal}</i>. Images : Wikimedia Commons.{" "}
        {Object.values<Illustration>(images).map((image, i) => (
          <span key={image.src}>
            {i > 0 && " · "}
            <i>{image.oeuvre}</i>, <a href={image.page}>{image.auteur}</a>,{" "}
            {image.licenceUrl ? (
              <a href={image.licenceUrl}>{image.licence}</a>
            ) : (
              image.licence
            )}
          </span>
        ))}
        .
      </p>
    </article>
  );
}
