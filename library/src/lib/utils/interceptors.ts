import { IVeryGoodFetchWrapperPayload } from "../types/index.ts";
import { useGlobal } from "./internals.ts";

export async function onRequest(
  url: string,
  options: IVeryGoodFetchWrapperPayload
): Promise<Request> {
  const _interceptors = useGlobal().get("_interceptors") || {};
  const onBeforeRequest = _interceptors?.onBeforeRequest || null;
  const onAfterRequest = _interceptors?.onAfterRequest || null;

  const request = new Request(url, options);
  let modifiedRequest = null;

  if (onBeforeRequest) {
    modifiedRequest = await onBeforeRequest(request);

    if (!modifiedRequest) {
      throw new Error("onBeforeRequest must return a Request object");
    }
  }
  if (onAfterRequest) {
    modifiedRequest = await onAfterRequest(request);

    if (!modifiedRequest) {
      throw new Error("onAfterRequest must return a Request object");
    }
  }

  return modifiedRequest || request;
}

export async function onResponse(response: Response): Promise<Response | any> {
  const _interceptors = useGlobal().get("_interceptors") || {};
  const onBeforeResponse = _interceptors?.onBeforeResponse || null;

  let modifiedResponse = null;

  if (onBeforeResponse) {
    modifiedResponse = await onBeforeResponse(response);

    if (!modifiedResponse) {
      throw new Error("onBeforeResponse must return a Response object");
    }
  }

  return modifiedResponse || response;
}

export async function onError(error: any): Promise<Error | any> {
  const _interceptors = useGlobal().get("_interceptors") || {};
  const _onError = _interceptors?.onError || null;
  let modifiedError = null;
  if (_onError) {
    modifiedError = await _onError(error);
  }

  return modifiedError || error;
}
