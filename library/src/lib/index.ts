/**
 * @module lib
 * the main entry point for the library
 */
import { IVeryGoodConfigConstructor } from "./types/vConfig";
import { IVeryGoodFetchWrapperPayload } from "./types/vFetch";

import VeryGoodConfig from "./core/vConfig";
import VeryGoodFetchWrapper from "./core/vFetch";
import vCache from "./core/vCache";
import vRetry from "./modules/vRetry";
import vDebounce from "./modules/vDebounce";
import vThrottle from "./modules/vThrottle";
import vTimeout from "./modules/vTimeout";

export * from "./types/index";

/**
 * setup the config for the library
 * @param {IVeryGoodConfigConstructor} payload
 * @returns {VeryGoodConfig}
 */
const vSetupConfig = (payload: IVeryGoodConfigConstructor): VeryGoodConfig =>
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

export { vSetupConfig, vFetch, vCache, vRetry, vDebounce, vThrottle, vTimeout };
