//TODO:: later we need to add the cookie caching strategy
export type TCacheStrategy = "session" | "local" | "memory";

export interface ICacheValue {
  __addedAt: number;
  value: any;
}
