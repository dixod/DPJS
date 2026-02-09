import type { Renderer } from "../bridge/Renderer";
import type { ShapeVisitor } from "../visitor/ShapeVisitor";

export abstract class Shape {
    readonly id: string;
    readonly name: string;
    protected renderer: Renderer;

    constructor(id: string, name: string, renderer: Renderer) {
        this.id = id;
        this.name = name;
        this.renderer = renderer;
    }

    setRenderer(renderer: Renderer): void{
        this.renderer = renderer;
    }

    abstract draw(): void;

    abstract accept<T>(visitor: ShapeVisitor<T>): T;
}