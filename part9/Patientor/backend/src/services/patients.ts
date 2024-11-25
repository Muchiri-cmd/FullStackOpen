import patientData from '../data/patients';
import { SanitizedPatientData, Patient, NewPatient } from '../types/types';
import {v1 as uuid} from 'uuid';


const getAll = ():Patient[] => {
  return patientData;
};

const getPatientById = (id: string): Patient => {
   const patient = patientData.find(patient => patient.id === id);
   if (!patient) {
     throw new Error(`Patient with id ${id} not found`);
   }
   console.log(patient);
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
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};


export default{
  getAll,
  getSanitizedeData,
  addPatient,
  getPatientById
};