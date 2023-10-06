import { ResponseType } from "./fetch";

export interface IVeryGoodConfigContructor {
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

export interface IVeryGoodConfig {
  /**
   * base url for all requests
   * @type {string}
   * @default ''
   */
  baseUrl?: string;
  /**
   * shared headers with every request
   * @type {Object}
   * @default {}
   */
  headers?: Object;
  /**
   * mute all Logs
   * @default false
   */
  muteLogs?: boolean;
  /**
   * mute all Warnings
   * @default false
   */
  muteWarnings?: boolean;
  /**
   * mute all Errors
   * @default false
   */
  muteErrors?: boolean;
  /**
   * Responses type (you can override it from the request vOptions)
   * @default 'json'
   * @type {string}
   * @optional
   * @values 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
   */
  responseType?: ResponseType;
}

export interface IVeryGoodInterceptors {
  /**
   * triggers before the request is sent
   * @param request 
   * @returns {request}
   */
  onBeforeRequest?: (request: Request) => Request;
  /**
   * triggers after the request is sent immediately before the response is received
   * @param request 
   * @returns {request}
   */
  onAfterRequest?: (request: Request) => Request;
  /**
   * triggers after the response is received immediately before the response is returned to the caller
   * @param {response}
   * @returns {response}
   */
  onBeforeResponse?: (response: Response) => Response;
  /**
   * triggers after the response is received before the response is returned to the user
   * @param {response}
   * @returns {response}
   */
  onAfterResponse?: (response: Response) => Response;
  /**
   * triggers when an error occurs during the request
   * @param {error}
   * @returns {error}
   */
  onError?: (error: Error) => Error;
}