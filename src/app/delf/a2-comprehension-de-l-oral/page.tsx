import { Fragment } from "react";
import { Copie, Correction, Questions } from "@/components/delf/Copie";
import { Corrige } from "@/components/delf/Corrige";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { COPIE, SITUATIONS, TEXTES } from "./copie";

const PATH = "/delf/a2-comprehension-de-l-oral";

export const metadata = lessonMetadata(PATH);

/* Les points viennent de `COPIE`, qui les vérifie ; ici, seulement la
   consigne de chaque exercice. */
const CONSIGNES: Record<number, string> = {
  1: "Vous entendez quatre annonces. Pour chaque document, choisissez la bonne réponse.",
  2: "Vous entendez trois messages sur votre répondeur. Deux questions par message.",
  3: "Vous entendez trois conversations. Deux questions par conversation.",
  4: "Vous entendez quatre conversations. Pour chacune, choisissez la situation qui correspond. Deux situations ne servent pas.",
};

/**
 * L'épreuve de compréhension de l'oral du DELF A2, lue par une personne (#82).
 *
 * **La page se passe à deux.** Le candidat répond sur son écran ; la personne
 * qui fait passer l'épreuve lit les textes, rangés en bas derrière leur propre
 * bouton. Ils sont cachés pour la même raison qu'un corrigé : sous les yeux du
 * candidat, ils sont les réponses.
 *
 * **Les textes sont rendus avant les corrections**, parce que la personne qui
 * lit en a besoin pendant l'épreuve et le candidat seulement après. Les questions, le
 * barème et les textes vivent dans `copie.ts`.
 */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <Copie copie={COPIE}>
        <section>
          <h2>L’épreuve</h2>

          <p className="epreuve">
            <span>25 points</span>
            <span>25 minutes</span>
            <span>4 exercices</span>
            <span>14 documents</span>
          </p>

          <p>
            Cette épreuve se passe à deux. Une personne lit les documents à voix
            haute ; vous répondez en cliquant. Chaque document est lu{" "}
            <strong>deux fois</strong> : lisez les questions avant la première
            lecture, répondez après, vérifiez pendant la seconde.
          </p>

          <div className="attention">
            les textes à lire sont en bas de la page, sous « Les textes à lire
            ». La personne qui lit les ouvre sur son écran à elle, pas sur le
            vôtre.
          </div>

          {COPIE.exercices.map(({ numero, points }) => (
            <div className="exercice" key={numero}>
              <h3>
                Exercice {numero}{" "}
                <span className="points">{points} points</span>
              </h3>
              <p>{CONSIGNES[numero]}</p>

              {numero === 4 && (
                <ul className="documents">
                  {SITUATIONS.map((situation, index) => (
                    <li key={situation}>
                      <span>{situation}</span>
                      <span className="lettre">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <Questions groupe={String(numero)} />
            </div>
          ))}
        </section>

        <section>
          <h2>Les textes à lire</h2>

          <p>
            Pour la personne qui fait passer l’épreuve. Lisez chaque document
            deux fois, à vitesse normale, avec une pause d’une trentaine de
            secondes entre les deux lectures et après la seconde. Dans un
            dialogue, changez un peu de voix à chaque tiret.
          </p>

          <Corrige
            id="textes"
            ouvrir="Montrer les textes à lire"
            fermer="Cacher les textes à lire"
          >
            {COPIE.exercices.map(({ numero }) => (
              <Fragment key={numero}>
                <h3>Exercice {numero}</h3>
                {TEXTES.filter((texte) => texte.exercice === numero).map(
                  (texte) => (
                    <div key={texte.numero} className="document">
                      <h4>Document {texte.numero}</h4>
                      <p className="entete">{texte.cadre}</p>
                      {texte.lignes.map((ligne) => (
                        <p key={ligne}>{ligne}</p>
                      ))}
                    </div>
                  ),
                )}
              </Fragment>
            ))}
          </Corrige>
        </section>

        <section>
          <h2>Les corrections</h2>

          <p>
            Quand les quatorze documents ont été lus, corrigez. Une question
            laissée blanche vaut zéro : mieux vaut une réponse au hasard que pas
            de réponse.
          </p>

          <Correction>
            <p>
              Relisez ensuite les textes à deux, en entier : une réponse fausse
              vient presque toujours d’un mot entendu à moitié, et c’est ce mot
              qu’il faut retrouver.
            </p>
          </Correction>
        </section>
      </Copie>
    </article>
  );
}
