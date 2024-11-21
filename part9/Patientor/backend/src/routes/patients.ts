import express from 'express';
import patientService from '../services/patients';
import { Patient } from '../types/types';
const router = express.Router();
import { Response } from 'express';
import toTypedPatient from '../utils/utils';

router.get('/',(_req,res: Response<Patient[]>) => {
  // console.log('fetching patients');
  res.send(patientService.getSanitizedeData());
});

router.post('/',(req,res)=> {
  
  try {
    const newPatient = toTypedPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch(error:unknown) {
    let errorNessage = 'Something went wrong.';
    if ( error instanceof Error){
      errorNessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorNessage);
  }
  
});

export default router;