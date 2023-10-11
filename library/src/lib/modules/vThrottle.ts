import { printerror } from "../utils/console";
interface IThrottle {
  delay: number;
}

/**
 * utility class to throttle function calls
 *
 * @example
 * ```typescript
 * const debounce = new vDebounce({ delay: 1000 });
 * debounce.run(() => console.log("debounce"));
 * ```
 */
export default class vThrottle {
  private _delay: number;
  private _lastFn: any;

  constructor(payload: IThrottle) {
    this._delay = payload.delay;
  }
  public run(fn: Function) {
    if (!fn || typeof fn !== "function") {
      throw new TypeError(
        "vThrottle needs to receive a function as a parameter"
      );
    }
    try {
      if (!this._lastFn) {
        this._lastFn = fn;
        fn();
      } else {
        setTimeout(() => {
          fn();
        }, this._delay);
      }
    } catch (error) {
      printerror(error);
    }
  }
}
