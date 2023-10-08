/**
 * @module lib
 * the main entry point for the library
 */
import { IVeryGoodConfigContructor } from "./types/vConfig";
import { IVeryGoodFetchWrapperPayload } from "./types/vFetch";
import { TCacheStrategy } from "./types/vCache";

import VeryGoodConfig from "./core/vConfig";
import VeryGoodFetchWrapper from "./core/vFetch";
import VeryGoodCache from "./core/vCache";

/**
 * setup the config for the library
 * @param {IVeryGoodConfigContructor} payload
 * @returns {VeryGoodConfig}
 */
const vSetupConfig = (payload: IVeryGoodConfigContructor): VeryGoodConfig =>
  new VeryGoodConfig(payload);

/**
 * the wrapper of the fetch function
 * @param {string} url
 * @param {IVeryGoodFetchWrapperPayload} options
 * @returns {Promise<any>}
 */
const vFetch = async (
  url: string,
  options?: IVeryGoodFetchWrapperPayload
): Promise<any> => await new VeryGoodFetchWrapper(url, options).vFetch();

/**
 * the cache wrapper
 * @param {TCacheStrategy} strategy
 * @returns {VeryGoodCache}
 * @example
 * const cache = vCache("memory");
 * cache.set("key", "value");
 * cache.get("key")
 * cache.has("key")
 * cache.delete("key")
 * cache.clear()
 * cache.keys()
 * cache.values()
 * cache.asObject()
 * cache.size()
 */
const vCache = (strategy: TCacheStrategy): VeryGoodCache =>
  new VeryGoodCache(strategy);

export { vSetupConfig, vFetch, vCache };
