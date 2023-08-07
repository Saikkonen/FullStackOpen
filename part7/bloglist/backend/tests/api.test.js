const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

const testUser = {
  username: "test",
  password: "test"
}

var TOKEN = ""

beforeAll(async () => {
  await User.deleteMany({})
  const user = await api.post('/api/users').send(testUser)
  const login = await api.post('/api/login').send(testUser)
  TOKEN = login.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .set('Authorization', `Bearer ${TOKEN}`)
  await api
    .post('/api/blogs')
    .send(initialBlogs[1])
    .set('Authorization', `Bearer ${TOKEN}`)
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
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('new blog')
})

test('blog without likes is defaults to 0 likes', async () => {
  const newBlog = {
    title: 'no likes',
    author: ' ',
    url: 'www.fi',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'jonne',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(400)

  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length)
})

test('blogs can be deleted', async () => {
  const blogs = await api.get('/api/blogs')
  const blogId = blogs.body[0].id

  await api
    .delete(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)
})

test('blogs can be updated', async () => {
  const blog = {
    likes: 50
  }

  const blogs = await api.get('/api/blogs')
  const blogId = blogs.body[0].id

  await api.put(`/api/blogs/${blogId}`).send(blog).expect(200)

  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body[0].likes).toBe(50)
})

test('adding a blog fails with code 401 if no token', async () => {
  const newBlog = {
    title: 'no token'
  }

  await api.post('/api/blogs').send(newBlog).expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})
