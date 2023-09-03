import {
  TCacheStrategy,
  FetchInterceptor,
  IFetchGlobalConfig,
  IRequestConfig,
  IRequestOptions2,
} from "../types/index.ts";
import type { TAvailableResponseTypes } from "../types/index.ts";

import Cache from "../utils/Cache";

import {
  prettifyRequestBody,
  interceptFetch,
  plainFetch,
  isObject,
} from "../utils/helpers";
import { validRequestConfig } from "../utils/validation";

export class Catch {
  private readonly config: Partial<IFetchGlobalConfig>;

  constructor(config: Partial<IFetchGlobalConfig>) {
    if (!config || !isObject(config)) {
      throw new Error(
        "Please provide valid config object, check the docs for more info"
      );
    }

    this.config = config;
  }

  private readonly _getRequestBody = (
    method: string,
    url: string,
    opts: any
  ) => {
    let internalUrl = url; // to be used in the urlLike option
    // handle request body
    if (method !== "GET" && isObject(opts?.body)) {
      opts.body = prettifyRequestBody(opts.body);
    } else if (method === "GET" && isObject(opts?.body)) {
      const body = prettifyRequestBody(opts.body, { urlLike: true });

      internalUrl += `?${body}`;
    }

    return { url: internalUrl, opts };
  };

  /**
   * the params structure
   *
   * @param req {string | Partial<IRequestConfig>} - the request url or the request config
   * @param reqOptions2 {IRequestOptions2} - ONLY used if the first param was the Direct URL the request options
   */
  public async call(
    req: Partial<IRequestConfig> | string,
    reqOptions2: IRequestOptions2 = {}
  ): Promise<any> {
    try {
      // throw error if used a DirectLink the second param is not an object
      const usedDirectURLWithWrongParams =
        typeof req !== "string" &&
        isObject(reqOptions2) &&
        Object.keys(reqOptions2).length;

      // throw error if the second param is not an object
      const usedReqOptions2AsNotObject = !isObject(reqOptions2);

      if (usedDirectURLWithWrongParams || usedReqOptions2AsNotObject) {
        throw new Error(
          "Please provide valid params, check the docs for more info"
        );
      }
      if (
        isObject(req) &&
        (req as Partial<IRequestConfig>)?.ep &&
        (req as Partial<IRequestConfig>)?.fullPath
      ) {
        throw new Error(
          "You can't use both ep and fullPath in the same request"
        );
      }

      // throw error if there is an invalid request config
      validRequestConfig(req);

      // set this to be used inside the interceptors
      const that = this;

      // handle request configs
      let url: string = "";
      const hasDirectURL = typeof req === "string";

      const method = hasDirectURL
        ? reqOptions2?.customOptions?.method?.toLocaleUpperCase() || "GET"
        : req?.method?.toLocaleUpperCase() || "GET";

      const cachingMechanism = hasDirectURL
        ? (reqOptions2?.customOptions?.cache?.toLocaleUpperCase() as TCacheStrategy) ||
          "NO-CACHE"
        : (req?.cache?.toLocaleUpperCase() as TCacheStrategy) || "NO-CACHE";

      const clearRequestCache: boolean = !!hasDirectURL
        ? reqOptions2?.customOptions?.clearCache || false
        : req?.clearCache || false;

      let ep = hasDirectURL ? "" : req?.ep || "";
      let options = hasDirectURL ? reqOptions2 || {} : req?.options || {};
      let fullPath = hasDirectURL ? "" : req?.fullPath || "";
      const resType: TAvailableResponseTypes = hasDirectURL
        ? reqOptions2?.customOptions?.resType || this.config?.resType || "json"
        : req?.resType || this.config?.resType || "json";
      const pureResponse = hasDirectURL
        ? reqOptions2?.customOptions?.pureResponse ||
          this.config?.pureResponse ||
          false
        : req?.pureResponse || this.config?.pureResponse || false;

      // handle request url
      if (hasDirectURL) {
        url = !!reqOptions2.customOptions?.useWithBaseURL
          ? `${this.config.baseURL}${req}`
          : `${req}`;
      } else {
        const customizedUrl =
          !!this.config.baseURL && !!ep
            ? `${this.config.baseURL}${ep}`
            : (ep as string);

        url = fullPath || customizedUrl;
      }

      // set warning on the DELETE method with object body
      if (
        ["DELETE", "HEAD", "OPTIONS", "TRACE"].includes(method) &&
        isObject(options?.body)
      ) {
        console.warn(
          `%cWarning: You're using the ${method} method with a request body.`,
          "color: #ff7f00; font-weight: bold"
        );
        console.warn(
          `%cThe ${method} traditionally does not support request bodies according to the HTTP/1.1 specification.`,
          "font-weight: bold"
        );
        console.warn(
          `%cSending a request body with ${method} may lead to compatibility issues, caching problems, and security risks.`,
          "font-weight: bold"
        );
        console.warn(
          "%cConsider reviewing the API documentation or guidelines to ensure proper usage and alternative approaches.",
          "font-weight: bold"
        );
      }

      // once we're done with the request config, should clear the reqOptions2 that will be sent directly to the fetch
      if (hasDirectURL && reqOptions2?.customOptions) {
        delete reqOptions2.customOptions;
      }

      // handle request options
      let opts: any = {};
      if (options && !!Object.keys(options).length) {
        Object.keys(options).forEach((key) => {
          if (this.config.defaultOptions?.[key] && options?.[key]) {
            opts[key] = {
              ...this.config.defaultOptions?.[key],
              ...options[key],
            };

            return;
          }

          opts[key] = options?.[key];
        });
      }

      // handle request body
      if (
        method &&
        opts &&
        !!isObject(opts) &&
        Object.keys(opts)?.length &&
        isObject(opts?.body)
      ) {
        if (!url) {
          throw new Error("there's something wrong with the URL");
        }
        if (url.includes("?")) {
          throw new Error("You're URL already is quired");
        }

        opts.body = this._getRequestBody(method, url, opts).opts.body;

        url = this._getRequestBody(method, url, opts).url; // whether it'll be returned the same or with the body

        if (method === "GET" && !!isObject(opts?.body)) {
          // after formatting the body, it should be delete if the method is GET to not send it with the request
          delete opts.body;
        }
      }

      // Define interceptor functions
      const requestInterceptor: FetchInterceptor = {
        onRequest: function (newReq: Request): any {
          return that.config?.onReq?.(newReq);
        },
        onError: function (error: any) {
          return that.config?.onErr?.(error);
        },
      };

      // TIP:: the cache will be used only if the request method is GET [makes sense right?😃]
      const cache = new Cache(method !== "GET" ? "NO-CACHE" : cachingMechanism);

      // Clear the cache if needed
      if (clearRequestCache) {
        cache.clearCache(url);
      }

      if (cache.isCached(url)) {
        return cache.get(url);
      }

      // Execute the request
      const hasRequestInterceptor = !!this.config.onReq; // to not execute the interceptor if it's not needed [performance]
      const response = !!hasRequestInterceptor
        ? await interceptFetch(requestInterceptor, url, {
            method,
            ...opts,
          })
        : await plainFetch(url, {
            method,
            ...opts,
          });
      // Modify the response object
      const modifiedResponse = !!this.config?.onRes
        ? ((await this.config?.onRes?.(response)) as Response)
        : response;
      const data =
        !!modifiedResponse?.ok && !pureResponse
          ? await modifiedResponse?.[resType]?.()
          : modifiedResponse || {};

      // Cache the response [already handles if it doesn't have to cache it]
      cache.set(url, data);
      return data;
    } catch (error) {
      console.error(error);
      return this.config?.onErr?.(error);
    }
  }
}
