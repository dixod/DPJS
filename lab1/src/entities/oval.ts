import {Point} from './point';

export class Oval {
    public id: string;
    public p1: Point;
    public p2: Point;

    constructor(id: string, p1: Point, p2: Point) {
        this.id = id;
        this.p1 = p1;
        this.p2 = p2;
    }
}