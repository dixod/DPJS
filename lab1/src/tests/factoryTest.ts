import { ShapeFactory } from "../factory/ShapeFactory";
import { InvalidDataError } from "../errors/errors";

describe("Factory tests", () => {

    test("creates oval", () => {
        const oval = ShapeFactory.createOval("id1", "0 0 4 6");

        expect(oval.id).toBe("id1");
        expect(oval.p1.x).toBe(0);
        expect(oval.p2.y).toBe(6);
    });

    test("creates sphere", () => {
        const sphere = ShapeFactory.createSphere("id2", "1 2 3 5");

        expect(sphere.center.x).toBe(1);
        expect(sphere.z).toBe(3);
        expect(sphere.radius).toBe(5);
    });

    test("throws on invalid data", () => {
        expect(() => {
            ShapeFactory.createSphere("id3", "1 2 3 -1");
        }).toThrow(InvalidDataError);
    });

});
