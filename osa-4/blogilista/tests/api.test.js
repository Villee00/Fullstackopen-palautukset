const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test.helper')

const api = supertest(app)
const Blog = require('../models/blogi')

const initalBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(initalBlogs)
})

describe('Blogs fetch requests', () => {
  test('Blogs are retuned as json', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Blogs return correct amount', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initalBlogs.length)
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

    const response = await helper.blogsInDB()
    expect(response).toHaveLength(initalBlogs.length + 1)
  })

  test('Post without likes field', async () => {
    const blogWithoutLikes = {
      title: 'War stories',
      author: 'Michael Pen',
      url: 'Wikipedia.com',
    }
    const response = await api.post('/api/blogs')
      .send(blogWithoutLikes)
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
      .expect(400)
  })
})

describe('Modify blogs', () => {
  test('Delete one blog', async () => {
    const blogs = await helper.blogsInDB()
    const response = await api.delete(`/api/blogs/${blogs[0].id}`)
      .expect(204)
    expect(await helper.blogsInDB()).toHaveLength(initalBlogs.length - 1)
  })

  test('Modify likes on one blog', async () => {
    const blogs = await helper.blogsInDB()
    const data = {
      likes: 80,
    }
    const response = await api.put(`/api/blogs/${blogs[0].id}`)
      .send(data)
      .expect(202)

    expect(response.body.likes).toEqual(data.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
