import { FileReader } from "./services/FileReader.js";
import logger from "./logger/logger.js";
const shapes = FileReader.read("data/input.txt");
logger.info("Shapes loaded:");
console.log(shapes);
