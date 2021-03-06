import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import postLogin from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFromRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((currentBlog, nextBlog ) => {
        return nextBlog.likes - currentBlog.likes
      }))
    )
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('user')
    if(userData !== null){
      const oldUser = JSON.parse(userData)
      setUser(oldUser)
      blogService.setToken(oldUser.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userData = await postLogin({ username,password })
      setUser(userData)
      blogService.setToken(userData.token)
      setPassword('')
      setUserName('')
      window.localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.log(error.message)
      setNotificationMessage('Wrong username or password')

      setTimeout(() => {
        setNotificationMessage(null)
      },2000)
    }
  }

  const removeBlog = async (id) => {
    try {
      const foundBlog = blogs.find(blog => blog.id === id)
      if(window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?` )){
        await blogService.remove(id)
        setBlogs(blogs.filter((oldBlog) => oldBlog.id !== id))
        setNotificationMessage(`Blog ${foundBlog.title} deleted!` )

        setTimeout(() => {
          setNotificationMessage(null)
        },2000)
      }
    } catch (error) {
      notificationMessage('Blog is already deleted')
      setBlogs(blogs.map((oldBlog) => oldBlog.id === id? null: oldBlog))
    }
  }

  const sendBlogLike = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const newBlog = { ...blog, likes: blog.likes+=1 }
      const returnedBlog = await blogService.update(newBlog)
      returnedBlog.user = blog.user
      setBlogs(blogs.map((oldBlog) => oldBlog.id === id? returnedBlog: oldBlog))

      setBlogs(blogs.sort((currentBlog, nextBlog ) => {
        return nextBlog.likes - currentBlog.likes
      }))
    } catch (error) {
      setNotificationMessage('ERROR: ' + error.message)

      setTimeout(() => {
        setNotificationMessage(null)
      },2000)
    }

  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog.data))
      setNotificationMessage(`Added a new blog ${newBlog.data.title} by ${newBlog.data.author}`)

      blogFromRef.current.toggleHidden()
      setTimeout(() => {
        setNotificationMessage(null)
      },2000)
    } catch (error) {
      setNotificationMessage(`Error ${error.message}`)

      setTimeout(() => {
        setNotificationMessage(null)
      },2000)

    }
  }
  const logout = () => {
    window.localStorage.removeItem('user')

    setUser(null)
  }
  if(user === null){
    return(
      <form onSubmit={handleLogin}>
        <h2>Log in to blogs</h2>
        <Notification message={notificationMessage}/>
        Username: <input type="text" id="username" value={username} onChange={({ target }) => setUserName(target.value)}/>
        <br/>
        Password: <input type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        <br/>
        <button type="submit" id="login">login</button>
      </form>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notificationMessage}/>
      {user.name} logged in
      <button onClick={() => logout()} id='logout' >Logout</button>

      <h2>Create new blog</h2>
      <Togglable id="create-blog" buttonText="Create new blog" ref={blogFromRef}>
        <BlogForm addBlog={createBlog}/>
      </Togglable>


      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => sendBlogLike(blog.id)}
          userID={user.username}
          removeBlog={() => removeBlog(blog.id)}/>
      )}
    </div>
  )
}

export default App