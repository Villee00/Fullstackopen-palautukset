const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test.helper')

const api = supertest(app)
const Blog = require('../models/blogi')

let userToken

beforeEach(async () => {
  await Blog.deleteMany({})
  const users = await helper.usersInDB()
  helper.initalBlogs.forEach((blog) => {
    blog.user = users[3].id
  })
  await Blog.insertMany(helper.initalBlogs)
  const userReq = await api.post('/api/login')
    .send(helper.userForToken)
  userToken = `bearer ${userReq.body.token}`
})

describe('Blogs fetch requests', () => {
  test('Blogs are retuned as json', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Blogs return correct amount', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initalBlogs.length)
  })

  test('Check blogs for id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body
    contents.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('Post requests for blogs', () => {
  test('Add blog', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', userToken)
      .expect(201)

    const response = await helper.blogsInDB()
    expect(response).toHaveLength(helper.initalBlogs.length + 1)
  })

  test('Post without likes field', async () => {
    const blogWithoutLikes = {
      title: 'War stories',
      author: 'Michael Pen',
      url: 'Wikipedia.com',
    }
    const response = await api.post('/api/blogs')
      .send(blogWithoutLikes)
      .set('Authorization', userToken)
      .expect(201)

    expect(response.body.likes).toBeDefined()
  })

  test('No title or ulr in POST object', async () => {
    const blogUnfinished = {
      author: 'Unfinished',
      likes: 40,
    }
    const response = await api.post('/api/blogs')
      .send(blogUnfinished)
      .set('Authorization', userToken)
      .expect(400)
  })

  test('Add blog without user token', async () => {
    const response = await api.post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
  })
})

describe('Modify blogs', () => {
  test('Delete one blog', async () => {
    const blogs = await helper.blogsInDB()
    const response = await api.delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', userToken)
      .expect(204)
    expect(await helper.blogsInDB()).toHaveLength(helper.initalBlogs.length - 1)
  })

  test('Modify likes on one blog', async () => {
    const blogs = await helper.blogsInDB()
    const data = {
      likes: 80,
    }
    const response = await api.put(`/api/blogs/${blogs[0].id}`)
      .send(data)
      .set('Authorization', userToken)
      .expect(202)

    expect(response.body.likes).toEqual(data.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
