const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'Miro',
      url: "www.com",
      likes: "1213"
    },
    {
        title: 'Bowseri',
        author: 'jefe',
        url: "www.com",
        likes: "1213"
    },
  ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb, usersInDb
}