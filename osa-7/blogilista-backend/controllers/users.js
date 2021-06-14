const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', {
      url: 1, title: 1, author: 1, id: 1,
    })
  res.status(200).json(users.map((user) => user.toJSON()))
})

userRouter.post('/', async (req, res) => {
  const { body } = req

  if (body.password === undefined || body.password.length < 3) {
    return res.status(400).json({ error: 'Password has to be 3 charecters or longer' }).end()
  }
  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const userData = await newUser.save()
  res.json(userData)
})

module.exports = userRouter
