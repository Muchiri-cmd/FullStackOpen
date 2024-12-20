export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface SickLeave{
  startDate:Date;
  endDate:Date;
}
 interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  sickLeave?:SickLeave;
  employerName?:string;
 }

 interface Discharge {
  date:Date;
  criteria:string;
 }

 interface HospitalEntry extends BaseEntry{
  type:"Hospital";
  discharge:Discharge
 }

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface EntryDetailProps {
  entry:Entry;
  diagnosis:Diagnosis[];
}
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type SanitizedPatientData = Omit <Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, 'id'>;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;