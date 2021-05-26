const blogRouter = require('express').Router()
const Blog = require('../models/blogi')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const { body } = request

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Title or/and url can't be empty" }).end()
  }

  const users = await User.find({})
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: users[0]._id,
  })

  const blogData = await blog.save()
  users[0].blogs = users[0].blogs.concat(blogData._id)
  await users[0].save()

  return response.status(201).json(blogData)
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
