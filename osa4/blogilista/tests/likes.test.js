const likes = require('../utils/list_helper').likes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

describe('total likes of one blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = likes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('likes of multiple blogs', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      }
    ]
  
    test('when list has multiple blogs likes equal', () => {
      const result = likes(listWithMultipleBlogs)
      expect(result).toBe(18)
    })
  })

  describe('Empty blog', () => {
    const emptyList = []
  
    test('When the list is empty', () => {
      const result = likes(emptyList)
      expect(result).toBe(0)
    })
  })

  describe('Favorite blog of multiple', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      }
    ]
  
    test('when list has multiple blogs', () => {
      const result = favoriteBlog(listWithMultipleBlogs)
      expect(result).toEqual(listWithMultipleBlogs[1])
    })
  })

  describe('Author with most blogs', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      }
    ]
  
    test('when list has multiple blogs', () => {
      const result = mostBlogs(listWithMultipleBlogs)
      const blogi = "author: Miro Tammi blogs: 2"
      expect(result).toEqual(blogi)
    })
  })

  describe('Author with most likes', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 28,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17s21',
        title: 'Blog nr. 1',
        author: 'Miro Tammi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      }
    ]
  
    test('when list has multiple blogs', () => {
      const result = mostLikes(listWithMultipleBlogs)
      const blogi = {"author": "Edsger W. Dijkstra", "likes": 28}
      expect(result).toEqual(blogi)
    })
  })