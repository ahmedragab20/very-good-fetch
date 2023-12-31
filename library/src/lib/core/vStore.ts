import { IGerneric } from "../types/index.ts";
import { ICacheValue, TCacheStrategy } from "../types/vCache.ts";
import { printerror } from "../utils/console.ts";
import { cacheFactory, keyExpired } from "../utils/vCache.ts";
/**
 * vStore - Holds the cached data
 * @class vStore
 * @relates vCache
 */
export class vStore {
  private readonly _strategy: TCacheStrategy;

  constructor(strategy: TCacheStrategy) {
    this._strategy = strategy;
  }

  private readonly _clearExpired = (key: string) => {
    const timestamp = this._getTimestamp(key);
    const hasExpired = keyExpired(key, timestamp);

    if (hasExpired) {
      this.delete(key);
    }
  };

  private readonly _refreshKey = (key: string) => {
    if (this.has(key)) {
      this.delete(key);
    }
  };

  private readonly _getTimestamp = (key: string): string => {
    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      const value = cache.get(key);
      return value?.timestamp || "";
    } else if (cache instanceof Storage) {
      const value = cache.getItem(key);
      return JSON.parse(value!)?.timestamp || "";
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
      return "";
    }
  };

  /**
   * key exists
   * @param {string} key
   * @returns {boolean}
   */
  has(key: string): boolean {
    if (!key) {
      printerror("❌ Key is required");
      return false;
    }
    // this._clearExpired(key);

    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      return cache.has(key);
    } else if (cache instanceof Storage) {
      return cache.getItem(key) !== null;
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
      return false;
    }
  }

  /**
   * Returns the value of a key
   * @param {string} key
   * @returns {any}
   */
  get(key: string): any {
    if (!key) {
      printerror("❌ Key is required");
      return;
    }
    // this._clearExpired(key);

    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      return cache.get(key);
    } else if (cache instanceof Storage) {
      return JSON.parse(cache.getItem(key)!);
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
    }
  }

  /**
   * Sets the value of a key
   * @param {string} key
   * @param {any} value
   */
  set(key: string, value: ICacheValue) {
    if (!key || value === undefined) {
      printerror("❌ You have to send key and value!");
      return;
    }
    this._refreshKey(key);
    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      cache.set(key, value);
    } else if (cache instanceof Storage) {
      cache.setItem(key, JSON.stringify(value));
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
    }
  }

  /**
   * Deletes the value of a key in all strategies
   * @param {string} key
   */
  delete(key: string) {
    if (!key) {
      printerror("❌ Key is required");
      return;
    }

    const localCache: TCacheStrategy = "local";
    const sessionCache: TCacheStrategy = "session";
    const memoryCache: TCacheStrategy = "memory";

    const local = cacheFactory(localCache);
    const session = cacheFactory(sessionCache);
    const memory = cacheFactory(memoryCache);
    // @ts-ignore
    if (local?.getItem(key)) {
      // @ts-ignore
      local.removeItem(key);
    }
    // @ts-ignore
    if (session?.getItem(key)) {
      // @ts-ignore
      session.removeItem(key);
    }
    // @ts-ignore
    if (memory?.has(key)) {
      memory.delete(key);
    }
  }

  /**
   * Clears the cache for all strategies
   */
  clear() {
    const localCache: TCacheStrategy = "local";
    const sessionCache: TCacheStrategy = "session";
    const memoryCache: TCacheStrategy = "memory";

    const local = cacheFactory(localCache);
    const session = cacheFactory(sessionCache);
    const memory = cacheFactory(memoryCache);

    if (local instanceof Storage) {
      local.clear();
    }
    if (session instanceof Storage) {
      session.clear();
    }
    if (memory instanceof Map) {
      memory.clear();
    }
  }

  /**
   * Returns the keys of the cache
   * @returns {string[]}
   */
  keys(): string[] {
    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      return Array.from(cache.keys());
    } else if (cache instanceof Storage) {
      return Object.keys(cache);
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
      return [];
    }
  }

  /**
   * Returns the values of the cache
   * @returns {any[]}
   */
  values(): any[] {
    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      return Array.from(cache.values());
    } else if (cache instanceof Storage) {
      return Object.values(cache);
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
      return [];
    }
  }

  /**
   * Returns the cache as an object
   * @returns {IGerneric}
   */
  asObject(): IGerneric {
    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      return Object.fromEntries(cache);
    } else if (cache instanceof Storage) {
      return Object.fromEntries(Object.entries(cache));
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
      return {};
    }
  }

  /**
   * Returns the size of the cache
   * @returns {number}
   */
  size(): number {
    const cache = cacheFactory(this._strategy!);

    if (cache instanceof Map) {
      return cache.size;
    } else if (cache instanceof Storage) {
      return Object.keys(cache).length;
    } else {
      printerror("🤦🏻‍♂️ Invalid cache strategy");
      return 0;
    }
  }
}
