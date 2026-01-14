export class InvalidDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidDataError";
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class FileReadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FileReadError";
    }
}
