import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-passe-compose";

export const metadata = lessonMetadata(PATH);

/* Deux corps, français et espagnol, section par section (docs/decisions.md
   #102) : le CSS montre celui de l'interface. Le français enseigné est écrit
   une fois, ci-dessous, et partagé. Server Component : pas de 'use client',
   pas de hook, pas d'état. */

type Lang = "fr" | "es";

const MANGER = [
  ["j’", "ai"],
  ["tu", "as"],
  ["il / elle / on", "a"],
  ["nous", "avons"],
  ["vous", "avez"],
  ["ils / elles", "ont"],
];

const PARTICIPLES = [
  ["-er", "-é", "parler → parlé · aimer → aimé"],
  ["-ir", "-i", "finir → fini · choisir → choisi"],
  ["-dre", "-u", "vendre → vendu · attendre → attendu"],
];

const AGREEMENT = [
  { subject: { fr: "masculin singulier", es: "masculino singular" }, phrase: "Il est parti.", ending: "—" },
  { subject: { fr: "féminin singulier", es: "femenino singular" }, phrase: "Elle est partie.", ending: "-e" },
  { subject: { fr: "masculin pluriel", es: "masculino plural" }, phrase: "Ils sont partis.", ending: "-s" },
  { subject: { fr: "féminin pluriel", es: "femenino plural" }, phrase: "Elles sont parties.", ending: "-es" },
];

function Head({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr>
        {cols.map((c) => (
          <th key={c} scope="col">
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function AvoirExample() {
  return (
    <div className="example" lang="fr">
      Hier, j’<strong>ai mangé</strong> au restaurant. · Nous{" "}
      <strong>avons fini</strong> à six heures. · Ils <strong>ont pris</strong>{" "}
      le train.
    </div>
  );
}

function MangerTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? { caption: "Le verbe « manger » au passé composé", cols: ["Sujet", "Auxiliaire", "Participe passé"] }
      : { caption: (
          <>
            El verbo «<span lang="fr">manger</span>» en el{" "}
            <span lang="fr">passé composé</span>
          </>
        ), cols: ["Sujeto", "Auxiliar", "Participio pasado"] };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <Head cols={t.cols} />
        <tbody>
          {MANGER.map(([subject, aux]) => (
            <tr key={subject}>
              <th scope="row" className="fr" lang="fr">
                {subject}
              </th>
              <td className="fr" lang="fr">
                {aux}
              </td>
              <td className="fr" lang="fr">
                mangé
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ParticiplesTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? {
          caption: "La terminaison du participe passé, groupe par groupe",
          cols: ["Verbes en", "Participe en", "Exemples"],
        }
      : {
          caption: "La terminación del participio pasado, grupo por grupo",
          cols: ["Verbos en", "Participio en", "Ejemplos"],
        };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <Head cols={t.cols} />
        <tbody>
          {PARTICIPLES.map(([verbs, participle, examples]) => (
            <tr key={verbs}>
              <th scope="row" className="fr" lang="fr">
                {verbs}
              </th>
              <td className="fr" lang="fr">
                {participle}
              </td>
              <td className="fr" lang="fr">
                {examples}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Irregulars({ lang }: { lang: Lang }) {
  const forms = [
    "avoir → eu",
    "être → été",
    "faire → fait",
    "voir → vu",
    "prendre → pris",
    "mettre → mis",
    "écrire → écrit",
    "pouvoir → pu",
    "vouloir → voulu",
  ];
  return (
    <>
      {forms.map((form, i) => (
        <span key={form}>
          <span className="fr" lang={lang === "es" ? "fr" : undefined}>
            {form}
          </span>
          {i < forms.length - 1 ? ", " : "."}
        </span>
      ))}
    </>
  );
}

function EtreVerbs() {
  return (
    <div className="example" lang="fr">
      aller · venir · arriver · partir · entrer · sortir · monter · descendre ·
      naître · mourir · rester · tomber · retourner · passer
      <br />
      se lever · se coucher · se promener · s’habiller
    </div>
  );
}

function AgreementTable({ lang }: { lang: Lang }) {
  const t =
    lang === "fr"
      ? { caption: "L’accord du participe passé avec « être »", cols: ["Sujet", "Phrase", "Terminaison"] }
      : { caption: (
          <>
            La concordancia del participio pasado con «
            <span lang="fr">être</span>»
          </>
        ), cols: ["Sujeto", "Frase", "Terminación"] };
  return (
    <div className="table-wrap">
      <table>
        <caption>{t.caption}</caption>
        <Head cols={t.cols} />
        <tbody>
          {AGREEMENT.map((row) => (
            <tr key={row.phrase}>
              <th scope="row">{row.subject[lang]}</th>
              <td className="fr" lang="fr">
                {row.phrase}
              </td>
              <td className="fr" lang="fr">
                {row.ending}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NegativeExample() {
  return (
    <div className="example" lang="fr">
      Je <strong>n’</strong>ai <strong>pas</strong> compris. · Elle{" "}
      <strong>n’</strong>est <strong>pas</strong> venue. · Nous{" "}
      <strong>n’</strong>avons <strong>jamais</strong> vu ce film.
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Le passé composé avec « avoir »</h2>

        <div className="rule">
          Le passé composé raconte une action <strong>terminée</strong>. On le
          forme avec un auxiliaire au présent, <span className="fr">avoir</span>{" "}
          ou <span className="fr">être</span>, suivi du{" "}
          <strong>participe passé</strong> du verbe. La grande majorité des
          verbes prennent <span className="fr">avoir</span>.
        </div>

        <AvoirExample />

        <MangerTable lang="fr" />

        <h3>Former le participe passé</h3>

        <ParticiplesTable lang="fr" />

        <div className="exception">
          Les verbes très fréquents ont un participe à part. Il faut les
          apprendre un par un : <Irregulars lang="fr" />
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El <span className="fr" lang="fr">passé composé</span> con «
          <span className="fr" lang="fr">avoir</span>»
        </h2>

        <div className="rule">
          El <span className="fr" lang="fr">passé composé</span> cuenta una
          acción <strong>terminada</strong>. Se forma con un auxiliar en
          presente, <span className="fr" lang="fr">avoir</span> o{" "}
          <span className="fr" lang="fr">être</span>, seguido del{" "}
          <strong>participio pasado</strong> del verbo. La gran mayoría de los
          verbos llevan <span className="fr" lang="fr">avoir</span>.
        </div>

        <AvoirExample />

        <MangerTable lang="es" />

        <h3>Formar el participio pasado</h3>

        <ParticiplesTable lang="es" />

        <div className="exception">
          Los verbos muy frecuentes tienen un participio aparte. Hay que
          aprenderlos uno por uno: <Irregulars lang="es" />
        </div>
      </section>

      <section data-ui="fr">
        <h2>Le passé composé avec « être »</h2>

        <p>
          Une petite famille de verbes n’utilise pas{" "}
          <span className="fr">avoir</span> : les verbes qui disent un{" "}
          <strong>déplacement</strong> ou un <strong>changement d’état</strong>,
          et tous les verbes pronominaux.
        </p>

        <EtreVerbs />

        <div className="rule">
          Avec <span className="fr">être</span>, le participe passé{" "}
          <strong>s’accorde avec le sujet</strong>, comme un adjectif : on
          ajoute <span className="fr">-e</span> au féminin,{" "}
          <span className="fr">-s</span> au pluriel.
        </div>

        <AgreementTable lang="fr" />

        <div className="attention">
          L’accord s’entend rarement. <span className="fr">parti</span> et{" "}
          <span className="fr">partie</span> se prononcent de la même façon :
          c’est une règle d’écriture, et elle se voit seulement sur la page.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            Le verbe change d’auxiliaire quand il change de sens
          </p>
          <p>
            Quelques verbes de la liste prennent{" "}
            <span className="fr">avoir</span> lorsqu’ils sont suivis d’un
            complément : <span className="fr">Je suis sorti</span> (je suis
            allé dehors) mais <span className="fr">J’ai sorti la poubelle</span>{" "}
            (j’ai sorti quelque chose). Même chose pour{" "}
            <span className="fr">monter</span>,{" "}
            <span className="fr">descendre</span> et{" "}
            <span className="fr">passer</span>.
          </p>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          El <span className="fr" lang="fr">passé composé</span> con «
          <span className="fr" lang="fr">être</span>»
        </h2>

        <p>
          Una pequeña familia de verbos no usa{" "}
          <span className="fr" lang="fr">avoir</span>: los verbos que dicen un{" "}
          <strong>desplazamiento</strong> o un <strong>cambio de estado</strong>,
          y todos los verbos pronominales.
        </p>

        <EtreVerbs />

        <div className="rule">
          Con <span className="fr" lang="fr">être</span>, el participio pasado{" "}
          <strong>concuerda con el sujeto</strong>, como un adjetivo: se añade{" "}
          <span className="fr" lang="fr">-e</span> en femenino,{" "}
          <span className="fr" lang="fr">-s</span> en plural.
        </div>

        <AgreementTable lang="es" />

        <div className="attention">
          La concordancia casi no se oye.{" "}
          <span className="fr" lang="fr">parti</span> y{" "}
          <span className="fr" lang="fr">partie</span> se pronuncian igual: es
          una regla de escritura, y solo se ve en la página.
        </div>

        <div className="astuce">
          <p className="astuce-hook">
            El verbo cambia de auxiliar cuando cambia de sentido
          </p>
          <p>
            Algunos verbos de la lista llevan{" "}
            <span className="fr" lang="fr">avoir</span> cuando van seguidos de
            un complemento: <span className="fr" lang="fr">Je suis sorti</span>{" "}
            (la persona va hacia fuera) pero{" "}
            <span className="fr" lang="fr">J’ai sorti la poubelle</span>{" "}
            (alguien saca un objeto). Lo mismo con{" "}
            <span className="fr" lang="fr">monter</span>,{" "}
            <span className="fr" lang="fr">descendre</span> y{" "}
            <span className="fr" lang="fr">passer</span>.
          </p>
        </div>
      </section>

      <section data-ui="fr">
        <h2>À la forme négative</h2>

        <div className="rule">
          <span className="fr">ne</span> et <span className="fr">pas</span>{" "}
          entourent <strong>l’auxiliaire</strong>, jamais le participe passé.
        </div>

        <NegativeExample />

        <div className="attention">
          À l’oral, le <span className="fr">ne</span> disparaît souvent —{" "}
          <span className="fr">j’ai pas compris</span>. On l’entend peu, mais à
          l’écrit il est obligatoire.
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>En la forma negativa</h2>

        <div className="rule">
          <span className="fr" lang="fr">ne</span> y{" "}
          <span className="fr" lang="fr">pas</span> rodean{" "}
          <strong>al auxiliar</strong>, nunca al participio pasado.
        </div>

        <NegativeExample />

        <div className="attention">
          Al hablar, el <span className="fr" lang="fr">ne</span> desaparece a
          menudo — <span className="fr" lang="fr">j’ai pas compris</span>. Casi
          no se oye, pero al escribir es obligatorio.
        </div>
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Le passé composé raconte une action terminée : un auxiliaire au
            présent, puis le participe passé.
          </li>
          <li>
            La plupart des verbes prennent <span className="fr">avoir</span>.
          </li>
          <li>
            Les verbes de déplacement ou de changement d’état, et tous les
            verbes pronominaux, prennent <span className="fr">être</span>.
          </li>
          <li>
            Avec <span className="fr">être</span>, le participe s’accorde avec
            le sujet : <span className="fr">elle est partie</span>,{" "}
            <span className="fr">ils sont partis</span>.
          </li>
          <li>
            À la forme négative, <span className="fr">ne</span> et{" "}
            <span className="fr">pas</span> entourent l’auxiliaire :{" "}
            <span className="fr">je n’ai pas compris</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            El <span className="fr" lang="fr">passé composé</span> cuenta una
            acción terminada: un auxiliar en presente, y después el participio
            pasado.
          </li>
          <li>
            La mayoría de los verbos llevan{" "}
            <span className="fr" lang="fr">avoir</span>.
          </li>
          <li>
            Los verbos de desplazamiento o de cambio de estado, y todos los
            verbos pronominales, llevan{" "}
            <span className="fr" lang="fr">être</span>.
          </li>
          <li>
            Con <span className="fr" lang="fr">être</span>, el participio
            concuerda con el sujeto:{" "}
            <span className="fr" lang="fr">elle est partie</span>,{" "}
            <span className="fr" lang="fr">ils sont partis</span>.
          </li>
          <li>
            En la forma negativa, <span className="fr" lang="fr">ne</span> y{" "}
            <span className="fr" lang="fr">pas</span> rodean al auxiliar:{" "}
            <span className="fr" lang="fr">je n’ai pas compris</span>.
          </li>
        </ul>
      </div>
    </article>
  );
}
