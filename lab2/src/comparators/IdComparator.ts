import { Shape } from "../entities/shape.js";
import { Comparator } from "./Comparator.js";

export class IdComparator implements Comparator<Shape> {
    public compare(a: Shape, b: Shape): number {
        return a.id.localeCompare(b.id);
    }
}
