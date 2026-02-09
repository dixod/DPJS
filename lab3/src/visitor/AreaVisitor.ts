import type { ShapeVisitor } from "./ShapeVisitor";
import type { Rectangle } from "../shapes/Rectangle";
import type { Circle } from "../shapes/Circle";

export class AreaVisitor implements ShapeVisitor<number> {
  visitRectangle(rectangle: Rectangle): number {
    return rectangle.width * rectangle.height;
  }

  visitCircle(circle: Circle): number {
    return Math.PI * circle.radius * circle.radius;
  }
}
