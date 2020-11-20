import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ errMessage, setErrMessage ] = useState(null)

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

const handleTitleChange = (event) => {
  setNewTitle(event.target.value)
}
const handleAuthorChange = (event) => {
  setNewAuthor(event.target.value)
}
const handleUrlChange = (event) => {
  setNewUrl(event.target.value)
}

const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  }

  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title:
      <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      Author:
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      Url:
      <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errMessage={errMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <p style={{display: "inline-block"}}>{user.name} logged in{'\u00A0'}</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }


    </div>
  )
}

export default App