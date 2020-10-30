const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "title1",
        author: "author1",
        url: "url1.com",
        likes: "4"
    },
    {
        title: "title2",
        author: "author2",
        url: "url2.com",
        likes: "8"
    },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('the first blog is called title1', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('title1')
  })

afterAll(() => {
  mongoose.connection.close()
})