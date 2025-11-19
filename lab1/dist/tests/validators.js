import { Validators } from "../validators/validators";
describe("Validators", () => {
    test("parseNumber works", () => {
        const arr = Validators.parseNumber("1 2 3");
        expect(arr.length).toBe(3);
        expect(arr[0]).toBe(1);
        expect(arr[2]).toBe(3);
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
});
