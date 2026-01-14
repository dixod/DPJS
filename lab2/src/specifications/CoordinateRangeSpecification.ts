import { Shape } from "../entities/shape.js";
import { Specification } from "./Specification.js";
import { getShapePrimaryPoint } from "../utils/shapeUtils.js";

type Axis = "x" | "y" | "z";

export class CoordinateRangeSpecification implements Specification<Shape> {
    constructor(
        private readonly axis: Axis,
        private readonly min: number,
        private readonly max: number,
    ) {}

    public isSatisfiedBy(item: Shape): boolean {
        const point = getShapePrimaryPoint(item);
        let value = 0;
        if (this.axis === "x") {
            value = point.x;
        } else if (this.axis === "y") {
            value = point.y;
        } else {
            value = point.z;
        }
        return value >= this.min && value <= this.max;
    }
}
