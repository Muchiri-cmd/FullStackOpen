import express from 'express';
import diagnosesService from '../services/diagnoses';
import { Diagnosis } from '../types/types';
import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  // console.log('Fetching diagnoses');
  res.send(diagnosesService.getAll());
});

export default router;