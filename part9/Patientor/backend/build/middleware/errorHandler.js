"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json(err.errors.map((e) => ({
            message: e.message,
            path: e.path,
            code: e.code,
        })));
    }
    else if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: "Unknown error occurred" });
    }
};
exports.default = errorHandler;
