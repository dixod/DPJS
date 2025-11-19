import pino from "pino";
import * as fs from "fs";

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

const logger = pino({
    level: "info",
    transport: {
        targets: [
            {
                target: "pino-pretty",
                level: "info",
                options: { colorize: true }
            },
            {
                target: "pino/file",
                level: "info",
                options: { destination: "logs/app.log" }
            }
        ]
    }
});

export default logger;