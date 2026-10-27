import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-transports";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the Spanish glosses are written once, below, and shared; captions and
   column heads are passed in each language. In the French body a Spanish piece
   says lang="es". */

type Ui = "fr" | "es";

/* A Spanish gloss: in the French body it needs its own lang. */
function Es({ ui, children }: { ui: Ui; children: ReactNode }) {
  return ui === "fr" ? <span lang="es">{children}</span> : <>{children}</>;
}

type Row = { word: string; es: string; ex: string; gloss?: string };

const VEHICLES: Row[] = [
  { word: "la voiture", es: "el coche", ex: "Ma voiture est petite." },
  { word: "le bus", es: "el autobús", ex: "Le bus est grand." },
  { word: "le car", es: "el autocar", ex: "Le car va à Lyon." },
  { word: "le métro", es: "el metro", ex: "Je prends le métro." },
  { word: "le tramway", es: "el tranvía", ex: "Le tramway est nouveau." },
  { word: "le train", es: "el tren", ex: "Le train est rapide." },
  { word: "le vélo", es: "la bicicleta", ex: "Le vélo est dans le jardin." },
  { word: "la moto", es: "la moto", ex: "La moto est devant la maison." },
  { word: "l’avion (m.)", es: "el avión", ex: "L’avion est très grand." },
  { word: "le bateau", es: "el barco", ex: "Le bateau est petit." },
  { word: "le taxi", es: "el taxi", ex: "Le taxi est devant la maison." },
];

const WAYS: Row[] = [
  { word: "en voiture", es: "en coche", ex: "Je vais au travail en voiture." },
  { word: "en bus", es: "en autobús", ex: "Je vais au travail en bus." },
  { word: "en métro", es: "en metro", ex: "Je vais au travail en métro." },
  { word: "en train", es: "en tren", ex: "Je vais à Lyon en train." },
  { word: "en‿avion", es: "en avión", ex: "Je vais à Paris en‿avion." },
  { word: "en taxi", es: "en taxi", ex: "Elle va au travail en taxi." },
  { word: "à pied", es: "a pie", ex: "Je vais au travail à pied." },
  { word: "à vélo", es: "en bicicleta", ex: "Elle va au travail à vélo." },
  { word: "à moto", es: "en moto", ex: "Il va au travail à moto." },
];

const STATION: Row[] = [
  { word: "la gare", es: "la estación de tren", ex: "Le train est à la gare." },
  { word: "la station", es: "la estación de metro (o de tranvía)", ex: "La station de métro est à côté de la maison." },
  { word: "l’arrêt (m.)", es: "la parada", ex: "L’arrêt de bus est devant la gare." },
  { word: "le quai", es: "el andén", ex: "Le train est sur le quai." },
  { word: "le billet", es: "el billete", ex: "Un billet pour Lyon, s’il vous plaît.", gloss: "Un billete para Lyon, por favor." },
  { word: "le ticket", es: "el billete de metro o de autobús", ex: "J’ai un ticket de métro." },
];

function WordTable({
  ui,
  caption,
  rows,
}: {
  ui: Ui;
  caption: ReactNode;
  rows: Row[];
}) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Mot" : "Palabra"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "En español"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td>
                <Es ui={ui}>{row.es}</Es>
              </td>
              {row.gloss ? (
                <td>
                  <span className="fr" lang="fr">
                    {row.ex}
                  </span>{" "}
                  (<Es ui={ui}>{row.gloss}</Es>)
                </td>
              ) : (
                <td className="fr" lang="fr">
                  {row.ex}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TrainExample = () => (
  <div className="example" lang="fr">
    Le train est rapide.
    <br />
    Ma voiture est devant la maison.
  </div>
);

const WayExample = () => (
  <div className="example" lang="fr">
    Je vais au travail en bus.
    <br />
    Mon père va à Lyon en train.
  </div>
);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Les moyens de transport</h2>

        <div className="rule">
          Apprenez chaque nom avec son article. Quand le nom commence par une voyelle,{" "}
          <span className="fr">l’</span> cache le genre : j’ajoute (f.) ou (m.). Ici, seuls deux
          noms portent la marque : <span className="fr">l’avion</span> (m.) et{" "}
          <span className="fr">l’arrêt</span> (m.). Pour dire ce que vous prenez :{" "}
          <span className="fr">Je prends le bus.</span> (<span lang="es">cojo el autobús</span>).
        </div>

        <WordTable ui="fr" caption="Onze moyens de transport, avec leur article" rows={VEHICLES} />

        <TrainExample />

        <div className="attention">
          <span className="fr">le car</span> est <span lang="es">el autocar</span> : il va d’une
          ville à une autre, ou en excursion. Ce n’est pas <span lang="es">el coche</span> :{" "}
          <span lang="es">el coche</span> se dit <span className="fr">la voiture</span>.{" "}
          <span className="fr">Le car est grand</span> (<span lang="es">el autocar es grande</span>).
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Los medios de transporte:{" "}
          <span className="fr" lang="fr">
            les moyens de transport
          </span>
        </h2>

        <div className="rule">
          Aprende cada nombre con su artículo. Cuando el nombre empieza por
          vocal,{" "}
          <span className="fr" lang="fr">
            l’
          </span>{" "}
          esconde el género: lo marco con (f.) o (m.). Aquí solo dos nombres
          llevan la marca:{" "}
          <span className="fr" lang="fr">
            l’avion
          </span>{" "}
          (m.) y{" "}
          <span className="fr" lang="fr">
            l’arrêt
          </span>{" "}
          (m.). Para decir qué coges:{" "}
          <span className="fr" lang="fr">
            Je prends le bus.
          </span>{" "}
          (cojo el autobús).
        </div>

        <WordTable ui="es" caption="Once medios de transporte, con su artículo" rows={VEHICLES} />

        <TrainExample />

        <div className="attention">
          <span className="fr" lang="fr">
            le car
          </span>{" "}
          es el autocar, el que va de una ciudad a otra o de excursión. No es el
          coche: el coche es{" "}
          <span className="fr" lang="fr">
            la voiture
          </span>
          .{" "}
          <span className="fr" lang="fr">
            Le car est grand
          </span>{" "}
          (el autocar es grande).
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Comment vous voyagez : <span className="fr">en</span> ou <span className="fr">à</span>
        </h2>

        <div className="rule">
          Avec <span className="fr">en</span>, vous êtes dedans : <span className="fr">en voiture</span>,{" "}
          <span className="fr">en bus</span>, <span className="fr">en métro</span>,{" "}
          <span className="fr">en train</span>, <span className="fr">en‿avion</span>,{" "}
          <span className="fr">en taxi</span>. Avec <span className="fr">à</span>, vous êtes sur vos
          pieds ou assis sur le vélo ou sur la moto : <span className="fr">à pied</span>,{" "}
          <span className="fr">à vélo</span>, <span className="fr">à moto</span>. Exemple :{" "}
          <span className="fr">Je vais au travail en bus.</span> (
          <span lang="es">voy al trabajo en autobús</span>). Le <span className="fr">n</span> de{" "}
          <span className="fr">en</span> s’entend devant une voyelle :{" "}
          <span className="fr">en‿avion</span>. C’est une liaison (
          <Link href="/grammaire/le-singulier-et-le-pluriel">Le singulier et le pluriel</Link>).
        </div>

        <WordTable
          ui="fr"
          caption={
            <>
              Neuf façons de voyager, avec « <span lang="fr">en</span> » ou « <span lang="fr">à</span> »
            </>
          }
          rows={WAYS}
        />

        <WayExample />

        <p>
          Avec <span className="fr">prendre</span> (<span lang="es">coger</span>), il n’y a pas de
          préposition : <span className="fr">Je prends le métro.</span> (
          <span lang="es">cojo el metro</span>), <span className="fr">Il prend le train.</span> (
          <span lang="es">coge el tren</span>). Comparez :{" "}
          <span className="fr">Je vais au travail en métro</span> et{" "}
          <span className="fr">Je prends le métro</span> disent presque la même chose. Plus sur{" "}
          <span className="fr">au</span> dans{" "}
          <Link href="/grammaire/les-articles-definis">Les articles définis</Link>.
        </p>

        <div className="exception">
          Dans la rue, on entend souvent <span className="fr">en vélo</span> et{" "}
          <span className="fr">en moto</span>. Apprenez <span className="fr">à</span>, et ne soyez pas
          surpris si vous entendez <span className="fr">en</span>.{" "}
          <span className="fr">à pied</span> ne change jamais.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Cómo viajas:{" "}
          <span className="fr" lang="fr">
            en
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            à
          </span>
        </h2>

        <div className="rule">
          Con{" "}
          <span className="fr" lang="fr">
            en
          </span>{" "}
          estás dentro:{" "}
          <span className="fr" lang="fr">
            en voiture
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en bus
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en métro
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en train
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en‿avion
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            en taxi
          </span>
          . Con{" "}
          <span className="fr" lang="fr">
            à
          </span>{" "}
          estás sobre tus pies o sentado a horcajadas:{" "}
          <span className="fr" lang="fr">
            à pied
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            à vélo
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            à moto
          </span>
          . Ejemplo:{" "}
          <span className="fr" lang="fr">
            Je vais au travail en bus.
          </span>{" "}
          (voy al trabajo en autobús). La{" "}
          <span className="fr" lang="fr">
            n
          </span>{" "}
          de{" "}
          <span className="fr" lang="fr">
            en
          </span>{" "}
          suena delante de una vocal:{" "}
          <span className="fr" lang="fr">
            en‿avion
          </span>
          . Es un enlace (
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          ).
        </div>

        <WordTable
          ui="es"
          caption={
            <>
              Nueve maneras de viajar, con «<span lang="fr">en</span>» o «
              <span lang="fr">à</span>»
            </>
          }
          rows={WAYS}
        />

        <WayExample />

        <p>
          Con{" "}
          <span className="fr" lang="fr">
            prendre
          </span>{" "}
          (coger) no hay preposición:{" "}
          <span className="fr" lang="fr">
            Je prends le métro.
          </span>{" "}
          (cojo el metro),{" "}
          <span className="fr" lang="fr">
            Il prend le train.
          </span>{" "}
          (coge el tren). Compara:{" "}
          <span className="fr" lang="fr">
            Je vais au travail en métro
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            Je prends le métro
          </span>{" "}
          dicen casi lo mismo. Más sobre{" "}
          <span className="fr" lang="fr">
            au
          </span>{" "}
          en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          .
        </p>

        <div className="exception">
          En la calle oyes mucho{" "}
          <span className="fr" lang="fr">
            en vélo
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            en moto
          </span>
          . Aprende{" "}
          <span className="fr" lang="fr">
            à
          </span>{" "}
          y no te sorprendas si oyes{" "}
          <span className="fr" lang="fr">
            en
          </span>
          .{" "}
          <span className="fr" lang="fr">
            à pied
          </span>{" "}
          no cambia nunca.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les mots de la gare</h2>

        <div className="rule">
          Ces six mots servent chaque jour dans le train, le métro et le bus. Trois se confondent
          facilement : <span className="fr">la gare</span>, <span className="fr">la station</span> et{" "}
          <span className="fr">l’arrêt</span>. Voyez-les dans les encadrés ci-dessous.
        </div>

        <WordTable
          ui="fr"
          caption="Six mots de la gare et de l’arrêt, avec une phrase"
          rows={STATION}
        />

        <div className="attention">
          En espagnol, <span lang="es">« estación »</span> sert pour tout. En français, il y a deux
          mots : <span className="fr">la gare</span> est <span lang="es">la estación de tren</span>{" "}
          et <span className="fr">la station</span> est celle du métro ou du tramway. Un train
          s’arrête à <span className="fr">la gare</span> ; un métro s’arrête à{" "}
          <span className="fr">la station</span>.
        </div>

        <div className="attention">
          <span className="fr">l’arrêt</span> est <span lang="es">la parada</span> :{" "}
          <span className="fr">l’arrêt de bus</span>. Ce n’est pas <span lang="es">el arresto</span>{" "}
          de la police.
        </div>

        <div className="attention">
          <span className="fr">le billet</span> est <span lang="es">el billete</span> de train ou
          d’avion ; <span className="fr">le ticket</span>, celui du métro ou du bus. Ce sont deux
          mots, pas un.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Las palabras de la estación:{" "}
          <span className="fr" lang="fr">
            la gare
          </span>
        </h2>

        <div className="rule">
          Estas seis palabras se usan cada día en el tren, el metro y el
          autobús. Tres de ellas se confunden con facilidad:{" "}
          <span className="fr" lang="fr">
            la gare
          </span>
          ,{" "}
          <span className="fr" lang="fr">
            la station
          </span>{" "}
          y{" "}
          <span className="fr" lang="fr">
            l’arrêt
          </span>
          . Míralas en los recuadros de abajo.
        </div>

        <WordTable
          ui="es"
          caption="Seis palabras de la estación y de la parada, con una frase"
          rows={STATION}
        />

        <div className="attention">
          En español «estación» sirve para todo. En francés hay dos palabras:{" "}
          <span className="fr" lang="fr">
            la gare
          </span>{" "}
          es la estación de tren y{" "}
          <span className="fr" lang="fr">
            la station
          </span>{" "}
          es la de metro o de tranvía. Un tren para en{" "}
          <span className="fr" lang="fr">
            la gare
          </span>
          ; un metro para en{" "}
          <span className="fr" lang="fr">
            la station
          </span>
          .
        </div>

        <div className="attention">
          <span className="fr" lang="fr">
            l’arrêt
          </span>{" "}
          es la parada:{" "}
          <span className="fr" lang="fr">
            l’arrêt de bus
          </span>
          . No es el arresto de la policía.
        </div>

        <div className="attention">
          <span className="fr" lang="fr">
            le billet
          </span>{" "}
          es el billete de tren o de avión;{" "}
          <span className="fr" lang="fr">
            le ticket
          </span>
          , el del metro o del autobús. Son dos palabras, no una.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Apprenez chaque moyen avec son article : <span className="fr">la voiture</span>,{" "}
            <span className="fr">le train</span>, <span className="fr">l’avion</span> (m.).
          </li>
          <li>
            <span className="fr">le car</span> est <span lang="es">el autocar</span> ;{" "}
            <span lang="es">el coche</span> se dit <span className="fr">la voiture</span>.
          </li>
          <li>
            <span className="fr">en</span> si vous êtes dedans (<span className="fr">en voiture</span>,{" "}
            <span className="fr">en train</span>) ; <span className="fr">à</span> si vous êtes à pied ou
            assis dessus (<span className="fr">à pied</span>, <span className="fr">à vélo</span>,{" "}
            <span className="fr">à moto</span>). On entend <span className="fr">en vélo</span>, mais
            apprenez <span className="fr">à vélo</span>.
          </li>
          <li>
            Avec <span className="fr">prendre</span>, il n’y a pas de préposition :{" "}
            <span className="fr">Je prends le métro.</span>
          </li>
          <li>
            <span className="fr">la gare</span> est pour les trains, <span className="fr">la station</span>{" "}
            pour le métro, <span className="fr">l’arrêt</span> pour le bus : <span lang="es">la parada</span>, pas{" "}
            <span lang="es">el arresto</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Aprende cada medio con su artículo:{" "}
            <span className="fr" lang="fr">
              la voiture
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              le train
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              l’avion
            </span>{" "}
            (m.).
          </li>
          <li>
            <span className="fr" lang="fr">
              le car
            </span>{" "}
            es el autocar; el coche es{" "}
            <span className="fr" lang="fr">
              la voiture
            </span>
            .
          </li>
          <li>
            <span className="fr" lang="fr">
              en
            </span>{" "}
            si estás dentro (
            <span className="fr" lang="fr">
              en voiture
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              en train
            </span>
            );{" "}
            <span className="fr" lang="fr">
              à
            </span>{" "}
            a pie o a horcajadas (
            <span className="fr" lang="fr">
              à pied
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              à vélo
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              à moto
            </span>
            ). Se oye{" "}
            <span className="fr" lang="fr">
              en vélo
            </span>
            , pero aprende{" "}
            <span className="fr" lang="fr">
              à vélo
            </span>
            .
          </li>
          <li>
            Con{" "}
            <span className="fr" lang="fr">
              prendre
            </span>{" "}
            no hay preposición:{" "}
            <span className="fr" lang="fr">
              Je prends le métro.
            </span>
          </li>
          <li>
            <span className="fr" lang="fr">
              la gare
            </span>{" "}
            es de trenes,{" "}
            <span className="fr" lang="fr">
              la station
            </span>{" "}
            de metro,{" "}
            <span className="fr" lang="fr">
              l’arrêt
            </span>{" "}
            de autobús: la parada, no el arresto.
          </li>
        </ul>
      </div>
    </article>
  );
}
