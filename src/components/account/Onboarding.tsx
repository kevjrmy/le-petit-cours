"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CHOOSABLE_LEVELS, type Level, type View } from "@/data/navigation";
import { etapesOf, findParcours, PARCOURS, type Parcours } from "@/data/parcours";
import { displayName, useAccount, useAccountReady, type Account } from "@/hooks/useAccount";
import { saveChoices, SaveSettingError, type SaveProblem } from "@/lib/account";
import { FALLBACK, safePath } from "./ReturnTo";
import { BLURB, Choice, toggleLevel } from "./ViewChooser";
import settings from "./AccountSettings.module.css";
import styles from "./Onboarding.module.css";

/**
 * The onboarding a first sign-in passes through (`ReturnTo`): what the course
 * is, how it works, then the parcours and the view — four slides, one page.
 *
 * **Nothing is saved until « Terminer »**, and both answers go in one write
 * (`saveChoices`). « Plus tard » saves nothing, so the next sign-in asks again.
 * **The parcours pre-selects the view** until the learner touches it (#88);
 * in `/compte` the two stay independent.
 *
 * **French or Spanish, the learner's pick, not remembered** (§4 keeps
 * `localStorage` for the theme and the sidebar). The level is not known yet, so
 * an A1 learner needs the Spanish (#85). **Names stay French** — parcours,
 * levels, « La suite » — because that is what the rest of the site calls them.
 */
export function Onboarding() {
  const account = useAccount();
  const ready = useAccountReady();
  const params = useSearchParams();

  const asked = safePath(params.get("suivant"));
  const next = asked && asked !== "/bienvenue" ? asked : FALLBACK;

  if (!ready) return null;
  if (!account) return <SignedOut />;
  return <Slides key={account.id} account={account} next={next} />;
}

function SignedOut() {
  return (
    <>
      <h1>Bienvenue</h1>
      <p>Connectez-vous d’abord&nbsp;: ces questions règlent votre compte.</p>
      <p>
        <Link className="button button-primary" href="/compte">
          Se connecter
        </Link>
      </p>
    </>
  );
}

type Lang = "fr" | "es";

const STEPS = 4;

/** French inside Spanish text: a name the site uses everywhere. */
function Fr({ children }: { children: ReactNode }) {
  return <span lang="fr">{children}</span>;
}

const UI = {
  fr: {
    count: (n: number) => `${n} sur ${STEPS}`,
    back: "Précédent",
    forward: "Suivant",
    finish: "Terminer",
    saving: "Enregistrement…",
    later: "Plus tard",
    pickParcours: "Choisissez un parcours, ou « Aucun parcours ».",
    suggested: "Choisi d’après votre parcours. Changez-le si vous voulez.",
    size: (lessons: number, etapes: number) =>
      `${lessons} leçons en ${etapes} étape${etapes === 1 ? "" : "s"}`,
    none: "Vous choisissez vos leçons vous-même, sans « La suite ».",
    all: "Toutes les leçons, rangées par niveau.",
    problem: {
      unavailable: "L’enregistrement n’a pas abouti. Vérifiez votre connexion et réessayez.",
      "no-session": "Votre session a expiré. Reconnectez-vous pour enregistrer.",
      rejected: "Ce choix n’est plus proposé. Choisissez-en un autre.",
    } as Partial<Record<SaveProblem, string>>,
  },
  es: {
    count: (n: number) => `${n} de ${STEPS}`,
    back: "Anterior",
    forward: "Siguiente",
    finish: "Terminar",
    saving: "Guardando…",
    later: "Más tarde",
    pickParcours: "Elige un parcours, o « Aucun parcours ».",
    suggested: "Elegido según tu parcours. Cámbialo si quieres.",
    size: (lessons: number, etapes: number) =>
      `${lessons} lecciones en ${etapes} etapa${etapes === 1 ? "" : "s"}`,
    none: "Eliges tú las lecciones, sin « La suite ».",
    all: "Todas las lecciones, ordenadas por nivel.",
    problem: {
      unavailable: "No se ha podido guardar. Comprueba tu conexión y vuelve a intentarlo.",
      "no-session": "Tu sesión ha caducado. Vuelve a iniciar sesión para guardar.",
      rejected: "Esta opción ya no existe. Elige otra.",
    } as Partial<Record<SaveProblem, string>>,
  },
};

/** The parcours blurbs in Spanish, by id; a missing one falls back to French. */
const PARCOURS_ES: Record<string, string> = {
  a1: "Empiezas. Presentarte, hablar de los tuyos, contar y comprar.",
  a2: "Te defiendes. La vida diaria, contar en pasado, hablar de tus planes.",
  b1: "Sigues una conversación. Contar con detalle, imaginar, leer de cerca.",
  "ecrire-le-francais":
    "Ya lo hablas. Escribir lo que sabes decir: acentos, homófonos, terminaciones.",
};

const LEVEL_ES: Record<Level, string> = {
  A1: "Los primeros pasos. Explicado en español, enseñado en francés.",
  A2: "La vida diaria, contar en pasado, hablar de tus planes.",
  B1: "Contar con detalle, imaginar, leer de cerca.",
  B2: "",
};

/** The view a parcours suggests: its level, or « Tout » for none. */
function suggestedView(parcours: Parcours | null): View {
  return parcours?.level && CHOOSABLE_LEVELS.includes(parcours.level)
    ? [parcours.level]
    : "all";
}

function Slides({ account, next }: { account: Account; next: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("fr");
  const [step, setStep] = useState(0);
  /* `undefined` until picked: « Aucun parcours » is an answer, not a default.
     Someone re-running the onboarding starts from what they have. */
  const [parcoursId, setParcoursId] = useState<string | null | undefined>(
    account.chosen ? (account.parcours?.id ?? null) : undefined,
  );
  const [picked, setPicked] = useState<View | null>(account.chosen ? account.view : null);
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState<SaveProblem | null>(null);

  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  /* Focus follows the slide, so a screen reader hears the new title rather
     than nothing. Not on arrival: the page's first focus is the browser's. */
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step]);

  const t = UI[lang];
  const parcours = parcoursId ? findParcours(parcoursId) : null;
  /* The parcours decides the view until the learner presses a level. */
  const view = picked ?? suggestedView(parcours);

  function go(to: number) {
    moved.current = true;
    setProblem(null);
    setStep(to);
  }

  async function finish() {
    if (parcoursId === undefined) return;
    setSaving(true);
    setProblem(null);
    try {
      await saveChoices(view, parcoursId);
      router.replace(next);
    } catch (caught) {
      setProblem(caught instanceof SaveSettingError ? caught.problem : "unavailable");
      setSaving(false);
    }
  }

  const blocked = step === 2 && parcoursId === undefined;
  const last = step === STEPS - 1;

  let title: ReactNode;
  let body: ReactNode;

  if (step === 0) {
    const name = displayName(account);
    title = lang === "fr" ? `Bienvenue, ${name}` : `Te damos la bienvenida, ${name}`;
    body =
      lang === "fr" ? (
        <>
          <p>Ce cours explique le français simplement, pour les hispanophones.</p>
          <p>Des leçons courtes, des exercices, des conversations à jouer à deux.</p>
          <p>
            Tout est ouvert&nbsp;: lisez ce que vous voulez, dans l’ordre que
            vous voulez.
          </p>
          <p>Avant de commencer, deux questions.</p>
        </>
      ) : (
        <>
          <p>Este curso explica el francés de forma sencilla, para hispanohablantes.</p>
          <p>Lecciones cortas, ejercicios y conversaciones para practicar en pareja.</p>
          <p>Todo está abierto: lee lo que quieras, en el orden que quieras.</p>
          <p>Antes de empezar, dos preguntas.</p>
        </>
      );
  } else if (step === 1) {
    title = lang === "fr" ? "Comment ça marche" : "Cómo funciona";
    body =
      lang === "fr" ? (
        <ul className={styles.points}>
          <li>
            Une leçon finie&nbsp;? Appuyez sur «&nbsp;J’ai terminé&nbsp;», en bas
            de la page. «&nbsp;Ma progression&nbsp;» garde la liste, sur tous vos
            appareils.
          </li>
          <li>
            Un parcours range les leçons dans l’ordre. Sur l’accueil,
            «&nbsp;La suite&nbsp;» vous donne la prochaine.
          </li>
          <li>
            Les explications sont en français. Au niveau A1, elles sont en
            espagnol.
          </li>
          <li>Tout se change plus tard, dans «&nbsp;Compte&nbsp;».</li>
        </ul>
      ) : (
        <ul className={styles.points}>
          <li>
            ¿Has terminado una lección? Pulsa <Fr>«&nbsp;J’ai terminé&nbsp;»</Fr>,
            al final de la página. <Fr>«&nbsp;Ma progression&nbsp;»</Fr> guarda
            la lista, en todos tus dispositivos.
          </li>
          <li>
            Un <Fr>parcours</Fr> ordena las lecciones. En la página de inicio,{" "}
            <Fr>«&nbsp;La suite&nbsp;»</Fr> te da la siguiente.
          </li>
          <li>Las explicaciones están en francés. En el nivel A1, están en español.</li>
          <li>
            Todo se puede cambiar después, en <Fr>«&nbsp;Compte&nbsp;»</Fr>.
          </li>
        </ul>
      );
  } else if (step === 2) {
    title = lang === "fr" ? "Votre parcours" : "Tu parcours";
    body = (
      <>
        <p>
          {lang === "fr" ? (
            "Un parcours, c’est un chemin : des leçons, étape par étape."
          ) : (
            <>
              Un <Fr>parcours</Fr> es un camino: lecciones, etapa por etapa.
            </>
          )}
        </p>
        <ul className={settings.choices}>
          {PARCOURS.map((p) => {
            const es = lang === "es" ? PARCOURS_ES[p.id] : undefined;
            const lessons = etapesOf(p).reduce((sum, e) => sum + e.steps.length, 0);
            return (
              <li key={p.id}>
                <Choice
                  name={p.title}
                  nameLang="fr"
                  blurb={es ?? p.blurb}
                  blurbLang={es ? undefined : "fr"}
                  meta={t.size(lessons, p.etapes.length)}
                  pressed={parcoursId === p.id}
                  disabled={saving}
                  onPress={() => setParcoursId(p.id)}
                />
              </li>
            );
          })}
          <li>
            <Choice
              name="Aucun parcours"
              nameLang="fr"
              blurb={t.none}
              pressed={parcoursId === null}
              disabled={saving}
              onPress={() => setParcoursId(null)}
            />
          </li>
        </ul>
      </>
    );
  } else {
    title = lang === "fr" ? "Ce que vous voyez" : "Lo que ves";
    body = (
      <>
        <p>
          {lang === "fr" ? (
            "Le sommaire et le menu ne montrent que ces niveaux. Une leçon reste toujours lisible."
          ) : (
            <>
              El <Fr>«&nbsp;Sommaire&nbsp;»</Fr> y el menú solo muestran estos
              niveles. Una lección siempre se puede leer.
            </>
          )}
        </p>
        <ul className={settings.choices}>
          <li>
            <Choice
              name="Tout"
              nameLang="fr"
              blurb={t.all}
              pressed={view === "all"}
              disabled={saving}
              onPress={() => setPicked("all")}
            />
          </li>
          {CHOOSABLE_LEVELS.map((level) => (
            <li key={level}>
              <Choice
                name={level}
                blurb={lang === "fr" ? BLURB[level] : LEVEL_ES[level]}
                pressed={view !== "all" && view.includes(level)}
                disabled={saving}
                onPress={() => setPicked(toggleLevel(view, level))}
              />
            </li>
          ))}
        </ul>
        {picked === null && parcoursId !== undefined && (
          <p className={styles.hint}>{t.suggested}</p>
        )}
      </>
    );
  }

  const help = problem
    ? (t.problem[problem] ?? t.problem.unavailable)
    : blocked
      ? t.pickParcours
      : " ";

  return (
    /* `lang` on the deck, never the article (§1): the whole slide flips. */
    <div className={styles.deck} lang={lang}>
      <div className={styles.head}>
        <p className={styles.count}>
          <span className={styles.dots} aria-hidden="true">
            {Array.from({ length: STEPS }, (_, i) => (
              <span key={i} className={i <= step ? styles.dotOn : styles.dot} />
            ))}
          </span>
          {t.count(step + 1)}
        </p>
        <button
          type="button"
          className={styles.lang}
          aria-pressed={lang === "es"}
          onClick={() => setLang(lang === "fr" ? "es" : "fr")}
        >
          <FlagEs />
          <span lang="es">Español</span>
        </button>
      </div>

      <div key={step} className={styles.slide}>
        <h1 ref={heading} tabIndex={-1} className={styles.title}>
          {title}
        </h1>
        {body}
      </div>

      <div className={styles.nav}>
        <Link className={settings.linkish} href={next}>
          {t.later}
        </Link>
        <span className={styles.navEnd}>
          {step > 0 && (
            <button type="button" className="button" disabled={saving} onClick={() => go(step - 1)}>
              {t.back}
            </button>
          )}
          <button
            type="button"
            className="button button-primary"
            disabled={saving || blocked}
            onClick={() => (last ? finish() : go(step + 1))}
          >
            {last ? (saving ? t.saving : t.finish) : t.forward}
          </button>
        </span>
      </div>
      <p role="status" className={`${settings.help} ${problem ? settings.helpBad : ""}`}>
        {help}
      </p>
    </div>
  );
}

/* The civil flag, 3:2, stripes 1:2:1 — no arms at this size. Its colours are
   palette tokens kept for this one use (`globals.css`). */
function FlagEs() {
  return (
    <svg className={styles.flag} viewBox="0 0 3 2" aria-hidden="true">
      <rect width="3" height="2" fill="var(--flag-es-red)" />
      <rect y="0.5" width="3" height="1" fill="var(--flag-es-yellow)" />
    </svg>
  );
}
