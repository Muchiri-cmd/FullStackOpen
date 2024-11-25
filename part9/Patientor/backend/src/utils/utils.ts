import { Gender } from "../types/types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name:z.string(),
  occupation:z.string(),
  gender:z.nativeEnum(Gender),
  ssn:z.string().optional(),
  dateOfBirth:z.string().optional(),
  entries:z.array(z.string()).optional(),
});