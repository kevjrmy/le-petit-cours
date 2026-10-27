"use client";

import Link from "next/link";
import { T } from "@/components/lang/T";

/**
 * The error boundary for everything under the root layout. It has to be a
 * Client Component — React needs `reset` to be callable — but it is a leaf, so
 * no page becomes client-rendered because of it.
 *
 * It does not catch a failure in the root layout itself; that would need
 * `global-error.tsx`, which replaces the shell wholesale and is not worth
 * carrying for a course of static pages.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <article className="prose">
      <h1>
        <T fr={<>Quelque chose s&rsquo;est mal passé</>} es="Algo ha salido mal" />
      </h1>
      <section>
        <p>
          <T
            fr={<>La page n&rsquo;a pas pu s&rsquo;afficher. Ce n&rsquo;est pas de votre fait.</>}
            es="La página no se ha podido mostrar. No es culpa tuya."
          />
        </p>
        <p>
          <button type="button" className="button" onClick={reset}>
            <T fr="Réessayer" es="Volver a intentarlo" />
          </button>{" "}
          <T
            fr={
              <>
                ou <Link href="/">revenir au sommaire</Link>.
              </>
            }
            es={
              <>
                o <Link href="/">volver al índice</Link>.
              </>
            }
          />
        </p>
      </section>
    </article>
  );
}
