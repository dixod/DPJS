import type { PoolEvent } from "./PoolEvent";

export interface Subscriber {
  (event: PoolEvent): void;
}

export class Observer {
  private subscribers: Set<Subscriber> = new Set();
  
  subscribe(fn: Subscriber): void {
    this.subscribers.add(fn);
  }

  unsubscribe(fn: Subscriber): void {
    this.subscribers.delete(fn);
  }

  notify(event: PoolEvent): void {
    for (const fn of this.subscribers) {
      fn(event);
    }
  }
}
