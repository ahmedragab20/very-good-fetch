import { IVeryGoodFetchWrapperPayload } from "../types/vFetch";
import { getRequestUrl, getResponseType } from "../utils/vFetch.util";
import { useGlobal } from "../utils/internals";
import vFetchEngine from "./vFetchEngine";
import { printerror } from "../utils/console";

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

      const response = await vFetchEngine(_fetch, this._url, {
        ...restOptions,
        headers: {
          ...headers,
          ...restOptions.headers,
        },
      });

      return response?.[getResponseType(vOptions || {}, this._config || {})]();
    } catch (error) {
      printerror(error);
    }
  };
}
