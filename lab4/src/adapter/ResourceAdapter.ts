export interface PooledResource {
  id: string;

  use(tag?: string): void;
  dispose(): void;

  isHealthy(): boolean;
}

export interface ResourceAdapter {
  create(): PooledResource;
}