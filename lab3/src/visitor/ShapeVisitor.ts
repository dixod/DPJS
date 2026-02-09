import type { Rectangle } from "../shapes/Rectangle";
import type { Circle } from "../shapes/Circle";

export interface ShapeVisitor<T> {
    visitRectangle(rectangle: Rectangle): T;

    visitCircle(circle: Circle): T;
}