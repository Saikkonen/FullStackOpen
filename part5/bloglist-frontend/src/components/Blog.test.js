import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders the blogs title and author, but does not render its URL or number of likes', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'test.com',
    likes: 10,
    user: {
      username: 'username',
      name: 'name',
      id: '1',
    },
    id: '1',
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  expect(div).not.toHaveTextContent('likes')
  expect(div).not.toHaveTextContent('test.com')
})

test('blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'test.com',
    likes: 10,
    user: {
      username: 'username',
      name: 'name',
      id: '1',
    },
    id: '1',
  }

  const { container } = render(<Blog blog={blog} user={blog.user} />)

  const div = container.querySelector('.blog')

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  screen.debug()

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  expect(div).toHaveTextContent('likes')
  expect(div).toHaveTextContent('test.com')
})