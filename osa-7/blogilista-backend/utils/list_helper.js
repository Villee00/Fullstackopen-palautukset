const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const total = (sum, blog) => blog.likes + sum

  return blogs.reduce(total, 0)
}
const favoriteBlog = (blogs) => {
  const favorite = (top, blog) => (top.likes > blog.likes ? top
    : { title: blog.title, author: blog.author, likes: blog.likes })

  return blogs.reduce(favorite, 0)
}

const mostBlogs = (blogs) => {
  const author = (authors, blog) => {
    if (lodash.findIndex(authors, (o) => o.author === blog.author) !== -1) {
      const index = lodash.findIndex(authors, (o) => o.author === blog.author)
      authors[index].blogs += 1
    } else {
      authors.push({ author: blog.author, blogs: 1 })
    }
    return authors
  }

  return lodash.maxBy(blogs.reduce(author, []), (o) => o.blogs)
}
const mostLikes = (blogs) => {
  const author = (authors, blog) => {
    if (lodash.findIndex(authors, (o) => o.author === blog.author) !== -1) {
      const index = lodash.findIndex(authors, (o) => o.author === blog.author)
      authors[index].likes += blog.likes
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
    return authors
  }

  return lodash.maxBy(blogs.reduce(author, []), (o) => o.likes)
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
