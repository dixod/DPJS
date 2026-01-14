import { Point } from "../entities/point.js";
import { Sphere } from "../entities/sphere.js";
import { Calculations } from "../services/calculations.js";
import { ResultValidators } from "../validators/validators.js";

describe("Sphere tests", () => {
    const sphere = new Sphere("sphere-1", new Point(0, 0, 0), 5);

    test("surface should be correct", () => {
        const surface = Calculations.sphereSurface(sphere);

        expect(surface).toBeGreaterThan(0);
        expect(surface).toBeCloseTo(4 * Math.PI * 25);
        expect(ResultValidators.isPositive(surface)).toBe(true);
    });

    test("volume should be correct", () => {
        const volume = Calculations.sphereVolume(sphere);

        expect(volume).toBeGreaterThan(0);
        expect(volume).toBeCloseTo((4 / 3) * Math.PI * 125);
        expect(ResultValidators.isPositive(volume)).toBe(true);
    });

    test("sphere validation logic", () => {
        expect(Calculations.isSphere(sphere)).toBe(true);
        const invalidSphere = new Sphere("sphere-2", new Point(1, 1, 1), 0);
        expect(Calculations.isSphere(invalidSphere)).toBe(false);
    });

    test("touching planes is detected", () => {
        const shiftedSphere = new Sphere("sphere-3", new Point(0, 0, 5), 5);

        expect(Calculations.sphereTouchesPlane(shiftedSphere, "XY")).toBe(true);
        expect(Calculations.sphereTouchesPlane(shiftedSphere, "XZ")).toBe(false);
        expect(Calculations.sphereTouchesAnyCoordinatePlane(shiftedSphere)).toBe(true);
    });

    test("volume ratio is calculated for slicing planes", () => {
        const ratioThroughCenter = Calculations.sphereVolumeRatio(sphere, "XY");
        const ratioOffset = Calculations.sphereVolumeRatio(
            new Sphere("sphere-4", new Point(0, 0, 2), 5),
            "XY",
        );

        expect(ratioThroughCenter).toBeCloseTo(1);
        expect(ratioOffset).toBeGreaterThan(0);
        expect(ratioOffset).toBeLessThan(1);

        expect(ResultValidators.isRatioBetween0And1(ratioThroughCenter)).toBe(true);
        expect(ResultValidators.isRatioBetween0And1(ratioOffset)).toBe(true);
    });
});
