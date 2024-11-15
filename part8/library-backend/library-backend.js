const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')


const express =  require('express')
const cors = require('cors')
const http = require('http')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// const { startStandaloneServer } = require('@apollo/server/standalone')

mongoose.set('strictQuery',false)

const User = require('./models/User')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')


require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI,{
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
  })
  .then(() => {
    console.log('connected to db')
  })
  .catch((error) => {
    console.log('error connecting to db', error.message)
  })

//setup
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server:httpServer,
    path:'/'
  })

  const schema = makeExecutableSchema({ typeDefs,resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins:[
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart(){
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context:async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT,()=> {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()

