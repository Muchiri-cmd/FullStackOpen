const { test,describe,after,beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const faker = require('faker')
const helper = require('./helpers.test')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blogEntry of helper.blogs){
    let blogObject = new Blog(blogEntry)
    await blogObject.save()
  }
})

describe('test api endpoints', () => {
  test('application api returns correct amount of blog entries in JSON', async() => {
    const response =  await api.get('/api/blogs')
    assert.strictEqual(response.body.length,helper.blogs.length)
  })

  test('unique identifier property of the blog post is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogEntries = response.body
    for (let blogEntry of blogEntries){
      assert(Object.prototype.hasOwnProperty.call(blogEntry, 'id'))
      assert.strictEqual(blogEntry._id, undefined)
    }
  })

  test('successfully creates a new blog entry', async() => {
    const newBlog = {
      title: faker.lorem.sentence(),
      author: faker.name.findName(),
      url: faker.internet.url(),
      likes: faker.datatype.number({ min: 0, max: 1000 })
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
    //check if blogs length has increased
    assert.strictEqual(response.body.length,helper.blogs.length+1)
    const contents = response.body.map(x => x.title)
    assert(contents.includes(newBlog.title))
  })

  test('successfully updates a blog entry', async() => {
    const blogs = await Blog.find({})
    const initialBlogEntries = blogs.map(blog => blog.toJSON())
    const blogEntryToUpdate = initialBlogEntries[0]

    await api
      .put(`/api/blogs/${blogEntryToUpdate.id}`)
      .send({ ...blogEntryToUpdate, likes:20000 })
      .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
    const firstBlogEntry = response.body[0]
    const expected = firstBlogEntry
    assert.deepStrictEqual(expected.likes,20000)
  })

  test('successfully deletes a blog entry ', async() => {
    const blogs = await Blog.find({})
    const initialBlogEntries = blogs.map(blog => blog.toJSON())
    const blogEntryToDelete = initialBlogEntries[0]

    await api
      .delete(`/api/blogs/${blogEntryToDelete.id}`)
      .expect(204)

    const updatedBlogEntries = await Blog.find({})
    const entries = updatedBlogEntries.map(b => b.title)

    assert(!entries.includes(blogEntryToDelete.title))
    assert.strictEqual(updatedBlogEntries.length,initialBlogEntries.length - 1)
  })
})

describe('test requests formats and schema',() => {

  test('default likes to 0 if likes property is missing from request', async () => {
    const newBlog = {
      title: faker.lorem.sentence(),
      author: faker.name.findName(),
      url: faker.internet.url(),
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlogEntry = response.body
    assert.strictEqual(createdBlogEntry.likes, 0)
  })


  test('If title or url properties miss from request data,backend responds with status code 400 Bad request', async() => {
    const newBlogWithoutTitle = {
      author: faker.name.findName(),
      url: faker.internet.url(),
      likes: faker.datatype.number({ min: 0, max: 1000 })
    }
    const newBlogWithoutURL = {
      title: faker.lorem.sentence(),
      author: faker.name.findName(),
      likes: faker.datatype.number({ min: 0, max: 1000 })
    }

    const responseWithoutTitle = await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)

    assert.strictEqual(responseWithoutTitle.status, 400)
    assert.strictEqual(responseWithoutTitle.body.error, '400 Bad Request')

    const responseWithoutURL = await api
      .post('/api/blogs')
      .send(newBlogWithoutURL)
      .expect(400)

    assert.strictEqual(responseWithoutURL.status, 400)
    assert.strictEqual(responseWithoutURL.body.error, '400 Bad Request')
  })
})



after(async () => {
  await mongoose.connection.close()
})
