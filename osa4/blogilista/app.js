const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


module.exports = app





