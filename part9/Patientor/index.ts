import express from 'express';
const app = express();
app.use(express.json());

const PORT = 8000;

app.get('/api/ping',(_req,res) => {
  console.log('ping!!!');
  res.send('pong');
});

app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});