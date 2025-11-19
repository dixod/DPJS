"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.InvalidDataError = void 0;
class InvalidDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidDataError";
    }
}
exports.InvalidDataError = InvalidDataError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
