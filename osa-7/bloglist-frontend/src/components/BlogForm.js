import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({ title,author,url, })

    setTitle('')
    setAuthor('')
    setUrl('')
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