const { describe ,beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const app = require('../app')
const faker = require('faker')
const supertest = require('supertest')
const api = supertest(app)
const bcrypt = require('bcrypt')


beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('test123', 10)
  const user = new User({ username: 'usertester', passwordHash })
  await user.save()
})

describe('User Creation',() => {
  test('successfully creates user', async () => {
    const InitialUsersInDb = await User.find({})
    const newUser = {
      username: faker.internet.userName(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedUsers = await User.find({})
    assert.strictEqual(updatedUsers.length, InitialUsersInDb.length + 1)

    const usernames = updatedUsers.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('should be invalid if username is missing', async () => {
    const newUser = { password: 'validpassword' }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('Username is required'))
  })

  test('user creation fails with proper status code if username already taken' ,async() => {
    const InitialUsersInDb = await User.find({})
    const newUser = { username:'usertester', name:'Tremani Bartlett', password:'test123' }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const updatedUsers = await User.find({})
    assert(result.body.error.includes('Username already taken'))
    assert.strictEqual(updatedUsers.length,InitialUsersInDb.length)
  })

  test('should be invalid if username is less than 3 characters', async () => {
    const newUser = { username: 'ab', password: 'validpassword' }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    assert(response.body.error.includes('Username must be atleast 3 characters long'))
  })

  test('should be invalid if password is less than 3 characters', async () => {
    const newUser = { username: 'test user', password: 'ab' }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)
    assert(response.body.error.includes('password must be atleast 3 characters long'))
  })

  test('should be invalid if password is missing', async () => {
    const newUser = { username: 'validuser' }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert(response.body.error.includes('Password is required'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
