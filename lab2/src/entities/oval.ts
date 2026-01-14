import { Shape } from "./shape.js";
import { Point } from "./point.js";

export class Oval extends Shape {
    private firstPointValue: Point;
    private secondPointValue: Point;

    constructor(id: string, firstPoint: Point, secondPoint: Point) {
        super(id, "oval");
        this.firstPointValue = firstPoint;
        this.secondPointValue = secondPoint;
    }

    public get firstPoint(): Point {
        return this.firstPointValue;
    }

    public set firstPoint(point: Point) {
        this.firstPointValue = point;
        this.notifyChange();
    }

    public get secondPoint(): Point {
        return this.secondPointValue;
    }

    public set secondPoint(point: Point) {
        this.secondPointValue = point;
        this.notifyChange();
    }
}
