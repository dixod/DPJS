import { Shape } from "../entities/shape.js";
import { Comparator } from "./Comparator.js";
import { getShapePrimaryPoint } from "../utils/shapeUtils.js";

export class FirstPointZComparator implements Comparator<Shape> {
    public compare(a: Shape, b: Shape): number {
        const diff = getShapePrimaryPoint(a).z - getShapePrimaryPoint(b).z;
        if (diff !== 0) {
            return diff;
        }
        return a.id.localeCompare(b.id);
    }
}
