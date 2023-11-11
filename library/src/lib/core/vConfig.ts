import {
  IVeryGoodConfig,
  IVeryGoodConfigConstructor,
  IVeryGoodInterceptors,
} from "../types/vConfig";
import { validateFetchInstance } from "../utils/vFetch.util";
import { useGlobal } from "../utils/internals";

export default class VeryGoodConfig {
  private readonly _fetchInstance: any = null;
  private readonly _config: IVeryGoodConfig = {};
  private readonly _interceptors: IVeryGoodInterceptors = {};

  constructor(payload: IVeryGoodConfigConstructor) {
    if (payload.fetchInstance) {
      const validInstance = validateFetchInstance(payload.fetchInstance);
      if (validInstance) {
        this._fetchInstance = payload.fetchInstance;
      } else {
        throw new Error(
          "The fetch instance provided is not valid, check: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
        );
      }
    } else {
      if ("fetch" in globalThis) {
        const validInstance = validateFetchInstance(globalThis.fetch);
        if (validInstance) this._fetchInstance = globalThis.fetch;
        else throw new Error("The global fetch instance is not valid");
      } else {
        throw new Error(
          "No valid fetch instance provided and no global fetch instance found, make sure that the fetch API is available in your environment"
        );
      }
    }

    this._config = payload.config || {};
    this._interceptors = payload.interceptors || {};

    // set the internal globals
    useGlobal().set("_config", this._config);
    // set the fetch instance
    useGlobal().set("_vFetch", this._fetchInstance);
    useGlobal().set("_interceptors", this._interceptors);
  }
}
