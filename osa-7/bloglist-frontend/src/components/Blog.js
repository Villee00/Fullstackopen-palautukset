import React, { useState } from 'react'
import { addComment, addLikeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import { useHistory, useParams } from 'react-router-dom'
import CommentIcon from '@material-ui/icons/Comment'
import { Button,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Link,
  CardActions,
  TextField,
  List,
  ListItem,
  ListItemIcon } from '@material-ui/core'

const Blog = () => {
  const dispatch = useDispatch()
  const history =useHistory()
  const [comment, setComment] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user.username)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if(!blog){
    return null
  }

  const removeBlog = async () => {
    try {
      const foundBlog = blogs.find(n => n.id === blog.id)
      if(window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?` )){
        dispatch(deleteBlog(blog.id))
        dispatch(changeNotification(`Blog ${foundBlog.title} deleted!`))
        history.push('/')
      }
    } catch (error) {
      dispatch(changeNotification('Blog is already deleted', true))
    }
  }

  const sendBlogLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes+=1 }
      dispatch(addLikeBlog(newBlog))
    } catch (error) {
      dispatch(changeNotification(`Error ${error.message}`, true))
    }
  }

  const sendBlogComment = async () => {
    const newBlog = { ...blog, comments:[...blog.comments, comment] }
    dispatch(addComment(newBlog))
    dispatch(changeNotification('New comment added'))
    setComment('')
  }

  return(
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2">
              {blog.title} - {blog.author}
            </Typography>
            <Link>
              <Typography variant="h4" component="p">
                {blog.url}
              </Typography>
            </Link>
            <Typography variant="h5" component="p">
              {blog.user.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" size="small" color="primary" id="like-blog" onClick={() => sendBlogLike()}>
          Like
          </Button>
          {user === blog.user.username ?
            <Button id="delete-blog" variant="contained" size="small" color="secondary" onClick={removeBlog}>Delete</Button>
            : null }
          <Typography>
          Likes: {blog.likes}
          </Typography>
        </CardActions>
      </Card>
      <TextField
        label="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}/><br/>
      <Button  variant="contained" color="primary" onClick={sendBlogComment}>add comment</Button>


      <Typography variant="h5">Comments</Typography>
      <List>
        {blog.comments.map((comment, index) =>
          <ListItem key={index}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <Typography>{comment}</Typography>
          </ListItem>)}
      </List>
    </div>
  )
}

export default Blog
