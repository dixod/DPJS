export class Validators {
    public static parseNumber(line: string): number[] {
        return line.split(' ').map(n => Number(n));
    }

    public static isValidOval(nums: number[]): boolean {
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

    public static isValidSphere(nums: number[]): boolean {
        if (nums.length !== 4) {
            return false;
        }

        const r = nums[3];
        return r > 0;
    }
}