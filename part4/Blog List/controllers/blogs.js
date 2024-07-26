const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1, name:1 })
  response.json(blogs)
})

blogsRouter.post('/',async (request, response) => {
  const { title, author, url , likes } = request.body

  if (!title) {
    return response.status(400).json({ error: '400 Bad Request' })
  } else if (!url) {
    return response.status(400).json({ error: '400 Bad Request' })
  }

  const user = await User.findById(request.body.userId)
  const blog = new Blog({ title, url, author,likes ,user:user.id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id',async(request,response) => {
  const { title , author, url , likes } = request.body
  const updatedBlogEntries = await Blog.findByIdAndUpdate(request.params.id,
    { title , author, url , likes },
    { new:true, runValidators:true, context:'query' }
  )
  response.json(updatedBlogEntries)
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter