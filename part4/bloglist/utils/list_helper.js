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

module.exports = {
  dummy, totalLikes, favoriteBlog
}