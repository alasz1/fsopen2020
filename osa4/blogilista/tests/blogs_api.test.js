const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

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

test('if no value is given to title and url fields, returns 400 bad request', async () => {
    const newBlog = {
        title: "",
        author: "author3",
        url: "",
        likes: "66"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'jsmith',
          name: 'John Smith',
          password: 'verysecret',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

        const response = await api.get('/api/users')
        const body = response.body 
        console.log("All users: ", body)
      })
    })

afterAll(() => {
    mongoose.connection.close()
})