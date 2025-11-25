import { Shape } from "./shape.js";
import { Point } from "./point.js";

export class Sphere extends Shape {
    public center: Point;
    public radius: number;

    constructor(id: string, center: Point, radius: number) {
        super(id, "sphere");
        this.center = center;
        this.radius = radius;
    }
}