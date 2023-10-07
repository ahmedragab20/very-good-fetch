import { generateCacheKey } from "../utils/vCache";
import { IGerneric } from "../types";
import { TCacheStrategy } from "../types/vCache";
import { printerror } from "../utils/console";
import { vStore } from "./vStore";

interface ICacheOptions {
  expires: number;
}

export default class vCache {
  private readonly _strategy: TCacheStrategy | undefined;

  constructor(strategy: TCacheStrategy) {
    if (!strategy) {
      printerror("🤦🏻‍♂️ You have to send strategy!");
      return;
    }

    this._strategy = strategy;
  }

  /**
   * Sets a value to a key
   * @param {string} key
   * @param {any} value
   * @param {ICacheOptions} options
   */
  set(key: string, value: any, options?: ICacheOptions) {
    if (!key || value === undefined) {
      printerror("❌ You have to send key and value!");
      return;
    }
    let k;

    if (options && options.expires) {
      k = generateCacheKey(key, options.expires?.toString());
    } else {
      k = generateCacheKey(key);
    }

    const store = new vStore(this._strategy!);
    store.set(k, {
      __addedAt: Date.now(),
      value,
    });
  }

  /**
   * Returns the value of a key
   * @param {string} key
   * @returns {any}
   */
  get(key: string): any {
    if (!key) {
      printerror("‼️ You have to send key!");
      return;
    }

    const store = new vStore(this._strategy!);
    return store.get(key);
  }

  /**
   * Returns if the key exists
   * @param {string} key
   * @returns {boolean}
   */
  has(key: string): boolean {
    if (!key) {
      printerror("‼️ You have to send key!");
      return false;
    }

    const store = new vStore(this._strategy!);
    return store.has(key);
  }

  /**
   * Deletes the value of a key
   * @param {string} key
   */
  delete(key: string) {
    if (!key) {
      printerror("‼️ You have to send key!");
      return;
    }

    const store = new vStore(this._strategy!);
    store.delete(key);
  }

  /**
   * Clears the cache
   */
  clear() {
    const store = new vStore(this._strategy!);
    store.clear();
  }

  /**
   * Returns the keys of the cache
   * @returns {string[]}
   */
  keys(): string[] {
    const store = new vStore(this._strategy!);
    return store.keys();
  }

  /**
   * Returns the values of the cache
   * @returns {any[]}
   */
  values(): any[] {
    const store = new vStore(this._strategy!);
    return store.values();
  }

  /**
   * Returns the cache as an object
   * @returns {IGerneric}
   */
  asObject(): IGerneric {
    const store = new vStore(this._strategy!);
    return store.asObject();
  }

  /**
   * Returns the size of the cache
   * @returns {number}
   */
  size(): number {
    const store = new vStore(this._strategy!);
    return store.size();
  }
}
