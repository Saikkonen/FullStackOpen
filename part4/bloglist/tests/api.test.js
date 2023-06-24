const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test',
    author: 'test',
    url: 'www.com',
    likes: 0,
  },
  {
    title: 'testi',
    author: 'jonne',
    url: 'www.fi',
    likes: 1,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifier of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'jonne',
    url: 'www.fi',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('new blog')
})

afterAll(async () => {
  await mongoose.connection.close()
})
