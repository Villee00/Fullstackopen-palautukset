import { Alert } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }
  return (
    <div>
      <Alert severity={notification.error ? 'error': 'success'}>{notification.message}</Alert>
    </div>
  )
}
export default Notification
