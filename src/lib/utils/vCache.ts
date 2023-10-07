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
    printwarn("🤦🏻‍♂️ Invalid environment");
    printwarn("sessionCache() is only available in the browser");

    return;
  }

  return sessionStorage;
}

/**
 * Returns the local storage object if available
 * @note this function is only available in the browser environment
 * @returns {Storage|undefined}
 */
export function localCache(): Storage | undefined {
  if (!isBrowser()) {
    printwarn("🤦🏻‍♂️ Invalid environment");
    printwarn("localCache() is only available in the browser");

    return;
  }

  return localStorage;
}

export function cacheFactory(
  strategy: string
): Storage | Map<string, any> | undefined {
  switch (strategy) {
    case "memory":
      return memoryCache();
    case "session":
      return sessionCache();
    case "local":
      return localCache();
    default:
      printwarn(`🤦🏻‍♂️ Invalid strategy: ${strategy}`);
      return;
  }
}

export function generateCacheKey(key: string, prefix?: string): string {
  //# it will might be changed in the future, to have option to auto generate key
  //# but for now, it's better to hardcode the key for exra stability
  if (!key) {
    printwarn("⚠️ Key is required");
    return "";
  }

  if (!prefix) {
    return key;
  }
  //TODO:: later will be added
  // return `${key}___${prefix}`;
  return key;
}

export function keyExpired(key: string, timestamp: string) {
  if (!key) {
    printwarn("⚠️ Key is required");
    return false;
  }

  const [_, prefix] = key.split("___");

  if (!prefix || !timestamp) {
    return false;
  }

  const now = Date.now();
  const diff = now - parseInt(timestamp);

  if (diff > parseInt(prefix)) {
    return true;
  }

  return false;
}
