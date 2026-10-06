import drill from "@/components/exercice/Drill.module.css";

/**
 * La fin d'un plateau d'atelier. Le `Score` du cours vouvoie et invite à cocher
 * la leçon ; une page d'atelier tutoie l'élève qu'elle suit et ne se coche pas
 * (#80). Mêmes seuils que `Score`, pour que « presque » veuille dire la même
 * chose partout.
 */
export function Bilan({
  score,
  total,
  onRestart,
  message: impose,
}: {
  score: number;
  total: number;
  onRestart: () => void;
  /** Un message propre au plateau, à la place des seuils. */
  message?: string;
}) {
  const share = total === 0 ? 0 : score / total;
  const message =
    impose ??
    (share === 1
      ? "Tout est juste. Bravo !"
      : share >= 0.75
        ? "Presque ! Refais-le une fois : les erreurs qui restent sont souvent les mêmes."
        : share >= 0.5
          ? "Le truc est là, il faut encore l’habitude. Relis-le, puis recommence."
          : "Relis le truc juste au-dessus avant de recommencer.");

  return (
    <div className={`card ${drill.score}`} role="status">
      <p className={drill.tally}>
        {score}
        <span> / {total}</span>
      </p>
      <p>{message}</p>
      <button type="button" className="button" onClick={onRestart}>
        Recommencer
      </button>
    </div>
  );
}
