import { ShapeRepository } from "../repository/ShapeRepository.js";
import { Oval } from "../entities/oval.js";
import { Sphere } from "../entities/sphere.js";
import { Point } from "../entities/point.js";
import { IdSpecification } from "../specifications/IdSpecification.js";
import { NameSpecification } from "../specifications/NameSpecification.js";
import { FirstQuadrantSpecification } from "../specifications/FirstQuadrantSpecification.js";
import { CoordinateRangeSpecification } from "../specifications/CoordinateRangeSpecification.js";
import { DistanceRangeSpecification } from "../specifications/DistanceRangeSpecification.js";
import { WarehouseRangeSpecification } from "../specifications/WarehouseRangeSpecification.js";
import { Warehouse } from "../warehouse/Warehouse.js";

describe("Specifications", () => {
    const warehouse = Warehouse.getInstance();

    beforeEach(() => {
        warehouse.clear();
    });

    test("id and name specs filter shapes", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("shape-1", new Point(1, 1), new Point(3, 3));
        const sphere = new Sphere("shape-2", new Point(2, 2, 1), 2);

        repository.add(oval);
        repository.add(sphere);

        const byId = repository.query(new IdSpecification("shape-2"));
        expect(byId.length).toBe(1);
        expect(byId[0].id).toBe("shape-2");

        const byName = repository.query(new NameSpecification("oval"));
        expect(byName.length).toBe(1);
        expect(byName[0].id).toBe("shape-1");
    });

    test("coordinate and quadrant specs filter by position", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("shape-3", new Point(1, 1), new Point(3, 3));
        const sphere = new Sphere("shape-4", new Point(-2, 2, 0), 1);

        repository.add(oval);
        repository.add(sphere);

        const inFirstQuadrant = repository.query(new FirstQuadrantSpecification());
        expect(inFirstQuadrant.length).toBe(1);
        expect(inFirstQuadrant[0].id).toBe("shape-3");

        const xRange = repository.query(new CoordinateRangeSpecification("x", 0, 2));
        expect(xRange.length).toBe(1);
        expect(xRange[0].id).toBe("shape-3");
    });

    test("distance and warehouse range specs work", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("shape-5", new Point(0, 0), new Point(4, 6));
        const sphere = new Sphere("shape-6", new Point(5, 5, 5), 2);

        repository.add(oval);
        repository.add(sphere);

        const nearOrigin = repository.query(new DistanceRangeSpecification(0, 5));
        expect(nearOrigin.length).toBe(1);
        expect(nearOrigin[0].id).toBe("shape-5");

        const byArea = repository.query(new WarehouseRangeSpecification("area", 10, 30));
        expect(byArea.length).toBe(1);
        expect(byArea[0].id).toBe("shape-5");
    });
});
