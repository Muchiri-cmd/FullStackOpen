import { NewPatientSchema } from "../utils/utils";
import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type SanitizedPatientData = Omit <Patient, "ssn" | "entries">;
// export type NewPatient = Omit<Patient, 'id'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;