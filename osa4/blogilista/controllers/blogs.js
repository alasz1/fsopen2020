const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

//   blogsRouter.get('/', (request, response, error) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// blogsRouter.post('/', (request, response) => {

//   const blog = new Blog(request.body)
//     console.log(blog)
//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

// Refactored from promises to async/await

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  body.likes ? '' : body.likes = '0'
  if (body.title === '' && body.url === '') {
    response.status(400)
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })



  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

module.exports = blogsRouter