import { IGerneric } from "../types/index.ts";
import { printerror } from "../utils/console";
import { onError, onRequest, onResponse } from "../utils/interceptors";

export default async function vFetchEngine(
  _fetch: any,
  url: string,
  options: IGerneric
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
      await onError(response)
    }
  } catch (error) {
    printerror(error);
  }
}
