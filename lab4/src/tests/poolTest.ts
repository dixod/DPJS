import { Pool } from "../pool/Pool";
import type { PoolConfig } from "../pool/PoolConfig";
import type { PooledResource, ResourceAdapter } from "../adapter/ResourceAdapter";
import type { PoolEvent } from "../observer/PoolEvent";

class DummyResource implements PooledResource {
  constructor(readonly id: string) {}
  use(tag?: string): void { void tag; }
  dispose(): void {}
  isHealthy(): boolean { return true; }
}

class SpyAdapter implements ResourceAdapter {
  calls: string[] = [];
  private counter = 0;

  create(): PooledResource {
    this.calls.push("create");
    this.counter += 1;
    return new DummyResource("r" + this.counter);
  }
}

class SpySubscriber {
  calls: string[] = [];
  lastEvent: PoolEvent | null = null;

  handle(event: PoolEvent): void {
    this.calls.push(event.type);
    this.lastEvent = event;
  }
}

describe("Pool", () => {
  test("reject: second acquire throws when exhausted", async () => {
    Pool.resetForTests();

    const adapter = new SpyAdapter();
    const config: PoolConfig = {
      maxSize: 1,
      minSize: 0,
      initialSize: 1,
      mode: "reject",
      timeout: 0,
    };

    const pool = Pool.getInstance(config, adapter);

    await pool.acquire();
    await expect(pool.acquire()).rejects.toThrow("Pool exhausted");
  });

  test("grow: creates new resource when exhausted and under maxSize", async () => {
    Pool.resetForTests();

    const adapter = new SpyAdapter();
    const config: PoolConfig = {
      maxSize: 2,
      minSize: 0,
      initialSize: 1,
      mode: "grow",
      timeout: 0,
    };

    const pool = Pool.getInstance(config, adapter);

    const a = await pool.acquire();
    const b = await pool.acquire();

    expect(a.id).toBe("r1");
    expect(b.id).toBe("r2");
    expect(adapter.calls).toEqual(["create", "create"]);
  });

  test("wait: acquire waits; release notifies and gives resource; timeout rejects", async () => {
    Pool.resetForTests();

    const adapter1 = new SpyAdapter();
    const config1: PoolConfig = {
      maxSize: 1,
      minSize: 0,
      initialSize: 1,
      mode: "wait",
      timeout: 1000,
    };

    const pool1 = Pool.getInstance(config1, adapter1);

    const spy = new SpySubscriber();
    const fn = spy.handle.bind(spy);
    pool1.notifier.subscribe(fn);

    const r = await pool1.acquire();
    const pending = pool1.acquire();
    pool1.release(r);

    const got = await pending;
    expect(got.id).toBe("r1");
    expect(spy.calls).toContain("resourceReleased");

    pool1.notifier.unsubscribe(fn);

    Pool.resetForTests();

    const adapter2 = new SpyAdapter();
    const config2: PoolConfig = {
      maxSize: 1,
      minSize: 0,
      initialSize: 1,
      mode: "wait",
      timeout: 10,
    };

    const pool2 = Pool.getInstance(config2, adapter2);

    await pool2.acquire();
    await expect(pool2.acquire()).rejects.toThrow("Acquire timeout");
  });
});
