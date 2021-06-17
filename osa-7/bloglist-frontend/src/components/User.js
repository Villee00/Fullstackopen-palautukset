import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(n => n.id === id)
  if(!user){
    return null
  }
  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(n =>
          <li key={n.id}>{n.title}</li>)}
      </ul>
    </div>
  )
}

export default User