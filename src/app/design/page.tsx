import type { Metadata } from "next";
import Link from "next/link";
import { Associer } from "@/components/delf/Associer";
import { Copie, Correction, Questions } from "@/components/delf/Copie";
import type { CopieEpreuve } from "@/components/delf/copie-data";
import { Redaction } from "@/components/delf/Redaction";
import { Tirage } from "@/components/delf/Tirage";
import board from "@/components/exercice/Board.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Système de design",
  robots: { index: false, follow: false },
};

/* A specimen of every shared pattern in globals.css, on one page.
   It is deliberately absent from src/data/navigation.ts: nothing links here,
   and it is not a lesson. It exists so a visual change can be checked in both
   themes at both breakpoints (AGENTS.md §11) without a lesson to check it on.
   Delete it the day the real pages cover the same ground. */
/* The type scale, smallest first: the token, and what wears it. */
const TYPE = [
  ["66", "Une étiquette sur une ligne"],
  ["72", "Une marque, une ligne de métadonnées"],
  ["80", "Un libellé, un compte, une note"],
  ["85", "Les menus, le fil d’Ariane"],
  ["90", "Un bouton, la barre latérale"],
  ["95", "Une légende, un verdict"],
  ["100", "Le texte courant"],
  ["106", "Le français à la taille du texte"],
  ["112", "La phrase d’un exercice"],
  ["120", "Un titre de niveau 3"],
  ["150", "Un titre de niveau 2, un score"],
  ["210", "Le titre de la page"],
] as const;

/* The spacing scale: every step, drawn at its own width. */
const SPACE = [2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 80, 88] as const;

/* The five radii, smallest first: the token, and what it rounds. */
const RADII = [
  ["xs", "un drapeau"],
  ["sm", "un bouton, un champ"],
  ["", "une carte, un encadré"],
  ["lg", "le champ de recherche"],
  ["pill", "une pastille"],
] as const;

const SURFACES = [
  ["--surface-app", "var(--surface-app)"],
  ["--surface-1", "var(--surface-1)"],
  ["--surface-2", "var(--surface-2)"],
  ["--surface-3", "var(--surface-3)"],
  ["--surface-sidebar", "var(--surface-sidebar)"],
  ["--accent-soft", "var(--accent-soft)"],
  ["--warn-soft", "var(--warn-soft)"],
  ["--danger-soft", "var(--danger-soft)"],
  ["--success-soft", "var(--success-soft)"],
] as const;

/* Une copie d'une question, pour voir les trois états une fois corrigée.
   Elle ne passe pas par `verifierCopie`, qui exige 25 points. */
const SPECIMEN_COPIE: CopieEpreuve = {
  exercices: [{ numero: 1, points: 1.5 }],
  questions: [
    {
      id: "s",
      exercice: 1,
      groupe: "specimen",
      enonce: "Ici, il faut monter à pied.",
      parties: [
        { options: ["A", "B"], reponse: 0, points: 0.5 },
        {
          consigne: "La phrase qui le montre :",
          options: ["« Ascenseur en panne »", "« bonnet obligatoire »"],
          reponse: 0,
          points: 1,
        },
      ],
      pourquoi: "A · l’ascenseur est en panne, donc on monte à pied.",
    },
  ],
};

/* Deux phrases à glisser sur deux panneaux, et un panneau qui ne sert pas. */
const SPECIMEN_ASSOCIER: CopieEpreuve = {
  exercices: [{ numero: 1, points: 2 }],
  questions: [
    {
      id: "a1",
      exercice: 1,
      groupe: "associer",
      enonce: "Ici, il faut monter à pied.",
      parties: [{ options: ["A", "B", "C"], reponse: 0, points: 1 }],
      pourquoi: "A · l’ascenseur est en panne.",
    },
    {
      id: "a2",
      exercice: 1,
      groupe: "associer",
      enonce: "Il faut se couvrir la tête pour entrer.",
      parties: [{ options: ["A", "B", "C"], reponse: 1, points: 1 }],
      pourquoi: "B · le bonnet est obligatoire à la piscine.",
    },
  ],
};

export default function DesignPage() {
  return (
    <main className={`prose ${styles.page}`}>
      <header className={styles.section}>
        <h1>Système de design</h1>
        <p>
          Toutes les formes partagées de <code>globals.css</code>, sur une seule
          page. À vérifier dans les deux thèmes et aux deux largeurs.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Surfaces</h2>
        <div className={styles.swatches}>
          {SURFACES.map(([name, value]) => (
            <div
              key={name}
              className={styles.swatch}
              style={{ background: value }}
            >
              <code>{name}</code>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Le ciel</h2>
        <p>
          Le papier le jour, la nuit bleue le soir, et des étoiles d’or : le
          cours emprunte l’ambiance de la couverture du <i>Petit Prince</i>,
          jamais ses dessins (#100). <code>.ciel</code> pose quelques étoiles
          et une planète aux bords d’un bloc, en <code>--star</code>. C’est un
          ornement : il ne marque rien, et il n’entre jamais dans une leçon.
        </p>
        <div className={`ciel ${styles.sky}`}>
          <p className={styles.skyTitle}>Un titre sous les étoiles</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Titres</h2>
        <p>
          L’échelle entière, en Spectral 600. Le cours s’arrête à{" "}
          <code>h3</code> : en dessous, ce qu’il faut est presque toujours une
          étiquette et non un titre (voir « Astuce » plus bas).
        </p>
        <div className={styles.stack}>
          <h1>Le passé composé</h1>
          <h2>Le passé composé avec « avoir »</h2>
          <h3>Les verbes du premier groupe</h3>
          <h4>Un quatrième niveau, si une page en a besoin</h4>
          <p>
            Et le paragraphe qui suit, en Inter : c’est lui qui donne son sens à
            l’échelle, puisqu’un titre n’est grand que par rapport au texte
            qu’il annonce.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Espacements</h2>
        <p>
          Dix-sept pas, nommés par leurs pixels à la taille par défaut :{" "}
          <code>--space-*</code>. Toute marge, tout remplissage et tout écart
          en est un.
        </p>
        <ul className={styles.spaces}>
          {SPACE.map((step) => (
            <li key={step}>
              <span style={{ width: `var(--space-${step})` }} />
              <code>--space-{step}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Rayons</h2>
        <div className={styles.states}>
          {RADII.map(([step, role]) => {
            const token = step ? `--radius-${step}` : "--radius";
            return (
              <span
                key={token}
                className={styles.state}
                style={{ borderRadius: `var(${token})` }}
              >
                {role} <code>{token}</code>
              </span>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2>L’échelle des tailles</h2>
        <p>
          Douze tailles, et pas une de plus : <code>--type-*</code>, nommées
          par leur pourcentage du texte courant.
        </p>
        <ul className={styles.scale}>
          {TYPE.map(([step, role]) => (
            <li key={step} style={{ fontSize: `var(--type-${step})` }}>
              {role} <code>--type-{step}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Le français en serif, l’explication en sans</h2>
        <p>
          Tout le cours est écrit en français (#53) : les deux familles ne
          séparent donc plus deux langues, mais deux rôles. Le serif porte la
          langue étudiée — <span className="fr">une robe</span>,{" "}
          <span className="fr">le sol</span> — et le sans porte la phrase qui
          l’explique.
        </p>
        <div className="example">
          le livre · la table · l’école · les sœurs · un garçon
        </div>
        <p>
          À l’A1, un texte littéraire se lit avec l’espagnol sous chaque ligne
          (#92) : le français garde le serif, l’espagnol passe en sans, plus
          discret.
        </p>
        <div className="example">
          <p className="bilingue">
            <span lang="fr">Il faut, autant qu’on peut, obliger tout le monde :</span>
            <span lang="es">Hay que ayudar a todo el mundo, siempre que se pueda:</span>
          </p>
          <p className="bilingue">
            <span lang="fr">On a souvent besoin d’un plus petit que soi.</span>
            <span lang="es">a menudo necesitamos a alguien más pequeño que nosotros.</span>
          </p>
        </div>
        <p>
          Un récit tient en plusieurs paragraphes : <code>.example.recit</code>{" "}
          les sépare. Sans lui, les lignes restent serrées, comme il le faut
          pour un dialogue ou des vers.
        </p>
        <div className="example recit">
          <p>
            Ulysse veut rentrer chez lui, mais le voyage est long. Un jour, il
            arrive sur une île.
          </p>
          <p>Le soir, le maître de la grotte rentre avec son troupeau.</p>
        </div>
        <p>
          Sans cette séparation, une forme citée au milieu d’un paragraphe se
          confond avec le paragraphe : <span className="fr">une sœur</span>{" "}
          prend un <em>e</em> au féminin. Le serif seul y serait trop discret :
          la forme citée prend aussi le demi-gras, la graisse d’une tête de
          ligne dans un tableau. Ni couleur ni fond. Dans un bloc d’exemples ou
          un nuage de mots, tout est déjà du français, et elle garde la graisse
          du bloc.
        </p>
        <p>
          Une forme citée pour dire qu’elle est fausse ne doit pas être la plus
          visible des deux. Elle garde la graisse du texte, elle est en italique
          et elle est barrée, dans le rouge de la mauvaise réponse : on dit{" "}
          <span className="fr">je sors ensuite</span>, on ne dit pas{" "}
          <s className="fr">je sors puis</s>. Le trait porte le sens, pas la
          couleur. Il ne sert que pour une forme fausse telle qu’elle est
          écrite, jamais pour un mot correct qui serait seulement le mauvais
          choix.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Blocs de contenu</h2>
        <div className={styles.stack}>
          <div className="rule">
            <strong>La règle.</strong> Le déterminant s’accorde en genre et en
            nombre avec le nom qu’il précède.
          </div>
          <div className="astuce">
            <p className="astuce-hook">
              Pays en <strong>-e</strong> → <strong>en</strong>
            </p>
            <p>en France, en Espagne, en Italie.</p>
          </div>
          <div className="exception">Au Mexique, au Cambodge, au Zimbabwe.</div>
          <div className="attention">
            Un <span className="fr" lang="fr">œuf</span> se prononce « euf », mais
            des <span className="fr" lang="fr">œufs</span> se prononce « eu ».
          </div>
          <div className={styles.stack} lang="es">
            <div className="attention">
              En una página A1 (#85), la explicación está en español y las
              etiquetas cambian solas: <span className="fr" lang="fr">une
              robe</span> es un vestido.
            </div>
            <div className="exception">
              <span className="fr" lang="fr">au Mexique</span>: el nombre
              acaba en <em>-e</em>, pero es masculino.
            </div>
          </div>
          <div className="resume">
            <h2>En résumé</h2>
            <ul>
              <li>Le résumé redit la leçon, il n’y ajoute rien.</li>
              <li>
                Quatre ou cinq lignes, au pied des leçons de prose seulement.
              </li>
              <li>
                Neutre exprès : la couleur reste aux blocs qu’il résume.
              </li>
            </ul>
          </div>
          <ul className="mots">
            <li>les horaires</li>
            <li>la pause déjeuner</li>
            <li>les congés</li>
            <li>un jour férié</li>
            <li>mon ancien travail</li>
            <li>tutoyer</li>
            <li>vouvoyer</li>
          </ul>
          <ul className="mots" lang="es">
            <li>
              <span className="fr" lang="fr">bonjour</span> (hola)
            </li>
            <li>
              <span className="fr" lang="fr">je voudrais</span> (quisiera)
            </li>
          </ul>
          <div className="message">
            Un message de l&rsquo;interface, neutre. Rien n&rsquo;est ajouté
            devant, contrairement aux blocs de leçon ci-dessus.
          </div>
          <div className="message message-danger">
            Ce lien n&rsquo;est plus valable. Demandez-en un nouveau.
          </div>
          <div className="message message-success">Nom enregistré.</div>
          <div className={styles.elevated}>
            Ce qui flotte au-dessus de la page, un menu ou un panneau :{" "}
            <code>--shadow</code>. Tout le reste est plat, avec une bordure.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Tableaux</h2>
        <div className="table-wrap">
          <table>
            <caption>Les articles définis</caption>
            <thead>
              <tr>
                <th scope="col">Genre</th>
                <th scope="col">Français</th>
                <th scope="col">Español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin</th>
                <td className="fr" lang="fr">le livre</td>
                <td>el libro</td>
              </tr>
              <tr>
                <th scope="row">féminin</th>
                <td className="fr" lang="fr">la table</td>
                <td>la mesa</td>
              </tr>
              <tr>
                <th scope="row">pluriel</th>
                <td className="fr" lang="fr">les écoles</td>
                <td>las escuelas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Retours d’exercice</h2>
        <p>
          La couleur ne porte jamais le sens toute seule : chaque état dit aussi
          quelque chose. Le premier est le choix, avant la vérification : son
          trait s’épaissit. Le dernier ne sert qu’aux questions à plusieurs
          réponses, où oublier une case n’est pas la même faute que cocher la
          mauvaise.
        </p>
        <div className={styles.states}>
          <span className={`${styles.state} is-chosen`}>
            <span className="fr" lang="fr">la table</span> : choisi
          </span>
          <span className={`${styles.state} is-correct`}>
            ✓ <span className="fr" lang="fr">la table</span> : juste
          </span>
          <span className={`${styles.state} is-wrong`}>
            ✗ <span className="fr" lang="fr">le table</span> : faux
          </span>
          <span className={`${styles.state} is-missed`}>
            + <span className="fr" lang="fr">là table</span> : oublié
          </span>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Le plateau d’exercice</h2>
        <p>
          Un seul plateau pour tous les exercices
          (<code>Board.module.css</code>) : la carte, la phrase et son trou, le
          tirage, le verdict. Un exercice n’écrit que ce que sa mécanique
          ajoute.
        </p>
        <div className={`card ${board.card}`} lang="fr">
          <p className={board.sentence}>
            Je bois <span className={`${board.slot} ${board.filled}`}>du</span>{" "}
            café et <span className={board.slot}>{"\u00a0"}</span> eau.
          </p>
          <div className={board.pool}>
            <button type="button" className={`${board.chip} is-chosen`}>
              du
            </button>
            <button type="button" className={board.chip}>
              de la
            </button>
            <button type="button" className={board.chip}>
              de l’
            </button>
            <button type="button" className={board.chip} disabled>
              des
            </button>
          </div>
          <div className={`${board.verdict} is-correct`}>
            <p>✓ Juste.</p>
            <p className={board.corrected}>
              Je bois <strong>du</strong> café.
            </p>
          </div>
        </div>
        <div className={`card ${board.card} ${board.text}`} lang="fr">
          <p>
            Il pleut,{" "}
            <button type="button" className={`${board.slot} ${board.filled}`}>
              donc
            </button>{" "}
            je prends le bus,{" "}
            <button type="button" className={`${board.slot} ${board.active}`}>
              {"\u00a0"}
            </button>{" "}
            il est en retard.
          </p>
        </div>
        <p className={board.words} lang="fr">
          <button type="button" className={board.word}>
            Elle
          </button>
          <button type="button" className={`${board.word} is-chosen`}>
            et
          </button>
          <button type="button" className={board.word}>
            partie.
          </button>
        </p>
      </section>

      <section className={styles.section}>
        <h2>Champs et libellés</h2>
        <p>
          Un seul champ, <code>.input</code>, pour une ligne comme pour une
          page ; un seul libellé, <code>.label</code>, pour le nom d’un champ,
          le titre d’une liste et l’en-tête d’une colonne.
        </p>
        <div>
          <label className="label" htmlFor="specimen-champ">
            Nom d’utilisateur
          </label>
          <input id="specimen-champ" className="input" placeholder="camille" />
        </div>
        <textarea
          className="input"
          rows={3}
          lang="fr"
          aria-label="Texte, spécimen"
          placeholder="Écrivez votre version ici."
        />
      </section>

      <section className={styles.section}>
        <h2>L’épreuve de DELF</h2>
        <p>
          Les motifs du chapitre <code>delf</code> (#78, #82). Les documents
          sont du HTML statique&nbsp;; les réponses sont des îlots&nbsp;: une
          copie qui se clique ou se glisse et se corrige d’un coup, un compteur de
          mots et un tirage.
        </p>

        <p className="epreuve">
          <span>25 points</span>
          <span>30 minutes</span>
          <span>4 exercices</span>
        </p>

        <Copie copie={SPECIMEN_COPIE}>
          <div className="exercice">
            <h3>
              Exercice 1 <span className="points">1,5 point</span>
            </h3>
            <p>Vous lisez ces panneaux.</p>
            <ul className="documents">
              <li>
                <span>Ascenseur en panne</span>
                <span className="lettre">A</span>
              </li>
              <li>
                <span>Piscine — bonnet obligatoire</span>
                <span className="lettre">B</span>
              </li>
            </ul>
            <Questions groupe="specimen" />
          </div>

          <div className="document">
            <h4>À Sainte-Colombe, le bus ne coûte plus rien</h4>
            <p>
              Depuis le mois de janvier, les quatre lignes de bus de
              Sainte-Colombe sont gratuites.
            </p>
            <p className="notes">
              *les impôts&nbsp;: l’argent que chacun donne à l’État
            </p>
          </div>

          <Correction />
        </Copie>

        <Copie copie={SPECIMEN_ASSOCIER}>
          <Associer
            groupe="associer"
            documents={[
              { lettre: "A", texte: "Ascenseur en panne" },
              { lettre: "B", texte: "Piscine — bonnet obligatoire" },
              { lettre: "C", texte: "Pelouse interdite aux chiens" },
            ]}
          />
          <Correction />
        </Copie>

        <Redaction min={60} max={80} libelle="Rédaction, spécimen" />

        <Tirage sujets={["Décrivez votre logement.", "Parlez d’un voyage."]} />

        <div className="corrige">
          <h3>Les textes à lire</h3>
          <p>
            Ce qu’une épreuve garde caché jusqu’à ce qu’on le demande : ici, les
            textes de la compréhension de l’oral.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Boutons et listes</h2>
        <div className={styles.states}>
          <button type="button" className="button button-primary">
            J&rsquo;ai terminé
          </button>
          <button type="button" className="button">
            Recommencer
          </button>
          <button type="button" className="button button-primary" disabled>
            Enregistrer
          </button>
          <button type="button" className="button" disabled>
            Désactivé
          </button>
          {/* The same pattern on a link, which is what the home page's welcome
              row wears: no underline on hover, and it keeps the button's own
              colours rather than the anchor's. */}
          <Link href="/sommaire" className="button">
            Tout le cours
          </Link>
        </div>
        <p style={{ fontSize: "var(--type-80)", color: "var(--text-3)" }}>
          Un bouton désactivé le montre, et quelque chose à côté dit pourquoi.
          Le dernier est un lien : même dessin, pas de soulignement.
        </p>
        <ul>
          <li>Une liste dans la colonne de lecture.</li>
          <li>
            Le reset met les marges à zéro, donc <code>.prose</code> les
            redéclare, puces comprises.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Liens et focus</h2>
        <p>
          <Link href="/">Retour à l’accueil</Link> : tabulez jusqu’ici pour voir
          l’anneau de focus.
        </p>
      </section>
    </main>
  );
}
