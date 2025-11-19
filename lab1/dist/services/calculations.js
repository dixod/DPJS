export class Calculations {
    static getOvalDimensions(oval) {
        const width = Math.abs(oval.p2.x - oval.p1.x);
        const height = Math.abs(oval.p2.y - oval.p1.y);
        return {
            a: width / 2,
            b: height / 2
        };
    }
    static ovalArea(oval) {
        const { a, b } = this.getOvalDimensions(oval);
        return Math.PI * a * b;
    }
    static ovalPerimeter(oval) {
        const { a, b } = this.getOvalDimensions(oval);
        return 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
    }
    static isCircle(oval) {
        const { a, b } = this.getOvalDimensions(oval);
        return a === b;
    }
    static ovalIntersectsAxis(oval, axis, distance) {
        const { a, b } = this.getOvalDimensions(oval);
        const centerX = (oval.p1.x + oval.p2.x) / 2;
        const centerY = (oval.p1.y + oval.p2.y) / 2;
        if (axis === 'x') {
            return Math.abs(centerY - distance) <= b;
        }
        return Math.abs(centerX - distance) <= a;
    }
    static sphereSurface(sphere) {
        return 4 * Math.PI * (sphere.radius ** 2);
    }
    static sphereVolume(sphere) {
        return (4 / 3) * Math.PI * (sphere.radius ** 3);
    }
    static sphereIntersectsPlane(sphere, plane) {
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
    static sphereVolumeRatio(sphere, d) {
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
