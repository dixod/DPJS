export type PoolMode = "wait" | "reject" | "grow";

export interface PoolConfig {
  maxSize: number;
  minSize: number;
  initialSize: number;
  mode: PoolMode;
  timeout: number;
}