import { Validators, ResultValidators } from "../validators/validators.js";
import { ValidationError } from "../errors/errors.js";

describe("Validators", () => {
    test("parseNumber works", () => {
        const arr = Validators.parseNumber("1 2 3");

        expect(arr.length).toBe(3);
        expect(arr[0]).toBe(1);
        expect(arr[2]).toBe(3);
    });

    test("parseNumber fails on invalid tokens", () => {
        expect(() => Validators.parseNumber("2a 3")).toThrow(ValidationError);
        expect(() => Validators.parseNumber("")).toThrow(ValidationError);
    });

    test("oval validation", () => {
        expect(Validators.isValidOval([0, 0, 4, 6])).toBe(true);
        expect(Validators.isValidOval([1, 1, 1, 1])).toBe(false);
        expect(Validators.isValidOval([1, 2, 1, 5])).toBe(false);
    });

    test("sphere validation", () => {
        expect(Validators.isValidSphere([1, 2, 3, 5])).toBe(true);
        expect(Validators.isValidSphere([1, 2, 3, -1])).toBe(false);
        expect(Validators.isValidSphere([1, 2])).toBe(false);
    });

    test("result validators check positivity and ratios", () => {
        expect(ResultValidators.isPositive(10)).toBe(true);
        expect(ResultValidators.isPositive(0)).toBe(false);

        expect(ResultValidators.isRatioBetween0And1(0)).toBe(true);
        expect(ResultValidators.isRatioBetween0And1(0.5)).toBe(true);
        expect(ResultValidators.isRatioBetween0And1(1.1)).toBe(false);
    });
});
