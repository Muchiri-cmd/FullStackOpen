"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPatientSchema = void 0;
const types_1 = require("../types/types");
const zod_1 = require("zod");
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    ssn: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    entries: zod_1.z.array(zod_1.z.string()).optional(),
});
