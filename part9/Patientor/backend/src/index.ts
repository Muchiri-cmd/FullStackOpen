import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping',(_req,res) => {
  res.send('pong');
});

app.use('/api/patients',patientsRouter);
app.use('/api/diagnoses',diagnosesRouter);
app.use(errorHandler);



app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});