import { IModulesReturn } from "..";
import { printerror, printlog, printwarn } from "../utils/console";

interface ITimeout {
  /**
   * timeout in ms
   */
  timeout: number;
  /**
   * logic to excute in case the given time's over
   */
  onFailed?: Function;
  /**
   * logic to excute in case the excution has successfully completed within the given timeframe
   */
  onSuccess?: Function;
}

/**
 * utility class to apply timeout functionality on any given function
 *
 * @example
 * ```typescript
 * const timeout = new vTimeout({
 *  timeout: 200, // ms
 *  onFailed(conf) {
 *    // implement some logic if the time's over
 *  },
 *  onSuccess(conf) {
 *    // implement some logic when the excution has successfully completed within the timeframe
 *  }
 * });
 *
 * // usage
 * timeout.run(() => {
 *  // the logic that you want to excute
 * })
 * ```
 */
export default class vTimeout implements IModulesReturn {
  private readonly _timout: number;
  private readonly onFailed: Function | undefined;
  private readonly onSuccess: Function | undefined;
  private _runtime: number = 0;
  private _timeover: boolean = false;

  constructor(payload: ITimeout) {
    if (!payload.timeout || typeof payload.timeout !== "number") {
      printerror("😶 You need to pass timeout in ms (number)");
    } else if (
      (payload.onFailed && typeof payload.onFailed !== "function") ||
      (payload.onSuccess && typeof payload.onSuccess !== "function")
    ) {
      throw new TypeError(
        "🥹 the onFailed and onSuccess must be excutable (function)"
      );
    }

    this._timout = payload.timeout;
    this.onFailed = payload.onFailed;
    this.onSuccess = payload.onSuccess;
  }

  run(fn: Function) {
    printlog(fn);

    try {
      if (!fn || typeof fn !== "function") {
        throw new TypeError(
          "the - run - funciton needs to receive a function as a parameter"
        );
      }
      fn?.();
      while (true) {
        if (this._runtime >= this._timout || this._runtime >= 100) {
          printlog(
            "%📦 I'm the basecase",
            "font-size: 20px; font-weight: bold",
            this._runtime,
            this._timout
          );
          this._timeover = true;
          break;
        }

        this._runtime++;
        break;
      }
    } catch (error) {
      printerror(error);
    }
  }

  //TODO:: we can add Decorator function to wrap the run function in each module with shared logic and validations
}
