import { IVeryGoodConfig, IVeryGoodInterceptors } from "../types/config";
import { IVeryGoodOptions } from "../types/vFetch";

export function validateFetchInstance(fetchInstance: any): boolean {
  try {
    // Check if fetchInstance is a function.
    if (typeof fetchInstance !== 'function') {
      return false;
    }
  
    // Check if fetchInstance returns a Promise.
    const fetchPromise = fetchInstance()?.catch(() => {});
    if (!(fetchPromise instanceof Promise)) {
      return false;
    }
  
    // If all checks pass, then fetchInstance is a valid Fetch instance.
    return true;
  } catch (error) {
    console.error('The fetch instance provided is not valid.');
    return false;
  }
}

export function getRequestUrl (url: string, config: IVeryGoodConfig): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    return config?.baseUrl + url;
  }
}

export function getResponseType (vOptions: IVeryGoodOptions, config: IVeryGoodConfig): string {
  const { responseType } = vOptions;
  if (responseType) {
    return responseType || "json";
  } else {
    return config?.responseType || "json";
  }
}