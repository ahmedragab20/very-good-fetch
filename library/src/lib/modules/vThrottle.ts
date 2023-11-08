import { printerror } from "../utils/console";
import { IModulesReturn } from "..";

interface IThrottle {
  /**
   * delay time in ms
   */
  delay: number;
}

/**
 * utility class to throttle function calls
 *
 * @example
 * ```typescript
 * const throttle = new vThrottle({ delay: 1000 });
 * throttle.run(() => console.log("throttle"));
 * ```
 */
export default class vThrottle implements IModulesReturn {
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
        "the - run - funciton needs to receive a function as a parameter"
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
