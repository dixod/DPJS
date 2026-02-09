import { Rectangle } from "../shapes/Rectangle";
import { Circle } from "../shapes/Circle";
import type { Renderer } from "../bridge/Renderer";

class SpyRenderer implements Renderer {
  calls: string[] = [];
  lastArgs: unknown[] = [];

  drawRectangle(x: number, y: number, width: number, height: number): void {
    this.calls.push("rectangle");
    this.lastArgs = [x, y, width, height];
  }

  drawCircle(cx: number, cy: number, radius: number): void {
    this.calls.push("circle");
    this.lastArgs = [cx, cy, radius];
  }
}

describe("Bridge: shapes delegate drawing to renderer", () => {
  test("rectangle.draw delegates to renderer.drawRectangle", () => {
    const spy = new SpyRenderer();
    const rect = new Rectangle("r1", 1, 2, 3, 4, spy);

    rect.draw();

    expect(spy.calls).toEqual(["rectangle"]);
    expect(spy.lastArgs).toEqual([1, 2, 3, 4]);
    expect(spy.calls.length).toBe(1);
  });

  test("circle.draw delegates to renderer.drawCircle", () => {
    const spy = new SpyRenderer();
    const circle = new Circle("c1", 10, 20, 5, spy);

    circle.draw();

    expect(spy.calls).toEqual(["circle"]);
    expect(spy.lastArgs).toEqual([10, 20, 5]);
    expect(spy.calls.length).toBe(1);
  });

  test("setRenderer changes drawing implementation without changing shape code", () => {
    const spy1 = new SpyRenderer();
    const spy2 = new SpyRenderer();

    const rect = new Rectangle("r2", 7, 8, 9, 10, spy1);

    rect.draw();
    rect.setRenderer(spy2);
    rect.draw();

    expect(spy1.calls).toEqual(["rectangle"]);
    expect(spy2.calls).toEqual(["rectangle"]);
    expect(spy1.lastArgs).toEqual([7, 8, 9, 10]);
    expect(spy2.lastArgs).toEqual([7, 8, 9, 10]);
  });
});
