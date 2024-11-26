import patientData from '../data/patients';
import { SanitizedPatientData, Patient, NewPatient,Entry, EntryWithoutId} from '../types/types';
import {v1 as uuid} from 'uuid';
import parseDiagnosisCodes from '../middleware/parseDiagnosis';


const getAll = ():Patient[] => {
  return patientData;
};

const getPatientById = (id: string): Patient => {
   const patient = patientData.find(patient => patient.id === id);
   if (!patient) {
     throw new Error(`Patient with id ${id} not found`);
   }
  //  console.log(patient);
   return patient;
};

const getSanitizedeData = ():SanitizedPatientData[] =>{
  return patientData.map(({ id,name,dateOfBirth, gender,occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( patient:NewPatient):Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: patient.entries as Entry[] || [],
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatientById(id);
  const newEntry: Entry = {
    ...entry,
    id: uuid(),
    diagnosisCodes: parseDiagnosisCodes(entry), 
  };
  patient.entries.push(newEntry);
  return newEntry;
};


export default{
  getAll,
  getSanitizedeData,
  addPatient,
  getPatientById,
  addEntry
};