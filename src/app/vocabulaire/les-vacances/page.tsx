import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-vacances";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   (words, examples) is written once, below, and shared; the middle column,
   which explains, is written in each language. */

type Row = { word: string; fr: string; es: string; example: string };

const PARTIR: Row[] = [
  {
    word: "partir en vacances",
    fr: "quitter la maison pour une période de repos",
    es: "salir de casa para un periodo de descanso",
    example: "Nous sommes partis en vacances le 14 juillet.",
  },
  {
    word: "être en vacances",
    fr: "être dans cette période de repos",
    es: "estar en ese periodo de descanso",
    example: "Je suis en vacances depuis lundi.",
  },
  {
    word: "faire sa valise",
    fr: "mettre ses affaires dans la valise avant le départ",
    es: "meter tus cosas en la maleta antes de salir",
    example: "Il fait sa valise la veille du départ.",
  },
  {
    word: "réserver",
    fr: "demander et garder à l’avance un billet, une chambre",
    es: "pedir y guardar con antelación un billete, una habitación",
    example: "J’ai réservé une chambre pour trois nuits.",
  },
  {
    word: "le vol",
    fr: "le voyage en avion (le même mot veut dire aussi : prendre un objet qui n’est pas à soi)",
    es: "el viaje en avión (la misma palabra significa también: el robo)",
    example: "Le vol dure deux heures.",
  },
  {
    word: "prendre l’avion, le train",
    fr: "voyager avec ce moyen de transport",
    es: "viajar con ese medio de transporte",
    example: "Nous avons pris le train jusqu’à Lyon.",
  },
  {
    word: "louer une voiture",
    fr: "payer pour l’utiliser quelques jours",
    es: "pagar para usarla unos días",
    example: "Nous avons loué une voiture à l’aéroport.",
  },
];

const LOGER: Row[] = [
  {
    word: "un hôtel",
    fr: "on paie une chambre pour la nuit",
    es: "pagas una habitación por la noche",
    example: "Nous avons dormi dans un petit hôtel près de la gare.",
  },
  {
    word: "une chambre d’hôte",
    fr: "une chambre chez des particuliers, souvent avec le petit déjeuner",
    es: "una habitación en casa de particulares, a menudo con desayuno",
    example: "Notre chambre d’hôte était chez une dame très gentille.",
  },
  {
    word: "une auberge de jeunesse",
    fr: "un logement peu cher, souvent avec des chambres partagées",
    es: "un alojamiento barato, a menudo con habitaciones compartidas",
    example: "Une nuit en auberge de jeunesse coûte peu.",
  },
  {
    word: "le camping",
    fr: "on dort sous une tente ou dans une caravane",
    es: "se duerme en una tienda de campaña o en una caravana",
    example: "En été, nous faisons du camping à la montagne.",
  },
  {
    word: "loger chez des amis",
    fr: "dormir chez eux, sans payer d’hôtel",
    es: "dormir en su casa, sin pagar hotel",
    example: "Nous avons logé chez des amis pendant la semaine.",
  },
];

const SUR_PLACE: Row[] = [
  {
    word: "visiter",
    fr: "un lieu : une ville, un musée, un château",
    es: "un lugar: una ciudad, un museo, un castillo",
    example: "Nous avons visité un vieux château.",
  },
  {
    word: "rendre visite à",
    fr: "une personne : on va la voir chez elle",
    es: "una persona: vas a verla a su casa",
    example: "J’ai rendu visite à ma tante.",
  },
  {
    word: "se promener",
    fr: "marcher sans se presser, pour le plaisir",
    es: "caminar sin prisa, por placer",
    example: "Nous nous sommes promenés dans la vieille ville.",
  },
  {
    word: "faire une randonnée",
    fr: "faire une longue marche dans la nature",
    es: "hacer una caminata larga por la naturaleza",
    example: "Nous avons fait une randonnée de quatre heures.",
  },
  {
    word: "se baigner",
    fr: "entrer dans l’eau pour nager",
    es: "entrar en el agua para nadar",
    example: "Nous nous sommes baignés dans la mer.",
  },
  {
    word: "prendre des photos",
    fr: "garder des images du voyage",
    es: "guardar imágenes del viaje",
    example: "J’ai pris beaucoup de photos.",
  },
  {
    word: "goûter",
    fr: "un plat : en manger un peu pour le connaître",
    es: "un plato: comer un poco para conocerlo",
    example: "J’ai goûté un plat typique de la région.",
  },
];

const LIEUX: Row[] = [
  {
    word: "la plage",
    fr: "le bord de la mer, avec du sable",
    es: "la orilla del mar, con arena",
    example: "Nous sommes restés toute la journée à la plage.",
  },
  {
    word: "la montagne",
    fr: "les hauts sommets, la neige en hiver",
    es: "las cumbres altas, la nieve en invierno",
    example: "En août, il fait frais à la montagne.",
  },
  {
    word: "la campagne",
    fr: "loin de la ville : les champs et les villages",
    es: "lejos de la ciudad: los campos y los pueblos",
    example: "Mes grands-parents habitent à la campagne.",
  },
  {
    word: "le paysage",
    fr: "tout ce qu’on voit autour de soi dehors",
    es: "todo lo que ves a tu alrededor al aire libre",
    example: "Du train, on voyait un beau paysage.",
  },
];

const TEMPS: Row[] = [
  {
    word: "il faisait beau",
    fr: "le ciel était clair, il n’y avait pas de pluie",
    es: "el cielo estaba despejado, sin lluvia",
    example: "Il faisait beau tous les matins.",
  },
  {
    word: "il faisait chaud",
    fr: "la température était haute",
    es: "la temperatura era alta",
    example: "Il faisait chaud, alors nous allions à la plage.",
  },
  {
    word: "il faisait froid",
    fr: "la température était basse",
    es: "la temperatura era baja",
    example: "Il faisait froid le soir.",
  },
  {
    word: "il pleuvait",
    fr: "l’eau tombait du ciel",
    es: "caía agua del cielo",
    example: "Il pleuvait, donc nous avons visité un musée.",
  },
  {
    word: "il y avait du vent",
    fr: "l’air bougeait fort",
    es: "el aire se movía con fuerza",
    example: "Il y avait du vent sur la plage.",
  },
  {
    word: "il y avait du soleil",
    fr: "le soleil brillait",
    es: "el sol brillaba",
    example: "Il y avait souvent du soleil.",
  },
  {
    word: "il y avait du monde",
    fr: "beaucoup de personnes étaient là",
    es: "había muchas personas",
    example: "Il y avait du monde au marché.",
  },
];

const IMPRESSIONS: Row[] = [
  {
    word: "c’était magnifique",
    fr: "très beau, très impressionnant",
    es: "muy bonito, muy impresionante",
    example: "La vue depuis l’hôtel, c’était magnifique !",
  },
  {
    word: "c’était génial",
    fr: "très bien, on s’est beaucoup amusé",
    es: "muy bien, nos divertimos mucho",
    example: "La randonnée, c’était génial !",
  },
  {
    word: "c’était décevant",
    fr: "moins bien que ce qu’on espérait",
    es: "peor de lo que esperabas",
    example: "La plage était sale : c’était décevant.",
  },
  {
    word: "ça m’a plu",
    fr: "j’ai trouvé cela agréable",
    es: "me ha resultado agradable",
    example: "Ce village m’a plu : il est calme.",
  },
  {
    word: "j’ai adoré",
    fr: "j’ai beaucoup aimé",
    es: "me ha gustado muchísimo",
    example: "J’ai adoré la cuisine de la région.",
  },
  {
    word: "le séjour",
    fr: "le temps passé dans un lieu",
    es: "el tiempo pasado en un lugar",
    example: "Notre séjour a duré une semaine.",
  },
  {
    word: "rentrer",
    fr: "revenir chez soi",
    es: "volver a casa",
    example: "Nous sommes rentrés dimanche soir.",
  },
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function WordTable({
  rows,
  lang,
  caption,
  heads,
}: {
  rows: Row[];
  lang: "fr" | "es";
  caption: string;
  heads: string[];
}) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {heads.map((head) => (
              <th key={head} scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td>{row[lang]}</td>
              <td className="fr" lang="fr">
                {row.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Story() {
  return (
    <div className="example" lang="fr">
      L’été dernier, nous sommes partis en vacances à la mer. Nous avons pris le
      train, puis nous avons loué une voiture. Nous avons logé dans une chambre
      d’hôte près de la plage. Il faisait chaud et il y avait du soleil tous les
      jours. Nous nous sommes baignés, nous avons fait une randonnée et nous
      avons goûté des plats de la région. C’était génial ! Notre séjour a duré
      une semaine et nous sommes rentrés dimanche soir.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Partir et se loger</h2>

        <div className="rule">
          Le mot <span className="fr">vacances</span> est toujours au pluriel :{" "}
          <span className="fr">en vacances</span>, jamais{" "}
          <s className="fr">en vacance</s>.
        </div>

        <WordTable
          rows={PARTIR}
          lang="fr"
          caption="Sept expressions pour préparer son départ"
          heads={["Expression", "Ce qu’elle veut dire", "Exemple"]}
        />

        <p>
          Pour dire où l’on part, voir{" "}
          <Link href="/astuces/a-en-au-aux">à, en, au ou aux ?</Link> : en Italie, au
          Portugal. Les autres moyens de transport sont dans{" "}
          <Link href="/vocabulaire/les-transports">Les transports</Link>.
        </p>

        <WordTable
          rows={LOGER}
          lang="fr"
          caption="Cinq façons de dormir pendant un voyage"
          heads={["Logement", "Ce que c’est", "Exemple"]}
        />

        <div className="attention">
          <span className="fr">louer</span>, c’est payer pour utiliser quelque
          chose quelques jours : <span className="fr">nous avons loué un
          vélo</span>. La <span className="fr">location</span> est le nom de
          cette action : <span className="fr">une location de voiture</span>. Un{" "}
          <span className="fr">car</span> n’est pas une{" "}
          <span className="fr">voiture</span> : c’est un grand bus pour les
          longs voyages, un <span className="fr">autocar</span>. On dit{" "}
          <span className="fr">le car part de la gare à huit heures</span>, et{" "}
          <span className="fr">ma voiture est au parking</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Partir y alojarse</h2>

        <div className="rule">
          La palabra <Fr>vacances</Fr> va siempre en plural: <Fr>en vacances</Fr>,
          nunca{" "}
          <s className="fr" lang="fr">
            en vacance
          </s>
          .
        </div>

        <WordTable
          rows={PARTIR}
          lang="es"
          caption="Siete expresiones para preparar la salida"
          heads={["Expresión", "Lo que quiere decir", "Ejemplo"]}
        />

        <p>
          Para decir adónde vas, mira{" "}
          <Link href="/astuces/a-en-au-aux" lang="fr">
            à, en, au ou aux ?
          </Link>
          : <Fr>en Italie</Fr>, <Fr>au Portugal</Fr>. Los demás medios de
          transporte están en{" "}
          <Link href="/vocabulaire/les-transports" lang="fr">
            Les transports
          </Link>
          .
        </p>

        <WordTable
          rows={LOGER}
          lang="es"
          caption="Cinco maneras de dormir durante un viaje"
          heads={["Alojamiento", "Qué es", "Ejemplo"]}
        />

        <div className="attention">
          <Fr>louer</Fr> es pagar para usar algo unos días: <Fr>nous avons loué
          un vélo</Fr>. La <Fr>location</Fr> es el nombre de esa acción:{" "}
          <Fr>une location de voiture</Fr>. Un <Fr>car</Fr> no es una{" "}
          <Fr>voiture</Fr>: es un autobús grande para viajes largos, un{" "}
          <Fr>autocar</Fr>. Se dice <Fr>le car part de la gare à huit heures</Fr>{" "}
          y <Fr>ma voiture est au parking</Fr>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Sur place</h2>

        <div className="rule">
          On <span className="fr">visite</span> un lieu et on{" "}
          <span className="fr">rend visite à</span> une personne.
        </div>

        <WordTable
          rows={SUR_PLACE}
          lang="fr"
          caption="Sept choses à faire pendant les vacances"
          heads={["Expression", "Ce qu’elle veut dire", "Exemple"]}
        />

        <p>
          On dit <span className="fr">j’ai rendu visite à ma tante</span>, on ne
          dit pas <s className="fr">j’ai visité ma tante</s>.
        </p>

        <WordTable
          rows={LIEUX}
          lang="fr"
          caption="Quatre mots pour parler des lieux"
          heads={["Mot", "Ce que c’est", "Exemple"]}
        />

        <div className="attention">
          <span className="fr">une carte</span> montre un pays ou une région, et
          c’est aussi la liste des plats au restaurant :{" "}
          <span className="fr">la carte de France</span>,{" "}
          <span className="fr">la carte, s’il vous plaît</span>. Pour une ville
          ou le métro, on dit <span className="fr">un plan</span> :{" "}
          <span className="fr">je cherche un plan de la ville</span>. Pour les
          routes, c’est encore <span className="fr">une carte</span> :{" "}
          <span className="fr">une carte routière</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>En el lugar</h2>

        <div className="rule">
          Se <Fr>visite</Fr> un lugar y se <Fr>rend visite à</Fr> una persona.
        </div>

        <WordTable
          rows={SUR_PLACE}
          lang="es"
          caption="Siete cosas que hacer durante las vacaciones"
          heads={["Expresión", "Lo que quiere decir", "Ejemplo"]}
        />

        <p>
          Se dice <Fr>j’ai rendu visite à ma tante</Fr>; no se dice{" "}
          <s className="fr" lang="fr">
            j’ai visité ma tante
          </s>
          .
        </p>

        <WordTable
          rows={LIEUX}
          lang="es"
          caption="Cuatro palabras para hablar de los lugares"
          heads={["Palabra", "Qué es", "Ejemplo"]}
        />

        <div className="attention">
          <Fr>une carte</Fr> muestra un país o una región, y también es la lista
          de platos del restaurante: <Fr>la carte de France</Fr>,{" "}
          <Fr>la carte, s’il vous plaît</Fr>. Para una ciudad o el metro se dice{" "}
          <Fr>un plan</Fr>: <Fr>je cherche un plan de la ville</Fr>. Para las
          carreteras vuelve a ser <Fr>une carte</Fr>: <Fr>une carte routière</Fr>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Raconter : le temps et les impressions</h2>

        <div className="rule">
          Ce qui s’est passé, une fois, est au passé composé :{" "}
          <span className="fr">nous avons visité le musée</span>,{" "}
          <span className="fr">ça m’a plu</span>,{" "}
          <span className="fr">j’ai adoré</span>. Le décor (le temps, le lieu,{" "}
          <span className="fr">c’était magnifique</span>) et ce qu’on faisait
          chaque jour sont à l’imparfait. Le choix est dans{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait">
            Passé composé ou imparfait ?
          </Link>
        </div>

        <WordTable
          rows={TEMPS}
          lang="fr"
          caption="Sept façons de décrire le décor : le temps et le lieu"
          heads={["Expression", "Ce qu’elle veut dire", "Exemple"]}
        />

        <div className="attention">
          Pour le temps, on emploie <span className="fr">faire</span>, pas{" "}
          <span className="fr">être</span> : on dit{" "}
          <span className="fr">il faisait froid</span>, on ne dit pas{" "}
          <s className="fr">il était froid</s>.
        </div>

        <WordTable
          rows={IMPRESSIONS}
          lang="fr"
          caption="Sept mots pour donner ses impressions et finir le voyage"
          heads={["Expression", "Ce qu’elle veut dire", "Exemple"]}
        />

        <p>Voici un petit récit : ce qu’on a fait au passé composé, le décor à l’imparfait.</p>

        <Story />
      </section>

      <section data-ui="es" lang="es">
        <h2>Contar: el tiempo y las impresiones</h2>

        <div className="rule">
          Lo que pasó una vez va en passé composé: <Fr>nous avons visité le
          musée</Fr>, <Fr>ça m’a plu</Fr>, <Fr>j’ai adoré</Fr>. El decorado (el
          tiempo, el lugar, <Fr>c’était magnifique</Fr>) y lo que hacías cada
          día van en imparfait. La elección está en{" "}
          <Link href="/grammaire/passe-compose-ou-imparfait" lang="fr">
            Passé composé ou imparfait ?
          </Link>
        </div>

        <WordTable
          rows={TEMPS}
          lang="es"
          caption="Siete maneras de describir el decorado: el tiempo y el lugar"
          heads={["Expresión", "Lo que quiere decir", "Ejemplo"]}
        />

        <div className="attention">
          Para el tiempo se usa <Fr>faire</Fr>, no <Fr>être</Fr>: se dice{" "}
          <Fr>il faisait froid</Fr>; no se dice{" "}
          <s className="fr" lang="fr">
            il était froid
          </s>
          .
        </div>

        <WordTable
          rows={IMPRESSIONS}
          lang="es"
          caption="Siete palabras para dar tus impresiones y terminar el viaje"
          heads={["Expresión", "Lo que quiere decir", "Ejemplo"]}
        />

        <p>Aquí tienes un pequeño relato: lo que hicimos en passé composé, el decorado en imparfait.</p>

        <Story />
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            <span className="fr">les vacances</span> est toujours au pluriel :{" "}
            <span className="fr">partir en vacances</span>,{" "}
            <span className="fr">être en vacances</span>.
          </li>
          <li>
            On <span className="fr">réserve</span> un billet ou une chambre, et
            on dort à l’hôtel, en chambre d’hôte, en auberge de jeunesse, au
            camping ou chez des amis.
          </li>
          <li>
            <span className="fr">louer</span> et <span className="fr">car</span>{" "}
            ont un sens précis ; <span className="fr">une carte</span> montre un
            pays, <span className="fr">un plan</span> une ville.
          </li>
          <li>
            On <span className="fr">visite</span> un lieu et on{" "}
            <span className="fr">rend visite à</span> une personne.
          </li>
          <li>
            Ce qui s’est passé une fois est au passé composé (<span className="fr">j’ai adoré</span>) ;
            le décor et l’habitude sont à l’imparfait (<span className="fr">il faisait beau</span>,{" "}
            <span className="fr">c’était génial</span>).
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            <Fr>les vacances</Fr> va siempre en plural: <Fr>partir en vacances</Fr>,{" "}
            <Fr>être en vacances</Fr>.
          </li>
          <li>
            Se <Fr>réserve</Fr> un billete o una habitación, y se duerme en un
            hotel, en una habitación de casa particular, en un albergue juvenil,
            en un camping o en casa de amigos.
          </li>
          <li>
            <Fr>louer</Fr> y <Fr>car</Fr> tienen un sentido preciso;{" "}
            <Fr>une carte</Fr> muestra un país, <Fr>un plan</Fr> una ciudad.
          </li>
          <li>
            Se <Fr>visite</Fr> un lugar y se <Fr>rend visite à</Fr> una persona.
          </li>
          <li>
            Lo que pasó una vez va en passé composé (<Fr>j’ai adoré</Fr>); el
            decorado y la costumbre van en imparfait (<Fr>il faisait beau</Fr>,{" "}
            <Fr>c’était génial</Fr>).
          </li>
        </ul>
      </div>
    </article>
  );
}
