const appRouter = require('express').Router()
const Blog = require('../models/blog')

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

appRouter.post('/',async (request, response) => {
  const { title, author, url , likes } = request.body
  if (!title) {
    return response.status(400).json({ error: '400 Bad Request' })
  }
  if (!url) {
    return response.status(400).json({ error: '400 Bad Request' })
  }

  const blog = new Blog({ title, url, author,likes })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

appRouter.put('/:id',async(request,response) => {
  const { title , author, url , likes } = request.body
  const updatedBlogEntries = await Blog.findByIdAndUpdate(request.params.id,
    { title , author, url , likes },
    { new:true, runValidators:true, context:'query' }
  )
  response.json(updatedBlogEntries)
})

appRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = appRouter