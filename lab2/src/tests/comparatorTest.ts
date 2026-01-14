import { ShapeRepository } from "../repository/ShapeRepository.js";
import { Oval } from "../entities/oval.js";
import { Sphere } from "../entities/sphere.js";
import { Point } from "../entities/point.js";
import { IdComparator } from "../comparators/IdComparator.js";
import { NameComparator } from "../comparators/NameComparator.js";
import { FirstPointXComparator } from "../comparators/FirstPointXComparator.js";
import { FirstPointYComparator } from "../comparators/FirstPointYComparator.js";
import { Warehouse } from "../warehouse/Warehouse.js";

describe("Comparators", () => {
    const warehouse = Warehouse.getInstance();

    beforeEach(() => {
        warehouse.clear();
    });

    test("sorts by id and name", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("shape-2", new Point(5, 1), new Point(6, 2));
        const sphere = new Sphere("shape-1", new Point(2, 3, 0), 1);
        const oval2 = new Oval("shape-3", new Point(1, 5), new Point(2, 6));

        repository.add(oval);
        repository.add(sphere);
        repository.add(oval2);

        const byId = repository.sort(new IdComparator());
        expect(byId.map((shape) => shape.id)).toEqual(["shape-1", "shape-2", "shape-3"]);

        const byName = repository.sort(new NameComparator());
        expect(byName.map((shape) => shape.name)).toEqual(["oval", "oval", "sphere"]);
    });

    test("sorts by first point coordinates", () => {
        const repository = new ShapeRepository();
        const oval = new Oval("shape-4", new Point(3, 4), new Point(4, 5));
        const sphere = new Sphere("shape-5", new Point(2, 1, 0), 1);
        const oval2 = new Oval("shape-6", new Point(1, 3), new Point(2, 4));

        repository.add(oval);
        repository.add(sphere);
        repository.add(oval2);

        const byX = repository.sort(new FirstPointXComparator());
        expect(byX.map((shape) => shape.id)).toEqual(["shape-6", "shape-5", "shape-4"]);

        const byY = repository.sort(new FirstPointYComparator());
        expect(byY.map((shape) => shape.id)).toEqual(["shape-5", "shape-6", "shape-4"]);
    });
});
