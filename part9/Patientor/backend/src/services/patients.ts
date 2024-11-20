import patientData from '../data/patients';
import { SanitizedPatientData, Patient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';


const getAll = ():Patient[] => {
  return patientData;
};

const getSanitizedeData = ():SanitizedPatientData[] =>{
  return patientData.map(({ id,name,dateOfBirth, gender,occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient:NewPatient):Patient => {
  const newPatient = {
    id:uuid(),
   ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};


export default{
  getAll,
  getSanitizedeData,
  addPatient
};