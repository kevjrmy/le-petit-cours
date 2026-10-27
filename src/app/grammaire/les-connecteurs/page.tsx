import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-connecteurs";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   is written once, below, and shared. */

type Lang = "fr" | "es";

type Row = {
  connector: string;
  says: { fr: string; es: string };
  example: string;
};

const ORDER: Row[] = [
  { connector: "d’abord", says: { fr: "la première action", es: "la primera acción" }, example: "D’abord, je prends une douche." },
  { connector: "ensuite", says: { fr: "l’action suivante", es: "la acción siguiente" }, example: "Ensuite, je m’habille." },
  { connector: "puis", says: { fr: "l’action suivante aussi, en plus court", es: "también la acción siguiente, en más corto" }, example: "Je bois un café, puis je sors." },
  { connector: "enfin", says: { fr: "la dernière action", es: "la última acción" }, example: "Enfin, je prends le bus." },
];

const CAUSE: Row[] = [
  { connector: "parce que", says: { fr: "la cause", es: "la causa" }, example: "Je reste à la maison parce qu’il pleut." },
  { connector: "comme", says: { fr: "la cause, au début de la phrase", es: "la causa, al principio de la frase" }, example: "Comme il pleut, je reste à la maison." },
  { connector: "donc", says: { fr: "la conséquence", es: "la consecuencia" }, example: "Il pleut, donc je reste à la maison." },
  { connector: "c’est pour ça que", says: { fr: "la conséquence, surtout à l’oral", es: "la consecuencia, sobre todo al hablar" }, example: "Il pleut. C’est pour ça que je reste à la maison." },
];

const OPPOSE: Row[] = [
  { connector: "mais", says: { fr: "une idée opposée", es: "una idea opuesta" }, example: "Il pleut, mais je sors." },
  { connector: "pourtant", says: { fr: "une surprise : on attendait le contraire", es: "una sorpresa: se esperaba lo contrario" }, example: "Il pleut. Pourtant, je sors sans parapluie." },
  { connector: "par contre", says: { fr: "une différence entre deux choses", es: "una diferencia entre dos cosas" }, example: "Aujourd’hui, il pleut. Par contre, demain, il va faire beau." },
  { connector: "même si", says: { fr: "un obstacle qui ne change rien", es: "un obstáculo que no cambia nada" }, example: "Je sors même s’il pleut." },
];

function ConnectorTable({
  rows,
  caption,
  lang,
}: {
  rows: Row[];
  caption: ReactNode;
  lang: Lang;
}) {
  const es = lang === "es";
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{es ? "Conector" : "Connecteur"}</th>
            <th scope="col">{es ? "Anuncia" : "Il annonce"}</th>
            <th scope="col">{es ? "Ejemplo" : "Exemple"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.connector}>
              <th scope="row" className="fr" lang="fr">
                {row.connector}
              </th>
              <td>{row.says[lang]}</td>
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

function ListStory() {
  return (
    <div className="example" lang="fr">
      Samedi, j’ai visité Tolède. J’ai pris le train de neuf heures. J’ai
      marché dans la vieille ville. J’ai déjeuné sur une petite place. J’ai
      repris le train à sept heures.
    </div>
  );
}

function OrderStory() {
  return (
    <div className="example" lang="fr">
      Samedi, j’ai visité Tolède. <strong>D’abord</strong>, j’ai pris le
      train de neuf heures. <strong>Ensuite</strong>, j’ai marché dans la
      vieille ville, <strong>puis</strong> j’ai déjeuné sur une petite
      place. <strong>Enfin</strong>, j’ai repris le train à sept heures.
    </div>
  );
}

function CauseStory() {
  return (
    <div className="example" lang="fr">
      Samedi, j’ai visité Tolède. D’abord, j’ai pris le train de neuf heures{" "}
      <strong>parce que</strong> je voulais arriver tôt. Ensuite, j’ai
      marché dans la vieille ville, puis j’ai déjeuné sur une petite place.{" "}
      <strong>Comme</strong> il faisait très chaud, j’ai choisi une table à
      l’ombre. L’après-midi, le musée était fermé, <strong>donc</strong>{" "}
      j’ai visité la cathédrale. Le soir, j’avais mal aux pieds.{" "}
      <strong>C’est pour ça que</strong> j’ai pris un taxi jusqu’à la gare.
      Enfin, j’ai repris le train à sept heures.
    </div>
  );
}

function FullStory() {
  return (
    <div className="example" lang="fr">
      Samedi, j’ai visité Tolède. La ville est petite,{" "}
      <strong>mais</strong> il y a beaucoup de choses à voir.{" "}
      <strong>D’abord</strong>, j’ai pris le train de neuf heures{" "}
      <strong>parce que</strong> je voulais arriver tôt.{" "}
      <strong>Ensuite</strong>, j’ai marché dans la vieille ville,{" "}
      <strong>puis</strong> j’ai déjeuné sur une petite place.{" "}
      <strong>Comme</strong> il faisait très chaud, j’ai choisi une table à
      l’ombre. Le repas était simple. <strong>Pourtant</strong>, il était
      cher. L’après-midi, le musée était fermé, <strong>donc</strong> j’ai
      visité la cathédrale. Je n’ai pas aimé le restaurant.{" "}
      <strong>Par contre</strong>, j’ai adoré la cathédrale. Le soir,
      j’avais mal aux pieds. <strong>C’est pour ça que</strong> j’ai pris un
      taxi jusqu’à la gare. <strong>Enfin</strong>, j’ai repris le train à
      sept heures. Je veux retourner à Tolède, <strong>même s’</strong>il
      fait très chaud en été.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Raconter dans l’ordre</h2>

        <div className="rule">
          Un <strong>connecteur</strong> est un petit mot qui relie deux
          phrases. Pour raconter, quatre connecteurs donnent l’ordre des
          actions : <span className="fr">d’abord</span>,{" "}
          <span className="fr">ensuite</span>, <span className="fr">puis</span>
          , <span className="fr">enfin</span>.
        </div>

        <ConnectorTable
          lang="fr"
          rows={ORDER}
          caption="Quatre connecteurs pour dire quelle action vient avant l’autre"
        />

        <p>
          <span className="fr">ensuite</span> et{" "}
          <span className="fr">puis</span> disent la même chose. Mais{" "}
          <span className="fr">puis</span> se place toujours avant l’action,
          jamais à la fin de la phrase : on dit{" "}
          <span className="fr">je sors ensuite</span>, on ne dit pas{" "}
          <s className="fr">je sors puis</s>.
        </p>

        <p>Sans connecteur, un récit est une liste.</p>

        <ListStory />

        <p>Avec les quatre connecteurs, la liste devient une histoire.</p>

        <OrderStory />

        <div className="attention">
          <span className="fr">puis</span> veut dire{" "}
          <span className="fr">ensuite</span>, et rien d’autre. Il ne sert pas
          à commencer une réponse, ni à chercher ses mots. On ne dit pas{" "}
          <s className="fr">Puis, je ne sais pas</s>. On dit{" "}
          <span className="fr">Eh bien, je ne sais pas</span>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Contar en orden</h2>

        <div className="rule">
          Un <strong>conector</strong> es una palabra pequeña que une dos
          frases. Para contar, cuatro conectores dan el orden de las acciones:{" "}
          <span className="fr" lang="fr">d’abord</span>,{" "}
          <span className="fr" lang="fr">ensuite</span>,{" "}
          <span className="fr" lang="fr">puis</span>,{" "}
          <span className="fr" lang="fr">enfin</span>.
        </div>

        <ConnectorTable
          lang="es"
          rows={ORDER}
          caption="Cuatro conectores para decir qué acción va antes que la otra"
        />

        <p>
          <span className="fr" lang="fr">ensuite</span> y{" "}
          <span className="fr" lang="fr">puis</span> dicen lo mismo. Pero{" "}
          <span className="fr" lang="fr">puis</span> va siempre antes de la
          acción, nunca al final de la frase: se dice{" "}
          <span className="fr" lang="fr">je sors ensuite</span>, no se dice{" "}
          <s className="fr" lang="fr">je sors puis</s>.
        </p>

        <p>Sin conectores, un relato es una lista.</p>

        <ListStory />

        <p>Con los cuatro conectores, la lista se convierte en una historia.</p>

        <OrderStory />

        <div className="attention">
          <span className="fr" lang="fr">puis</span> significa{" "}
          <span className="fr" lang="fr">ensuite</span>, y nada más. No sirve
          para empezar una respuesta ni para ganar tiempo buscando palabras. No
          se dice <s className="fr" lang="fr">Puis, je ne sais pas</s>. Se dice{" "}
          <span className="fr" lang="fr">Eh bien, je ne sais pas</span>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Expliquer : la cause et la conséquence</h2>

        <div className="rule">
          Pour expliquer, on relie deux faits : une cause et sa conséquence.{" "}
          <span className="fr">parce que</span> et{" "}
          <span className="fr">comme</span> annoncent la cause.{" "}
          <span className="fr">donc</span> et{" "}
          <span className="fr">c’est pour ça que</span> annoncent la
          conséquence.
        </div>

        <ConnectorTable
          lang="fr"
          rows={CAUSE}
          caption="Les deux mêmes faits, « il pleut » et « je reste à la maison », reliés de quatre façons"
        />

        <p>
          Les quatre phrases racontent la même chose. Seul l’ordre change : avec{" "}
          <span className="fr">parce que</span>, la cause vient en deuxième ;
          avec <span className="fr">comme</span>, elle vient en premier. Devant
          une voyelle, <span className="fr">que</span> devient{" "}
          <span className="fr">qu’</span> :{" "}
          <span className="fr">parce qu’il pleut</span>,{" "}
          <span className="fr">c’est pour ça qu’elle reste</span>.
        </p>

        <p>Le récit de Tolède dit maintenant pourquoi.</p>

        <CauseStory />

        <div className="attention">
          <span className="fr">pourquoi</span> pose la question,{" "}
          <span className="fr">parce que</span> donne la réponse :{" "}
          <span className="fr">Pourquoi tu restes&nbsp;? Parce qu’il pleut.</span> On
          ne dit pas <s className="fr">Je reste pourquoi il pleut</s>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Explicar: la causa y la consecuencia</h2>

        <div className="rule">
          Para explicar, se unen dos hechos: una causa y su consecuencia.{" "}
          <span className="fr" lang="fr">parce que</span> y{" "}
          <span className="fr" lang="fr">comme</span> anuncian la causa.{" "}
          <span className="fr" lang="fr">donc</span> y{" "}
          <span className="fr" lang="fr">c’est pour ça que</span> anuncian la
          consecuencia.
        </div>

        <ConnectorTable
          lang="es"
          rows={CAUSE}
          caption={
            <>
              Los mismos dos hechos, «<span lang="fr">il pleut</span>» y «
              <span lang="fr">je reste à la maison</span>», unidos de cuatro
              maneras
            </>
          }
        />

        <p>
          Las cuatro frases cuentan lo mismo. Solo cambia el orden: con{" "}
          <span className="fr" lang="fr">parce que</span>, la causa va en
          segundo lugar; con <span className="fr" lang="fr">comme</span>, va en
          primero. Delante de una vocal, <span className="fr" lang="fr">que</span>{" "}
          se convierte en <span className="fr" lang="fr">qu’</span>:{" "}
          <span className="fr" lang="fr">parce qu’il pleut</span>,{" "}
          <span className="fr" lang="fr">c’est pour ça qu’elle reste</span>.
        </p>

        <p>El relato de Toledo ahora dice por qué.</p>

        <CauseStory />

        <div className="attention">
          <span className="fr" lang="fr">pourquoi</span> hace la pregunta,{" "}
          <span className="fr" lang="fr">parce que</span> da la respuesta:{" "}
          <span className="fr" lang="fr">Pourquoi tu restes&nbsp;? Parce qu’il pleut.</span>{" "}
          No se dice <s className="fr" lang="fr">Je reste pourquoi il pleut</s>.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Opposer deux idées</h2>

        <div className="rule">
          Pour nuancer, on oppose deux idées. Le connecteur le plus simple est{" "}
          <span className="fr">mais</span>.{" "}
          <span className="fr">pourtant</span>,{" "}
          <span className="fr">par contre</span> et{" "}
          <span className="fr">même si</span> sont plus précis.
        </div>

        <ConnectorTable
          lang="fr"
          rows={OPPOSE}
          caption="Ce que chaque connecteur dit de plus que « mais »"
        />

        <p>
          Devant <span className="fr">il</span> et{" "}
          <span className="fr">ils</span>, <span className="fr">si</span>{" "}
          devient <span className="fr">s’</span> :{" "}
          <span className="fr">même s’il pleut</span>. Devant{" "}
          <span className="fr">elle</span> et <span className="fr">on</span>,
          il ne change pas : <span className="fr">même si elle dort</span>.
        </p>

        <div className="attention">
          <span className="fr">pourtant</span> n’annonce jamais une
          conséquence. Il annonce une surprise. On ne dit pas{" "}
          <s className="fr">Il pleut, pourtant je prends un parapluie</s>. On
          dit <span className="fr">Il pleut, donc je prends un parapluie</span>
          .
        </div>

        <p>
          Voici le récit complet. Les douze connecteurs de la leçon y sont.
        </p>

        <FullStory />
      </section>

      <section data-ui="es" lang="es">
        <h2>Oponer dos ideas</h2>

        <div className="rule">
          Para matizar, se oponen dos ideas. El conector más sencillo es{" "}
          <span className="fr" lang="fr">mais</span>.{" "}
          <span className="fr" lang="fr">pourtant</span>,{" "}
          <span className="fr" lang="fr">par contre</span> y{" "}
          <span className="fr" lang="fr">même si</span> son más precisos.
        </div>

        <ConnectorTable
          lang="es"
          rows={OPPOSE}
          caption={
            <>
              Lo que cada conector dice de más que «<span lang="fr">mais</span>»
            </>
          }
        />

        <p>
          Delante de <span className="fr" lang="fr">il</span> y{" "}
          <span className="fr" lang="fr">ils</span>,{" "}
          <span className="fr" lang="fr">si</span> se convierte en{" "}
          <span className="fr" lang="fr">s’</span>:{" "}
          <span className="fr" lang="fr">même s’il pleut</span>. Delante de{" "}
          <span className="fr" lang="fr">elle</span> y{" "}
          <span className="fr" lang="fr">on</span> no cambia:{" "}
          <span className="fr" lang="fr">même si elle dort</span>.
        </p>

        <div className="attention">
          <span className="fr" lang="fr">pourtant</span> nunca anuncia una
          consecuencia. Anuncia una sorpresa. No se dice{" "}
          <s className="fr" lang="fr">Il pleut, pourtant je prends un parapluie</s>.
          Se dice{" "}
          <span className="fr" lang="fr">Il pleut, donc je prends un parapluie</span>.
        </div>

        <p>
          Aquí está el relato completo. Los doce conectores de la lección están
          en él.
        </p>

        <FullStory />
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Pour raconter dans l’ordre : <span className="fr">d’abord</span>,{" "}
            <span className="fr">ensuite</span>,{" "}
            <span className="fr">puis</span>, <span className="fr">enfin</span>
            .
          </li>
          <li>
            Pour donner la cause : <span className="fr">parce que</span>,{" "}
            <span className="fr">comme</span>. Pour donner la conséquence :{" "}
            <span className="fr">donc</span>,{" "}
            <span className="fr">c’est pour ça que</span>.
          </li>
          <li>
            Pour opposer deux idées : <span className="fr">mais</span>,{" "}
            <span className="fr">pourtant</span>,{" "}
            <span className="fr">par contre</span>,{" "}
            <span className="fr">même si</span>.
          </li>
          <li>
            <span className="fr">puis</span> veut dire{" "}
            <span className="fr">ensuite</span>, et{" "}
            <span className="fr">pourquoi</span> pose la question :{" "}
            <span className="fr">parce que</span> donne la réponse.
          </li>
          <li>
            <span className="fr">pourtant</span> marque une surprise, jamais
            une conséquence.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Para contar en orden: <span className="fr" lang="fr">d’abord</span>,{" "}
            <span className="fr" lang="fr">ensuite</span>,{" "}
            <span className="fr" lang="fr">puis</span>,{" "}
            <span className="fr" lang="fr">enfin</span>.
          </li>
          <li>
            Para dar la causa: <span className="fr" lang="fr">parce que</span>,{" "}
            <span className="fr" lang="fr">comme</span>. Para dar la
            consecuencia: <span className="fr" lang="fr">donc</span>,{" "}
            <span className="fr" lang="fr">c’est pour ça que</span>.
          </li>
          <li>
            Para oponer dos ideas: <span className="fr" lang="fr">mais</span>,{" "}
            <span className="fr" lang="fr">pourtant</span>,{" "}
            <span className="fr" lang="fr">par contre</span>,{" "}
            <span className="fr" lang="fr">même si</span>.
          </li>
          <li>
            <span className="fr" lang="fr">puis</span> significa{" "}
            <span className="fr" lang="fr">ensuite</span>, y{" "}
            <span className="fr" lang="fr">pourquoi</span> hace la pregunta:{" "}
            <span className="fr" lang="fr">parce que</span> da la respuesta.
          </li>
          <li>
            <span className="fr" lang="fr">pourtant</span> marca una sorpresa,
            nunca una consecuencia.
          </li>
        </ul>
      </div>
    </article>
  );
}
