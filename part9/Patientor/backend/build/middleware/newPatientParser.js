"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPatientParser = void 0;
const utils_1 = require("../utils/utils");
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.newPatientParser = newPatientParser;
