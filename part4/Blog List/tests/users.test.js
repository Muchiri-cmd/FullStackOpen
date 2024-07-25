const bcrypt = require('bcrypt')
const { describe , beforeEach , test, after } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

describe('User Module',() => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('passwordless', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('successfully creates user', async () => {
    const InitialUsersInDb = await User.find({})
    const newUser = {
      username: 'JuiceWRLD',
      name: 'Jarad Higgins',
      password: 'legendsneverdie',
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

})
after(async() => {
  mongoose.connection.close()
})