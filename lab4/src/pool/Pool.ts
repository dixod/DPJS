import type { PooledResource, ResourceAdapter } from "../adapter/ResourceAdapter";
import type { PoolConfig } from "./PoolConfig";
import { Observer } from "../observer/Observer";

interface Waiter {
  resolve(resource: PooledResource): void;
  reject(error: Error): void;
  timer?: ReturnType<typeof setTimeout>;
}

export class Pool {
  private static instance: Pool | null = null;
  private available: PooledResource[] = [];
  private active: Set<PooledResource> = new Set();
  private maxSize: number;
  private minSize: number;
  private initialSize: number;
  private mode: PoolConfig["mode"];
  private timeout: number;
  private waiters: Waiter[] = [];
  readonly notifier: Observer;
  private adapter: ResourceAdapter;

  private constructor(config: PoolConfig, adapter: ResourceAdapter, notifier?: Observer) {
    this.maxSize = config.maxSize;
    this.minSize = config.minSize;
    this.initialSize = config.initialSize;
    this.mode = config.mode;
    this.timeout = config.timeout;
    this.adapter = adapter;
    this.notifier = notifier ?? new Observer();
    this.initPool();
  }

  static getInstance(config: PoolConfig, adapter: ResourceAdapter, notifier?: Observer): Pool {
    if (!Pool.instance) Pool.instance = new Pool(config, adapter, notifier);
    return Pool.instance;
  }

  static resetForTests(): void {
    Pool.instance = null;
  }

  async acquire(): Promise<PooledResource> {
    const r = this.available.pop();
    if (r) {
      this.active.add(r);
      this.notifier.notify({ type: "resourceAcquired", id: r.id });
      return r;
    }

    const total = this.available.length + this.active.size;

    if (this.mode === "grow" && total < this.maxSize) {
      const c = this.adapter.create();
      this.active.add(c);
      this.notifier.notify({ type: "resourceAcquired", id: c.id });
      return c;
    }

    this.notifier.notify({ type: "poolExhausted" });

    if (this.mode === "reject") throw new Error("Pool exhausted");
    return this.waitForResource();
  }

  release(resource: PooledResource): void {
    if (!this.active.delete(resource)) {
      throw new Error("Cannot release resource that is not active: " + resource.id);
    }

    const w = this.waiters.shift();
    if (w) {
      if (w.timer) clearTimeout(w.timer);
      this.active.add(resource);
      this.notifier.notify({ type: "resourceReleased", id: resource.id });
      w.resolve(resource);
      return;
    }

    this.available.push(resource);
    this.notifier.notify({ type: "resourceReleased", id: resource.id });
    this.notifier.notify({ type: "resourceAvailable", id: resource.id });
  }

  private waitForResource(): Promise<PooledResource> {
    const self = this;

    return new Promise<PooledResource>(function (resolve, reject) {
      const w: Waiter = { resolve: resolve, reject: reject };

      if (self.timeout > 0) {
        w.timer = setTimeout(function () {
          const i = self.waiters.indexOf(w);
          if (i >= 0) self.waiters.splice(i, 1);
          reject(new Error("Acquire timeout"));
        }, self.timeout);
      }

      self.waiters.push(w);
    });
  }

  private initPool(): void {
    const target = this.initialSize < this.minSize ? this.minSize : this.initialSize;

    for (let i = 0; i < target && this.available.length + this.active.size < this.maxSize; i += 1) {
      this.available.push(this.adapter.create());
    }
  }
}