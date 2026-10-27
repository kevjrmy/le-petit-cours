import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/astuces/a-en-au-aux";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish (#102). The French taught is written once. */

type Lang = "fr" | "es";

function Cities() {
  return (
    <div className="example" lang="fr">
      J’habite <strong>à</strong> Séville. · Je vais <strong>à</strong> Lyon. ·
      Elle travaille <strong>à</strong> Bruxelles.
    </div>
  );
}

function Countries() {
  return (
    <div className="example" lang="fr">
      <strong>en</strong> Espagne · <strong>en</strong> Italie ·{" "}
      <strong>en</strong> Belgique · <strong>en</strong> Chine
      <br />
      <strong>au</strong> Portugal · <strong>au</strong> Maroc ·{" "}
      <strong>au</strong> Canada · <strong>au</strong> Brésil
      <br />
      <strong>aux</strong> États-Unis · <strong>aux</strong> Philippines
    </div>
  );
}

function Table({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  const ending = (text: string) => (
    <span className="fr" lang="fr">
      {text}
    </span>
  );
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {fr
            ? "Ce que la fin du nom de pays dit de la préposition à employer"
            : "Lo que el final del nombre del país dice sobre la preposición que hay que usar"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{fr ? "La fin du mot" : "El final de la palabra"}</th>
            <th scope="col">{fr ? "Préposition" : "Preposición"}</th>
            <th scope="col">{fr ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              {fr ? "finit par " : "termina en "}
              {ending("-e")}
            </th>
            <td className="fr" lang="fr">en</td>
            <td className="fr" lang="fr">Je vais en France.</td>
          </tr>
          <tr>
            <th scope="row">{fr ? "finit par une autre lettre" : "termina en otra letra"}</th>
            <td className="fr" lang="fr">au</td>
            <td className="fr" lang="fr">Je vais au Japon.</td>
          </tr>
          <tr>
            <th scope="row">{fr ? "nom au pluriel" : "nombre en plural"}</th>
            <td className="fr" lang="fr">aux</td>
            <td className="fr" lang="fr">Je vais aux Pays-Bas.</td>
          </tr>
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
        <h2>Une ville : toujours « à »</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Devant un nom de ville, c’est <strong>à</strong>. Sans exception à
            décider, sans genre à connaître.
          </p>
          <p>
            Les villes n’ont pas de genre en français, donc il n’y a rien à
            choisir. La même préposition sert pour dire où l’on est et où l’on
            va.
          </p>
        </div>

        <Cities />

        <div className="exception">
          Quelques villes portent un article dans leur nom, et cet article
          change la préposition : <span className="fr">Le Havre</span> donne{" "}
          <span className="fr">au Havre</span>,{" "}
          <span className="fr">La Haye</span> donne{" "}
          <span className="fr">à La Haye</span>,{" "}
          <span className="fr">Le Caire</span> donne{" "}
          <span className="fr">au Caire</span>. Elles sont rares : apprenez-les
          au cas par cas plutôt que d’en faire une règle.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Una ciudad: siempre «à»</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Delante del nombre de una ciudad, es <strong>à</strong>. Sin
            excepción que decidir y sin género que conocer.
          </p>
          <p>
            Las ciudades no tienen género en francés, así que no hay nada que
            elegir. La misma preposición sirve para decir dónde estás y adónde
            vas.
          </p>
        </div>

        <Cities />

        <div className="exception">
          Algunas ciudades llevan un artículo en el nombre, y ese artículo
          cambia la preposición:{" "}
          <span className="fr" lang="fr">Le Havre</span> da{" "}
          <span className="fr" lang="fr">au Havre</span>,{" "}
          <span className="fr" lang="fr">La Haye</span> da{" "}
          <span className="fr" lang="fr">à La Haye</span>,{" "}
          <span className="fr" lang="fr">Le Caire</span> da{" "}
          <span className="fr" lang="fr">au Caire</span>. Son pocas: apréndelas
          caso por caso en vez de hacer una regla.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Un pays : regardez la dernière lettre</h2>

        <div className="astuce">
          <p className="astuce-hook">
            Le pays finit par <strong>-e</strong> ? C’est{" "}
            <strong>en</strong>. Sinon, <strong>au</strong>. Nom pluriel,{" "}
            <strong>aux</strong>.
          </p>
          <p>
            La terminaison <span className="fr">-e</span> signale presque
            toujours un pays féminin, et le féminin appelle{" "}
            <span className="fr">en</span>. Il n’y a donc qu’une chose à faire :
            regarder la fin du mot.
          </p>
        </div>

        <Table lang="fr" />

        <Countries />

        <div className="attention">
          Pour dire d’où l’on vient, le même raisonnement sert avec{" "}
          <span className="fr">de</span> :{" "}
          <span className="fr">je viens de France</span>,{" "}
          <span className="fr">je viens du Japon</span>,{" "}
          <span className="fr">je viens des Pays-Bas</span>. Le féminin ne
          prend pas d’article, le masculin et le pluriel en prennent un.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Un país: mira la última letra</h2>

        <div className="astuce">
          <p className="astuce-hook">
            ¿El país termina en <strong>-e</strong>? Es <strong>en</strong>. Si
            no, <strong>au</strong>. Nombre en plural, <strong>aux</strong>.
          </p>
          <p>
            La terminación <span className="fr" lang="fr">-e</span> señala casi
            siempre un país femenino, y el femenino pide{" "}
            <span className="fr" lang="fr">en</span>. Solo hay que hacer una
            cosa: mirar el final de la palabra.
          </p>
        </div>

        <Table lang="es" />

        <Countries />

        <div className="attention">
          Para decir de dónde vienes, el mismo razonamiento sirve con{" "}
          <span className="fr" lang="fr">de</span>:{" "}
          <span className="fr" lang="fr">je viens de France</span>,{" "}
          <span className="fr" lang="fr">je viens du Japon</span>,{" "}
          <span className="fr" lang="fr">je viens des Pays-Bas</span>. El
          femenino no lleva artículo; el masculino y el plural, sí.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les trois cas où l’astuce se trompe</h2>

        <p>
          Un raccourci qui tait ses exceptions fait apprendre des fautes. Voici
          les seules que vous rencontrerez vraiment.
        </p>

        <div className="exception">
          <strong>Des pays en -e qui sont masculins.</strong> Ils prennent{" "}
          <span className="fr">au</span> malgré leur terminaison :{" "}
          <span className="fr">au Mexique</span>,{" "}
          <span className="fr">au Cambodge</span>,{" "}
          <span className="fr">au Mozambique</span>,{" "}
          <span className="fr">au Zimbabwe</span>. Le Mexique est de loin le
          plus utile à retenir.
        </div>

        <div className="exception">
          <strong>Les pays qui commencent par une voyelle.</strong> Même
          masculins, ils prennent <span className="fr">en</span>, parce que deux
          voyelles se heurteraient :{" "}
          <span className="fr">en Iran</span>,{" "}
          <span className="fr">en Irak</span>,{" "}
          <span className="fr">en Israël</span>,{" "}
          <span className="fr">en Angola</span>.
        </div>

        <div className="exception">
          <strong>Les îles.</strong> Elles suivent leur propre usage :{" "}
          <span className="fr">à Cuba</span>,{" "}
          <span className="fr">à Madagascar</span>,{" "}
          <span className="fr">en Corse</span>,{" "}
          <span className="fr">aux Canaries</span>. Traitez-les comme du
          vocabulaire, pas comme une règle.
        </div>

        <div className="attention">
          Cette page est un raccourci, pas une leçon. Elle ne dit rien de{" "}
          <span className="fr">chez</span>, ni des prépositions de lieu à
          l’intérieur d’une ville. Elle sert à décider vite entre quatre mots,
          et à savoir quand ne pas lui faire confiance.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>Los tres casos en que el truco falla</h2>

        <p>
          Un atajo que calla sus excepciones hace aprender errores. Estas son
          las únicas que te encontrarás de verdad.
        </p>

        <div className="exception">
          <strong>Países en -e que son masculinos.</strong> Llevan{" "}
          <span className="fr" lang="fr">au</span> a pesar de su terminación:{" "}
          <span className="fr" lang="fr">au Mexique</span>,{" "}
          <span className="fr" lang="fr">au Cambodge</span>,{" "}
          <span className="fr" lang="fr">au Mozambique</span>,{" "}
          <span className="fr" lang="fr">au Zimbabwe</span>. México es, con
          diferencia, el más útil de recordar.
        </div>

        <div className="exception">
          <strong>Países que empiezan por vocal.</strong> Aunque sean
          masculinos, llevan <span className="fr" lang="fr">en</span>, porque
          dos vocales chocarían:{" "}
          <span className="fr" lang="fr">en Iran</span>,{" "}
          <span className="fr" lang="fr">en Irak</span>,{" "}
          <span className="fr" lang="fr">en Israël</span>,{" "}
          <span className="fr" lang="fr">en Angola</span>.
        </div>

        <div className="exception">
          <strong>Las islas.</strong> Siguen su propio uso:{" "}
          <span className="fr" lang="fr">à Cuba</span>,{" "}
          <span className="fr" lang="fr">à Madagascar</span>,{" "}
          <span className="fr" lang="fr">en Corse</span>,{" "}
          <span className="fr" lang="fr">aux Canaries</span>. Trátalas como
          vocabulario, no como una regla.
        </div>

        <div className="attention">
          Esta página es un atajo, no una lección. No dice nada de{" "}
          <span className="fr" lang="fr">chez</span>, ni de las preposiciones
          de lugar dentro de una ciudad. Sirve para decidir rápido entre cuatro
          palabras y para saber cuándo no fiarse de ella.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Une ville : <span className="fr">à</span>, toujours, sauf si
            l’article fait partie du nom.
          </li>
          <li>
            Un pays en <span className="fr">-e</span> :{" "}
            <span className="fr">en</span>. Une autre lettre :{" "}
            <span className="fr">au</span>. Un pluriel :{" "}
            <span className="fr">aux</span>.
          </li>
          <li>
            Pour la provenance : <span className="fr">de</span>,{" "}
            <span className="fr">du</span>, <span className="fr">des</span>,
            selon le même partage.
          </li>
          <li>
            <span className="fr">au Mexique</span> et les pays en{" "}
            <span className="fr">-e</span> masculins échappent au raccourci.
          </li>
          <li>
            Un pays qui commence par une voyelle prend{" "}
            <span className="fr">en</span> ; les îles ne suivent aucune règle.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Una ciudad: <span className="fr" lang="fr">à</span>, siempre, salvo
            si el artículo forma parte del nombre.
          </li>
          <li>
            Un país en <span className="fr" lang="fr">-e</span>:{" "}
            <span className="fr" lang="fr">en</span>. Otra letra:{" "}
            <span className="fr" lang="fr">au</span>. Un plural:{" "}
            <span className="fr" lang="fr">aux</span>.
          </li>
          <li>
            Para la procedencia: <span className="fr" lang="fr">de</span>,{" "}
            <span className="fr" lang="fr">du</span>,{" "}
            <span className="fr" lang="fr">des</span>, con el mismo reparto.
          </li>
          <li>
            <span className="fr" lang="fr">au Mexique</span> y los países
            masculinos en <span className="fr" lang="fr">-e</span> se escapan
            del atajo.
          </li>
          <li>
            Un país que empieza por vocal lleva{" "}
            <span className="fr" lang="fr">en</span>; las islas no siguen
            ninguna regla.
          </li>
        </ul>
      </div>
    </article>
  );
}
