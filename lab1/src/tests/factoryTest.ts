import { ShapeFactory } from "../factory/ShapeFactory.js";
import { InvalidDataError } from "../errors/errors.js";

describe("Factory tests", () => {
    test("creates oval", () => {
        const oval = ShapeFactory.createOval("id1", "0 0 4 6");

        expect(oval.id).toBe("id1");
        expect(oval.firstPoint.x).toBe(0);
        expect(oval.secondPoint.y).toBe(6);
    });

    test("creates sphere", () => {
        const sphere = ShapeFactory.createSphere("id2", "1 2 3 5");

        expect(sphere.center.x).toBe(1);
        expect(sphere.center.z).toBe(3);
        expect(sphere.radius).toBe(5);
    });

    test("throws on invalid data", () => {
        expect(() => {
            ShapeFactory.createSphere("id3", "1 2 3 -1");
        }).toThrow(InvalidDataError);

        expect(() => {
            ShapeFactory.createOval("id4", "1 1 1 1");
        }).toThrow(InvalidDataError);
    });
});
