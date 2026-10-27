import type { ReactNode } from "react";
import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/vocabulaire/la-maison";

export const metadata = lessonMetadata(PATH);

/* Two bodies, French and Spanish, section by section (#102). The French taught
   and the Spanish glosses are written once, below, and shared; captions, heads
   and the false friends' explaining cells are written in each language. In the
   French body a Spanish piece says lang="es". */

type Ui = "fr" | "es";

/* A Spanish piece: in the French body it needs its own lang. */
function Es({ ui, children }: { ui: Ui; children: ReactNode }) {
  return ui === "fr" ? <span lang="es">{children}</span> : <>{children}</>;
}

function Fr({ ui, children }: { ui: Ui; children: ReactNode }) {
  return (
    <span className="fr" lang={ui === "es" ? "fr" : undefined}>
      {children}
    </span>
  );
}

type Row = {
  word: string;
  es: ReactNode;
  ex: string;
  gloss?: [string, string];
};

const ROOMS: Row[] = [
  { word: "la cuisine", es: "la cocina", ex: "Je mange dans la cuisine." },
  { word: "la salle de bains", es: "el cuarto de baño", ex: "La salle de bains est petite." },
  { word: "les toilettes", es: "el aseo, el váter", ex: "Les toilettes sont à gauche." },
  { word: "la chambre", es: "el dormitorio", ex: "Ma chambre est au deuxième étage." },
  { word: "le salon", es: "el salón", ex: "Le salon est grand." },
  { word: "la salle à manger", es: "el comedor", ex: "Nous dînons dans la salle à manger." },
  { word: "l’entrée (f.)", es: "el recibidor", ex: "Mon manteau est dans l’entrée.", gloss: ["manteau", "abrigo"] },
  { word: "le couloir", es: "el pasillo", ex: "Le couloir est long." },
  { word: "le balcon", es: "el balcón", ex: "J’ai un balcon avec deux chaises." },
  { word: "le jardin", es: "el jardín", ex: "Il y a un jardin derrière la maison." },
];

const FURNITURE: Row[] = [
  { word: "le lit", es: "la cama", ex: "Le lit est dans la chambre." },
  { word: "la table", es: "la mesa", ex: "Il y a une table et quatre chaises." },
  { word: "la chaise", es: "la silla", ex: "La chaise est devant la fenêtre.", gloss: ["fenêtre", "ventana"] },
  { word: "le canapé", es: "el sofá", ex: "Le canapé est bleu." },
  { word: "l’armoire (f.)", es: "el armario (para la ropa)", ex: "Mes vêtements sont dans l’armoire." },
  { word: "l’étagère (f.)", es: "la estantería", ex: "Les livres sont sur l’étagère." },
  { word: "le frigo", es: "el frigorífico (la nevera)", ex: "Il y a du lait dans le frigo." },
  { word: "le placard", es: "el armario (de cocina o empotrado)", ex: "Les assiettes sont dans le placard.", gloss: ["assiettes", "platos"] },
  { word: "la lampe", es: "la lámpara", ex: "La lampe est sur la table." },
  { word: "le fauteuil", es: "el sillón", ex: "Le fauteuil est à côté du canapé." },
];

function WordTable({ ui, caption, rows }: { ui: Ui; caption: string; rows: Row[] }) {
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
                  (
                  <span className="fr" lang="fr">
                    {row.gloss[0]}
                  </span>
                  : <Es ui={ui}>{row.gloss[1]}</Es>)
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

const FALSE_FRIENDS: { word: string; es: Record<Ui, (ui: Ui) => ReactNode>; ex: string }[] = [
  {
    word: "la chambre",
    es: {
      fr: (ui) => (
        <>
          <Es ui={ui}>el dormitorio</Es> (pas <Es ui={ui}>la cámara</Es> : cela se dit{" "}
          <Fr ui={ui}>un appareil photo</Fr>)
        </>
      ),
      es: (ui) => (
        <>
          el dormitorio (no la cámara: eso es <Fr ui={ui}>un appareil photo</Fr>)
        </>
      ),
    },
    ex: "Il dort dans sa chambre.",
  },
  {
    word: "le bureau",
    es: {
      fr: (ui) => (
        <>
          <Es ui={ui}>el escritorio</Es> (le meuble) ou <Es ui={ui}>el despacho</Es>,{" "}
          <Es ui={ui}>la oficina</Es> (le lieu)
        </>
      ),
      es: () => <>el escritorio (la mesa) o el despacho, la oficina (el lugar)</>,
    },
    ex: "Le bureau de ma mère est au premier étage.",
  },
  {
    word: "la cave",
    es: {
      fr: (ui) => (
        <>
          <Es ui={ui}>el sótano</Es> ou <Es ui={ui}>la bodega</Es> (pas <Es ui={ui}>la cueva</Es> :
          cela se dit <Fr ui={ui}>une grotte</Fr>)
        </>
      ),
      es: (ui) => (
        <>
          el sótano o la bodega (no la cueva: eso es <Fr ui={ui}>une grotte</Fr>)
        </>
      ),
    },
    ex: "Le vin est dans la cave.",
  },
  {
    word: "le sol",
    es: {
      fr: (ui) => (
        <>
          <Es ui={ui}>el suelo</Es> (pas <Es ui={ui}>el sol</Es> : cela se dit{" "}
          <Fr ui={ui}>le soleil</Fr>)
        </>
      ),
      es: (ui) => (
        <>
          el suelo (no el sol: eso es <Fr ui={ui}>le soleil</Fr>)
        </>
      ),
    },
    ex: "Le sol de la cuisine est froid.",
  },
  {
    word: "la cuisinière",
    es: {
      fr: (ui) => (
        <>
          dans une maison, <Es ui={ui}>la cocina</Es> ou <Es ui={ui}>el fogón</Es> ; et aussi{" "}
          <Es ui={ui}>la cocinera</Es>
        </>
      ),
      es: () => <>en una casa, la cocina o el fogón; y también la cocinera</>,
    },
    ex: "La cuisinière est à côté du frigo.",
  },
];

function FalseFriendsTable({ ui }: { ui: Ui }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>
          {ui === "fr"
            ? "Cinq faux amis de la maison, avec une phrase"
            : "Cinco falsos amigos de la casa, con una frase"}
        </caption>
        <thead>
          <tr>
            <th scope="col">{ui === "fr" ? "Mot" : "Palabra"}</th>
            <th scope="col">{ui === "fr" ? "En espagnol" : "En español"}</th>
            <th scope="col">{ui === "fr" ? "Exemple" : "Ejemplo"}</th>
          </tr>
        </thead>
        <tbody>
          {FALSE_FRIENDS.map((row) => (
            <tr key={row.word}>
              <th scope="row" className="fr" lang="fr">
                {row.word}
              </th>
              <td>{row.es[ui](ui)}</td>
              <td className="fr" lang="fr">
                {row.ex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ThereIs = () => (
  <div className="example" lang="fr">
    Chez moi, il y a une cuisine, un salon et deux chambres.
    <br />
    Dans mon appartement, il y a un petit balcon.
  </div>
);

const InRooms = () => (
  <div className="example" lang="fr">
    Dans la chambre, il y a un lit, une armoire et des étagères.
    <br />
    Dans le salon, il y a un canapé et deux lampes.
  </div>
);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section data-ui="fr">
        <h2>Les pièces de la maison</h2>

        <div className="rule">
          Apprenez chaque nom avec son article, parce que l’article dit le genre. Quand le nom
          commence par une voyelle, <span className="fr">l’</span> cache le genre : j’ajoute (f.).
          Pour dire ce qu’il y a chez vous : <span className="fr">Dans mon appartement, il y a…</span>{" "}
          (<span lang="es">en mi piso hay…</span>). Pour dire <span lang="es">« en mi casa »</span> :{" "}
          <span className="fr">chez moi</span>.
        </div>

        <WordTable ui="fr" caption="Dix pièces de la maison, avec leur article" rows={ROOMS} />

        <ThereIs />

        <p>
          <span className="fr">une pièce</span> veut dire <span lang="es">habitación</span> au sens
          large : <span className="fr">L’appartement a quatre pièces</span>. Les articles sont dans{" "}
          <Link href="/grammaire/les-articles-definis">Les articles définis</Link> et{" "}
          <Link href="/grammaire/les-articles-indefinis">Les articles indéfinis</Link>.
        </p>

        <div className="attention">
          En espagnol, <span lang="es">« baño »</span> sert pour tout. En français, il y a deux mots
          : <span className="fr">la salle de bains</span> est la pièce pour se doucher, et{" "}
          <span className="fr">les toilettes</span> est la pièce du <span lang="es">váter</span>.{" "}
          <span className="fr">les toilettes</span> s’emploie toujours au pluriel :{" "}
          <span className="fr">Où sont les toilettes ?</span>
        </div>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Los lugares de la casa:{" "}
          <span className="fr" lang="fr">
            les pièces
          </span>
        </h2>

        <div className="rule">
          Aprende cada nombre con su artículo, porque el artículo dice el
          género. Cuando el nombre empieza por vocal,{" "}
          <span className="fr" lang="fr">
            l’
          </span>{" "}
          esconde el género: lo marco con (f.). Para decir qué hay en tu casa:{" "}
          <span className="fr" lang="fr">
            Dans mon appartement, il y a…
          </span>{" "}
          (en mi piso hay…). Para decir «en mi casa»:{" "}
          <span className="fr" lang="fr">
            chez moi
          </span>
          .
        </div>

        <WordTable ui="es" caption="Diez lugares de la casa, con su artículo" rows={ROOMS} />

        <ThereIs />

        <p>
          <span className="fr" lang="fr">
            une pièce
          </span>{" "}
          es cualquier habitación de la casa:{" "}
          <span className="fr" lang="fr">
            L’appartement a quatre pièces
          </span>
          . Los artículos están en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>{" "}
          y{" "}
          <Link href="/grammaire/les-articles-indefinis" lang="fr">
            Les articles indéfinis
          </Link>
          .
        </p>

        <div className="attention">
          En español, «baño» sirve para todo. En francés hay dos palabras:{" "}
          <span className="fr" lang="fr">
            la salle de bains
          </span>{" "}
          es donde te duchas, y{" "}
          <span className="fr" lang="fr">
            les toilettes
          </span>{" "}
          es donde está el váter.{" "}
          <span className="fr" lang="fr">
            les toilettes
          </span>{" "}
          va siempre en plural:{" "}
          <span className="fr" lang="fr">
            Où sont les toilettes ?
          </span>
        </div>
      </section>

      <section data-ui="fr">
        <h2>Les meubles</h2>

        <div className="rule">
          Il y a ici des meubles et aussi quelques objets de la maison. Pour un seul objet, on dit{" "}
          <span className="fr">un</span> ou <span className="fr">une</span> ; pour plusieurs,{" "}
          <span className="fr">des</span>. Le pluriel s’entend dans l’article, presque jamais dans
          le nom (<Link href="/grammaire/le-singulier-et-le-pluriel">Le singulier et le pluriel</Link>
          ).
        </div>

        <WordTable
          ui="fr"
          caption="Dix meubles et objets de la maison, avec leur article"
          rows={FURNITURE}
        />

        <InRooms />

        <p>
          <span className="fr">le frigo</span> est le mot de tous les jours pour{" "}
          <span className="fr">le réfrigérateur</span>.
        </p>
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Los muebles:{" "}
          <span className="fr" lang="fr">
            les meubles
          </span>
        </h2>

        <div className="rule">
          Aquí hay muebles y también algunos objetos de la casa. Con un solo
          objeto usas{" "}
          <span className="fr" lang="fr">
            un
          </span>{" "}
          o{" "}
          <span className="fr" lang="fr">
            une
          </span>
          ; con varios,{" "}
          <span className="fr" lang="fr">
            des
          </span>
          . El plural se oye en el artículo, casi nunca en el nombre (
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          ).
        </div>

        <WordTable
          ui="es"
          caption="Diez muebles y objetos de la casa, con su artículo"
          rows={FURNITURE}
        />

        <InRooms />

        <p>
          <span className="fr" lang="fr">
            le frigo
          </span>{" "}
          es la palabra de todos los días para{" "}
          <span className="fr" lang="fr">
            le réfrigérateur
          </span>
          .
        </p>
      </section>

      <section data-ui="fr">
        <h2>Cinq mots qui trompent : les faux amis</h2>

        <div className="rule">
          Ces mots ressemblent à un mot espagnol, mais ils veulent dire autre chose. Apprenez le mot
          français avec sa phrase.
        </div>

        <FalseFriendsTable ui="fr" />
      </section>

      <section data-ui="es" lang="es">
        <h2>
          Cinco palabras que te engañan:{" "}
          <span className="fr" lang="fr">
            les faux amis
          </span>
        </h2>

        <div className="rule">
          Estas palabras se parecen a una palabra española, pero significan otra
          cosa. Aprende la palabra francesa con su frase.
        </div>

        <FalseFriendsTable ui="es" />
      </section>

      <div className="resume" data-ui="fr">
        <h2>En résumé</h2>
        <ul>
          <li>
            Apprenez chaque nom avec son article : <span className="fr">la cuisine</span>,{" "}
            <span className="fr">le salon</span>.
          </li>
          <li>
            Pour dire ce qu’il y a : <span className="fr">Dans mon appartement, il y a…</span> (
            <span lang="es">en mi piso hay…</span>) et <span className="fr">chez moi</span> (
            <span lang="es">en mi casa</span>).
          </li>
          <li>
            <span className="fr">la salle de bains</span> sert à se doucher ;{" "}
            <span className="fr">les toilettes</span> s’emploie au pluriel.
          </li>
          <li>
            <span className="fr">la chambre</span> est <span lang="es">el dormitorio</span>, pas{" "}
            <span lang="es">la cámara</span> ; <span className="fr">le sol</span> est{" "}
            <span lang="es">el suelo</span>, pas <span lang="es">el sol</span>.
          </li>
          <li>
            <span className="fr">le bureau</span> est <span lang="es">el escritorio</span> et aussi{" "}
            <span lang="es">la oficina</span> ; <span className="fr">la cave</span> est{" "}
            <span lang="es">el sótano</span>, pas <span lang="es">la cueva</span> ;{" "}
            <span className="fr">la cuisinière</span> est <span lang="es">la cocina</span> et aussi{" "}
            <span lang="es">la cocinera</span>.
          </li>
        </ul>
      </div>

      <div className="resume" data-ui="es" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Aprende cada nombre con su artículo:{" "}
            <span className="fr" lang="fr">
              la cuisine
            </span>
            ,{" "}
            <span className="fr" lang="fr">
              le salon
            </span>
            .
          </li>
          <li>
            Para decir qué hay:{" "}
            <span className="fr" lang="fr">
              Dans mon appartement, il y a…
            </span>{" "}
            (en mi piso hay…) y{" "}
            <span className="fr" lang="fr">
              chez moi
            </span>{" "}
            (en mi casa).
          </li>
          <li>
            <span className="fr" lang="fr">
              la salle de bains
            </span>{" "}
            es para ducharse;{" "}
            <span className="fr" lang="fr">
              les toilettes
            </span>{" "}
            va en plural.
          </li>
          <li>
            <span className="fr" lang="fr">
              la chambre
            </span>{" "}
            es el dormitorio, no la cámara;{" "}
            <span className="fr" lang="fr">
              le sol
            </span>{" "}
            es el suelo, no el sol.
          </li>
          <li>
            <span className="fr" lang="fr">
              le bureau
            </span>{" "}
            es el escritorio y también la oficina;{" "}
            <span className="fr" lang="fr">
              la cave
            </span>{" "}
            es el sótano, no la cueva;{" "}
            <span className="fr" lang="fr">
              la cuisinière
            </span>{" "}
            es la cocina de gas y también la cocinera.
          </li>
        </ul>
      </div>
    </article>
  );
}
