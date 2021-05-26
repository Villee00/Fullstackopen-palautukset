const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test.helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
  await User.insertMany(helper.intialUsers)
})

test('Get all the users', async () => {
  await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Create user with too short username', async () => {
  const newUser = {
    username: '1',
    name: 'Jarno',
    password: 'Salasana',
  }

  const userData = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(userData.body.error).toBeDefined()
})

test('Too short password', async () => {
  const newUser = {
    username: 'Jarno22',
    name: 'Jarno',
    password: 's',
  }

  const userData = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(userData.body.error).toBeDefined()
})

test('Post new user', async () => {
  const newUser = {
    username: 'Jarno22',
    name: 'Jarno',
    password: 's',
  }
})

afterAll(() => {
  mongoose.connection.close()
})
