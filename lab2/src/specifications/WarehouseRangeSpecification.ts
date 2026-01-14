import { Shape } from "../entities/shape.js";
import { Specification } from "./Specification.js";
import { Warehouse } from "../warehouse/Warehouse.js";

export type WarehouseMetric = "area" | "perimeter" | "surface" | "volume";

export class WarehouseRangeSpecification implements Specification<Shape> {
    private warehouse = Warehouse.getInstance();

    constructor(
        private readonly metric: WarehouseMetric,
        private readonly min: number,
        private readonly max: number,
    ) {}

    public isSatisfiedBy(item: Shape): boolean {
        const record = this.warehouse.get(item.id);
        if (!record) {
            return false;
        }

        let value: number | undefined;
        if (this.metric === "area") {
            value = record.area;
        } else if (this.metric === "perimeter") {
            value = record.perimeter;
        } else if (this.metric === "surface") {
            value = record.surface;
        } else {
            value = record.volume;
        }
        if (typeof value !== "number") {
            return false;
        }

        return value >= this.min && value <= this.max;
    }
}
