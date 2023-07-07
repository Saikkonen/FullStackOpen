import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a> <br />
          likes {blog.likes} <button>like</button> <br />
          {blog.user.name} <br />
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
