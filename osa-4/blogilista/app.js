const http = require('http')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const { errorHandler, unknownEndpoint, requestLogger } = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})

app.use(cors())
app.use(express.json())

app.use(requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)
app.use(unknownEndpoint)
module.exports = app
