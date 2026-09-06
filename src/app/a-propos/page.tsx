import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Ce qu’est Le Petit Cours, et sous quelle licence le réutiliser.",
};

/* Deliberately bare. The audience, the principles and the state of the rewrite
   were all described here and are all better said elsewhere — or not yet worth
   saying. What is left is the one thing that has to live on the site rather
   than in the repository: the licence, and the attribution a reuser owes. The
   prose is due a pass; this is the floor, not the intent. */
export default function AProposPage() {
  return (
    <article className="prose">
      <h1>À propos</h1>

      <p>
        <strong>Le Petit Cours</strong> est un cours de français gratuit et
        hors ligne, en cours d&rsquo;écriture.
      </p>

      <section>
        <h2>Licence</h2>
        <p>
          Le code est sous licence MIT, le contenu sous CC BY-SA 4.0, et tout est
          public sur{" "}
          <a href="https://github.com/kevjrmy/le-petit-cours">GitHub</a>.
        </p>
        {/* The attribution a reuser owes, in the exact form `LICENSE-CONTENT`
            asks for — credit the project, link the repository. Copied rather
            than reworded on purpose: two documents describing the same
            obligation differently is worse than one describing it nowhere, and
            this is the copy a reader will actually find. If LICENSE-CONTENT's
            attribution clause changes, change this in the same commit.

            It credits « Le Petit Cours » and not a person, which is why the
            open question of a legal name in the MIT copyright line does not
            reach this page. */}
        <p>
          Pour réutiliser une page : créditez « Le Petit Cours » avec un lien
          vers <a href="https://github.com/kevjrmy/le-petit-cours">le dépôt</a>,
          signalez vos modifications, et publiez votre version sous la même
          licence. Les citations et les images empruntées ne sont pas
          concernées : elles restent à leurs auteurs, et la page qui les emploie
          indique sa source.
        </p>
      </section>
    </article>
  );
}
