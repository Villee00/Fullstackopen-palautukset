import React, { useState } from 'react'

const Blog = ({ blog, handleLike, userID, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showInfo = { display: visible? '': 'none' }
  const showNeededInfo = { display: visible? 'none': '' }

  const changeVisible = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      <div style={showNeededInfo} onClick={changeVisible} className="defaultInfo">
        {blog.title} {blog.author}
        <button onClick={changeVisible}>show</button>
      </div>

      <div style={showInfo} className="blogAllInfo">
        {blog.title} {blog.author}
        <button onClick={changeVisible}>hide</button>
        <p>{blog.url}</p>
        <p id="blog-likes">Likes: {blog.likes} <button id="like-blog" onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        {userID === blog.user.username ?<button id="delete-blog" onClick={removeBlog}>remove</button> : null }
      </div>
    </div>
  )
}

export default Blog
