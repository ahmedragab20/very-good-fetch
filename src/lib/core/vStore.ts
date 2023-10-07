import { IGerneric } from "../types";
import { TCacheStrategy } from "../types/vCache";

/**
 * vStore - Holds the cached data
 * @class vStore
 * @relates vCache
 */
export class vStore {
  private readonly _strategy: TCacheStrategy;
  [key: string]: any;

  constructor(strategy: TCacheStrategy, commit?: IGerneric) {
    this._strategy = strategy;

    if (commit && Object.keys(commit).length > 0) {
      this[commit.key] = commit.value;
    }
  }
}
