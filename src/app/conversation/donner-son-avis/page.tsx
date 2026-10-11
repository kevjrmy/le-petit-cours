import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { Situations } from "./situations";

const PATH = "/conversation/donner-son-avis";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section>
        <h2>La situation</h2>

        <p>
          Vous prenez un café avec une amie française. Elle aime discuter : elle
          pose une question, elle écoute votre avis, et elle n’est jamais tout à
          fait d’accord. Quelqu’un joue l’amie ; vous défendez votre idée, et
          vous lui demandez son avis.
        </p>

        <Situations />
      </section>

      <section>
        <h2>Les étapes</h2>

        <p>
          Un avis solide a toujours la même forme. Suivez-la dans l’ordre :
          chaque étape vous donne une phrase de plus.
        </p>

        <ol>
          <li>Dire votre avis, en une phrase.</li>
          <li>Donner une raison.</li>
          <li>Donner un exemple pris dans votre vie.</li>
          <li>Écouter l’avis de votre amie, et en accepter une partie.</li>
          <li>Fermer votre avis, puis demander son avis à votre amie.</li>
        </ol>

        <div className="attention">
          Pour dire non à une idée, gardez{" "}
          <span className="fr">je pense que</span> et mettez la négation après :{" "}
          <span className="fr">je pense que ce n’est pas vrai</span>. C’est la
          forme la plus simple, et elle est toujours juste.
        </div>

        <div className="astuce">
          <p className="astuce-hook">Une idée par phrase.</p>
          <p>
            Ne cherchez pas la longue phrase. Trois phrases courtes valent mieux
            qu’une longue où l’on se perd, et votre amie a le temps de répondre
            entre deux.
          </p>
        </div>
      </section>

      <section>
        <h2>Les mots pour le dire</h2>

        <p>
          De quoi tenir la discussion jusqu’au bout du café. Prenez ce qui vous
          sert, laissez le reste.
        </p>

        <ul className="mots">
          <li>à mon avis</li>
          <li>je pense que</li>
          <li>je trouve que</li>
          <li>je préfère</li>
          <li>parce que</li>
          <li>plus pratique</li>
          <li>moins cher</li>
          <li>par exemple</li>
          <li>en plus</li>
          <li>surtout</li>
          <li>en général</li>
          <li>c’est vrai, mais…</li>
          <li>par contre</li>
          <li>ça dépend de</li>
          <li>je suis d’accord</li>
          <li>je ne suis pas d’accord</li>
          <li>tu as raison</li>
          <li>bref</li>
          <li>et toi ?</li>
          <li>qu’est-ce que tu en penses ?</li>
        </ul>
      </section>
    </article>
  );
}
