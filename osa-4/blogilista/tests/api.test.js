const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test.helper')

const api = supertest(app)
const Blog = require('../models/blogi')

beforeEach(async () => {
  await Blog.deleteMany()
  helper.initalBlogs.forEach(async (blog) => {
    const blogObj = new Blog(blog)
    await blogObj.save()
  })
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initalBlogs.length)
})

test('check blogs for id', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body
  contents.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('Add blog', async () => {
  await api.post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDB()
  expect(response).toHaveLength(helper.initalBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
