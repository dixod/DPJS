import { Point } from "./point";

export class Sphere {
    public id: string;
    public center: Point;
    public z: number;
    public radius: number;

    constructor(id: string, center: Point, z: number, radius: number) {
        this.id = id;
        this.center = center;
        this.z = z;
        this.radius = radius;
    }
}
