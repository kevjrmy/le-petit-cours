import Link from "next/link";
import type { ReactNode } from "react";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/les-pays-et-les-nationalites";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the Spanish gloss column are written once, below, and shared; captions
   and column heads are passed in each language. In the French body a Spanish
   piece says lang="es". */

type Ui = "fr" | "es";

/* In the Spanish body: French says lang="fr". */
function Fr({ children }: { children: ReactNode }) {
  return (
    <span className="fr" lang="fr">
      {children}
    </span>
  );
}

/* In the French body: lang is inherited. */
function F({ children }: { children: ReactNode }) {
  return <span className="fr">{children}</span>;
}

const COUNTRIES: [string, string, string][] = [
  ["l’Espagne (f.)", "España", "Je viens d’Espagne."],
  ["la France", "Francia", "J’habite en France."],
  ["le Portugal", "Portugal", "Elle habite au Portugal."],
  ["l’Italie (f.)", "Italia", "Nous venons d’Italie."],
  ["l’Allemagne (f.)", "Alemania", "Il vient d’Allemagne."],
  ["le Royaume-Uni", "el Reino Unido", "Je viens du Royaume-Uni."],
  ["les États-Unis (m. pl.)", "Estados Unidos", "J’habite aux États-Unis."],
  ["le Mexique", "México", "J’habite au Mexique."],
  ["la Colombie", "Colombia", "Je viens de Colombie."],
  ["l’Argentine (f.)", "Argentina", "Elle vient d’Argentine."],
  ["le Pérou", "Perú", "Ils habitent au Pérou."],
  ["le Chili", "Chile", "Je viens du Chili."],
  ["l’Équateur (m.)", "Ecuador", "J’habite en Équateur."],
  ["le Maroc", "Marruecos", "Il vient du Maroc."],
  ["la Chine", "China", "Elle habite en Chine."],
];

const NATIONALITIES: [string, string, string, string][] = [
  ["l’Espagne", "espagnol", "espagnole", "Elle est espagnole."],
  ["la France", "français", "française", "Il est français."],
  ["l’Italie", "italien", "italienne", "Elle est italienne."],
  ["le Portugal", "portugais", "portugaise", "Il est portugais."],
  ["l’Allemagne", "allemand", "allemande", "Elle est allemande."],
  ["l’Angleterre", "anglais", "anglaise", "Il est anglais."],
  ["le Mexique", "mexicain", "mexicaine", "Elle est mexicaine."],
  ["la Colombie", "colombien", "colombienne", "Il est colombien."],
  ["l’Argentine", "argentin", "argentine", "Elle est argentine."],
  ["le Maroc", "marocain", "marocaine", "Il est marocain."],
  ["la Chine", "chinois", "chinoise", "Elle est chinoise."],
  ["les États-Unis", "américain", "américaine", "Elle est américaine."],
  ["la Belgique", "belge", "belge", "Il est belge."],
  ["la Suisse", "suisse", "suisse", "Elle est suisse."],
  ["la Russie", "russe", "russe", "Il est russe."],
];

function CountriesTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Quinze pays, avec leur article et une phrase"
            : "Quince países, con su artículo y una frase"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Pays" : "País"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "En español"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {COUNTRIES.map(([fr, es, ex]) => (
            <tr key={fr}>
              <th scope="row" className="fr" lang="fr">
                {fr}
              </th>
              <td lang={ui === "fr" ? "es" : undefined}>{es}</td>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NationalitiesTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Quinze pays et leur nationalité, au masculin et au féminin"
            : "Quince países y su nacionalidad, en masculino y en femenino"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Pays" : "País"}</th>
            <th scope="col">{ui === "fr" ? "Masculin" : "Masculino"}</th>
            <th scope="col">{ui === "fr" ? "Féminin" : "Femenino"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {NATIONALITIES.map(([country, m, f, ex]) => (
            <tr key={country}>
              <th scope="row" className="fr" lang="fr">
                {country}
              </th>
              <td className="fr" lang="fr">
                {m}
              </td>
              <td className="fr" lang="fr">
                {f}
              </td>
              <td className="fr" lang="fr">
                {ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CityExample = () => (
  <div className="example" lang="fr">
    J’habite à Madrid, en Espagne.
    <br />
    Il vient de Lima, au Pérou.
    <br />
    Elle habite à Mexico, au Mexique.
  </div>
);

const NationalityExample = () => (
  <div className="example" lang="fr">
    Je suis espagnol. Ma mère est française.
    <br />
    Mon amie est italienne et mon ami est portugais.
  </div>
);

const IntroExample = () => (
  <div className="example" lang="fr">
    Tu viens d’où ? Je viens d’Espagne.
    <br />
    Tu habites où ? J’habite à Lyon, en France.
    <br />
    C’est un Français, il habite à Lyon.
    <br />
    Je parle français et espagnol.
  </div>
);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>
          Les pays
        </h2>

        <div className="rule">
          Apprenez chaque pays avec son article, parce que l’article dit le genre. Les pays en{" "}
          <F>-e</F> sont féminins : <F>en</F> pour être quelque part, <F>de</F> (ou <F>d’</F>) pour
          venir. Les autres sont masculins : <F>au</F> et <F>du</F>, mais s’ils commencent par une
          voyelle, on dit aussi <F>en</F> et <F>d’</F> (<F>en Équateur</F>). Si le nom est pluriel :{" "}
          <F>aux</F> et <F>des</F>. Avec une ville, toujours <F>à</F> et <F>de</F>. Tous les cas sont
          dans <Link href="/astuces/a-en-au-aux">À, en, au, aux</Link>.
        </div>

        <CountriesTable ui="fr" />

        <CityExample />

        <div className="exception">
          <F>le Mexique</F> finit en <F>-e</F>, mais il est masculin : <F>au Mexique</F>,{" "}
          <F>du Mexique</F>. C’est pareil pour <F>le Cambodge</F> et <F>le Mozambique</F>. Attention à
          l’écriture : <F>Mexique</F> s’écrit avec un x, pas avec un j.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Los países: <Fr>les pays</Fr>
        </h2>

        <div className="rule">
          Aprende cada país con su artículo, porque el artículo dice el género.
          Un país que acaba en <Fr>-e</Fr> es femenino: <Fr>en</Fr> para estar,{" "}
          <Fr>de</Fr> (o <Fr>d’</Fr>) para venir. Los demás son masculinos:{" "}
          <Fr>au</Fr> y <Fr>du</Fr>, pero si empiezan por vocal también{" "}
          <Fr>en</Fr> y <Fr>d’</Fr> (<Fr>en Équateur</Fr>). Si el nombre es
          plural: <Fr>aux</Fr> y <Fr>des</Fr>. Con una ciudad, siempre{" "}
          <Fr>à</Fr> y <Fr>de</Fr>. Todos los casos están en{" "}
          <Link href="/astuces/a-en-au-aux" lang="fr">
            À, en, au, aux
          </Link>
          .
        </div>

        <CountriesTable ui="es" />

        <CityExample />

        <div className="exception">
          <Fr>le Mexique</Fr> acaba en <Fr>-e</Fr>, pero es masculino:{" "}
          <Fr>au Mexique</Fr>, <Fr>du Mexique</Fr>. Pasa lo mismo con{" "}
          <Fr>le Cambodge</Fr> y <Fr>le Mozambique</Fr>. Cuidado con la
          escritura: <Fr>Mexique</Fr> lleva x, no j.
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les nationalités</h2>

        <div className="rule">
          La nationalité est un adjectif, et elle s’accorde avec la personne : un homme dit{" "}
          <F>Je suis espagnol</F>, une femme dit <F>Je suis espagnole</F>. Presque toujours, on
          ajoute <F>-e</F> au masculin. Si le masculin finit déjà par <F>-e</F>, il ne change pas :{" "}
          <F>belge</F>, <F>suisse</F>, <F>russe</F>.
        </div>

        <NationalitiesTable ui="fr" />

        <NationalityExample />

        <div className="attention">
          Au féminin, on entend la consonne finale, muette au masculin : <F>français</F> finit
          presque par <span lang="es">« é »</span>, mais <F>française</F> finit par un s sonore,
          comme le s de <span lang="es">« mismo »</span> (un bourdonnement). <F>italien</F> finit
          par une voyelle nasale (le n ne s’entend pas) ; <F>italienne</F> finit par « -ièn », avec
          le n bien prononcé. Avec <F>espagnol</F>, le son ne change pas, seulement l’écriture.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Las nacionalidades: <Fr>les nationalités</Fr>
        </h2>

        <div className="rule">
          La nacionalidad es un adjetivo y concuerda contigo: un hombre dice{" "}
          <Fr>Je suis espagnol</Fr>, una mujer dice <Fr>Je suis espagnole</Fr>.
          Casi siempre se añade una <Fr>-e</Fr> al masculino. Si el masculino ya
          acaba en <Fr>-e</Fr>, no cambia: <Fr>belge</Fr>, <Fr>suisse</Fr>,{" "}
          <Fr>russe</Fr>.
        </div>

        <NationalitiesTable ui="es" />

        <NationalityExample />

        <div className="attention">
          En femenino se oye la consonante final, que en masculino es muda:{" "}
          <Fr>français</Fr> termina casi en «é», pero <Fr>française</Fr> termina
          en una s sonora, como la s de «mismo» (un zumbido). <Fr>italien</Fr>{" "}
          termina en vocal nasal (la n no suena); <Fr>italienne</Fr> termina en
          «-ièn», con la n bien pronunciada. Con <Fr>espagnol</Fr> no cambia el
          sonido, solo la escritura.
        </div>
      </section>

      <section data-ui="fr">
        <h2>
          Se présenter : <F>je suis, je viens de, j’habite</F>
        </h2>

        <div className="rule">
          Un adjectif de nationalité s’écrit avec une minuscule : <F>Il est français</F>. Un nom de
          personne prend une majuscule : <F>un Français</F>, <F>une Espagnole</F>. Les langues
          prennent une minuscule : <F>le français</F>, <F>l’espagnol</F>.
        </div>

        <IntroExample />

        <div className="attention">
          En espagnol, <span lang="es">« español »</span> prend une minuscule dans{" "}
          <span lang="es">« es español »</span> comme dans <span lang="es">« un español »</span>.
          En français, ce n’est pas pareil : l’adjectif prend une minuscule (<F>Il est espagnol</F>)
          et le nom une majuscule (<F>C’est un Espagnol</F>). Et attention à deux nationalités :{" "}
          <F>anglais</F> est d’Angleterre (pour le Royaume-Uni, on dit <F>britannique</F>), et{" "}
          <F>américain</F> est des États-Unis. Une personne de Colombie dit{" "}
          <F>Je suis colombien</F> ou <F>Je suis colombienne</F>, jamais <F>américain</F>.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Presentarte: <Fr>je suis, je viens de, j’habite</Fr>
        </h2>

        <div className="rule">
          Un adjetivo de nacionalidad se escribe con minúscula:{" "}
          <Fr>Il est français</Fr>. Un sustantivo que nombra a una persona lleva
          mayúscula: <Fr>un Français</Fr>, <Fr>une Espagnole</Fr>. Las lenguas
          van con minúscula: <Fr>le français</Fr>, <Fr>l’espagnol</Fr>.
        </div>

        <IntroExample />

        <div className="attention">
          En español, «español» va con minúscula tanto en «es español» como en
          «un español». En francés cambia: el adjetivo va en minúscula (
          <Fr>Il est espagnol</Fr>) y el sustantivo en mayúscula (
          <Fr>C’est un Espagnol</Fr>). Y ojo con dos nacionalidades:{" "}
          <Fr>anglais</Fr> es de Inglaterra (para el Reino Unido se dice{" "}
          <Fr>britannique</Fr>), y <Fr>américain</Fr> es de Estados Unidos. Un
          colombiano dice <Fr>Je suis colombien</Fr>, nunca <Fr>américain</Fr>.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Pays en <F>-e</F> : <F>en France</F>, <F>d’Espagne</F>. Les autres : <F>au Portugal</F>,{" "}
            <F>du Maroc</F> ; pluriel : <F>aux États-Unis</F>.
          </li>
          <li>
            Ville : toujours <F>à</F>, comme dans <F>J’habite à Madrid</F>. Exception :{" "}
            <F>le Mexique</F> est masculin.
          </li>
          <li>
            La nationalité s’accorde : <F>espagnol</F> et <F>espagnole</F>. Si elle finit déjà par{" "}
            <F>-e</F>, elle ne change pas : <F>belge</F>.
          </li>
          <li>
            Le féminin change le son : <F>français</F> et <F>française</F> ; <F>italien</F> et{" "}
            <F>italienne</F>.
          </li>
          <li>
            Minuscule pour l’adjectif (<F>il est français</F>) et pour la langue ; majuscule pour la
            personne (<F>un Français</F>).
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            País en <Fr>-e</Fr>: <Fr>en France</Fr>, <Fr>d’Espagne</Fr>. Los
            demás: <Fr>au Portugal</Fr>, <Fr>du Maroc</Fr>; plural:{" "}
            <Fr>aux États-Unis</Fr>.
          </li>
          <li>
            Ciudad: siempre <Fr>à</Fr>, como en <Fr>J’habite à Madrid</Fr>.
            Excepción: <Fr>le Mexique</Fr> es masculino.
          </li>
          <li>
            La nacionalidad concuerda: <Fr>espagnol</Fr> y <Fr>espagnole</Fr>.
            Si ya acaba en <Fr>-e</Fr>, no cambia: <Fr>belge</Fr>.
          </li>
          <li>
            El femenino cambia el sonido: <Fr>français</Fr> y <Fr>française</Fr>
            ; <Fr>italien</Fr> y <Fr>italienne</Fr>.
          </li>
          <li>
            Minúscula para el adjetivo (<Fr>il est français</Fr>) y para la
            lengua; mayúscula para la persona (<Fr>un Français</Fr>).
          </li>
        </ul>
      </div>
    </article>
  );
}
