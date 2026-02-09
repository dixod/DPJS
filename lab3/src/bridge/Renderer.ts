export interface Renderer {
    drawRectangle(x: number, y: number, width: number, height: number): void;

    drawCircle(cx: number, cy: number, radius: number): void;
}