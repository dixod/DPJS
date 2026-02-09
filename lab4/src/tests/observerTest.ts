import { Observer } from "../observer/Observer";
import type { PoolEvent } from "../observer/PoolEvent";

class SpySubscriber {
  calls: string[] = [];
  lastEvent: PoolEvent | null = null;

  handle(event: PoolEvent): void {
    this.calls.push(event.type);
    this.lastEvent = event;
  }
}

describe("Observer: notifier notifies subscribers", () => {
  test("subscribe + notify calls subscriber", () => {
    const notifier = new Observer();
    const spy = new SpySubscriber();

    notifier.subscribe(spy.handle.bind(spy));
    notifier.notify({ type: "resourceAvailable", id: "r1" });

    expect(spy.calls).toEqual(["resourceAvailable"]);
    expect(spy.lastEvent).toEqual({ type: "resourceAvailable", id: "r1" });
  });

  test("unsubscribe stops notifications", () => {
    const notifier = new Observer();
    const spy = new SpySubscriber();

    const fn = spy.handle.bind(spy);

    notifier.subscribe(fn);
    notifier.notify({ type: "resourceAvailable", id: "r1" });
    notifier.unsubscribe(fn);
    notifier.notify({ type: "resourceAvailable", id: "r2" });

    expect(spy.calls).toEqual(["resourceAvailable"]);
    expect(spy.lastEvent).toEqual({ type: "resourceAvailable", id: "r1" });
  });
});