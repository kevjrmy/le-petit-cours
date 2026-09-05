import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Un cours de français gratuit et hors ligne pour hispanophones, et pour ceux qui parlent français sans l'avoir jamais écrit.",
};

export default function AProposPage() {
  return (
    <article className="prose">
      <h1>À propos</h1>

      <section>
        <p>
          <strong>Le Petit Cours</strong> est un cours de français gratuit,
          écrit pour deux lecteurs qui n&rsquo;ont pas besoin de la même chose.
        </p>
        <p>
          Le premier parle espagnol et apprend le français depuis le début. Tout
          lui est expliqué en espagnol, en s&rsquo;appuyant sur ce que les deux
          langues ont en commun — et en signalant ce qu&rsquo;elles n&rsquo;ont
          que l&rsquo;air d&rsquo;avoir en commun.
        </p>
        <p>
          Le second parle déjà français, en famille, mais ne l&rsquo;a jamais
          écrit. Pour lui les pages d&rsquo;orthographe et de conjugaison sont en
          français : ce qui manque n&rsquo;est pas la langue, c&rsquo;est
          l&rsquo;écrit.
        </p>
      </section>

      <section>
        <h2>Ce que le site ne fait pas</h2>
        <ul>
          <li>
            Aucune mesure de ce que vous faites : ni statistiques, ni suivi, ni
            publicité.
          </li>
          <li>
            Ni séries, ni rappels, ni objectif quotidien. Vous cochez une leçon
            quand <em>vous</em> estimez l&rsquo;avoir finie — l&rsquo;application
            ne prétend jamais savoir ce que vous avez appris.
          </li>
          <li>
            Tout le contenu est en accès libre. Un compte, quand il existera, ne
            gardera qu&rsquo;une adresse électronique, vos leçons cochées et le
            niveau que vous avez choisi. Rien d&rsquo;autre.
          </li>
          <li>
            Le site fonctionne hors ligne : une fois les pages visitées, elles
            restent lisibles dans le métro.
          </li>
        </ul>
      </section>

      <section>
        <h2>Licence et corrections</h2>
        <p>
          Le code est sous licence MIT, le contenu sous CC BY-SA 4.0, et tout est
          public sur{" "}
          <a href="https://github.com/kevjrmy/le-petit-cours">GitHub</a>.
        </p>
        <div className="attention">
          c&rsquo;est du matériel pédagogique, donc une page fausse enseigne
          l&rsquo;erreur. Les corrections du français et de l&rsquo;espagnol sont
          les contributions les plus utiles — elles se signalent par une issue
          sur GitHub.
        </div>
      </section>

      <section>
        <h2>Où en est le site</h2>
        <p>
          Il est en cours de réécriture. Les chapitres s&rsquo;annoncent dans le
          sommaire au fur et à mesure ; ceux marqués <em>Bientôt</em> sont
          prévus, pas encore écrits.
        </p>
      </section>
    </article>
  );
}
