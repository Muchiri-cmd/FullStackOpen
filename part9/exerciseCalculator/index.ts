/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/exercises',(req, res) => {
  const { daily_exercises, target } = req.body;

  // console.log("daily exercises",daily_exercises,"target:",target)
  if (!daily_exercises || daily_exercises.length === 0 || !target){
    return res.status(400).send('Parameters missing or malformatted parameters');
  } else {
    //exercises calculator module

    //convert daily exercices into an array of numbers
    const dailyExercisesArray = Array.isArray(daily_exercises) 
                              ? daily_exercises.map(Number) 
                              : [Number(daily_exercises)];

    const targetHours = Number(target);                            
    const response = calculateExercises(dailyExercisesArray,targetHours);
    return res.json(response);
  }

});

const PORT = 3003;

app.listen(PORT,() => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

