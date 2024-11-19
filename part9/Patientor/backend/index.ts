import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping',(_req,res) => {
  console.log('ping!!!');
  res.send('pong');
});

app.get('/api/patients',(_req,_res) => {
  console.log('fetching patients');
});

app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});