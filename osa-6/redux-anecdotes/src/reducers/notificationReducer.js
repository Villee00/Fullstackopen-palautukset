const notificationReducer = (state = "", action) =>{
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification
    case "UNSET_NOTIFICATION":
      return ""
    default:
      return state
  }
}

export const setNotification= (notification, time) =>{
  return async dispatch =>{
    dispatch({
      type: "SET_NOTIFICATION",
      notification
    })
    setTimeout(() => {
      dispatch(unsetNotification())
    }, time *1000);

  }
}

export const unsetNotification = () =>{
    return{
        type: "UNSET_NOTIFICATION"
    }
}
export default notificationReducer