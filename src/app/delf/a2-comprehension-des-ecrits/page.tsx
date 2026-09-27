import { Associer } from "@/components/delf/Associer";
import { Copie, Correction, Questions } from "@/components/delf/Copie";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { COPIE } from "./copie";

const PATH = "/delf/a2-comprehension-des-ecrits";

export const metadata = lessonMetadata(PATH);

/**
 * Une épreuve entière de compréhension des écrits, au format du DELF A2.
 *
 * **Le format est repris, les documents sont écrits pour ce cours** (#78).
 * Quatre exercices, 5 + 6 + 9 + 5 points, trente minutes : c'est la forme
 * publique de l'examen, et c'est un fait. Les panneaux, les titres, l'article
 * et le courriel ci-dessous n'existent nulle part ailleurs.
 *
 * **Tout se coche, et tout se corrige d'un coup, à la fin** (#82). Les
 * questions et leur barème sont dans `copie.ts` ; la page garde les documents,
 * rendus par le serveur, et pose `<Questions>` là où chaque exercice les
 * attend. `<Copie>` tient les réponses autour de l'épreuve entière, parce que la
 * note du bas doit voir les quatre exercices (`AGENTS.md` §4).
 */
interface Photo {
  src: string;
  alt: string;
  auteur: string;
  licence: string;
  licenceUrl?: string;
  page: string;
}

const COMMONS = "https://upload.wikimedia.org/wikipedia/commons/thumb/";

/* Les panneaux de l'exercice 1, et leur photo quand Commons en a une qui montre
   la chose sans écrire autre chose dessus. Le crédit est dans la même entrée
   que l'image, pour que les deux ne se séparent pas (`AGENTS.md` §9). Aucune
   photo ne donne la réponse à la place du texte : c'est l'écrit qui est
   évalué, l'image situe. */
const PANNEAUX: { lettre: string; texte: string; photo?: Photo }[] = [
  {
    lettre: "A",
    texte: "Ascenseur en panne — prenez l’escalier",
    photo: {
      src: `${COMMONS}e/e7/Ascenseur%2C_entr%C3%A9e_Est%2C_gare_de_Vichy.jpg/500px-Ascenseur%2C_entr%C3%A9e_Est%2C_gare_de_Vichy.jpg`,
      alt: "L’entrée d’un ascenseur dans une gare.",
      auteur: "TCY",
      licence: "CC BY-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Ascenseur,_entr%C3%A9e_Est,_gare_de_Vichy.jpg",
    },
  },
  {
    lettre: "B",
    texte: "Boulangerie — fermée le lundi",
    photo: {
      src: `${COMMONS}1/16/Devanture_Boulangerie_159_rue_Ordener.jpg/500px-Devanture_Boulangerie_159_rue_Ordener.jpg`,
      alt: "La devanture d’une boulangerie parisienne.",
      auteur: "KoS",
      licence: "CC BY-SA 3.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Devanture_Boulangerie_159_rue_Ordener.jpg",
    },
  },
  {
    lettre: "C",
    texte: "Pelouse interdite aux chiens",
    photo: {
      src: `${COMMONS}e/e6/No_dogs_sign_%2823403406570%29.jpg/500px-No_dogs_sign_%2823403406570%29.jpg`,
      alt: "Un panneau rond barré d’un chien, au bord d’une pelouse.",
      auteur: "StockyPics",
      licence: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:No_dogs_sign_(23403406570).jpg",
    },
  },
  {
    lettre: "D",
    texte: "Soldes — deux pulls achetés, le troisième offert",
    photo: {
      src: `${COMMONS}0/02/Soldes_%287689974286%29.jpg/500px-Soldes_%287689974286%29.jpg`,
      alt: "Une vitrine de magasin couverte d’affiches « Soldes ».",
      auteur: "istolethetv",
      licence: "CC BY 2.0",
      licenceUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Soldes_(7689974286).jpg",
    },
  },
  {
    lettre: "E",
    texte: "Piscine — bonnet obligatoire",
    photo: {
      src: `${COMMONS}7/7f/Bonnet_de_bain_silicone.JPG/500px-Bonnet_de_bain_silicone.JPG`,
      alt: "Un bonnet de bain bleu et blanc.",
      auteur: "Floriano",
      licence: "CC BY 3.0",
      licenceUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Bonnet_de_bain_silicone.JPG",
    },
  },
  /* Pas de photo : celles de Commons portent de l'anglais, ou une affiche
     sans rapport à côté du pictogramme. Dessiné, donc. */
  { lettre: "F", texte: "Salle d’attente — éteignez votre téléphone" },
  {
    lettre: "G",
    texte: "Marché tous les samedis matin, place de la Mairie",
    photo: {
      src: `${COMMONS}a/a6/March%C3%A9_hebdomadaire_%C3%A0_Malauc%C3%A8ne.jpg/500px-March%C3%A9_hebdomadaire_%C3%A0_Malauc%C3%A8ne.jpg`,
      alt: "Les étals d’un marché sur une place de village.",
      auteur: "erikorama",
      licence: "CC BY 2.0",
      licenceUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:March%C3%A9_hebdomadaire_%C3%A0_Malauc%C3%A8ne.jpg",
    },
  },
  {
    lettre: "H",
    texte: "Stationnement réservé aux livraisons",
    photo: {
      src: `${COMMONS}6/61/Place_stationnement_interdit_sauf_livraisons_%28d%C3%A9but_de_la_rue_de_la_Source-de-l%27H%C3%B4pital%2C_Vichy%29_2024-12-29.JPG/500px-Place_stationnement_interdit_sauf_livraisons_%28d%C3%A9but_de_la_rue_de_la_Source-de-l%27H%C3%B4pital%2C_Vichy%29_2024-12-29.JPG`,
      alt: "Une place peinte en jaune sur le trottoir, sous un panneau de stationnement interdit.",
      auteur: "Tabl-trai",
      licence: "CC BY-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Place_stationnement_interdit_sauf_livraisons_(d%C3%A9but_de_la_rue_de_la_Source-de-l%27H%C3%B4pital,_Vichy)_2024-12-29.JPG",
    },
  },
];

/* Le panneau F, dessiné : un téléphone barré. En couleur de texte et non en
   rouge, parce que le rouge de ce cours veut dire « faux » (`AGENTS.md` §5). */
function TelephoneInterdit() {
  return (
    <svg
      className="photo"
      viewBox="0 0 160 120"
      role="img"
      aria-label="Un téléphone portable barré."
    >
      <rect
        x="62"
        y="22"
        width="36"
        height="64"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <line
        x1="74"
        y1="76"
        x2="86"
        y2="76"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle
        cx="80"
        cy="54"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      <line
        x1="49"
        y1="23"
        x2="111"
        y2="85"
        stroke="currentColor"
        strokeWidth="7"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <Copie copie={COPIE}>
        <section>
          <h2>L’épreuve</h2>

          <p className="epreuve">
            <span>25 points</span>
            <span>30 minutes</span>
            <span>4 exercices</span>
          </p>

          <p>
            Pour chaque question, cliquez sur la bonne réponse. Recliquez-la
            pour l’effacer. Rien n’est corrigé pendant que vous répondez : à la
            fin, « Corriger ma copie » donne votre note sur 25.
          </p>

          <div className="exercice">
            <h3>
              Exercice 1 <span className="points">5 points</span>
            </h3>

            <p>
              Vous marchez dans une ville française et vous lisez ces panneaux.
            </p>

            <p>
              Glissez chaque phrase sur le panneau qui lui correspond, ou
              touchez une phrase puis le panneau. Trois panneaux ne servent pas.
            </p>

            <Associer
              groupe="1"
              documents={PANNEAUX.map(({ lettre, texte, photo }) => ({
                lettre,
                texte,
                image: photo ? (
                  /* Une photo de Wikimedia Commons, liée et non copiée
                     (#83) : `next/image` la ferait passer par le serveur, ce
                     qui revient à l'héberger. Sans réseau elle disparaît, et
                     le panneau reste lisible, parce que le texte est dessous. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="photo"
                    src={photo.src}
                    alt={photo.alt}
                    width={500}
                    height={375}
                    loading="lazy"
                  />
                ) : (
                  <TelephoneInterdit />
                ),
              }))}
            />

            <p className="credits">
              Photos : Wikimedia Commons.{" "}
              {PANNEAUX.filter((p) => p.photo).map(({ lettre, photo }, i) => (
                <span key={lettre}>
                  {i > 0 && " · "}
                  {lettre} <a href={photo!.page}>{photo!.auteur}</a>,{" "}
                  {photo!.licenceUrl ? (
                    <a href={photo!.licenceUrl}>{photo!.licence}</a>
                  ) : (
                    photo!.licence
                  )}
                </span>
              ))}
              . F est dessiné pour ce cours.
            </p>
          </div>

          <div className="exercice">
            <h3>
              Exercice 2 <span className="points">6 points</span>
            </h3>

            <p>
              Voici six titres de journal. Pour chaque titre, choisissez sa
              rubrique. Chaque rubrique sert une fois.
            </p>

            <Questions groupe="2" />
          </div>

          <div className="exercice">
            <h3>
              Exercice 3 <span className="points">9 points</span>
            </h3>

            <p>Lisez ce texte, puis répondez aux questions.</p>

            <div className="document">
              <h4>À Sainte-Colombe, le bus ne coûte plus rien</h4>
              <p>
                Depuis le mois de janvier, les quatre lignes de bus de
                Sainte-Colombe sont gratuites. Cette petite ville de huit mille
                habitants, au bord de la Loire, est la première du département à
                faire ce choix.
              </p>
              <p>
                Au terminus, madame Prévot attend la ligne 2. « Avant, je payais
                vingt-huit euros par mois. Maintenant je viens au marché deux
                fois par semaine, au lieu d’une. » Le matin, les bus sont pleins
                : la mairie compte quarante pour cent de voyageurs en plus
                depuis janvier.
              </p>
              <p>
                Tout le monde n’est pas content. « Gratuit, cela veut dire payé
                par les impôts*, » dit Karim Benali, qui tient un garage dans la
                zone commerciale. « Moi, mes clients viennent en voiture. » Le
                commerçant craint* aussi pour les places de stationnement, que
                la ville veut réduire.
              </p>
              <p>
                Le maire, lui, défend son projet : « Un bus vide coûte plus cher
                qu’un bus plein. Nous perdons les recettes* des tickets, mais
                nous économisons sur les machines et sur le contrôle. » La
                mairie annonce une cinquième ligne pour septembre, vers le
                lycée.
              </p>
              <p>
                Le département regarde l’expérience de près. Deux autres villes
                ont déjà demandé les chiffres.
              </p>
              <p className="notes">
                *les impôts : l’argent que chacun donne à l’État · *craindre :
                avoir peur de · *les recettes : l’argent que l’on gagne
              </p>
            </div>

            <Questions groupe="3-qcm" />

            <p>
              Vrai ou faux ? Choisissez, puis choisissez la phrase du texte qui
              le montre. <span className="points">7,5 points</span>
            </p>

            <Questions groupe="3-vf" />
          </div>

          <div className="exercice">
            <h3>
              Exercice 4 <span className="points">5 points</span>
            </h3>

            <p>Vous recevez ce message. Répondez aux questions.</p>

            <div className="document">
              <p className="entete">
                <strong>De :</strong> secretariat@gymclubdelavallee.fr
                <br />
                <strong>Objet :</strong> Votre inscription pour la saison
                prochaine
              </p>
              <p>Bonjour,</p>
              <p>
                Vous êtes inscrit au Gym Club de la Vallée depuis l’an dernier,
                et nous vous remercions de votre fidélité.
              </p>
              <p>
                Pour continuer l’an prochain, merci de renvoyer votre dossier
                avant le 30 juin. Après cette date, nous ne pouvons plus garder
                votre place : la liste d’attente compte déjà soixante personnes.
              </p>
              <p>
                Le dossier comprend la fiche d’inscription et un certificat
                médical de moins de trois mois. Le paiement se fait en une fois
                ou en trois fois, à votre choix.
              </p>
              <p>
                Nouveauté : les adhérents inscrits avant le 15 juin entrent
                gratuitement au cours d’aquagym du mercredi soir.
              </p>
              <p>Pour toute question, répondez simplement à ce message.</p>
              <p>Le secrétariat</p>
            </div>

            <Questions groupe="4" />
          </div>
        </section>

        <section>
          <h2>Les corrections</h2>

          <p>
            Répondez à tout avant de corriger. Une question laissée blanche vaut
            zéro, comme à l’examen : mieux vaut une réponse au hasard que pas de
            réponse.
          </p>

          <Correction>
            <p>
              À l’examen, cette épreuve compte pour un quart de la note : il
              faut 50 points sur 100 en tout, et au moins 5 sur 25 dans chacune
              des quatre épreuves.
            </p>
          </Correction>
        </section>
      </Copie>
    </article>
  );
}
