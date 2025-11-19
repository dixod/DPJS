import * as fs from "fs";
import logger from "../logger/logger.js";
import { ShapeFactory } from "../factory/ShapeFactory.js";
export class FileReader {
    static read(path) {
        const shapes = [];
        let id = 1;
        try {
            const lines = fs.readFileSync(path, "utf-8").split("\n");
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed === "")
                    continue;
                const spaceIndex = trimmed.indexOf(" ");
                if (spaceIndex === -1) {
                    logger.error(`Invalid line (no params): ${trimmed}`);
                    continue;
                }
                const type = trimmed.substring(0, spaceIndex);
                const params = trimmed.substring(spaceIndex + 1);
                try {
                    if (type === "oval") {
                        shapes.push(ShapeFactory.createOval("id" + id, params));
                    }
                    else if (type === "sphere") {
                        shapes.push(ShapeFactory.createSphere("id" + id, params));
                    }
                    else {
                        logger.error(`Unknown type: ${type}`);
                    }
                }
                catch {
                    logger.error(`Invalid shape params: ${trimmed}`);
                }
                id = id + 1;
            }
        }
        catch (err) {
            logger.error(`Failed to read file: ${path}`);
        }
        return shapes;
    }
}
