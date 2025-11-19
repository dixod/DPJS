import { Oval } from "../entities/oval";
import { Point } from "../entities/point";
import { Calculations } from "../services/calculations";

describe("Oval tests", () => {

    test("oval area should be correct", () => {
        const oval = new Oval("1", new Point(0, 0), new Point(4, 6));
        const area = Calculations.ovalArea(oval);

        expect(area).toBeGreaterThan(0);
        expect(area).toBeCloseTo(Math.PI * 2 * 3); // a=2 b=3
    });

    test("oval perimeter should be > 0", () => {
        const oval = new Oval("2", new Point(0, 0), new Point(4, 6));
        const per = Calculations.ovalPerimeter(oval);

        expect(per).toBeGreaterThan(0);
        expect(per).toBeLessThan(40);
    });

    test("isCircle should detect circle", () => {
        const circle = new Oval("3", new Point(0, 0), new Point(4, 4));
        const oval = new Oval("4", new Point(0, 0), new Point(4, 6));

        expect(Calculations.isCircle(circle)).toBe(true);
        expect(Calculations.isCircle(oval)).toBe(false);
    });

});
