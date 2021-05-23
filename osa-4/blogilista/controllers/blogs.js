const blogRouter = require('express').Router()
const Blog = require('../models/blogi')

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  const blogData = await blog.save()

  response.status(201).json(blogData)
})

module.exports = blogRouter
