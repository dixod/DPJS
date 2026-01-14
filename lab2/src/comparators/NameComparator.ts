import { Shape } from "../entities/shape.js";
import { Comparator } from "./Comparator.js";

export class NameComparator implements Comparator<Shape> {
    public compare(a: Shape, b: Shape): number {
        const nameComparison = a.name.localeCompare(b.name);
        if (nameComparison !== 0) {
            return nameComparison;
        }
        return a.id.localeCompare(b.id);
    }
}
