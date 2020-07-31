import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notifications)  // retrieves data from notification reducer
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log("notification: ", notification)
  return (
    <div style={style}>
      {notification.message} {notification.anecdote}
    </div>
  )
}

export default Notification