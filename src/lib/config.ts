import { IVeryGoodConfig, IVeryGoodInterceptors } from "./types/config";
import { validateFetchInstance } from "./utils/fetch.util";
import { useGlobal } from "./utils/internals";

interface IVeryGoodConfigContructor {
  /**
   * fetch instance
   * @type {any}
   * @default null
   */
  fetchInstance?: any;
  /**
   * config - will be used as the default referance for all requests
   * @type {IVeryGoodConfig}
   * @default {}
   */
  config?: IVeryGoodConfig;
  /**
   * interceptors - functions that will be called before and after all the requests, responses and errors
   * @type {IVeryGoodInterceptors}
   * @default {}
   */
  interceptors?: IVeryGoodInterceptors;
}

export default class VeryGoodConfig {
  private readonly _fetchInstance: any = null;
  private readonly _config: IVeryGoodConfig = {};
  private readonly _interceptors: IVeryGoodInterceptors = {};

  constructor(payload: IVeryGoodConfigContructor) {
    if (payload.fetchInstance) {
      const validInstance = validateFetchInstance(payload.fetchInstance);
      this._fetchInstance = validInstance ? payload.fetchInstance : null;
    }

    this._config = payload.config || {};
    this._interceptors = payload.interceptors || {};

    // set the internal globals
    useGlobal().set("_config", this._config);
  }
}
