import { NewPatient } from "../types/types";
import { Gender } from "../types/types";

const toTypedPatient= (object:unknown):NewPatient => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  if('name' in object && 'occupation' in object && 'gender' in object
    && 'ssn' in object && 'dateOfBirth' in object
  ){
    const newPatient : NewPatient = {
      name:parseString(object.name,"name"),
      occupation:parseString(object.occupation,"occupation"),
      gender:parseGender(object.gender),
      ssn:parseSSN(object.ssn),
      dateOfBirth:parseDate(object.dateOfBirth),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseString = (str:unknown,fieldName: string):string => {
  if(!str || !isString(str)){
    throw new Error('Incorrect or missing entry');
  }
  //allow letter & spaces only
  const validCharsRegex = /^[a-zA-Z\s]+$/; 
  if (!validCharsRegex.test(str)) {
    throw new Error(`Invalid characters in ${fieldName} . Use letters and spaces only`);
  }
  
  return str;
};

const isString = (text:unknown):text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date:string):boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date:unknown):string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect date format or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender:unknown):Gender => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect gender format');
  }
  return gender;
};

const isGender = (param:string):param is Gender => {
  return Object.values(Gender).map(val => val.toString()).includes(param);
};

const isSSN = (ssn:string):boolean=>{
  const ssnRegex = /^\d{6}-\d{2,4}[A-Z]?$/;
  return ssnRegex.test(ssn);
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Invalid or missing SSN ' + ssn);
  }
  return ssn;
};

export default toTypedPatient;