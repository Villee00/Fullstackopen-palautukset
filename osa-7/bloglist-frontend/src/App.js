import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'
import { BrowserRouter as Router,Route, Switch, Link } from 'react-router-dom'
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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <Router>
      <h1>blogs</h1>
      <Notification/>
      {user.name} logged in
      <button onClick={() => logout()} id='logout' >Logout</button>
      <Togglable id="create-blog" buttonText="Create new blog" ref={blogFromRef}>
        <BlogForm/>
      </Togglable>

      <Switch>
        <Route path="/users/:id">
          <User/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/blogs/:id">
          <Blog/>
        </Route>
        <Route path="/">
          {blogs.map(blog =>
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              <p style={blogStyle}>{blog.title}</p>
            </Link>
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App