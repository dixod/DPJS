import { Shape } from "../entities/shape.js";
import { Specification } from "./Specification.js";

export class NameSpecification implements Specification<Shape> {
    constructor(private readonly name: string) {}

    public isSatisfiedBy(item: Shape): boolean {
        return item.name === this.name;
    }
}
