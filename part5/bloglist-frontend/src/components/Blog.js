import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = () => {
    const newLikes = blog.likes + 1

    handleLikes(blog.id, {
      likes: newLikes,
    })
    setLikes(newLikes)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a> <br />
          likes {likes} <button onClick={likeBlog}>like</button> <br />
          {blog.user.name} <br />
          {user.name === blog.user.name && (
            <button onClick={deleteBlog} style={{ backgroundColor: 'red' }}>
              remove
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>show</button>
      </div>
    </div>
  )
}

export default Blog
