const logger = require('./logger')

const errorHandler = (error,req,res,next) => {
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