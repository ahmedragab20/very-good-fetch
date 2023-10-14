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
  private _lastRun: any;
  private _queuedFnTriggered: boolean = false;

  constructor(payload: IThrottle) {
    this._delay = payload.delay;
  }
  public run(fn: Function) {
    if (!fn || typeof fn !== "function") {
      throw new TypeError(
        "vThrottle needs to receive a function as a parameter"
      );
    }

    const waiting = this._lastRun && Date.now() < this._lastRun + this._delay;
    try {
      if (waiting || this._queuedFnTriggered) {
        this._lastFn = fn;
        return;
      }

      this._lastRun = Date.now();
      fn();
      this._lastFn = fn;
    } catch (error) {
      printerror(error);
    } finally {      
      if (waiting && !this._queuedFnTriggered && this._lastFn) {
        this._queuedFnTriggered = true;
        setTimeout(() => {
          this._lastFn();
          this._queuedFnTriggered = false;
          this._lastRun = Date.now();
        }, this._delay);
      }
    }
  }
}
