import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() =>{
    const userData = window.localStorage.getItem('user')
    if(userData !== null){
      const oldUser = JSON.parse(userData)
      setUser(oldUser)
      blogService.setToken(oldUser.token)
    }
  }, [])
  const handleLogin = async (event)=>{
    event.preventDefault()
    try {
      const userData = await loginService.postLogin({username,password,})
      setUser(userData)
      blogService.setToken(userData.token)
      setPassword('')
      setUserName('')
      window.localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      setNotificationMessage(`Wrong username or password`)

      setTimeout(() =>{
        setNotificationMessage(null)
      },1000)
    }
  }
  

  const createBlog = async (event) =>{
    event.preventDefault()
    try {
      const newBlog = await blogService.create({title,author,url,})

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog.data))
      setNotificationMessage(`Added a new blog ${title} by ${author}`)

      setTimeout(() =>{
        setNotificationMessage(null)
      },1000)
    } catch (error) {
      setNotificationMessage(`Error ${error.message}`)

      setTimeout(() =>{
        setNotificationMessage(null)
      },1000)
      
    }
  }
  const logout = ()=>{
    window.localStorage.removeItem('user')
    
    setUser(null)
  }
  if(user === null){
    return(
      <form onSubmit={handleLogin}>
        <h2>Log in to blogs</h2>
        <Notification message={notificationMessage}/>
        Username: <input type="text" value={username} onChange={({target}) => setUserName(target.value)}/>
        <br/>
        Password: <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
        <br/>
        <button type="submit">login</button>
      </form>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notificationMessage}/>
      {user.name} logged in
      <button onClick={() =>logout()}>Logout</button>

      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        Title: <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/><br/>
        Author: <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/><br/>
        Url: <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/><br/>
        <button type="submit">Create</button>

      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App