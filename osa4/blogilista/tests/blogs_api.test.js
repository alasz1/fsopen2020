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

test('the blogs are identified by a field called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined();
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "title3",
        author: "author3",
        url: "url3.com",
        likes: "66"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain(
      'title3'
    )
  })

test('if no value is given to likes field it is set to 0', async () => {
    const newBlog = {
        title: "title3",
        author: "author3",
        url: "url3.com",
        likes: ""
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const likes = response.body.map(r => r.likes)
    const blogIndex = Number(initialBlogs.length) // length = index of new blog as index starts from 0

    expect(likes[blogIndex]).toEqual(0)
})

afterAll(() => {
    mongoose.connection.close()
})