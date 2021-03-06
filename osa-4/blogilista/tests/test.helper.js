const Blog = require('../models/blogi')
const User = require('../models/user')

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
const newBlog = {
  title: 'Pertti',
  author: 'Pertti Kurikka',
  url: 'https://reactpatterns.com/',
  likes: 7,
}
const intialUsers = [{
  name: 'Satneri',
  username: 'santeri123',
  passwordHash: 'salsa123',
}, {
  name: 'Pekka',
  username: 'Pekka123',
  passwordHash: 'Pena53',
}, {
  name: 'Pertti',
  username: 'Pertti13',
  passwordHash: 'sala123',
},
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const userForToken = {
  username: 'Jarno22',
  password: 'jarno123',
}
module.exports = {
  newBlog,
  blogsInDB,
  intialUsers,
  usersInDB,
  initalBlogs,
  userForToken,
}
