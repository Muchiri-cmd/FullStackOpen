const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors : async() => {
      try {
        return await Author.find({});
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    },
    me:(root,args,context) => {
      return context.currentUser
    },

    allBooks: async(root,args) => {
      let query = {}
      if(args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        } else {
          return []
        }
      }

      if(args.genre){
        query.genres = args.genre
      }

      return Book.find(query).populate('author')
    },
  },
  Author:{
    bookCount:async(root) => {
      return await Book.countDocuments({ author:root._id })
    }
  },

  Mutation: {
    addBook: async(root,args,context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      try {

        if(args.title.length < 5){
          throw new GraphQLError('Book title must be atleast 5 characters long',{
            extensions:{ code : 'BAD_USER_INPUT' }
          })
       }
      if (args.author.length < 4) {
        throw new GraphQLError('Author name must be at least 4 characters long', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
        
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        
        await author.save();
      }

        //create book
        const book = new Book({ ...args, author: author._id})
        await book.save()

        await book.populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded:book })

        return book
      } 
      catch(error){  
        if (error.name === 'ValidationError') {
          const errorMessages = Object.values(error.errors).map(e => e.message);
          throw new GraphQLError(`Validation error: ${errorMessages.join(', ')}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              error: errorMessages
            }
          });
        }

        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error: error.message || error
          }
        });
      }  
    },

    editAuthor: async(root,args,context) => {

    if (!context.currentUser) {
      throw new GraphQLError('Authentication required', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      })
    }

    const author = await Author.findOne({ name:args.name })
    if(author){
      author.born = args.setBornTo
      try{
        await author.save()
        return author
      }
      catch(error){
        throw new GraphQLError('Edit Author Failed', {
          extensions:{
            code:'BAD_USER_INPUT',
            error:error.message || error
          }
        })
      }
    }
    throw new GraphQLError('Author not found', {
      extensions: { code: 'BAD_USER_INPUT' }
    });

    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username , favoriteGenre:args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

  },
  Subscription: {
    bookAdded: {
      subscribe:() => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}


module.exports = resolvers