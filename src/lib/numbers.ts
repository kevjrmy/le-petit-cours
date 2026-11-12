/**
 * A whole number written out in French, the way the course teaches it: the
 * traditional spelling (`vingt et un`, `deux cent cinq`), France's 70, 80 and
 * 90 (`soixante-dix`, `quatre-vingts`, `quatre-vingt-dix`), never Belgium's.
 *
 * The two plural rules of `vingt` and `cent` live here
 * (`vocabulaire/les-nombres`, `vocabulaire/les-grands-nombres`): they take an
 * `s` when multiplied and last — `quatre-vingts`, `deux cents` — and also
 * before `million` and `milliard`, which are nouns; never before `mille`,
 * which is a number.
 */

/** The largest number `numberToFrench` writes: 999 milliards and the rest. */
export const MAX_NUMBER = 999_999_999_999;

const UNITS = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
];

const TENS: Record<number, string> = {
  2: "vingt",
  3: "trente",
  4: "quarante",
  5: "cinquante",
  6: "soixante",
};

/** 0 to 99. */
function belowHundred(n: number): string {
  if (n <= 16) return UNITS[n];
  if (n < 20) return `dix-${UNITS[n - 10]}`;

  const tens = Math.floor(n / 10);
  const unit = n % 10;

  if (tens <= 6) {
    const base = TENS[tens];
    if (unit === 0) return base;
    if (unit === 1) return `${base} et un`;
    return `${base}-${UNITS[unit]}`;
  }

  /* 70 to 79 are 60 + 10 to 19, and only 71 takes « et ». */
  if (tens === 7) {
    if (n === 71) return "soixante et onze";
    return `soixante-${belowHundred(n - 60)}`;
  }

  /* 80 to 99 are 4 × 20 + 0 to 19, with no « et » at all. */
  if (n === 80) return "quatre-vingts";
  return `quatre-vingt-${belowHundred(n - 80)}`;
}

/** 1 to 999. `last` is false before `mille`, where `vingts` and `cents` lose their `s`. */
function belowThousand(n: number, last = true): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;

  let words = "";
  if (hundreds > 0) {
    words = hundreds === 1 ? "cent" : `${UNITS[hundreds]} cent`;
    if (rest === 0) return hundreds > 1 && last ? `${words}s` : words;
    words += " ";
  }

  const tail = rest === 80 && !last ? "quatre-vingt" : belowHundred(rest);
  return words + tail;
}

/** `n` in French words, or `null` outside 0 … `MAX_NUMBER` or for a non-integer. */
export function numberToFrench(n: number): string | null {
  if (!Number.isSafeInteger(n) || n < 0 || n > MAX_NUMBER) return null;
  if (n === 0) return UNITS[0];

  const milliards = Math.floor(n / 1e9);
  const millions = Math.floor(n / 1e6) % 1000;
  const thousands = Math.floor(n / 1000) % 1000;
  const rest = n % 1000;

  const parts: string[] = [];
  if (milliards) {
    parts.push(`${belowThousand(milliards)} milliard${milliards > 1 ? "s" : ""}`);
  }
  if (millions) {
    parts.push(`${belowThousand(millions)} million${millions > 1 ? "s" : ""}`);
  }
  if (thousands) {
    parts.push(thousands === 1 ? "mille" : `${belowThousand(thousands, false)} mille`);
  }
  if (rest) parts.push(belowThousand(rest));

  return parts.join(" ");
}

/**
 * What the learner typed, as a number: digits, with the spaces French groups
 * them by (`1 000`) or the dots Spanish does (`1.000`). Anything else — a
 * comma, a sign, a letter — is `null`.
 */
export function parseTypedNumber(typed: string): number | null {
  const digits = typed.replace(/[\s.  ]/g, "");
  if (!/^\d+$/.test(digits) || digits.length > 12) return null;
  return Number(digits);
}

/**
 * `n` in figures, the French way: groups of three split by a narrow
 * non-breaking space (`1 980`, `2 000 000`). Written by hand rather than with
 * `toLocaleString`, which renders on the server too and must give the browser
 * the same character.
 */
export function groupDigits(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+$)/g, " ");
}
