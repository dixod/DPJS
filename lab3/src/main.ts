import { ScreenRenderer } from "./bridge/ScreenRenderer";
import { PrinterRenderer } from "./bridge/PrinterRenderer";
import { Rectangle } from "./shapes/Rectangle";
import { Circle } from "./shapes/Circle";
import { AreaVisitor } from "./visitor/AreaVisitor";
import { PerimeterVisitor } from "./visitor/PerimeterVisitor";

const screen = new ScreenRenderer();
const printer = new PrinterRenderer();

const rectangle = new Rectangle("r1", 10, 20, 30, 40, screen);
const circle = new Circle("c1", 1, 4, 10, screen);

rectangle.draw();
circle.draw();

rectangle.setRenderer(printer);
circle.setRenderer(printer);

rectangle.draw();
circle.draw();

const areaVisitor = new AreaVisitor();
const perimeterVisitor = new PerimeterVisitor();

console.log("[VISITOR] Rectangle area:", rectangle.accept(areaVisitor));
console.log("[VISITOR] Rectangle perimeter:", rectangle.accept(perimeterVisitor));

console.log("[VISITOR] Circle area:", circle.accept(areaVisitor));
console.log("[VISITOR] Circle perimeter:", circle.accept(perimeterVisitor));
