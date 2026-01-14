import { Shape } from "../entities/shape.js";
import { Warehouse } from "../warehouse/Warehouse.js";
import { Specification } from "../specifications/Specification.js";
import { Comparator } from "../comparators/Comparator.js";

export class ShapeRepository {
    private items: Map<string, Shape> = new Map();
    private warehouse = Warehouse.getInstance();

    public add(shape: Shape): void {
        const existing = this.items.get(shape.id);
        if (existing) {
            existing.removeObserver(this.warehouse);
        }

        this.items.set(shape.id, shape);
        shape.addObserver(this.warehouse);
        this.warehouse.update(shape);
    }

    public remove(id: string): boolean {
        const shape = this.items.get(id);
        if (!shape) {
            return false;
        }

        shape.removeObserver(this.warehouse);
        this.items.delete(id);
        this.warehouse.remove(id);
        return true;
    }

    public getById(id: string): Shape | undefined {
        return this.items.get(id);
    }

    public getAll(): Shape[] {
        return Array.from(this.items.values());
    }

    public query(specification: Specification<Shape>): Shape[] {
        return this.getAll().filter((shape) => specification.isSatisfiedBy(shape));
    }

    public sort(comparator: Comparator<Shape>): Shape[] {
        return this.getAll().sort((a, b) => comparator.compare(a, b));
    }

    public clear(): void {
        for (const shape of this.items.values()) {
            shape.removeObserver(this.warehouse);
        }
        this.items.clear();
        this.warehouse.clear();
    }
}
