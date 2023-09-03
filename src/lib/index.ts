import initCatch from "./core/config";
import {
  ICacheManager,
  IFetchGlobalConfig,
  ILibExposedOptions,
  IRequestConfig,
  IRequestOptions2,
  TCacheStrategy,
} from "./types/index";
import Cache from "./utils/Cache";

/**
 * Custom hook to manage caching based on the provided caching strategy.
 * @param strategy - The caching strategy to use.
 * @param key - The key for the cache.
 * @param value - The value to be cached.
 * @returns An object with cache management functions.
 * @throws {Error} If the caching strategy is not provided.
 */
const useCacheUtil = (strategy: TCacheStrategy): ICacheManager => {
  if (!strategy) {
    throw new Error("Please provide a caching strategy");
  }

  const cache = new Cache(strategy);

  /**
   * Get the cached keys.
   * @returns An array of cached keys.
   */
  const getCachedKeys = () => cache.cachedKeys;

  /**
   * Get the cached value for the specified key.
   * @param key - The cache key.
   * @returns The cached value.
   */
  const get = (key: string) => cache.get(key);

  /**
   * Set the cache value for the specified key.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  const set = (key: string, value: any) => cache.set(key, value);

  /**
   * Clear the cache for the specified key.
   * @param key - The cache key to clear.
   */
  const clearCache = (key: string) => cache.clearCache(key);

  /**
   * Clear all caches based on the caching strategy.
   */
  const clearAllCaches = () => cache.clearAllCaches();

  /**
   * Check if a specific key is cached.
   * @param key - The cache key.
   * @returns True if the key is cached, false otherwise.
   */
  const isCached = (key: string) => cache.isCached(key);

  return {
    getCachedKeys,
    get,
    set,
    clearCache,
    clearAllCaches,
    isCached,
  };
};

/**
 * This is the main entry point of the library, used to configure global settings.
 * @param {IFetchGlobalConfig} req - The global configuration object for the library.
 * @returns {Function} - A function to use the configured settings.
 * @example
 * import { $catch } from "ar-catch";
 *
 * // Configure the library with global settings
 * catch({
 *   // The base URL used for all requests
 *   baseURL: "your.base.url",
 *
 *   // You can use it to get all the library information
 *   alias: "$anything",
 *
 *   // The default options for all requests, similar to the options in the fetch() method
 *   defaultOptions: {
 *     headers: {},
 *     ...etc
 *   },
 *
 *   // This function will be executed before the request is sent
 *   onReq: (req) => {
 *     // Modify the request object or perform actions before sending the request
 *     // e.g., adding custom headers, authentication, etc.
 *   },
 *
 *   // This function will be executed after the request is sent and a response is received
 *   onRes: (res) => {
 *     // Process the response or perform actions after receiving the response
 *     // e.g., handling global error responses, logging, etc.
 *   },
 *
 *   // This function will be executed if there is an error during the request or response handling
 *   onErr: (err) => {
 *     // Handle the error or perform actions when an error occurs
 *     // e.g., handling network errors, displaying error messages, etc.
 *   },
 * });
 *
 * @tip if you found an issue to access the alias globally, try using (window.yourAlias)
 */
const $catch = initCatch;

/**
 * This is the main entry point of the library, used to configure global settings.
 * @returns
 * - A function to use the configured settings. (config)
 * - A function to trigger a request. ($catch)
 * - A function to manage caching. (useCache)
 * @example
 * import useCatch from "ar-catch";
 *
 * // Configure the library with global settings
 * useCatch.config({
 * ...configurations
 * });
 *
 * // Trigger a request
 * useCatch.$catch("https://jsonplaceholder.typicode.com/todos/1")
 *  .then((res) => console.log(res))
 *  .catch((err) => console.log(err));
 *
 * // Manage caching
 * const { get, set, clearCache, clearAllCaches, isCached } = useCatch.useCache();
 */
const expose = (): ILibExposedOptions => {
  const config = async (config: Partial<IFetchGlobalConfig>) => {
    if (!config) {
      throw new Error("Please provide a valid configuration");
    }

    return $catch(config);
  };

  const trigger = async (
    req: Partial<IRequestConfig> | string,
    reqOptions2: IRequestOptions2 = {}
  ) => {
    return $catch()(req, reqOptions2);
  };

  const useCache = (strategy: TCacheStrategy) => useCacheUtil(strategy);

  return {
    /**
     * a utility function to trigger a request.
     * @namespace $catch
     * @param {string} url - The URL to send the request to.
     * @param {IRequestOptions2} options - The request options.
     * @returns {Promise} - A promise that resolves to the response.
     * @example without options
     * import useCatch from "ar-catch";
     * useCatch.$catch("https://jsonplaceholder.typicode.com/todos/1")
     *  .then((res) => console.log(res))
     *  .catch((err) => console.log(err));
     *
     * @example with options
     * import useCatch from "ar-catch";
     * useCatch.$catch("https://jsonplaceholder.typicode.com/todos/1", {
     *  customOptions: {
     *    method: "POST",
     *    cache: "PER-SESSION",
     *    ...etc
     *  }
     *
     *  ...properties that you wanna send like body, headers, etc
     * });
     */
    $catch: trigger,
    /**
     * a utility function to configure global settings.
     * @namespace config
     * @param {IFetchGlobalConfig} config - The global configuration object for the library.
     * @returns {Function} - A function to use the configured settings. [the same one as $catch]
     * @example
     * import useCatch from "ar-catch";
     * useCatch.config({
     *  // The base URL used for all requests
     *  baseURL: "your.base.url",
     *  // You can use it to get all the library information
     *  alias: "$anything",
     *  // The default options for all requests, similar to the options in the fetch() method
     *  defaultOptions: {
     *  headers: {},
     *  ...etc
     *  },
     * // This function will be executed before the request is sent
     *  onReq: (req) => {
     *  // Modify the request object or perform actions before sending the request
     *  // e.g., adding custom headers, authentication, etc.
     *  },
     *  // This function will be executed after the request is sent and a response is received
     *  onRes: (res) => {
     *  // Process the response or perform actions after receiving the response
     *  // e.g., handling global error responses, logging, etc.
     *  },
     *  // This function will be executed if there is an error during the request or response handling
     *  onErr: (err) => {
     *  // Handle the error or perform actions when an error occurs
     *  // e.g., handling network errors, displaying error messages, etc.
     *  },
     * });
     */
    config: config,
    /**
     * a utility function to manage caching based on the provided caching strategy.
     * @namespace useCache
     * @param {TCacheStrategy} strategy - The caching strategy to use.
     * @returns An object with cache management functions.
     * @throws {Error} If the caching strategy is not provided.
     **/
    useCache: useCache,
  };
};
export * from "./types";
export default {
  /**
   * Ar-Catch Library entry point.
   */
  ...expose(),
};
