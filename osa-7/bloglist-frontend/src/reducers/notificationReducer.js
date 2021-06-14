const notificationReducers = (state = null, action) => {
  switch(action.type){
  case 'ADD_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

let timeoutID = null
export const changeNotification = (notification) => {
  return dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification
    })
    if(timeoutID){
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch({
        type:'CLEAR_NOTIFICATION'
      })
    }, 5000)

  }
}

export default notificationReducers