"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CHOOSABLE_LEVELS, type View } from "@/data/navigation";
import { findParcours, PARCOURS, type Parcours } from "@/data/parcours";
import { displayName, useAccount, useAccountReady, type Account } from "@/hooks/useAccount";
import { saveChoices, SaveSettingError, type Lang, type SaveProblem } from "@/lib/account";
import { Flag, LANG_NAME } from "./Flag";
import { FALLBACK, safePath } from "./ReturnTo";
import { Choice, toggleLevel } from "./ViewChooser";
import { LEVEL_BLURB, parcoursSize, parcoursWords, WORDS } from "./words";
import { T } from "@/components/lang/T";
import settings from "./AccountSettings.module.css";
import styles from "./Onboarding.module.css";
import { useLang } from "@/hooks/useLang";
import { applyLang } from "@/lib/lang";

/**
 * The onboarding a first sign-in passes through (`ReturnTo`): the language,
 * what the course is, how it works, then the parcours and the view — five
 * slides, one page.
 *
 * **Nothing is saved until « Terminer »**, and the answers go in one write
 * (`saveChoices`). « Plus tard » saves nothing, so the next sign-in asks again.
 * **The parcours pre-selects the view** until the learner touches it (#88);
 * in `/compte` the two stay independent.
 *
 * **The language comes first** (#91), pre-selected from the device (#102),
 * and shown at once across the whole site; it is saved with the rest, as the
 * account's language. The Spanish slides use the Spanish interface's names —
 * recorrido, Lo siguiente, Índice — as the rest of the site now does.
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
      <h1>
        <T fr="Bienvenue" es="Te damos la bienvenida" />
      </h1>
      <p>
        <T
          fr="Connectez-vous d’abord : ces questions règlent votre compte."
          es="Inicia sesión primero: estas preguntas configuran tu cuenta."
        />
      </p>
      <p>
        <Link className="button button-primary" href="/compte">
          <T fr="Se connecter" es="Iniciar sesión" />
        </Link>
      </p>
    </>
  );
}

const STEPS = 5;

const LANGS: Lang[] = ["fr", "es"];

const UI = {
  fr: {
    count: (n: number) => `${n} sur ${STEPS}`,
    back: "Précédent",
    forward: "Suivant",
    finish: "Terminer",
    later: "Plus tard",
    pickParcours: "Choisissez un parcours, ou « Aucun parcours ».",
    suggested: "Choisi d’après votre parcours. Changez-le si vous voulez.",
    problem: {
      unavailable: WORDS.fr.unavailable,
      "no-session": WORDS.fr.noSession,
      rejected: "Ce choix n’est plus proposé. Choisissez-en un autre.",
    } as Partial<Record<SaveProblem, string>>,
  },
  es: {
    count: (n: number) => `${n} de ${STEPS}`,
    back: "Anterior",
    forward: "Siguiente",
    finish: "Terminar",
    later: "Más tarde",
    pickParcours: "Elige un recorrido, o «Ningún recorrido».",
    suggested: "Elegido según tu recorrido. Cámbialo si quieres.",
    problem: {
      unavailable: WORDS.es.unavailable,
      "no-session": WORDS.es.noSession,
      rejected: "Esta opción ya no existe. Elige otra.",
    } as Partial<Record<SaveProblem, string>>,
  },
};

/** The view a parcours suggests: its level, or « Tout » for none. */
function suggestedView(parcours: Parcours | null): View {
  return parcours?.level && CHOOSABLE_LEVELS.includes(parcours.level)
    ? [parcours.level]
    : "all";
}

function Slides({ account, next }: { account: Account; next: string }) {
  const router = useRouter();
  /* Choosing a language shows the whole site in it at once (#102); the
     account's copy is written with the other answers at « Terminer ». */
  const lang = useLang();
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
      await saveChoices(lang, view, parcoursId);
      router.replace(next);
    } catch (caught) {
      setProblem(caught instanceof SaveSettingError ? caught.problem : "unavailable");
      setSaving(false);
    }
  }

  const blocked = step === 3 && parcoursId === undefined;
  const last = step === STEPS - 1;

  let title: ReactNode;
  let body: ReactNode;

  if (step === 0) {
    /* Asked before anything else, so the title says it in both languages. */
    title = (
      <>
        <span lang="fr">Langue</span> · <span lang="es">Idioma</span>
      </>
    );
    body = (
      <>
        <p>
          {lang === "fr"
            ? "Dans quelle langue voulez-vous le site ? Vous pourrez en changer dans « Compte »."
            : "¿En qué idioma quieres el sitio? Podrás cambiarlo en «Cuenta»."}
        </p>
        <ul className={settings.choices}>
          {LANGS.map((option) => (
            <li key={option}>
              <Choice
                name={LANG_NAME[option]}
                nameLang={option}
                icon={<Flag lang={option} />}
                blurb=""
                pressed={lang === option}
                disabled={saving}
                onPress={() => applyLang(option)}
              />
            </li>
          ))}
        </ul>
      </>
    );
  } else if (step === 1) {
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
  } else if (step === 2) {
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
            Les explications sont dans la langue choisie, le français ou
            l&rsquo;espagnol. Au niveau A1, elles sont toujours en espagnol.
            Le français étudié reste en français.
          </li>
          <li>Tout se change plus tard, dans «&nbsp;Compte&nbsp;».</li>
        </ul>
      ) : (
        <ul className={styles.points}>
          <li>
            ¿Has terminado una lección? Pulsa «He terminado», al final de la
            página. «Mi progresión» guarda la lista, en todos tus dispositivos.
          </li>
          <li>
            Un recorrido ordena las lecciones. En la página de inicio, «Lo
            siguiente» te da la siguiente.
          </li>
          <li>
            Las explicaciones están en el idioma elegido, francés o español. En
            el nivel A1, siempre en español. El francés que estudias sigue en
            francés.
          </li>
          <li>Todo se puede cambiar después, en «Cuenta».</li>
        </ul>
      );
  } else if (step === 3) {
    title = lang === "fr" ? "Votre parcours" : "Tu recorrido";
    body = (
      <>
        <p>
          {lang === "fr"
            ? "Un parcours, c’est un chemin : des leçons, étape par étape."
            : "Un recorrido es un camino: lecciones, etapa por etapa."}
        </p>
        <ul className={settings.choices}>
          {PARCOURS.map((p) => {
            const words = parcoursWords(p, lang);
            return (
              <li key={p.id}>
                <Choice
                  name={words.title}
                  blurb={words.blurb}
                  meta={parcoursSize(p, lang)}
                  pressed={parcoursId === p.id}
                  disabled={saving}
                  onPress={() => setParcoursId(p.id)}
                />
              </li>
            );
          })}
          <li>
            <Choice
              name={WORDS[lang].noParcoursName}
              blurb={WORDS[lang].noParcours}
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
          {lang === "fr"
            ? "Le sommaire et le menu ne montrent que ces niveaux. Une leçon reste toujours lisible."
            : "El índice y el menú solo muestran estos niveles. Una lección siempre se puede leer."}
        </p>
        <ul className={settings.choices}>
          <li>
            <Choice
              name={WORDS[lang].allName}
              blurb={WORDS[lang].allLevels}
              pressed={view === "all"}
              disabled={saving}
              onPress={() => setPicked("all")}
            />
          </li>
          {CHOOSABLE_LEVELS.map((level) => (
            <li key={level}>
              <Choice
                name={level}
                blurb={LEVEL_BLURB[lang][level]}
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
            {last ? (saving ? WORDS[lang].saving : t.finish) : t.forward}
          </button>
        </span>
      </div>
      <p role="status" className={`${settings.help} ${problem ? settings.helpBad : ""}`}>
        {help}
      </p>
    </div>
  );
}
