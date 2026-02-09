import { Shape } from "./Shape";
import type { Renderer } from "../bridge/Renderer";
import type { ShapeVisitor } from "../visitor/ShapeVisitor";

export class Rectangle extends Shape {
    private xVal: number;
    private yVal: number;
    private widthVal: number;
    private heightVal: number;

    constructor(id: string, x: number, y: number, width: number, height: number, renderer: Renderer) {
        super(id, "rectangle", renderer);
        this.xVal = x;
        this.yVal = y;
        this.widthVal = width;
        this.heightVal = height;
    }

    get x(): number {
        return this.xVal
    }
    get y(): number {
        return this.yVal
    }
    get width(): number {
        return this.widthVal
    }
    get height(): number {
        return this.heightVal
    }

    draw(): void {
        this.renderer.drawRectangle(this.xVal, this.yVal, this.widthVal, this.heightVal);
    }

    accept<T>(visitor: ShapeVisitor<T>): T{
        return visitor.visitRectangle(this)
    }
}