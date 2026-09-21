import { Corrige } from "@/components/delf/Corrige";
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
 * **Le corrigé d'une production n'est pas une réponse, c'est une grille.** Un
 * texte de soixante mots a des centaines de versions justes, alors le bloc du
 * bas donne ce que l'examinateur regarde, dans l'ordre où il le regarde, puis
 * un exemple de texte qui vaudrait tous les points — présenté comme un exemple
 * et non comme *la* réponse (#54).
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
          Deux textes courts à écrire. Vous pouvez écrire directement dans la
          page. Comptez vos mots : la longueur demandée fait partie de la
          consigne, et c’est le point le plus facile à perdre.
        </p>

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

          <textarea
            className="redaction"
            aria-label="Votre journal personnel, 60 à 80 mots"
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

          <textarea
            className="redaction"
            aria-label="Votre réponse à Claire, 60 à 80 mots"
            placeholder="Chère Claire,"
          />
        </div>
      </section>

      <section>
        <h2>Les corrections</h2>

        <p>
          Écrivez vos deux textes en entier avant d’ouvrir cette partie. Un
          modèle lu d’avance devient le texte que vous recopiez, et ce n’est pas
          ce qui est noté.
        </p>

        <Corrige>
          <h3>Ce que l’examinateur regarde</h3>
          <p>
            Dans cet ordre. Les premiers points sont les plus faciles à avoir et
            les plus faciles à perdre.
          </p>
          <ol>
            <li>
              <strong>La consigne est respectée.</strong> Les quatre choses
              demandées à l’exercice 2 sont là : remercier, refuser, expliquer,
              proposer. Il en manque une et les points partent, même si le
              français est bon.
            </li>
            <li>
              <strong>La longueur y est.</strong> 60 à 80 mots. Nettement moins
              coûte des points ; trois mots de moins, non.
            </li>
            <li>
              <strong>Le texte se tient.</strong> Une formule pour commencer,
              une pour finir, et des mots qui relient :{" "}
              <span className="fr">d’abord</span>,{" "}
              <span className="fr">ensuite</span>,{" "}
              <span className="fr">mais</span>,{" "}
              <span className="fr">parce que</span>.
            </li>
            <li>
              <strong>Le vocabulaire est celui du sujet</strong>, même simple,
              et employé juste.
            </li>
            <li>
              <strong>La grammaire courante est correcte</strong> : accords,
              passé composé, déterminants. C’est le dernier critère, pas le
              premier.
            </li>
          </ol>

          <h3>Exercice 1 · un exemple à 13 points</h3>
          <p>
            Un exemple parmi des centaines. Le vôtre est juste s’il fait ce que
            fait celui-ci, pas s’il lui ressemble.
          </p>
          <div className="example">
            Samedi matin, je suis arrivée à Nantes en train. J’ai laissé mes
            affaires à l’hôtel et je suis allée directement au château. Il
            faisait froid mais le soleil brillait. L’après-midi, j’ai visité le
            musée, qui était gratuit ce jour-là. Le soir, j’ai mangé une crêpe
            dans une petite rue près du port. Dimanche, il a plu toute la
            journée et les musées étaient fermés. C’est dommage, mais je vais
            revenir au printemps.
          </div>
          <p>
            Soixante-dix-sept mots. Le passé composé raconte, l’imparfait
            décrit, et la dernière phrase donne l’avis que la consigne demande.
          </p>

          <h3>Exercice 2 · un exemple à 12 points</h3>
          <div className="example">
            Chère Claire,
            <br />
            Merci beaucoup pour ton invitation, ça me touche vraiment. Malheureusement
            je ne peux pas venir samedi 14 : je travaille tout le week-end,
            parce qu’une collègue est malade et que je la remplace. Je suis
            désolée, j’aurais vraiment aimé être là pour tes trente ans.
            Est-ce que tu es libre le week-end suivant ? Je t’invite au
            restaurant, tous les deux, et on fête ça tranquillement.
            <br />
            Réponds-moi vite. Bises,
          </div>
          <p>
            Les quatre actes sont là, dans l’ordre :{" "}
            <span className="fr">merci beaucoup</span> remercie,{" "}
            <span className="fr">je ne peux pas venir</span> refuse,{" "}
            <span className="fr">parce que</span> explique,{" "}
            <span className="fr">est-ce que tu es libre</span> propose. Sans le
            quatrième, cette copie perd des points même sans une seule faute.
          </p>

          <h3>Votre note</h3>
          <p>
            13 et 12 font 25. Comptez large sur la consigne et sévère sur la
            longueur : c’est ce que fait le correcteur.
          </p>
        </Corrige>
      </section>
    </article>
  );
}
