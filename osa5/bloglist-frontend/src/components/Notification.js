import React from 'react'

const Notification = ({ message, errMessage }) => {
  if (message === null && errMessage === null) {
    return null
  }

  return (
    <>
      {!errMessage
        ?
        <div className="notification">
          {message}
        </div>
        :
        <div className="error">
          {errMessage}
        </div>}
    </>
  )
}

export default Notification