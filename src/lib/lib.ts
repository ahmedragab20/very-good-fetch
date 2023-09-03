import libExpose from "./index";
import "./types/index";
export * from "./types/index";

const { $catch, config, useCache } = libExpose;
export {
  /**
   * The default export from the library.
   * includes the following:
   * - $catch (returns a promise)
   * - config (sets the default config for the library)
   * - useCache (standalone caching system from the library)
   */
  libExpose as default,
  
  /**
   * the $catch function from the library.
   * - used to make requests
   * @returns a promise
   */
  $catch,

  /**
   * the config function from the library.
   * - used to set the default config for the library
   * @returns a promise
   */
  config,

  /**
   * the useCache function from the library.
   * - used to cache data as a standalone function
   */
  useCache,
};
