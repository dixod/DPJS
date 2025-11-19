import { Point } from "../entities/point";
import { Sphere } from "../entities/sphere";
import { Calculations } from "../services/calculations";
describe("Sphere tests", () => {
    test("surface should be correct", () => {
        const s = new Sphere("1", new Point(0, 0), 0, 5);
        const surf = Calculations.sphereSurface(s);
        expect(surf).toBeGreaterThan(0);
        expect(surf).toBeCloseTo(4 * Math.PI * 25);
    });
    test("volume should be correct", () => {
        const s = new Sphere("1", new Point(0, 0), 0, 5);
        const vol = Calculations.sphereVolume(s);
        expect(vol).toBeGreaterThan(0);
        expect(vol).toBeCloseTo((4 / 3) * Math.PI * 125);
    });
    test("touches plane", () => {
        const s = new Sphere("1", new Point(0, 0), 5, 5);
        expect(Calculations.sphereIntersectsPlane(s, "XY")).toBe(true);
        expect(Calculations.sphereIntersectsPlane(s, "XZ")).toBe(false);
    });
});
