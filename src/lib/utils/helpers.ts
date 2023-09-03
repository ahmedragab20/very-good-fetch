import { FetchInterceptor, IReqData } from "../types/index.ts";

interface IBodyOptions {
  /**
   * Specifies whether the body is in a URL-like format.
   */
  urlLike: boolean;

  /**
   * Specifies whether the body is in a JSON-like format.
   */
  jsonLike: boolean;
}

/**
 * Formats the request body based on the specified options.
 * @param body - The request body data.
 * @param opts - The options to configure the formatting of the request body.
 * @returns The prettified request body as a string.
 * @throws {Error} If the body is not an object.
 */
/**
 * Formats the request body based on the specified options.
 *
 * @param body - The request body data.
 * @param opts - The options to configure the formatting of the request body.
 * @returns The prettified request body as a string.
 * @throws {Error} If the body is not an object.
 */
export function prettifyRequestBody(
  body: IReqData,
  opts: Partial<IBodyOptions> = {}
): string {
  // Check if the body is an object
  if (!isObject(body)) {
    throw new Error("body must be an object");
  }

  // Set default values for options if not provided
  if (opts.urlLike === undefined) {
    opts.urlLike = false;
  }
  if (opts.jsonLike === undefined) {
    opts.jsonLike = true;
  }

  let data: any;

  // Convert the body to JSON string if jsonLike option is enabled
  if (opts.jsonLike) {
    data = JSON.stringify(body);
  } else {
    data = body;
  }

  // Redesigned to handle URL-like format for GET requests
  if (opts.urlLike) {
    // Convert the body to URL-encoded query parameters
    const queryParams = Object.keys(body).map((key) => {
      const value = isObject(body[key]) ? JSON.stringify(body[key]) : body[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });

    // Join the query parameters with "&" separator
    data = queryParams.join("&");
  }

  // Return the prettified request body
  return data;
}

export async function interceptFetch(
  onUseInterceptor: FetchInterceptor,
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    // an array to hold the interceptors
    const interceptors: FetchInterceptor[] = [];

    // a function to register interceptors
    if (isObject(onUseInterceptor)) {
      interceptors.push(onUseInterceptor);
    }

    // a function to execute the interceptors
    async function executeInterceptors(request: Request): Promise<Request> {
      let modifiedRequest = request;

      for (const interceptor of interceptors) {
        modifiedRequest =
          (await interceptor.onRequest?.(modifiedRequest)) ?? modifiedRequest;
      }

      return modifiedRequest;
    }

    // Make the actual request
    const request = new Request(url, options);

    const modifiedRequest = await executeInterceptors(request);

    const response = await fetch(modifiedRequest);

    return response;
  } catch (error) {
    if (isObject(onUseInterceptor) && onUseInterceptor.onError) {
      onUseInterceptor.onError(error);
    }
    throw error;
  }
}

export function plainFetch(url: string, options?: RequestInit) {
  return fetch(url, options);
}

export function supportedCachingStrategy(
  cache: "NO-CACHE" | "PER-SESSION" | "RELOAD"
): boolean {
  return cachingStrategies().includes(cache);
}

/**
 * Returns the supported caching strategies.
 *
 * @returns An array of supported caching strategies.
 **/
export function cachingStrategies(): string[] {
  return ["NO-CACHE", "PER-SESSION", "RELOAD"];
}

/**
 * Generates a version 4 (random) UUID.
 *
 * @returns A version 4 UUID as a string.
 */
export function uuidV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Checks if a value is an object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export function isObject(value: any) {
  // Check if the value is falsy
  if (!value) return false;

  // Check if the value is an object by comparing its toString representation
  return value && Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * awaits until the window object is available.
 */
export async function waitForWindowObject() {
  return new Promise((resolve, reject) => {
    // Check if the window object is already loaded
    if (document.readyState === "complete") {
      resolve(window); // Return the window object
    } else {
      // If the window is not yet loaded, add an event listener to wait for it
      window.addEventListener("DOMContentLoaded", () => {
        resolve(window); // Return the window object once it's loaded
      });
    }
  });
}

/**
 * A lazy window object.
 * @returns A promise that resolves to the window object.
 */
export const lazyWindow = async () => {
  const w = await waitForWindowObject();

  return w;
};

/**
 * Checks if a value is a blob.
 * @param value - The value to check.
 * @returns `true` if the value is a blob, `false` otherwise.
 */
export function isBlob(value: any): boolean {
  if (!value) return false;

  return value instanceof Blob;
}

/**
 * Converts a blob to a string.
 * @param blob  - The blob to convert to string.
 * @returns  A promise that resolves to the blob as a string.
 */
export function blobToString(blob: Blob): Promise<string | ArrayBuffer | null> {
  if (!blob || !isBlob(blob)) {
    throw new Error("You must provide a blob");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * retrieves the blob data from sessionStorage.
 * @param key - The key to retrieve the blob data.
 */
export function retrieveBlobFromSessionStorage(key: string) {
  if (!key) {
    throw new Error("You must provide a key");
  };
  

  const perSessionObject = sessionStorage.getItem("PER-SESSION");
  const blobAsString = perSessionObject
    ? JSON.parse(perSessionObject)[key]
    : null;
    
  if (blobAsString) {
    const byteCharacters = atob(blobAsString.split(",")[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: "application/octet-stream" });
    return blob;
  } else {
    return null;
  }
}
