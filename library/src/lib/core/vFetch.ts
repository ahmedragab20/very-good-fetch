import { IVeryGoodFetchWrapperPayload } from "../types/vFetch";
import { getRequestUrl, getResponseType } from "../utils/vFetch.util";
import { useGlobal } from "../utils/internals";
import vFetchEngine from "./vFetchEngine";
import { printerror } from "../utils/console";
import VeryGoodCache from "./vCache";
export default class veryGoodFetchWrapper {
  private readonly _url: string = "";
  private readonly _options: IVeryGoodFetchWrapperPayload = {};
  private readonly _config: any = {};
  private readonly _vFetch: any = fetch || null;

  constructor(url: string, options?: IVeryGoodFetchWrapperPayload) {
    this._config = useGlobal().get("_config") || {};
    this._vFetch = useGlobal().get("_vFetch");
    this._url = getRequestUrl(url, this._config);
    this._options = options || {};
  }

  public readonly vFetch = async () => {
    try {
      const { vOptions, ...restOptions } = this._options;
      const headers = this._config?.headers || {};

      let _fetch;
      if (this._vFetch) {
        _fetch = this._vFetch;
      } else {
        // it should never get here, but just in case
        // life is full of surprises, MAN! 🤷‍♂️
        _fetch = fetch || null;
      }
      const cacheBox =
        vOptions && vOptions.cache ? new VeryGoodCache(vOptions.cache) : null;

      if (cacheBox && !vOptions?.refreshCache) {
        const cachedResponse = cacheBox?.get(this._url);

        if (cachedResponse) return cachedResponse;
      }

      if (cacheBox && vOptions?.refreshCache && vOptions?.cache)
        cacheBox?.delete(this._url);

      const response = await vFetchEngine(_fetch, this._url, {
        ...restOptions,
        headers: {
          ...headers,
          ...restOptions.headers,
        },
      });

      const finalResponse = !!getResponseType?.(
        vOptions || {},
        this._config || {}
      )
        ? await response?.[
            getResponseType?.(vOptions || {}, this._config || {})
          ]?.()
        : response;

      console.log(finalResponse);

      if (cacheBox && vOptions?.cache) cacheBox?.set(this._url, finalResponse);
      
      return finalResponse;
    } catch (error) {
      printerror(error);
    }
  };
}
