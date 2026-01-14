import { Shape } from "../entities/shape.js";
import { Specification } from "./Specification.js";

export class IdSpecification implements Specification<Shape> {
    constructor(private readonly id: string) {}

    public isSatisfiedBy(item: Shape): boolean {
        return item.id === this.id;
    }
}
