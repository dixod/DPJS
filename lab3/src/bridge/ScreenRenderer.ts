import type { Renderer } from "./Renderer";

export class ScreenRenderer implements Renderer {
    drawRectangle(x: number, y: number, width: number, height: number): void{
        console.log(`[SCREEN] Rectangle at (${x},${y}) size ${width}x${height}`)
    }

    drawCircle(cx: number, cy: number, radius: number): void{
        console.log(`[SCREEN] Circle center (${cx},${cy}) r=${radius}`)
    }
}