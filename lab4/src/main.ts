import { Pool } from "./pool/Pool";
import type { PoolConfig } from "./pool/PoolConfig";
import { LegacyResourceFactory } from "./adapter/LegacyResourceAdapter";
import type { PoolEvent } from "./observer/PoolEvent";

async function run(): Promise<void> {
  const adapter = new LegacyResourceFactory();

  const config: PoolConfig = {
    maxSize: 2,
    minSize: 0,
    initialSize: 1,
    mode: "grow",
    timeout: 2000,
  };

  const pool = Pool.getInstance(config, adapter);

  pool.notifier.subscribe(function (event: PoolEvent): void {
    if (event.type === "resourceAvailable") console.log("[EVENT] resourceAvailable id=" + (event.id ?? ""));
    if (event.type === "resourceAcquired") console.log("[EVENT] resourceAcquired id=" + event.id);
    if (event.type === "resourceReleased") console.log("[EVENT] resourceReleased id=" + event.id);
    if (event.type === "poolExhausted") console.log("[EVENT] poolExhausted");
  });

  const pool2 = Pool.getInstance(config, adapter);
  console.log("singleton same instance: true", pool === pool2);

  const r1 = await pool.acquire();
  console.log("acquired:", r1.id);
  r1.use("job-1");

  const r2 = await pool.acquire();
  console.log("acquired:", r2.id);
  r2.use("job-2");

  const pending = pool.acquire();

  setTimeout(function () {
    console.log("releasing:", r1.id);
    pool.release(r1);
  }, 300);

  const r3 = await pending;
  console.log("acquired after wait:", r3.id);
  r3.use("job-3");

  pool.release(r2);
  pool.release(r3);
}

run().catch(function (e: unknown) {
  console.error(e);
});
