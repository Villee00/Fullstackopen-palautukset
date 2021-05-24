const blogRouter = require('express').Router()
const { response } = require('express')
const { request } = require('../app')
const Blog = require('../models/blogi')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const { body } = request

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
  const blogData = await blog.save()

  response.status(201).json(blogData)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { body } = request

  try {
    const blog = await Blog.findById(request.params.id)

    const newBlog = {
      title: body.title || blog.title,
      author: body.author || blog.author,
      url: body.url || blog.url,
      likes: body.likes || blog.likes,
    }
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })

    response.status(202).json(updateBlog.toJSON())
  } catch (error) {
    response.status(400).json(error).end()
  }
})
module.exports = blogRouter
