import { readFileSync } from "node:fs";
import logger from "../logger/logger.js";
import { ShapeFactory } from "../factory/ShapeFactory.js";
import { Shape } from "../entities/shape.js";
import { FileReadError } from "../errors/errors.js";

export class FileReader {
    public static read(path: string): Shape[] {
        try {
            const content = readFileSync(path, "utf-8");
            const lines = content.split("\n");
            const shapes: Shape[] = [];
            let shapeId = 1;

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) {
                    continue;
                }

                const parts = trimmedLine.split(" ");
                if (parts.length < 2) {
                    logger.warn(`Line without type or params: ${trimmedLine}`);
                    continue;
                }

                const type = parts[0].toLowerCase();
                const params = parts.slice(1).join(" ");

                try {
                    if (type === "oval") {
                        shapes.push(ShapeFactory.createOval(`shape-${shapeId}`, params));
                        shapeId += 1;
                    } else if (type === "sphere") {
                        shapes.push(ShapeFactory.createSphere(`shape-${shapeId}`, params));
                        shapeId += 1;
                    } else {
                        logger.warn(`Unknown shape type: ${type}`);
                    }
                } catch {
                    logger.warn(`Invalid shape params: ${trimmedLine}`);
                }
            }

            return shapes;
        } catch (error) {
            logger.error(`Failed to read file: ${path}`);
            throw new FileReadError(`Unable to read file: ${path}`);
        }
    }
}
