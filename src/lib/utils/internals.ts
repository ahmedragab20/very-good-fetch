/**
 * @module utils
 * this Map is used for internal purposes only to share global variables between the library components
 * @private
 */
let globalConfig = new Map<string, any>();

/**
 * @module utils
 * this function is used for internal purposes only to share global variables between the library components
 * @returns {any}
 * @private
 * @example
 * ```typescript
 * import { useGlobal } from "./lib/utils/internals";
 * 
 * useGlobal().set('key', 'value');
 * useGlobal().get('key');
 * ```
 */
export function useGlobal(): Map<string, any> {
  return globalConfig;
}
