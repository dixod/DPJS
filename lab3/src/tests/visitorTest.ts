import { Rectangle } from "../shapes/Rectangle";
import { Circle } from "../shapes/Circle";
import type { Renderer } from "../bridge/Renderer";
import { AreaVisitor } from "../visitor/AreaVisitor";
import { PerimeterVisitor } from "../visitor/PerimeterVisitor";

class DummyRenderer implements Renderer {
  drawRectangle(): void {}
  drawCircle(): void {}
}

describe("Visitor: area and perimeter", () => {
  const renderer = new DummyRenderer();

  test("rectangle area and perimeter via visitors", () => {
    const rect = new Rectangle("r1", 0, 0, 10, 20, renderer);

    const area = rect.accept(new AreaVisitor());
    const perimeter = rect.accept(new PerimeterVisitor());

    expect(area).toBe(200);
    expect(perimeter).toBe(60);
    expect(area).toBeGreaterThan(0);
    expect(perimeter).toBeGreaterThan(0);
  });

  test("circle area and perimeter via visitors", () => {
    const circle = new Circle("c1", 0, 0, 5, renderer);

    const area = circle.accept(new AreaVisitor());
    const perimeter = circle.accept(new PerimeterVisitor());

    expect(area).toBeCloseTo(Math.PI * 25);
    expect(perimeter).toBeCloseTo(2 * Math.PI * 5);
    expect(area).toBeGreaterThan(0);
    expect(perimeter).toBeGreaterThan(0);
  });
});
