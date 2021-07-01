require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')

const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log("Connected to mongodb!")
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String,
    genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
      ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')
      if (args.author) {
        return books.filter(n => n.name === args.author)
      }
      if (args.genre) {
        return books.filter(n => n.genres.includes(args.genre))
      }
      return books
    },

    allAuthors: async (root, args) => {
      return await Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("You need to login before adding a book")
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author, bookCount: 1 })
        author = newAuthor
      }
      else {
        author.bookCount += 1
      }

      await author.save()
      const newBook = new Book({ ...args, author: author })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("You need to login before editing author")
      }

      try {
        const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
        if (!author) {
          return null
        }
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ ...args })
        user.save()
        return user
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      try {
        const foundUser = await User.findOne({ username: args.username })

        if (!foundUser && args.password !== "secret") {
          throw new UserInputError("Cant find user or wrong password")
        }

        const token = {
          username: foundUser.username,
          id: foundUser._id,
        }

        return { value: jwt.sign(token, process.env.JWT_SECRET) }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }

})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscription server ready at ${subscriptionsUrl}`)
})