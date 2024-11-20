import patientData from '../data/patients';
import { SanitizedPatientData, Patient } from '../types';

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

export default{
  getAll,
  getSanitizedeData,
};