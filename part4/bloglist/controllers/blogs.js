const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user

  const userid = user.id
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  return response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter