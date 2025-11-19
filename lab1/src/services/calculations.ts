import { Oval } from "../entities/oval";
import { Sphere } from "../entities/sphere";

export class Calculations {
    public static getOvalDimensions(oval: Oval): {a: number, b: number} {
        const width = Math.abs(oval.p2.x - oval.p1.x);
        const height = Math.abs(oval.p2.y - oval.p1.y);

        return {
            a: width / 2,
            b: height / 2
        };
    }

    public static ovalArea(oval: Oval): number {
        const {a, b} = this.getOvalDimensions(oval);
        return Math.PI * a * b;
    }

    public static ovalPerimeter(oval: Oval): number {
        const {a, b} = this.getOvalDimensions(oval);
        return 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
    }

    public static isCircle(oval: Oval): boolean {
        const {a, b} = this.getOvalDimensions(oval);
        return a === b;
    }

    public static ovalIntersectsAxis(oval: Oval, axis: 'x' | 'y', distance: number): boolean {
        const {a, b} = this.getOvalDimensions(oval);

        const centerX = (oval.p1.x + oval.p2.x) / 2;
        const centerY = (oval.p1.y + oval.p2.y) / 2;

        if (axis === 'x') {
            return Math.abs(centerY - distance) <= b;
        } 
        
        return Math.abs(centerX - distance) <= a;
    }


    public static sphereSurface(sphere: Sphere): number {
        return 4 * Math.PI * (sphere.radius ** 2);
    }

    public static sphereVolume(sphere: Sphere): number {
        return (4 / 3) * Math.PI * (sphere.radius ** 3);
    }

    public static sphereIntersectsPlane(sphere: Sphere, plane: 'XY' | 'XZ' | 'YZ'): boolean {
        if (plane === 'XY') {
            return Math.abs(sphere.z) === sphere.radius;
        }
        if (plane === 'XZ') {
            return Math.abs(sphere.center.y) === sphere.radius;
        }
        if (plane === 'YZ') {
            return Math.abs(sphere.center.x) === sphere.radius;
        }
        return false;
    }

    public static sphereVolumeRatio(sphere: Sphere, d: number): number {
        const r = sphere.radius;
        const z0 = Math.abs(sphere.z - d);

        if (z0 >= r) {
            return 0;
        }

        const h = r - z0;

        const capVolume = (Math.PI * (h ** 2) * (r - h / 3));

        return capVolume / this.sphereVolume(sphere);
    }
}