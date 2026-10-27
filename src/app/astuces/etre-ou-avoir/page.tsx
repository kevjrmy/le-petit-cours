import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/etre-ou-avoir";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish (#102). The French taught is written once. */

const PAIRS = [
  { verb: "aller", opposite: "venir", example: "Je suis allé au marché, puis il est venu." },
  { verb: "entrer", opposite: "sortir", example: "Elle est entrée à huit heures." },
  { verb: "monter", opposite: "descendre", example: "Nous sommes montés au dernier étage." },
  { verb: "arriver", opposite: "partir", example: "Le train est arrivé en retard." },
  { verb: "naître", opposite: "mourir", example: "Elle est née à Lyon." },
];

const ALONE = [
  { verb: "rester", example: "Je suis resté à la maison." },
  { verb: "tomber", example: "Elle est tombée dans l’escalier." },
  { verb: "passer", example: "Nous sommes passés par Lyon." },
  { verb: "retourner", example: "Ils sont retournés en France." },
];

type Lang = "fr" | "es";

function Pairs({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les cinq paires de contraires, à retenir ensemble"
            : "Los cinco pares de contrarios, para recordar juntos"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Verbe" : "Verbo"}</th>
            <th scope="col">{fr ? "Son contraire" : "Su contrario"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {PAIRS.map((p) => (
            <tr key={p.verb}>
              <th scope="row" className="fr" lang="fr">
                {p.verb}
              </th>
              <td className="fr" lang="fr">
                {p.opposite}
              </td>
              <td className="fr" lang="fr">
                {p.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Alone({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Les quatre qui n’ont pas de contraire dans la liste"
            : "Los cuatro que no tienen contrario en la lista"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "Verbe" : "Verbo"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {ALONE.map((a) => (
            <tr key={a.verb}>
              <th scope="row" className="fr" lang="fr">
                {a.verb}
              </th>
              <td className="fr" lang="fr">
                {a.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pronominal() {
  return (
    <div className="example" lang="fr">
      Je me <strong>suis</strong> levé tôt. · Elle s’<strong>est</strong> lavée.
      · Nous nous <strong>sommes</strong> promenés.
    </div>
  );
}

function Agreement() {
  return (
    <div className="example" lang="fr">
      il est allé · elle est allé<strong>e</strong> · ils sont allé
      <strong>s</strong> · elles sont allé<strong>es</strong>
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Renversez la question</h2>

        <div className="astuce">
          <p className="astuce-hook">
            N’apprenez pas la liste d’<strong>avoir</strong> : elle n’a pas de
            fin. Apprenez la petite liste de <strong>être</strong>.
          </p>
          <p>
            La quasi-totalité des verbes français forment leur passé composé
            avec <span className="fr">avoir</span>. Seuls{" "}
            <strong>quatorze</strong> prennent{" "}
            <span className="fr">être</span>, plus tous les verbes
            pronominaux. Si le verbe n’est pas dans cette courte liste, la
            réponse est <span className="fr">avoir</span>, sans hésiter.
          </p>
        </div>

        <div className="attention">
          La question ne se pose qu’aux temps composés, et elle se pose{" "}
          <strong>avant</strong> d’écrire le participe. Choisir l’auxiliaire,
          c’est déjà décider si le participe va s’accorder ou non.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Da la vuelta a la pregunta</h2>

        <div className="astuce">
          <p className="astuce-hook">
            No aprendas la lista de <strong>avoir</strong>: no tiene fin.
            Aprende la lista corta de <strong>être</strong>.
          </p>
          <p>
            Casi todos los verbos franceses forman el{" "}
            <span className="fr" lang="fr">passé composé</span> con <span className="fr" lang="fr">avoir</span>. Solo{" "}
            <strong>catorce</strong> llevan{" "}
            <span className="fr" lang="fr">être</span>, además de todos los
            verbos pronominales. Si el verbo no está en esa lista corta, la
            respuesta es <span className="fr" lang="fr">avoir</span>, sin dudar.
          </p>
        </div>

        <div className="attention">
          La pregunta solo se plantea en los tiempos compuestos, y se plantea{" "}
          <strong>antes</strong> de escribir el participio. Elegir el auxiliar
          es decidir ya si el participio va a concordar o no.
        </div>
      </section>

      <section data-ui="fr">
        <h2>La liste tient par paires</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Les verbes d’<strong>être</strong> vont deux par deux, chacun avec
            son contraire.
          </p>
          <p>
            Retenir un couple coûte à peine plus qu’un verbe seul, et vous en
            gagnez deux. Ce sont tous des verbes de mouvement ou de changement
            d’état. Cinq paires en couvrent dix ; les quatre derniers n’ont pas
            de contraire et s’apprennent seuls.
          </p>
        </div>

        <Pairs lang="fr" />
        <Alone lang="fr" />

        <div className="astuce">
          <p className="astuce-hook">
            Un <strong>se</strong> devant le verbe ? C’est{" "}
            <strong>être</strong>, toujours.
          </p>
          <p>
            Aucune exception, aucune liste à apprendre :{" "}
            <span className="fr">se laver</span>,{" "}
            <span className="fr">se lever</span>,{" "}
            <span className="fr">se souvenir</span> prennent{" "}
            <span className="fr">être</span> parce qu’ils sont pronominaux, et
            il suffit de voir le pronom.
          </p>
        </div>

        <Pronominal />

        <div className="attention">
          Les verbes construits sur ceux de la liste la suivent :{" "}
          <span className="fr">devenir</span>,{" "}
          <span className="fr">revenir</span>,{" "}
          <span className="fr">rentrer</span>,{" "}
          <span className="fr">repartir</span> prennent{" "}
          <span className="fr">être</span> comme{" "}
          <span className="fr">venir</span>,{" "}
          <span className="fr">entrer</span> et{" "}
          <span className="fr">partir</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>La lista va por parejas</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Los verbos de <strong>être</strong> van de dos en dos, cada uno con
            su contrario.
          </p>
          <p>
            Recordar una pareja cuesta apenas más que un verbo solo, y ganas
            dos. Todos son verbos de movimiento o de cambio de estado. Cinco
            parejas cubren diez; los cuatro últimos no tienen contrario y se
            aprenden por separado.
          </p>
        </div>

        <Pairs lang="es" />
        <Alone lang="es" />

        <div className="astuce">
          <p className="astuce-hook">
            ¿Hay un <strong>se</strong> delante del verbo? Es{" "}
            <strong>être</strong>, siempre.
          </p>
          <p>
            Sin excepciones y sin lista que aprender:{" "}
            <span className="fr" lang="fr">se laver</span>,{" "}
            <span className="fr" lang="fr">se lever</span>,{" "}
            <span className="fr" lang="fr">se souvenir</span> llevan{" "}
            <span className="fr" lang="fr">être</span> porque son
            pronominales, y basta con ver el pronombre.
          </p>
        </div>

        <Pronominal />

        <div className="attention">
          Los verbos formados sobre los de la lista la siguen:{" "}
          <span className="fr" lang="fr">devenir</span>,{" "}
          <span className="fr" lang="fr">revenir</span>,{" "}
          <span className="fr" lang="fr">rentrer</span>,{" "}
          <span className="fr" lang="fr">repartir</span> llevan{" "}
          <span className="fr" lang="fr">être</span> como{" "}
          <span className="fr" lang="fr">venir</span>,{" "}
          <span className="fr" lang="fr">entrer</span> y{" "}
          <span className="fr" lang="fr">partir</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Le prix de la petite liste</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Avec <strong>être</strong>, le participe s’accorde avec le sujet,
            comme un adjectif.
          </p>
          <p>
            Avec <span className="fr">avoir</span>, il ne bouge pas :{" "}
            <span className="fr">elle a mangé</span>, jamais{" "}
            <s className="fr">elle a mangée</s>. C’est la contrepartie de
            la petite liste, et c’est à cela que la liste sert vraiment.
          </p>
        </div>

        <Agreement />

        <div className="exception">
          <strong>Quatre verbes jouent double jeu.</strong>{" "}
          <span className="fr">monter</span>,{" "}
          <span className="fr">descendre</span>,{" "}
          <span className="fr">sortir</span> et{" "}
          <span className="fr">passer</span> prennent{" "}
          <span className="fr">avoir</span> quand un complément d’objet les
          suit : <span className="fr">je suis sorti</span> mais{" "}
          <span className="fr">j’ai sorti la poubelle</span>,{" "}
          <span className="fr">elle est montée</span> mais{" "}
          <span className="fr">elle a monté les valises</span>. Le sens change
          avec l’auxiliaire.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>El precio de la lista corta</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Con <strong>être</strong>, el participio concuerda con el sujeto,
            como un adjetivo.
          </p>
          <p>
            Con <span className="fr" lang="fr">avoir</span> no cambia:{" "}
            <span className="fr" lang="fr">elle a mangé</span>, nunca{" "}
            <s className="fr" lang="fr">elle a mangée</s>. Es la contrapartida
            de la lista corta, y para eso sirve de verdad la lista.
          </p>
        </div>

        <Agreement />

        <div className="exception">
          <strong>Cuatro verbos juegan a dos bandas.</strong>{" "}
          <span className="fr" lang="fr">monter</span>,{" "}
          <span className="fr" lang="fr">descendre</span>,{" "}
          <span className="fr" lang="fr">sortir</span> y{" "}
          <span className="fr" lang="fr">passer</span> llevan{" "}
          <span className="fr" lang="fr">avoir</span> cuando les sigue un
          complemento directo:{" "}
          <span className="fr" lang="fr">je suis sorti</span> pero{" "}
          <span className="fr" lang="fr">j’ai sorti la poubelle</span>,{" "}
          <span className="fr" lang="fr">elle est montée</span> pero{" "}
          <span className="fr" lang="fr">elle a monté les valises</span>. El
          sentido cambia con el auxiliar.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Apprenez la liste de <span className="fr">être</span> : tout ce qui
            n’y est pas prend <span className="fr">avoir</span>.
          </li>
          <li>
            Cinq paires de contraires couvrent dix verbes ;{" "}
            <span className="fr">rester</span>,{" "}
            <span className="fr">tomber</span>,{" "}
            <span className="fr">passer</span> et{" "}
            <span className="fr">retourner</span> s’apprennent seuls.
          </li>
          <li>
            Tout verbe pronominal prend{" "}
            <span className="fr">être</span>, sans exception.
          </li>
          <li>
            Avec <span className="fr">être</span>, le participe s’accorde avec
            le sujet ; avec <span className="fr">avoir</span>, il ne bouge pas.
          </li>
          <li>
            <span className="fr">monter</span>,{" "}
            <span className="fr">descendre</span>,{" "}
            <span className="fr">sortir</span> et{" "}
            <span className="fr">passer</span> passent à{" "}
            <span className="fr">avoir</span> dès qu’un complément les suit.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Aprende la lista de <span className="fr" lang="fr">être</span>: todo
            lo que no está en ella lleva{" "}
            <span className="fr" lang="fr">avoir</span>.
          </li>
          <li>
            Cinco parejas de contrarios cubren diez verbos;{" "}
            <span className="fr" lang="fr">rester</span>,{" "}
            <span className="fr" lang="fr">tomber</span>,{" "}
            <span className="fr" lang="fr">passer</span> y{" "}
            <span className="fr" lang="fr">retourner</span> se aprenden por
            separado.
          </li>
          <li>
            Todo verbo pronominal lleva{" "}
            <span className="fr" lang="fr">être</span>, sin excepción.
          </li>
          <li>
            Con <span className="fr" lang="fr">être</span>, el participio
            concuerda con el sujeto; con{" "}
            <span className="fr" lang="fr">avoir</span>, no cambia.
          </li>
          <li>
            <span className="fr" lang="fr">monter</span>,{" "}
            <span className="fr" lang="fr">descendre</span>,{" "}
            <span className="fr" lang="fr">sortir</span> y{" "}
            <span className="fr" lang="fr">passer</span> pasan a{" "}
            <span className="fr" lang="fr">avoir</span> en cuanto les sigue un
            complemento.
          </li>
        </ul>
      </div>
    </article>
  );
}
