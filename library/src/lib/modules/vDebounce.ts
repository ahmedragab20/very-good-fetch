import { printerror, printwarn } from "../utils/console";

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
    if (payload && payload.delay < 250) {
      printwarn(
        "it's not recommended to use a delay less than 250ms for vDebounce."
      )
    }

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
