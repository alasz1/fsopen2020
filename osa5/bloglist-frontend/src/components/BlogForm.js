import React from 'react'

const BlogForm = ({
    addBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handleAuthorChange,
    newUrl,
    handleUrlChange
}) => {
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