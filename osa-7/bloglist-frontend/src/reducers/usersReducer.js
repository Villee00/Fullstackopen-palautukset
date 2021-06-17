import getAll from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users.sort((a,b) => b.blogs.length - a.blogs.length )

  default:
    return state
  }
}

export const initUsers = () => async disptach => {
  const users = await getAll()
  return disptach({
    type: 'INIT_USERS',
    users
  })
}

export default usersReducer