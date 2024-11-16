import express from 'express'
import { calculateBMI } from './bmiCalculator';

const app = express()

app.get('/bmi', (req,res) => {
  //access qury params
  let { height , weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send('malformatted parameters');
  } else {
      const bmi = calculateBMI(Number(height), Number(weight));

      return res.json({
        'weight':weight,
        'height':height,
        'bmi':bmi
      })
  }
  
})

const PORT = 8000

app.listen(PORT,()=>{
  console.log(`Server listening at http://localhost:${PORT}`)
})