import { Observer } from "../observer/Observer.js";
import { Shape } from "../entities/shape.js";
import { Oval } from "../entities/oval.js";
import { Sphere } from "../entities/sphere.js";
import { Calculations } from "../services/calculations.js";

export type WarehouseRecord = {
    id: string;
    type: string;
    area?: number;
    perimeter?: number;
    surface?: number;
    volume?: number;
};

export class Warehouse implements Observer<Shape> {
    private static instance: Warehouse | null = null;
    private records: Map<string, WarehouseRecord> = new Map();

    private constructor() {}

    public static getInstance(): Warehouse {
        if (!Warehouse.instance) {
            Warehouse.instance = new Warehouse();
        }
        return Warehouse.instance;
    }

    public update(shape: Shape): void {
        this.records.set(shape.id, this.buildRecord(shape));
    }

    public get(id: string): WarehouseRecord | undefined {
        return this.records.get(id);
    }

    public getAll(): WarehouseRecord[] {
        return Array.from(this.records.values());
    }

    public remove(id: string): void {
        this.records.delete(id);
    }

    public clear(): void {
        this.records.clear();
    }

    private buildRecord(shape: Shape): WarehouseRecord {
        if (shape instanceof Oval) {
            return {
                id: shape.id,
                type: shape.name,
                area: Calculations.ovalArea(shape),
                perimeter: Calculations.ovalPerimeter(shape)
            };
        }

        if (shape instanceof Sphere) {
            return {
                id: shape.id,
                type: shape.name,
                surface: Calculations.sphereSurface(shape),
                volume: Calculations.sphereVolume(shape)
            };
        }

        return {
            id: shape.id,
            type: shape.name
        };
    }
}
