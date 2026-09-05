import type { Metadata } from "next";

export const metadata: Metadata = { title: "À propos" };

export default function AProposPage() {
  return (
    <div className="prose">
      <h1>À propos</h1>
      <p style={{ marginTop: "0.75rem" }}>
        <strong>Le Petit Cours</strong> est un cours de français gratuit, écrit
        pour deux lecteurs : celui qui parle espagnol et apprend le français
        depuis le début, et celui qui parle déjà français en famille mais ne
        l&rsquo;a jamais écrit.
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        Le site fonctionne hors ligne et ne mesure rien de ce que vous faites.
        Le code est sous licence MIT, le contenu sous CC BY-SA 4.0, et tout se
        trouve sur{" "}
        <a href="https://github.com/kevjrmy/le-petit-cours">GitHub</a> — les
        corrections du français et de l&rsquo;espagnol sont les bienvenues.
      </p>
      <div className="attention" style={{ marginTop: "1.25rem" }}>
        le site est en cours de réécriture. Les leçons arrivent chapitre par
        chapitre.
      </div>
    </div>
  );
}
