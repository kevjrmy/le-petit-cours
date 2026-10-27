import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/l-heure";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

const MINUTES = [
  ["8 h 05", "huit heures cinq"],
  ["8 h 15", "huit heures et quart"],
  ["8 h 30", "huit heures et demie"],
  ["8 h 45", "neuf heures moins le quart"],
];

const OFFICIAL = [
  ["13 h 30", "treize heures trente", "une heure et demie"],
  ["18 h 15", "dix-huit heures quinze", "six heures et quart"],
  ["21 h 45", "vingt et une heures quarante-cinq", "dix heures moins le quart"],
];

const MOMENTS = [
  ["le matin", "Je travaille le matin."],
  ["l’après-midi", "On se voit cet après-midi ?"],
  ["le soir", "Le soir, je lis."],
  ["la nuit", "Il a plu toute la nuit."],
];

function Fr({ children }: { children: React.ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

function Hours() {
  return (
    <div className="example" lang="fr">
      Il est une heure. · Il est trois heures. · Il est midi. · Il est minuit.
    </div>
  );
}

function Wrong() {
  return (
    <>
      <s className="fr" lang="fr">
        il est trois
      </s>{" "}
      ni{" "}
      <s className="fr" lang="fr">
        il est une heures
      </s>
    </>
  );
}

function MinutesTable({ caption, heads }: { caption: string; heads: string[] }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{heads[0]}</th>
            <th scope="col">{heads[1]}</th>
          </tr>
        </thead>
        <tbody>
          {MINUTES.map(([written, said]) => (
            <tr key={written}>
              <th scope="row">{written}</th>
              <td className="fr" lang="fr">
                {said}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Minus() {
  return (
    <div className="example" lang="fr">
      10 h 40 → onze heures moins vingt · 17 h 50 → six heures moins dix
    </div>
  );
}

function OfficialTable({ caption, heads }: { caption: string; heads: string[] }) {
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
          {OFFICIAL.map(([written, official, usual]) => (
            <tr key={written}>
              <th scope="row">{written}</th>
              <td className="fr" lang="fr">
                {official}
              </td>
              <td className="fr" lang="fr">
                {usual}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MomentsTable({ caption, heads }: { caption: string; heads: string[] }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{heads[0]}</th>
            <th scope="col">{heads[1]}</th>
          </tr>
        </thead>
        <tbody>
          {MOMENTS.map(([moment, example]) => (
            <tr key={moment}>
              <th scope="row" className="fr" lang="fr">
                {moment}
              </th>
              <td className="fr" lang="fr">
                {example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Parts() {
  return (
    <div className="example" lang="fr">
      Il est sept heures du matin. · Rendez-vous à huit heures du soir.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Quelle heure est-il ?</h2>

        <div className="rule">
          On répond avec <span className="fr">il est</span>, puis le nombre,
          puis le mot <span className="fr">heure</span> ou{" "}
          <span className="fr">heures</span> — qui ne se supprime jamais.
        </div>

        <Hours />

        <div className="attention">
          <span className="fr">heure</span> est un nom, et il s’accorde : une{" "}
          <strong>heure</strong>, deux <strong>heures</strong>. On ne dit ni{" "}
          <s className="fr">il est trois</s>, ni{" "}
          <s className="fr">il est une heures</s>.
        </div>

        <h3>Les minutes</h3>

        <MinutesTable
          caption="Dire les minutes après et avant l’heure"
          heads={["Heure", "On dit"]}
        />

        <div className="rule">
          Après la demie, on annonce <strong>l’heure suivante</strong> et on
          retire les minutes qui manquent, avec{" "}
          <span className="fr">moins</span>.
        </div>

        <Minus />

        <div className="exception">
          <span className="fr">midi</span> et{" "}
          <span className="fr">minuit</span> sont masculins, donc la demie perd
          son <span className="fr">-e</span> :{" "}
          <span className="fr">midi et demi</span>,{" "}
          <span className="fr">minuit et demi</span> — mais{" "}
          <span className="fr">une heure et demie</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Preguntar la hora: <Fr>Quelle heure est-il ?</Fr>
        </h2>

        <div className="rule">
          Se responde con <Fr>il est</Fr>, luego el número y luego la palabra{" "}
          <Fr>heure</Fr> o <Fr>heures</Fr>, que nunca se omite.
        </div>

        <Hours />

        <div className="attention">
          <Fr>heure</Fr> es un sustantivo y concuerda: <Fr>une heure</Fr>, <Fr>deux heures</Fr>. No se
          dice <Wrong />.
        </div>

        <h3>Los minutos</h3>

        <MinutesTable
          caption="Decir los minutos después y antes de la hora"
          heads={["Hora", "Se dice"]}
        />

        <div className="rule">
          Pasada la media, se anuncia <strong>la hora siguiente</strong> y se
          restan los minutos que faltan, con <Fr>moins</Fr>.
        </div>

        <Minus />

        <div className="exception">
          <Fr>midi</Fr> y <Fr>minuit</Fr> son masculinos, así que{" "}
          <Fr>demie</Fr> pierde su <Fr>-e</Fr>: <Fr>midi et demi</Fr>,{" "}
          <Fr>minuit et demi</Fr>, pero <Fr>une heure et demie</Fr>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>L’heure officielle</h2>

        <p>
          Les horaires écrits — trains, cinémas, rendez-vous, magasins —
          utilisent les vingt-quatre heures, avec les minutes dites en entier.
          C’est la forme qu’on lit ; celle de la section précédente est celle
          qu’on parle.
        </p>

        <OfficialTable
          caption="La même heure, à l’écrit et à l’oral"
          heads={["Écrit", "Officiel", "Courant"]}
        />

        <div className="attention">
          On écrit <span className="fr">14 h 30</span> avec un{" "}
          <span className="fr">h</span> minuscule et des espaces, jamais avec
          deux points. Et l’heure officielle ne prend ni{" "}
          <span className="fr">et quart</span> ni{" "}
          <span className="fr">moins le quart</span> : ces expressions
          appartiennent à l’oral.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>La hora oficial</h2>

        <p>
          Los horarios escritos (trenes, cines, citas, tiendas) usan las
          veinticuatro horas, y los minutos se dicen enteros. Es la forma que se
          lee; la de la sección anterior es la que se habla.
        </p>

        <OfficialTable
          caption="La misma hora, por escrito y de palabra"
          heads={["Escrito", "Oficial", "Corriente"]}
        />

        <div className="attention">
          Se escribe <Fr>14 h 30</Fr> con una <Fr>h</Fr> minúscula y espacios,
          nunca con dos puntos. Y la hora oficial no admite <Fr>et quart</Fr> ni{" "}
          <Fr>moins le quart</Fr>: esas expresiones son de la lengua hablada.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Situer un moment dans la journée</h2>

        <MomentsTable
          caption="Les moments de la journée et leur usage"
          heads={["Moment", "Exemple"]}
        />

        <div className="rule">
          Pour préciser une heure du matin ou du soir, on ajoute{" "}
          <span className="fr">du matin</span>,{" "}
          <span className="fr">de l’après-midi</span> ou{" "}
          <span className="fr">du soir</span> après l’heure.
        </div>

        <Parts />

        <div className="astuce">
          <p className="astuce-hook">
            « À quelle heure ? » demande la préposition « à »
          </p>
          <p>
            <span className="fr">Quelle heure est-il ?</span> demande l’heure
            qu’il est ; <span className="fr">À quelle heure ?</span> demande le
            moment d’un rendez-vous, et la réponse garde le{" "}
            <span className="fr">à</span> :{" "}
            <span className="fr">À neuf heures.</span> Oublier ce{" "}
            <span className="fr">à</span> est l’erreur la plus fréquente en
            fixant un rendez-vous.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Situar un momento del día</h2>

        <MomentsTable
          caption="Los momentos del día y su uso"
          heads={["Momento", "Ejemplo"]}
        />

        <div className="rule">
          Para precisar una hora de la mañana o de la tarde, se añade{" "}
          <Fr>du matin</Fr>, <Fr>de l’après-midi</Fr> o <Fr>du soir</Fr> después
          de la hora.
        </div>

        <Parts />

        <div className="astuce">
          <p className="astuce-hook">
            «À quelle heure ?» lleva siempre «à»
          </p>
          <p>
            <Fr>Quelle heure est-il ?</Fr> pregunta la hora que es;{" "}
            <Fr>À quelle heure ?</Fr> pregunta el momento de una cita, y la
            respuesta conserva el <Fr>à</Fr>: <Fr>À neuf heures.</Fr> Olvidar
            ese <Fr>à</Fr> es el error más frecuente al fijar una cita.
          </p>
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            On répond avec <span className="fr">il est</span>, le nombre, puis{" "}
            <span className="fr">heure</span> ou{" "}
            <span className="fr">heures</span>, qui ne disparaît jamais.
          </li>
          <li>
            Après la demie, on annonce l’heure suivante et on retire les minutes
            avec <span className="fr">moins</span> :{" "}
            <span className="fr">onze heures moins vingt</span>.
          </li>
          <li>
            <span className="fr">midi</span> et{" "}
            <span className="fr">minuit</span> sont masculins :{" "}
            <span className="fr">midi et demi</span>, mais{" "}
            <span className="fr">une heure et demie</span>.
          </li>
          <li>
            L’heure officielle utilise les vingt-quatre heures et dit les
            minutes en entier. Elle s’écrit{" "}
            <span className="fr">14 h 30</span>, sans{" "}
            <span className="fr">et quart</span> ni{" "}
            <span className="fr">moins le quart</span>.
          </li>
          <li>
            Pour situer un moment, on ajoute{" "}
            <span className="fr">du matin</span>,{" "}
            <span className="fr">de l’après-midi</span> ou{" "}
            <span className="fr">du soir</span> après l’heure.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Se responde con <Fr>il est</Fr>, el número y luego <Fr>heure</Fr> o{" "}
            <Fr>heures</Fr>, que nunca desaparece.
          </li>
          <li>
            Pasada la media, se anuncia la hora siguiente y se restan los
            minutos con <Fr>moins</Fr>: <Fr>onze heures moins vingt</Fr>.
          </li>
          <li>
            <Fr>midi</Fr> y <Fr>minuit</Fr> son masculinos: <Fr>midi et demi</Fr>
            , pero <Fr>une heure et demie</Fr>.
          </li>
          <li>
            La hora oficial usa las veinticuatro horas y dice los minutos
            enteros. Se escribe <Fr>14 h 30</Fr>, sin <Fr>et quart</Fr> ni{" "}
            <Fr>moins le quart</Fr>.
          </li>
          <li>
            Para situar un momento, se añade <Fr>du matin</Fr>,{" "}
            <Fr>de l’après-midi</Fr> o <Fr>du soir</Fr> después de la hora.
          </li>
        </ul>
      </div>
    </article>
  );
}
