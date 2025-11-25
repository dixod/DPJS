import { ValidationError } from "../errors/errors.js";

export class Validators {
    public static parseNumber(line: string): number[] {
        const trimmed = line.trim();
        if (!trimmed) {
            throw new ValidationError("Line does not contain numeric values");
        }

        const tokens = trimmed.split(" ").filter((token) => token.length > 0);
        const numbers: number[] = [];

        for (let i = 0; i < tokens.length; i += 1) {
            const token = tokens[i];
            const num = Number(token);

            if (Number.isNaN(num)) {
                throw new ValidationError(`Invalid numeric token: ${token}`);
            }

            numbers.push(num);
        }

        return numbers;
    }

    public static isValidOval(nums: number[]): boolean {
        if (nums.length !== 4) {
            return false;
        }

        const [x1, y1, x2, y2] = nums;

        if (x1 === x2) {
            return false;
        }

        if (y1 === y2) {
            return false;
        }

        return true;
    }

    public static isValidSphere(nums: number[]): boolean {
        if (nums.length !== 4) {
            return false;
        }

        const radius = nums[3];

        if (radius <= 0) {
            return false;
        }

        return true;
    }
}

export class ResultValidators {
    public static isPositive(value: number): boolean {
        return value > 0;
    }

    public static isRatioBetween0And1(value: number): boolean {
        return value >= 0 && value <= 1;
    }
}
