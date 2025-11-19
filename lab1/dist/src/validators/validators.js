"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static parseNumber(line) {
        return line.split(' ').map(n => Number(n));
    }
    static isValidOval(nums) {
        if (nums.length !== 4) {
            return false;
        }
        const [x1, y1, x2, y2] = nums;
        if (x1 === x2 && y1 === y2) {
            return false;
        }
        if (x1 === x2 || y1 === y2) {
            return false;
        }
        return true;
    }
    static isValidSphere(nums) {
        if (nums.length !== 4) {
            return false;
        }
        const r = nums[3];
        return r > 0;
    }
}
exports.Validators = Validators;
