export interface IVeryGoodFetchWrapperPayload {
  /**
   * options that constomizes the very good fetch behavior for this request
   * @type {IVeryGoodOptions}
   * @default {}
   * @optional
   */
  vOptions?: IVeryGoodOptions;
  [key: string]: any;
}

export interface IVeryGoodOptions {
  /**
   * Response type (it'll override the default responseType from the config if provided)
   * @default 'json'
   * @type {string}
   * @optional
   * @values 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
   */
  responseType?: ResponseType;

  /*
    picky response
    retry
    debounce
    throttle
    Caching
   */
}

export type ResponseType = "json" | "text" | "blob" | "arrayBuffer" | "formData";
