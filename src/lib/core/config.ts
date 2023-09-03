import { Catch } from "./index";
import { IFetchGlobalConfig } from "../types/index.ts";
import { validGlobalConfig } from "../utils/validation";
import { AppWindowState } from "../state/window";
export default (req: Partial<IFetchGlobalConfig> = {}) => {
  const internalConfig = window?.["___AR_CATCH___"]?.config;

  // as config file, this should only be set once
  const {
    baseURL = internalConfig?.baseURL || "",
    defaultOptions = internalConfig?.defaultOptions || {},
    alias = internalConfig?.alias || "$catch",
    resType = internalConfig?.resType || undefined,
    pureResponse = internalConfig?.pureResponse || false,
    onReq = internalConfig?.onReq || undefined,
    onRes = internalConfig?.onRes || undefined,
    onErr = internalConfig?.onErr || undefined,
  } = req;

  // throw error if there is an invalid global config
  validGlobalConfig(req);

  const lib = new Catch({
    baseURL,
    defaultOptions,
    resType,
    pureResponse,
    onReq,
    onRes,
    onErr,
  });

  lib.call = lib.call.bind(lib);

  // set the fetch instance to the window object
  if (!internalConfig) {
    new AppWindowState("___AR_CATCH___", lib).set();
    new AppWindowState(alias, lib).set();
    console.log(
      `%c😱 ${alias} is successfully initialized!`,
      `font-weight: bold;`
    );
  }

  // will return the same instance if the config is already initialized, to not break any current on going process in the runtime
  return lib.call;
};
