import { Quiz } from "./quiz";

/* The A1 body (#85, #92, #102): the whole fable in French with the course's
   own Spanish beside each verse line, and the Spanish words of the table, are
   A1 material: written once, shown in both bodies. The French is the A2
   body's, checked against the Wikisource scan. */

function Fable() {
  return (
    <div className="example">
      <p className="bilingue">
        <span lang="fr">Il faut, autant qu’on peut, obliger tout le monde :</span>
        <span lang="es">Hay que ayudar a todo el mundo, siempre que se pueda:</span>
      </p>
      <p className="bilingue">
        <span lang="fr">On a souvent besoin d’un plus petit que soi.</span>
        <span lang="es">a menudo necesitamos a alguien más pequeño que nosotros.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">De cette vérité deux fables feront foi ;</span>
        <span lang="es">Dos fábulas van a demostrar esta verdad;</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Tant la chose en preuves abonde.</span>
        <span lang="es">hay muchas pruebas de ello.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Entre les pattes d’un lion</span>
        <span lang="es">Entre las patas de un león</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Un rat sortit de terre assez à l’étourdie.</span>
        <span lang="es">salió de la tierra un ratón, bastante despistado.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Le roi des animaux, en cette occasion,</span>
        <span lang="es">El rey de los animales, en esta ocasión,</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Montra ce qu’il était, et lui donna la vie.</span>
        <span lang="es">mostró lo que era, y le perdonó la vida.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Ce bienfait ne fut pas perdu.</span>
        <span lang="es">Esta buena acción no se perdió.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Quelqu’un aurait-il jamais cru</span>
        <span lang="es">¿Quién habría creído nunca</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Qu’un lion d’un rat eût affaire ?</span>
        <span lang="es">que un león llegara a necesitar a un ratón?</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Cependant il advint qu’au sortir des forêts</span>
        <span lang="es">Sin embargo, al salir de los bosques,</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Ce lion fut pris dans des rets,</span>
        <span lang="es">este león cayó en una red,</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Dont ses rugissements ne le purent défaire.</span>
        <span lang="es">y sus rugidos no pudieron librarlo de ella.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Sire rat accourut, et fit tant par ses dents</span>
        <span lang="es">El señor ratón llegó corriendo, y trabajó tanto con los dientes</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Qu’une maille rongée emporta tout l’ouvrage.</span>
        <span lang="es">que una sola malla roída deshizo toda la red.</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Patience et longueur de temps</span>
        <span lang="es">La paciencia y el tiempo</span>
      </p>
      <p className="bilingue">
        <span lang="fr">Font plus que force ni que rage.</span>
        <span lang="es">pueden más que la fuerza y la rabia.</span>
      </p>
    </div>
  );
}

const WORDS = [
  {
    word: "le rat",
    es: (
      <>
        la rata, un animal más grande que{" "}
        <span className="fr" lang="fr">la souris</span> (el ratón). En español
        la fábula se cuenta con un ratón
      </>
    ),
    example: "Le rat sort de terre.",
  },
  {
    word: "obliger",
    es: "en el texto, hacer un favor, ayudar; hoy, sobre todo, obligar a alguien a hacer algo",
    example: "Il faut obliger tout le monde.",
  },
  {
    word: "la patte",
    es: (
      <>
        la pata de un animal; una persona tiene{" "}
        <span className="fr" lang="fr">des jambes</span>
      </>
    ),
    example: "Le chat a quatre pattes.",
  },
  { word: "le roi", es: "el rey", example: "Le lion est le roi des animaux." },
  {
    word: "des rets",
    es: (
      <>
        una red para cazar animales; palabra antigua, hoy se dice{" "}
        <span className="fr" lang="fr">un filet</span>
      </>
    ),
    example: "Le lion est pris dans un filet.",
  },
  {
    word: "la dent",
    es: "el diente; en francés es femenino",
    example: "Le rat a de petites dents.",
  },
  {
    word: "ronger",
    es: "roer, cortar poco a poco con los dientes",
    example: "Le rat ronge le filet.",
  },
  { word: "la force", es: "la fuerza", example: "Le lion a beaucoup de force." },
];

function Words({ lang }: { lang: "fr" | "es" }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les mots dont vous avez besoin pour lire la fable"
            : "Las palabras que necesitas para leer la fábula"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Mot" : "Palabra"}</th>
            <th scope="col">{fr ? "En espagnol" : "En español"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {WORDS.map((w) => (
            <tr key={w.word}>
              <th scope="row" className="fr" lang="fr">
                {w.word}
              </th>
              <td lang="es">{w.es}</td>
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

export function A1() {
  return (
    <>
      <section data-ui="fr">
        <h2>Le texte</h2>

        <p>
          Jean de La Fontaine · <em>Fables</em> · 1668 · livre II, fable 11 ·
          texte complet
        </p>

        <p>
          Il y a deux animaux : un lion, le roi des animaux, et un rat, très
          petit. Les quatre premiers vers donnent la leçon ; ensuite vient
          l’histoire qui la montre. Lisez d’abord le français, et regardez
          l’espagnol seulement si vous ne comprenez pas.
        </p>

        <Fable />

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr">sortit</span>,{" "}
            <span className="fr">montra</span>,{" "}
            <span className="fr">accourut</span> : un temps seulement pour lire.
          </p>
          <p>
            C’est le passé des livres, comme <em lang="es">salió</em>,{" "}
            <em lang="es">mostró</em>, <em lang="es">llegó</em> en espagnol.
            Quand on parle, on dit <span className="fr">il est sorti</span>.
            Vous allez le lire souvent ; vous n’allez pas l’écrire.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El texto</h2>

        <p>
          Jean de La Fontaine · <em lang="fr">Fables</em> · 1668 · libro II,
          fábula 11 · texto completo
        </p>

        <p>
          Hay dos animales: un león, el rey de los animales, y un ratón, muy
          pequeño. Los cuatro primeros versos dan la lección; después viene la
          historia que la demuestra. Lee primero el francés, y mira el español
          solo si te pierdes.
        </p>

        <Fable />

        <div className="astuce">
          <p className="astuce-hook">
            <span className="fr" lang="fr">sortit</span>,{" "}
            <span className="fr" lang="fr">montra</span>,{" "}
            <span className="fr" lang="fr">accourut</span>: un tiempo solo para
            leer.
          </p>
          <p>
            Es el pasado de los libros, como <em>salió</em>, <em>mostró</em>,{" "}
            <em>llegó</em>. Hablando se dice{" "}
            <span className="fr" lang="fr">il est sorti</span>. Lo vas a leer a
            menudo; no lo vas a escribir.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots du texte</h2>

        <Words lang="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>Las palabras del texto</h2>

        <Words lang="es" />
      </section>

      <section data-ui="fr">
        <h2>Avez-vous compris ?</h2>

        <p>
          Répondez sans relire. Ensuite, retournez au texte pour les questions
          que vous avez ratées.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>¿Lo has entendido?</h2>

        <p>
          Contesta sin volver a leer. Después, vuelve al texto para las
          preguntas que has fallado.
        </p>
      </section>

      <Quiz />
    </>
  );
}
