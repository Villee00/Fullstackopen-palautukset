import blogService from '../services/blogs'
const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'MODIFY_BLOG':
    return state.map(n => n.id === action.blog.id? action.blog: n)
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'DELETE_BLOG':
    return state.filter(n => n.id !== action.id)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async disptach => {
    const blogs = await blogService.getAll()
    return disptach({
      type:'INIT_BLOGS',
      blogs
    })
  }
}

export const addLikeBlog = (blog) => (async disptach => {
  await blogService.update(blog)
  return disptach({
    type:'MODIFY_BLOG',
    blog
  })
})
export const deleteBlog = (id) => (async disptach => {
  await blogService.remove(id)
  return disptach({
    type:'DELETE_BLOG',
    id
  })
})

export const addBlog = (blogData) => async disptach => {
  const blog = await blogService.create(blogData)
  return disptach({
    type:'ADD_BLOG',
    blog
  })
}

export const addComment = (blog) => async dispatch => {
  await blogService.sendComment({
    id: blog.id,
    comment: blog.comments[blog.comments.length-1] })
  return dispatch({
    type: 'MODIFY_BLOG',
    blog
  })
}
export default blogsReducer