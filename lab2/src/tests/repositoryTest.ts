import { ShapeRepository } from "../repository/ShapeRepository.js";
import { Oval } from "../entities/oval.js";
import { Sphere } from "../entities/sphere.js";
import { Point } from "../entities/point.js";
import { Warehouse } from "../warehouse/Warehouse.js";
import { Calculations } from "../services/calculations.js";

describe("Repository and Warehouse", () => {
    const warehouse = Warehouse.getInstance();

    beforeEach(() => {
        warehouse.clear();
    });

    test("adds shapes and records metrics", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("oval-1", new Point(0, 0), new Point(4, 6));
        const sphere = new Sphere("sphere-1", new Point(0, 0, 0), 3);

        repository.add(oval);
        repository.add(sphere);

        expect(repository.getAll().length).toBe(2);

        const ovalRecord = warehouse.get("oval-1");
        const sphereRecord = warehouse.get("sphere-1");

        expect(ovalRecord?.area).toBeCloseTo(Calculations.ovalArea(oval));
        expect(ovalRecord?.perimeter).toBeCloseTo(Calculations.ovalPerimeter(oval));
        expect(sphereRecord?.surface).toBeCloseTo(Calculations.sphereSurface(sphere));
        expect(sphereRecord?.volume).toBeCloseTo(Calculations.sphereVolume(sphere));
    });

    test("updates warehouse when shape changes", () => {
        const repository = new ShapeRepository();
        const sphere = new Sphere("sphere-2", new Point(0, 0, 0), 2);

        repository.add(sphere);
        const before = warehouse.get("sphere-2")?.volume ?? 0;

        sphere.radius = 4;

        const after = warehouse.get("sphere-2")?.volume ?? 0;
        expect(after).toBeGreaterThan(before);
        expect(after).toBeCloseTo(Calculations.sphereVolume(sphere));
    });

    test("removes shapes and warehouse entries", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("oval-2", new Point(1, 1), new Point(2, 3));

        repository.add(oval);
        const removed = repository.remove("oval-2");

        expect(removed).toBe(true);
        expect(repository.getById("oval-2")).toBeUndefined();
        expect(warehouse.get("oval-2")).toBeUndefined();
    });
});
