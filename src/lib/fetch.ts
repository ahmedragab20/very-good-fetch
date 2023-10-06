import { IVeryGoodFetchWrapperPayload } from "./types/fetch";
import { getRequestUrl, getResponseType } from "./utils/fetch.util";
import { useGlobal } from "./utils/internals";

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

    const response = await _fetch(this._url, {
      ...restOptions,
      headers: {
        ...headers,
        ...restOptions.headers,
      },
    });
    return response?.[getResponseType(vOptions || {}, this._config || {})]();
  };
}
