const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce(
    (accumulator, blog) => accumulator + blog.likes, 0
  )
  
  return sum
}

module.exports = {
  dummy, totalLikes
}