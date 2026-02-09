import { Shape } from "./Shape";
import type { Renderer } from "../bridge/Renderer";
import type { ShapeVisitor } from "../visitor/ShapeVisitor";

export class Circle extends Shape {
    private cxVal: number;
    private cyVal: number;
    private radiusVal: number;

    constructor(id: string, cx: number, cy: number, radius: number, renderer: Renderer) {
        super(id, "circle", renderer);
        this.cxVal = cx;
        this.cyVal = cy;
        this.radiusVal = radius;
    }

    get cx(): number {
        return this.cxVal;
    }
    get cy(): number {
        return this.cyVal;
    }
    get radius(): number {
        return this.radiusVal;
    }

    draw(): void{
        this.renderer.drawCircle(this.cxVal, this.cyVal, this.radiusVal);
    }

    accept<T>(visitor: ShapeVisitor<T>): T {
        return visitor.visitCircle(this);
    }
}
