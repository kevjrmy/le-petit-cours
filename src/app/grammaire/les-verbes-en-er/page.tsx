import Link from "next/link";
import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";

const PATH = "/grammaire/les-verbes-en-er";

export const metadata = lessonMetadata(PATH);

export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />

      <section lang="es">
        <h2>Cuatro formas suenan igual</h2>

        <div className="rule">
          En español cada persona suena distinta: <em>hablo</em>,{" "}
          <em>hablas</em>, <em>habla</em>, <em>hablan</em>. En francés, con
          los verbos en <span className="fr" lang="fr">-er</span>, cuatro
          formas suenan igual. Las terminaciones{" "}
          <span className="fr" lang="fr">-e</span>,{" "}
          <span className="fr" lang="fr">-es</span>,{" "}
          <span className="fr" lang="fr">-e</span>,{" "}
          <span className="fr" lang="fr">-ent</span> se escriben, pero no se
          pronuncian. Solo se oyen{" "}
          <span className="fr" lang="fr">nous</span> y{" "}
          <span className="fr" lang="fr">vous</span>.
        </div>

        <div className="table-wrap">
          <table>
            <caption>
              El presente de «<span className="fr" lang="fr">parler</span>» (hablar): lo que se escribe y lo que se oye
            </caption>
            <thead>
              <tr>
                <th scope="col">Sujeto</th>
                <th scope="col">Se escribe</th>
                <th scope="col">Se oye</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="fr" lang="fr">je</th>
                <td className="fr" lang="fr">parle</td>
                <td>«parl»</td>
                <td className="fr" lang="fr">Je parle français.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">tu</th>
                <td className="fr" lang="fr">parles</td>
                <td>«parl»</td>
                <td className="fr" lang="fr">Tu parles vite.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">il, elle</th>
                <td className="fr" lang="fr">parle</td>
                <td>«parl»</td>
                <td className="fr" lang="fr">Elle parle avec Paul.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">nous</th>
                <td className="fr" lang="fr">parlons</td>
                <td>«parlon»</td>
                <td className="fr" lang="fr">Nous parlons ensemble.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">vous</th>
                <td className="fr" lang="fr">parlez</td>
                <td>«parlé»</td>
                <td className="fr" lang="fr">Vous parlez trop bas.</td>
              </tr>
              <tr>
                <th scope="row" className="fr" lang="fr">ils, elles</th>
                <td className="fr" lang="fr">parlent</td>
                <td>«parl»</td>
                <td className="fr" lang="fr">Ils parlent beaucoup.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          En <span className="fr" lang="fr">parlons</span> la <em>n</em> no se pronuncia como en español: <span className="fr" lang="fr">-on</span> es una vocal nasal, y el aire sale también por la nariz.
        </p>

        <p>
          Lo mismo vale para{" "}
          <span className="fr" lang="fr">habiter</span> (vivir),{" "}
          <span className="fr" lang="fr">travailler</span> (trabajar),{" "}
          <span className="fr" lang="fr">aimer</span> (querer, gustar),{" "}
          <span className="fr" lang="fr">regarder</span> (mirar),{" "}
          <span className="fr" lang="fr">écouter</span> (escuchar) y{" "}
          <span className="fr" lang="fr">manger</span> (comer). Quitas{" "}
          <span className="fr" lang="fr">-er</span> y añades las mismas
          terminaciones. La ficha completa de un verbo está en{" "}
          <Link href="/conjugaison/parler" lang="fr">
            Conjuguer parler
          </Link>
          .
        </p>

        <div className="attention">
          <span className="fr" lang="fr">ils parlent</span> no se lee «<span className="fr" lang="fr">parlènt</span>».
          La <span className="fr" lang="fr">-ent</span> del plural es muda, como
          la <em>s</em> de <span className="fr" lang="fr">tu parles</span>. En
          una frase hablada, «<span className="fr" lang="fr">il parle</span>» e «<span className="fr" lang="fr">ils parlent</span>» suenan igual.
        </div>

        <div className="exception">
          con <span className="fr" lang="fr">manger</span> se escribe{" "}
          <span className="fr" lang="fr">nous mangeons</span>, con una{" "}
          <em>e</em> que no suena, para que la <em>g</em> siga sonando como la <span className="fr" lang="fr">j</span> de <span className="fr" lang="fr">je</span>. Lo
          mismo pasa con{" "}
          <span className="fr" lang="fr">voyager</span> (viajar). Está en{" "}
          <Link href="/conjugaison/manger" lang="fr">
            Conjuguer manger
          </Link>
          .
        </div>
      </section>

      <section lang="es">
        <h2>
          El sujeto es obligatorio, y <span className="fr" lang="fr">je</span>{" "}
          pasa a <span className="fr" lang="fr">j’</span>
        </h2>

        <div className="rule">
          En español dices <em>hablo francés</em> sin «yo»: la terminación ya
          dice quién habla. En francés no. Como cuatro formas suenan igual, el
          sujeto se dice siempre. Escribes{" "}
          <span className="fr" lang="fr">je parle français</span>, nunca
          «<span className="fr" lang="fr">parle français</span>».
        </div>

        <p>
          Mal: <span className="fr" lang="fr">Parle français.</span> Bien:
        </p>

        <div className="example" lang="fr">
          Je parle français.
          <br />
          Tu travailles à Lyon.
          <br />
          Elle aime la musique.
        </div>

        <p>
          Delante de una vocal o de una h muda,{" "}
          <span className="fr" lang="fr">je</span> se convierte en{" "}
          <span className="fr" lang="fr">j’</span>, con apóstrofo, igual que{" "}
          <span className="fr" lang="fr">le</span> pasa a{" "}
          <span className="fr" lang="fr">l’</span> en{" "}
          <Link href="/grammaire/les-articles-definis" lang="fr">
            Les articles définis
          </Link>
          . Solo cambia <span className="fr" lang="fr">je</span>; los demás
          sujetos no se tocan.
        </p>

        <div className="example" lang="fr">
          J’habite à Madrid.
          <br />
          J’écoute la radio.
          <br />
          J’aime le café.
        </div>

        <p>
          Con <span className="fr" lang="fr">nous</span>,{" "}
          <span className="fr" lang="fr">vous</span>,{" "}
          <span className="fr" lang="fr">ils</span> y{" "}
          <span className="fr" lang="fr">elles</span>, delante de vocal suena la
          liaison: la <em>s</em> se pega al verbo y suena como una{" "}
          <em>s</em> sonora, como la de <em>mismo</em> o <em>desde</em>: un zumbido.
          Se escribe igual que siempre. La liaison está explicada en{" "}
          <Link href="/grammaire/le-singulier-et-le-pluriel" lang="fr">
            Le singulier et le pluriel
          </Link>
          .
        </p>

        <div className="example" lang="fr">
          Nous‿habitons ici. Vous‿aimez le thé ?
          <br />
          Ils‿habitent à Nantes. Elles‿écoutent la radio.
        </div>

        <p>
          Aquí la liaison sí ayuda: en{" "}
          <span className="fr" lang="fr">il habite</span> la <em>l</em> de{" "}
          <span className="fr" lang="fr">il</span> siempre suena y se une a la
          vocal; en <span className="fr" lang="fr">ils‿habitent</span> aparece
          además una <em>s</em> sonora: eso es la liaison. El plural se oye, aunque{" "}
          <span className="fr" lang="fr">-ent</span> no suene.
        </p>

        <div className="exception">
          delante de consonante no hay liaison, y entonces{" "}
          <span className="fr" lang="fr">il parle</span> e{" "}
          <span className="fr" lang="fr">ils parlent</span> suenan idéntico.
          Solo el contexto dice si es uno o varios.
        </div>
      </section>

      <div className="resume" lang="es">
        <h2>En resumen</h2>
        <ul>
          <li>
            Quitas <span className="fr" lang="fr">-er</span> y añades{" "}
            <span className="fr" lang="fr">-e</span>,{" "}
            <span className="fr" lang="fr">-es</span>,{" "}
            <span className="fr" lang="fr">-e</span>,{" "}
            <span className="fr" lang="fr">-ons</span>,{" "}
            <span className="fr" lang="fr">-ez</span>,{" "}
            <span className="fr" lang="fr">-ent</span>.
          </li>
          <li>
            <span className="fr" lang="fr">-e</span>,{" "}
            <span className="fr" lang="fr">-es</span> y{" "}
            <span className="fr" lang="fr">-ent</span> se escriben y no suenan:{" "}
            <span className="fr" lang="fr">je parle</span>,{" "}
            <span className="fr" lang="fr">ils parlent</span> suenan igual.
          </li>
          <li>
            Solo se oyen <span className="fr" lang="fr">nous parlons</span> y{" "}
            <span className="fr" lang="fr">vous parlez</span>.
          </li>
          <li>
            El sujeto es obligatorio: <span className="fr" lang="fr">je parle</span>,
            nunca «<span className="fr" lang="fr">parle</span>».
          </li>
          <li>
            <span className="fr" lang="fr">je</span> pasa a{" "}
            <span className="fr" lang="fr">j’</span> delante de vocal o h muda:{" "}
            <span className="fr" lang="fr">j’habite</span>. Con{" "}
            <span className="fr" lang="fr">ils‿habitent</span> se oye la liaison.
          </li>
        </ul>
      </div>
    </article>
  );
}
