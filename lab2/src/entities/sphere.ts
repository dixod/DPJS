import { Shape } from "./shape.js";
import { Point } from "./point.js";

export class Sphere extends Shape {
    private centerValue: Point;
    private radiusValue: number;

    constructor(id: string, center: Point, radius: number) {
        super(id, "sphere");
        this.centerValue = center;
        this.radiusValue = radius;
    }

    public get center(): Point {
        return this.centerValue;
    }

    public set center(point: Point) {
        this.centerValue = point;
        this.notifyChange();
    }

    public get radius(): number {
        return this.radiusValue;
    }

    public set radius(value: number) {
        this.radiusValue = value;
        this.notifyChange();
    }
}
