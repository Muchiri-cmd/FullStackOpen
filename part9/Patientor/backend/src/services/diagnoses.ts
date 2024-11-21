import diagnosesData from '../data/diagnoses';
import { Diagnosis } from '../types/types';

const getAll = ():Diagnosis[] => {
  return diagnosesData;
};

export default{
  getAll,
};
