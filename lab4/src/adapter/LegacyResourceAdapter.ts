import { LegacyResource } from "./LegacyResource";
import type { PooledResource, ResourceAdapter } from "./ResourceAdapter";

export class LegacyResourceAdapter implements PooledResource {
  constructor(private legacy: LegacyResource) {}

  get id(): string {
    return this.legacy.id;
  }

  use(tag?: string): void {
    if (!this.legacy.isOpen()) this.legacy.open();
    this.legacy.doWork(tag);
  }

  dispose(): void {
    this.legacy.close();
  }

  isHealthy(): boolean {
    return true;
  }
}

export class LegacyResourceFactory implements ResourceAdapter {
  private counter = 0;

  create(): PooledResource {
    this.counter += 1;
    const legacy = new LegacyResource(`legacy-${this.counter}`);
    return new LegacyResourceAdapter(legacy);
  }
}
