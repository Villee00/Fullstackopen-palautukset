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

import Container from '@material-ui/core/Container'
import { Breadcrumbs, Button, Typography, List, ListItem,ListItemText } from '@material-ui/core'
import { TextField } from '@material-ui/core'

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
        <Typography variant="h2">Log in to blogs</Typography>
        <Notification/>
        <TextField label="Username" id="username" value={username} onChange={({ target }) => setUserName(target.value)}/>
        <br/>
        <TextField label="Password" type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        <br/>
        <Button variant="contained" color="primary" type="submit" id="login">login</Button>
      </form>
    )
  }

  const menuSytle ={
    padding: 5
  }
  return (
    <Container>
      <Router>
        <Breadcrumbs separator="-">
          <Link style={menuSytle} to='/'>Blogs</Link>
          <Link style={menuSytle} to='/users'>Users</Link>
          <Typography color="textPrimary">
            {user.name} logged in
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => logout()} id='logout' >Logout</Button>

        </Breadcrumbs>
        <Typography variant="h1" margin="10px">Blogs</Typography>
        <Notification/>


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
            <Togglable id="create-blog" buttonText="Create new blog" ref={blogFromRef}>
              <BlogForm/>
            </Togglable>
            <List>
              {blogs.map(blog =>
                <Link to={`/blogs/${blog.id}`} key={blog.id} >
                  <ListItem button divider>
                    <ListItemText primary={blog.title}/>
                  </ListItem>
                </Link>
              )}
            </List>

          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App