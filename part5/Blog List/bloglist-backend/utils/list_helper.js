const _ = require('lodash')

const dummy = (blogs) => 1
const totalLikes = (blogList) => blogList.reduce((sum,blog) => sum+blog.likes,0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  if (sortedBlogs[0].likes === 0) return null
  return {
    title: sortedBlogs[0].title,
    author: sortedBlogs[0].author,
    likes: sortedBlogs[0].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  //group blogs by author
  const groupedByAuthors = _.groupBy(blogs,'author')
  //transform grouped datat into count of blogs per author
  const authorsBlogCounts = _.map(groupedByAuthors,(authorsBlogs,author) => {
    return ({ author , blogs:authorsBlogs.length })
  })

  // return author with most blogs
  const authorWithMostBlogs = _.maxBy(authorsBlogCounts,'blogs')
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0 )return null

  const groupedByAuthors = _.groupBy(blogs,'author')
  //get author whose blog post have largest amount of likes
  const blogsLikeCounts = _.map(groupedByAuthors,(authorsBlogs,author) => {
    //calculate total likes for author
    const totalLikes = _.sumBy(authorsBlogs,'likes')
    return ({ author, likes:totalLikes })
  })
  const authorWithMostLikes = _.maxBy(blogsLikeCounts,'likes')
  return authorWithMostLikes

}

module.exports = { dummy, totalLikes,favoriteBlog,mostBlogs, mostLikes }