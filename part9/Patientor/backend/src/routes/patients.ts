import express from 'express';
import patientService from '../services/patients';
import { Patient } from '../types';
const router = express.Router();
import { Response } from 'express';

router.get('/',(_req,res: Response<Patient[]>) => {
  // console.log('fetching patients');
  res.send(patientService.getSanitizedeData());
});

export default router;