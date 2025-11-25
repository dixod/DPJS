import { Shape } from "./shape.js";
import { Point } from "./point.js";

export class Oval extends Shape {
    public firstPoint: Point;
    public secondPoint: Point;

    constructor(id: string, firstPoint: Point, secondPoint: Point) {
        super(id, "oval");
        this.firstPoint = firstPoint;
        this.secondPoint = secondPoint;
    }
}