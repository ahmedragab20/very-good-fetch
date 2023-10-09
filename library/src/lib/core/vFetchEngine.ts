import {
  IVeryGoodFetchWrapperPayload,
  IVeryGoodOptions,
} from "../types/index.ts";
import { printerror, printlog } from "../utils/console.ts";
import { onError, onRequest, onResponse } from "../utils/interceptors.ts";
import vRetry from "./vRetry.ts";

export default async function vFetchEngine(
  _fetch: any,
  url: string,
  options: IVeryGoodFetchWrapperPayload,
  vOptions?: IVeryGoodOptions
) {
  try {
    // on request interceptors
    const request = await onRequest(url, options);

    // fetch
    const response = await _fetch(request);

    if (response?.ok) {
      // on response interceptors
      const modifiedResponse = await onResponse(response);

      return modifiedResponse;
    } else {
      const error = (await response?.json()) || response;
      if (vOptions?.retry) {
        printlog("♻️ Retrying request...");

        if (!vOptions.retry.request) {
          throw new Error("Retry request is required");
        }
      }

      await onError(error);
    }
  } catch (error) {
    printerror(error);
  }
}
