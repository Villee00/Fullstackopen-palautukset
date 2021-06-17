import React from 'react'
import { addLikeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import { useHistory, useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const history =useHistory()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user.username)
  const blog = blogs.find(n => n.id === useParams().id)

  if(!blog){
    return null
  }

  const removeBlog = async () => {
    try {
      const foundBlog = blogs.find(n => n.id === blog.id)
      if(window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?` )){
        dispatch(deleteBlog(blog.id))
        dispatch(changeNotification(`Blog ${foundBlog.title} deleted!`))
        history.push('/')
      }
    } catch (error) {
      dispatch(changeNotification('Blog is already deleted'))
    }
  }

  const sendBlogLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes+=1 }
      dispatch(addLikeBlog(newBlog))
    } catch (error) {
      dispatch(changeNotification(`Error ${error.message}`))
    }
  }


  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p id="blog-likes">Likes: {blog.likes} <button id="like-blog" onClick={() => sendBlogLike()}>Like</button></p>
      <p>{blog.user.name}</p>
      {user === blog.user.username ?<button id="delete-blog" onClick={removeBlog}>remove</button> : null }
    </div>
  )
}

export default Blog
