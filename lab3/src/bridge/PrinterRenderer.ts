import { appendFileSync } from "node:fs";
import type { Renderer } from "./Renderer";

const printout = "printout.txt";

export class PrinterRenderer implements Renderer {
  drawRectangle(x: number, y: number, width: number, height: number): void {
    appendFileSync(
      printout,
      `[PRINTER] Rectangle at (${x},${y}) size ${width}x${height}\n`,
      { encoding: "utf-8" },
    );
  }

  drawCircle(cx: number, cy: number, radius: number): void {
    appendFileSync(
      printout,
      `[PRINTER] Circle center (${cx},${cy}) r=${radius}\n`,
      { encoding: "utf-8" },
    );
  }
}
