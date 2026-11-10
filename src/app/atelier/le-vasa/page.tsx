import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import atelier from "../_texte/Page.module.css";
import { Choix } from "../_exercice/Choix";
import { Quiz } from "../_exercice/Quiz";
import { Trous } from "../_exercice/Trous";
import { CEST, QUIZ, RESUME } from "./exercice";
import { ARTICLE, ILLUSTRATIONS, type Illustration } from "./images";

const PATH = "/atelier/le-vasa";

export const metadata = lessonMetadata(PATH);

/* Page d'atelier (#80), bâtie sur un article de presse plutôt que sur une
   copie : la mère de l'élève a demandé des articles de journaux. La page
   donne les mots, puis l'histoire du Vasa racontée pour le cours, avec ses
   images, un quiz, un résumé à trous sur ses fautes qui reviennent, un truc
   nouveau (c'était ou s'était, tiré de sa copie du 5 octobre), puis le sujet
   de son prochain texte. L'élève n'a pas à quitter le site.

   **L'article n'est pas sur la page** (`AGENTS.md` §9b) : il appartient à
   Ouest-France. Le récit de la partie 2 est un texte écrit pour le cours :
   les faits de l'article et du musée Vasa, ni ses phrases ni son plan. Le
   texte complet de l'article reste dans `.private/2026-11-11/`.

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

const DATE_ARTICLE = new Date(`${ARTICLE.date}T12:00:00`).toLocaleDateString(
  "fr-FR",
  { day: "numeric", month: "long", year: "numeric" },
);

export default function Page() {
  const images = ILLUSTRATIONS;

  return (
    <article className={`prose ${atelier.page}`}>
      <PageHeader path={PATH} />

      <p>
        Aujourd’hui, pas de texte à corriger : on lit l’histoire d’un bateau
        suédois qui a coulé le jour même de son départ. Elle vient d’un récit
        du journal <i>Ouest-France</i>, et elle est racontée ici pour toi. Lis
        d’abord les mots de la partie 1, puis le texte en entier.
      </p>

      <section>
        <h2>1. Avant de lire : six mots</h2>

        <table>
          <caption>Six mots du texte</caption>
          <thead>
            <tr>
              <th scope="col">Le mot</th>
              <th scope="col">Ce qu’il veut dire</th>
              <th scope="col">Un exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fr">un vaisseau</td>
              <td>Un grand navire de guerre, à voiles.</td>
              <td className="fr">Le Vasa était le plus grand vaisseau de Suède.</td>
            </tr>
            <tr>
              <td className="fr">la figure de proue</td>
              <td>Une statue sculptée tout à l’avant d’un bateau.</td>
              <td className="fr">La figure de proue du Vasa est un lion.</td>
            </tr>
            <tr>
              <td className="fr">bâbord</td>
              <td>
                Le côté gauche d’un bateau, quand on regarde vers l’avant. Le
                côté droit, c’est <span className="fr">tribord</span>.
              </td>
              <td className="fr">Le Vasa s’est couché à bâbord.</td>
            </tr>
            <tr>
              <td className="fr">un sabord</td>
              <td>Une ouverture dans le côté du bateau, pour sortir les canons.</td>
              <td className="fr">L’eau est entrée par les sabords ouverts.</td>
            </tr>
            <tr>
              <td className="fr">une épave</td>
              <td>Un bateau qui a coulé, ou ce qu’il en reste.</td>
              <td className="fr">L’épave est restée plus de trois cents ans au fond.</td>
            </tr>
            <tr>
              <td className="fr">renflouer</td>
              <td>Remonter à la surface un bateau qui a coulé.</td>
              <td className="fr">On a renfloué le Vasa en 1961.</td>
            </tr>
          </tbody>
        </table>

        <div className="attention">
          Dans le texte, <span className="fr">ce bâtiment</span>, c’est le
          bateau : les marins appellent ainsi un grand navire. D’habitude, un{" "}
          <span className="fr">bâtiment</span> est un <i lang="es">edificio</i>{" "}
          : une maison, une école, un immeuble.
        </div>
      </section>

      <section>
        <h2>2. L’histoire du Vasa</h2>

        <p>
          Ce texte est écrit pour le cours, à partir du récit d’Olivier
          Renault dans <i>Ouest-France</i> et des explications du musée Vasa.
        </p>

        <h3>Le plus beau bateau du roi</h3>

        <div className="example recit">
          <p>
            En 1626, la Suède était en guerre. Son roi, Gustave II Adolphe, se
            battait en Pologne, et il lui fallait des navires puissants. Il a
            donc commandé à Stockholm un vaisseau comme on n’en avait jamais
            vu : le Vasa.
          </p>
          <p>
            Pendant deux ans, des centaines d’ouvriers ont travaillé sur le
            chantier. Le Vasa avait soixante-quatre canons, et des murs de bois
            si épais qu’un boulet avait du mal à les traverser. Il était aussi
            couvert de sculptures : des guerriers, des lions, des personnages
            de légende… Tout à l’avant, sa figure de proue était un grand lion.
            Toutes ces statues étaient peintes de couleurs vives, avec beaucoup
            d’or. Le roi voulait que ce bâtiment impressionne ses ennemis comme
            ses amis : une arme, bien sûr, mais aussi une œuvre d’art qui
            flotte.
          </p>
        </div>

        <Figure image={images.roi} />
        <Figure image={images.poupe} />
        <Figure image={images.lion} />

        <h3>Un bateau qui penchait</h3>

        <div className="example recit">
          <p>
            Mais le Vasa avait un défaut. Pendant un essai, on a fait courir
            des marins d’un côté à l’autre du pont, et le bateau s’est mis à
            pencher si fort qu’il a fallu tout arrêter. Le capitaine, Söfring
            Hansson, était inquiet. L’amiral qui représentait le roi, lui, n’a
            pas voulu l’écouter.
          </p>
          <p>
            Il faut dire que le chantier avait perdu son chef : le constructeur,
            le Hollandais Henrik Hybertsson, était mort en 1627, avant la fin
            des travaux. Et à cette époque, personne ne savait encore calculer
            si un bateau était stable. Le roi attendait son navire. On a décidé
            de partir quand même.
          </p>
        </div>

        <h3>Le départ</h3>

        <div className="example recit">
          <p>
            Le 10 août 1628, une foule immense attendait au bord de l’eau. Il
            n’y avait presque pas de vent, et le Vasa a quitté le quai
            lentement. Puis il a ouvert quatre de ses voiles, et ses canons ont
            tiré pour saluer la ville.
          </p>
          <p>
            Quelques minutes plus tard, un coup de vent l’a fait pencher à
            bâbord. Il s’est redressé un peu, puis un deuxième coup de vent l’a
            couché sur le côté. L’eau est entrée par les sabords, qu’on avait
            laissés ouverts. Les marins ont essayé de le redresser, mais c’était
            trop tard. Les gens sur le rivage l’ont vu disparaître. Il avait
            parcouru à peine plus d’un kilomètre. Trente personnes sont mortes.
          </p>
          <p>
            Pourquoi ? Le musée Vasa l’explique aujourd’hui : le navire était
            trop lourd dans sa partie haute. Quand le vent l’a poussé, il n’a
            pas pu retrouver son équilibre.
          </p>
        </div>

        <h3>Trois cent trente-trois ans au fond</h3>

        <div className="example recit">
          <p>
            Quelques dizaines d’années plus tard, des plongeurs sont descendus
            jusqu’à l’épave et ont remonté la plupart des canons, qui ont été
            vendus. Puis tout le monde a oublié le Vasa.
          </p>
          <p>
            En 1956, un chercheur passionné, Anders Franzén, l’a retrouvé avec
            un plongeur, Per Edvin Fälting. Le bateau était en très bon état :
            dans la mer Baltique, l’eau est peu salée, et les petits animaux qui
            mangent le bois n’y vivent pas. La vase l’avait protégé, elle aussi.
          </p>
          <p>
            Le 24 avril 1961, après 333 ans sous l’eau, le Vasa est enfin sorti
            de la mer.
          </p>
        </div>

        <div className={atelier.paire}>
          <Figure image={images.renflouement} />
          <Figure image={images.coque} />
        </div>

        <h3>Un trésor du XVII<sup>e</sup> siècle</h3>

        <div className="example recit">
          <p>
            À bord, les archéologues ont trouvé des milliers d’objets : des
            tonneaux, le coffre d’un menuisier, des outils, de la vaisselle, et
            même des voiles qui n’avaient jamais servi. Il ne restait que trois
            canons. Ils ont aussi trouvé les restes de plusieurs victimes. En
            étudiant leurs os, les chercheurs ont appris leur taille, leur âge
            et les maladies qu’elles avaient eues. Un sculpteur a même refait le
            visage de certaines d’entre elles.
          </p>
          <p>
            Il a fallu ensuite remettre chaque planche à sa place, une par une.
            Aujourd’hui, le Vasa est dans un musée de Stockholm, construit
            autour de lui. Il est fait à 98 % de ses pièces d’origine, et plus
            d’un million de personnes viennent le voir chaque année. Mais le
            vieux bois se fatigue : depuis 2024, on lui installe une nouvelle
            structure en acier pour le soutenir.
          </p>
        </div>

        <Figure image={images.musee} />
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
        <h2>4. Le résumé à trous</h2>

        <p>
          Voici l’histoire du Vasa en quelques lignes. Il manque treize mots.
          Pour chaque trou, quatre formes : la bonne, la faute que tu fais
          souvent, et deux pièges. Tu connais déjà tous les trucs.
        </p>

        <Trous
          texte={RESUME}
          consigne="Clique sur un trou et choisis la bonne forme. Pour changer d’avis, clique de nouveau sur le mot."
        />
      </section>

      <section>
        <h2>5. c’était ou s’était ?</h2>

        <p>
          Dans un de tes textes : <s className="fr">l’autre jour s’était Tina
          qui le faisait</s>. Il fallait écrire{" "}
          <span className="fr">c’était Tina</span>. Les deux se disent pareil :
          l’oreille ne t’aide pas. Alors fais un petit test.
        </p>

        <div className="rule">
          Tu peux dire <span className="fr">cela</span> à la place ? Écris{" "}
          <span className="fr">c’</span> : <span className="fr">c’était
          Tina</span>, <span className="fr">cela était Tina</span>. · Tu
          entends <span className="fr">se</span> au présent ? Écris{" "}
          <span className="fr">s’</span> : <span className="fr">le Vasa se
          couche</span>, <span className="fr">le Vasa s’est couché</span>.
        </div>

        <Choix
          items={CEST}
          consigne="Choisis la bonne forme. Essaie d’abord « cela », puis « se »."
          nom="c’était ou s’était"
        />
      </section>

      <section>
        <h2>6. À ton tour</h2>

        <p>
          Pour la prochaine fois, écris dix à quinze lignes sur une feuille,
          comme d’habitude. Choisis un sujet :
        </p>

        <ul>
          <li>
            <span className="fr">
              « Il était une fois un bateau si beau que… »
            </span>{" "}
            Raconte l’histoire du Vasa comme un conte.
          </li>
          <li>
            Tu es un mousse, un jeune marin, à bord du Vasa, le 10 août 1628.
            Raconte ta journée.
          </li>
        </ul>

        <p>
          Avant de rendre ta feuille, relis-la une fois pour chaque truc :{" "}
          <span className="fr">ils</span> et <span className="fr">-aient</span>,{" "}
          <span className="fr">a</span> ou <span className="fr">à</span>, le{" "}
          <span className="fr">s</span> du pluriel, la lettre muette, et{" "}
          <span className="fr">c’</span> ou <span className="fr">s’</span>.
        </p>
      </section>

      <div className="resume">
        <h2>En résumé</h2>
        <ul>
          <li>
            <strong>c’ ou s’ ?</strong> Tu peux dire{" "}
            <span className="fr">cela</span> : <span className="fr">c’était</span>
            . Tu entends <span className="fr">se</span> :{" "}
            <span className="fr">il s’est couché</span>.
          </li>
          <li>
            <strong>Ils, elles :</strong> <span className="fr">-aient</span>,
            même quand on ne l’entend pas :{" "}
            <span className="fr">ils essayaient</span>.
          </li>
          <li>
            <strong>Un bateau, des bateaux :</strong> le{" "}
            <span className="fr">x</span> seulement quand il y en a plusieurs.
          </li>
          <li>
            <strong>a ou à :</strong> si tu peux dire{" "}
            <span className="fr">avait</span> à la place, c’est{" "}
            <span className="fr">a</span>.
          </li>
          <li>
            <strong>Un bâtiment</strong>, d’habitude, c’est un{" "}
            <i lang="es">edificio</i>. Sur la mer, c’est un grand navire.
          </li>
        </ul>
      </div>

      <p className="credits">
        Texte écrit pour le cours d’après l’article{" "}
        <a href={ARTICLE.url}>{ARTICLE.titre}</a>, {ARTICLE.auteur},{" "}
        <i>{ARTICLE.journal}</i>, {DATE_ARTICLE}, et les explications du musée
        Vasa. Images : Wikimedia Commons.{" "}
        {Object.values<Illustration>(images).map((image, i) => (
          <span key={image.src}>
            {i > 0 && " · "}
            <i>{image.oeuvre}</i>, <a href={image.page}>{image.auteur}</a>
            {image.source && `, ${image.source}`},{" "}
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
