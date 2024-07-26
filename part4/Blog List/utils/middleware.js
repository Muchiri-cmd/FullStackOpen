const logger = require('./logger')

const errorHandler = (error,req,res,next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return res.status(400).json({ error:'Username already taken' })
  } else if (error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  } else if  (error.message && error.message.includes('password must be atleast 3 characters long')) {
    return res.status(400).json({ error: error.message })
  } else if (error.message && error.message.includes('Password is required')){
    return res.status(400).json({ error: error.message })
  }
  logger.error(error.message)
  next(error)
}

const unknownEndPoint = (req,res) => {
  res.status(404).send({ error:'Unknown endpoint' })
}

const requestLogger = ( req,res, next ) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ',req.path)
  logger.info('Body: ',req.body)
  next()
}

module.exports = { errorHandler, unknownEndPoint , requestLogger }