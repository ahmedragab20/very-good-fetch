import { IRetryOptions } from "../types/vRetry";
import { IModulesReturn } from "..";

/**
 * Utility class to retry a function until it succeeds or the max retries is reached.
 * @example
 *
 * ```typescript
 * const retry = new vRetry({
 *  maxRetries: 3,
 *  delay: 1000,
 *  onComplete: () => console.log("retry completed"),
 *  retryCondition: (error) => error.message === "retry"
 * });
 *
 * retry.run(async () => {
 *  await vFetch("https://jsonplaceholder.typicode.com/todos/1")
 * });
 * ```
 */
export default class vRetry implements IModulesReturn {
  private readonly _maxRetries: number;
  private readonly _delay: number;
  private readonly _onComplete: (response: any) => void;
  private readonly _retryCondition: (error: any) => boolean;
  private counter: number = 0;

  constructor(payload: IRetryOptions) {
    if (!payload) {
      throw new TypeError("You must provide a payload to retry.");
    } else if (typeof payload !== "object") {
      throw new TypeError("The payload must be an object.");
    } else if (
      !payload.retryCondition ||
      typeof payload?.retryCondition !== "function"
    ) {
      throw new TypeError("You must provide a retry condition function.");
    } else if (payload.maxRetries && typeof payload.maxRetries !== "number") {
      throw new TypeError("The maxRetries must be a number.");
    } else if (payload.maxRetries && payload.maxRetries < 1) {
      throw new TypeError("The maxRetries must be greater than 0.");
    } else if (payload.delay && typeof payload.delay !== "number") {
      throw new TypeError("The delay must be a number.");
    } else if (payload.onComplete && typeof payload.onComplete !== "function") {
      throw new TypeError("The onComplete must be a function.");
    }

    this._maxRetries = payload.maxRetries || 3;
    this._delay = payload.delay || 1000;
    this._onComplete = payload.onComplete || ((response: any) => {});
    this._retryCondition = payload.retryCondition;
  }
  private async _wait() {
    await new Promise((resolve) => setTimeout(resolve, this._delay));
  }

  /**
   * Retry a function until it succeeds or the max retries is reached.
   * @param fn The function to retry.
   * @returns The result of the function.
   * @throws The error of the function if it fails.
   */
  async run(fn: () => any) {
    if (!fn || typeof fn !== "function") {
      throw new TypeError("You must provide a function to retry.");
    }

    while (this._maxRetries > this.counter) {
      let result;
      try {
        result = await fn();

        if (this._retryCondition(result)) {
          throw "retry";
        }

        this.counter = this._maxRetries;
        return result;
      } catch (error) {
        await this._wait();
        this.counter++;
      } finally {
        if (this.counter === this._maxRetries) {
          this._onComplete(result);
        }
      }
    }
  }
}
