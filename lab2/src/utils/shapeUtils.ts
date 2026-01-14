import { Shape } from "../entities/shape.js";
import { Oval } from "../entities/oval.js";
import { Sphere } from "../entities/sphere.js";
import { Point } from "../entities/point.js";

export const getShapePoints = (shape: Shape): Point[] => {
    if (shape instanceof Oval) {
        return [shape.firstPoint, shape.secondPoint];
    }

    if (shape instanceof Sphere) {
        return [shape.center];
    }

    throw new Error("Unsupported shape type");
};

export const getShapeCenter = (shape: Shape): Point => {
    if (shape instanceof Oval) {
        const centerX = (shape.firstPoint.x + shape.secondPoint.x) / 2;
        const centerY = (shape.firstPoint.y + shape.secondPoint.y) / 2;
        return new Point(centerX, centerY, 0);
    }

    if (shape instanceof Sphere) {
        return shape.center;
    }

    throw new Error("Unsupported shape type");
};

export const getShapePrimaryPoint = (shape: Shape): Point => {
    if (shape instanceof Oval) {
        return shape.firstPoint;
    }

    if (shape instanceof Sphere) {
        return shape.center;
    }

    throw new Error("Unsupported shape type");
};
