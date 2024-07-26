const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const validatePassword = (password) => {
  if (password.length < 3) {
    throw new Error('password must be atleast 3 characters long')
  }
}

usersRouter.post('/', async(request,response) => {
  const { username, name , password } = request.body
  if (!password) {
    throw new Error('Password is required')
  }
  validatePassword(password)

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