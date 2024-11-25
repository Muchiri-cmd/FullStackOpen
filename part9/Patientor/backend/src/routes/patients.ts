import express from 'express';
import patientService from '../services/patients';
import { NewPatient, Patient } from '../types/types';
const router = express.Router();
import { Request,Response } from 'express';
import { newPatientParser } from '../middleware/newPatientParser';

router.get('/',(_req,res) => {
  // console.log('fetching patients');
  res.send(patientService.getSanitizedeData());
});

router.get('/:id',(req,res:Response<Patient>) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post('/', newPatientParser,(req:Request<unknown,unknown,NewPatient>,res:Response<Patient>) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);  
});

export default router;