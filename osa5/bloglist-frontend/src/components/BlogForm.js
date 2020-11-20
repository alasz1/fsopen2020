import React, {useState} from 'react'

const BlogForm = ({ createBlog, setMessage }) => {

    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')

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
  createBlog({
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  })
  setMessage(`A new blog ${newTitle} by ${newAuthor} added.`)
  setTimeout(() => {
    setMessage(null)
  }, 3000)
  setNewTitle('')
  setNewAuthor('')
  setNewUrl('')
}

    return (
        <>
        <h2>Add new Blog</h2>
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
        <br/>
        </>
  )
}

export default BlogForm