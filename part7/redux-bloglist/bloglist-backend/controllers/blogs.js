const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1, name:1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  try {
    const blog = await Blog.findById(id).populate('user', 'username')
    if (!blog) return response.status(404).json({ error: 'Blog not found' })

    response.json(blog)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal server error' })
  }
})

blogsRouter.post('/',async (request, response) => {
  const user = await request.user
  const { title, author, url , likes } = request.body

  if (!title) return response.status(400).json({ error: '400 Bad Request' })
  if (!url) return response.status(400).json({ error: '400 Bad Request' })
  if(!request.token)return response.status(401).json({ error:'401 Unauthorized' })
  if (!request.user)return response.status(401).json({ error:'invalid user' })

  const blog = new Blog({ title, url, author,likes ,user:user.id })
  const savedBlog = await blog.save()

  let userRecord = await User.findById(request.user.id)
  userRecord.blogs = userRecord.blogs.concat(savedBlog._id)
  await userRecord.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id',async(request,response) => {
  const { title , author, url , likes, user } = request.body
  const updatedBlogEntries = await Blog.findByIdAndUpdate(request.params.id,
    { title , author, url , likes, user  },
    { new:true, runValidators:true, context:'query' }
  )
  response.json(updatedBlogEntries)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  if (!request.user) return response.status(401).json({ error: 'invalid user' })
  const user = request.user

  const blog = await Blog.findById({ _id:id })
  if (!blog) return response.status(404).json({ error: 'Blog not found' })
  if (!blog.user) return response.status(400).json({ error: 'Invalid blog entry: No creator' })

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'Only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.post('/:id/comments',async(request,response) => {
  const { id } = request.params
  const { comment } = request.body

  if (!comment || comment.trim() === ''){
    return response.status(400).json({ error:'Comment cannot be empty' })
  }

  try{
    const updatedBlogEntry = await Blog.findByIdAndUpdate(
      id,
      { $push : { comments:comment } },
      { new:true , runValidators:true, context:'query' }
    )

    if (!updatedBlogEntry){
      return response.status(404).json({ error:'Blog not found' })
    }
    response.json(updatedBlogEntry)
  }catch(error){
    console.error(error)
    response.status(500).json({ error:'An error occured while adding comments' })
  }
})



module.exports = blogsRouter