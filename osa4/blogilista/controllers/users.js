const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        if (body.username.length < 3 || body.password.length < 3) {
            response.status(400).json({ error: 'Invalid username or password. Username and password must be at least three characters long.' }).end()
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.json(savedUser)
        }
    } catch (exception) {
        const error = (exception.message)
        response.status(400).json({ error }).end()
    }
})

module.exports = usersRouter