const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce(
    (accumulator, blog) => accumulator + blog.likes, 0
  )
  
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev
  })

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCounts = {}

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    blogCounts[author] = (blogCounts[author] || 0) + 1
  }

  let topAuthor = ''
  let maxBlogs = 0

  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      topAuthor = author
      maxBlogs = blogCounts[author]
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likeCounts = {}

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    const likes = blogs[i].likes

    likeCounts[author] = (likeCounts[author] || 0) + likes
  }

  let topAuthor = ''
  let maxLikes = 0

  for (const author in likeCounts) {
    if (likeCounts[author] > maxLikes) {
      topAuthor = author
      maxLikes = likeCounts[author]
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}