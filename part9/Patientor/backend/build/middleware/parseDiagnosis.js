"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
exports.default = parseDiagnosisCodes;
