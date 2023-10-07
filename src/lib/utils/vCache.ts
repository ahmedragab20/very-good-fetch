import { printwarn } from "./console";
import { isBrowser } from "./helpers";

let _memoryCache: Map<string, any>;

/**
 * Returns the memory cache object <Map>
 * @note this function is available in any environment
 * @important be careful with the memory usage (try not to overuse it)
 * @returns {Map<string, any>}
 */
export function memoryCache(): Map<string, any> {
  if (!_memoryCache) {
    _memoryCache = new Map();
  }

  return _memoryCache;
}

/**
 * Returns the session storage object if available
 * @note this function is only available in the browser environment
 * @returns {Storage|undefined}
 */
export function sessionCache(): Storage | undefined {
  if (!isBrowser()) {
    printwarn("🤦🏻‍♂️ Invalid environment")
    printwarn("sessionCache() is only available in the browser");

    return;
  };

  return sessionStorage;
}

/**
 * Returns the local storage object if available
 * @note this function is only available in the browser environment
 * @returns {Storage|undefined}
 */
export function localCache(): Storage | undefined {
  if (!isBrowser()) {
    printwarn("🤦🏻‍♂️ Invalid environment")
    printwarn("localCache() is only available in the browser");

    return;
  };

  return localStorage;
}