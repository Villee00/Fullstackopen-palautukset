import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
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
      <Typography variant="body1" >User: {user.name}</Typography>
      <Typography variant="h4">Added blogs</Typography>
      <List>
        {user.blogs.map(n =>
          <ListItem key={n.id}>
            <ListItemText primary={n.title}></ListItemText>
          </ListItem>)}
      </List>
    </div>
  )
}

export default User