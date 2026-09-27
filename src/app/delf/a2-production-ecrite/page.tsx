import { Chrono } from "@/components/delf/Chrono";
import { Redaction } from "@/components/delf/Redaction";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/delf/a2-production-ecrite";

export const metadata = lessonMetadata(PATH);

/**
 * L'épreuve de production écrite du DELF A2, au format officiel (#78).
 *
 * Deux exercices, 13 et 12 points, quarante-cinq minutes : raconter un
 * événement, puis répondre à une lettre amicale. Les deux sujets sont écrits
 * pour ce cours.
 *
 * **Pas de corrigé sur la page** (#82). Un texte de soixante mots a des
 * centaines de versions justes : il se corrige à la main, par quelqu'un qui le
 * lit, et un modèle affiché dessous devient le texte qu'on recopie. La page
 * donne les deux sujets, le temps et le nombre de mots, et rien d'autre.
 */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>L’épreuve</h2>

        <p className="epreuve">
          <span>25 points</span>
          <span>45 minutes</span>
          <span>2 exercices</span>
        </p>

        <p>
          Deux textes courts à écrire, directement dans la page. Le nombre de
          mots s’affiche sous chaque texte : la longueur demandée fait partie de
          la consigne, et c’est le point le plus facile à perdre.
        </p>

        <Chrono minutes={45} libelle="Temps de l’épreuve" />

        <div className="exercice">
          <h3>
            Exercice 1 <span className="points">13 points</span>
          </h3>

          <p>
            Vous avez passé le week-end dernier dans une ville que vous ne
            connaissiez pas. Vous racontez ce week-end dans votre journal
            personnel : ce que vous avez fait, ce que vous avez aimé, ce qui
            vous a déplu. <strong>Écrivez un texte de 60 à 80 mots.</strong>
          </p>

          <Redaction
            min={60}
            max={80}
            libelle="Votre journal personnel, 60 à 80 mots"
            placeholder="Samedi matin…"
          />
        </div>

        <div className="exercice">
          <h3>
            Exercice 2 <span className="points">12 points</span>
          </h3>

          <p>Vous recevez ce message d’une amie.</p>

          <div className="document">
            <p className="entete">
              <strong>De :</strong> claire.mercier@courriel.fr
              <br />
              <strong>Objet :</strong> Samedi 14 ?
            </p>
            <p>Coucou,</p>
            <p>
              Je fête mes trente ans le samedi 14, chez moi, à partir de vingt
              heures. On sera une quinzaine, il y aura à manger, et tu connais
              déjà la moitié des gens.
            </p>
            <p>
              Dis-moi vite si tu viens, parce que je dois commander le repas
              lundi.
            </p>
            <p>Bises, Claire</p>
          </div>

          <p>
            Vous répondez à Claire. Vous la remerciez, vous lui dites que vous
            ne pouvez pas venir, vous expliquez pourquoi, et vous lui proposez
            autre chose. <strong>Écrivez un texte de 60 à 80 mots.</strong>
          </p>

          <Redaction
            min={60}
            max={80}
            libelle="Votre réponse à Claire, 60 à 80 mots"
            placeholder="Chère Claire,"
          />
        </div>
      </section>
    </article>
  );
}
