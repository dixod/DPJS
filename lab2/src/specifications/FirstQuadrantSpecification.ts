import { Shape } from "../entities/shape.js";
import { Specification } from "./Specification.js";
import { getShapePoints } from "../utils/shapeUtils.js";

export class FirstQuadrantSpecification implements Specification<Shape> {
    public isSatisfiedBy(item: Shape): boolean {
        const points = getShapePoints(item);
        return points.length > 0
            && points.every((point) => point.x > 0 && point.y > 0);
    }
}
