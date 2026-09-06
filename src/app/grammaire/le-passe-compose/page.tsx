import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/le-passe-compose";

export const metadata = lessonMetadata(PATH);

/* Tout est en français (docs/decisions.md #53) : la phrase qui explique est en
   sans, l'exemple français est en serif — c'est le rôle qui décide, pas la
   langue. Server Component : pas de 'use client', pas de hook, pas d'état. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>Le passé composé avec « avoir »</h2>

        <div className="rule">
          Le passé composé raconte une action <strong>terminée</strong>. On le
          forme avec un auxiliaire au présent, <span className="fr">avoir</span>{" "}
          ou <span className="fr">être</span>, suivi du{" "}
          <strong>participe passé</strong> du verbe. La grande majorité des
          verbes prennent <span className="fr">avoir</span>.
        </div>

        <div className="example">
          Hier, j’<strong>ai mangé</strong> au restaurant. · Nous{" "}
          <strong>avons fini</strong> à six heures. · Ils{" "}
          <strong>ont pris</strong> le train.
        </div>

        <div className="table-wrap">
          <table>
            <caption>Le verbe « manger » au passé composé</caption>
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col">Auxiliaire</th>
                <th scope="col">Participe passé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">j’</th>
                <td className="fr">ai</td>
                <td className="fr">mangé</td>
              </tr>
              <tr>
                <th scope="row">tu</th>
                <td className="fr">as</td>
                <td className="fr">mangé</td>
              </tr>
              <tr>
                <th scope="row">il / elle / on</th>
                <td className="fr">a</td>
                <td className="fr">mangé</td>
              </tr>
              <tr>
                <th scope="row">nous</th>
                <td className="fr">avons</td>
                <td className="fr">mangé</td>
              </tr>
              <tr>
                <th scope="row">vous</th>
                <td className="fr">avez</td>
                <td className="fr">mangé</td>
              </tr>
              <tr>
                <th scope="row">ils / elles</th>
                <td className="fr">ont</td>
                <td className="fr">mangé</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Former le participe passé</h3>

        <div className="table-wrap">
          <table>
            <caption>La terminaison du participe passé, groupe par groupe</caption>
            <thead>
              <tr>
                <th scope="col">Verbes en</th>
                <th scope="col">Participe en</th>
                <th scope="col">Exemples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr">
                  -er
                </th>
                <td className="fr">-é</td>
                <td className="fr">parler → parlé · aimer → aimé</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -ir
                </th>
                <td className="fr">-i</td>
                <td className="fr">finir → fini · choisir → choisi</td>
              </tr>
              <tr>
                <th scope="row" className="fr">
                  -dre
                </th>
                <td className="fr">-u</td>
                <td className="fr">vendre → vendu · attendre → attendu</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="exception">
          les verbes très fréquents ont un participe à part. Il faut les
          apprendre un par un : <span className="fr">avoir → eu</span>,{" "}
          <span className="fr">être → été</span>,{" "}
          <span className="fr">faire → fait</span>,{" "}
          <span className="fr">voir → vu</span>,{" "}
          <span className="fr">prendre → pris</span>,{" "}
          <span className="fr">mettre → mis</span>,{" "}
          <span className="fr">écrire → écrit</span>,{" "}
          <span className="fr">pouvoir → pu</span>,{" "}
          <span className="fr">vouloir → voulu</span>.
        </div>
      </section>

      <section>
        <h2>Le passé composé avec « être »</h2>

        <p>
          Une petite famille de verbes n’utilise pas{" "}
          <span className="fr">avoir</span> : les verbes qui disent un{" "}
          <strong>déplacement</strong> ou un <strong>changement d’état</strong>,
          et tous les verbes pronominaux.
        </p>

        <div className="example">
          aller · venir · arriver · partir · entrer · sortir · monter ·
          descendre · naître · mourir · rester · tomber · retourner · passer
          <br />
          se lever · se coucher · se promener · s’habiller
        </div>

        <div className="rule">
          Avec <span className="fr">être</span>, le participe passé{" "}
          <strong>s’accorde avec le sujet</strong>, comme un adjectif : on
          ajoute <span className="fr">-e</span> au féminin,{" "}
          <span className="fr">-s</span> au pluriel.
        </div>

        <div className="table-wrap">
          <table>
            <caption>L’accord du participe passé avec « être »</caption>
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col">Phrase</th>
                <th scope="col">Terminaison</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin singulier</th>
                <td className="fr">Il est parti.</td>
                <td className="fr">—</td>
              </tr>
              <tr>
                <th scope="row">féminin singulier</th>
                <td className="fr">Elle est partie.</td>
                <td className="fr">-e</td>
              </tr>
              <tr>
                <th scope="row">masculin pluriel</th>
                <td className="fr">Ils sont partis.</td>
                <td className="fr">-s</td>
              </tr>
              <tr>
                <th scope="row">féminin pluriel</th>
                <td className="fr">Elles sont parties.</td>
                <td className="fr">-es</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="attention">
          l’accord s’entend rarement. <span className="fr">parti</span> et{" "}
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

      <section>
        <h2>À la forme négative</h2>

        <div className="rule">
          <span className="fr">ne</span> et <span className="fr">pas</span>{" "}
          entourent <strong>l’auxiliaire</strong>, jamais le participe passé.
        </div>

        <div className="example">
          Je <strong>n’</strong>ai <strong>pas</strong> compris. · Elle{" "}
          <strong>n’</strong>est <strong>pas</strong> venue. · Nous{" "}
          <strong>n’</strong>avons <strong>jamais</strong> vu ce film.
        </div>

        <div className="attention">
          à l’oral, le <span className="fr">ne</span> disparaît souvent —{" "}
          <span className="fr">j’ai pas compris</span>. On l’entend peu, mais à
          l’écrit il est obligatoire.
        </div>
      </section>
    </article>
  );
}
