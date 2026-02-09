
export type PoolEvent =
  | { type: "resourceAvailable"; id?: string }
  | { type: "resourceAcquired"; id: string }
  | { type: "resourceReleased"; id: string }
  | { type: "poolExhausted" };