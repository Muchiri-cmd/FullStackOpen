"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewEntrySchema = exports.NewPatientSchema = void 0;
const types_1 = require("../types/types");
const zod_1 = require("zod");
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    ssn: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().date().optional(),
    entries: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        date: zod_1.z.string().date(),
        description: zod_1.z.string(),
        specialist: zod_1.z.string(),
        type: zod_1.z.enum(["Hospital", "OccupationalHealthcare", "HealthCheck"]),
    })).optional(),
});
const HealthCheckEntrySchema = zod_1.z.object({
    description: zod_1.z.string(),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    type: zod_1.z.literal("HealthCheck"),
    healthCheckRating: zod_1.z.number().int().min(0).max(3),
});
const OccupationalHealthcareEntrySchema = zod_1.z.object({
    description: zod_1.z.string(),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    type: zod_1.z.literal("OccupationalHealthcare"),
    sickLeave: zod_1.z.object({
        startDate: zod_1.z.string().date(),
        endDate: zod_1.z.string().date(),
    }).optional(),
    employerName: zod_1.z.string().optional(),
});
const TypeSchema = zod_1.z.object({
    type: zod_1.z.enum(["HealthCheck", "OccupationalHealthcare", "Hospital"]),
});
const HospitalEntrySchema = zod_1.z.object({
    description: zod_1.z.string(),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    type: zod_1.z.literal("Hospital"),
    discharge: zod_1.z.object({
        date: zod_1.z.string().date(),
        criteria: zod_1.z.string(),
    }),
});
const NewEntrySchema = (data) => {
    const typeCheck = TypeSchema.safeParse(data);
    if (!typeCheck.success) {
        throw new zod_1.z.ZodError(typeCheck.error.issues);
    }
    const { type } = typeCheck.data;
    switch (type) {
        case "HealthCheck":
            return HealthCheckEntrySchema.parse(data);
        case "OccupationalHealthcare":
            return OccupationalHealthcareEntrySchema.parse(data);
        case "Hospital":
            return HospitalEntrySchema.parse(data);
        default:
            throw new Error("Unhandled entry type");
    }
};
exports.NewEntrySchema = NewEntrySchema;
