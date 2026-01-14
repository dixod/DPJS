import { Shape } from "../entities/shape.js";
import { Specification } from "./Specification.js";
import { getShapeCenter } from "../utils/shapeUtils.js";

export class DistanceRangeSpecification implements Specification<Shape> {
    constructor(
        private readonly min: number,
        private readonly max: number,
    ) {}

    public isSatisfiedBy(item: Shape): boolean {
        const center = getShapeCenter(item);
        const distance = Math.sqrt(
            center.x * center.x + center.y * center.y + center.z * center.z,
        );
        return distance >= this.min && distance <= this.max;
    }
}
