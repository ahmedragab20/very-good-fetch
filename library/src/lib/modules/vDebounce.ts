import { printerror } from "../utils/console";

interface IDebounce {
  delay: number;
}

/**
 * utility class to debounce a function
 *
 * @example
 * ```typescript
 * const debounce = new vDebounce({ delay: 1000 });
 * debounce.run(() => console.log("debounce"));
 * ```
 */
export default class vDebounce {
  private _delay: number;
  private _interval: any;
  constructor(payload: IDebounce) {
    this._delay = payload.delay;
  }

  public async run(fn: Function) {
    if (!fn || typeof fn !== "function") {
      throw new TypeError("You must pass a function as the first argument!");
    }

    try {
      clearTimeout(this._interval);

      this._interval = setTimeout(() => {
        fn?.();
      }, this._delay);
    } catch (error) {
      printerror(error);
    }
  }
}
