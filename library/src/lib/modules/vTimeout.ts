import { IModulesReturn } from "..";
import { printerror } from "../utils/console";

interface ITimeout {
  /**
   * timeout in ms
   */
  timeout: number;
  /**
   * logic to excute in case the given time's over
   */
  onFailed?: Function;
}

/**
 * utility class to apply timeout functionality on any asynchronous operation
 *
 * @example
 * ```typescript
 * const timeout = new vTimeout({
 *  timeout: 200, // ms
 *  onFailed() {
 *    // implement some logic if the time's over
 *  }
 * });
 *
 * // usage (ts)
 * const response = await timeout.run<string>(async () => {
 *  const res = await vFetch("/products", {
 *    signal: abort.signal,
 *  });
 *
 *  return res;
 * });
 *
 * // usage (js)
 * const response = await timeout.run(async () => {
 *  const res = await vFetch("/products", {
 *  signal: abort.signal,
 * });
 * ```
 */
export default class vTimeout implements IModulesReturn {
  private readonly _timout: number;
  private readonly onFailed: Function | undefined;
  private _runtime: number = 0;
  private _done: boolean = false;

  constructor(payload: ITimeout) {
    if (!payload.timeout || typeof payload.timeout !== "number") {
      printerror("😶 You need to pass timeout in ms (number)");
    } else if (payload.onFailed && typeof payload.onFailed !== "function") {
      throw new TypeError("🥹 the onFailed function must be excutable");
    }

    this._timout = payload.timeout;
    this.onFailed = payload.onFailed;
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    try {
      if (!fn || typeof fn !== "function") {
        throw new TypeError(
          "the - run - funciton needs to receive a function as a parameter"
        );
      }

      const startRuntime = setInterval(() => {
        this._runtime += 100;
        if (this._runtime >= this._timout) {
          clearInterval(startRuntime);
          if (!this._done) {
            this.onFailed?.();
          }
        }
      }, 50);

      const res = await fn?.();
      this._done = true;
      return Promise.resolve(res);
    } catch (error) {
      printerror(error);
      return Promise.reject(error);
    }
  }

  //TODO:: we can add Decorator function to wrap the run function in each module with shared logic and validations
}
