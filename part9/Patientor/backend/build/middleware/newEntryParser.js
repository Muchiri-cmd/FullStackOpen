"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const newEntryParser = (req, _res, next) => {
    try {
        (0, utils_1.NewEntrySchema)(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = newEntryParser;
