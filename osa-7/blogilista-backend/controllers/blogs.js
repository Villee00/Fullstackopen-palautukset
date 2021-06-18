const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogi')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { body } = request
  const { token } = request
  const { user } = request

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Title or/and url can't be empty" }).end()
  }

  if (!token || user === undefined) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const blogData = await blog.save()
  user.blogs = user.blogs.concat(blogData._id)
  await user.save()

  return response.status(201).json(blogData)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const { token } = request
  const { user } = request

  if (!token || user === undefined) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Only the creator of this blog can delete it' })
  }
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

    response.json(updateBlog.toJSON())
  } catch (error) {
    response.status(400).json(error).end()
  }
})

blogRouter.put('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.comments.push(comment)
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(newBlog.toJSON())
})

module.exports = blogRouter
