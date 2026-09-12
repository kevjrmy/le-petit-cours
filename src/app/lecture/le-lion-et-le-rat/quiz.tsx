"use client";

import {
  Comprehension,
  type Question,
} from "@/components/exercice/Comprehension";

/**
 * The questions for this fable. Data, not a component: the page stays a Server
 * Component and only this leaf ships JavaScript (`AGENTS.md` §4).
 *
 * The fable is eighteen lines, so a distractor that is merely unlikely would be
 * ruled out by the text in a second. Each wrong option here is something the
 * text *contradicts* — the lion eats the rat, the rat calls for help, the moral
 * is about strength — rather than something it simply does not say.
 *
 * The last question is about the passé simple, which is what the page's
 * `.attention` teaches: nearly every verb in the fable is in it.
 */
const QUESTIONS: Question[] = [
  {
    question: "Où le rat sort-il de terre ?",
    options: [
      "Dans un filet de chasseur",
      "Entre les pattes d’un lion",
      "Au bord d’une forêt",
    ],
    answer: 1,
    because: "« Entre les pattes d’un lion / Un rat sortit de terre. »",
  },
  {
    question: "Que fait le lion quand il découvre le rat ?",
    options: [
      "Il le mange",
      "Il ne le voit pas",
      "Il lui laisse la vie",
    ],
    answer: 2,
    because:
      "« Montra ce qu’il était, et lui donna la vie » : donner la vie, ici, c’est épargner.",
  },
  {
    question: "Comment le rat sort-il de terre ?",
    options: [
      "Prudemment, après avoir regardé",
      "Sans faire attention",
      "En courant, pour échapper au lion",
    ],
    answer: 1,
    because:
      "« Assez à l’étourdie » : c’est ce qui explique qu’il se retrouve sous les pattes du lion.",
  },
  {
    question: "Que devient le lion plus tard ?",
    options: [
      "Il est pris dans des rets",
      "Il tombe malade",
      "Il perd sa forêt",
    ],
    answer: 0,
    because: "« Ce lion fut pris dans des rets », c’est-à-dire dans des filets.",
  },
  {
    question: "Pourquoi ses rugissements ne servent-ils à rien ?",
    options: [
      "Personne ne les entend",
      "Ils ne défont pas le filet",
      "Le lion est trop faible pour crier",
    ],
    answer: 1,
    because:
      "« Dont ses rugissements ne le purent défaire » : la force ne suffit pas contre un filet.",
  },
  {
    question: "Comment le rat libère-t-il le lion ?",
    options: [
      "Il appelle les autres animaux",
      "Il ronge une maille du filet",
      "Il va chercher le chasseur",
    ],
    answer: 1,
    because:
      "« Fit tant par ses dents / Qu’une maille rongée emporta tout l’ouvrage » : il travaille seul, avec ses dents.",
  },
  {
    question: "« Un rat sortit de terre » : à quel temps est ce verbe ?",
    options: ["Au présent", "Au passé composé", "Au passé simple"],
    answer: 2,
    because:
      "C’est le temps du récit écrit. En parlant, on dirait « un rat est sorti de terre ».",
  },
];

export function Quiz() {
  return <Comprehension questions={QUESTIONS} />;
}
