const logger = require('./logger')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request,response,next) => {
  const auth = request.get('authorization')
  if(auth && auth.startsWith('Bearer ')){
    request.token = auth.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = (request,response,next) => {
  if (request.token) {
    const token = jwt.verify(request.token, process.env.PASSPHRASE)
    if (token && token.id) {
      request.user = token
    } else {
      request.user = null
    }
  } else {
    request.user = null
  }
  next()
}

const errorHandler = (error,req,res,next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return res.status(400).json({ error:'Username already taken' })
  } else if (error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  } else if(error.name ==='CastError') {
    return res.status(400).send({ error:'Invalid resource id' })
  } else if  (error.message && error.message.includes('password must be atleast 3 characters long')) {
    return res.status(400).json({ error: error.message })
  } else if (error.message && error.message.includes('Password is required')){
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError'){
    return res.status(401).json({ error:'token invalid' })
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

module.exports = { errorHandler, unknownEndPoint , requestLogger, tokenExtractor, userExtractor }