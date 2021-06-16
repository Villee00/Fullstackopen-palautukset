const testRoute = require('express').Router()
const Blog = require('../models/blogi')
const User = require('../models/user')

testRoute.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  response
    .status(204).end()
})

module.exports = testRoute
