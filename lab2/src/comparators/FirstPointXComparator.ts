import { Shape } from "../entities/shape.js";
import { Comparator } from "./Comparator.js";
import { getShapePrimaryPoint } from "../utils/shapeUtils.js";

export class FirstPointXComparator implements Comparator<Shape> {
    public compare(a: Shape, b: Shape): number {
        const diff = getShapePrimaryPoint(a).x - getShapePrimaryPoint(b).x;
        if (diff !== 0) {
            return diff;
        }
        return a.id.localeCompare(b.id);
    }
}
