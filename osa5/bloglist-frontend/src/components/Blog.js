import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, loggedInUser }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const poster = blog.user === undefined ? "Anonymous" : blog.user.name

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log("BLOG.user ", blog.user, loggedInUser)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>

      <div >
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>

        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          {blog.likes} <button onClick={updateBlog}>like</button>
          <br />
          Posted by {poster}
          {poster === loggedInUser ?
            <>
              <br />
              <button>delete</button>
            </>
            : ""}
        </div>
      </div>
    </div>
  )
}

export default Blog
