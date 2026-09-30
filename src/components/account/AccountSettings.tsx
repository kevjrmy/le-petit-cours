"use client";

import { useState } from "react";
import {
  checkDisplayName,
  checkUsername,
  DISPLAY_NAME_MAX,
  PASSWORD_MIN,
  saveDisplayName,
  savePassword,
  saveUsername,
  SaveSettingError,
  USERNAME_MAX,
  type Lang,
  type SaveProblem,
} from "@/lib/account";
import { useAccount } from "@/hooks/useAccount";
import { LangChooser } from "./LangChooser";
import { ParcoursChooser } from "./ParcoursChooser";
import { ViewChooser } from "./ViewChooser";
import { getSupabaseClient } from "@/lib/supabase/client";
import { SignInForm } from "./SignInForm";
import { WORDS } from "./words";
import styles from "./AccountSettings.module.css";

/**
 * The signed-in half of `/compte`.
 *
 * A client leaf, so the page around it stays a Server Component and keeps
 * prerendering — reading the session in the page itself would make `/compte`
 * dynamic, and the habit is what would eventually make a lesson dynamic too
 * (`AGENTS.md` §8).
 *
 * **In the account's language** (#91), French unless they chose Spanish.
 * Signed out there is no account to ask, so `SignInForm` stays French.
 */
export function AccountSettings() {
  const account = useAccount();

  if (!account) return <SignInForm />;

  const lang = account.lang;
  const t = UI[lang];

  return (
    <>
      {/* The page names itself here rather than in `page.tsx`, because signed
          out the same slot says « Se connecter » — see the note there. */}
      {/* Named as the account menu's row names it, in the account's language. */}
      <h1>{lang === "es" ? "Cuenta" : "Compte"}</h1>
      {/* **No « Vous êtes connecté » section.** It restated the name and the
          identifier in prose, and both are already in the fields below, in the
          inputs that can change them — the account control at the foot of the
          sidebar says the name too. A page that opens by telling you what you
          can read two inches lower is a page whose first screen is spent.

          The settings themselves all arrive with the session, so there is no
          loading state to show and no ordering between them (#36). The
          parcours comes first because it is what « La suite » walks (#88),
          then what the listings show (#86): the two a learner sets on
          arrival. The language goes first, as in the onboarding (#91): it is
          what makes the rest readable. */}
      <LangChooser current={lang} />
      <ParcoursChooser current={account.parcours} lang={lang} />
      <ViewChooser current={account.view} lang={lang} />
      <UsernameField initial={account.username} lang={lang} />
      <DisplayNameField initial={account.displayName} lang={lang} />
      <PasswordField email={account.email} lang={lang} />

      <section lang={lang}>
        <h2>{WORDS[lang].signOut}</h2>
        <p>{t.signOutText}</p>
        <p className={styles.signOut}>
          <button
            type="button"
            className="button"
            onClick={() => {
              /* No local state to clear: the provider is subscribed to
                 onAuthStateChange, so SIGNED_OUT reaches every consumer. */
              void getSupabaseClient()?.auth.signOut();
            }}
          >
            {WORDS[lang].signOut}
          </button>
        </p>
      </section>
    </>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; cleared: boolean }
  | { kind: "error"; message: string };

const UI = {
  fr: {
    signOutText:
      "Vos leçons cochées restent gardées ; le contenu du site reste lisible sans compte.",
    save: {
      unavailable: WORDS.fr.unavailable,
      "no-session": WORDS.fr.noSession,
      rejected: "Ce nom a été refusé. Essayez-en un plus court ou plus simple.",
      weak: `Ce mot de passe est trop court : ${PASSWORD_MIN} caractères au minimum.`,
      unchanged: "C’est déjà votre mot de passe actuel.",
      taken: "Cet identifiant est déjà pris. Essayez-en un autre.",
    } satisfies Record<SaveProblem, string>,

    nameTitle: "Votre nom",
    nameText:
      "Le nom sous lequel le site vous appelle. Il n’est montré à personne d’autre. Laissez le champ vide pour revenir à votre identifiant.",
    nameLabel: "Nom affiché",
    nameTooLong: (used: number) => `${used} caractères sur ${DISPLAY_NAME_MAX} au maximum.`,
    nameControl: "Ce nom contient un caractère qui n’est pas autorisé.",
    nameCleared: "Nom effacé. Le site utilisera votre identifiant.",
    nameSaved: "Nom enregistré.",
    nameCount: (used: number) =>
      `${used} caractère${used === 1 ? "" : "s"} sur ${DISPLAY_NAME_MAX}.`,

    passwordTitle: "Votre mot de passe",
    passwordText:
      "Vous pouvez le changer quand vous voulez. Il n’y a pas de récupération automatique : votre compte ne garde aucune adresse électronique, donc si vous l’oubliez, il faut en redemander un.",
    passwordCurrent: "Mot de passe actuel",
    passwordNew: "Nouveau mot de passe",
    passwordWrong: "Votre mot de passe actuel n’est pas le bon.",
    passwordMin: `${PASSWORD_MIN} caractères au minimum.`,
    passwordSaved: "Mot de passe changé.",

    usernameTitle: "Votre identifiant",
    usernameText: (
      <>
        Ce que vous tapez pour vous connecter. Vous pouvez en changer : votre
        progression suit le compte, pas le nom. Minuscules, chiffres, et{" "}
        <code>. _ -</code> à l&rsquo;intérieur.
      </>
    ),
    usernameLabel: "Identifiant",
    usernameShort: "Deux caractères au minimum.",
    usernameLong: `${USERNAME_MAX} caractères au maximum.`,
    usernameCharset:
      "Minuscules et chiffres, en début et en fin ; . _ - seulement à l’intérieur.",
    usernameSaved: "Identifiant changé.",
    usernameSame: "C’est votre identifiant actuel.",
    usernameNext: "Vous vous connecterez avec ce nom.",
  },
  es: {
    signOutText:
      "Tus lecciones marcadas se quedan guardadas; el contenido del sitio se puede leer sin cuenta.",
    save: {
      unavailable: WORDS.es.unavailable,
      "no-session": WORDS.es.noSession,
      rejected: "Este nombre no se ha aceptado. Prueba uno más corto o más sencillo.",
      weak: `Esta contraseña es demasiado corta: ${PASSWORD_MIN} caracteres como mínimo.`,
      unchanged: "Ya es tu contraseña actual.",
      taken: "Este identificador ya está cogido. Prueba otro.",
    } satisfies Record<SaveProblem, string>,

    nameTitle: "Tu nombre",
    nameText:
      "El nombre con el que te llama el sitio. No se le muestra a nadie más. Deja el campo vacío para volver a tu identificador.",
    nameLabel: "Nombre visible",
    nameTooLong: (used: number) => `${used} caracteres de ${DISPLAY_NAME_MAX} como máximo.`,
    nameControl: "Este nombre contiene un carácter que no está permitido.",
    nameCleared: "Nombre borrado. El sitio usará tu identificador.",
    nameSaved: "Nombre guardado.",
    nameCount: (used: number) =>
      `${used} carácter${used === 1 ? "" : "es"} de ${DISPLAY_NAME_MAX}.`,

    passwordTitle: "Tu contraseña",
    passwordText:
      "Puedes cambiarla cuando quieras. No hay recuperación automática: tu cuenta no guarda ninguna dirección de correo, así que si la olvidas, hay que pedir otra.",
    passwordCurrent: "Contraseña actual",
    passwordNew: "Contraseña nueva",
    passwordWrong: "Tu contraseña actual no es correcta.",
    passwordMin: `${PASSWORD_MIN} caracteres como mínimo.`,
    passwordSaved: "Contraseña cambiada.",

    usernameTitle: "Tu identificador",
    usernameText: (
      <>
        Lo que escribes para iniciar sesión. Puedes cambiarlo: tu progreso va
        con la cuenta, no con el nombre. Minúsculas, cifras, y{" "}
        <code>. _ -</code> en medio.
      </>
    ),
    usernameLabel: "Identificador",
    usernameShort: "Dos caracteres como mínimo.",
    usernameLong: `${USERNAME_MAX} caracteres como máximo.`,
    usernameCharset:
      "Minúsculas y cifras al principio y al final; . _ - solo en medio.",
    usernameSaved: "Identificador cambiado.",
    usernameSame: "Es tu identificador actual.",
    usernameNext: "Iniciarás sesión con este nombre.",
  },
} satisfies Record<Lang, unknown>;

function DisplayNameField({ initial, lang }: { initial: string | null; lang: Lang }) {
  const t = UI[lang];
  const [value, setValue] = useState(initial ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* The field has to adopt a value that changes underneath it — after a save,
     when USER_UPDATED comes back through the provider, and when a different
     learner signs in. Adjusting during render rather than in an effect, and
     rather than keying the component: a `key` would remount it on every change
     including the one the save itself causes, which would wipe the « Nom
     enregistré » the learner is meant to read. */
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setValue(initial ?? "");
  }

  const check = checkDisplayName(value);
  const problem = check.ok ? null : check.problem;
  /* Code points, so the counter agrees with the rule that rejects the name. */
  const used = [...value.trim()].length;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!check.ok) return;

    setStatus({ kind: "saving" });
    try {
      /* Nothing to reload: updateUser emits USER_UPDATED, the provider is
         subscribed, and the sidebar re-renders with the new name. */
      await saveDisplayName(check.value);
      setStatus({ kind: "saved", cleared: check.value === null });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveSettingError
            ? t.save[error.problem]
            : t.save.unavailable,
      });
    }
  }

  return (
    <section lang={lang}>
      <h2>{t.nameTitle}</h2>
      <p>{t.nameText}</p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <label className={styles.label} htmlFor="display-name">
          {t.nameLabel}
        </label>
        <div className={styles.row}>
          <input
            id="display-name"
            className={styles.input}
            type="text"
            value={value}
            maxLength={DISPLAY_NAME_MAX * 2}
            autoComplete="nickname"
            aria-describedby="display-name-help"
            aria-invalid={problem !== null}
            onChange={(event) => {
              setValue(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
          <button
            type="submit"
            className="button button-primary"
            disabled={problem !== null || status.kind === "saving"}
          >
            {status.kind === "saving" ? WORDS[lang].saving : WORDS[lang].save}
          </button>
        </div>

        {/* One live region for every outcome, so a screen reader hears the
            result without the field being re-announced on each keystroke. The
            tone is never the only carrier — every branch below says in words
            what happened. */}
        <p
          id="display-name-help"
          role="status"
          className={`${styles.help} ${
            problem !== null || status.kind === "error"
              ? styles.helpBad
              : status.kind === "saved"
                ? styles.helpGood
                : ""
          }`}
        >
          {problem === "too-long" && t.nameTooLong(used)}
          {problem === "control-chars" && t.nameControl}
          {problem === null && status.kind === "saved" && status.cleared && t.nameCleared}
          {problem === null && status.kind === "saved" && !status.cleared && t.nameSaved}
          {problem === null && status.kind === "error" && status.message}
          {problem === null && status.kind === "idle" && t.nameCount(used)}
        </p>
      </form>
    </section>
  );
}

/**
 * Changing the password.
 *
 * Present because it is the only recovery path a learner has: an account holds
 * no address, so nothing can be emailed to anyone and a forgotten password is
 * reset by hand in the dashboard (#37). The current password is asked for even
 * though Supabase does not require it — see `savePassword`.
 */
function PasswordField({ email, lang }: { email: string; lang: Lang }) {
  const t = UI[lang];
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const short = next !== "" && [...next].length < PASSWORD_MIN;
  const ready = current !== "" && next !== "" && !short;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!ready) return;

    setStatus({ kind: "saving" });
    try {
      await savePassword(email, current, next);
      setCurrent("");
      setNext("");
      setStatus({ kind: "saved", cleared: false });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveSettingError
            ? error.problem === "no-session"
              ? t.passwordWrong
              : t.save[error.problem]
            : t.save.unavailable,
      });
    }
  }

  return (
    <section lang={lang}>
      <h2>{t.passwordTitle}</h2>
      <p>{t.passwordText}</p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="current-password">
            {t.passwordCurrent}
          </label>
          <input
            id="current-password"
            className={styles.input}
            type="password"
            value={current}
            autoComplete="current-password"
            aria-describedby="password-help"
            onChange={(event) => {
              setCurrent(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="new-password">
            {t.passwordNew}
          </label>
          <input
            id="new-password"
            className={styles.input}
            type="password"
            value={next}
            autoComplete="new-password"
            aria-describedby="password-help"
            aria-invalid={short}
            onChange={(event) => {
              setNext(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
        </div>

        <div className={styles.row}>
          <button
            type="submit"
            className="button button-primary"
            disabled={!ready || status.kind === "saving"}
          >
            {status.kind === "saving" ? WORDS[lang].saving : WORDS[lang].change}
          </button>
        </div>

        <p
          id="password-help"
          role="status"
          className={`${styles.help} ${
            short || status.kind === "error"
              ? styles.helpBad
              : status.kind === "saved"
                ? styles.helpGood
                : ""
          }`}
        >
          {short && t.passwordMin}
          {!short && status.kind === "saved" && t.passwordSaved}
          {!short && status.kind === "error" && status.message}
          {!short && (status.kind === "idle" || status.kind === "saving") && t.passwordMin}
        </p>
      </form>
    </section>
  );
}

/**
 * Changing the username.
 *
 * The name is unique across accounts and mutable (#38), which is the pair that
 * put it in a table rather than in metadata: uniqueness needs a constraint, and
 * a constraint needs a column. Everything the learner sees about the outcome —
 * including « déjà pris » — comes from that constraint rejecting the write,
 * never from a check this component made first. Asking "is it free?" before
 * writing would be a race and a second enumeration oracle.
 */
function UsernameField({ initial, lang }: { initial: string; lang: Lang }) {
  const t = UI[lang];
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* Adopt a value that changed underneath us — after a successful rename, when
     TOKEN_REFRESHED brings the new name back through the provider. Same shape
     as DisplayNameField, and for the same reason: a `key` would remount and
     wipe the confirmation the learner is meant to read. */
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setValue(initial);
  }

  const check = checkUsername(value);
  const problem = check.ok ? null : check.problem;
  const unchanged = check.ok && check.value === initial;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!check.ok || unchanged) return;

    setStatus({ kind: "saving" });
    try {
      await saveUsername(check.value);
      setStatus({ kind: "saved", cleared: false });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof SaveSettingError
            ? t.save[error.problem]
            : t.save.unavailable,
      });
    }
  }

  return (
    <section lang={lang}>
      <h2>{t.usernameTitle}</h2>
      <p>{t.usernameText}</p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <label className={styles.label} htmlFor="username-field">
          {t.usernameLabel}
        </label>
        <div className={styles.row}>
          <input
            id="username-field"
            className={styles.input}
            type="text"
            value={value}
            maxLength={USERNAME_MAX * 2}
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-describedby="username-field-help"
            aria-invalid={problem !== null}
            onChange={(event) => {
              setValue(event.target.value);
              setStatus({ kind: "idle" });
            }}
          />
          <button
            type="submit"
            className="button button-primary"
            disabled={problem !== null || unchanged || status.kind === "saving"}
          >
            {status.kind === "saving" ? WORDS[lang].saving : WORDS[lang].change}
          </button>
        </div>

        <p
          id="username-field-help"
          role="status"
          className={`${styles.help} ${
            problem !== null || status.kind === "error"
              ? styles.helpBad
              : status.kind === "saved"
                ? styles.helpGood
                : ""
          }`}
        >
          {problem === "too-short" && t.usernameShort}
          {problem === "too-long" && t.usernameLong}
          {problem === "charset" && t.usernameCharset}
          {problem === null && status.kind === "error" && status.message}
          {problem === null && status.kind === "saved" && t.usernameSaved}
          {problem === null &&
            status.kind !== "error" &&
            status.kind !== "saved" &&
            (unchanged ? t.usernameSame : t.usernameNext)}
        </p>
      </form>
    </section>
  );
}
