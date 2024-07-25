const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async(request,response) => {
  const { username, name , password } = request.body

  const saltRounds = 10
  // hash the password
  const passwordHash = await bcrypt.hash(password, saltRounds)
  //create new user
  const user = new User ({ username, name , passwordHash })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

usersRouter.get('/', async(request,response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter