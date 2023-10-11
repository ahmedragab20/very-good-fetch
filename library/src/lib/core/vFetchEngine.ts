import { IVeryGoodFetchWrapperPayload } from "../types/index.ts";
import { printerror } from "../utils/console.ts";
import { onError, onRequest, onResponse } from "../utils/interceptors.ts";
import vRetry from "../modules/vRetry.ts";

export default async function vFetchEngine(
  _fetch: any,
  url: string,
  options: IVeryGoodFetchWrapperPayload
) {
  try {
    // on request interceptors
    const request = await onRequest(url, options);

    // fetch
    const response = await _fetch(request);

    if (response?.ok) {
      // on response interceptors
      const modifiedResponse = await onResponse(response);

      return modifiedResponse || response;
    } else {
      const error = (await response?.json()) || response;

      const modifiedError = await onError(error);

      return modifiedError || error;
    }
  } catch (error) {
    printerror(error);
    // it'll not exute twice, just if it got unexpected error like aborting the request
    const modifiedError = await onError(error);

    return modifiedError || error;
  }
}
