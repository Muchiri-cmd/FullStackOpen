const { test,describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

//test data
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const listWithOneBlogWithZeroLikes = [
  {
    _id: '5a122bb72b74c671224e17h8',
    title: 'The Murphys Law',
    author: 'Edward Murphy',
    url: 'https://philosophy.com/laws/ed-murphy',
    likes: 0,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const emptyBlogList = []

test('dummy returns one',() => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result,1)
})

describe('total likes', () => {
  test('of empty bloglist is zero', () => {
    const totalLikes = listHelper.totalLikes(emptyBlogList)
    assert.strictEqual(totalLikes,0)
  })

  test('when list has only one blog,total likes equals the likes of that blog', () => {
    const totalLikes = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(totalLikes,listWithOneBlog[0].likes)
  })

  test('when bloglist has multiple entries', () => {
    const totalLikes = listHelper.totalLikes(blogs)
    assert.strictEqual(totalLikes,36)
  })

  test('when all blogs have zero likes', () => {
    const zeroLikesBlogs = blogs.map(blog => ({ ...blog, likes: 0 }))
    const totalLikes = listHelper.totalLikes(zeroLikesBlogs)
    assert.strictEqual(totalLikes, 0)
  })

})

describe('most liked blog', () => {
  test('of many blogs', () => {
    const mostLiked = listHelper.favoriteBlog(blogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    assert.deepStrictEqual(mostLiked,expected)
  })

  test('when multiple blogs have the same highest likes', () => {
    const blogsWithSameLikes = [
      { title: 'Blog1', author: 'Author1', likes: 10 },
      { title: 'Blog2', author: 'Author2', likes: 10 },
    ]
    const mostLiked = listHelper.favoriteBlog(blogsWithSameLikes)
    const expected = {
      title: 'Blog1',
      author: 'Author1',
      likes: 10
    }
    assert.deepStrictEqual(mostLiked, expected)
  })

  test('of empty blogList',() => {
    const mostLiked = listHelper.favoriteBlog(emptyBlogList)
    assert.deepStrictEqual(mostLiked,null)
  })

  test('when list has only one blog', () => {
    const mostLiked = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    assert.deepStrictEqual(mostLiked,expected)
  })

  test('when list has only one blog with 0 likes', () => {
    const mostLiked = listHelper.favoriteBlog(listWithOneBlogWithZeroLikes)
    assert.deepStrictEqual(mostLiked,null)
  })
})

describe('author with most blogs' ,() => {
  test('author with most blogs out of many' ,() => {
    const authorWithMostBlogs = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(authorWithMostBlogs,{
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('when multiple authors have the same number of blogs', () => {
    const blogsWithSameCount = [
      { author: 'Author1' },
      { author: 'Author1' },
      { author: 'Author2' },
      { author: 'Author2' },
    ]
    const authorWithMostBlogs = listHelper.mostBlogs(blogsWithSameCount)
    const expected = {
      author: 'Author1',
      blogs: 2
    }
    assert.deepStrictEqual(authorWithMostBlogs, expected)
  })

  test('when bloglist is empty', () => {
    const authorWithMostBlogs = listHelper.mostBlogs(emptyBlogList)
    assert.deepStrictEqual(authorWithMostBlogs,null)
  })
})

describe('author whose blog has highest amount of likes',() => {
  test('when blog list has many blog entries', () => {
    const authorWithMostLikes = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(authorWithMostLikes,{
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

  test('when multiple author\'s blogs have the same number of likes', () => {
    const blogsWithSameLikes = [
      { title: 'Blog1', author: 'Author1', likes: 10 },
      { title: 'Blog2', author: 'Author2', likes: 10 },
    ]
    const mostLiked = listHelper.favoriteBlog(blogsWithSameLikes)
    const expected = {
      title: 'Blog1',
      author: 'Author1',
      likes: 10
    }
    assert.deepStrictEqual(mostLiked, expected)
  })

  test('when bloglist is empty', () => {
    const authorWithMostBlogs = listHelper.mostLikes(emptyBlogList)
    assert.deepStrictEqual(authorWithMostBlogs,null)
  })
})

module.exports = { blogs }