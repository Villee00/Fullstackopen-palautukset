import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state)
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      <h3>{message}</h3>
    </div>
  )
}
export default Notification
