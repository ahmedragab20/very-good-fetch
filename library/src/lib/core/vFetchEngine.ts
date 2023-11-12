import { IVeryGoodFetchWrapperPayload } from "../types/index.ts";
import { printerror } from "../utils/console.ts";
import { onError, onRequest, onResponse } from "../utils/interceptors.ts";

export default async function vFetchEngine(
  _fetch: any,
  url: string,
  options: IVeryGoodFetchWrapperPayload
) {
  // fetch
  let reqReturn: any = null;
  try {
    // on request interceptors
    const request = await onRequest(url, options);

    await _fetch(request)
      .then((rs: any) => {
        reqReturn = rs;

        return;
      })
      .catch(async (err: any) => {
        const eMsg = (err?.message as string)?.toLowerCase() || "";
        //! this is a workaround made specially for node-fetch library
        //_ will be looking for a better solution later

        if (eMsg.includes("invalid url")) {
          reqReturn = await await _fetch(url, { request });
          return;
        }

        printerror(err);
        reqReturn = err;
        return;
      });

    if (reqReturn?.ok) {
      // on response interceptors
      const modifiedResponse = await onResponse(reqReturn);

      return modifiedResponse || reqReturn;
    } else {
      const error = (await reqReturn?.json?.()) || reqReturn;

      const modifiedError = await onError(error);

      // internal error indicator
      return {
        statusCode: 1948 /* 🇵🇸 Palestine, we will never forget */,
        error: modifiedError || error,
      };
    }
  } catch (error) {
    printerror(error);

    return {
      statusCode: 1948,
      error: "unexpected error",
    };
  }
}
