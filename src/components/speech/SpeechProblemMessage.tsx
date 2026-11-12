import type { SpeechProblem } from "@/hooks/useSpeech";

/**
 * Why `useSpeech` said nothing, in both languages (#94, #102). One copy for
 * every place the course speaks, so the two explanations cannot drift.
 */
export function SpeechProblemMessage({ problem }: { problem: SpeechProblem }) {
  if (problem === "no-voice") {
    return (
      <>
        <p className="message" data-ui="fr">
          Cet appareil n’a pas de voix française : rien n’a été lu. Une voix
          d’une autre langue prononcerait mal le français. Essayez un autre
          navigateur, ou un téléphone.
        </p>
        <p className="message" data-ui="es" lang="es">
          Este dispositivo no tiene voz francesa: no se ha leído nada. Una voz
          de otro idioma pronunciaría mal el francés. Prueba con otro navegador
          o con un teléfono.
        </p>
      </>
    );
  }
  return (
    <>
      <p className="message" data-ui="fr">
        Ce navigateur ne sait pas lire un texte à voix haute. Essayez un autre
        navigateur.
      </p>
      <p className="message" data-ui="es" lang="es">
        Este navegador no sabe leer un texto en voz alta. Prueba con otro
        navegador.
      </p>
    </>
  );
}
