import type { MetadataRoute } from "next";

/* The course asks not to be indexed (#95), and **this file is not where it
   says so**: every response carries `noindex` (`next.config.ts`, and the root
   layout's `robots`).

   **`allow` for search engines, on purpose.** A `Disallow: /` stops a crawler
   reading the page, so it never sees the `noindex`, and a URL linked from
   elsewhere (the repository's README links here) is then listed bare, without
   a description. Crawling must stay open for the refusal to be read. No
   sitemap either: that is a list of URLs worth coming back to.

   **`disallow` for the crawlers that feed a model**, which have no index to
   stay out of: `noindex` means nothing to them, and this file is the only
   thing they read. A hand-kept list, so it is always behind; a name missing
   here is a crawler that reads the course, nothing worse.

   **Two kinds of agent are left out, and stay out.** One fetches a single
   page because a person asked their assistant to read it (`ChatGPT-User`,
   `Claude-User`, `Perplexity-User`): that is a reader, not a crawler. The
   other draws the preview of a link sent in a chat (`facebookexternalhit`,
   `WhatsApp`), which is how the course is handed out. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "PerplexityBot",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "AI2Bot",
  "Omgilibot",
  "Timpibot",
  "ImagesiftBot",
  "YouBot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
  };
}
