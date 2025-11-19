"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileReader_1 = require("./services/FileReader");
const logger_1 = __importDefault(require("./logger/logger"));
const shapes = FileReader_1.FileReader.read("data/input.txt");
logger_1.default.info("Shapes loaded:");
console.log(shapes);
