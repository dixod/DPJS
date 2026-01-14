import { existsSync, mkdirSync } from "node:fs";
import pino from "pino";

if (!existsSync("logs")) {
    mkdirSync("logs");
}

const logger = pino({
    level: "info",
    transport: {
        targets: [
            {
                target: "pino-pretty",
                level: "info",
                options: {
                    colorize: true
                }
            },
            {
                target: "pino/file",
                level: "info",
                options: {
                    destination: "logs/app.log",
                    append: true
                }
            }
        ]
    }
});

export default logger;