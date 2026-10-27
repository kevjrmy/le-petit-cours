import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Quiz } from "./quiz";

const PATH = "/lecture/un-entretien-d-embauche";

export const metadata = lessonMetadata(PATH);

/* Two bodies around one French text (#102). The dialogue, the words and their
   French definitions are what is read: written once, shown in both. */

const WORDS = [
  {
    word: "un entretien d’embauche",
    definition: "la rencontre qui décide si l’on obtient un travail",
    example: "Mon entretien d’embauche est jeudi.",
  },
  {
    word: "postuler",
    definition: "demander officiellement un poste",
    example: "J’ai postulé pour le poste de vendeur.",
  },
  {
    word: "un poste",
    definition: "l’emploi précis qu’une entreprise propose",
    example: "Le poste est à plein temps.",
  },
  {
    word: "une équipe",
    definition: "l’ensemble des gens qui travaillent ensemble",
    example: "L’équipe compte quatre personnes.",
  },
  {
    word: "un atout",
    definition: "un avantage, un point fort",
    example: "Parler trois langues est un atout.",
  },
  {
    word: "disponible",
    definition: "libre, qui peut commencer",
    example: "Je suis disponible dès le mois prochain.",
  },
  {
    word: "à plein temps",
    definition: "toute la semaine de travail, par opposition à un mi-temps",
    example: "Elle cherche un poste à plein temps.",
  },
  {
    word: "une période d’essai",
    definition:
      "les premières semaines, pendant lesquelles chacun peut encore arrêter",
    example: "La période d’essai dure deux mois.",
  },
  {
    word: "une formation",
    definition: "un temps d’apprentissage organisé par l’entreprise",
    example: "Je vais suivre une formation la première semaine.",
  },
];

function Dialogue() {
  return (
    <div className="example">
      <p>
        <strong>Mme Léger.</strong> Bonjour monsieur Morales, entrez.
        Asseyez-vous, je vous en prie.
      </p>
      <p>
        <strong>M. Morales.</strong> Bonjour madame, merci beaucoup.
      </p>
      <p>
        <strong>Mme Léger.</strong> Vous avez postulé pour le poste de vendeur.
        Pourquoi notre librairie vous intéresse-t-elle ?
      </p>
      <p>
        <strong>M. Morales.</strong> Parce que vous vendez beaucoup de livres
        étrangers, et que j’aime conseiller les clients. Je voudrais travailler
        dans une petite équipe.
      </p>
      <p>
        <strong>Mme Léger.</strong> Très bien. Parlez-moi de votre expérience.
      </p>
      <p>
        <strong>M. Morales.</strong> J’ai travaillé deux ans comme vendeur à
        Séville, dans une librairie de quartier. Je m’occupais des commandes et
        de la caisse.
      </p>
      <p>
        <strong>Mme Léger.</strong> Et pourquoi êtes-vous parti ?
      </p>
      <p>
        <strong>M. Morales.</strong> Ma femme a trouvé un travail ici. Nous
        sommes arrivés en juin.
      </p>
      <p>
        <strong>Mme Léger.</strong> D’accord. Quelles langues parlez-vous ?
      </p>
      <p>
        <strong>M. Morales.</strong> Espagnol, français, et un peu d’anglais. Je
        pense que c’est un atout dans une librairie.
      </p>
      <p>
        <strong>Mme Léger.</strong> C’est vrai, nous avons beaucoup de touristes
        l’été. Vous êtes disponible quand ?
      </p>
      <p>
        <strong>M. Morales.</strong> Dès le mois prochain.
      </p>
      <p>
        <strong>Mme Léger.</strong> Parfait. Le poste est à plein temps, du
        mardi au samedi. Le magasin est fermé le lundi.
      </p>
      <p>
        <strong>M. Morales.</strong> Le samedi ne me pose pas de problème.
        Est-ce qu’il y a une période d’essai ?
      </p>
      <p>
        <strong>Mme Léger.</strong> Oui, deux mois. Après, le contrat devient
        définitif. Avez-vous d’autres questions ?
      </p>
      <p>
        <strong>M. Morales.</strong> Une seule : est-ce que je vais suivre une
        formation au logiciel de caisse ?
      </p>
      <p>
        <strong>Mme Léger.</strong> Bien sûr, la première semaine. Nous allons
        vous donner une réponse vendredi. Merci d’être venu.
      </p>
      <p>
        <strong>M. Morales.</strong> Merci à vous, madame. Bonne journée !
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
            ? "Le vocabulaire de l’entretien, dans l’ordre où il apparaît"
            : "El vocabulario de la entrevista, en el orden en que aparece"}
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
        <h2>La scène</h2>

        <p>
          Dialogue écrit pour ce cours · Un entretien d’embauche · Une librairie
          à Bordeaux
        </p>

        <p>
          Madame Léger dirige une librairie et cherche un vendeur. Monsieur
          Morales, qui a travaillé deux ans en Espagne, se présente pour le
          poste. L’entretien dure un quart d’heure et suit toujours le même
          ordre : pourquoi nous, ce que vous avez fait, quand vous êtes
          disponible, ce que vous voulez savoir.
        </p>

        <Dialogue />

        <div className="attention">
          L’entretien se fait entièrement au{" "}
          <span className="fr">vous</span>, des deux côtés. Même si le poste est
          dans une petite équipe où tout le monde se tutoie ensuite, on ne passe
          jamais au <span className="fr">tu</span> pendant un entretien.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>La escena</h2>

        <p>
          Diálogo escrito para este curso ·{" "}
          <span className="fr" lang="fr">Un entretien d’embauche</span> · Una
          librería en Burdeos
        </p>

        <p>
          La señora Léger dirige una librería y busca un dependiente. El señor
          Morales, que ha trabajado dos años en España, se presenta al puesto.
          La entrevista dura un cuarto de hora y siempre sigue el mismo orden:
          por qué nosotros, lo que has hecho, cuándo estás disponible, lo que
          quieres saber.
        </p>

        <div lang="fr">
          <Dialogue />
        </div>

        <div className="attention">
          La entrevista se hace entera de{" "}
          <span className="fr" lang="fr">vous</span>, por las dos partes. Aunque
          el puesto sea en un equipo pequeño donde luego todos se tutean, nunca
          se pasa al <span className="fr" lang="fr">tu</span> durante una
          entrevista.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots du texte</h2>

        <Words lang="fr" />

        <div className="astuce">
          <p className="astuce-hook">
            Quatre questions reviennent toujours. Préparez quatre réponses.
          </p>
          <p>
            Pourquoi nous, ce que vous avez fait, quand vous êtes disponible, et
            ce que vous voulez savoir. Seule la deuxième se raconte au passé
            composé et à l’imparfait ; la dernière est une question, et ne pas en
            avoir est le seul vrai mauvais signe.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras del texto</h2>

        <Words lang="es" />

        <div className="astuce">
          <p className="astuce-hook">
            Siempre vuelven cuatro preguntas. Prepara cuatro respuestas.
          </p>
          <p>
            Por qué nosotros, lo que has hecho, cuándo estás disponible y lo que
            quieres saber. Solo la segunda se cuenta en{" "}
            <span className="fr" lang="fr">passé composé</span> e{" "}
            <span className="fr" lang="fr">imparfait</span>; la última es una
            pregunta, y no tener ninguna es la única señal realmente mala.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Avez-vous compris ?</h2>

        <p>
          Le même texte à deux niveaux : choisissez le vôtre sous ce
          paragraphe. Répondez sans relire, puis retournez au texte pour celles
          qui vous manquent.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>¿Has entendido?</h2>

        <p>
          El mismo texto en dos niveles: elige el tuyo debajo de este párrafo.
          Responde sin releer y vuelve después al texto para las preguntas que
          te falten.
        </p>
      </section>

      <Quiz />
    </article>
  );
}
