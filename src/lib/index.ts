/**
 * @module lib
 * the main entry point for the library
 */
import { IVeryGoodConfigContructor } from "./types/config";
import { IVeryGoodFetchWrapperPayload } from "./types/fetch";

import VeryGoodConfig from "./config";
import VeryGoodFetchWrapper from "./vfetch";

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
