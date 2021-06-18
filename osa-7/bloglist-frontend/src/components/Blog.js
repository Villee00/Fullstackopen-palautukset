import React, { useState } from 'react'
import { addComment, addLikeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import { useHistory, useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const history =useHistory()
  const [comment, setComment] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user.username)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

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

  const sendBlogComment = async () => {
    const newBlog = { ...blog, comments:[...blog.comments, comment] }
    dispatch(addComment(newBlog))
    dispatch(changeNotification('New comment added'))
    setComment('')
  }


  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p id="blog-likes">Likes: {blog.likes} <button id="like-blog" onClick={() => sendBlogLike()}>Like</button></p>
      <p>{blog.user.name}</p>
      {user === blog.user.username ?<button id="delete-blog" onClick={removeBlog}>remove</button> : null }
      <br/>
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}/>
      <button onClick={sendBlogComment}>add comment</button>

      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
