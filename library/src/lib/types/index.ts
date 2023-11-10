export interface IGerneric {
  [key: string]: any;
}

export interface IModulesReturn {
  run(fn: () => any): any;
}

export * from "./vFetch";
export * from "./vConfig";
export * from "./vCache";
export * from "./vStore";
export * from "./vRetry";
