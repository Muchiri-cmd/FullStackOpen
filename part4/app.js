const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const appRouter = require('./controllers/routes')

mongoose.set('strictQuery', false)

logger.info('Connecting to database ....')

mongoose.connect(config.MONGODB_URI,{
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}).then(logger.info('Connected to database'))
  .catch(error => logger.error(error))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', appRouter)


app.use(middleware.errorHandler)
app.use(middleware.unknownEndPoint)


module.exports = app