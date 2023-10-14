import { IVeryGoodFetchWrapperPayload } from "../types/index.ts";
import { printerror } from "../utils/console.ts";
import { onError, onRequest, onResponse } from "../utils/interceptors.ts";

export default async function vFetchEngine(
  _fetch: any,
  url: string,
  options: IVeryGoodFetchWrapperPayload
) {
  try {
    // on request interceptors
    const request = await onRequest(url, options);

    // fetch
    let response: any = null;

    await _fetch(request)
      .then((rs: any) => {
        response = rs;
        return;
      })
      .catch(async (err: any) => {
        const eMsg = (err?.message as string)?.toLowerCase() || "";
        //! this is a workaround made specially for node-fetch library
        //_ will be looking for a better solution later on

        if (eMsg.includes("invalid url")) {
          response = await await _fetch(url, { request });
          return;
        }

        printerror(err);
        response = err;
        return;
      });

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
