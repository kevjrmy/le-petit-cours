import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * A Supabase client for a single server request.
 *
 * **Never share one across requests** — it carries that request's cookies, and
 * reusing it would hand one learner's session to the next.
 *
 * The only thing that uses this is `/auth/callback`, and that is deliberate:
 * §8 forbids reading the session anywhere a lesson renders under, so nothing
 * else on the server has any business knowing who is signed in. A pleasant
 * consequence is that this app needs no session-refresh proxy — the usual
 * `proxy.ts` in a Supabase + Next app exists to keep server renders' tokens
 * fresh, and no server render here reads a token.
 *
 * `cookies()` is a Promise in Next 16, hence the `await`.
 */
export async function createRequestClient(): Promise<{
  client: SupabaseClient;
  /** Cache headers Supabase asks for whenever auth cookies are written. A
   *  response carrying a session must never be cached by a CDN, or it is
   *  served to the next visitor. Apply these to whatever you return. */
  cacheHeaders: Record<string, string>;
} | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();
  const cacheHeaders: Record<string, string> = {};

  const client = createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet, headers) => {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
        Object.assign(cacheHeaders, headers);
      },
    },
  });

  return { client, cacheHeaders };
}
