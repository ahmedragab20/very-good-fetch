import { IGerneric } from "../types";

export class vCache {
  cache: IGerneric;

  constructor() {
    this.cache = {};
  }
  set(key: string, value: any) {
    this.cache[key] = value;
  }
  get(key: string) {
    return this.cache[key];
  }
  delete(key: string) {
    delete this.cache[key];
  }
  clear() {
    this.cache = {};
  }
}
