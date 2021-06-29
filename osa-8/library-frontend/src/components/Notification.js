import React from "react"

const Notification = ({message}) =>{

  const notificationStyle ={
    color : "red"
  }
  if(!message){
    return null
  }
  return(
    <div>
      <p style={notificationStyle}>{message}</p>
    </div>
  )
}

export default Notification