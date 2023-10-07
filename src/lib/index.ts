/**
 * @module lib
 * the main entry point for the library
 */
import { IVeryGoodConfigContructor } from "./types/vConfig";
import { IVeryGoodFetchWrapperPayload } from "./types/vFetch";

import VeryGoodConfig from "./core/vConfig";
import VeryGoodFetchWrapper from "./core/vFetch";

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
): Promise<any> =>
  await new VeryGoodFetchWrapper(url, options).vFetch();

export { vSetupConfig, vFetch };
