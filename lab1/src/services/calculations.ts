import { Oval } from "../entities/oval.js";
import { Sphere } from "../entities/sphere.js";

export class Calculations {
    public static isOval(oval: Oval): boolean {
        return oval.firstPoint.x !== oval.secondPoint.x
            && oval.firstPoint.y !== oval.secondPoint.y;
    }

    public static ovalArea(oval: Oval): number {
        const width = Math.abs(oval.secondPoint.x - oval.firstPoint.x);
        const height = Math.abs(oval.secondPoint.y - oval.firstPoint.y);
        const a = width / 2;
        const b = height / 2;
        return Math.PI * a * b;
    }

    public static ovalPerimeter(oval: Oval): number {
        const width = Math.abs(oval.secondPoint.x - oval.firstPoint.x);
        const height = Math.abs(oval.secondPoint.y - oval.firstPoint.y);
        const a = width / 2;
        const b = height / 2;
        return 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
    }

    public static isCircle(oval: Oval): boolean {
        const width = Math.abs(oval.secondPoint.x - oval.firstPoint.x);
        const height = Math.abs(oval.secondPoint.y - oval.firstPoint.y);
        const a = width / 2;
        const b = height / 2;
        return a === b;
    }

    public static ovalIntersectsAxis(oval: Oval, axis: "x" | "y", distance: number): boolean {
        const width = Math.abs(oval.secondPoint.x - oval.firstPoint.x);
        const height = Math.abs(oval.secondPoint.y - oval.firstPoint.y);
        const a = width / 2;
        const b = height / 2;
        const centerX = (oval.firstPoint.x + oval.secondPoint.x) / 2;
        const centerY = (oval.firstPoint.y + oval.secondPoint.y) / 2;
        const offset = Math.abs(distance);

        if (axis === "x") {
            return Math.abs(centerY - offset) <= b;
        }

        return Math.abs(centerX - offset) <= a;
    }

    public static ovalIntersectsExactlyOneAxis(oval: Oval, distance: number): boolean {
        const intersectsX = this.ovalIntersectsAxis(oval, "x", distance);
        const intersectsY = this.ovalIntersectsAxis(oval, "y", distance);
        return intersectsX !== intersectsY;
    }

    public static sphereSurface(sphere: Sphere): number {
        return 4 * Math.PI * sphere.radius * sphere.radius;
    }

    public static sphereVolume(sphere: Sphere): number {
        return (4 / 3) * Math.PI * sphere.radius * sphere.radius * sphere.radius;
    }

    public static isSphere(sphere: Sphere): boolean {
        return sphere.radius > 0;
    }

    public static sphereTouchesPlane(sphere: Sphere, plane: "XY" | "XZ" | "YZ"): boolean {
        let distance = 0;
        if (plane === "XY") {
            distance = Math.abs(sphere.center.z);
        } else if (plane === "XZ") {
            distance = Math.abs(sphere.center.y);
        } else {
            distance = Math.abs(sphere.center.x);
        }
        return Math.abs(distance - sphere.radius) === 0;
    }

    public static sphereTouchesAnyCoordinatePlane(sphere: Sphere): boolean {
        return this.sphereTouchesPlane(sphere, "XY")
            || this.sphereTouchesPlane(sphere, "XZ")
            || this.sphereTouchesPlane(sphere, "YZ");
    }

    public static sphereVolumeRatio(sphere: Sphere, plane: "XY" | "XZ" | "YZ"): number {
        let distance = 0;
        if (plane === "XY") {
            distance = Math.abs(sphere.center.z);
        } else if (plane === "XZ") {
            distance = Math.abs(sphere.center.y);
        } else {
            distance = Math.abs(sphere.center.x);
        }

        if (distance >= sphere.radius) {
            return 0;
        }

        const height = sphere.radius - distance;
        const sphericalCapVolume = (Math.PI * height * height * (3 * sphere.radius - height)) / 3;
        const totalVolume = this.sphereVolume(sphere);
        const remainingVolume = totalVolume - sphericalCapVolume;

        if (remainingVolume <= 0) {
            return 0;
        }

        const smallerVolume = Math.min(sphericalCapVolume, remainingVolume);
        const largerVolume = Math.max(sphericalCapVolume, remainingVolume);
        return smallerVolume / largerVolume;
    }
}