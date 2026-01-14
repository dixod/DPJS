import { Shape } from "../entities/shape.js";
import { Comparator } from "./Comparator.js";
import { getShapePrimaryPoint } from "../utils/shapeUtils.js";

export class FirstPointYComparator implements Comparator<Shape> {
    public compare(a: Shape, b: Shape): number {
        const diff = getShapePrimaryPoint(a).y - getShapePrimaryPoint(b).y;
        if (diff !== 0) {
            return diff;
        }
        return a.id.localeCompare(b.id);
    }
}
