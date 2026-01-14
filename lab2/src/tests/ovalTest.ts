import { Oval } from "../entities/oval.js";
import { Point } from "../entities/point.js";
import { Calculations } from "../services/calculations.js";
import { ResultValidators } from "../validators/validators.js";

describe("Oval tests", () => {
    const baseOval = new Oval("oval-1", new Point(0, 0), new Point(4, 6));

    test("oval area should be correct", () => {
        const area = Calculations.ovalArea(baseOval);

        expect(area).toBeGreaterThan(0);
        expect(area).toBeCloseTo(Math.PI * 2 * 3);
        expect(ResultValidators.isPositive(area)).toBe(true);
    });

    test("oval perimeter should be within reasonable bounds", () => {
        const perimeter = Calculations.ovalPerimeter(baseOval);

        expect(perimeter).toBeGreaterThan(0);
        expect(perimeter).toBeLessThan(40);
        expect(ResultValidators.isPositive(perimeter)).toBe(true);
    });

    test("isCircle should detect perfect circles", () => {
        const circle = new Oval("oval-2", new Point(0, 0), new Point(4, 4));

        expect(Calculations.isCircle(circle)).toBe(true);
        expect(Calculations.isCircle(baseOval)).toBe(false);
    });

    test("isOval validates that defining points are not collinear", () => {
        const invalidOval = new Oval("oval-3", new Point(0, 0), new Point(0, 4));

        expect(Calculations.isOval(baseOval)).toBe(true);
        expect(Calculations.isOval(invalidOval)).toBe(false);
    });

    test("oval intersection with coordinate axes", () => {
        expect(Calculations.ovalIntersectsAxis(baseOval, "x", 3)).toBe(true);
        expect(Calculations.ovalIntersectsAxis(baseOval, "y", 4)).toBe(true);
    });

    test("oval may intersect exactly one axis at a given distance", () => {
        const intersectsAt6 = Calculations.ovalIntersectsExactlyOneAxis(baseOval, 6);
        const intersectsAt0 = Calculations.ovalIntersectsExactlyOneAxis(baseOval, 0);

        expect(intersectsAt6).toBe(true);
        expect(intersectsAt0).toBe(false);
    });
});
