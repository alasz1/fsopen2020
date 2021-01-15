import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  // visibility state not needed here anymore
  // const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      console.log('wrong credentials')
      setErrMessage('Invalid username or password')
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    console.log('logged out')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateBlog = (id) => {
    const blog = blogs.find(n => n.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrMessage(
          `Blog '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          setErrMessage(
            `Blog '${blog.title}' was already removed from server`
          )
          setTimeout(() => {
            setErrMessage(null)
          }, 5000)
        })
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // The below works on its own, but toggling visibility has now been isolated to Togglable component

  // const blogForm = () => {
  //   const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  //   const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={() => setBlogFormVisible(true)}>Add new blog</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <BlogForm
  //           addBlog={addBlog}
  //           newTitle={newTitle}
  //           handleTitleChange={({ target }) => handleTitleChange(target.value)}
  //           newAuthor={newAuthor}
  //           handleAuthorChange={({ target }) => handleAuthorChange(target.value)}
  //           newUrl={newUrl}
  //           handleUrlChange={({ target }) => handleUrlChange(target.value)}
  //         />
  //         <button onClick={() => setBlogFormVisible(false)}>cancel</button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errMessage={errMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p style={{ display: "inline-block" }}>{user.name} logged in{'\u00A0'}</p>
          <button onClick={handleLogout}>logout</button>
          {/* {blogForm()} */}
          <Togglable buttonLabel='Add new blog' secondButtonLabel='cancel'>
            <BlogForm
              createBlog={addBlog}
              setMessage={setMessage}
            />
          </Togglable>
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={() => updateBlog(blog.id)} removeBlog={() => removeBlog(blog.id)} loggedInUser={user.name} />
            )}
        </div>
      }


    </div>
  )
}

export default App