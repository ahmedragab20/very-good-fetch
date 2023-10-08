import { IGerneric } from "./index";
import { TCacheStrategy } from "./vCache";

export interface IVeryGoodFetchWrapperPayload {
  /**
   * options that constomizes the very good fetch behavior for this request
   * @type {IVeryGoodOptions}
   * @default {}
   * @optional
   */
  vOptions?: IVeryGoodOptions;
  /**
   * request mthod
   * @type {string}
   * @default 'GET'
   */
  method?: string;
  /**
   * Request body
   * @note: you need to stringify the body if it's an object
   * @type {any}
   * @doc https://developer.mozilla.org/en-US/docs/Web/API/Request/body
   */
  body?: any;
  /**
   * Request headers object (it'll override the default headers from the config if provided)
   * @type {IGerneric}
   * @doc https://developer.mozilla.org/en-US/docs/Web/API/Headers
   */
  headers?: IGerneric;
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
  /**
   * cache the response
   * @default undefined
   * @type {TCacheStrategy}
   * @optional
   */
  cache?: TCacheStrategy;
  /**
   * clear the old cache if it's exist
   * @default false
   * @type {boolean}
   * @optional
   */
  refreshCache?: boolean;

  /*
    picky response
    retry
    debounce
    throttle
   */
}

export type ResponseType =
  | "json"
  | "text"
  | "blob"
  | "arrayBuffer"
  | "formData";
