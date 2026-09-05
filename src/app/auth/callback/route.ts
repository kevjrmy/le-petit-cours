import { NextResponse, type NextRequest } from "next/server";
import { createRequestClient } from "@/lib/supabase/server";

/**
 * Where a magic link lands.
 *
 * Supabase sends the learner to its own domain, which redirects back here with
 * a `?code=`. That code is single-use and must be exchanged for a session
 * **server-side**, which is the whole reason this route exists rather than the
 * link pointing straight at `/compte`.
 *
 * Every outcome ends at `/compte`, signed in or with a reason. A dead end on an
 * error page would be the worst place to leave someone who has just clicked a
 * link from their email.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;

  /* On Vercel the request origin is the internal one; the forwarded host is the
     domain the learner actually clicked through to, preview deploys included.
     Redirecting to `origin` would bounce them somewhere they have no session
     for — and the cookie was just set for the forwarded host. */
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const base = forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin;

  const back = (reason?: string) =>
    NextResponse.redirect(
      new URL(reason ? `/compte?erreur=${reason}` : "/compte", base),
    );

  /* Supabase reports its own failures in the query string — an expired or
     already-used link arrives here as an error, not as a missing code. */
  if (searchParams.get("error")) return back("lien");

  const code = searchParams.get("code");
  if (!code) return back("lien");

  const supabase = await createRequestClient();
  if (!supabase) return back("indisponible");

  const { error } = await supabase.client.auth.exchangeCodeForSession(code);
  if (error) return back("lien");

  const response = back();
  /* A response that sets a session cookie must not be cached by a CDN, or the
     next visitor is served someone else's session. */
  for (const [name, value] of Object.entries(supabase.cacheHeaders)) {
    response.headers.set(name, value);
  }
  return response;
}
