import { Gender } from "../types/types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name:z.string().min(1,"Name is required"),
  occupation:z.string().min(1,"Occupation is required"),
  gender:z.nativeEnum(Gender),
  ssn:z.string().optional(),
  dateOfBirth:z.string().date().optional(),
  entries: z.array(z.object({
    id: z.string(),
    date: z.string().date(),
    description: z.string(),
    specialist: z.string(),
    type: z.enum(["Hospital", "OccupationalHealthcare", "HealthCheck"]),
  })).optional(),
});

export const HealthCheckEntrySchema = z.object({
  description: z.string().min(1,"Description is required"),
  date: z.string().date(),
  specialist: z.string().min(1,"Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().int().min(0).max(3),  
});

const OccupationalHealthcareEntrySchema = z.object({
  description: z.string().min(1,"Description is required"),
  date: z.string().date(),
  specialist: z.string().min(1,"Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("OccupationalHealthcare"),
  sickLeave: z.object({
    startDate: z.string().date().nullable().optional(),
    endDate: z.string().date().nullable().optional(),
  }).optional(),
  employerName: z.string().optional(),
});

const TypeSchema = z.object({
  type: z.enum(["HealthCheck", "OccupationalHealthcare", "Hospital"]),
});

const HospitalEntrySchema = z.object({
  description: z.string().min(1,"Description is required"),
  date: z.string().date(),
  specialist: z.string().min(1,"Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const NewEntrySchema = (data: unknown) => {
  const typeCheck = TypeSchema.safeParse(data);

  if (!typeCheck.success) {
    throw new z.ZodError(typeCheck.error.issues);
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