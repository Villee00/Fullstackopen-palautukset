import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { changeNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const createBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(addBlog({ title,author,url, }))
      dispatch(changeNotification(`Added a new blog ${title} by ${author}`))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(changeNotification(`Error ${error.message}`))
    }
  }

  return(
    <form onSubmit={createBlog}>
         Title: <input id='title' type="text" value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
            Author: <input id='author' type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
            Url: <input id='url' type="text" value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
      <button id="create-blog-submit" type="submit">Create</button>
    </form>
  )
}
export default BlogForm