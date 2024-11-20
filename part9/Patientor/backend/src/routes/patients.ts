/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patients';
import { Patient } from '../types';
const router = express.Router();
import { Response } from 'express';

router.get('/',(_req,res: Response<Patient[]>) => {
  // console.log('fetching patients');
  res.send(patientService.getSanitizedeData());
});

router.post('/',(req,res)=> {
  const { name,occupation,gender,ssn,dateOfBirth } = req.body;

  const newPatient = patientService.addPatient({
    name,
    occupation,
    gender,
    ssn,
    dateOfBirth
  });
  // console.log(`added ${name} successfully`);
  res.json(newPatient);
});

export default router;