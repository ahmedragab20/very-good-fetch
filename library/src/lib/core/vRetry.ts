import { IRetryOptions } from "../types/vFetch";
import { useGlobal } from "../utils/internals";

export default class vRetry {
  private readonly _maxRetries: number;
  private readonly _delay: number;
  private readonly _retryCondition?: (error: any) => boolean;
  private readonly _retryCallback?: (error: any) => void;
  private readonly _retryComplete?: () => void;
  private readonly _request: () => Promise<any>;
  _retryCount: number = useGlobal().get("_retryCount") || 0;

  constructor(payload: IRetryOptions) {
    if (!payload.request) {
      throw new Error("Retry request is required");
    }
    if (payload.maxRetries && payload.maxRetries < 0) {
      throw new Error("maxRetries must be greater than 0");
    }

    if (payload.delay && payload.delay < 0) {
      throw new Error("delay must be greater than 0");
    }

    if (!useGlobal().get("_retryCount")) {
      useGlobal().set("_retryCount", 0);
    }

    this._maxRetries = payload.maxRetries || 3;
    this._delay = payload.delay || 10000;
    this._retryCondition = payload.retryCondition || (() => true);
    this._retryCallback = payload.retryCallback || (() => {});
    this._retryComplete = payload.retryComplete || (() => {});
    this._request = payload.request;
  }

  private _delayExecution() {
    return new Promise((resolve) => setTimeout(resolve, this._delay));
  }

  private _setCount(newCount: number) {
    useGlobal().set("_retryCount", newCount);
  }

  async run() {
    console.log("🚀 running()");

    console.log({
      _retryCount: this._retryCount,
      _maxRetries: this._maxRetries,
      _delay: this._delay,
      _retryCondition: this._retryCondition,
      _retryCallback: this._retryCallback,
      _retryComplete: this._retryComplete,
      _request: this._request,
    });

    while (this._retryCount < this._maxRetries) {
      try {
        this._setCount(this._retryCount + 1);
        await this._request?.();
      } catch (error) {
        if (this._retryCondition?.(error)) {
          // by default true
          await this._delayExecution();
          this._retryCallback?.(error);
        } else {
          throw error;
        }
      }
    }

    this._retryComplete?.();
    return this._retryCount === this._maxRetries;
  }
}
