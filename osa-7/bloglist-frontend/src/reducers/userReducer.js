import postLogin from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data.userData
  case 'CREATE_USER':
    return state
  case 'UNSET_USER':
    return null
  default:
    return state
  }
}

export const loginUser = (user) => async dispatch => {
  const userData = await postLogin(user)
  blogService.setToken(userData.token)
  window.localStorage.setItem('user', JSON.stringify(userData))
  return dispatch({
    type: 'SET_USER',
    data:{
      userData,
    }
  })
}

export const initUser = () => async dispatch => {
  const getUser = window.localStorage.getItem('user')
  if(getUser !== null){
    const userData = JSON.parse(getUser)
    blogService.setToken(userData.token)
    return dispatch({
      type: 'SET_USER',
      data: {
        userData
      }
    })
  }
}

export const logoutUser = () => dispatch => {
  window.localStorage.removeItem('user')

  return dispatch({
    type: 'UNSET_USER'
  })
}

export default userReducer
