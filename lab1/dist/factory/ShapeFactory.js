import { Point } from "../entities/point.js";
import { Sphere } from "../entities/sphere.js";
import { Oval } from "../entities/oval.js";
import { Validators } from "../validators/validators.js";
import { InvalidDataError } from "../errors/errors.js";
export class ShapeFactory {
    static createOval(id, line) {
        const nums = Validators.parseNumber(line);
        if (!Validators.isValidOval(nums)) {
            throw new InvalidDataError('Invalid oval parameters: ' + line);
        }
        const [x1, y1, x2, y2] = nums;
        const p1 = new Point(x1, y1);
        const p2 = new Point(x2, y2);
        return new Oval(id, p1, p2);
    }
    static createSphere(id, line) {
        const nums = Validators.parseNumber(line);
        if (!Validators.isValidSphere(nums)) {
            throw new InvalidDataError('Invalid sphere parameters: ' + line);
        }
        const [x, y, z, r] = nums;
        const center = new Point(x, y);
        return new Sphere(id, center, z, r);
    }
}
