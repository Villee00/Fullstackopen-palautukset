import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { addLikeBlog, deleteBlog, initBlogs } from './reducers/blogsReducer'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFromRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
    dispatch(initUsers())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username,password }))
    setPassword('')
    setUserName('')
  }

  const removeBlog = async (id) => {
    try {
      const foundBlog = blogs.find(blog => blog.id === id)
      if(window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?` )){
        dispatch(deleteBlog(id))
        dispatch(changeNotification(`Blog ${foundBlog.title} deleted!`))
      }
    } catch (error) {
      dispatch(changeNotification('Blog is already deleted'))
    }
  }

  const sendBlogLike = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const newBlog = { ...blog, likes: blog.likes+=1 }
      dispatch(addLikeBlog(newBlog))
    } catch (error) {
      dispatch(changeNotification(`Error ${error.message}`))
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(changeNotification(`Added a new blog ${newBlog.data.title} by ${newBlog.data.author}`))

      blogFromRef.current.toggleHidden()
    } catch (error) {
      dispatch(changeNotification(`Error ${error.message}`))
    }
  }
  const logout = () => {
    dispatch(logoutUser())
  }
  if(user === null){
    return(
      <form onSubmit={handleLogin}>
        <h2>Log in to blogs</h2>
        <Notification/>
        Username: <input type="text" id="username" value={username} onChange={({ target }) => setUserName(target.value)}/>
        <br/>
        Password: <input type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        <br/>
        <button type="submit" id="login">login</button>
      </form>
    )
  }

  return (
    <Router>
      <h1>blogs</h1>
      <Notification/>
      {user.name} logged in
      <button onClick={() => logout()} id='logout' >Logout</button>

      <h2>Create new blog</h2>
      <Togglable id="create-blog" buttonText="Create new blog" ref={blogFromRef}>
        <BlogForm addBlog={createBlog}/>
      </Togglable>

      <Switch>
        <Route path="/users/:id">
          <User/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => sendBlogLike(blog.id)}
              userID={user.username}
              removeBlog={() => removeBlog(blog.id)}/>
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App