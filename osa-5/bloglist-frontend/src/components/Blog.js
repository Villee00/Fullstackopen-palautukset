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
      <div style={showNeededInfo} onClick={changeVisible}>
        {blog.title} {blog.author}
        <button onClick={changeVisible}>show</button>
      </div>

      <div style={showInfo} className="blogAllInfo">
        {blog.title} {blog.author}
        <button onClick={changeVisible}>hide</button>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        {userID === blog.user.username ?<button onClick={removeBlog}>remove</button> : null }
      </div>
    </div>
  )
}

export default Blog
