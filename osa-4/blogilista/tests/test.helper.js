const Blog = require('../models/blogi')

const newBlog = {
  title: 'Pertti',
  author: 'Pertti Kurikka',
  url: 'https://reactpatterns.com/',
  likes: 7,
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  newBlog,
  blogsInDB,
}
