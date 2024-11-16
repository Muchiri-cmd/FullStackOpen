import express from 'express'
const app = express()

app.get('/hello', ( _req,res ) => {
  res.send('Hello Full Stack!')
})

const PORT = 5000

app.listen(PORT,() => {
  console.log(`Server running at http://localhost:${PORT}`)
})