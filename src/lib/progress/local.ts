import type { Pending, Progress, ProgressStore } from "./store";

/**
 * The local cache: IndexedDB, not `localStorage`.
 *
 * Chosen for durability — a browser evicting a learner's progress is a real
 * loss, and `localStorage` is the first thing to go (`docs/decisions.md` #24).
 * `localStorage` keeps exactly one job in this app, the theme, because that one
 * must be read before first paint and this cannot be: IndexedDB is async.
 *
 * **Keyed by account id**, so two people signing in on the same browser cannot
 * see each other's ticks. The key is the user's uuid rather than their name,
 * which is mutable.
 *
 * Every operation is wrapped: IndexedDB is unavailable in some private modes
 * and can be denied outright. A learner with no cache still gets a working tick
 * — it just costs a round trip and does not survive going offline. Failing
 * loudly here would break the page over a cache.
 */
const DB_NAME = "lepetitcours";
const DB_VERSION = 1;
const STORE = "progress";

/**
 * The shape of a cached record. Bumped when the meaning of its keys changes —
 * `1` was keyed by route path, `2` by lesson id (`docs/decisions.md` #50) — and
 * a record from any other version is dropped rather than read.
 *
 * Dropping it is safe because this is a **cache**: the server holds the same
 * ticks, and the next online load refills it. What it does cost is a pending
 * queue written offline under the old keys, which cannot be replayed against
 * the new column at all. That is the whole price of the rekey, and it is paid
 * once, by a learner who ticked something offline and did not reconnect before
 * updating.
 */
const CACHE_VERSION = 2;

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("indexeddb blocked"));
  });
}

function transact<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const request = run(tx.objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => db.close();
      }),
  );
}

/** One learner's cached record. */
interface Cached {
  version: number;
  ticks: Progress;
  pending: Pending;
}

const EMPTY: Cached = { version: CACHE_VERSION, ticks: {}, pending: {} };

async function read(userId: string): Promise<Cached> {
  try {
    const value = await transact<Cached | undefined>("readonly", (store) =>
      store.get(userId),
    );
    /* Written by an older version of this app, or by nothing at all. Believed
       only in the shape it is expected in — the same posture `src/lib/account.ts`
       takes to metadata. */
    if (!value || typeof value !== "object") return EMPTY;
    if (value.version !== CACHE_VERSION) return EMPTY;
    return {
      version: CACHE_VERSION,
      ticks: plain(value.ticks),
      pending: plain(value.pending) as Pending,
    };
  } catch {
    return EMPTY;
  }
}

function plain(value: unknown): Progress {
  if (!value || typeof value !== "object") return {};
  return value as Progress;
}

async function write(userId: string, value: Cached): Promise<void> {
  try {
    await transact("readwrite", (store) => store.put(value, userId));
  } catch {
    /* No cache this visit. The in-memory state still holds and the server is
       still the truth. */
  }
}

/**
 * The cache as a `ProgressStore`, plus the pending queue it also holds.
 *
 * The queue lives here rather than in the provider because it has to outlive
 * the tab: a tick made in the métro is only worth anything if it is still
 * waiting when the connection comes back.
 */
export function localStore(userId: string): ProgressStore & {
  loadPending(): Promise<Pending>;
  savePending(pending: Pending): Promise<void>;
} {
  return {
    async load() {
      return (await read(userId)).ticks;
    },
    async save(next) {
      const current = await read(userId);
      await write(userId, { ...current, ticks: next });
    },
    async loadPending() {
      return (await read(userId)).pending;
    },
    async savePending(pending) {
      const current = await read(userId);
      await write(userId, { ...current, pending });
    },
  };
}
