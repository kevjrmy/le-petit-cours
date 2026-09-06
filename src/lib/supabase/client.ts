import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * The browser Supabase client, created once.
 *
 * Memoised deliberately: every `createBrowserClient` call stands up another
 * auth instance on the same storage key, and two of them racing each other on
 * token refresh is a class of bug that only shows up after an hour of use.
 *
 * Returns `null` when the environment variables are absent, rather than
 * throwing. Someone who clones this repo without an `.env` should still get a
 * working site — the whole course is public and static, and only the account
 * chrome degrades. `useAccount` reads that as "signed out", which is true.
 *
 * The publishable key is public by design and row-level security is what
 * protects a learner's rows (`docs/decisions.md` #21). There is no secret here.
 */
let client: SupabaseClient | null | undefined;

export function getSupabaseClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  client = url && key ? createBrowserClient(url, key) : null;
  return client;
}
