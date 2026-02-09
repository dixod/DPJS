import type { ShapeVisitor } from "./ShapeVisitor";
import type { Rectangle } from "../shapes/Rectangle";
import type { Circle } from "../shapes/Circle";

export class PerimeterVisitor implements ShapeVisitor<number> {
  visitRectangle(rectangle: Rectangle): number {
    return 2 * (rectangle.width + rectangle.height);
  }

  visitCircle(circle: Circle): number {
    return 2 * Math.PI * circle.radius;
  }
}
